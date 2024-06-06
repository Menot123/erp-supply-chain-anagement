import db from '../models/index'
const { Op } = require("sequelize");

const handleGetProductProvidersService = async() => {
    try {
        let res = {}
        let productProviders = await db.ProductProvider.findAll({
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
        if (productProviders) {
            res.EC = 0
            res.EM = 'Get productProviders successfully'
            res.DT = productProviders
        } else {
            res.EM = 'Get productProviders failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (error) {
        console.log('>>> error from get productProviders: ', e)
        return {
            EM: 'Something wrong with handleGetProductProvidersService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetProductsBasedOnProviderService = async(providerId) => {
    try {
        let res = {}
        let products = await db.ProductProvider.findAll({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                providerId: providerId
            },
            include: [
                { model: db.Product, as: 'productData' },
                // { model: db.all_code, as: 'groupData', attributes: ['valueVi', 'valueEn'] },
            ]
        });
        // console.log(1)
        if (products) {
            res.EC = 0
            res.EM = 'Get product based on provider successfully'
            res.DT = products
        } else {
            res.EM = 'Get product based on provider failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get productProvider with id service: ', e)
    }
}

const handleGetProvidersBasedOnProductService = async(productId) => {
    try {
        let res = {}
        let providers = await db.ProductProvider.findAll({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                productId: productId
            },
            include: [
                { model: db.Product, as: 'productData' },
                // { model: db.all_code, as: 'groupData', attributes: ['valueVi', 'valueEn'] },
            ]
        });
        if (providers) {
            res.EC = 0
            res.EM = 'Get providers based on product successfully'
            res.DT = providers
        } else {
            res.EM = 'Get providers based on product failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get productProvider with id service: ', e)
    }
}

const handleCreateProductProviderService = async(productId, providerId) => {
    try {
        let res = {}

        // Kiểm tra sự tồn tại của providerId, productId
        const providerExists = await db.Provider.findOne({
            where: { providerId: providerId }
        })

        const productExists = await db.Product.findOne({
            where: { productId: productId }
        })

        if (!providerExists || !productExists) {
            // Một hoặc nhiều giá trị không tồn tại trong các mô hình liên quan
            res.EM = 'Invalid providerId, productId'
            res.EC = 1
            res.DT = ''
            return res
        }

        let productProviderId = await db.ProductProvider.findOne({
            where: {
                productId: productId,
                providerId: providerId,
            }
        });
        if (productProviderId) {
            await productProviderId.update({ status: 'active' })
        } else {
            await db.ProductProvider.create({
                productId: productId,
                providerId: providerId
            })
        }
        res.EM = 'Create ProductProvider successfully'
        res.EC = 0
        res.DT = ''
        return res
    } catch (e) {
        console.log('>>> error when create new productProvider: ', e)
    }
}

const handleDeleteProductProviderService = async(productProviderId) => {
    try {
        let res = {}
        let productProvider = await db.ProductProvider.findOne({
            where: {
                id: productProviderId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (productProvider) {
            await productProvider.update({ status: 'deleted' })
            res.EM = 'Delete productProvider successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'ProductProvider not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when delete productProvider: ', e)
    }
}

module.exports = {
    handleGetProductProvidersService,
    handleGetProductsBasedOnProviderService,
    handleGetProvidersBasedOnProductService,
    handleCreateProductProviderService,
    handleDeleteProductProviderService
}