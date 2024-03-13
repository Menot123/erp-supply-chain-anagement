import express from 'express';
import homeController from '../controllers/homeController'
import loginController from '../controllers/loginController'
import userController from '../controllers/userController'
import jwt from '../middleware/JWTServices';

let router = express.Router();

let initApiRoutes = (app) => {

    router.all('*', jwt.checkUserJWT);
    router.get('/', homeController.getHomePage);

    // Login and logout
    router.post('/login', loginController.handleLogin);
    router.post('/logout', loginController.handleLogout);

    // CRUD user
    router.get('/users', userController.handleGetUsers);
    router.get('/users/:id', userController.handleGetUser);
    router.post('/users', userController.handleCreateUser);
    router.put('/users/:id', userController.handleUpdateUser);
    router.delete('/users/:id', userController.handleDeleteUser);

    return app.use("/api", router)
}

module.exports = initApiRoutes;