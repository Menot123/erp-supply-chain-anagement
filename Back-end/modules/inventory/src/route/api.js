import express from 'express';
// import session from "express-session"
import productController from '../controllers/productController'
import customerController from '../controllers/customerController'
import providerController from '../controllers/providerController'
import warehouseController from '../controllers/warehouseController'
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
     *      parameters:
     *          - in: query
     *            name: page             
     *            schema:     
     *                type: number
     *            description: Current page (can empty)    
     *          - in: query
     *            name: limit             
     *            schema:     
     *                type: number
     *            description: Limit in  (can empty)         
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

    router.post('/import-products', productController.handleImportProduct)

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

    // Customer API
    /**
     * @swagger
     * /api/customers:
     *  get:
     *      tags:
     *          - Customer
     *      summary: Get all customers
     *      description: Get all information about customers                
     *      responses:
     *          200:
     *              description: Return status and list of customers if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/customers', customerController.handleGetCustomers)

    /**
     * @swagger
     * /api/customers/{id}:
     *  get:
     *      tags:
     *          - Customer
     *      summary: Get customer with id
     *      description: Get information about customer with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of customer you want to get information 
     *      responses:
     *          200:
     *              description: Return status and info of customer if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/customers/:id', customerController.handleGetCustomer)

    /**
     * @swagger
     * /api/customers:
     *  post:
     *      tags:
     *          - Customer
     *      summary: Create new customer
     *      description: Create new customer for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          nameVi:
     *                              type: string
     *                          nameEn:
     *                              type: string
     *                          addressVi:
     *                              type: string
     *                          addressEn:
     *                              type: string
     *                          logo:
     *                              type: string
     *                          contact:
     *                              type: string  
     *                          website:
     *                              type: string                 
     *      responses:
     *          200:
     *              description: Return status of create new customer.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/customers', customerController.handleCreateCustomer)

    /**
     * @swagger
     * /api/customers/{id}:
     *  put:
     *      tags:
     *          - Customer
     *      summary: Update customer information
     *      description: Update customer for ERP system
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of customer you want to update    
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          nameVi:
     *                              type: string
     *                          nameEn:
     *                              type: string
     *                          addressVi:
     *                              type: string
     *                          addressEn:
     *                              type: string
     *                          logo:
     *                              type: string
     *                          contact:
     *                              type: string  
     *                          website:
     *                              type: string            
     *      responses:
     *          200:
     *              description: Return status of update customer.
     *          404:
     *              description: Error from server.
     * 
     */
    router.put('/customers/:id', customerController.handleUpdateCustomer)

    /**
     * @swagger
     * /api/customers/{id}:
     *  delete:
     *      tags:
     *          - Customer
     *      summary: Delete customer with id
     *      description: Delete a customer with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of customer you want to delete
     *      responses:
     *          200:
     *              description: Return status and info of delete customer.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/customers/:id', customerController.handleDeleteCustomer)

    // Provider API
    /**
     * @swagger
     * /api/providers:
     *  get:
     *      tags:
     *          - Provider
     *      summary: Get all providers
     *      description: Get all information about providers                
     *      responses:
     *          200:
     *              description: Return status and list of providers if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/providers', providerController.handleGetProviders)

    /**
     * @swagger
     * /api/providers/{id}:
     *  get:
     *      tags:
     *          - Provider
     *      summary: Get provider with id
     *      description: Get information about provider with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of provider you want to get information 
     *      responses:
     *          200:
     *              description: Return status and info of provider if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/providers/:id', providerController.handleGetProvider)

    /**
     * @swagger
     * /api/providers:
     *  post:
     *      tags:
     *          - Provider
     *      summary: Create new provider
     *      description: Create new provider for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          nameVi:
     *                              type: string
     *                          nameEn:
     *                              type: string
     *                          addressVi:
     *                              type: string
     *                          addressEn:
     *                              type: string
     *                          logo:
     *                              type: string
     *                          contact:
     *                              type: string  
     *                          website:
     *                              type: string                 
     *      responses:
     *          200:
     *              description: Return status of create new provider.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/providers', providerController.handleCreateProvider)

    /**
     * @swagger
     * /api/providers/{id}:
     *  put:
     *      tags:
     *          - Provider
     *      summary: Update provider information
     *      description: Update provider for ERP system
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of provider you want to update    
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          nameVi:
     *                              type: string
     *                          nameEn:
     *                              type: string
     *                          addressVi:
     *                              type: string
     *                          addressEn:
     *                              type: string
     *                          logo:
     *                              type: string
     *                          contact:
     *                              type: string  
     *                          website:
     *                              type: string            
     *      responses:
     *          200:
     *              description: Return status of update provider.
     *          404:
     *              description: Error from server.
     * 
     */
    router.put('/providers/:id', providerController.handleUpdateProvider)

    /**
     * @swagger
     * /api/providers/{id}:
     *  delete:
     *      tags:
     *          - Provider
     *      summary: Delete provider with id
     *      description: Delete a provider with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of provider you want to delete
     *      responses:
     *          200:
     *              description: Return status and info of delete provider.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/providers/:id', providerController.handleDeleteProvider)

    // Warehouse API
    /**
     * @swagger
     * /api/warehouses:
     *  get:
     *      tags:
     *          - Warehouse
     *      summary: Get all warehouses
     *      description: Get all information about warehouses                
     *      responses:
     *          200:
     *              description: Return status and list of warehouses if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/warehouses', warehouseController.handleGetWarehouses)

    /**
     * @swagger
     * /api/warehouses/{id}:
     *  get:
     *      tags:
     *          - Warehouse
     *      summary: Get warehouse with id
     *      description: Get information about warehouse with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of warehouse you want to get information 
     *      responses:
     *          200:
     *              description: Return status and info of warehouse if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/warehouses/:id', warehouseController.handleGetWarehouse)

    /**
     * @swagger
     * /api/warehouses:
     *  post:
     *      tags:
     *          - Warehouse
     *      summary: Create new warehouse
     *      description: Create new warehouse for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          nameVi:
     *                              type: string
     *                          nameEn:
     *                              type: string
     *                          location:
     *                              type: string
     *                          capacity:
     *                              type: integer             
     *      responses:
     *          200:
     *              description: Return status of create new warehouse.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/warehouses', warehouseController.handleCreateWarehouse)

    /**
     * @swagger
     * /api/warehouses/{id}:
     *  put:
     *      tags:
     *          - Warehouse
     *      summary: Update warehouse information
     *      description: Update warehouse for ERP system
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of warehouse you want to update    
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          nameVi:
     *                              type: string
     *                          nameEn:
     *                              type: string
     *                          location:
     *                              type: string
     *                          capacity:
     *                              type: integer           
     *      responses:
     *          200:
     *              description: Return status of update warehouse.
     *          404:
     *              description: Error from server.
     * 
     */
    router.put('/warehouses/:id', warehouseController.handleUpdateWarehouse)

    /**
     * @swagger
     * /api/warehouses/{id}:
     *  delete:
     *      tags:
     *          - Warehouse
     *      summary: Delete warehouse with id
     *      description: Delete a warehouse with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of warehouse you want to delete
     *      responses:
     *          200:
     *              description: Return status and info of delete warehouse.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/warehouses/:id', warehouseController.handleDeleteWarehouse)

    return app.use("/api/", router)
}

module.exports = initApiRoutes;