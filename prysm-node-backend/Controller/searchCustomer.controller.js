const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCustomersVBySearch = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    console.log("SEARCH:", search); // debug

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const whereCondition = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { company: { contains: search, mode: "insensitive" } }
          ]
        }
      : {};

    const customers = await prisma.customer.findMany({
      where: whereCondition,
      skip,
      take: limitNum,
      orderBy: { createdAt: "desc" }  
    });

    const total = await prisma.customer.count({ where: whereCondition });

    res.status(200).json({
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      data: customers
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching customers" });
  }
};


module.exports = { getCustomersVBySearch };
