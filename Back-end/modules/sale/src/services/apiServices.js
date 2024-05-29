import db from '../models/index'
const { Op } = require('sequelize');
import { sendEmail } from './mailService';


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

const getCustomersService = async () => {
    try {
        let res = {}
        let customers = await db.Customer.findAll({
            order: [
                ['fullName', 'ASC']
            ],
            where: {
                status: 'active'
            },
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
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const getAllCodesService = async () => {
    try {
        let res = {}
        let allCodes = await db.AllCode.findAll();
        if (allCodes) {
            res.EC = 0
            res.EM = 'Get allCodes successfully'
            res.DT = allCodes
        } else {
            res.EM = 'Get allCodes failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const getCommentsService = async () => {
    try {
        let res = {}
        let comments = await db.Comment.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        if (comments) {
            res.EC = 0
            res.EM = 'Get comments successfully'
            res.DT = comments
        } else {
            res.EM = 'Get comments failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const postCommentService = async (dataComment) => {
    try {
        let res = {}
        let fieldCheck = ['body', 'userName', 'userId', 'parentId', 'createdAt']

        if (dataComment) {
            fieldCheck.forEach(element => {
                if (!dataComment[element]) {
                    res.EC = -2
                    res.EM = 'Missing fields of comment'
                    res.DT = ''
                    return res
                }
            });
            await db.Comment.create(dataComment)
            res.EM = 'Create a comment successfully'
            res.EC = 0
            res.DT = ''
            return res

        } else {
            res.EC = -1
            res.EM = 'Missing parameters of comment'
            res.DT = ''
            return res
        }
    } catch (e) {
        console.log('>>> error when create a comment: ', e)
    }
}

const updateCommentService = async (content, commentId) => {
    try {
        let res = {}
        if (content && commentId) {
            let comment = await db.Comment.findOne({
                where: {
                    id: commentId
                }
            })
            if (comment) {
                comment.update({ body: content })
                res.EM = 'Update comment successfully.'
                res.EC = 0
                res.DT = ''
            } else {
                res.EM = 'Update comment failed.'
                res.EC = -2
                res.DT = ''
            }
        } else {
            res.EC = -1
            res.EM = 'Missing parameters'
            res.DT = ''
            return res
        }
        return res
    } catch (e) {
        console.log('>>> error when update comment by id: ', e)
    }
}

const deleteCommentService = async (commentId) => {
    try {
        let res = {}
        if (commentId) {
            let comment = await db.Comment.findOne({
                where: {
                    id: commentId
                }
            })
            if (comment) {
                await comment.destroy()
                res.EM = 'Delete comment successfully.'
                res.EC = 0
                res.DT = ''
            } else {
                res.EM = 'Delete comment failed.'
                res.EC = -2
                res.DT = ''
            }
        } else {
            res.EC = -1
            res.EM = 'Missing parameters'
            res.DT = ''
            return res
        }
        return res
    } catch (e) {
        console.log('>>> error when delete comment by id: ', e)
    }
}

const getLatestQuoteService = async () => {
    try {
        let res = {}
        let quote = await db.Quote.findAll({
            limit: 1,
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: 'active'
            },
        });
        if (quote) {
            res.EC = 0
            res.EM = 'Get quote latest successfully'
            res.DT = quote
        } else {
            res.EM = 'Get quote latest failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const sendingQuoteService = async (dataQuote, fullDataCustomer, bodySendQuote, quoteFile) => {
    let res = {}

    if (dataQuote && fullDataCustomer && bodySendQuote && quoteFile) {
        const dataQuoteSend = JSON.parse(dataQuote)
        const fullDataCustomerSend = JSON.parse(fullDataCustomer)

        try {
            sendEmail({
                receiver: fullDataCustomerSend?.email,
                name: fullDataCustomerSend?.fullName,
                bodySendQuote: bodySendQuote,
                quoteCode: dataQuoteSend?.quoteId,
                currentLang: 'vi',
                quoteFile: quoteFile,
            })

            res.EM = 'Sending a quote successfully'
            res.EC = 0
            res.DT = ''
        } catch (error) {
            // Xử lý lỗi gửi email
            console.error('Error sending email:', error)
            res.EM = 'Sending a quote failed'
            res.EC = -1
            res.DT = ''
        }
    } else {
        res.EM = 'Sending a quote failed'
        res.EC = -2
        res.DT = ''
    }
    return res
}

module.exports = {
    createCompanyDataService, createBranchCompanyDataService, getBranchesService,
    getBranchService, getDetailCompanyService, handleDeleteCompanyService, updateConfirmQuoteService,
    getCustomersService, getAllCodesService, getCommentsService, postCommentService, updateCommentService,
    deleteCommentService, getLatestQuoteService, sendingQuoteService
}