const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus
} = require("../Controller/task.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate");
const {
  createTaskSchema,
  updateTaskStatusSchema
} = require("../validation/task.schema");

// ADMIN only
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     description: ADMIN only. Creates a task and assigns it to an EMPLOYEE and a Customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - assignedTo
 *               - customerId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Follow up with client
 *               description:
 *                 type: string
 *                 example: Call customer regarding proposal
 *               assignedTo:
 *                 type: integer
 *                 example: 5
 *                 description: Employee userId
 *               customerId:
 *                 type: integer
 *                 example: 2
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, DONE]
 *                 example: PENDING
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Not ADMIN)
 *       404:
 *         description: Customer or Employee not found
 *       500:
 *         description: Server error
 */

router.post(
  "/tasks",
  authMiddleware,
//   roleMiddleware("ADMIN"),
  validate(createTaskSchema),
  createTask
);

// ADMIN + EMPLOYEE
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       ADMIN: Returns all tasks  
 *       EMPLOYEE: Returns only assigned tasks
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: Follow up with client
 *                       description:
 *                         type: string
 *                         example: Call customer
 *                       status:
 *                         type: string
 *                         enum: [PENDING, IN_PROGRESS, DONE]
 *                       createdAt:
 *                         type: string
 *                         example: 2025-01-01T10:00:00Z
 *                       updatedAt:
 *                         type: string
 *                         example: 2025-01-02T10:00:00Z
 *                       assignedTo:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 5
 *                           name:
 *                             type: string
 *                             example: Rahul Sharma
 *                           email:
 *                             type: string
 *                             example: rahul@mail.com
 *                       customer:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           name:
 *                             type: string
 *                             example: John Doe
 *                           email:
 *                             type: string
 *                             example: john@example.com
 *                           phone:
 *                             type: string
 *                             example: "9876543210"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */

router.get(
  "/tasks",
  authMiddleware,
//   roleMiddleware(["ADMIN", "EMPLOYEE"]),
  getTasks
);

// Update status
/**
 * @swagger
 * /tasks/{id}/status:
 *   patch:
 *     summary: Update task status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       EMPLOYEE: Can update only their own tasks  
 *       ADMIN: Can update any task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, DONE]
 *                 example: IN_PROGRESS
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Not your task)
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

router.patch(
  "/tasks/:id/status",
  authMiddleware,
//   roleMiddleware(["ADMIN", "EMPLOYEE"]),
  validate(updateTaskStatusSchema),
  updateTaskStatus
);

module.exports = router;
