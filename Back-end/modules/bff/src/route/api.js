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
     * /api/customers:
     *  get:
     *      tags:
     *          - BFF customer service and purchase service
     *      summary: Get all quote send
     *      description: Get all quote send with info of customer
     *      responses:
     *          200:
     *              description: Return status of get all quote send.
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/quotes-sent-providers', apiController.getQuoteProviders);

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
    router.get('/quote-sent-provider/:quoteId', apiController.getQuoteSentProvider);

    /**
     * @swagger
     * /api/invoices:
     *  get:
     *      tags:
     *          - BFF customer service and sale service to get all invoice
     *      summary: Get info of invoices and info of customer 
     *      description: Get info of invoices and info of customer 
     *      responses:
     *          200:
     *              description: Return status of get info of invoices and info of customer.
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/invoices', apiController.getAllInvoices);

    /**
     * @swagger
     * /api/invoice/:id:
     *  get:
     *      tags:
     *          - BFF customer service and sale service
     *      summary: Get info of invoice and info of customer by id
     *      description: Get info of invoice and info of customer by id
     *      responses:
     *          200:
     *              description: Return status of get info of invoice and info of customer by id.
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/invoice/:invoiceId', apiController.getInvoice);

    /**
    * @swagger
    * /api/stockDeliverys/{id}:
    *  get:
    *      tags:
    *          - StockDelivery
    *      summary: Get stockDelivery with id
    *      description: Get information about stockDelivery with id
    *      parameters:
    *          - in: path
    *            name: id     
    *            required: true            
    *            schema:     
    *                type: string
    *            description: ID of stockDelivery you want to get information 
    *      responses:
    *          200:
    *              description: Return status and info of stockDelivery if exist.
    *          404:
    *              description: Error from server.
    * 
    */
    router.get('/stockDeliveryById/:id', apiController.getStockDeliveryById);

    /**
     * @swagger
     * /api/invoices:customerId:
     *  get:
     *      tags:
     *          - BFF customer service and sale service to get all invoice
     *      summary: Get info of invoices and info of customer 
     *      description: Get info of invoices and info of customer 
     *      responses:
     *          200:
     *              description: Return status of get info of invoices and info of customer.
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/customer/invoices/:id', apiController.getAllInvoicesByCustomer);

    return app.use("/api/", router)
}

export default initApiRoutes