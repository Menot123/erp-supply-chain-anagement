import express from "express"
import apiController from '../controllers/apiController'
import paymentController from '../controllers/paymentController'
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Sử dụng bộ nhớ để lưu trữ file trong bộ nhớ đệm
const router = express.Router()


const initApiRoutes = (app) => {

    /**
     * @swagger
     * /api/company-data:
     *  post:
     *      tags:
     *          - Sales
     *      summary: Create info of company
     *      description: Create the company data
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          name:
     *                              type: string
     *                          logo:
     *                              type: string
     *                          address:
     *                              type: string
     *                          phone:
     *                              type: string  
     *                          taxId:
     *                              type: string
     *                          email:
     *                              type: string
     *                          money:
     *                              type: string    
     *                          website:
     *                              type: string  
     *                          status:
     *                              type: string    
     *      responses:
     *          200:
     *              description: Return status of create company data.
     *          500:
     *              description: Error from server.
     * 
     */
    router.post('/company', apiController.createCompanyData);

    /**
     * @swagger
     * /api/company-data-branch:
     *  post:
     *      tags:
     *          - Sales
     *      summary: Create info a branch of company
     *      description: Create the a branch of company data
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          name:
     *                              type: string
     *                          mainCompanyId:
     *                              type: integer
     *                          logo:
     *                              type: string
     *                          address:
     *                              type: string
     *                          phone:
     *                              type: string  
     *                          taxId:
     *                              type: string
     *                          email:
     *                              type: string
     *                          money:
     *                              type: string    
     *                          website:
     *                              type: string    
     *                          status:
     *                              type: string   
     *      responses:
     *          200:
     *              description: Return status of create a branch of company data.
     *          500:
     *              description: Error from server.
     * 
     */
    router.post('/company-branch', apiController.createBranchCompanyData);

    /**
     * @swagger
     * /api/company-branches:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Get branches company
     *      description: Get list branch of main company   
     *      responses:
     *          200:
     *              description: Return status and data is list branches company.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/company-branches', apiController.getBranches);

    /**
     * @swagger
     * /api/company-branch:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Get info branch company
     *      description: Get detail info branch of main company   
     *      responses:
     *          200:
     *              description: Return status and data is info branch by id.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/company-branch', apiController.getBranch);

    /**
     * @swagger
     * /api/company:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Get info company
     *      description: Get detail info company   
     *      responses:
     *          200:
     *              description: Return status and data is info company by id.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/company', apiController.getDetailCompany);

    /**
     * @swagger
     * /api/company:
     *  delete:
     *      tags:
     *          - Sales
     *      summary: Delete company 
     *      description: Delete branch of company
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          idCompany:
     *                              type: string
     *      responses:
     *          200:
     *              description: Return status of delete new company.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/company', apiController.handleDeleteCompany);

    /**
     *  @swagger
     * /api/company-confirm-quotes:
     *  post:
     *      tags:
     *          - Sales
     *      summary: Create a method confirm quote
     *      description: Create a method confirm quote 
     *      requestBody:
     *           content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          confirmQuote:
     *                              type: string
     *      responses:
     *          200:
     *              description: Return status of create a confirm quote method.
     *          500:
     *              description: Error from server.
     * 
     */
    router.post('/company-confirm-quotes', apiController.updateConfirmQuote);

    /**
     * @swagger
     * /api/customers:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Get customers
     *      description: Get list customers for quote 
     *      responses:
     *          200:
     *              description: Return status and list customers in db.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/customers', apiController.getCustomers);

    /**
     * @swagger
     * /api/allcodes:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Get all codes 
     *      description: Get all codes from sale service
     *      responses:
     *          200:
     *              description: Return status and list all codes in sale db. 
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/all-codes', apiController.getAllCodes);

    /**
     * @swagger
     * /api/comments:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Get comments by id quote
     *      description: Get comments from customer by quote id 
     *      responses:
     *          200:
     *              description: Return status and list comments in sale db. 
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/comments/:id', apiController.getComments);

    /**
     * @swagger
     * /api/comment:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Post new comment or reply comment
     *      description: Create new comment or reply comment
     *      responses:
     *          200:
     *              description: Return status create comment or reply. 
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/comment', apiController.postComment);

    /**
     * @swagger
     * /api/comment:
     *  patch:
     *      tags:
     *          - Sales
     *      summary: Patch data comment to update
     *      description: Update content a comment by id
     *      responses:
     *          200:
     *              description: Return status update comment. 
     *          404:
     *              description: Error from server.
     * 
     */
    router.patch('/comment', apiController.updateComment);

    /**
     * @swagger
     * /api/comment:
     *  delete:
     *      tags:
     *          - Sales
     *      summary: Delete a comment
     *      description: Delete a comment by id
     *      responses:
     *          200:
     *              description: Return status delete a comment. 
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/comment/:commentId', apiController.deleteComment);

    /**
     * @swagger
     * /api/quote:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Get the last quote
     *      description: Get the last quote by created At
     *      responses:
     *          200:
     *              description: Return a quote latest
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/quote', apiController.getLatestQuote);

    /**
     * @swagger
     * /api/sending-quote:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Sending quote to email
     *      description: Sending quote to email and update status of quote.
     *      responses:
     *          200:
     *              description: Return status sending quote and update status of quote
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/sending-quote', upload.single('quoteFile'), apiController.sendingQuote);

    /**
 * @swagger
 * /api/sending-invoice:
 *  get:
 *      tags:
 *          - Sales
 *      summary: Sending invoice to email
 *      description: Sending invoice to email and update status of invoice.
 *      responses:
 *          200:
 *              description: Return status sending invoice and update status of invoice
 *          404:
 *              description: Error from server.
 * 
 */
    router.post('/sending-invoice', upload.single('quoteFile'), apiController.sendingInvoice);

    /**
    * @swagger
    * /api/quote:
    *  post:
    *      tags:
    *          - Sales
    *      summary: Create a quote
    *      responses:
    *          201:
    *              description: Return status create a quote. 
    *          500:
    *              description: Error from server.
    * 
    */
    router.post('/quote', apiController.postQuote);

    /**
   * @swagger
   * /api/quote:
   *  put:
   *      tags:
   *          - Sales
   *      summary: Update status of quote
   *      responses:
   *          204:
   *              description: Return status update the quote. 
   *          500:
   *              description: Error from server.
   * 
   */
    router.put('/quote/:quoteId', apiController.updateStatusQuote);

    /**
     * @swagger
     * /api/quote:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Get the data quote for review
     *      description: Get  data quote for review by quoteId
     *      responses:
     *          200:
     *              description: Return data quote by id
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/data-preview-quote/:quoteId', apiController.getDataPreviewQuote);

    /**
     * @swagger
     * /api/cancel-quote:
     *  post:
     *      tags:
     *          - Sales
     *      summary: cancel a quote 
     *      description: cancel a quote by id
     *      responses:
     *          200:
     *              description: Return a status delete quote
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/cancel-quote', upload.single('quoteFile'), apiController.postCancelQuote);

    /**
    * @swagger
    * /api/invoice:
    *  post:
    *      tags:
    *          - Sales
    *      summary: Create an draft invoice
    *      responses:
    *          201:
    *              description: Return status create an draft invoice. 
    *          500:
    *              description: Error from server.
    * 
    */
    router.post('/invoice', apiController.postInvoice);



    /**
     * @swagger
     * /api/invoice:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Get data of the draft invoice by invoiceId
     *      responses:
     *          200:
     *              description: Return a data invoice by id
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/data-preview-invoice/:invoiceId', apiController.getDataPreviewInvoice);

    /**
    * @swagger
    * /api/invoice:
    *  put:
    *      tags:
    *          - Sales
    *      summary: Update status of the invoice
    *      responses:
    *          201:
    *              description: Return status update status of the invoice. 
    *          500:
    *              description: Error from server.
    * 
    */
    router.put('/invoice', apiController.confirmInvoice);

    router.put('/invoice-status/:id', apiController.updateStatusInvoice)

    /**
    * @swagger
    * /api/invoice/paid:
    *  post:
    *      tags:
    *          - Sales
    *      summary: Confirm paid invoice
    *      responses:
    *          201:
    *              description: Return status create paid of the invoice. 
    *          500:
    *              description: Error from server.
    * 
    */
    router.post('/invoice/paid', apiController.paidInvoice);

    /**
    * @swagger
    * /api/invoices-paid:
    *  get:
    *      tags:
    *          - Sales
    *      summary: Get all paid invoices
    *      responses:
    *          201:
    *              description: Return status get all paid invoices. 
    *          500:
    *              description: Error from server.
    * 
    */
    router.get('/invoices-paid', apiController.getInvoicesPaid);

    /**
* @swagger
* /api/invoices:
*  get:
*      tags:
*          - Sales
*      summary: Get all paid invoices not paying
*      responses:
*          201:
*              description: Return status get all paid invoices not paying. 
*          500:
*              description: Error from server.
* 
*/
    router.get('/invoices', apiController.getInvoices);

    /**
    * @swagger
    * /api/quotes-sent:
    *  get:
    *      tags:
    *          - Sales
    *      summary: Get all paid invoices
    *      responses:
    *          201:
    *              description: Return status get all paid invoices. 
    *          500:
    *              description: Error from server.
    * 
    */
    router.get('/quotes-sent', apiController.getQuotesSent);

    /**
    * @swagger
    * /api/delete-quotes-sent:
    *  get:
    *      tags:
    *          - Sales
    *      summary: delete quotes sent in sale order list
    *      responses:
    *          201:
    *              description: Return status delete quotes sent in sale order list. 
    *          500:
    *              description: Error from server.
    * 
    */
    router.delete('/delete-quotes-sent', apiController.deleteQuotesSent);

    /**
    * @swagger
    * /api/delete-invoices:
    *  get:
    *      tags:
    *          - Sales
    *      summary: delete invoices in sale order list
    *      responses:
    *          201:
    *              description: Return status delete invoices in sale order list. 
    *          500:
    *              description: Error from server.
    * 
    */
    router.delete('/delete-invoices', apiController.deleteInvoices);

    /**
    * @swagger
    * /api/invoice-paid:
    *  get:
    *      tags:
    *          - Sales
    *      summary: Get info of invoice paid
    *      responses:
    *          201:
    *              description: Return status info of invoice paid. 
    *          500:
    *              description: Error from server.
    * 
    */
    router.get('/invoice-paid/:invoiceId', apiController.getInvoicePaid);

    /**
     * @swagger
     * /api/statistic/invoices-paid:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Get info of invoice paid
     *      responses:
     *          201:
     *              description: Return status info of invoice paid. 
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/statistic/invoices-paid', apiController.getStatistics);

    /**
     * @swagger
     * /create-payment:
     *  post:
     *    tags:
     *      - Payment
     *    summary: Create a VNPay payment
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              orderId:
     *                type: string
     *                example: "123456"
     *              amount:
     *                type: integer
     *                example: 1000000
     *              orderDescription:
     *                type: string
     *                example: "Payment for order 123456"
     *              bankCode:
     *                type: string
     *                example: "NCB"
     *              locale:
     *                type: string
     *                example: "vn"
     *    responses:
     *      200:
     *        description: Return payment URL.
     *      500:
     *        description: Error from server.
     */
    router.post('/create-payment', paymentController.createPayment);

    /**
     * @swagger
     * /payment-return:
     *  get:
     *    tags:
     *      - Payment
     *    summary: Handle VNPay return URL after payment
     *    parameters:
     *      - in: query
     *        name: vnp_TmnCode
     *        schema:
     *          type: string
     *        required: true
     *        description: Tmn code from VNPay
     *      - in: query
     *        name: vnp_Amount
     *        schema:
     *          type: integer
     *        required: true
     *        description: Amount paid
     *      - in: query
     *        name: vnp_BankCode
     *        schema:
     *          type: string
     *        required: true
     *        description: Bank code
     *      - in: query
     *        name: vnp_ResponseCode
     *        schema:
     *          type: string
     *        required: true
     *        description: Response code from VNPay
     *      - in: query
     *        name: vnp_TransactionNo
     *        schema:
     *          type: string
     *        required: true
     *        description: Transaction number from VNPay
     *      - in: query
     *        name: vnp_TxnRef
     *        schema:
     *          type: string
     *        required: true
     *        description: Order ID
     *      - in: query
     *        name: vnp_SecureHash
     *        schema:
     *          type: string
     *        required: true
     *        description: Secure hash from VNPay
     *    responses:
     *      200:
     *        description: Payment verification successful.
     *      400:
     *        description: Payment verification failed.
     */
    router.get('/payment-return', paymentController.paymentReturn);

    /**
     * @swagger
     * /api/sending-mail-custom:
     *  get:
     *      tags:
     *          - Sales
     *      summary: Sending a custom to email
     *      description: Sending a custom to email and update status of quote.
     *      responses:
     *          200:
     *              description: Return status sending custom email
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/sending-mail-custom', upload.single('quoteFile'), apiController.sendCustomMail);

    router.post('/sendingEmails', apiController.sendEmails);


    router.put('/cancel-quote/:quoteId', apiController.cancelQuote);

    return app.use("/api/", router)
}

export default initApiRoutes