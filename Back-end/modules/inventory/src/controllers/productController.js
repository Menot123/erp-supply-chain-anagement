import productService from '../services/productService';
let handleGetProducts = async(req, res) => {
    try {
        let data = await productService.handleGetProductsService()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get products controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get product with id
const handleGetProduct = async(req, res, next) => {
    try {
        let productId = req.params.id
        let data = await productService.handleGetProductWithIdService(productId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getProduct controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create a new product
const handleCreateProduct = async(req, res, next) => {
    try {
        let dataProduct = req.body;
        let response = await productService.handleCreateProductService(dataProduct);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createProduct controller',
            EC: -1,
            DT: ''
        })
    }
}

// Update a product with id
const handleUpdateProduct = async(req, res, next) => {
    try {
        let productId = req.params.id;
        let dataProduct = req.body;
        let response = await productService.handleUpdateProductService(productId, dataProduct);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateProduct controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete a product with id
const handleDeleteProduct = async(req, res, next) => {
    try {
        let productId = req.params.id;
        let response = await productService.handleDeleteProductService(productId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateProduct controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetProducts,
    handleGetProduct,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct
}