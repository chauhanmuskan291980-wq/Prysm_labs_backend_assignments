const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * POST /tasks (ADMIN)
 */
const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, customerId, status } = req.body;

    // Validate customer
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(customerId) }
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Validate assigned employee
    const user = await prisma.user.findUnique({
      where: { id: parseInt(assignedTo) }
    });

    if (!user) {
      return res.status(404).json({ message: "Assigned user not found" });
    }

    if (user.role !== "EMPLOYEE") {
      return res.status(400).json({ message: "Assigned user must be EMPLOYEE" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        status: status || "PENDING",
        assignedToId: parseInt(assignedTo),
        customerId: parseInt(customerId)
      },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true }
        },
        customer: {
          select: { id: true, name: true, email: true, phone: true }
        }
      }
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (err) {
    console.error("Create Task Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * GET /tasks
 */
 const getTasks = async (req, res) => {
  try {
    const user = req.user; // from auth middleware
    console.log("User making request:", user);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Correct field: user.userId
    const whereCondition = user.role === "EMPLOYEE" ? { assignedToId: user.userId } : {};
    console.log("Where condition:", whereCondition);

    const tasks = await prisma.task.findMany({
      where: whereCondition,
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        customer: { select: { id: true, name: true, email: true, phone: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json({ data: tasks });

  } catch (err) {
    console.error("Get Tasks Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



/**
 * PATCH /tasks/:id/status
 */
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // EMPLOYEE security rule
    if (user.role === "EMPLOYEE" && task.assignedToId !== user.id) {
      return res.status(403).json({ message: "Forbidden: You can only update your own tasks" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true }
        },
        customer: {
          select: { id: true, name: true, email: true, phone: true }
        }
      }
    });

    res.status(200).json({
      message: "Task status updated successfully",
      task: updatedTask
    });

  } catch (err) {
    console.error("Update Task Status Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus
};
