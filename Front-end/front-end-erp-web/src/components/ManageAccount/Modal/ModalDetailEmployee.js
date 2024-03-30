import React from 'react'
import './ModalDetailEmployee.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage, useIntl } from 'react-intl'
import Select from 'react-select'
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { updateProfileService, getAllType, deleteEmployee } from '../../../services/userServices'
import { IoMdSettings } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

function ModalDetailEmployee(props) {

    const intl = useIntl();
    const language = useSelector(state => state.language.value)
    const email = useSelector(state => state.user.email)
    const [position, setPosition] = useState([])
    const [selectPositions, setSelectPositions] = useState(null)
    const [elementPositionSelect, setElementPositionSelect] = useState(null)
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
    const [showActionsEmployee, setShowActionsEmployee] = useState(false)

    const defaultDetailEmployee = {
        idEmployee: '',
        position: '',
        phone: '',
        email: email,
        gender: '',
        avatar: '',
        year: '',
        address: '',
    }
    const [dataDetailEmployee, setDataDetailEmployee] = useState(defaultDetailEmployee)

    const defaultImgPreview = {
        urlReview: '',
        isOpen: false
    }

    const [imgPreview, setImgPreview] = useState(defaultImgPreview)

    useEffect(() => {
        const fetchDataPosition = async () => {
            let resPosition = await getAllType('Position')
            if (resPosition.EC === 0) {
                setPosition(resPosition.DT)
            } else {
                toast.error('Error when get list position or department')
            }
        }

        fetchDataPosition()
    }, [])


    useEffect(() => {
        if (props?.infoEmployeeDetail && props?.infoEmployeeDetail?.avatar && props?.infoEmployeeDetail?.id) {
            setImgPreview(prevState => ({
                ...prevState,
                urlReview: props?.infoEmployeeDetail?.avatar
            }));
            setDataDetailEmployee({
                idEmployee: props?.infoEmployeeDetail?.id,
                position: props?.infoEmployeeDetail?.role,
                phone: props?.infoEmployeeDetail?.phone,
                email: props?.infoEmployeeDetail?.email,
                gender: props?.infoEmployeeDetail?.gender,
                avatar: props?.infoEmployeeDetail?.avatar,
                year: props?.infoEmployeeDetail?.birth,
                address: props?.infoEmployeeDetail?.address,
            })
            let positionBuild = {}
            if (position && position.length > 0) {
                position.forEach((item) => {
                    if (item.keyType === props?.infoEmployeeDetail?.role) {
                        positionBuild.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                        positionBuild.value = item.keyType
                    }
                })
            }
            setElementPositionSelect(positionBuild)
        }
    }, [props?.infoEmployeeDetail, language, position])

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

        }
        if (position && position.length > 0) {
            buildDataSelect()
        }
    }, [position, language])

    const handleChangeInput = (type, value) => {
        if (type === 'position') {
            setDataDetailEmployee((prevState) => ({
                ...prevState,
                [type]: value.value
            }));
            setElementPositionSelect(value)
        } else {
            setDataDetailEmployee((prevState) => ({
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
            setDataDetailEmployee((prevState) => ({
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

    const handleUpdateProfile = async () => {
        setIsUpdatingProfile(true)
        let status = await updateProfileService(dataDetailEmployee)
        if (status.EC === 0) {
            setTimeout(() => {
                setIsUpdatingProfile(false)
                props?.closeModal()
                props?.reloadData()
                toast.success(<FormattedMessage id='modal-profile.toast-update-success' />)

            }, 2000)
        } else {
            toast.error(<FormattedMessage id='modal-profile.toast-update-fail' />)
        }
    }

    const handleShowActions = () => {
        let currentStatus = showActionsEmployee
        setShowActionsEmployee(!currentStatus)
    }

    const handleCloseDropdownAction = () => {
        if (showActionsEmployee) {
            setShowActionsEmployee(false)
        }
    }

    const handleDeleteEmployee = async () => {
        let nameEmployeeDelete = language === LANGUAGES.VI ? `${props?.infoEmployeeDetail?.lastName} ${props?.infoEmployeeDetail?.firstName}`
            :
            `${props?.infoEmployeeDetail?.firstName} ${props?.infoEmployeeDetail?.lastName}`
        const result = window.confirm(intl.formatMessage({ id: "modal-detail-employee.alert-delete-confirm" }) + nameEmployeeDelete);
        if (result) {
            let resDelete = await deleteEmployee(props?.infoEmployeeDetail?.id)
            if (resDelete && resDelete.EC === 0) {
                props?.closeModal()
                props?.reloadData()
                toast.success(`Delete employee ${props?.infoEmployeeDetail?.firstName} ${props?.infoEmployeeDetail?.lastName} successfully`)
            } else {
                toast.error(`Error when delete employee ${props?.infoEmployeeDetail?.firstName} ${props?.infoEmployeeDetail?.lastName} `)
            }
        }
    }


    return (
        <>
            {isUpdatingProfile
                ?
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
                : ''
            }
            <Modal show={props?.isShowModalDetailEmployee}
                onHide={props?.closeModal}
                backdrop="static"
                keyboard={false}
                size="lg"
                style={{ zIndex: '900' }}
                onClick={() => handleCloseDropdownAction()}
            >
                <Modal.Header closeButton>
                    <Modal.Title><FormattedMessage id='modal-detail-employee.title' />
                        <IoMdSettings className='hover-item' onClick={() => handleShowActions()} />
                        <div className='dropdown-action-employee'>
                            <span onClick={() => handleDeleteEmployee()} className={showActionsEmployee ? 'action-delete-employee' : 'action-delete-employee d-none'}><FaRegTrashCan />Xóa nhân viên</span>
                        </div>
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='name-avatar'>
                        <div className='inf-left'>
                            <h1 className='name-profile'>{language === LANGUAGES.VI ? props?.infoEmployeeDetail?.lastName + ' ' + props?.infoEmployeeDetail?.firstName
                                :
                                props?.infoEmployeeDetail?.firstName + ' ' + props?.infoEmployeeDetail?.lastName
                            }</h1>
                        </div>
                        <div className='inf-right'>
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
                    </div>
                    <div className='main-inf row'>

                        <div className='col-6 mt-1 '>
                            {/* <input onChange={(e) => handleChangeInput('postion', e.target.value)} className='input-profile ms-2 flex-fill' id='postion' type='text' /> */}
                            <Select onChange={(e) => handleChangeInput('position', e)}
                                placeholder={<div><FormattedMessage id='nav.manage-account-employee.position' /></div>}
                                options={selectPositions && selectPositions.length > 0 ? selectPositions : []}
                                value={elementPositionSelect ? elementPositionSelect : ''}
                                className="profile-select-position"
                            />
                        </div>

                        <div className='col-6 d-flex mt-1 align-items-center'>
                            <label className='label-input fw-bold' htmlFor='email'><FormattedMessage id='modal-profile.email' /></label>
                            <input value={dataDetailEmployee?.email} onChange={(e) => handleChangeInput('email', e.target.value)} className='input-profile email-profile ms-2 flex-fill' id='email' type='text' />
                        </div>

                        <div className='col-6 d-flex mt-3'>
                            <label className='label-input fw-bold' htmlFor='phone'><FormattedMessage id='modal-profile.phone' /></label>
                            <input value={dataDetailEmployee?.phone} onChange={(e) => handleChangeInput('phone', e.target.value)} className='input-profile ms-2 flex-fill' id='phone' type='text' />
                        </div>

                        <div className='col-6 d-flex mt-3'>
                            <label className='label-input fw-bold' htmlFor='address'><FormattedMessage id='modal-profile.address' /></label>
                            <input value={dataDetailEmployee?.address} onChange={(e) => handleChangeInput('address', e.target.value)} className='input-profile ms-2 flex-fill' id='address' type='text' />
                        </div>

                        <div className='col-6 d-flex mt-3 d-flex align-items-center'>
                            <label className='label-input fw-bold' htmlFor='gender'><FormattedMessage id='modal-profile.gender' /></label>
                            <select onChange={(e) => handleChangeInput('gender', e.target.value)} value={dataDetailEmployee?.gender}
                                id='select-gender' className="form-select select-gender-profile flex-fill ">
                                <option disabled value=''>  </option>
                                <option value="S1">Nam</option>
                                <option value="S2">Nữ</option>
                                <option value="S3">Khác</option>
                            </select>
                        </div>

                        <div className='col-6 d-flex mt-3 d-flex align-items-center'>
                            <label className='label-input fw-bold' htmlFor='yearOfBirth'><FormattedMessage id='modal-profile.birth' /></label>
                            <input value={dataDetailEmployee?.year} onChange={(e) => handleChangeInput('year', e.target.value)} className='input-profile ms-2 flex-fill' id='yearOfBirth' type='text' />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props?.closeModal}>
                        <FormattedMessage id='modal-profile.btn-cancel' />
                    </Button>
                    <Button onClick={() => handleUpdateProfile()} className='btn-purple' variant="primary" >
                        <FormattedMessage id='modal-profile.btn-save' />
                    </Button>
                </Modal.Footer>
            </Modal>

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
        </>
    );
}

export default ModalDetailEmployee