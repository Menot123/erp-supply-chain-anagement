import db from '../models/index'
const { Op } = require('sequelize');

const createCompanyDataService = async (dataCompany) => {
    try {
        let res = {}
        let fieldCheck = ['name', 'logo', 'address', 'phone', 'taxId', 'email', 'money', 'website',]
        if (dataCompany) {
            fieldCheck.forEach(element => {
                if (!dataCompany[element]) {
                    res.EC = -1
                    res.EM = 'Missing parameters of company'
                    res.DT = ''
                    return res
                }
            });

            const [company, created] = await db.CompanyInfo.findOrCreate({
                where: {
                    status: {
                        [Op.not]: 'deleted'
                    }
                },
                defaults: {
                    ...dataCompany,
                    status: 'active'
                },
            });
            if (!created && company) {
                await company.update(dataCompany)
                res.EM = 'Update company info  successfully'
                res.EC = 0
                res.DT = ''
            } else {
                res.EM = 'Create company info  successfully'
                res.EC = 0
                res.DT = ''
            }
        } else {
            res.EC = -1
            res.EM = 'Missing parameters of company'
            res.DT = ''
            return res
        }
        return res
    } catch (e) {
        console.log('>>> error when create new company: ', e)
    }
}

const createBranchCompanyDataService = async (dataBranch) => {
    try {
        let res = {}
        let fieldCheck = ['name', 'idBranch', 'mainCompanyId', 'logo', 'address', 'phone', 'taxId', 'email', 'money', 'website',]

        if (dataBranch) {
            fieldCheck.forEach(element => {
                if (!dataBranch[element]) {
                    res.EC = -2
                    res.EM = 'Missing parameters of company'
                    res.DT = ''
                    return res
                }
            });
            if (dataBranch?.idBranch === -10) {
                const { idBranch, ...dataCreate } = dataBranch
                await db.Branches.create({ ...dataCreate, status: 'active' })
                res.EM = 'Create branch info  successfully'
                res.EC = 0
                res.DT = ''
            } else {
                let branch = await db.Branches.findOne({
                    where: {
                        id: dataBranch?.idBranch
                    }
                })
                if (branch) {
                    await branch.update(dataBranch)
                    res.EM = 'Update branch info  successfully'
                    res.EC = 0
                    res.DT = ''
                } else {
                    res.EC = -3
                    res.EM = 'Update branch info failed'
                    res.DT = ''
                    return res
                }
            }
        } else {
            res.EC = -1
            res.EM = 'Missing parameters of branch'
            res.DT = ''
            return res
        }
        return res
    } catch (e) {
        console.log('>>> error when create new branch company: ', e)
    }
}

const getBranchesService = async () => {
    try {
        let res = {}
        let branches = await db.Branches.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: 'active'
            },
        });
        if (branches) {
            res.EC = 0
            res.EM = 'Get branches successfully'
            res.DT = branches
        } else {
            res.EM = 'Get branches failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const getBranchService = async (idCompany) => {
    try {
        let res = {}
        let branch = await db.Branches.findOne({
            where: {
                status: 'active',
                id: idCompany
            },
        });
        if (branch) {
            res.EC = 0
            res.EM = 'Get branch successfully'
            res.DT = branch
        } else {
            res.EM = 'Get branch failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const getDetailCompanyService = async () => {
    try {
        let res = {}
        let info = await db.CompanyInfo.findOne({
            where: {
                status: 'active',
            },
        });
        if (info) {
            res.EC = 0
            res.EM = 'Get detail info company successfully'
            res.DT = info
        } else {
            res.EM = 'Get detail info company failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when get detail info company service: ', e)
    }
}

const handleDeleteCompanyService = async (idCompany) => {
    try {
        let res = {}
        if (idCompany) {
            let branch = await db.Branches.findOne({
                where: {
                    status: 'active',
                    id: idCompany
                },
            });
            if (branch) {
                branch.update({ status: 'deleted' })
                res.EC = 0
                res.EM = 'Delete branch successfully'
                res.DT = ''
            } else {
                res.EM = 'Delete branch failed'
                res.EC = -2
                res.DT = ''
            }
        } else {
            res.EM = 'Missing id company'
            res.EC = -1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const updateConfirmQuoteService = async (methodConfirm) => {
    try {
        let res = {}
        if (methodConfirm) {
            let company = await db.CompanyInfo.findOne({
                where: {
                    status: 'active'
                }
            })
            if (company) {
                company.update({ confirmQuote: methodConfirm })
                res.EM = 'Update confirm quote method successfully'
                res.EC = 0
                res.DT = ''
            } else {
                res.EM = 'Update confirm quote method failed. Not found company info'
                res.EC = -2
                res.DT = ''
            }
        } else {
            res.EC = -1
            res.EM = 'Missing parameters of method confirm'
            res.DT = ''
            return res
        }
        return res
    } catch (e) {
        console.log('>>> error when create new company: ', e)
    }
}

module.exports = {
    createCompanyDataService, createBranchCompanyDataService, getBranchesService,
    getBranchService, getDetailCompanyService, handleDeleteCompanyService, updateConfirmQuoteService
}