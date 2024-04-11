import express from 'express';
import session from "express-session"
import loginController from '../controllers/loginController'
import userController from '../controllers/userController'
import jwt from '../middleware/JWTServices';
import apiController from '../controllers/apiController'

let router = express.Router();

// Set up session
router.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    })
)

let initApiRoutes = (app) => {

    // router.all('*', jwt.checkUserJWT);
    // Login and logout
    /**
     * @swagger
     * /api/login:
     *  post:
     *      tags:
     *          - Account
     *      summary: Login to ERP
     *      description: Login to account of ERP with email and password
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string                  
     *      responses:
     *          200:
     *              description: Return status of login.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/login', loginController.handleLogin);

    /**
     * @swagger
     * /api/logout:
     *  post:
     *      tags:
     *          - Account
     *      summary: Log out ERP server
     *      description: Logout ERP server              
     *      responses:
     *          200:
     *              description: Logout Complete.
     *          404:
     *              description: Logout Failed.
     * 
     */
    router.post('/logout', loginController.handleLogoutAccount);

    // Get position employee
    /**
     * @swagger
     * /api/get-allType:
     *  get:
     *      tags:
     *          - Account
     *      summary: Get all users
     *      description: Get all information about users
     *      parameters:
     *          - in: query
     *            name: type     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: Name of type you want to get (position)               
     *      responses:
     *          200:
     *              description: Return status and list of users if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/get-allType', apiController.getAllTypeByType)

    // Authenticated
    router.all('*', jwt.checkUserJWT);

    // Forgot password
    /**
     * @swagger
     * /api/forgot-password:
     *  post:
     *      tags:
     *          - Account
     *      summary: Forgot password
     *      description: Get otp in password to reset password
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          email:
     *                              type: string              
     *      responses:
     *          200:
     *              description: Return status of get otp.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/forgot-password', loginController.handleForgotPassword);

    /**
     * @swagger
     * /api/checking-otp:
     *  post:
     *      tags:
     *          - Account
     *      summary: Checking OTP
     *      description: Checking OTP code recieved from email
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          email:
     *                              type: string
     *                          otp:
     *                              type: string                  
     *      responses:
     *          200:
     *              description: Return status of checking OTP.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/checking-otp', loginController.handleCheckingOTP);

    /**
     * @swagger
     * /api/change-password:
     *  post:
     *      tags:
     *          - Account
     *      summary: Change password (Forgot password)
     *      description: Change password with OTP when forgot password
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          email:
     *                              type: string
     *                          newPass:
     *                              type: string                  
     *      responses:
     *          200:
     *              description: Return status of change password.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/change-password', loginController.handleChangePassword);

    // User reset password while in user account
    /**
     * @swagger
     * /api/reset-password:
     *  post:
     *      tags:
     *          - Account
     *      summary: Reset password (Reset password)
     *      description: Change password for user account when they want to reset their password
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          email:
     *                              type: string
     *                          oldPass:
     *                              type: string  
     *                          newPass:
     *                              type: string                  
     *      responses:
     *          200:
     *              description: Return status of reset password.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/reset-password', userController.handleResetPassword);

    // CRUD user
    /**
     * @swagger
     * /api/employees:
     *  get:
     *      tags:
     *          - Account
     *      summary: Get all users
     *      description: Get all information about users              
     *      responses:
     *          200:
     *              description: Return status and list of users if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/employees', userController.handleGetEmployees);

    /**
    * @swagger
    * /api/employees/:department:
    *  get:
    *      tags:
    *          - Account
    *      summary: Get all employees by department
    *      description: Get all information about employees              
    *      responses:
    *          200:
    *              description: Return status and list of employees following department if exist.
    *          404:
    *              description: Error from server.
    * 
    */
    router.get('/employees/:department', apiController.getEmployeesByDepartment);

    /**
     * @swagger
     * /api/get-employee/{id}:
     *  get:
     *      tags:
     *          - Account
     *      summary: Get user with id
     *      description: Get information about user with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of user you want to get information     
     *      responses:
     *          200:
     *              description: Return status and info of users if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/get-employee', userController.handleGetEmployee);

    /**
     * @swagger
     * /api/create-user:
     *  post:
     *      tags:
     *          - Account
     *      summary: Create new user
     *      description: Create new user for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          idCard:
     *                              type: string
     *                          role:
     *                              type: string
     *                          name:
     *                              type: string
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string
     *                          phone:
     *                              type: string
     *                          gender:
     *                              type: string
     *                          birth:
     *                              type: string  
     *                          address:
     *                              type: string                  
     *      responses:
     *          200:
     *              description: Return status of create new user.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/create-user', userController.handleCreateUser);

    /**
    * @swagger
    * /api/users:
    *  post:
    *      tags:
    *          - Account
    *      summary: Create users 
    *      description: Create users by import file
    *      requestBody:
    *          content:
    *              application/json:
    *                  schema:
    *                      type: object
    *                      properties: 
    *                          firstName:
    *                              type: string
    *                          lastName:
    *                              type: string
    *                          email:
    *                              type: string
    *                          phone:
    *                              type: string
    *                          birth:
    *                              type: string
    *                          address:
    *                              type: string                  
    *      responses:
    *          200:
    *              description: Return status of create new users.
    *          404:
    *              description: Error from server.
    * 
    */
    router.post('/users', apiController.handleCreateUsers);

    /**
     * @swagger
     * /api/update-profile-employee/{id}:
     *  patch:
     *      tags:
     *          - Account
     *      summary: Update user
     *      description: Update user information for ERP system
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of user you want to get update   
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          idCard:
     *                              type: string
     *                          role:
     *                              type: string
     *                          name:
     *                              type: string
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string
     *                          phone:
     *                              type: string
     *                          gender:
     *                              type: string
     *                          birth:
     *                              type: string  
     *                          address:
     *                              type: string                  
     *      responses:
     *          200:
     *              description: Return status of update user.
     *          404:
     *              description: Error from server.
     * 
     */
    router.patch('/update-profile-employee', userController.handleUpdateEmployee);

    /**
     * @swagger
     * /api/users/{id}:
     *  delete:
     *      tags:
     *          - Account
     *      summary: Delete user with id
     *      description: Delete user from account with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of user you want to delete               
     *      responses:
     *          200:
     *              description: Return status of delete user.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/user', userController.handleDeleteUser);

    /**
   * @swagger
   * /api/department:
   *  post:
   *      tags:
   *          - Account
   *      summary: Create a department 
   *      description: Create a new department
   *      requestBody:
   *          content:
   *              application/json:
   *                  schema:
   *                      type: object
   *                      properties: 
   *                          nameVi:
   *                              type: string
   *                          nameEn:
   *                              type: string
   *                          departmentCode:
   *                              type: string
   *                          managerId:
   *                              type: integer              
   *      responses:
   *          200:
   *              description: Return status of create new department.
   *          404:
   *              description: Error from server.
   * 
   */
    router.post('/department', apiController.handleCreateDepartment);


    /**
     * @swagger
     * /api/departments:
     *  get:
     *      tags:
     *          - Account
     *      summary: Get all departments
     *      description: Get all departments in database             
     *      responses:
     *          200:
     *              description: Return status and list of departments if status is active.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/departments', apiController.handleGetAllDepartments);


    return app.use("/api/", router)
}

// Example Schema in Database
// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Book:
//  *       type: object
//  *       required:
//  *         - title
//  *         - author
//  *         - finished
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: The auto-generated id of the book
//  *         title:
//  *           type: string
//  *           description: The title of your book
//  *         author:
//  *           type: string
//  *           description: The book author
//  *         finished:
//  *           type: boolean
//  *           description: Whether you have finished reading the book
//  *         createdAt:
//  *           type: string
//  *           format: date
//  *           description: The date the book was added
//  *       example:
//  *         id: d5fE_asz
//  *         title: The New Turing Omnibus
//  *         author: Alexander K. Dewdney
//  *         finished: false
//  *         createdAt: 2020-03-10T04:05:06.157Z
//  */

module.exports = initApiRoutes;