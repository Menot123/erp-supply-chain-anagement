import db from '../models/index'
const { Op } = require("sequelize");

const handleGetStockDeliverysService = async() => {
    try {
        let res = {}
        let stockDeliverys = await db.StockDelivery.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            }
        });
        if (stockDeliverys) {
            res.EC = 0
            res.EM = 'Get stockDeliverys successfully'
            res.DT = stockDeliverys
        } else {
            res.EM = 'Get stockDeliverys failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (error) {
        console.log('>>> error from get stockDeliverys: ', e)
        return {
            EM: 'Something wrong with handleGetStockDeliverysService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetStockDeliveryWithIdService = async(id) => {
    try {
        let res = {}
        let stockDelivery = await db.StockDelivery.findOne({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                stockDeliveryId: id
            }
        });
        if (stockDelivery) {
            res.EC = 0
            res.EM = 'Get stockDelivery successfully'
            res.DT = stockDelivery
        } else {
            res.EM = 'Get stockDelivery failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get stockDelivery with id service: ', e)
    }
}

const handleCreateStockDeliveryService = async(data) => {
    try {
        let res = {}

        // Kiểm tra sự tồn tại của customerId, warehouseId, và userId
        const customerExists = await db.Customer.findOne({
            where: { customerId: data.customerId }
        })

        const warehouseExists = await db.Warehouse.findOne({
            where: { warehouseId: data.warehouseId }
        })

        // const userExists = await db.User.findOne({
        //     where: { userId: data.userId }
        // })

        if (!customerExists || !warehouseExists) {
            // Một hoặc nhiều giá trị không tồn tại trong các mô hình liên quan
            res.EM = 'Invalid customerId, warehouseId, or userId'
            res.EC = 1
            res.DT = ''
            return res
        }

        await db.StockDelivery.create({
            ...data
        })
        res.EM = 'Create stockDelivery successfully'
        res.EC = 0
        res.DT = ''
        return res
    } catch (e) {
        console.log('>>> error when create new stockDelivery: ', e)
    }
}

const handleUpdateStockDeliveryService = async(stockDeliveryId, data) => {
    try {
        let res = {}
        console.log(data)
        let stockDelivery = await db.StockDelivery.findOne({
            where: {
                stockDeliveryId: stockDeliveryId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (stockDelivery) {
            await stockDelivery.update({
                ...data
            })
            res.EM = 'Update stockDelivery successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'StockDelivery not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when update stockDelivery: ', e)
    }
}

const handleDeleteStockDeliveryService = async(stockDeliveryId) => {
    try {
        let res = {}
        let stockDelivery = await db.StockDelivery.findOne({
            where: {
                stockDeliveryId: stockDeliveryId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (stockDelivery) {
            await stockDelivery.update({ status: 'deleted' })
            res.EM = 'Delete stockDelivery successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'StockDelivery not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when delete stockDelivery: ', e)
    }
}

module.exports = {
    handleGetStockDeliverysService,
    handleGetStockDeliveryWithIdService,
    handleCreateStockDeliveryService,
    handleUpdateStockDeliveryService,
    handleDeleteStockDeliveryService
}