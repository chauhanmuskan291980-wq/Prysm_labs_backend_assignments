const { z } = require("zod");

exports.createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  assignedTo: z.number().int(),
  customerId: z.number().int(),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional()
});

exports.updateTaskStatusSchema = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"])
});
