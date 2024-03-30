import db from '../models/index'
const { Op } = require("sequelize");

const handleGetProductsService = async() => {
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
            }
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
    }
}

const handleGetProductWithIdService = async(id) => {
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

const handleCreateProductService = async(data) => {
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

const handleUpdateProductService = async(productId, data) => {
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

const handleDeleteProductService = async(productId) => {
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
    handleGetProductWithIdService,
    handleCreateProductService,
    handleUpdateProductService,
    handleDeleteProductService
}