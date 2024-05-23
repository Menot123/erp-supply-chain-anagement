import db from '../models/index'
const { Op } = require("sequelize");

const handleGetStockDeliveryItemsService = async() => {
    try {
        let res = {}
        let stockDeliveryItems = await db.StockDeliveryItem.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            }
        });
        if (stockDeliveryItems) {
            res.EC = 0
            res.EM = 'Get stockDeliveryItems successfully'
            res.DT = stockDeliveryItems
        } else {
            res.EM = 'Get stockDeliveryItems failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (error) {
        console.log('>>> error from get stockDeliveryItems: ', e)
        return {
            EM: 'Something wrong with handleGetStockDeliveryItemsService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetStockDeliveryItemWithIdService = async(id) => {
    try {
        let res = {}
        let stockDeliveryItem = await db.StockDeliveryItem.findOne({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                stockDeliveryItemId: id
            }
        });
        if (stockDeliveryItem) {
            res.EC = 0
            res.EM = 'Get stockDeliveryItem successfully'
            res.DT = stockDeliveryItem
        } else {
            res.EM = 'Get stockDeliveryItem failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get stockDeliveryItem with id service: ', e)
    }
}

const handleCreateStockDeliveryItemService = async(data) => {
    try {
        let res = {}

        // Kiểm tra sự tồn tại của stockDeliveryId và productId
        const stockDeliveryExists = await db.StockDelivery.findOne({
            where: { stockDeliveryId: data.stockDeliveryId }
        })

        const productExists = await db.Product.findOne({
            where: { productId: data.productId }
        })

        if (!stockDeliveryExists || !productExists) {
            // Một hoặc nhiều giá trị không tồn tại trong các mô hình liên quan
            res.EM = 'Invalid stockDeliveryId or productId'
            res.EC = 1
            res.DT = ''
            return res
        }

        await db.StockDeliveryItem.create({
            ...data
        })
        res.EM = 'Create stockDeliveryItem successfully'
        res.EC = 0
        res.DT = ''
        return res
    } catch (e) {
        console.log('>>> error when create new stockDeliveryItem: ', e)
    }
}

const handleUpdateStockDeliveryItemService = async(stockDeliveryItemId, data) => {
    try {
        let res = {}
        console.log(data)
        let stockDeliveryItem = await db.StockDeliveryItem.findOne({
            where: {
                stockDeliveryItemId: stockDeliveryItemId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (stockDeliveryItem) {
            await stockDeliveryItem.update({
                ...data
            })
            res.EM = 'Update stockDeliveryItem successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'StockDeliveryItem not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when update stockDeliveryItem: ', e)
    }
}

const handleDeleteStockDeliveryItemService = async(stockDeliveryItemId) => {
    try {
        let res = {}
        let stockDeliveryItem = await db.StockDeliveryItem.findOne({
            where: {
                stockDeliveryItemId: stockDeliveryItemId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (stockDeliveryItem) {
            await stockDeliveryItem.update({ status: 'deleted' })
            res.EM = 'Delete stockDeliveryItem successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'StockDeliveryItem not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when delete stockDeliveryItem: ', e)
    }
}

module.exports = {
    handleGetStockDeliveryItemsService,
    handleGetStockDeliveryItemWithIdService,
    handleCreateStockDeliveryItemService,
    handleUpdateStockDeliveryItemService,
    handleDeleteStockDeliveryItemService
}