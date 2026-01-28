const { z } = require("zod");

const createCustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone is required"),
  company: z.string().optional()
});

const updateCustomerSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().min(10, "Phone is Minimum 10 Number required").optional(),
  company: z.string().optional()
});


const getCustomersQuerySchema = z.object({
  search: z.string().optional(),
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional()
});

 

module.exports = { createCustomerSchema,updateCustomerSchema,getCustomersQuerySchema };
