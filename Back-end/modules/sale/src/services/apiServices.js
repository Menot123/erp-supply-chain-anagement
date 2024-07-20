import db from '../models/index'
const { Op } = require('sequelize');
import { sendEmail, sendInvoice } from './mailService';


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
                status: {
                    [Op.not]: 'active',
                },
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

const sendingInvoiceService = async (dataInvoice, fullDataCustomer, bodySendQuote, quoteFile) => {
    let res = {}

    if (dataInvoice && fullDataCustomer && bodySendQuote && quoteFile) {
        const dataQuoteSend = JSON.parse(dataInvoice)
        const fullDataCustomerSend = JSON.parse(fullDataCustomer)

        try {
            sendInvoice({
                receiver: fullDataCustomerSend?.email,
                name: fullDataCustomerSend?.fullName,
                bodySendQuote: bodySendQuote,
                quoteCode: dataQuoteSend?.quoteId,
                currentLang: 'vi',
                quoteFile: quoteFile,
            })

            res.EM = 'Sending a invoice successfully'
            res.EC = 0
            res.DT = ''
        } catch (error) {
            // Xử lý lỗi gửi email
            console.error('Error sending email:', error)
            res.EM = 'Sending a invoice failed'
            res.EC = -1
            res.DT = ''
        }
    } else {
        res.EM = 'Sending a invoice failed'
        res.EC = -2
        res.DT = ''
    }
    return res
}


const postQuoteService = async (dataQuote) => {
    try {
        let res = {}
        let fieldCheck = ['quoteId', 'customer', 'expirationDay', 'currency', 'paymentPolicy', 'productList', 'totalPrice']

        if (dataQuote) {
            fieldCheck.forEach(element => {
                if (!dataQuote[element]) {
                    res.EC = -2
                    res.EM = 'Missing fields of quote'
                    res.DT = ''
                    return res
                }
            });
            let quote = await db.Quote.findOne({
                where: {
                    quoteId: dataQuote?.quoteId
                }
            })
            if (!quote) {
                await db.Quote.create({
                    ...dataQuote,
                    customerId: dataQuote?.customer,
                    tax: JSON.stringify(dataQuote.tax),
                    productList: JSON.stringify(dataQuote.productList),
                    status: dataQuote?.status ?? 'S0'
                })
            } else {
                if (quote.status === 'S0') {
                    await quote.update({ status: dataQuote?.status })
                }
            }
            res.EM = 'Create a quote successfully'
            res.EC = 0
            res.DT = ''
            return res

        } else {
            res.EC = -1
            res.EM = 'Missing parameters of quote'
            res.DT = ''
            return res
        }
    } catch (error) {
        console.error('Error create quote service:', error)
    }

}

const updateStatusQuoteService = async (quoteId) => {
    try {
        let res = {}
        let quote = await db.Quote.findOne({
            where: {
                quoteId: quoteId
            }
        })

        if (quote) {
            await quote.update({ status: 'S2' })
            res.EM = 'Create a quote successfully'
            res.EC = 0
            res.DT = ''
        } else {
            await db.Quote.create({
                ...dataQuote,
                customerId: dataQuote?.customer,
                tax: JSON.stringify(dataQuote.tax),
                productList: JSON.stringify(dataQuote.productList),
                status: dataQuote?.status ?? 'S0'
            })
        }
        return res
    }
    catch (error) {
        console.error('Error create quote service:', error)
    }
}

