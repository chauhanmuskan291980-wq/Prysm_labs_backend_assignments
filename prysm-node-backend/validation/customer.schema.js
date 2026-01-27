const { z } = require("zod");

const createCustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone is required"),
  company: z.string().optional()
});

module.exports = { createCustomerSchema };
