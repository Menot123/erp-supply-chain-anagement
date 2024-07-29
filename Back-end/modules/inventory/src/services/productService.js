import db from '../models/index'
const { Op } = require("sequelize");

const handleGetProductsService = async () => {
    try {
        let res = {}
        let products = await db.Product.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            },
            // attributes: { exclude: ['image'] }
        });
        if (products) {
            res.EC = 0
            res.EM = 'Get products successfully'
            res.DT = products
        } else {
            res.EM = 'Get products failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (error) {
        console.log('>>> error from get products: ', e)
        return {
            EM: 'Something wrong with handleGetProductsService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetProductsPaginationService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Product.findAndCountAll({
            offset: offset,
            limit: +limit,
            order: [['createdAt', 'DESC']],
            where: {
                status: {
                    [Op.not]: 'deleted'
                }
            },
            include: [
                { model: db.all_code, as: 'typeData', attributes: ['valueVi', 'valueEn'] },
                { model: db.all_code, as: 'groupData', attributes: ['valueVi', 'valueEn'] },
                { model: db.all_code, as: 'unitData', attributes: ['valueVi', 'valueEn'] },
            ]
        })

        let pages = Math.ceil(count / limit)

        let response = {
            totalRows: count,
            totalPage: pages,
            products: rows
        }

        return {
            EM: 'Get products pagination successfully',
            EC: 0,
            DT: response
        }

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with handleGetProductsPaginationService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetProductWithIdService = async (id) => {
    try {
        let res = {}
        let product = await db.Product.findOne({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                productId: id
            }
        });
        if (product) {
            res.EC = 0
            res.EM = 'Get product successfully'
            res.DT = product
        } else {
            res.EM = 'Get product failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get product with id service: ', e)
    }
}

const handleCreateProductService = async (data) => {
    try {
        let res = {}
        let product = await db.Product.findOne({
            where: {
                barCode: data.barCode
            }
        });
        if (product) {
            // console.log(product)
            res.EC = -1
            res.EM = 'Product is existing'
            res.DT = ''
        } else {
            await db.Product.create({
                barCode: data.barCode,
                nameVi: data.nameVi,
                nameEn: data.nameEn,
                type: data.type,
                group: data.group,
                image: data.image,
                cost: data.cost,
                unit: data.unit,
                descriptionVi: data.descriptionVi,
                descriptionEn: data.descriptionEn,
                expiry: data.expiry
            })
            res.EM = 'Create product successfully'
            res.EC = 0
            res.DT = ''

        }
        return res
    } catch (e) {
        console.log('>>> error when create new product: ', e)
    }
}

const getNextId = async () => {
    const lastItem = await db.StockEntryItem.findOne({
        order: [
            ['productId', 'DESC']
        ],
    });
    if (lastItem) {
        const lastProductId = lastItem.productId;
        const numericPart = parseInt(lastProductId.slice(-4));
        const nextNumericPart = (numericPart + 1).toString().padStart(4, '0');
        return `PO${nextNumericPart}`;
    } else {
        return `PO0001`;
    }
}

const genNewId = (currentId, index) => {
    if (typeof currentId !== 'string') {
        currentId = currentId.toString(); // Chuyển đổi thành chuỗi nếu không phải
    }
    return currentId.slice(0, 4) + (parseInt(currentId.slice(4)) + index).toString().padStart(4, '0');
}

const handleImportProductService = async (productsData) => {
    try {
        let res = {}

        // Check header correct by template
        const expectedFields = ["barCode", "nameVi", "nameEn", "type", "group", "cost", "unit", "descriptionVi", "descriptionEn", "expiry"];
        if (productsData && productsData.length > 0) {
            const extraFields = [];
            for (const key in productsData[0]) {
                if (!expectedFields.includes(key)) {
                    extraFields.push(key);
                }
            }
            if (extraFields.length > 0) {
                res.EC = -1
                res.EM = 'Header is incorrect, please check again'
                res.DT = extraFields
            } else {
                productsData.forEach((item) => {
                    if (!item.barCode) {
                        res.EM = 'Missing an barCode in your employee list'
                        res.EC = -4
                        res.DT = ''
                        return res
                    }
                })
                // Check product is existing
                const listBarcode = productsData.map(product => product.barCode);
                const existingProduct = await db.Product.findAll({
                    where: {
                        barCode: {
                            [Op.in]: listBarcode
                        }
                    },
                    attributes: ['barCode']
                });
                const existingBarcodes = existingProduct.map(product => product.barCode);
                const nonExistingProduct = listBarcode.filter(barCode => !existingBarcodes.includes(barCode));
                if (nonExistingProduct.length > 0) {
                    const filteredProductData = productsData.filter(product => nonExistingProduct.includes(product?.barCode));
                    const dataBulk = filteredProductData.map((item, index) => {
                        return {
                            ...item
                        }
                    })

                    if (dataBulk && dataBulk.length > 0) {
                        // console.log(dataBulk)
                        const nextId = await getNextId();

                        dataBulk.map((item, index) => {
                            item.productId = genNewId(nextId, index);
                        })
                        await db.Product.bulkCreate(dataBulk, {
                            individualHooks: false // Chạy hooks trên mỗi đối tượng riêng lẻ
                        });
                        res.EM = 'Import products successfully'
                        res.EC = 0
                        res.DT = ''
                    }
                } else {
                    res.EM = 'All product is existing'
                    res.EC = -3
                    res.DT = ''
                }
            }
        } else {
            res.EM = 'Something wrong with your file, please check again!'
            res.EC = -2
            res.DT = ''
        }
        return res
    } catch (e) {
        // console.log('>>> error when create new product: ', e)
        console.log('>>> error service: ', e)
    }
}

const handleUpdateProductService = async (productId, data) => {
    try {
        let res = {}
        let product = await db.Product.findOne({
            where: {
                productId: productId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (product) {
            await product.update({
                barCode: data.barCode,
                nameVi: data.nameVi,
                nameEn: data.nameEn,
                type: data.type,
                group: data.group,
                image: data.image,
                cost: data.cost,
                unit: data.unit,
                descriptionVi: data.descriptionVi,
                descriptionEn: data.descriptionEn,
                expiry: data.expiry
            })
            res.EM = 'Update product successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'Product not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when update product: ', e)
    }
}

const handleDeleteProductService = async (productId) => {
    try {
        let res = {}
        let product = await db.Product.findOne({
            where: {
                productId: productId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (product) {
            await product.update({ status: 'deleted' })
            res.EM = 'Delete product successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'Product not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when delete product: ', e)
    }
}

module.exports = {
    handleGetProductsService,
    handleGetProductsPaginationService,
    handleGetProductWithIdService,
    handleCreateProductService,
    handleImportProductService,
    handleUpdateProductService,
    handleDeleteProductService
}