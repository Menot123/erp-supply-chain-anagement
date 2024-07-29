import stockEntryItemService from '../services/stockEntryItemService';
let handleGetStockEntryItems = async(req, res) => {
    try {

        let data = await stockEntryItemService.handleGetStockEntryItemsService()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStockEntryItems controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get stockEntryItem with id
const handleGetStockEntryItem = async(req, res, next) => {
    try {
        let stockEntryItemId = req.params.id
        let data = await stockEntryItemService.handleGetStockEntryItemWithIdService(stockEntryItemId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStockEntryItem controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get stockEntryItem base on receipt id
const handleGetStockEntryItemsBaseOnReceiptId = async(req, res, next) => {
    try {
        let receiptId = req.params.id
        let data = await stockEntryItemService.handleGetStockEntryItemsBaseOnReceiptId(receiptId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStockEntryItem controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create a new stockEntryItem
const handleCreateStockEntryItem = async(req, res, next) => {
    try {
        let dataStockEntryItem = req.body;
        let response = await stockEntryItemService.handleCreateStockEntryItemService(dataStockEntryItem);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createStockEntryItem controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create stockEntryItem List
const handleCreateStockEntryItemList = async(req, res, next) => {
    try {
        let dataStockEntryItemList = req.body;
        let response = await stockEntryItemService.handleCreateStockEntryItemListService(dataStockEntryItemList);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createStockEntryItem list controller',
            EC: -1,
            DT: ''
        })
    }
}

// Update a stockEntryItem with id
const handleUpdateStockEntryItem = async(req, res, next) => {
    try {
        let stockEntryItemId = req.params.id;
        let dataStockEntryItem = req.body;
        let response = await stockEntryItemService.handleUpdateStockEntryItemService(stockEntryItemId, dataStockEntryItem);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateStockEntryItem controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete a stockEntryItem with id
const handleDeleteStockEntryItem = async(req, res, next) => {
    try {
        let stockEntryItemId = req.params.id;
        let response = await stockEntryItemService.handleDeleteStockEntryItemService(stockEntryItemId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in deleteStockEntryItem controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetStockEntryItems,
    handleGetStockEntryItem,
    handleGetStockEntryItemsBaseOnReceiptId,
    handleCreateStockEntryItem,
    handleCreateStockEntryItemList,
    handleUpdateStockEntryItem,
    handleDeleteStockEntryItem
}