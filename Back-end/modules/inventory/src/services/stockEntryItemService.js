import db from '../models/index'
const { Op } = require("sequelize");

const handleGetStockEntryItemsService = async() => {
    try {
        let res = {}
        let stockEntryItems = await db.StockEntryItem.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            }
        });
        if (stockEntryItems) {
            res.EC = 0
            res.EM = 'Get stockEntryItems successfully'
            res.DT = stockEntryItems
        } else {
            res.EM = 'Get stockEntryItems failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (error) {
        console.log('>>> error from get stockEntryItems: ', e)
        return {
            EM: 'Something wrong with handleGetStockEntryItemsService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetStockEntryItemWithIdService = async(id) => {
    try {
        let res = {}
        let stockEntryItem = await db.StockEntryItem.findOne({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                stockEntryItemId: id
            }
        });
        if (stockEntryItem) {
            res.EC = 0
            res.EM = 'Get stockEntryItem successfully'
            res.DT = stockEntryItem
        } else {
            res.EM = 'Get stockEntryItem failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get stockEntryItem with id service: ', e)
    }
}

const handleCreateStockEntryItemService = async(data) => {
    try {
        let res = {}

        // Kiểm tra sự tồn tại của stockEntryId và productId
        const stockEntryExists = await db.StockEntry.findOne({
            where: { stockEntryId: data.stockEntryId }
        })

        const productExists = await db.Product.findOne({
            where: { productId: data.productId }
        })

        if (!stockEntryExists || !productExists) {
            // Một hoặc nhiều giá trị không tồn tại trong các mô hình liên quan
            res.EM = 'Invalid stockEntryId or productId'
            res.EC = 1
            res.DT = ''
            return res
        }

        await db.StockEntryItem.create({
            ...data
        })
        res.EM = 'Create stockEntryItem successfully'
        res.EC = 0
        res.DT = ''
        return res
    } catch (e) {
        console.log('>>> error when create new stockEntryItem: ', e)
    }
}

const handleUpdateStockEntryItemService = async(stockEntryItemId, data) => {
    try {
        let res = {}
        console.log(data)
        let stockEntryItem = await db.StockEntryItem.findOne({
            where: {
                stockEntryItemId: stockEntryItemId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (stockEntryItem) {
            await stockEntryItem.update({
                ...data
            })
            res.EM = 'Update stockEntryItem successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'StockEntryItem not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when update stockEntryItem: ', e)
    }
}

const handleDeleteStockEntryItemService = async(stockEntryItemId) => {
    try {
        let res = {}
        let stockEntryItem = await db.StockEntryItem.findOne({
            where: {
                stockEntryItemId: stockEntryItemId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (stockEntryItem) {
            await stockEntryItem.update({ status: 'deleted' })
            res.EM = 'Delete stockEntryItem successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'StockEntryItem not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when delete stockEntryItem: ', e)
    }
}

module.exports = {
    handleGetStockEntryItemsService,
    handleGetStockEntryItemWithIdService,
    handleCreateStockEntryItemService,
    handleUpdateStockEntryItemService,
    handleDeleteStockEntryItemService
}