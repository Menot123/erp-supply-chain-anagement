import stockEntryService from '../services/stockEntryService';
let handleGetStockEntrys = async(req, res) => {
    try {

        let data = await stockEntryService.handleGetStockEntrysService()
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

// Get stockEntry with id
const handleGetStockEntry = async(req, res, next) => {
    try {
        let stockEntryId = req.params.id
        let data = await stockEntryService.handleGetStockEntryWithIdService(stockEntryId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStockEntry controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create a new stockEntry
const handleCreateStockEntry = async(req, res, next) => {
    try {
        let dataStockEntry = req.body;
        let response = await stockEntryService.handleCreateStockEntryService(dataStockEntry);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createStockEntry controller',
            EC: -1,
            DT: ''
        })
    }
}


// Update a stockEntry with id
const handleUpdateStockEntry = async(req, res, next) => {
    try {
        let stockEntryId = req.params.id;
        let dataStockEntry = req.body;
        let response = await stockEntryService.handleUpdateStockEntryService(stockEntryId, dataStockEntry);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateStockEntry controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete a stockEntry with id
const handleDeleteStockEntry = async(req, res, next) => {
    try {
        let stockEntryId = req.params.id;
        let response = await stockEntryService.handleDeleteStockEntryService(stockEntryId);
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
    handleGetStockEntrys,
    handleGetStockEntry,
    handleCreateStockEntry,
    handleUpdateStockEntry,
    handleDeleteStockEntry
}