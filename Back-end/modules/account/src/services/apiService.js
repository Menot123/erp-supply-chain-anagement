import db from '../models/index'
const { Op } = require('sequelize');
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(Number(process.env.SALT_HASH_CODE));

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

const getEmployeesByDepartmentService = async (params, paginate) => {
    try {

        let res = {}
        let departmentFind = params?.department
        let page = paginate?.page
        let limit = paginate?.limit
        if (departmentFind && page && limit) {
            let offset = (page - 1) * limit
            let { count, rows } = await db.User.findAndCountAll({
                offset: offset,
                limit: +limit,
                order: [['firstName', 'DESC']],
                where: {
                    department: departmentFind,
                    email: {
                        [Op.not]: 'admin@gmail.com',
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
        } else {
            res.EM = 'Error when get all employee by department service'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const hashUserPassword = async (password) => {
    try {
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (err) {
        throw err;
    }
};

const handleCreateUsersService = async (usersData) => {
    try {
        let res = {}

        // Check header correct by template
        const expectedFields = ['firstName', 'lastName', 'email', 'phone', 'birth', 'address', 'role', 'department'];
        if (usersData && usersData.length > 0) {
            const extraFields = [];
            for (const key in usersData[0]) {
                if (!expectedFields.includes(key)) {
                    extraFields.push(key);
                }
            }
            if (extraFields.length > 0) {
                res.EC = -1
                res.EM = 'Header is incorrect, please check again'
                res.DT = extraFields
            } else {
                usersData.forEach((item) => {
                    if (!item.email) {
                        res.EM = 'Missing an email in your employee list'
                        res.EC = -4
                        res.DT = ''
                        return res
                    }
                })
                // Check employee is existing
                const listEmail = usersData.map(user => user.email);
                const existingUsers = await db.User.findAll({
                    where: {
                        email: {
                            [Op.in]: listEmail
                        }
                    },
                    attributes: ['email']
                });
                const existingEmails = existingUsers.map(user => user.email);
                const nonExistingUsers = listEmail.filter(email => !existingEmails.includes(email));
                const defaultPassword = await hashUserPassword('123123')
                if (nonExistingUsers.length > 0) {
                    const filteredUsersData = usersData.filter(user => nonExistingUsers.includes(user?.email));
                    const dataBulk = filteredUsersData.map((item, index) => {
                        return {
                            ...item,
                            password: defaultPassword
                        }
                    })
                    if (dataBulk && dataBulk.length > 0) {
                        await db.User.bulkCreate(dataBulk)
                        res.EM = 'Import users successfully'
                        res.EC = 0
                        res.DT = ''
                    }
                } else {
                    res.EM = 'All employee is existing'
                    res.EC = -3
                    res.DT = ''
                }
            }
        } else {
            res.EM = 'Something wrong with your file, please check again!'
            res.EC = -2
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when create new employee: ', e)
    }
}

const handleCreateDepartmentService = async (dataDepartment) => {
    try {
        if (!dataDepartment?.nameVi || !dataDepartment?.nameEn || !dataDepartment?.departmentCode || !dataDepartment?.managerId) {
            res.EC = -1
            res.EM = 'Missing parameters of department'
            res.DT = ''
            return res
        }
        let res = {}
        let department = await db.Department.findOne({
            where: {
                departmentCode: dataDepartment?.departmentCode
            }
        });
        if (department) {
            res.EC = -2
            res.EM = 'Department is existing'
            res.DT = ''
        } else {
            await db.Department.create(dataDepartment)
            res.EM = 'Create a new department successfully'
            res.EC = 0
            res.DT = ''

        }
        return res
    } catch (e) {
        console.log('>>> error when create new department: ', e)
    }
}

const handleGetAllDepartmentsService = async () => {
    try {
        let res = {}
        const departments = await db.Department.findAll({
            where: {
                status: 'active',
            }
        })
        if (departments) {
            res.EC = 0
            res.EM = 'Get all departments successfully'
            res.DT = departments
        } else {
            res.EM = 'Get all departments failed'
            res.EC = 2
            res.DT = ''
        }

        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}


module.exports = {
    getAllTypeService, getEmployeesByDepartmentService, handleCreateUsersService, handleCreateDepartmentService,
    handleGetAllDepartmentsService
}