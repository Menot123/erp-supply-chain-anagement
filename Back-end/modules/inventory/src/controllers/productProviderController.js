import productProviderService from '../services/productProviderService';
let handleGetProductProviders = async(req, res) => {
    try {

        let data = await productProviderService.handleGetProductProvidersService()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStockEntrys controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get product based on provider ID
const handleGetProductsBasedOnProvider = async(req, res, next) => {
    try {
        let providerId = req.params.id
        let data = await productProviderService.handleGetProductsBasedOnProviderService(providerId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getProductsBasedOnProvider controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get product based on provider ID
const handleGetProvidersBasedOnProduct = async(req, res, next) => {
    try {
        let productId = req.params.id
        let data = await productProviderService.handleGetProvidersBasedOnProductService(productId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getProvidersBasedOnProduct controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create a new productprovider
const handleCreateProductProvider = async(req, res, next) => {
    try {
        let dataProductProvider = req.body;
        console.log(dataProductProvider);
        let response = await productProviderService.handleCreateProductProviderService(dataProductProvider.productId, dataProductProvider.providerId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createProductProvider controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete a stockEntry with id
const handleDeleteProductProvider = async(req, res, next) => {
    try {
        let productProviderId = req.params.id;
        let response = await productProviderService.handleDeleteProductProviderService(productProviderId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in deleteStockEntry controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetProductProviders,
    handleGetProductsBasedOnProvider,
    handleGetProvidersBasedOnProduct,
    handleCreateProductProvider,
    handleDeleteProductProvider
}