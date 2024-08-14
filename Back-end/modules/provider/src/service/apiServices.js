import db from '../models/index'
const { Op } = require("sequelize");

const handleGetProvidersService = async() => {
    try {
        let res = {}
        let providers = await db.Provider.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            }
        });

        if (providers) {
            res.EC = 0
            res.EM = 'Get providers successfully'
            res.DT = providers
        } else {
            res.EM = 'Get providers failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (error) {
        console.log('>>> error from get providers: ', error)
        return {
            EM: 'Something wrong with handleGetProvidersService service',
            EC: 1,
            DT: {}
        }
    }
}

const handleGetProvidersPaginationService = async(page, pageSize) => {
    try {
        let res = {};
        let providers = await db.Provider.findAndCountAll({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });

        if (providers) {
            res.EC = 0;
            res.EM = 'Get all providers sent successfully';
            res.DT = providers.rows;
            res.total = providers.count;
        } else {
            res.EM = 'Get all providers sent failed';
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

const handleGetProviderWithIdService = async(id) => {
    try {
        let res = {}
        let provider = await db.Provider.findOne({
            where: {
                status: {
                    [Op.not]: 'deleted'
                },
                providerId: id
            }
        });
        if (provider) {
            res.EC = 0
            res.EM = 'Get provider successfully'
            res.DT = provider
        } else {
            res.EM = 'Get provider failed'
            res.EC = 1
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error from get provider with id service: ', e)
    }
}

const handleCreateProviderService = async(data) => {
    try {
        let res = {}
        let provider = await db.Provider.findOne({
            where: {
                contact: data.contact
            }
        });
        if (provider) {
            // console.log(provider)
            res.EC = -1
            res.EM = 'Provider is existing'
            res.DT = ''
        } else {
            await db.Provider.create({
                ...data
            })
            res.EM = 'Create provider successfully'
            res.EC = 0
            res.DT = ''

        }
        return res
    } catch (e) {
        console.log('>>> error when create new provider: ', e)
    }
}

const handleUpdateProviderService = async(providerId, data) => {
    try {
        let res = {}
        console.log(data)
        let provider = await db.Provider.findOne({
            where: {
                providerId: providerId,
                status: {
                    [Op.not]: 'deleted'
                }
            }
        });
        if (provider) {
            await provider.update({
                ...data
            })
            res.EM = 'Update provider successfully'
            res.EC = 0
            res.DT = ''
        } else {
            res.EC = -1
            res.EM = 'Provider not found'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error when update provider: ', e)
    }
}

const handleDeleteProviderService = async(listProviderId) => {
    try {
        let res = {}
        if (!listProviderId || listProviderId.length === 0) {
            res.EM = 'error from server empty list provider delete'
            res.EC = -1
            res.DT = ''
        } else {
            await db.Provider.update({ status: 'deleted' }, {
                where: {
                    providerId: listProviderId
                }
            });
            res.EC = 0
            res.EM = 'delete providers successfully'
            res.DT = ''
        }
        return res
    } catch (e) {
        console.log('>>> error: ', e)
    }
}

module.exports = {
    handleGetProvidersService,
    handleGetProviderWithIdService,
    handleGetProvidersPaginationService,
    handleCreateProviderService,
    handleUpdateProviderService,
    handleDeleteProviderService
}