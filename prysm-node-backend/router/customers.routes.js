const express = require("express");
const router = express.Router();
const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require("../Controller/customer.controller");
const validate = require("../middleware/validate");
const { createCustomerSchema } = require("../validation/customer.schema");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");


/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer details
 *       404:
 *         description: Customer not found
 *
 *   patch:
 *     summary: Update a customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 *       409:
 *         description: Email or phone already exists
 *
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */

/**
 * GET /customers/:id
 * Returns single customer by id
 */
router.get(
    "/customers/:id",
    authMiddleware,
    getCustomerById
);

/**
 * PATCH /customers/:id
 * Updates customer details
 */
router.patch(
    "/customers/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    validate(createCustomerSchema),
    updateCustomer
);

/**
 * DELETE /customers/:id
 * Deletes a customer
 */
router.delete(
    "/customers/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteCustomer
);

module.exports = router;