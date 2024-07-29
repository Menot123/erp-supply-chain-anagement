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
            },
            include: [
                { model: db.Product, as: 'productData' },
            ]
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
            },
            include: [
                { model: db.Product, as: 'productData' },
            ]
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


const handleGetStockDeliveryItemsBaseOnDeliveryId = async(id) => {
    try {
        let res = {}
        let stockDeliveryItemList = await db.StockDeliveryItem.findAll({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                stockDeliveryId: id
            },
            include: [
                { model: db.Product, as: 'productData' },
            ]
        });
        if (stockDeliveryItemList) {
            res.EC = 0
            res.EM = 'Get stockDeliveryItemList successfully'
            res.DT = stockDeliveryItemList
        } else {
            res.EM = 'Get stockDeliveryItemList failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get stockDeliveryItemList with id receipt service: ', e)
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

const getNextId = async() => {
    const lastItem = await db.StockDeliveryItem.findOne({
        order: [
            ['stockDeliveryItemId', 'DESC']
        ],
    });
    if (lastItem) {
        const lastItemId = lastItem.stockDeliveryItemId;
        const numericPart = parseInt(lastItemId.slice(-4));
        const nextNumericPart = (numericPart + 1).toString().padStart(4, '0');
        return `STDI${nextNumericPart}`;
    } else {
        return `STDI0001`;
    }
}

const genNewId = (currentId, index) => {
    if (typeof currentId !== 'string') {
        currentId = currentId.toString(); // Chuyển đổi thành chuỗi nếu không phải
    }
    return currentId.slice(0, 4) + (parseInt(currentId.slice(4)) + index).toString().padStart(4, '0');
}

// console.log(getNextId());
// console.log(genNewId('STDI0006', 0))

const handleCreateStockDeliveryItemListService = async(listData) => {
    try {
        let res = {}
        res.EM = 'Invalid stockDeliveryId or productId'
        res.EC = 1
        res.DT = ''

        const nextId = await getNextId();

        listData.map((item, index) => {
                item.stockDeliveryItemId = genNewId(nextId, index);
            })
            // console.log(listData)
        await db.StockDeliveryItem.bulkCreate(listData, {
            individualHooks: false // Chạy hooks trên mỗi đối tượng riêng lẻ
        });

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
    handleGetStockDeliveryItemsBaseOnDeliveryId,
    handleCreateStockDeliveryItemService,
    handleCreateStockDeliveryItemListService,
    handleUpdateStockDeliveryItemService,
    handleDeleteStockDeliveryItemService
}