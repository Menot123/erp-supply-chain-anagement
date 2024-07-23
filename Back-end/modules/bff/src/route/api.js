import express from "express"
import apiController from '../controllers/apiController'
const router = express.Router()


const initApiRoutes = (app) => {

    /**
     * @swagger
     * /api/customers:
     *  get:
     *      tags:
     *          - BFF customer service and sale service
     *      summary: Get all quote send
     *      description: Get all quote send with info of customer
     *      responses:
     *          200:
     *              description: Return status of get all quote send.
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/quotes-sent-customers', apiController.getQuoteCustomers);

    /**
     * @swagger
     * /api/quote/:id:
     *  get:
     *      tags:
     *          - BFF customer service and sale service
     *      summary: Get info of quote and info of customer by id
     *      description: Get info of quote and info of customer by id
     *      responses:
     *          200:
     *              description: Return status of get info of quote and info of customer by id.
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/quote-sent/:quoteId', apiController.getQuoteSent);

    return app.use("/api/", router)
}

export default initApiRoutes