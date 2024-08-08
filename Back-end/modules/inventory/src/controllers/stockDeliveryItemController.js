import stockDeliveryItemService from '../services/stockDeliveryItemService';
let handleGetStockDeliveryItems = async (req, res) => {
    try {

        let data = await stockDeliveryItemService.handleGetStockDeliveryItemsService()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStockDeliveryItems controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get stockDeliveryItem with id
const handleGetStockDeliveryItem = async (req, res, next) => {
    try {
        let stockDeliveryItemId = req.params.id
        let data = await stockDeliveryItemService.handleGetStockDeliveryItemWithIdService(stockDeliveryItemId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStockDeliveryItem controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get stockEntryItem base on receipt id
const handleGetStockDeliveryItemsBaseOnDeliveryId = async (req, res, next) => {
    try {
        let deliveryId = req.params.id
        let data = await stockDeliveryItemService.handleGetStockDeliveryItemsBaseOnDeliveryId(deliveryId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in handleGetStockDeliveryItemsBaseOnDeliveryId controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create a new stockDeliveryItem
const handleCreateStockDeliveryItem = async (req, res, next) => {
    try {
        let dataStockDeliveryItem = req.body;
        let response = await stockDeliveryItemService.handleCreateStockDeliveryItemService(dataStockDeliveryItem);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createStockDeliveryItem controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create stockDeliveryItem List
const handleCreateStockDeliveryItemList = async (req, res, next) => {
    try {
        let dataStockDeliveryItemList = req.body;
        let response = await stockDeliveryItemService.handleCreateStockDeliveryItemListService(dataStockDeliveryItemList);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createStockDeliveryItem list controller',
            EC: -1,
            DT: ''
        })
    }
}

// Update a stockDeliveryItem with id
const handleUpdateStockDeliveryItem = async (req, res, next) => {
    try {
        let stockDeliveryItemId = req.params.id;
        let dataStockDeliveryItem = req.body;
        let response = await stockDeliveryItemService.handleUpdateStockDeliveryItemService(stockDeliveryItemId, dataStockDeliveryItem);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateStockDeliveryItem controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete a stockDeliveryItem with id
const handleDeleteStockDeliveryItem = async (req, res, next) => {
    try {
        let stockDeliveryItemId = req.params.id;
        let response = await stockDeliveryItemService.handleDeleteStockDeliveryItemService(stockDeliveryItemId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in deleteStockDeliveryItem controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetStockDeliveryItems,
    handleGetStockDeliveryItem,
    handleGetStockDeliveryItemsBaseOnDeliveryId,
    handleCreateStockDeliveryItem,
    handleCreateStockDeliveryItemList,
    handleUpdateStockDeliveryItem,
    handleDeleteStockDeliveryItem
}