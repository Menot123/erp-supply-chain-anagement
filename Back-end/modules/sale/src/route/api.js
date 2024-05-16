import express from "express"
import apiController from '../controllers/apiController'

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
    router.get('/comments', apiController.getComments);

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


    return app.use("/api/", router)

}

export default initApiRoutes