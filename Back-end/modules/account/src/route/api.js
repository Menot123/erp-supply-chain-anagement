import express from 'express';
import session from "express-session"
import homeController from '../controllers/homeController'
import loginController from '../controllers/loginController'
import userController from '../controllers/userController'
import jwt from '../middleware/JWTServices';

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

    router.all('*', jwt.checkUserJWT);
    router.get('/', homeController.getHomePage);

    // Login and logout
    router.post('/login', loginController.handleLogin);
    router.post('/logout', loginController.handleLogoutAccount);

    // Forgot password
    router.post('/forgot-password', loginController.handleForgotPassword);
    router.post('/checking-otp', loginController.handleCheckingOTP);
    router.post('/change-password', loginController.handleChangePassword);

    // CRUD user
    router.get('/users', userController.handleGetUsers);
    router.get('/users/:id', userController.handleGetUser);
    router.post('/users', userController.handleCreateUser);
    router.put('/users/:id', userController.handleUpdateUser);
    router.delete('/users/:id', userController.handleDeleteUser);

    return app.use("/api", router)
}

module.exports = initApiRoutes;