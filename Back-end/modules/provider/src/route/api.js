import express from "express"
import apiController from '../controllers/apiController'
const router = express.Router()


const initApiRoutes = (app) => {

    /**
     * @swagger
     * /api/providers:
     *  get:
     *      tags:
     *          - Provider
     *      summary: Get all providers
     *      description: Get list providers
     *      responses:
     *          200:
     *              description: Return status of get list provider.
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/providers', apiController.handleGetProviders);

    router.get('/providers-pagination', apiController.handleGetProvidersPagination);

    /**
     * @swagger
     * /api/provider/:id:
     *  get:
     *      tags:
     *          - Provider
     *      summary: Get information of provider by id
     *      description: Get information of provider by id
     *      responses:
     *          200:
     *              description: Return info of provider by id.
     *          500:
     *              description: Error from server.
     * 
     */
    router.get('/provider/:id', apiController.handleGetProvider);

    /**
     * @swagger
     * /api/provider:
     *  post:
     *      tags:
     *          - Provider
     *      summary: Create a new provider
     *      responses:
     *          200:
     *              description: Return status create a new provider.
     *          500:
     *              description: Error from server.
     * 
     */
    router.post('/provider', apiController.handleCreateProvider);

    /**
     * @swagger
     * /api/provider:
     *  delete:
     *      tags:
     *          - Provider
     *      summary: Delete a provider
     *      responses:
     *          200:
     *              description: Return status delete a provider.
     *          500:
     *              description: Error from server.
     * 
     */
    router.delete('/provider', apiController.handleDeleteProvider);

    /**
     * @swagger
     * /api/provider:
     *  put:
     *      tags:
     *          - Provider
     *      summary: Update a provider
     *      responses:
     *          200:
     *              description: Return status update a provider.
     *          500:
     *              description: Error from server.
     * 
     */
    router.put('/provider/:id', apiController.handleUpdateProvider);

    return app.use("/api/", router)
}

export default initApiRoutes