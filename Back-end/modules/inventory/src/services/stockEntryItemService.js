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
            },
            include: [
                { model: db.Product, as: 'productData' },
            ]
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

const handleGetStockEntryItemsBaseOnReceiptId = async(id) => {
    try {
        let res = {}
        let stockEntryItemList = await db.StockEntryItem.findAll({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                stockEntryId: id
            },
            include: [
                { model: db.Product, as: 'productData' },
            ]
        });
        if (stockEntryItemList) {
            res.EC = 0
            res.EM = 'Get stockEntryItemList successfully'
            res.DT = stockEntryItemList
        } else {
            res.EM = 'Get stockEntryItemList failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get stockEntryItemList with id receipt service: ', e)
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

const getNextId = async() => {
    const lastItem = await db.StockEntryItem.findOne({
        order: [
            ['stockEntryItemId', 'DESC']
        ],
    });
    if (lastItem) {
        const lastItemId = lastItem.stockEntryItemId;
        const numericPart = parseInt(lastItemId.slice(-4));
        const nextNumericPart = (numericPart + 1).toString().padStart(4, '0');
        return `STEI${nextNumericPart}`;
    } else {
        return `STEI0001`;
    }
}

const genNewId = (currentId, index) => {
    if (typeof currentId !== 'string') {
        currentId = currentId.toString(); // Chuyển đổi thành chuỗi nếu không phải
    }
    return currentId.slice(0, 4) + (parseInt(currentId.slice(4)) + index).toString().padStart(4, '0');
}

// console.log(getNextId());
// console.log(genNewId('STEI0006', 0))
const handleCreateStockEntryItemListService = async(listData) => {
    try {
        let res = {}
        res.EM = 'Invalid stockEntryId or productId'
        res.EC = 1
        res.DT = ''

        const nextId = await getNextId();

        listData.map((item, index) => {
                item.stockEntryItemId = genNewId(nextId, index);
            })
            // console.log(listData)
        await db.StockEntryItem.bulkCreate(listData, {
            individualHooks: false // Chạy hooks trên mỗi đối tượng riêng lẻ
        });

        res.EM = 'Create stockEntryItem successfully'
        res.EC = 0
        res.DT = ''

        // listData.forEach(async(product, index) => {
        //     // await db.StockEntryItem.create({
        //     //     ...product
        //     // })

        //     res.EM = 'Create stockEntryItem successfully'
        //     res.EC = 0
        //     res.DT = ''

        //     console.log(product)
        // })

        // // Kiểm tra sự tồn tại của stockEntryId và productId
        // const stockEntryExists = await db.StockEntry.findOne({
        //     where: { stockEntryId: data.stockEntryId }
        // })

        // const productExists = await db.Product.findOne({
        //     where: { productId: data.productId }
        // })

        // if (!stockEntryExists || !productExists) {
        //     // Một hoặc nhiều giá trị không tồn tại trong các mô hình liên quan
        //     res.EM = 'Invalid stockEntryId or productId'
        //     res.EC = 1
        //     res.DT = ''
        //     return res
        // }

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
    handleGetStockEntryItemsBaseOnReceiptId,
    handleCreateStockEntryItemService,
    handleCreateStockEntryItemListService,
    handleUpdateStockEntryItemService,
    handleDeleteStockEntryItemService
}