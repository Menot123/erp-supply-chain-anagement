import db from '../models/index'
const { Op } = require("sequelize");

const handleGetStockEntrysService = async() => {
    try {
        let res = {}
        let stockEntrys = await db.StockEntry.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            },
            // include: [
            //     { model: db.User, as: 'userData' },
            // ]
        });
        if (stockEntrys) {
            res.EC = 0
            res.EM = 'Get stockEntrys successfully'
            res.DT = stockEntrys
        } else {
            res.EM = 'Get stockEntrys failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (error) {
        console.log('>>> error from get stockEntrys: ', e)
        return {
            EM: 'Something wrong with handleGetStockEntrysService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetStockEntryWithIdService = async(id) => {
    try {
        let res = {}
        let stockEntry = await db.StockEntry.findOne({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                stockEntryId: id
            },
            include: [
                { model: db.StockEntryItem, as: 'items' },
                // { model: db.Provider, as: 'providerData' },
            ]
        });
        if (stockEntry) {
            res.EC = 0
            res.EM = 'Get stockEntry successfully'
            res.DT = stockEntry
        } else {
            res.EM = 'Get stockEntry failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get stockEntry with id service: ', e)
    }
}

const handleCreateStockEntryService = async(data) => {
    try {
        let res = {}

        // Kiểm tra sự tồn tại của providerId, warehouseId, và userId
        // const providerExists = await db.Provider.findOne({
        //     where: { providerId: data.providerId }
        // })

        const warehouseExists = await db.Warehouse.findOne({
            where: { warehouseId: data.warehouseId }
        })

        // const userExists = await db.User.findOne({
        //     where: { userId: data.userId }
        // })

        if (!warehouseExists) {
            // Một hoặc nhiều giá trị không tồn tại trong các mô hình liên quan
            res.EM = 'Invalid providerId, warehouseId, or userId'
            res.EC = 1
            res.DT = ''
            return res
        }

        let created = await db.StockEntry.create({
            ...data
        })
        res.EM = 'Create stockEntry successfully'
        res.EC = 0
            // res.DT = 'a'
        res.DT = created.dataValues.stockEntryId
        return res
    } catch (e) {
        console.log('>>> error when create new stockEntry: ', e)
    }
}

const handleUpdateStockEntryService = async(stockEntryId, data) => {
    try {
        let res = {}
        console.log(data)
        let stockEntry = await db.StockEntry.findOne({
            where: {
                stockEntryId: stockEntryId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (stockEntry) {
            await stockEntry.update({
                ...data
            })
            res.EM = 'Update stockEntry successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'StockEntry not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when update stockEntry: ', e)
    }
}

const handleDeleteStockEntryService = async(stockEntryId) => {
    try {
        let res = {}
        let stockEntry = await db.StockEntry.findOne({
            where: {
                stockEntryId: stockEntryId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (stockEntry) {
            await stockEntry.update({ status: 'deleted' })
            res.EM = 'Delete stockEntry successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'StockEntry not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when delete stockEntry: ', e)
    }
}

module.exports = {
    handleGetStockEntrysService,
    handleGetStockEntryWithIdService,
    handleCreateStockEntryService,
    handleUpdateStockEntryService,
    handleDeleteStockEntryService
}