const getDataPreviewQuoteService = async (quoteId) => {
    try {
        let res = {}
        let dataQuote = await db.Quote.findOne({
            where: {
                quoteId: quoteId,
                status: {
                    [Op.not]: 'active',
                },
            },
            include: [
                {
                    model: db.Customer,
                    as: 'dataCustomer',
                },
                {
                    model: db.AllCode,
                    as: 'dataCurrency',
                    attributes: ['valueVi', "valueEn"],
                },
                {
                    model: db.AllCode,
                    as: 'dataPaymentPolicy',
                    attributes: ['valueVi', "valueEn"],
                }
            ]
        });
        if (dataQuote) {
            res.EC = 0
            res.EM = 'Get dataQuote latest successfully'
            res.DT = dataQuote
        } else {
            res.EM = 'Get dataQuote latest failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const postCancelQuoteService = async (dataQuote, fullDataCustomer, bodySendQuote) => {
    try {
        let res = {}
        let fieldCheck = ['quoteId', 'customer', 'expirationDay', 'currency', 'paymentPolicy', 'productList', 'totalPrice']
        const dataQuoteSend = JSON.parse(dataQuote)
        const fullDataCustomerSend = JSON.parse(fullDataCustomer)

        if (dataQuoteSend) {
            fieldCheck.forEach(element => {
                if (!dataQuoteSend[element]) {
                    res.EC = -2
                    res.EM = 'Missing fields of quote'
                    res.DT = ''
                    return res
                }
            });
            await sendEmailCancelQuote(dataQuote, fullDataCustomer, bodySendQuote)
            let quote = await db.Quote.findOne({
                where: {
                    quoteId: dataQuoteSend?.quoteId
                }
            })
            if (quote) {
                await quote.update({ status: dataQuoteSend?.status })
                res.EM = 'Cancel quote successfully'
                res.EC = 0
                res.DT = ''
            } else {
                res.EM = 'Something went wrong when cancel quote service'
                res.EC = -3
                res.DT = ''
            }
        } else {
            res.EC = -1
            res.EM = 'Missing parameters of quote'
            res.DT = ''
        }
        return res
    } catch (error) {
        console.error('Error create quote service:', error)
    }
}

const sendEmailCancelQuote = async (dataQuote, fullDataCustomer, bodySendQuote) => {
    let res = {}

    if (dataQuote && fullDataCustomer && bodySendQuote) {
        const dataQuoteSend = JSON.parse(dataQuote)
        const fullDataCustomerSend = JSON.parse(fullDataCustomer)

        try {
            sendEmail({
                receiver: fullDataCustomerSend?.email,
                name: fullDataCustomerSend?.fullName,
                bodySendQuote: bodySendQuote,
                quoteCode: dataQuoteSend?.quoteId,
                currentLang: 'vi',
            })

            res.EM = 'Sending an email cancel quote successfully'
            res.EC = 0
            res.DT = ''
        } catch (error) {
            // Xử lý lỗi gửi email
            console.error('Error sending  an email cancel:', error)
            res.EM = 'Sending  an email cancel quote failed'
            res.EC = -1
            res.DT = ''
        }
    } else {
        res.EM = 'Sending  an email cancel quote failed'
        res.EC = -2
        res.DT = ''
    }
    return res
}

const postInvoiceService = async (dataInvoice) => {
    try {
        let res = {}
        let fieldCheck = dataInvoice?.customerId !== undefined ?
            ['invoiceId', 'customerId', 'dateCreateInvoice', 'paymentPolicy', 'productList', 'totalPrice']
            :
            ['invoiceId', 'customer', 'dateCreateInvoice', 'paymentPolicy', 'productList', 'totalPrice']
        if (dataInvoice) {
            for (const element of fieldCheck) {
                if (!dataInvoice[element] || dataInvoice[element] === undefined) {
                    res.EC = -2
                    res.EM = 'Missing fields of invoice'
                    res.DT = ''
                    return res
                }
            }

            let invoice = await db.Invoice.findOne({
                where: {
                    invoiceId: dataInvoice?.invoiceId
                }
            })
            if (!invoice) {
                await db.Invoice.create({
                    ...dataInvoice,
                    customerId: dataInvoice?.customerId ? dataInvoice?.customerId : dataInvoice?.customer,
                    tax: JSON.stringify(dataInvoice.tax),
                    productList: JSON.stringify(dataInvoice.productList),
                    createdDate: dataInvoice?.dateCreateInvoice,
                    status: dataInvoice?.status ?? 'I0',
                })
            } else {
                if (invoice.status === 'I0') {
                    await invoice.update({ status: dataInvoice?.status })
                }
            }
            res.EM = 'Create a invoice successfully'
            res.EC = 0
            res.DT = ''
            return res

        } else {
            res.EC = -1
            res.EM = 'Missing parameters of invoice'
            res.DT = ''
            return res
        }
    } catch (error) {
        console.error('Error create invoice service:', error)
    }

}

const getDataPreviewInvoiceService = async (invoiceId) => {
    try {
        let res = {}
        let dataInvoice = await db.Invoice.findOne({
            where: {
                invoiceId: invoiceId,
                status: {
                    [Op.not]: 'active',
                },
            },
            include: [
                {
                    model: db.Customer,
                    as: 'dataCustomerInvoice',
                },
                {
                    model: db.AllCode,
                    as: 'invoicePaymentPolicy',
                    attributes: ['valueVi', "valueEn"],
                }
            ]
        });
        if (dataInvoice) {
            res.EC = 0
            res.EM = 'Get dataInvoice successfully'
            res.DT = dataInvoice
        } else {
            res.EM = 'Get dataInvoice failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const confirmInvoiceService = async (dataInvoice) => {
    try {
        let res = {}
        let fieldCheck = ['quoteId', 'customer', 'dateCreateInvoice', 'paymentPolicy', 'productList', 'totalPrice']

        if (dataInvoice) {
            fieldCheck.forEach(element => {
                if (!dataInvoice[element]) {
                    res.EC = -2
                    res.EM = 'Missing fields of Invoice'
                    res.DT = ''
                    return res
                }
            });
            let invoice = await db.Invoice.findOne({
                where: {
                    invoiceId: dataInvoice?.quoteId
                }
            })
            if (!invoice) {
                await db.Invoice.create({
                    ...dataInvoice,
                    customerId: dataInvoice?.customer,
                    tax: JSON.stringify(dataInvoice.tax),
                    productList: JSON.stringify(dataInvoice.productList),
                    invoiceId: dataInvoice?.quoteId,
                    createdDate: dataInvoice?.dateCreateInvoice,
                    status: dataInvoice?.status ?? 'S0'
                })
            } else {
                if (invoice.status === 'S0') {
                    await invoice.update({ status: "S1" })
                }
            }
            res.EM = 'Confirm a invoice successfully'
            res.EC = 0
            res.DT = ''
            return res

        } else {
            res.EC = -1
            res.EM = 'Missing parameters of quote'
            res.DT = ''
            return res
        }
    } catch (error) {
        console.error('Error when confirm invoice service:', error)
    }
}

const paidInvoiceService = async (dataPaidInvoice) => {
    try {
        let res = {}
        let fieldCheck = ['datePaid', 'total', 'paymentMethod', 'contentTransfer']

        if (dataPaidInvoice) {
            fieldCheck.forEach(element => {
                if (!dataPaidInvoice[element]) {
                    res.EC = -2
                    res.EM = 'Missing fields paid of invoice'
                    res.DT = ''
                    return res
                }
            });
            await db.InvoicePaid.create({
                ...dataPaidInvoice,
                invoiceId: dataPaidInvoice?.invoiceId,

            })
            res.EM = 'Create a paid of invoice successfully'
            res.EC = 0
            res.DT = ''
            return res

        } else {
            res.EC = -1
            res.EM = 'Missing parameters paid of invoice'
            res.DT = ''
            return res
        }
    } catch (error) {
        console.error('Error create paid invoice service:', error)
    }
}

const getInvoicesService = async () => {
    try {
        let res = {}
        let invoices = await db.InvoicePaid.findAll({
            where: {
                delete_flag: false
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
        if (invoices) {
            res.EC = 0
            res.EM = 'Get all paid invoices successfully'
            res.DT = invoices
        } else {
            res.EM = 'Get all paid invoices failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

const getQuotesSentService = async (page, pageSize) => {
    try {
        let res = {};
        let quotes = await db.Quote.findAndCountAll({
            where: {
                [Op.or]: [{ status: 'S1' }, { status: 'S2' }]
            },
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: db.Customer,
                    as: 'dataCustomer',
                },
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        if (quotes) {
            res.EC = 0;
            res.EM = 'Get all quotes sent successfully';
            res.DT = quotes.rows;
            res.total = quotes.count;
        } else {
            res.EM = 'Get all quotes sent failed';
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

const listQuoteDeleteService = async (listQuote) => {
    try {
        let res = {}
        if (!listQuote || listQuote.length === 0) {
            res.EM = 'error from server in delete quotes sent: empty list quote'
            res.EC = 1
            res.DT = ''
        } else {
            await db.Quote.update({ status: 'deleted' }, {
                where: {
                    quoteId: listQuote
                }
            });
            res.EC = 0
            res.EM = 'delete quotes sent successfully'
            res.DT = ''
        }
        return res

    } catch (e) {
        console.log('>>> error: ', e)
    }
}

module.exports = {
    createCompanyDataService, createBranchCompanyDataService, getBranchesService,
    getBranchService, getDetailCompanyService, handleDeleteCompanyService, updateConfirmQuoteService,
    getCustomersService, getAllCodesService, getCommentsService, postCommentService, updateCommentService,
    deleteCommentService, getLatestQuoteService, sendingQuoteService, postQuoteService, updateStatusQuoteService,
    getDataPreviewQuoteService, postCancelQuoteService, sendEmailCancelQuote, postInvoiceService, getDataPreviewInvoiceService,
    confirmInvoiceService, sendingInvoiceService, paidInvoiceService, getInvoicesService, getQuotesSentService,
    listQuoteDeleteService
}