import express from "express"
import apiController from '../controllers/apiController'
const router = express.Router()


const initApiRoutes = (app) => {

    /**
     * @swagger
     * /api/customers:
     *  get:
     *      tags:
     *          - Customer
     *      summary: Get all customers
     *      description: Get list customers
     *      responses:
     *          200:
     *              description: Return status of get list customer.
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/customers', apiController.getCustomers);

    /**
     * @swagger
     * /api/customer/:id:
     *  get:
     *      tags:
     *          - Customer
     *      summary: Get information of customer by id
     *      description: Get information of customer by id
     *      responses:
     *          200:
     *              description: Return info of customer by id.
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/customer/:id', apiController.getCustomerById);

    return app.use("/api/", router)
}

export default initApiRoutes