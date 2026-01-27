const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /customers/:id
const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await prisma.customer.findUnique({
            where: { id: parseInt(id) }
        });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ customer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in fetching customer" });
    }
};

// PATCH /customers/:id
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, company } = req.body;

        // Check if customer exists
        const existingCustomer = await prisma.customer.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Check unique email
        if (email && email !== existingCustomer.email) {
            const emailExists = await prisma.customer.findUnique({ where: { email } });
            if (emailExists) {
                return res.status(409).json({ message: "Email already exists" });
            }
        }

        // Check unique phone
        if (phone && phone !== existingCustomer.phone) {
            const phoneExists = await prisma.customer.findUnique({ where: { phone } });
            if (phoneExists) {
                return res.status(409).json({ message: "Phone number already exists" });
            }
        }

        // Update customer
        const updatedCustomer = await prisma.customer.update({
            where: { id: parseInt(id) },
            data: { name, email, phone, company }
        });

        res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in updating customer" });
    }
};

// DELETE /customers/:id
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if customer exists
        const existingCustomer = await prisma.customer.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        await prisma.customer.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: "Customer deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in deleting customer" });
    }
};

module.exports = { getCustomerById, updateCustomer, deleteCustomer };

