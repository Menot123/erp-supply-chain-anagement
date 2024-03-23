import express from 'express';
import session from "express-session"
import homeController from '../controllers/homeController'
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

    router.get('/', homeController.getHomePage);

    // Login and logout
    router.post('/login', loginController.handleLogin);
    router.post('/logout', loginController.handleLogoutAccount);

    // Get position employee
    router.get('/get-allType', apiController.getAllTypeByType)

    // Authenticated
    router.all('*', jwt.checkUserJWT);

    // Forgot password
    router.post('/forgot-password', loginController.handleForgotPassword);
    router.post('/checking-otp', loginController.handleCheckingOTP);
    router.post('/change-password', loginController.handleChangePassword);

    // CRUD user
    router.get('/employees', userController.handleGetEmployees);
    router.get('/get-employee/:id', userController.handleGetUser);
    router.post('/create-user', userController.handleCreateUser);
    router.patch('/update-profile-employee', userController.handleUpdateEmployee);
    // router.delete('/users/:id', userController.handleDeleteUser);

    return app.use("/api/", router)
}

module.exports = initApiRoutes;