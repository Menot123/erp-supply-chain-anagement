import providerService from '../services/providerService';
let handleGetProviders = async(req, res) => {
    try {

        let data = await providerService.handleGetProvidersService()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getProviders controller',
            EC: -1,
            DT: ''
        })
    }
}

// Get provider with id
const handleGetProvider = async(req, res, next) => {
    try {
        let providerId = req.params.id
        let data = await providerService.handleGetProviderWithIdService(providerId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in getProvider controller',
            EC: -1,
            DT: ''
        })
    }
}

// Create a new provider
const handleCreateProvider = async(req, res, next) => {
    try {
        let dataprovider = req.body;
        let response = await providerService.handleCreateProviderService(dataprovider);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in createProvider controller',
            EC: -1,
            DT: ''
        })
    }
}


// Update a provider with id
const handleUpdateProvider = async(req, res, next) => {
    try {
        let providerId = req.params.id;
        let dataprovider = req.body;
        let response = await providerService.handleUpdateProviderService(providerId, dataprovider);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in updateProvider controller',
            EC: -1,
            DT: ''
        })
    }
}

// Delete a provider with id
const handleDeleteProvider = async(req, res, next) => {
    try {
        let providerId = req.params.id;
        let response = await providerService.handleDeleteProviderService(providerId);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in deleteProvider controller',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = {
    handleGetProviders,
    handleGetProvider,
    handleCreateProvider,
    handleUpdateProvider,
    handleDeleteProvider
}