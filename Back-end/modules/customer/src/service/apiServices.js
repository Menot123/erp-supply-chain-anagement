import db from '../models/index'
const { Op } = require('sequelize');

const getCustomerService = async () => {
    try {
        let res = {}
        let customers = await db.Customer.findAll({
            where: {
                deleteFlag: false
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
        if (customers) {
            res.EC = 0
            res.EM = 'Get all customers successfully'
            res.DT = customers
        } else {
            res.EM = 'Get all customers failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const getCustomerByIdService = async (customerId) => {
    try {
        let res = {}
        let customer = await db.Customer.findOne({
            where: {
                id: customerId
            }
        });
        if (customer) {
            res.EC = 0
            res.EM = 'Get info customer successfully'
            res.DT = customer
        } else {
            res.EM = 'Get info customer failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

module.exports = {
    getCustomerService, getCustomerByIdService
}