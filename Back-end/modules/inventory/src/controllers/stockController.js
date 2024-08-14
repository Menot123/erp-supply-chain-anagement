import stockService from '../services/stockService';
let handleGetStocks = async (req, res) => {
    console.log(">>>> here");

    try {

        let data = await stockService.handleGetStocksService()
        console.log(">>>> data:", data);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStocks controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get stock with id
const handleGetStock = async (req, res, next) => {
    try {
        let stockId = req.params.id
        let data = await stockService.handleGetStockWithIdService(stockId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getStock controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create a new stock
const handleCreateStock = async (req, res, next) => {
    try {
        let dataStock = req.body;
        let response = await stockService.handleCreateStockService(dataStock);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createStock controller',
            EC: -1,
            DT: ''
        })
    }
}


// Add a stock
const handleAddStock = async (req, res, next) => {
    try {
        let dataStock = req.body;
        let response = await stockService.handleAddStockService(dataStock);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in addStock controller',
            EC: -1,
            DT: ''
        })
    }
}

// Check a stock
const handleCheckMinusStock = async (req, res, next) => {
    try {
        let dataStock = req.body;
        let response = await stockService.handleCheckMinusStockService(dataStock);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in minusStock controller',
            EC: -1,
            DT: ''
        })
    }
}

// Minus a stock
const handleMinusStock = async (req, res, next) => {
    try {
        let dataStock = req.body;
        let response = await stockService.handleMinusStockService(dataStock);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in minusStock controller',
            EC: -1,
            DT: ''
        })
    }
}

// Update a stock with id
const handleUpdateStock = async (req, res, next) => {
    try {
        let stockId = req.params.id;
        let dataStock = req.body;
        let response = await stockService.handleUpdateStockService(stockId, dataStock);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateStock controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete a stock with id
const handleDeleteStock = async (req, res, next) => {
    try {
        let stockId = req.params.id;
        let response = await stockService.handleDeleteStockService(stockId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in deleteStock controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetStocks,
    handleGetStock,
    handleCreateStock,
    handleAddStock,
    handleCheckMinusStock,
    handleMinusStock,
    handleUpdateStock,
    handleDeleteStock
}