import db from '../models/index'
import bcrypt from 'bcryptjs';
const { Op } = require("sequelize");

const salt = bcrypt.genSaltSync(Number(process.env.SALT_HASH_CODE));

const handleGetAllUsersService = async() => {
    try {
        let res = {}
        let user = await db.User.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                email: {
                    [Op.not]: 'admin@gmail.com'
                },
                status: {
                    [Op.not]: 'deleted'
                },
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });
        if (user) {
            res.EC = 0
            res.EM = 'Get all users successfully'
            res.DT = user
        } else {
            res.EM = 'Get all users failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const handleGetUserService = async(idCard) => {
    try {
        let res = {}
        let user = await db.User.findOne({
            where: {
                email: {
                    [Op.not]: 'admin@gmail.com'
                },
                status: {
                    [Op.not]: 'deleted'
                },
                idCard: idCard
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });
        if (user) {
            res.EC = 0
            res.EM = 'Get user successfully'
            res.DT = user
        } else {
            res.EM = 'Get user failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

let hashUserPassword = async(password) => {
    try {
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (err) {
        throw err;
    }
};

const handleCreateUserService = async(data) => {
    try {
        let res = {}
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { idCard: data.idCard },
                    { email: data.email },
                    { phone: data.phone }
                ]
            },
        });
        if (user) {
            res.EC = -1
            res.EM = 'User is existing'
            res.DT = ''
        } else {
            let hashPassword = await hashUserPassword(data.password)
            data.password = hashPassword
            let newUser = await db.User.create(data)
            res.EM = 'Create user successfully'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const handleUpdateUserService = async(idCard, data) => {
    try {
        let res = {}
        let user = await db.User.findOne({
            where: {
                email: {
                    [Op.not]: 'admin@gmail.com'
                },
                status: {
                    [Op.not]: 'deleted'
                },
                idCard: idCard
            },
        });
        if (user) {
            let editUser = await user.update({...data })
            res.EM = 'Update user successfully'
            res.EC = 1
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'User not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const handleDeleteUserService = async(idCard) => {
    try {
        let res = {}
        let user = await db.User.findOne({
            where: {
                email: {
                    [Op.not]: 'admin@gmail.com'
                },
                status: {
                    [Op.not]: 'deleted'
                },
                idCard: idCard
            },
        });
        if (user) {
            let deleteUser = await user.update({ status: 'deleted' })
            res.EC = 0
            res.EM = 'Delete user successfully'
            res.DT = ''
        } else {
            res.EM = 'Delete user failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

module.exports = {
    handleGetAllUsersService,
    handleGetUserService,
    handleCreateUserService,
    handleUpdateUserService,
    handleDeleteUserService
}