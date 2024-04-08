import apiService from '../services/apiService';

let getAllCodeByType = async (req, res) => {
    try {
        let data = await apiService.getAllCodeService(req.query?.type)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getAllCodeByType controller',
            EC: -1,
            DT: ''
        })
    }

}

let createNewProductGroup = async (req, res) => {
    try {
        let data = await apiService.createNewProductGroupService(req.body.valueVi, req.body.valueEn)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getAllCodeByType controller',
            EC: -1,
            DT: ''
        })
    }

}

let deleteProductGroup = async (req, res) => {
    try {
        let data = await apiService.deleteProductGroupService(req.params.keyType)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getAllCodeByType controller',
            EC: -1,
            DT: ''
        })
    }

}



module.exports = {
    getAllCodeByType,
    createNewProductGroup,
    deleteProductGroup
};