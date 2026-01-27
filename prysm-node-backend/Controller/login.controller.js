const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginFunction = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        name:existingUser.name,
        role: existingUser.role
      },
      process.env.JWT_SECRET,  
      { expiresIn: "1d" }
    );

    res.status(200).json({
      accessToken: token,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in login" });
  }
};

module.exports = { loginFunction };
