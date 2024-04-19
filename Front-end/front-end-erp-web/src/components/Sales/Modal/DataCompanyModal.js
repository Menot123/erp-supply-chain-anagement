import React from 'react'
import './DataCompanyModal.scss'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCameraEnhance } from "react-icons/md";
import Lightbox from 'react-image-lightbox';
import ModalSubCompany from './ModalSubCompany';

function DataCompanyModal(props) {

    const defaultDataCompany = {
        name: '',
        logo: '',
        address: '',
        phone: '',
        taxId: '',
        email: '',
        money: 'VND',
        website: '',
    }

    const defaultImgPreview = {
        urlReview: '',
        isOpen: false
    }

    const [dataCompany, setDataCompany] = useState(defaultDataCompany)
    const [imgPreview, setImgPreview] = useState(defaultImgPreview)
    const [optionConfigCompany, setOptionConfigCompany] = useState('1')
    const [isShowSubModal, setIsShowSubModal] = useState(false)

    const handleOnchangeInput = (type, e) => {
        if (type) {
            setDataCompany((prevState) => ({
                ...prevState,
                [type]: e.target.value
            }))
        }
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
            setDataCompany((prevState) => ({
                ...prevState,
                logo: imgBase64
            }));
        }
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
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

    const handleClickActive = (type) => {
        const generalOption = document.querySelector('.general-inf')
        const subCompanyOption = document.querySelector('.branch')
        if (type === 'general' && generalOption && subCompanyOption) {
            generalOption.classList.add('active')
            subCompanyOption.classList.remove('active')
            setOptionConfigCompany('1')
            return;
        }
        if (type === 'sub-company' && generalOption && subCompanyOption) {
            subCompanyOption.classList.add('active')
            generalOption.classList.remove('active')
            setOptionConfigCompany('2')
            return;
        }

    };

    const handleShowSubModal = () => {
        setIsShowSubModal(true)
    }

    const handleCloseSubModal = () => {
        setIsShowSubModal(false)

    }

    const handleCreateDataCompany = () => {
        console.log('>>> check data company: ', dataCompany)
    }

    return (
        <>
            <ModalSubCompany
                showSubModal={isShowSubModal}
                closeSubModal={handleCloseSubModal}
            />
            <Modal
                show={props?.show}
                onHide={props?.handleClose}
                backdrop="static"
                keyboard={false}
                size={'xl'}
                style={{ zIndex: '900' }}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thiết lập dữ liệu công ty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='name-company-logo d-flex  justify-content-between'>
                        <h1 className='name-company d-flex flex-column'>
                            <label className="label-name-company" htmlFor='input-name-company'>Tên công ty</label>
                            <input
                                value={dataCompany.name} id="input-name-company"
                                type='text' className="input-name-company"
                                placeholder='ví dụ. Công ty của tôi'
                                onChange={(e) => handleOnchangeInput('name', e)}
                            />
                        </h1>

                        <div className='wrap-img-logo'>
                            <input hidden id="img-upload" type='file'
                                onChange={(e) => handleChangeImage(e)}
                            />
                            <label className='label-upload hover-item' htmlFor="img-upload"><MdCameraEnhance className='icon-upload  ms-1 mb-1' />Your logo</label>

                            {
                                imgPreview?.urlReview &&
                                <div className='preview-image'
                                    style={{ backgroundImage: `url(${imgPreview.urlReview})` }}
                                    onClick={() => openPreviewImage()}
                                ></div>
                            }
                        </div>
                    </div>
                    <div className='wrap-content-body'>
                        <div className='heading-content-body'>
                            <div className='two-blocks d-flex'>
                                <div onClick={() => handleClickActive('general')} className='general-inf active'>
                                    Thông tin tổng quan
                                </div>

                                <div onClick={() => handleClickActive('sub-company')} className='branch'>
                                    Chi nhánh
                                </div>
                            </div>
                        </div>
                        {optionConfigCompany === '1' ?
                            <div className='row body-content'>
                                <div className='col-6'>
                                    <label className='label-address-company' htmlFor='input-address-company'>Địa chỉ</label>
                                    <input value={dataCompany.address} id='input-address-company' className='input-address-company'
                                        onChange={(e) => handleOnchangeInput('address', e)}
                                    />
                                </div>

                                <div className='col-6'>
                                    <label htmlFor='input-phone-company'>Phone</label>
                                    <input value={dataCompany.phone} id='input-phone-company' className='input-phone-company'
                                        onChange={(e) => handleOnchangeInput('phone', e)}
                                    />
                                </div>

                                <div className='col-6'>
                                    <label htmlFor='input-taxID-company'>Tax ID</label>
                                    <input value={dataCompany.taxId} id='input-taxID-company' className='input-taxID-company'
                                        onChange={(e) => handleOnchangeInput('taxId', e)}
                                    />
                                </div>

                                <div className='col-6'>
                                    <label htmlFor='input-email-company'>Email</label>
                                    <input value={dataCompany.email} id='input-email-company' className='input-email-company'
                                        onChange={(e) => handleOnchangeInput('email', e)}
                                    />
                                </div>

                                <div className='col-6'>
                                    <label htmlFor='input-money-company'>Tiền tệ</label>
                                    <select value={dataCompany.money} id='input-money-company' className='input-money-company'
                                        onChange={(e) => handleOnchangeInput('money', e)}
                                    >
                                        <option value="VND">VND</option>
                                        <option value="USD">USD</option>
                                    </select>
                                    {/* <input id='input-money-company' className='input-money-company' /> */}
                                </div>

                                <div className='col-6'>
                                    <label htmlFor='input-website-company'>Trang web</label>
                                    <input value={dataCompany.website} id='input-website-company' className='input-website-company'
                                        onChange={(e) => handleOnchangeInput('website', e)}
                                    />
                                </div>
                            </div>
                            :
                            <div className='body-content-sub-company'>
                                <table class="table table-striped table-hover table-sub-company">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tên công ty</th>
                                            <th scope="col">Đối tác</th>
                                            <th scope="col">Chi nhánh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan='3'>
                                                <span onClick={() => handleShowSubModal()} className='add-sub-company'>Thêm một dòng</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-cancel-data-company' onClick={props?.handleClose}>
                        Hủy bỏ
                    </Button>
                    <Button onClick={() => handleCreateDataCompany()} className='btn-purple'>Lưu</Button>
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
    )
}

export default DataCompanyModal