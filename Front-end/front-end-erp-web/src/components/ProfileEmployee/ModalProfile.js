import React from 'react'
import './ModalProfile.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { closeModalProfile, openModalProfile } from '../../redux-toolkit/slices/userSlice'
import { getAllType } from '../../services/userServices'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { LANGUAGES } from '../../utils/constant'
import { FormattedMessage, useIntl } from 'react-intl'
import Select from 'react-select'
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { updateProfileService } from '../../services/userServices'

function ModalProfile() {

    const language = useSelector(state => state.language.value)
    const firstName = useSelector(state => state.user.firstName)
    const lastName = useSelector(state => state.user.lastName)
    const email = useSelector(state => state.user.email)
    const nameProfile = language === LANGUAGES.VI ? (lastName ? lastName : '') + ' ' + firstName : firstName + ' ' + (lastName ? lastName : '')
    const dispatch = useDispatch()
    const show = useSelector(state => state.user.isShowModalInfo)
    const [position, setPosition] = useState([])
    const [selectPositions, setSelectPositions] = useState(null)
    const [elementPositionSelect, setElementPositionSelect] = useState(null)

    const customStyles = {
        content: {
            'z-index': 800,
        },
    }

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
    // const handleShow = () => dispatch(openModalProfile());

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
        let status = await updateProfileService(dataProfileEmployee)
        handleClose()
    }


    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                style={{ zIndex: '900' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thay đổi tùy chỉnh cá nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='name-avatar'>
                        <div className='inf-left'>
                            <h1 className='name-profile'>{nameProfile ? nameProfile : 'Name employee'}</h1>
                            <span className='change-password'>Thay đổi mật khẩu</span>
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
                            <label className='label-input' htmlFor='email'>Email công việc</label>
                            <input value={dataProfileEmployee.email} onChange={(e) => handleChangeInput('email', e.target.value)} className='input-profile email-profile ms-2 flex-fill' id='email' type='text' />
                        </div>

                        <div className='col-6 d-flex mt-3'>
                            <label className='label-input' htmlFor='phone'>Điện thoại</label>
                            <input value={dataProfileEmployee.phone} onChange={(e) => handleChangeInput('phone', e.target.value)} className='input-profile ms-2 flex-fill' id='phone' type='text' />
                        </div>

                        <div className='col-6 d-flex mt-3'>
                            <label className='label-input' htmlFor='address'>Địa chỉ</label>
                            <input value={dataProfileEmployee.address} onChange={(e) => handleChangeInput('address', e.target.value)} className='input-profile ms-2 flex-fill' id='address' type='text' />
                        </div>

                        <div className='col-6 d-flex mt-3 d-flex align-items-center'>
                            <label className='label-input' htmlFor='gender'>Giới tính</label>
                            <select onChange={(e) => handleChangeInput('gender', e.target.value)} value={dataProfileEmployee.gender}
                                id='select-gender' className="form-select select-gender-profile flex-fill ">
                                <option disabled value=''>  </option>
                                <option value="S1">Nam</option>
                                <option value="S2">Nữ</option>
                                <option value="S3">Khác</option>
                            </select>
                        </div>

                        <div className='col-6 d-flex mt-3'>
                            <label className='label-input' htmlFor='yearOfBirth'>Năm sinh</label>
                            <input value={dataProfileEmployee.year} onChange={(e) => handleChangeInput('year', e.target.value)} className='input-profile ms-2 flex-fill' id='yearOfBirth' type='text' />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={() => handleUpdateProfile()} className='btn-purple' variant="primary" >
                        Save Changes
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