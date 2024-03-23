import React from 'react'
import './CreateNewEmployee.scss'
import { RiImageAddLine } from "react-icons/ri";
import { useState, useEffect } from 'react'
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { createNewEmployeeService, getAllType } from '../../services/userServices'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../utils/constant'
import { FormattedMessage, useIntl } from 'react-intl'


function CreateNewEmployee() {

    const intl = useIntl();
    const history = useHistory()
    const language = useSelector(state => state.language.value)

    const defaultEmployee = {
        nameEmployee: '',
        position: '',
        phone: '',
        email: '',
        department: '',
        gender: '',
        avatar: '',
        year: '',
        address: '',
    }

    const defaultImgPreview = {
        urlReview: '',
        isOpen: false
    }

    const [dataEmployee, setDataEmployee] = useState(defaultEmployee)
    const [imgPreview, setImgPreview] = useState(defaultImgPreview)
    const [position, setPosition] = useState([])
    const [selectPositions, setSelectPositions] = useState(null)
    const [department, setDepartment] = useState([])
    const [selectDepartments, setSelectDepartments] = useState(null)
    const [elementPositionSelect, setElementPositionSelect] = useState(null)
    const [elementDepartmentSelect, setElementDepartmentSelect] = useState(null)

    useEffect(() => {
        const fetchDataPosition = async () => {
            let resPosition = await getAllType('Position')
            let resDepartment = await getAllType('Department')
            if (resPosition.EC === 0 && resDepartment.EC === 0) {
                Promise.all([setPosition(resPosition.DT), setDepartment(resDepartment.DT)])
            } else {
                toast.error('Error when get list position or department')
            }
        }

        fetchDataPosition()

    }, [])

    useEffect(() => {
        const buildDataSelect = () => {
            let arrPosition = []
            position.map((item, index) => {
                let positionObj = {}
                positionObj.value = item.keyType
                positionObj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                return arrPosition.push(positionObj)
            })
            setSelectPositions(arrPosition)
            let arrDepartment = []
            department.map((item, index) => {
                let departmentObj = {}
                departmentObj.value = item.keyType
                departmentObj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                return arrDepartment.push(departmentObj)
            })
            setSelectDepartments(arrDepartment)
        }
        if (position && department && position.length > 0 && department.length > 0) {
            buildDataSelect()
        }
    }, [position, department, language])



    const handleChangeInput = (type, value) => {
        if (type === 'position' || type === 'department') {
            setDataEmployee((prevState) => ({
                ...prevState,
                [type]: value.value
            }));
            if (type === 'position') {
                setElementPositionSelect(value)
            } else {
                setElementDepartmentSelect(value)
            }
        } else {
            setDataEmployee((prevState) => ({
                ...prevState,
                [type]: value
            }));
        }
    };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const handleChangeImage = async (e) => {
        let dataFile = e.target.files
        let img = dataFile[0]
        if (img) {
            let imgBase64 = await getBase64(img)
            let objUrl = URL.createObjectURL(img)
            setImgPreview(prevState => ({
                ...prevState,
                urlReview: objUrl
            }));
            setDataEmployee((prevState) => ({
                ...prevState,
                avatar: imgBase64
            }));
        }
    }

    const openPreviewImage = () => {
        if (!imgPreview.urlReview) {
            return;
        }
        setImgPreview(prevState => ({
            ...prevState,
            isOpen: true
        }));
    }

    const validateDataEmployee = () => {
        const fieldCheck = ['nameEmployee', 'position', 'phone', 'email', 'department', 'gender', 'avatar', 'year', 'address'];
        const missingFields = [];

        fieldCheck.forEach(field => {
            if (!dataEmployee[field]) {
                missingFields.push(field);
            }
        });

        return missingFields;
    };

    const cleanValueSubmit = () => {
        setDataEmployee(defaultEmployee)
        setImgPreview(defaultImgPreview)
        setElementPositionSelect(null)
        setElementDepartmentSelect(null)
    }

    const handleCreateEmployee = async () => {
        // Validate data
        let check = validateDataEmployee()

        if (check.length === 0) {
            let res = await createNewEmployeeService(dataEmployee)
            if (res.EC === 0) {
                cleanValueSubmit()
                toast.success(res.EM)
            } else {
                toast.error(res.EM)
            }
        } else {
            toast.warning(`Missing fields: ${check.toString()}`)
        }
    }

    const handleCancelCreateEmployee = () => {
        history.push('/manage-accounts')
    }

    return (
        <div className='wrapper-create-employee'>
            <div className='header-create'>
                <span className='title-create'><FormattedMessage id='nav.manage-account-title' /></span>
                <div className='btn-actions'>
                    <button onClick={() => handleCreateEmployee()} className='btn btn-primary btn-main'><FormattedMessage id='btn-save' /></button>
                    <button onClick={() => handleCancelCreateEmployee()} className='ms-1 btn btn-outline-secondary'><FormattedMessage id='btn-cancel' /></button>
                </div>
            </div>
            <div className='container create-employee-container'>
                <div className='name-position-avatar'>
                    <div className='name-position'>
                        <input onChange={(e) => handleChangeInput('nameEmployee', e.target.value)} value={dataEmployee.nameEmployee} className="name-employee mb-1" type='text' placeholder={intl.formatMessage({ id: "nav.manage-account-employee.name" })} />
                        <Select onChange={(e) => handleChangeInput('position', e)}
                            placeholder={<div><FormattedMessage id='nav.manage-account-employee.position' /></div>}
                            options={selectPositions && selectPositions.length > 0 ? selectPositions : []}
                            value={elementPositionSelect ? elementPositionSelect : ''}
                        />
                    </div>
                    <div className='avatar'>
                        <div className='upload-avatar'>
                            <input hidden id="img-upload" type='file'
                                onChange={(e) => handleChangeImage(e)}
                            />
                            <label className='label-upload' htmlFor="img-upload"><RiImageAddLine className='icon-upload hover-item ms-1 mb-1' /></label>
                        </div>

                        <div className='preview-image'
                            style={{ backgroundImage: `url(${imgPreview.urlReview})` }}
                            onClick={() => openPreviewImage()}
                        ></div>
                    </div>
                </div>
                <div className='information-detail row'>
                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='phone'><FormattedMessage id='nav.manage-account-employee.phone' /></label>
                        <input onChange={(e) => handleChangeInput('phone', e.target.value)} value={dataEmployee.phone} className='input-inf' id='phone' type='text' />
                    </div>

                    <div className='col-6 mt-2 d-flex wrap-department'>
                        <label className='label-input d-flex align-items-center' > <FormattedMessage id='nav.manage-account-employee.department' /></label>
                        <Select className='position-select' onChange={(e) => handleChangeInput('department', e)}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    border: 'none',
                                }),
                            }}
                            placeholder={<div> </div>}
                            options={selectDepartments && selectDepartments.length > 0 ? selectDepartments : []}
                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            value={elementDepartmentSelect ? elementDepartmentSelect : ''}
                        />
                    </div>

                    <div className='col-6 mt-2 mb-1'>
                        <label className='label-input' htmlFor='email'><FormattedMessage id='nav.manage-account-employee.email' /></label>
                        <input onChange={(e) => handleChangeInput('email', e.target.value)} value={dataEmployee.email} className='input-inf' id='email' type='email' />
                    </div>

                    <div className='col-6 mt-2 select-gender-wrap d-flex mb-1'>
                        <label className='label-input' htmlFor='select-gender'><FormattedMessage id='nav.manage-account-employee.gender' /></label>
                        <select onChange={(e) => handleChangeInput('gender', e.target.value)} value={dataEmployee.gender}
                            id='select-gender' className="form-select form-select-sm select-gender">
                            <option disabled value=''>  </option>
                            <option value="S1">Nam</option>
                            <option value="S2">Nữ</option>
                            <option value="S3">Khác</option>
                        </select>
                    </div>

                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='year'><FormattedMessage id='nav.manage-account-employee.year' /></label>
                        <input onChange={(e) => handleChangeInput('year', e.target.value)} value={dataEmployee.year} className='input-inf' id='year' type='text' />
                    </div>

                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='address'><FormattedMessage id='nav.manage-account-employee.address' /></label>
                        <input onChange={(e) => handleChangeInput('address', e.target.value)} value={dataEmployee.address} className='input-inf' id='address' type='text' />
                    </div>

                </div>
            </div>
            {
                imgPreview.isOpen === true &&
                <Lightbox
                    mainSrc={imgPreview.urlReview}
                    onCloseRequest={() =>
                        setImgPreview(prevState => ({
                            ...prevState,
                            isOpen: false
                        }))
                    }
                />
            }
        </div >
    )
}

export default CreateNewEmployee