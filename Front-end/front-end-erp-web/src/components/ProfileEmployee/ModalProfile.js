import React from 'react'
import './ModalProfile.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { closeModalProfile } from '../../redux-toolkit/slices/userSlice'
import { getAllType } from '../../services/userServices'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { LANGUAGES } from '../../utils/constant'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { updateProfileService, getInfoEmployeeById } from '../../services/userServices'

function ModalProfile(props) {

    const language = useSelector(state => state.language.value)
    const email = useSelector(state => state.user.email)
    const idEmployee = useSelector(state => state.user.id)
    const dispatch = useDispatch()
    const show = useSelector(state => state.user.isShowModalInfo)
    const [position, setPosition] = useState([])
    const [selectPositions, setSelectPositions] = useState(null)
    const [elementPositionSelect, setElementPositionSelect] = useState(null)
    const [currentInfo, setCurrentInfo] = useState(null)
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

    const defaultProfileEmployee = {
        position: '',
        phone: '',
        email: email,
        gender: '',
        avatar: '',
        year: '',
        address: '',
    }
    const [dataProfileEmployee, setDataProfileEmployee] = useState(defaultProfileEmployee)

    const handleClose = () => dispatch(closeModalProfile());

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
        if (idEmployee) {
            fetchDataPosition()
        }
    }, [idEmployee])

    useEffect(() => {
        const fetchDataEmployee = async () => {
            let res = await getInfoEmployeeById(idEmployee)
            if (res.EC === 0) {
                let positionBuild = {}
                if (position && position.length > 0) {
                    position.forEach((item) => {
                        if (item.keyType === res?.DT?.role) {
                            positionBuild.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                            positionBuild.value = item.keyType
                        }
                    })
                }
                const dataFillInModal = {
                    position: res?.DT?.role,
                    phone: res?.DT?.phone,
                    email: res?.DT?.email,
                    gender: res?.DT?.gender,
                    avatar: res?.DT?.avatar,
                    year: res?.DT?.birth,
                    address: res?.DT?.address,
                }
                Promise.all([setDataProfileEmployee(dataFillInModal), setCurrentInfo(res.DT), setElementPositionSelect(positionBuild)])
                if (res?.DT?.avatar) {
                    setImgPreview(prevState => ({
                        ...prevState,
                        urlReview: res?.DT?.avatar.replace(/"/g, '')
                    }));
                }
            } else {
                toast.error('Error when get current info employee')
            }
        }
        if (idEmployee) {
            fetchDataEmployee()
        }
    }, [idEmployee, language, position])

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
            setDataProfileEmployee((prevState) => ({
                ...prevState,
                [type]: value.value
            }));
            setElementPositionSelect(value)
        } else {
            setDataProfileEmployee((prevState) => ({
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
            setDataProfileEmployee((prevState) => ({
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
        let status = await updateProfileService(dataProfileEmployee)
        if (status.EC === 0) {
            setTimeout(() => {
                setIsUpdatingProfile(false)
                toast.success(<FormattedMessage id='modal-profile.toast-update-success' />)
                handleClose()
            }, 2000)
        } else {
            toast.error(<FormattedMessage id='modal-profile.toast-update-fail' />)
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
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                style={{ zIndex: '900' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title><FormattedMessage id='modal-profile.title' /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='name-avatar'>
                        <div className='inf-left'>
                            <h1 className='name-profile'>{language === LANGUAGES.VI ? currentInfo?.lastName + ' ' + currentInfo?.firstName
                                :
                                currentInfo?.firstName + ' ' + currentInfo?.lastName
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
                            <input value={dataProfileEmployee.email} onChange={(e) => handleChangeInput('email', e.target.value)} className='input-profile email-profile ms-2 flex-fill' id='email' type='text' />
                        </div>

                        <div className='col-6 d-flex mt-3'>
                            <label className='label-input fw-bold' htmlFor='phone'><FormattedMessage id='modal-profile.phone' /></label>
                            <input value={dataProfileEmployee.phone} onChange={(e) => handleChangeInput('phone', e.target.value)} className='input-profile ms-2 flex-fill' id='phone' type='text' />
                        </div>

                        <div className='col-6 d-flex mt-3'>
                            <label className='label-input fw-bold' htmlFor='address'><FormattedMessage id='modal-profile.address' /></label>
                            <input value={dataProfileEmployee.address} onChange={(e) => handleChangeInput('address', e.target.value)} className='input-profile ms-2 flex-fill' id='address' type='text' />
                        </div>

                        <div className='col-6 d-flex mt-3 d-flex align-items-center'>
                            <label className='label-input fw-bold' htmlFor='gender'><FormattedMessage id='modal-profile.gender' /></label>
                            <select onChange={(e) => handleChangeInput('gender', e.target.value)} value={dataProfileEmployee.gender}
                                id='select-gender' className="form-select select-gender-profile flex-fill ">
                                <option disabled value=''>  </option>
                                <option value="S1">Nam</option>
                                <option value="S2">Nữ</option>
                                <option value="S3">Khác</option>
                            </select>
                        </div>

                        <div className='col-6 d-flex mt-3 d-flex align-items-center'>
                            <label className='label-input fw-bold' htmlFor='yearOfBirth'><FormattedMessage id='modal-profile.birth' /></label>
                            <input value={dataProfileEmployee.year} onChange={(e) => handleChangeInput('year', e.target.value)} className='input-profile ms-2 flex-fill' id='yearOfBirth' type='text' />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
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

export default ModalProfile