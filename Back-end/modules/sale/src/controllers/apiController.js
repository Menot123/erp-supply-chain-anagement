import apiService from '../services/apiServices';

const createCompanyData = async (req, res, next) => {
    try {
        let companyData = req.body;
        let response = await apiService.createCompanyDataService(companyData);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in create company data controller',
            EC: -1,
            DT: ''
        })
    }
}

const createBranchCompanyData = async (req, res, next) => {
    try {
        let dataBranch = req.body;
        let response = await apiService.createBranchCompanyDataService(dataBranch);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in create branch of company data controller',
            EC: -1,
            DT: ''
        })
    }
}

const getBranches = async (req, res, next) => {
    try {
        let response = await apiService.getBranchesService();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get branches of company controller',
            EC: -1,
            DT: ''
        })
    }
}

const getBranch = async (req, res, next) => {
    try {
        let idCompany = req.query?.idCompany
        let response = await apiService.getBranchService(idCompany);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get detail branch of company controller',
            EC: -1,
            DT: ''
        })
    }
}

const getDetailCompany = async (req, res, next) => {
    try {
        let response = await apiService.getDetailCompanyService();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get detail company controller',
            EC: -1,
            DT: ''
        })
    }
}

const handleDeleteCompany = async (req, res, next) => {
    try {
        let idDelete = req.query?.idBranch
        let response = await apiService.handleDeleteCompanyService(idDelete);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in delete company controller',
            EC: -1,
            DT: ''
        })
    }
}

const updateConfirmQuote = async (req, res, next) => {
    try {
        let methodConfirm = req.body;
        let response = await apiService.updateConfirmQuoteService(methodConfirm?.confirmMethod);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in update confirm quote method controller',
            EC: -1,
            DT: ''
        })
    }
}

const getCustomers = async (req, res, next) => {
    try {
        let response = await apiService.getCustomersService();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get customers controller',
            EC: -1,
            DT: ''
        })
    }
}

const getAllCodes = async (req, res, next) => {
    try {
        let response = await apiService.getAllCodesService();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get all codes controller',
            EC: -1,
            DT: ''
        })
    }
}

const getComments = async (req, res, next) => {
    try {
        let response = await apiService.getCommentsService();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get comments by quote id controller',
            EC: -1,
            DT: ''
        })
    }
}

const postComment = async (req, res, next) => {
    try {
        let dataComment = req.body;
        let response = await apiService.postCommentService(dataComment);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in create a comment controller',
            EC: -1,
            DT: ''
        })
    }
}

const updateComment = async (req, res, next) => {
    try {
        let dataContent = req.body.content;
        let commentId = req.body.commentId;
        let response = await apiService.updateCommentService(dataContent, commentId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in update a comment controller',
            EC: -1,
            DT: ''
        })
    }
}

const deleteComment = async (req, res, next) => {
    try {
        let commentId = req.params.commentId;
        let response = await apiService.deleteCommentService(commentId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in delete a comment controller',
            EC: -1,
            DT: ''
        })
    }
}

const getLatestQuote = async (req, res, next) => {
    try {
        let response = await apiService.getLatestQuoteService();
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get latest quote controller',
            EC: -1,
            DT: ''
        })
    }
}

const sendingQuote = async (req, res, next) => {
    try {
        const { dataQuote, fullDataCustomer, bodySendQuote } = req.body;
        const quoteFile = req.file;
        let response = await apiService.sendingQuoteService(dataQuote, fullDataCustomer, bodySendQuote, quoteFile);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in sending quote controller',
            EC: -1,
            DT: ''
        })
    }
}

const sendingInvoice = async (req, res, next) => {
    try {
        const { dataQuote, fullDataCustomer, bodySendQuote } = req.body;
        const quoteFile = req.file;
        let response = await apiService.sendingInvoiceService(dataQuote, fullDataCustomer, bodySendQuote, quoteFile);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in sending invoice controller',
            EC: -1,
            DT: ''
        })
    }
}

const postQuote = async (req, res, next) => {
    try {
        const dataQuote = req.body;
        let response = await apiService.postQuoteService(dataQuote);
        return res.status(201).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in create a quote controller',
            EC: -1,
            DT: ''
        })
    }
}

const updateStatusQuote = async (req, res, next) => {
    try {
        let quoteId = req.params?.quoteId
        let response = await apiService.updateStatusQuoteService(quoteId);
        return res.status(201).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in update status a quote controller',
            EC: -1,
            DT: ''
        })
    }
}

const getDataPreviewQuote = async (req, res, next) => {
    try {
        const quoteId = req.params.quoteId
        let response = await apiService.getDataPreviewQuoteService(quoteId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get data preview quote controller',
            EC: -1,
            DT: ''
        })
    }
}

const postCancelQuote = async (req, res, next) => {
    try {
        const { dataQuote, fullDataCustomer, bodySendQuote } = req.body;
        let response = await apiService.postCancelQuoteService(dataQuote, fullDataCustomer, bodySendQuote);
        return res.status(201).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in delete a quote controller',
            EC: -1,
            DT: ''
        })
    }
}

const postInvoice = async (req, res, next) => {
    try {
        const dataInvoice = req.body;
        let response = await apiService.postInvoiceService(dataInvoice);
        return res.status(201).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in create an draft invoice controller',
            EC: -1,
            DT: ''
        })
    }
}

const getDataPreviewInvoice = async (req, res, next) => {
    try {
        const invoiceId = req.params.invoiceId
        let response = await apiService.getDataPreviewInvoiceService(invoiceId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get data preview invoice controller',
            EC: -1,
            DT: ''
        })
    }
}

const confirmInvoice = async (req, res, next) => {
    try {
        const dataInvoice = req.body;
        let response = await apiService.confirmInvoiceService(dataInvoice);
        return res.status(201).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in confirm invoice controller',
            EC: -1,
            DT: ''
        })
    }
}

const paidInvoice = async (req, res, next) => {
    try {
        const dataPaymentInvoice = req.body;
        let response = await apiService.paidInvoiceService(dataPaymentInvoice);
        return res.status(201).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in create paid invoice controller',
            EC: -1,
            DT: ''
        })
    }
}

const getInvoices = async (req, res, next) => {
    try {
        let response = await apiService.getInvoicesService();
        return res.status(201).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get all paid invoice controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    createCompanyData, createBranchCompanyData, getBranches, getBranch, getDetailCompany,
    handleDeleteCompany, updateConfirmQuote, getCustomers, getAllCodes, getComments, postComment,
    updateComment, deleteComment, getLatestQuote, sendingQuote, postQuote, updateStatusQuote, getDataPreviewQuote,
    postCancelQuote, postInvoice, getDataPreviewInvoice, confirmInvoice, sendingInvoice, paidInvoice, getInvoices
}