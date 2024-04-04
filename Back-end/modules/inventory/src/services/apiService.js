import db from '../models/index'
const { Op } = require('sequelize');

const getAllCodeService = async (type) => {
    try {
        let res = {}
        if (type) {
            let data = await db.all_code.findAll({
                where: {
                    type: type,
                    status: {
                        [Op.not]: 'deleted',
                    }
                }
            })
            if (data) {
                res.EC = 0
                res.EM = 'Get all type successfully'
                res.DT = data
            } else {
                res.EM = 'Get all type failed'
                res.EC = 2
                res.DT = ''
            }
        } else {
            res.EM = 'Error when get all type service'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const createNewProductGroupService = async (valueVi, valueEn) => {
    try {
        let res = {}
        if (valueVi !== '' && valueEn !== '') {
            let data = await db.all_code.findAll({
                where: {
                    type: 'Group',
                    [Op.or]: {
                        valueVi: valueVi,
                        valueEn: valueEn
                    },
                    status: {
                        [Op.not]: 'deleted',
                    }
                }
            })
            if (data.length > 0) {
                res.EM = 'This group of product is existing'
                res.EC = 2
                res.DT = ''
            } else {
                let lastGroupKey = await db.all_code.findOne({
                    order: [
                        ['id', 'DESC']
                    ],
                    where: {
                        type: 'Group',
                    }

                })
                let lastKeyType = lastGroupKey.dataValues.keyType
                let number = parseInt(lastKeyType.slice(1))
                number++
                let newKeyType = lastKeyType[0] + number.toString()
                let createGroup = await db.all_code.create({ keyType: newKeyType, type: "Group", valueVi: valueVi, valueEn: valueEn })
                res.EC = 0
                res.EM = 'Create group product successfully'
                res.DT = ''
            }
        } else {
            res.EM = 'Error when create new group product service'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const deleteProductGroupService = async (keyType) => {
    try {
        let res = {}
        if (keyType != '') {
            let data = await db.all_code.findOne({
                where: {
                    type: 'Group',
                    keyType: keyType,
                    status: 'active'
                }
            })
            if (data) {
                await data.update({ status: 'deleted' })
                res.EC = 0
                res.EM = 'Delete produtct group successfully'
                res.DT = ''
            }
            else {
                res.EC = -1
                res.EM = 'Not found this product group to delete'
                res.DT = ''
            }

        }
        else {
            res.EM = 'Error when delete group product service'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

module.exports = {
    getAllCodeService,
    createNewProductGroupService,
    deleteProductGroupService
}