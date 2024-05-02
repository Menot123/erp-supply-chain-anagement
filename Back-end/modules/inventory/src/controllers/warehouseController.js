import warehouseService from '../services/warehouseService';
let handleGetWarehouses = async(req, res) => {
    try {
        let data = await warehouseService.handleGetWarehousesService()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get warehouses controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get Warehouse with id
const handleGetWarehouse = async(req, res, next) => {
    try {
        let warehouseId = req.params.id
        let data = await warehouseService.handleGetWarehouseWithIdService(warehouseId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getWarehouse controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create a new Warehouse
const handleCreateWarehouse = async(req, res, next) => {
    try {
        let dataWarehouse = req.body;
        let response = await warehouseService.handleCreateWarehouseService(dataWarehouse);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createWarehouse controller',
            EC: -1,
            DT: ''
        })
    }
}


// Update a Warehouse with id
const handleUpdateWarehouse = async(req, res, next) => {
    try {
        let warehouseId = req.params.id;
        let dataWarehouse = req.body;
        let response = await warehouseService.handleUpdateWarehouseService(warehouseId, dataWarehouse);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateWarehouse controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete a Warehouse with id
const handleDeleteWarehouse = async(req, res, next) => {
    try {
        let warehouseId = req.params.id;
        let response = await warehouseService.handleDeleteWarehouseService(warehouseId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in deleteWarehouse controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetWarehouses,
    handleGetWarehouse,
    handleCreateWarehouse,
    handleUpdateWarehouse,
    handleDeleteWarehouse
}