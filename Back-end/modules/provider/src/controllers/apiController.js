import providerService from '../service/apiServices';
let handleGetProviders = async (req, res) => {
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

const handleGetProvidersPagination = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;

        let response = await providerService.handleGetProvidersPaginationService(page, pageSize);

        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT,
            total: response?.total
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server in get list provider pagination',
            EC: -1,
            DT: ''
        })
    }
}


// Get provider with id
const handleGetProvider = async (req, res, next) => {
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
const handleCreateProvider = async (req, res, next) => {
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
const handleUpdateProvider = async (req, res, next) => {
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
const handleDeleteProvider = async (req, res, next) => {
    try {
        const providerIds = req.body
        let response = await providerService.handleDeleteProviderService(providerIds);
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
    handleGetProvidersPagination,
    handleGetProvider,
    handleCreateProvider,
    handleUpdateProvider,
    handleDeleteProvider
}