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

const getCustomersPaginationService = async (page, pageSize) => {
    try {
        let res = {};
        let customers = await db.Customer.findAndCountAll({
            where: {
                deleteFlag: false
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        if (customers) {
            res.EC = 0;
            res.EM = 'Get all customers sent successfully';
            res.DT = customers.rows;
            res.total = customers.count;
        } else {
            res.EM = 'Get all customers sent failed';
            res.EC = 1;
            res.DT = '';
        }
        return res;
    } catch (e) {
        console.log('>>> error: ', e);
        return {
            EC: 1,
            EM: 'Error occurred',
            DT: ''
        };
    }
};

const createNewCustomerService = async (dataCustomer) => {
    try {
        let res = {}
        if (!dataCustomer?.email || !dataCustomer?.fullName) {
            res.EM = 'Missing data customer'
            res.EC = -1
            res.DT = ''
        } else {
            await db.Customer.create(dataCustomer);
            res.EC = 0
            res.EM = 'Create a new customer successfully'
            res.DT = {}
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const deleteCustomerService = async (listCustomerId) => {
    try {
        let res = {}
        if (!listCustomerId || listCustomerId.length === 0) {
            res.EM = 'error from server in delete quotes sent: empty list customer delete'
            res.EC = -1
            res.DT = ''
        } else {
            await db.Customer.update({ deleteFlag: true }, {
                where: {
                    id: listCustomerId
                }
            });
            res.EC = 0
            res.EM = 'delete customers successfully'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const updateCustomerService = async (customerId, dataUpdate) => {
    try {
        let res = {}
        if (!dataUpdate || !customerId) {
            res.EM = 'Missing data update customer'
            res.EC = -1
            res.DT = ''
        } else {
            let customer = await db.Customer.findOne({
                where: { id: customerId }
            })
            if (customer) {
                customer.update(dataUpdate)
                res.EC = 0
                res.EM = 'Update info of customer successfully'
                res.DT = {}
            } else {
                res.EC = -2
                res.EM = 'Customer is not existing'
                res.DT = {}
            }
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const createListCustomerService = async (customerList) => {
    try {
        let res = {}
        if (customerList && customerList.length > 0) {
            await db.Customer.bulkCreate(customerList)
            res.EC = 0
            res.EM = 'Create customers successfully'
            res.DT = {}
        } else {
            res.EC = -1
            res.EM = 'Create customers failed'
            res.DT = {}
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

module.exports = {
    getCustomerService, getCustomerByIdService, getCustomersPaginationService, createNewCustomerService,
    deleteCustomerService, updateCustomerService, createListCustomerService
}