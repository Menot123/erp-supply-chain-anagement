import apiService from '../services/apiService';

let getAllTypeByType = async (req, res) => {
    try {
        let data = await apiService.getAllTypeService(req.query?.type)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getAllTypeByType controller',
            EC: -1,
            DT: ''
        })
    }

}

module.exports = {
    getAllTypeByType
};