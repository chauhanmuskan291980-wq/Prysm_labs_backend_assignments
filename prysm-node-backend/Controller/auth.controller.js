const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const register = async(req,res)=>{
    try{
        const {name , email, password , role} = req.body;

        const existingUser = await prisma.user.findUnique({
            where:{email}
        });

        if(existingUser){
            return res.status(409).json({message:"Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                role
            }
        });

        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        });
    }
    catch(error){
      console.error(error);
      res.status(500).json({message:"Server error"});
    }
};

module.exports = { register };
