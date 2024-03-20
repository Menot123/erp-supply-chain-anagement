import db from '../models/index'
const { Op } = require('sequelize');

const getAllTypeService = async (type) => {
    try {
        let res = {}
        if (type) {
            let data = await db.all_type.findAll({
                where: {
                    type: type,
                    keyType: {
                        [Op.not]: 'P5'
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

module.exports = {
    getAllTypeService,
}