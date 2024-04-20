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

module.exports = {
    createCompanyData, createBranchCompanyData, getBranches, getBranch, getDetailCompany,
    handleDeleteCompany
}