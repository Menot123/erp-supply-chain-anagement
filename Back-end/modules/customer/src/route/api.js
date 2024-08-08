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

    /**
 * @swagger
 * /api/customers:
 *  get:
 *      tags:
 *          - Customer
 *      summary: Get all customer
 *      responses:
 *          200:
 *              description: Return customer pagination.
 *          500:
 *              description: Error from server.
 * 
 */
    router.get('/customers-pagination', apiController.getCustomersPagination);

    /**
    * @swagger
    * /api/customer:
    *  post:
    *      tags:
    *          - Customer
    *      summary: Create a new customer
    *      responses:
    *          200:
    *              description: Return status create a new customer.
    *          500:
    *              description: Error from server.
    * 
    */
    router.post('/customer', apiController.createNewCustomer);

    /**
    * @swagger
    * /api/customer:
    *  delete:
    *      tags:
    *          - Customer
    *      summary: Delete a customer
    *      responses:
    *          200:
    *              description: Return status delete a customer.
    *          500:
    *              description: Error from server.
    * 
    */
    router.delete('/customer', apiController.deleteCustomer);

    /**
    * @swagger
    * /api/customer:
    *  put:
    *      tags:
    *          - Customer
    *      summary: Update a customer
    *      responses:
    *          200:
    *              description: Return status update a customer.
    *          500:
    *              description: Error from server.
    * 
    */
    router.put('/customer/:id', apiController.updateCustomer);

    /**
     * @swagger
     * /api/customer:
     *  post:
     *      tags:
     *          - Customer
     *      summary: customer login
     *      responses:
     *          200:
     *              description: Return status login of the customer.
     *          500:
     *              description: Error from server.
     * 
     */
    router.post('/auth/login', apiController.loginCustomer);

    router.post('/customers', apiController.createListCustomer);


    return app.use("/api/", router)
}

export default initApiRoutes