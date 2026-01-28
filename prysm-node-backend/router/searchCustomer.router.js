const express = require("express");
const router = express.Router();
const {getCustomersVBySearch} = require("../Controller/searchCustomer.controller");
const validateSearch = require("../middleware/serachValidation");
const {getCustomersQuerySchema} = require("../validation/customer.schema");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");


/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get customers (search + pagination)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, email, phone, or company
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Page size
 *     responses:
 *       200:
 *         description: Customers list
 *       401:
 *         description: Unauthorized
 */

router.get(
    "/customers-search",
    authMiddleware,
    validateSearch(getCustomersQuerySchema,"query"),
    getCustomersVBySearch,
)

module.exports = router;