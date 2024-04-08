import express from 'express';
// import session from "express-session"
import productController from '../controllers/productController'
// import userController from '../controllers/userController'
// import jwt from '../middleware/JWTServices';
import apiController from '../controllers/apiController'

let router = express.Router();


let initApiRoutes = (app) => {

    // All Code api
    /**
     * @swagger
     * /api/get-allCode:
     *  get:
     *      tags:
     *          - All code
     *      summary: Get all code api by type
     *      description: Get all information about all code api by type
     *      parameters:
     *          - in: query
     *            name: type     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: Name of type you want to get (position)               
     *      responses:
     *          200:
     *              description: Return status and list of code by type.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/get-allCode', apiController.getAllCodeByType)

    /**
     * @swagger
     * /api/create-new-product-group:
     *  post:
     *      tags:
     *          - All code
     *      summary: Create new product group
     *      description: Create new product group
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          valueVi:
     *                              type: string
     *                          valueEn:
     *                              type: string              
     *      responses:
     *          200:
     *              description: Return status of create new product group.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/create-new-product-group', apiController.createNewProductGroup)

    /**
     * @swagger
     * /api/delete-product-group/{keyType}:
     *  delete:
     *      tags:
     *          - All code
     *      summary: Delete product group
     *      description: Delete information of product group
     *      parameters:
     *          - in: path
     *            name: keyType     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: Key type of group you want to delete              
     *      responses:
     *          200:
     *              description: Return status of deleteProductGroup.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/delete-product-group/:keyType', apiController.deleteProductGroup)

    // Product api
    /**
     * @swagger
     * /api/products:
     *  get:
     *      tags:
     *          - Product
     *      summary: Get all products
     *      description: Get all information about products            
     *      responses:
     *          200:
     *              description: Return status and list of products if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/products', productController.handleGetProducts)

    /**
     * @swagger
     * /api/products/{id}:
     *  get:
     *      tags:
     *          - Product
     *      summary: Get product with id
     *      description: Get information about product with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of product you want to get information     
     *      responses:
     *          200:
     *              description: Return status and info of product if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/products/:id', productController.handleGetProduct)

    /**
     * @swagger
     * /api/products:
     *  post:
     *      tags:
     *          - Product
     *      summary: Create new product
     *      description: Create new product for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          barCode:
     *                              type: string
     *                          nameVi:
     *                              type: string
     *                          nameEn:
     *                              type: string
     *                          type:
     *                              type: string
     *                          group:
     *                              type: string
     *                          image:
     *                              type: string
     *                          cost:
     *                              type: integer  
     *                          unit:
     *                              type: string      
     *                          descriptionVi:
     *                              type: string
     *                          descriptionEn:
     *                              type: string  
     *                          expiry:
     *                              type: integer              
     *      responses:
     *          200:
     *              description: Return status of create new product.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/products', productController.handleCreateProduct)

    /**
     * @swagger
     * /api/products/{id}:
     *  put:
     *      tags:
     *          - Product
     *      summary: Update product information
     *      description: Update product for ERP system
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of product you want to update    
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          barCode:
     *                              type: string
     *                          nameVi:
     *                              type: string
     *                          nameEn:
     *                              type: string
     *                          type:
     *                              type: string
     *                          group:
     *                              type: string
     *                          image:
     *                              type: string
     *                          cost:
     *                              type: integer  
     *                          unit:
     *                              type: string      
     *                          descriptionVi:
     *                              type: string
     *                          descriptionEn:
     *                              type: string  
     *                          expiry:
     *                              type: integer              
     *      responses:
     *          200:
     *              description: Return status of update product.
     *          404:
     *              description: Error from server.
     * 
     */
    router.put('/products/:id', productController.handleUpdateProduct)

    /**
     * @swagger
     * /api/products/{id}:
     *  delete:
     *      tags:
     *          - Product
     *      summary: Delete product with id
     *      description: Delete a product with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of product you want to delete
     *      responses:
     *          200:
     *              description: Return status and info of delete product.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/products/:id', productController.handleDeleteProduct)

    return app.use("/api/", router)
}

module.exports = initApiRoutes;