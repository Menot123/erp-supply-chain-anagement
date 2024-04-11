import React from 'react'
import './CreateNewDepartment.scss'
import { FormattedMessage, useIntl } from 'react-intl'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { LANGUAGES } from '../../../utils/constant'
import { useSelector } from 'react-redux';
import { getListEmployee, postDataNewDepartment } from '../../../services/userServices'
import { toast } from 'react-toastify';

function CreateNewDepartment() {

    const intl = useIntl();

    const [employees, setEmployees] = useState([])
    const [selectEmployees, setSelectEmployees] = useState(null)
    const language = useSelector(state => state.language.value)

    const defaultDataDepartment = {
        nameVi: '',
        nameEn: '',
        departmentCode: '',
        managerId: ''
    }

    const [dataCreateDepartment, setDataCreateDepartment] = useState(defaultDataDepartment)
    const [elementManagerSelect, setElementManagerSelect] = useState(null)

    useEffect(() => {
        const fetchEmployees = async () => {
            let resEmployee = await getListEmployee()
            if (resEmployee.EC === 0) {
                setEmployees(resEmployee.DT)
            } else {
                toast.error('Error when get list employee')
            }
        }

        fetchEmployees()

    }, [])

    useEffect(() => {
        const buildDataSelect = () => {
            let arrEmployees = []
            employees.map((item, index) => {
                let employeeObj = {}
                employeeObj.value = item?.id
                employeeObj.label = language === LANGUAGES.VI ? (item?.lastName + ' ' + item?.firstName) : (item?.firstName + ' ' + item?.lastName)
                return arrEmployees.push(employeeObj)
            })
            setSelectEmployees(arrEmployees)
        }
        if (employees && employees.length > 0) {
            buildDataSelect()
        }
    }, [employees, language])

    const cleanValueSubmit = () => {
        setDataCreateDepartment(defaultDataDepartment)
        setElementManagerSelect(null)
    }

    const handleCreateNewDepartment = async () => {
        let isValid = validateDataDepartment()
        if (isValid?.length === 0) {
            let res = await postDataNewDepartment(dataCreateDepartment)
            if (res.EC === 0) {
                cleanValueSubmit()
                toast.success(<FormattedMessage id='create-department-toast-create-success' />)
            } else if (res.EC === -1) {
                toast.error(<FormattedMessage id='create-department-toast-missing-fields' />)
            } else if (res.EC === -2) {
                toast.error(<FormattedMessage id='create-department-toast-already-existing' />)
            } else {
                toast.error(<FormattedMessage id='create-department-toast-error-server' />)
            }
        } else {
            toast.warning(<FormattedMessage id='create-department-toast-missing-fields' />)
        }
    }

    const handleChangeInput = (type, e) => {
        if (type === 'managerId') {
            setElementManagerSelect(e)
            setDataCreateDepartment((prevState) => ({
                ...prevState,
                [type]: e?.value
            }));
        } else {
            setDataCreateDepartment((prevState) => ({
                ...prevState,
                [type]: e.target.value
            }));
        }
    }

    const validateDataDepartment = () => {
        const fieldCheck = ['nameVi', 'nameEn', 'departmentCode', 'managerId'];
        const missingFields = [];

        fieldCheck.forEach(field => {
            if (!dataCreateDepartment[field]) {
                missingFields.push(field);
            }
        });

        return missingFields;
    }


    return (
        <div className='wrapper-create-department'>
            <div className='header-create-department'>
                <div className='btn-actions'>
                    <button onClick={() => handleCreateNewDepartment()} className='ms-1 btn btn-outline-secondary btn-create-department'><FormattedMessage id='create-department-btn-create' /></button>
                </div>
                <div className='wrapper-text-header'>
                    <span className='title-department'><FormattedMessage id='create-department-title' /></span>
                    <span className='title-create'><FormattedMessage id='create-department-sub-title' /></span>
                </div>
            </div>

            <div className='wrap-body-create-department'>
                <div className='body-content-create-department'>
                    <div className='wrap-name-department d-flex'>
                        <label className='label-name-department-vi' htmlFor='input-name-department-vi'><FormattedMessage id='create-department-input-name.vi' /></label>
                        <input
                            value={dataCreateDepartment?.nameVi}
                            className='input-name-department-vi'
                            onChange={(e) => handleChangeInput('nameVi', e)}
                            id='input-name-department-vi' />
                    </div>

                    <div className='wrap-name-department  d-flex'>
                        <label className='label-name-department-en' htmlFor='input-name-department-en'><FormattedMessage id='create-department-input-name.en' /></label>
                        <input
                            value={dataCreateDepartment?.nameEn}
                            onChange={(e) => handleChangeInput('nameEn', e)}
                            className='input-name-department-en'
                            id='input-name-department-en' />
                    </div>

                    <div className='wrap-code-department  d-flex'>
                        <label className='label-code-department' htmlFor='input-code-department'><FormattedMessage id='create-department-input-department-code' /></label>
                        <input
                            value={dataCreateDepartment?.departmentCode}
                            onChange={(e) => handleChangeInput('departmentCode', e)}
                            className='input-code-department'
                            id='input-code-department' />
                    </div>

                    <div className='wrap-name-department d-flex align-items-center'>
                        <label className='label-name-department-en' htmlFor='input-name-department-en'><FormattedMessage id='create-department-select-manager' /></label>
                        <Select className='manager-select' onChange={(e) => handleChangeInput('managerId', e)}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    border: 'none',
                                }),
                            }}
                            placeholder={<div><FormattedMessage id='create-department-placeholder-employees' /></div>}
                            options={selectEmployees && selectEmployees.length > 0 ? selectEmployees : []}
                            value={elementManagerSelect ? elementManagerSelect : ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewDepartment