import stockDeliveryService from '../services/stockDeliveryService';
let handleGetStockDeliverys = async(req, res) => {
    try {

        let data = await stockDeliveryService.handleGetStockDeliverysService()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStockDeliverys controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get stockDelivery with id
const handleGetStockDelivery = async(req, res, next) => {
    try {
        let stockDeliveryId = req.params.id
        let data = await stockDeliveryService.handleGetStockDeliveryWithIdService(stockDeliveryId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStockDelivery controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create a new stockDelivery
const handleCreateStockDelivery = async(req, res, next) => {
    try {
        let dataStockDelivery = req.body;
        let response = await stockDeliveryService.handleCreateStockDeliveryService(dataStockDelivery);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createStockDelivery controller',
            EC: -1,
            DT: ''
        })
    }
}


// Update a stockDelivery with id
const handleUpdateStockDelivery = async(req, res, next) => {
    try {
        let stockDeliveryId = req.params.id;
        let dataStockDelivery = req.body;
        let response = await stockDeliveryService.handleUpdateStockDeliveryService(stockDeliveryId, dataStockDelivery);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateStockDelivery controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete a stockDelivery with id
const handleDeleteStockDelivery = async(req, res, next) => {
    try {
        let stockDeliveryId = req.params.id;
        let response = await stockDeliveryService.handleDeleteStockDeliveryService(stockDeliveryId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in deleteStockDelivery controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetStockDeliverys,
    handleGetStockDelivery,
    handleCreateStockDelivery,
    handleUpdateStockDelivery,
    handleDeleteStockDelivery
}