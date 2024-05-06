import db from '../models/index'
const { Op } = require("sequelize");

const handleGetWarehousesService = async() => {
    try {
        let res = {}
        let warehouses = await db.Warehouse.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            }
        });
        if (warehouses) {
            res.EC = 0
            res.EM = 'Get warehouses successfully'
            res.DT = warehouses
        } else {
            res.EM = 'Get warehouses failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (error) {
        console.log('>>> error from get warehouses: ', e)
        return {
            EM: 'Something wrong with handleGetWarehousesService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetWarehouseWithIdService = async(id) => {
    try {
        let res = {}
        let warehouse = await db.Warehouse.findOne({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                warehouseId: id
            }
        });
        if (warehouse) {
            res.EC = 0
            res.EM = 'Get warehouse successfully'
            res.DT = warehouse
        } else {
            res.EM = 'Get warehouse failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get warehouse with id service: ', e)
    }
}

const handleCreateWarehouseService = async(data) => {
    try {
        let res = {}
        let warehouse = await db.Warehouse.findOne({
            where: {
                location: data.location
            }
        });
        if (warehouse) {
            // console.log(warehouse)
            res.EC = -1
            res.EM = 'Warehouse is existing'
            res.DT = ''
        } else {
            await db.Warehouse.create({
                ...data
            })
            res.EM = 'Create warehouse successfully'
            res.EC = 0
            res.DT = ''

        }
        return res
    } catch (e) {
        console.log('>>> error when create new warehouse: ', e)
    }
}

const handleUpdateWarehouseService = async(warehouseId, data) => {
    try {
        let res = {}
        let warehouse = await db.Warehouse.findOne({
            where: {
                warehouseId: warehouseId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (warehouse) {
            await warehouse.update({
                ...data
            })
            res.EM = 'Update warehouse successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'Warehouse not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when update warehouse: ', e)
    }
}

const handleDeleteWarehouseService = async(warehouseId) => {
    try {
        let res = {}
        let warehouse = await db.Warehouse.findOne({
            where: {
                warehouseId: warehouseId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (warehouse) {
            await warehouse.update({ status: 'deleted' })
            res.EM = 'Delete warehouse successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'Warehouse not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when delete warehouse: ', e)
    }
}

module.exports = {
    handleGetWarehousesService,
    handleGetWarehouseWithIdService,
    handleCreateWarehouseService,
    handleUpdateWarehouseService,
    handleDeleteWarehouseService
}