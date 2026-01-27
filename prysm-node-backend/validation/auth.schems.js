const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password min 6 chars"),
  role: z.enum(["USER", "ADMIN"])
});


module.exports = { registerSchema };
