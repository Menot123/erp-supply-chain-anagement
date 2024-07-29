import express from 'express';
// import session from "express-session"
import productController from '../controllers/productController'
import customerController from '../controllers/customerController'
import providerController from '../controllers/providerController'
import warehouseController from '../controllers/warehouseController'
import stockController from '../controllers/stockController'
import stockEntryController from '../controllers/stockEntryController'
import stockEntryItemController from '../controllers/stockEntryItemController'
import stockDeliveryController from '../controllers/stockDeliveryController'
import stockDeliveryItemController from '../controllers/stockDeliveryItemController'
import productProviderController from '../controllers/productProviderController'

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

    // Stock API
    /**
     * @swagger
     * /api/stocks:
     *  get:
     *      tags:
     *          - Stock
     *      summary: Get all stocks
     *      description: Get all information about stocks                
     *      responses:
     *          200:
     *              description: Return status and list of stocks if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stocks', stockController.handleGetStocks)

    /**
     * @swagger
     * /api/stocks/{id}:
     *  get:
     *      tags:
     *          - Stock
     *      summary: Get stock with id
     *      description: Get information about stock with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stock you want to get information 
     *      responses:
     *          200:
     *              description: Return status and info of stock if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stocks/:id', stockController.handleGetStock)

    /**
     * @swagger
     * /api/stocks:
     *  post:
     *      tags:
     *          - Stock
     *      summary: Create new stock
     *      description: Create new stock for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          productId:
     *                              type: string
     *                          warehouseId:
     *                              type: string
     *                          quantity:
     *                              type: string           
     *      responses:
     *          200:
     *              description: Return status of create new stock.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/stocks', stockController.handleCreateStock)

    /**
     * @swagger
     * /api/stocks/{id}:
     *  put:
     *      tags:
     *          - Stock
     *      summary: Update stock information
     *      description: Update stock for ERP system
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stock you want to update    
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          productId:
     *                              type: string
     *                          warehouseId:
     *                              type: string
     *                          quantity:
     *                              type: string           
     *      responses:
     *          200:
     *              description: Return status of update stock.
     *          404:
     *              description: Error from server.
     * 
     */
    router.put('/stocks/:id', stockController.handleUpdateStock)

    /**
     * @swagger
     * /api/stocks/{id}:
     *  delete:
     *      tags:
     *          - Stock
     *      summary: Delete stock with id
     *      description: Delete a stock with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stock you want to delete
     *      responses:
     *          200:
     *              description: Return status and info of delete stock.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/stocks/:id', stockController.handleDeleteStock)

    // StockEntry API
    /**
     * @swagger
     * /api/stockEntrys:
     *  get:
     *      tags:
     *          - StockEntry
     *      summary: Get all stockEntrys
     *      description: Get all information about stockEntrys                
     *      responses:
     *          200:
     *              description: Return status and list of stockEntrys if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stockEntrys', stockEntryController.handleGetStockEntrys)

    /**
     * @swagger
     * /api/stockEntrys/{id}:
     *  get:
     *      tags:
     *          - StockEntry
     *      summary: Get stockEntry with id
     *      description: Get information about stockEntry with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockEntry you want to get information 
     *      responses:
     *          200:
     *              description: Return status and info of stockEntry if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stockEntrys/:id', stockEntryController.handleGetStockEntry)

    /**
     * @swagger
     * /api/stockEntrys:
     *  post:
     *      tags:
     *          - StockEntry
     *      summary: Create new stockEntry
     *      description: Create new stockEntry for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          providerId:
     *                              type: string
     *                          warehouseId:
     *                              type: string
     *                          userId:
     *                              type: string     
     *                          scheduledDate:
     *                              type: string
     *                              format: date
     *                              example: "2024-01-01"
     *                          note:
     *                              type: string     
     *      responses:
     *          200:
     *              description: Return status of create new stockEntry.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/stockEntrys', stockEntryController.handleCreateStockEntry)

    /**
     * @swagger
     * /api/stockEntrys/{id}:
     *  put:
     *      tags:
     *          - StockEntry
     *      summary: Update stockEntry information
     *      description: Update stockEntry for ERP system
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockEntry you want to update    
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          providerId:
     *                              type: string
     *                          warehouseId:
     *                              type: string
     *                          userId:
     *                              type: string     
     *                          scheduledDate:
     *                              type: string
     *                              format: date
     *                              example: "2024-01-01"
     *                          note:
     *                              type: string        
     *                          status:
     *                              type: string
     *                              example: "done"   
     *      responses:
     *          200:
     *              description: Return status of update stockEntry.
     *          404:
     *              description: Error from server.
     * 
     */
    router.put('/stockEntrys/:id', stockEntryController.handleUpdateStockEntry)

    /**
     * @swagger
     * /api/stockEntrys/{id}:
     *  delete:
     *      tags:
     *          - StockEntry
     *      summary: Delete stockEntry with id
     *      description: Delete a stockEntry with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockEntry you want to delete
     *      responses:
     *          200:
     *              description: Return status and info of delete stockEntry.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/stockEntrys/:id', stockEntryController.handleDeleteStockEntry)

    // StockEntryItem API
    /**
     * @swagger
     * /api/stockEntryItems:
     *  get:
     *      tags:
     *          - StockEntryItem
     *      summary: Get all stockEntryItems
     *      description: Get all information about stockEntryItems                
     *      responses:
     *          200:
     *              description: Return status and list of stockEntryItems if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stockEntryItems', stockEntryItemController.handleGetStockEntryItems)

    /**
     * @swagger
     * /api/stockEntryItems/{id}:
     *  get:
     *      tags:
     *          - StockEntryItem
     *      summary: Get stockEntryItem with id
     *      description: Get information about stockEntryItem with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockEntryItem you want to get information 
     *      responses:
     *          200:
     *              description: Return status and info of stockEntryItem if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stockEntryItems/:id', stockEntryItemController.handleGetStockEntryItem)

    /**
     * @swagger
     * /api/stockEntryItemsBaseOnReceipt/{id}:
     *  get:
     *      tags:
     *          - StockEntryItem
     *      summary: Get stockEntryItemsBaseOnReceipt with id
     *      description: Get information about stockEntryItemsBaseOnReceipt with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of receipt you want to get information 
     *      responses:
     *          200:
     *              description: Return status and info of stockEntryItemsBaseOnReceipt if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stockEntryItemsBaseOnReceipt/:id', stockEntryItemController.handleGetStockEntryItemsBaseOnReceiptId)

    /**
     * @swagger
     * /api/stockEntryItems:
     *  post:
     *      tags:
     *          - StockEntryItem
     *      summary: Create new stockEntryItem
     *      description: Create new stockEntryItem for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          stockEntryId:
     *                              type: string
     *                          productId:
     *                              type: string
     *                          description:
     *                              type: string     
     *                          scheduledDate:
     *                              type: string
     *                              format: date
     *                              example: "2024-01-01"
     *                          deadline:
     *                              type: string  
     *                          quantity:
     *                              type: string      
     *      responses:
     *          200:
     *              description: Return status of create new stockEntryItem.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/stockEntryItems', stockEntryItemController.handleCreateStockEntryItem)

    router.post('/stockEntryItemsList', stockEntryItemController.handleCreateStockEntryItemList)

    /**
     * @swagger
     * /api/stockEntryItems/{id}:
     *  put:
     *      tags:
     *          - StockEntryItem
     *      summary: Update stockEntryItem information
     *      description: Update stockEntryItem for ERP system
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockEntryItem you want to update    
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          stockEntryId:
     *                              type: string
     *                          productId:
     *                              type: string
     *                          description:
     *                              type: string     
     *                          scheduledDate:
     *                              type: string
     *                              format: date
     *                              example: "2024-01-01"
     *                          deadline:
     *                              type: string  
     *                          quantity:
     *                              type: string          
     *      responses:
     *          200:
     *              description: Return status of update stockEntryItem.
     *          404:
     *              description: Error from server.
     * 
     */
    router.put('/stockEntryItems/:id', stockEntryItemController.handleUpdateStockEntryItem)

    /**
     * @swagger
     * /api/stockEntryItems/{id}:
     *  delete:
     *      tags:
     *          - StockEntryItem
     *      summary: Delete stockEntryItem with id
     *      description: Delete a stockEntryItem with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockEntryItem you want to delete
     *      responses:
     *          200:
     *              description: Return status and info of delete stockEntryItem.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/stockEntryItems/:id', stockEntryItemController.handleDeleteStockEntryItem)

    // StockDelivery API
    /**
     * @swagger
     * /api/stockDeliverys:
     *  get:
     *      tags:
     *          - StockDelivery
     *      summary: Get all stockDeliverys
     *      description: Get all information about stockDeliverys                
     *      responses:
     *          200:
     *              description: Return status and list of stockDeliverys if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stockDeliverys', stockDeliveryController.handleGetStockDeliverys)

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
    router.get('/stockDeliverys/:id', stockDeliveryController.handleGetStockDelivery)

    /**
     * @swagger
     * /api/stockDeliverys:
     *  post:
     *      tags:
     *          - StockDelivery
     *      summary: Create new stockDelivery
     *      description: Create new stockDelivery for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          customerId:
     *                              type: string
     *                          warehouseId:
     *                              type: string
     *                          userId:
     *                              type: string     
     *                          scheduledDate:
     *                              type: string
     *                              format: date
     *                              example: "2024-01-01"
     *                          note:
     *                              type: string      
     *      responses:
     *          200:
     *              description: Return status of create new stockDelivery.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/stockDeliverys', stockDeliveryController.handleCreateStockDelivery)

    /**
     * @swagger
     * /api/stockDeliverys/{id}:
     *  put:
     *      tags:
     *          - StockDelivery
     *      summary: Update stockDelivery information
     *      description: Update stockDelivery for ERP system
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockDelivery you want to update    
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          customerId:
     *                              type: string
     *                          warehouseId:
     *                              type: string
     *                          userId:
     *                              type: string     
     *                          scheduledDate:
     *                              type: string
     *                              format: date
     *                              example: "2024-01-01"
     *                          note:
     *                              type: string          
     *                          status:
     *                              type: string
     *                              example: "done" 
     *      responses:
     *          200:
     *              description: Return status of update stockDelivery.
     *          404:
     *              description: Error from server.
     * 
     */
    router.put('/stockDeliverys/:id', stockDeliveryController.handleUpdateStockDelivery)

    /**
     * @swagger
     * /api/stockDeliverys/{id}:
     *  delete:
     *      tags:
     *          - StockDelivery
     *      summary: Delete stockDelivery with id
     *      description: Delete a stockDelivery with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockDelivery you want to delete
     *      responses:
     *          200:
     *              description: Return status and info of delete stockDelivery.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/stockDeliverys/:id', stockDeliveryController.handleDeleteStockDelivery)

    // StockDeliveryItem API
    /**
     * @swagger
     * /api/stockDeliveryItems:
     *  get:
     *      tags:
     *          - StockDeliveryItem
     *      summary: Get all stockDeliveryItems
     *      description: Get all information about stockDeliveryItems                
     *      responses:
     *          200:
     *              description: Return status and list of stockDeliveryItems if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stockDeliveryItems', stockDeliveryItemController.handleGetStockDeliveryItems)

    /**
     * @swagger
     * /api/stockDeliveryItems/{id}:
     *  get:
     *      tags:
     *          - StockDeliveryItem
     *      summary: Get stockDeliveryItem with id
     *      description: Get information about stockDeliveryItem with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockDeliveryItem you want to get information 
     *      responses:
     *          200:
     *              description: Return status and info of stockDeliveryItem if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stockDeliveryItems/:id', stockDeliveryItemController.handleGetStockDeliveryItem)

    /**
     * @swagger
     * /api/stockDeliveryItemsBaseOnDelivery/{id}:
     *  get:
     *      tags:
     *          - StockDeliveryItem
     *      summary: Get stockDeliveryItemsBaseOnDelivery with id
     *      description: Get information about stockDeliveryItemsBaseOnDelivery with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stock delivery you want to get information 
     *      responses:
     *          200:
     *              description: Return status and info of stockDeliveryItemsBaseOnDelivery if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/stockDeliveryItemsBaseOnDelivery/:id', stockDeliveryItemController.handleGetStockDeliveryItemsBaseOnDeliveryId)

    /**
     * @swagger
     * /api/stockDeliveryItems:
     *  post:
     *      tags:
     *          - StockDeliveryItem
     *      summary: Create new stockDeliveryItem
     *      description: Create new stockDeliveryItem for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          stockDeliveryId:
     *                              type: string
     *                          productId:
     *                              type: string
     *                          description:
     *                              type: string     
     *                          scheduledDate:
     *                              type: string
     *                              format: date
     *                              example: "2024-01-01"
     *                          deadline:
     *                              type: string  
     *                          quantity:
     *                              type: string      
     *      responses:
     *          200:
     *              description: Return status of create new stockDeliveryItem.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/stockDeliveryItems', stockDeliveryItemController.handleCreateStockDeliveryItem)

    router.post('/stockDeliveryItemsList', stockDeliveryItemController.handleCreateStockDeliveryItemList)

    /**
     * @swagger
     * /api/stockDeliveryItems/{id}:
     *  put:
     *      tags:
     *          - StockDeliveryItem
     *      summary: Update stockDeliveryItem information
     *      description: Update stockDeliveryItem for ERP system
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockDeliveryItem you want to update    
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          stockDeliveryId:
     *                              type: string
     *                          productId:
     *                              type: string
     *                          description:
     *                              type: string     
     *                          scheduledDate:
     *                              type: string
     *                              format: date
     *                              example: "2024-01-01"
     *                          deadline:
     *                              type: string  
     *                          quantity:
     *                              type: string          
     *      responses:
     *          200:
     *              description: Return status of update stockDeliveryItem.
     *          404:
     *              description: Error from server.
     * 
     */
    router.put('/stockDeliveryItems/:id', stockDeliveryItemController.handleUpdateStockDeliveryItem)

    /**
     * @swagger
     * /api/stockDeliveryItems/{id}:
     *  delete:
     *      tags:
     *          - StockDeliveryItem
     *      summary: Delete stockDeliveryItem with id
     *      description: Delete a stockDeliveryItem with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of stockDeliveryItem you want to delete
     *      responses:
     *          200:
     *              description: Return status and info of delete stockDeliveryItem.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/stockDeliveryItems/:id', stockDeliveryItemController.handleDeleteStockDeliveryItem)

    // ProductProvider API
    /**
     * @swagger
     * /api/productProviders:
     *  get:
     *      tags:
     *          - ProductProvider
     *      summary: Get all productProviders
     *      description: Get all information about productProviders                
     *      responses:
     *          200:
     *              description: Return status and list of productProviders if exist.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/productProviders', productProviderController.handleGetProductProviders)

    /**
     * @swagger
     * /api/productProviders/provider/{id}:
     *  get:
     *      tags:
     *          - ProductProvider
     *      summary: Get products based on provider ID
     *      description: Get information of products with provider id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of provider 
     *      responses:
     *          200:
     *              description: Return status and info of relevant products.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/productProviders/provider/:id', productProviderController.handleGetProductsBasedOnProvider)

    /**
     * @swagger
     * /api/productProviders/product/{id}:
     *  get:
     *      tags:
     *          - ProductProvider
     *      summary: Get providers based on product ID
     *      description: Get information of providers with product id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of product 
     *      responses:
     *          200:
     *              description: Return status and info of relevant providers.
     *          404:
     *              description: Error from server.
     * 
     */
    router.get('/productProviders/product/:id', productProviderController.handleGetProvidersBasedOnProduct)

    /**
     * @swagger
     * /api/productProviders:
     *  post:
     *      tags:
     *          - ProductProvider
     *      summary: Create new productProvider
     *      description: Create new productProvider for ERP system
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties: 
     *                          productId:
     *                              type: string
     *                          providerId:
     *                              type: string  
     *      responses:
     *          200:
     *              description: Return status of create new productProvider.
     *          404:
     *              description: Error from server.
     * 
     */
    router.post('/productProviders', productProviderController.handleCreateProductProvider)

    /**
     * @swagger
     * /api/productProviders/{id}:
     *  delete:
     *      tags:
     *          - ProductProvider
     *      summary: Delete productProvider with id
     *      description: Delete a productProvider with id
     *      parameters:
     *          - in: path
     *            name: id     
     *            required: true            
     *            schema:     
     *                type: string
     *            description: ID of productProvider you want to delete
     *      responses:
     *          200:
     *              description: Return status and info of delete productProvider.
     *          404:
     *              description: Error from server.
     * 
     */
    router.delete('/productProviders/:id', productProviderController.handleDeleteProductProvider)

    return app.use("/api/", router)
}

module.exports = initApiRoutes;