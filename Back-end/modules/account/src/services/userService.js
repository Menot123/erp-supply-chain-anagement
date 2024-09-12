import db from '../models/index'
import bcrypt from 'bcryptjs';
const { Op } = require("sequelize");

const salt = bcrypt.genSaltSync(Number(process.env.SALT_HASH_CODE));

const handleGetAllUsersService = async (req, res) => {
    try {
        let res = {}
        let employees = await db.User.findAll({
            order: [
                ['firstName', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            },
            attributes: { exclude: ['role', 'department', 'password', 'gender', 'birth', 'address', 'avatar', 'status', 'createdAt', 'updatedAt'] },
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

const handleGetEmployeesService = async () => {
    try {
        let res = {}
        let employees = await db.User.findAll({
            order: [
                ['firstName', 'DESC']
            ],
            where: {
                email: {
                    [Op.not]: 'admin@gmail.com'
                },
                status: {
                    [Op.not]: 'deleted'
                },
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [
                { model: db.all_type, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                { model: db.all_type, as: 'departmentData', attributes: ['valueVi', 'valueEn'] },
            ]
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

const getEmployeesPaginationService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: +limit,
            order: [['firstName', 'DESC']],
            where: {
                email: {
                    [Op.not]: 'admin@gmail.com'
                },
                status: {
                    [Op.not]: 'deleted'
                }
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [
                { model: db.all_type, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                { model: db.all_type, as: 'departmentData', attributes: ['valueVi', 'valueEn'] },
            ]
        })

        let pages = Math.ceil(count / limit)

        let response = {
            totalRows: count,
            totalPage: pages,
            employees: rows
        }

        return {
            EM: 'Get employees pagination successfully',
            EC: 0,
            DT: response
        }

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with getEmployeesPagination service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetEmployeeService = async (idEmployee) => {
    try {
        let res = {}

        // In case id customer
        if (idEmployee && idEmployee.includes("CU")) {
            idEmployee = 1
        }

        let employee = await db.User.findOne({
            where: {
                // email: {
                //     [Op.not]: 'admin@gmail.com'
                // },
                status: {
                    [Op.not]: 'deleted'
                },
                id: idEmployee
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [
                { model: db.all_type, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
            ]
        });
        if (employee) {
            res.EC = 0
            res.EM = 'Get employee successfully'
            res.DT = employee
        } else {
            res.EM = 'Get employee failed'
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
                email: data?.email
            }
        });
        if (user) {
            res.EC = -1
            res.EM = 'User is existing'
            res.DT = ''
        } else {
            let firstName = ''
            let lastName = ''
            if (data?.nameEmployee && data?.nameEmployee.length > 0) {
                let arrName = data?.nameEmployee.split(' ')
                firstName = arrName[arrName.length - 1]
                lastName = arrName.slice(0, -1).join(' ');
            } else {
                firstName = data?.nameEmployee
            }
            const password = await hashUserPassword('123123');
            await db.User.create({
                firstName: firstName,
                lastName: lastName,
                role: data?.position,
                password: password,
                phone: data?.phone,
                email: data?.email,
                gender: data?.gender,
                avatar: data?.avatar,
                birth: data?.year,
                address: data?.address,
                department: data?.department
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

const handleUpdateEmployeeService = async (data) => {
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
                id: data.idEmployee
            },
        });
        if (user) {
            let dataUpdate = {
                role: data.position,
                phone: data.phone,
                email: data.email,
                gender: data.gender,
                avatar: data.avatar,
                birth: data.year,
                address: data.address,
            }
            await user.update({ ...dataUpdate })
            res.EM = 'Update user successfully'
            res.EC = 0
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

const handleDeleteUserService = async (userId) => {
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
                id: userId
            },
        });
        if (user) {
            await user.update({ status: 'deleted' })
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

const resetPasswordService = async (userEmail, oldPwd, newPwd) => {
    try {
        let res = {}
        let email = userEmail
        let user = await db.User.findOne({
            where: {
                email: email,
            }
        })
        if (user) {
            let checkPass = true
            if (user.email !== 'admin@gmail.com') {
                checkPass = bcrypt.compareSync(oldPwd, user.password);
            } else {
                if (oldPwd !== user.password)
                    checkPass = false;
            }
            if (checkPass) {
                let newPassword = ''
                if (user.email !== 'admin@gmail.com') {
                    newPassword = await hashUserPassword(newPwd)
                } else {
                    newPassword = newPwd
                }
                await user.update({ password: newPassword })
                res.EC = 0
                res.EM = `Reset password user ${userEmail} successfully`
                res.DT = {}
            } else {
                res.EC = -1
                res.EM = `Password is incorrect`
                res.DT = {}
            }

        } else {
            res.EC = 1
            res.EM = `Not found user ${userEmail} `
            res.DT = {}
        }

        return res

    } catch (e) {
        console.log('>>> error from service: ', e)
        return {
            EM: 'Something wrong with reset password user service',
            EC: 1,
            DT: ''
        }
    }
}


module.exports = {
    handleGetAllUsersService,
    handleGetEmployeesService,
    handleGetEmployeeService,
    handleCreateUserService,
    handleUpdateEmployeeService,
    handleDeleteUserService,
    resetPasswordService,
    getEmployeesPaginationService
}