import db from '../models/index'
const { Op } = require("sequelize");

const handleGetCustomersService = async() => {
    try {
        let res = {}
        let customers = await db.Customer.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            }
        });
        if (customers) {
            res.EC = 0
            res.EM = 'Get customers successfully'
            res.DT = customers
        } else {
            res.EM = 'Get customers failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (error) {
        console.log('>>> error from get customers: ', e)
        return {
            EM: 'Something wrong with handleGetCustomersService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetCustomerWithIdService = async(id) => {
    try {
        let res = {}
        let customer = await db.Customer.findOne({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                customerId: id
            }
        });
        if (customer) {
            res.EC = 0
            res.EM = 'Get customer successfully'
            res.DT = customer
        } else {
            res.EM = 'Get customer failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get customer with id service: ', e)
    }
}

const handleCreateCustomerService = async(data) => {
    try {
        let res = {}
        let customer = await db.Customer.findOne({
            where: {
                contact: data.contact
            }
        });
        if (customer) {
            // console.log(customer)
            res.EC = -1
            res.EM = 'Customer is existing'
            res.DT = ''
        } else {
            await db.Customer.create({
                ...data
            })
            res.EM = 'Create customer successfully'
            res.EC = 0
            res.DT = ''

        }
        return res
    } catch (e) {
        console.log('>>> error when create new customer: ', e)
    }
}

const handleUpdateCustomerService = async(customerId, data) => {
    try {
        let res = {}
        let customer = await db.Customer.findOne({
            where: {
                customerId: customerId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (customer) {
            await customer.update({
                ...data
            })
            res.EM = 'Update customer successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'Customer not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when update customer: ', e)
    }
}

const handleDeleteCustomerService = async(customerId) => {
    try {
        let res = {}
        let customer = await db.Customer.findOne({
            where: {
                customerId: customerId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (customer) {
            await customer.update({ status: 'deleted' })
            res.EM = 'Delete customer successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'Customer not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when delete customer: ', e)
    }
}

module.exports = {
    handleGetCustomersService,
    handleGetCustomerWithIdService,
    handleCreateCustomerService,
    handleUpdateCustomerService,
    handleDeleteCustomerService
}