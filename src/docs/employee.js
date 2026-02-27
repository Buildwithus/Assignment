/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee Management APIs
 */

/**
 * @swagger
 * /employees/all:
 *   get:
 *     summary: Get all employees with pagination and search
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pageNo
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 100
 *         description: Number of records per page
 *
 *       - in: query
 *         name: searchText
 *         required: false
 *         schema:
 *           type: string
 *           example: david.m@test.com
 *         description: Search by email, name, etc.
 *
 *     responses:
 *       200:
 *         description: Employee list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 totalRecords:
 *                   type: integer
 *                   example: 250
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       name:
 *                         type: string
 *                         example: David Miller
 *                       email:
 *                         type: string
 *                         example: david.m@test.com
 *                       department:
 *                         type: string
 *                         example: IT
 *                       salary:
 *                         type: number
 *                         example: 55000
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 6
 *         description: Employee ID
 *
 *     responses:
 *       200:
 *         description: Employee fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 6
 *                     name:
 *                       type: string
 *                       example: David Miller
 *                     email:
 *                       type: string
 *                       example: david.m@test.com
 *                     department:
 *                       type: string
 *                       example: IT
 *                     salary:
 *                       type: number
 *                       example: 55000
 *
 *       404:
 *         description: Employee not found
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /employees/update/{id}:
 *   put:
 *     summary: Update employee details by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Employee ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - department
 *               - salary
 *             properties:
 *               name:
 *                 type: string
 *                 example: Anuj Kumar
 *               email:
 *                 type: string
 *                 format: email
 *                 example: anuj1.kumar@isourse.com
 *               department:
 *                 type: string
 *                 example: SALES
 *               salary:
 *                 type: number
 *                 format: float
 *                 example: 45.00
 *
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Employee updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Anuj Kumar
 *                     email:
 *                       type: string
 *                       example: anuj1.kumar@isourse.com
 *                     department:
 *                       type: string
 *                       example: SALES
 *                     salary:
 *                       type: number
 *                       example: 45.00
 *
 *       400:
 *         description: Validation error
 *
 *       404:
 *         description: Employee not found
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /employees/delete/{id}:
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 7
 *         description: Employee ID to delete
 *
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Employee deleted successfully
 *
 *       404:
 *         description: Employee not found
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /employees/upload:
 *   post:
 *     summary: Upload employee Excel file
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Upload Excel file (.xlsx)
 *
 *     responses:
 *       200:
 *         description: File uploaded and employees processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Employees uploaded successfully
 *                 totalRecords:
 *                   type: integer
 *                   example: 20
 *
 *       400:
 *         description: Invalid file format or missing file
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *
 *       500:
 *         description: Internal server error
 */
