const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string()   // 👈 TEMP FIX (not enum for now)
});

module.exports = { registerSchema };
