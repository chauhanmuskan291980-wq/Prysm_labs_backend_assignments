const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, company } = req.body;

        // Check if email already exists
        const existingEmail = await prisma.customer.findUnique({
            where: { email }
        });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check if phone already exists
        const existingPhone = await prisma.customer.findUnique({
            where: { phone }
        });

        if (existingPhone) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        // Create new customer
        const customer = await prisma.customer.create({
            data: {
                name,
                email,
                phone,
                company
            }
        });

        console.log(customer);
        res.status(200).json({ message: "Customer is created successfully", customer });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in creating a new customer" });
    }
}

const getCustomers = async(req,res)=>{
    try{
       const page = parseInt(req.query.page) || 1;
       const limit = parseInt(req.query.limit)  || 10;
       const skip = (page-1)*limit;

       const totalRecords = await prisma.customer.count();

       const customers = await prisma.customer.findMany({
        skip,
        take:limit,
        orderBy:{
            id:"asc"
        }
    });

    const totalPages = Math.ceil(totalRecords/limit);

    res.status(200).json({
        page,
        limit,
        totalPages,
        totalRecords,
        data:customers
    })
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Server error in fetching customers" });
    }
}

module.exports = { createCustomer , getCustomers };
