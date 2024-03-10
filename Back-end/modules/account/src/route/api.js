import express from 'express';
import homeController from '../controllers/homeController'
import apiController from '../controllers/apiController'
import jwt from '../middleware/JWTServices';

let router = express.Router();

let initApiRoutes = (app) => {

    router.all('*', jwt.checkUserJWT);
    router.get('/', homeController.getHomePage);
    router.post('/login', apiController.handleLogin);
    router.post('/logout', apiController.handleLogout);

    return app.use("/api", router)
}

module.exports = initApiRoutes;