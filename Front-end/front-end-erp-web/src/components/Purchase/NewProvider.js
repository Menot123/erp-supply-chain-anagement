import React from 'react'
import './NewProvider.scss'
import { useState, useEffect } from 'react'
// import { postDataCustomer, getCustomer, updateCustomer } from '../../services/saleServices'
import { postDataProvider, getProvider, updateProvider } from '../../services/purchaseServices'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function NewProvider() {

    const intl = useIntl();
    const history = useHistory()
    const { id } = useParams()

    const defaultCustomer = {
        nameVi: '',
        email: '',
        website: '',
        contact: '',
        addressVi: '',
    }

    const [dataCustomer, setDataCustomer] = useState(defaultCustomer)

    useEffect(() => {
        const fetchDataCustomerById = async (idCustomer) => {
            let res = await getProvider(idCustomer)
            if (res && res?.EC === 0) {
                setDataCustomer(res?.DT)
            }
        }

        if (id) {
            fetchDataCustomerById(id)
        }
    }, [id])

    const handleChangeInput = (type, value) => {
        setDataCustomer((prevState) => ({
            ...prevState,
            [type]: value
        }));
    };



    const validateDataCustomer = () => {
        const fieldCheck = ['nameVi', 'email'];
        const missingFields = [];

        fieldCheck.forEach(field => {
            if (!dataCustomer[field]) {
                missingFields.push(field);
            }
        });

        return missingFields;
    };

    const cleanValueSubmit = () => {
        setDataCustomer(defaultCustomer)
    }

    const handleCreateCustomer = async () => {
        // Validate data
        let check = validateDataCustomer()

        if (check.length === 0) {
            let res = await postDataProvider(dataCustomer)
            if (res.EC === 0) {
                cleanValueSubmit()
                toast.success(res.EM)
            } else {
                toast.error(res.EM)
            }
        } else {
            toast.warning(`Thiếu các trường sau: ${check.toString()}`)
        }
    }

    const handleUpdateCustomer = async (customerId, dataUpdate) => {
        // Validate data
        let check = validateDataCustomer()

        if (check.length === 0) {
            let res = await updateProvider(customerId, dataCustomer)
            if (res.EC === 0) {
                cleanValueSubmit()
                toast.success(res.EM)
                history.push('/manage-purchase/providers')
            } else {
                toast.error(res.EM)
            }
        } else {
            toast.warning(`Thiếu các trường sau: ${check.toString()}`)
        }
    }

    const handleCancelCreateCustomer = () => {
        history.push('/manage-purchase/providers')
    }

    return (
        <div className='wrapper-create-employee'>
            <div className='header-create'>
                {id ?
                    <span className='title-create'>Cập nhật thông tin nhà cung cấp</span>
                    :
                    <span className='title-create'>Thêm một nhà cung cấp</span>
                }
                <div className='btn-actions'>
                    {
                        id
                            ?
                            <button onClick={() => handleUpdateCustomer(id, dataCustomer)} className='btn btn-primary btn-main'><FormattedMessage id='btn-save' /></button>
                            :
                            <button onClick={() => handleCreateCustomer()} className='btn btn-primary btn-main'><FormattedMessage id='btn-save' /></button>
                    }
                    <button onClick={() => handleCancelCreateCustomer()} className='ms-1 btn btn-outline-secondary'><FormattedMessage id='btn-cancel' /></button>
                </div>
            </div>
            <div className='container create-employee-container'>
                <div className='name-position-avatar'>
                    <div className='name-position'>
                        <input onChange={(e) => handleChangeInput('nameVi', e.target.value)} value={dataCustomer.nameVi}
                            className="name-employee mb-1" type='text' placeholder='Tên nhà cung cấp' />
                    </div>

                </div>
                <div className='information-detail row'>

                    <div className='col-6 mt-2 mb-1'>
                        <label className='label-input' htmlFor='email'><FormattedMessage id='nav.manage-account-employee.email' /></label>
                        <input onChange={(e) => handleChangeInput('email', e.target.value)} value={dataCustomer.email} className='input-inf' id='email' type='email' />
                    </div>

                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='website'>Trang web</label>
                        <input onChange={(e) => handleChangeInput('website', e.target.value)} value={dataCustomer.website} className='input-inf' id='website' type='text' />
                    </div>

                    <div className='col-6 mt-2 d-flex wrap-department'>
                        <label className='label-input' htmlFor='contact'><FormattedMessage id='nav.manage-account-employee.phone' /></label>
                        <input onChange={(e) => handleChangeInput('contact', e.target.value)} value={dataCustomer.contact} className='input-inf' id='contact' type='text' />
                    </div>


                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='addressVi'><FormattedMessage id='nav.manage-account-employee.address' /></label>
                        <input onChange={(e) => handleChangeInput('addressVi', e.target.value)} value={dataCustomer.addressVi} className='input-inf' id='addressVi' type='text' />
                    </div>

                </div>
            </div>
        </div >
    )
}

export default NewProvider