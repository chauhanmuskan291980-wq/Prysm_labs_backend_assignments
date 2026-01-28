const { z } = require("zod");

const createCustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),

  company: z.string().optional()
});


const updateCustomerSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),

  email: z
    .string()
    .email("Invalid email format")
    .optional(),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .optional(),

  company: z.string().optional()
});



const getCustomersQuerySchema = z.object({
  search: z.string().optional(),

  page: z
    .string()
    .regex(/^\d+$/, "Page must be a number")
    .optional(),

  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a number")
    .optional()
});

 

module.exports = { createCustomerSchema,updateCustomerSchema,getCustomersQuerySchema };
