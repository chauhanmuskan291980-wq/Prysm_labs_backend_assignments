const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { email } = require("zod");

const getUser = async(req,res)=>{
    try{
     const usersInformation= await prisma.user.findMany({
        select:{
            id:true,
            name:true,
            email:true,
            role:true,
            createdAt:true
        }
      });
      res.status(200).json({usersInformation})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"error in fetch data from database"});
    }
}

const getUserById = async(req,res)=>{
    try{
     const userId = Number(req.params.id);
    //  if(!isNaN(userId)){
    //     return res.status(400).json({message:"Invalid user ID"});
    //  }
     const user = await prisma.user.findUnique({
        where:{id:userId},
        select:{
            id:true,
            name:true,
            email:true,
            role:true,
            createdAt:true
        }
     });
     if(!user){
        return res.status(404).json({message:"User not found"});
     }
     res.status(200).json({user})
    }
    catch(error){
     console.error("Get USER BY ID ERROR:",error);
     res.status(500).json({message:"Server error"});
    }
}

const updateUserRole = async(req,res)=>{
    try{
      const userId = Number(req.params.id);
      const {role} = req.body;

       

      if(!["ADMIN","EMPLOYEE"].includes(role)){
        return res.status(400).json({
            message:"Invalid role value",
            allowed:["ADMIN","EMPLOYEE"]
        })
      }
      const existingUser = await prisma.user.findUnique({
        where:{id:userId}
      });
      if(!existingUser){
        return res.status(404).json({message:"User not found"})
      }

      const updatedUser = await prisma.user.update({
        where:{id:userId},
        data:{role},
        select:{
            id:true,
            name:true,
            email:true,
            role:true
        }
      });
      res.status(200).json({
        message:"Role Updated successfully",
        user:updatedUser
      }
      )
    }
    catch(error){
console.error("UPDATE ROLE ERROR:", error);
    res.status(500).json({ message: "Server error" });
    }
}

module.exports = { getUser,getUserById,updateUserRole};