import React from 'react'
import './NewCustomer.scss'
import { useState, useEffect } from 'react'
import { postDataCustomer, getCustomer, updateCustomer } from '../../services/saleServices'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function NewCustomer() {

    const intl = useIntl();
    const history = useHistory()
    const { id } = useParams()

    const defaultCustomer = {
        fullName: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        address: '',
    }

    const [dataCustomer, setDataCustomer] = useState(defaultCustomer)

    useEffect(() => {
        const fetchDataCustomerById = async (idCustomer) => {
            let res = await getCustomer(idCustomer)
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
        const fieldCheck = ['fullName', 'email'];
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
            let res = await postDataCustomer(dataCustomer)
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
            let res = await updateCustomer(customerId, dataCustomer)
            if (res.EC === 0) {
                cleanValueSubmit()
                toast.success("Cập nhật thông tin khách hàng thành công!")
                history.push('/sale-order/customers')
            } else {
                toast.error("Cập nhật thông tin khách hàng thất bại!")
            }
        } else {
            toast.warning(`Thiếu các trường sau: ${check.toString()}`)
        }
    }

    const handleCancelCreateCustomer = () => {
        history.push('/sale-order/customers')
    }

    return (
        <div className='wrapper-create-employee'>
            <div className='header-create'>
                {id ?
                    <span className='title-create'><FormattedMessage id='sale-order_update_customer' /></span>
                    :
                    <span className='title-create'><FormattedMessage id='sale-order_new_customer' /></span>
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
                        <input onChange={(e) => handleChangeInput('fullName', e.target.value)} value={dataCustomer.fullName}
                            className="name-employee mb-1" type='text' placeholder={intl.formatMessage({ id: "sale-order_new_customer_fullName" })} />
                    </div>

                </div>
                <div className='information-detail row'>

                    <div className='col-6 mt-2 mb-1'>
                        <label className='label-input' htmlFor='email'><FormattedMessage id='nav.manage-account-employee.email' /></label>
                        <input onChange={(e) => handleChangeInput('email', e.target.value)} value={dataCustomer.email} className='input-inf' id='email' type='email' />
                    </div>

                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='password'><FormattedMessage id='sale-order_new_customer_password' /></label>
                        <input onChange={(e) => handleChangeInput('password', e.target.value)} value={dataCustomer.password} className='input-inf' id='password' type='text' />
                    </div>

                    <div className='col-6 mt-2 d-flex wrap-department'>
                        <label className='label-input' htmlFor='phone'><FormattedMessage id='nav.manage-account-employee.phone' /></label>
                        <input onChange={(e) => handleChangeInput('phone', e.target.value)} value={dataCustomer.phone} className='input-inf' id='phone' type='text' />
                    </div>



                    <div className='col-6 mt-2 select-gender-wrap d-flex mb-1'>
                        <label className='label-input' htmlFor='select-gender'><FormattedMessage id='nav.manage-account-employee.gender' /></label>
                        <select onChange={(e) => handleChangeInput('gender', e.target.value)} value={dataCustomer.gender}
                            id='select-gender' className="form-select form-select-sm select-gender">
                            <option disabled value=''>  </option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='address'><FormattedMessage id='nav.manage-account-employee.address' /></label>
                        <input onChange={(e) => handleChangeInput('address', e.target.value)} value={dataCustomer.address} className='input-inf' id='address' type='text' />
                    </div>

                </div>
            </div>
        </div >
    )
}

export default NewCustomer