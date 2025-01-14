import db from '../models/index'
const { Op } = require("sequelize");

const handleGetStocksService = async () => {
    try {
        let res = {}
        let stocks = await db.Stock.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            },
            include: [
                { model: db.Product, as: 'productData' },
                { model: db.Warehouse, as: 'warehouseData' }
            ]
        });
        if (stocks) {
            res.EC = 0
            res.EM = 'Get stocks successfully'
            res.DT = stocks
        } else {
            res.EM = 'Get stocks failed'
            res.EC = 1
            res.DT = ''
        }
        console.log(">>>> stocks: ", stocks);

        return res
    } catch (error) {
        console.log('>>> error from get stocks: ', e)
        return {
            EM: 'Something wrong with handleGetStocksService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetStockWithIdService = async (id) => {
    try {
        let res = {}
        let stock = await db.Stock.findOne({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                stockId: id
            }
        });
        if (stock) {
            res.EC = 0
            res.EM = 'Get stock successfully'
            res.DT = stock
        } else {
            res.EM = 'Get stock failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get stock with id service: ', e)
    }
}

const handleCreateStockService = async (data) => {
    try {
        let res = {}
        let stock = await db.Stock.findOne({
            where: {
                productId: data.productId,
                warehouseId: data.warehouseId,
            }
        });
        if (stock) {
            // console.log(stock)
            res.EC = -1
            res.EM = 'Stock is existing'
            res.DT = ''
        } else {
            await db.Stock.create({
                ...data
            })
            res.EM = 'Create stock successfully'
            res.EC = 0
            res.DT = ''

        }
        return res
    } catch (e) {
        console.log('>>> error when create new stock: ', e)
    }
}

const handleCheckMinusStockService = async (listItems) => {
    try {
        let res = {}
        for (const item of listItems) {
            // console.log(item.productId);
            // console.log(item.trueQuantity);
            let stock = await db.Stock.findOne({
                where: {
                    productId: item.productId,
                    warehouseId: 'WH001',
                }
            });
            if (stock) {
                stock.dataValues.quantity = Number(stock.dataValues.quantity) - Number(item.trueQuantity);
                // console.log(stock.dataValues);

                if (stock.dataValues.quantity >= 0) {

                } else {
                    res.EM = 'Not enough item in stock';
                    res.EC = 1;
                    res.DT = '';
                    return res
                }
            } else {
                res.EM = 'Stock not existing';
                res.EC = -1;
                res.DT = '';
                return res
            }
        }
        res.EM = 'Check stock successfully';
        res.EC = 0;
        res.DT = '';
        return res;
    } catch (e) {
        console.log('>>> error when check minus stock: ', e)
    }
}

const handleAddStockService = async (data) => {
    try {
        let res = {}
        let stock = await db.Stock.findOne({
            where: {
                productId: data.productId,
                warehouseId: data.warehouseId,
            }
        });
        if (stock) {
            data.quantity = Number(data.quantity) + Number(stock.dataValues.quantity)
            await stock.update({
                ...data
            })
            res.EM = 'Update(U) stock successfully'
            res.EC = 0
            res.DT = ''
        } else {
            await db.Stock.create({
                ...data
            })
            res.EM = 'Update(C) stock successfully'
            res.EC = 0
            res.DT = ''

        }
        return res
    } catch (e) {
        console.log('>>> error when create new stock: ', e)
    }
}

const handleMinusStockService = async (data) => {
    try {
        let res = {}
        let stock = await db.Stock.findOne({
            where: {
                productId: data.productId,
                warehouseId: data.warehouseId,
            }
        });
        if (stock) {
            data.quantity = Number(stock.dataValues.quantity) - Number(data.quantity)
            if (data.quantity >= 0) {
                await stock.update({
                    ...data
                })
                res.EM = 'Update(M) stock successfully'
                res.EC = 0
                res.DT = ''
            } else {
                res.EM = 'Stock not enough'
                res.EC = 1
                res.DT = ''
            }

        } else {
            res.EM = 'Stock not existing'
            res.EC = -1
            res.DT = ''

        }
        return res
    } catch (e) {
        console.log('>>> error when minus stock: ', e)
    }
}

const handleUpdateStockService = async (stockId, data) => {
    try {
        let res = {}
        console.log(data)
        let stock = await db.Stock.findOne({
            where: {
                stockId: stockId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (stock) {
            await stock.update({
                ...data
            })
            res.EM = 'Update stock successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'Stock not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when update stock: ', e)
    }
}

const handleDeleteStockService = async (stockId) => {
    try {
        let res = {}
        let stock = await db.Stock.findOne({
            where: {
                stockId: stockId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (stock) {
            await stock.update({ status: 'deleted' })
            res.EM = 'Delete stock successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'Stock not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when delete stock: ', e)
    }
}

module.exports = {
    handleGetStocksService,
    handleGetStockWithIdService,
    handleCreateStockService,
    handleUpdateStockService,
    handleAddStockService,
    handleCheckMinusStockService,
    handleMinusStockService,
    handleDeleteStockService
}