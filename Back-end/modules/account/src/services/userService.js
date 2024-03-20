import db from '../models/index'
import bcrypt from 'bcryptjs';
const { Op } = require("sequelize");

const salt = bcrypt.genSaltSync(Number(process.env.SALT_HASH_CODE));

const handleGetEmployeesService = async () => {
    try {
        let res = {}
        let employees = await db.User.findAll({
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
        if (employees) {
            res.EC = 0
            res.EM = 'Get employees successfully'
            res.DT = employees
        } else {
            res.EM = 'Get employees failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const handleGetUserService = async (idCard) => {
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

let hashUserPassword = async (password) => {
    try {
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (err) {
        throw err;
    }
};

const handleCreateUserService = async (data) => {
    try {
        let res = {}
        let user = await db.User.findOne({
            where: {
                email: data.email
            }
        });
        if (user) {
            res.EC = -1
            res.EM = 'User is existing'
            res.DT = ''
        } else {
            await db.User.create({
                name: data.nameEmployee,
                role: data.position,
                password: '123123',
                phone: data.phone,
                email: data.email,
                gender: data.gender,
                avatar: data.avatar,
                birth: data.year,
                address: data.address
            })
            res.EM = 'Create user successfully'
            res.EC = 0
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when create new employee: ', e)
    }
}

const handleUpdateUserService = async (idCard, data) => {
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
            let editUser = await user.update({ ...data })
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

const handleDeleteUserService = async (idCard) => {
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
    handleGetEmployeesService,
    handleGetUserService,
    handleCreateUserService,
    handleUpdateUserService,
    handleDeleteUserService
}