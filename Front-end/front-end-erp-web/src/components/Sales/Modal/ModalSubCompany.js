import React, { useEffect } from 'react'
import './DataCompanyModal.scss'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCameraEnhance } from "react-icons/md";
import Lightbox from 'react-image-lightbox';

function ModalSubCompany(props) {

    const defaultDataSubCompany = {
        name: '',
        logo: '',
        address: '',
        phone: '',
        taxId: '',
        email: '',
        money: 'VND',
        website: '',
    }

    const defaultImgPreviewSubCompany = {
        urlReview: '',
        isOpen: false
    }

    const [dataSubCompany, setDataSubCompany] = useState(defaultDataSubCompany)
    const [imgPreviewSubCompany, setImgPreviewSubCompany] = useState(defaultImgPreviewSubCompany)

    const handleOnchangeInput = (type, e) => {
        if (type) {
            setDataSubCompany((prevState) => ({
                ...prevState,
                [type]: e.target.value
            }))
        }
    }

    const handleChangeImageSubCompany = async (e) => {
        console.log('check upload image sub modal')
        let dataFile = e.target.files
        let img = dataFile[0]
        if (img) {
            let imgBase64 = await getBase64(img)
            let objUrl = URL.createObjectURL(img)
            setImgPreviewSubCompany(prevState => ({
                ...prevState,
                urlReview: objUrl
            }));
            setDataSubCompany((prevState) => ({
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
        if (!imgPreviewSubCompany.urlReview) {
            return;
        }
        setImgPreviewSubCompany(prevState => ({
            ...prevState,
            isOpen: true
        }));
    }

    return (
        <>
            <Modal
                show={props?.showSubModal}
                onHide={props?.closeSubModal}
                backdrop="static"
                keyboard={false}
                size={'xl'}
                style={{ zIndex: '900' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tạo chi nhánh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='name-company-logo d-flex  justify-content-between'>
                        <h1 className='name-company d-flex flex-column'>
                            <label className="label-name-company" htmlFor='input-name-company'>Tên công ty</label>
                            <input
                                value={dataSubCompany.name} id="input-name-company"
                                type='text' className="input-name-company"
                                placeholder='ví dụ. Công ty của tôi'
                                onChange={(e) => handleOnchangeInput('name', e)}
                            />
                        </h1>

                        <div className='wrap-img-logo'>
                            <input hidden id="img-upload-sub" type='file'
                                onChange={(e) => handleChangeImageSubCompany(e)}
                            />
                            <label className='label-upload hover-item' htmlFor="img-upload-sub"><MdCameraEnhance className='icon-upload  ms-1 mb-1' />Your logo</label>

                            {
                                imgPreviewSubCompany?.urlReview &&
                                <div className='preview-image'
                                    style={{ backgroundImage: `url(${imgPreviewSubCompany.urlReview})` }}
                                    onClick={() => openPreviewImage()}
                                ></div>
                            }
                        </div>
                    </div>
                    <div className='wrap-content-body'>
                        <div className='heading-content-body'>
                            <div className='two-blocks d-flex'>
                                <div className='general-inf active'>
                                    Thông tin tổng quan
                                </div>
                            </div>
                        </div>

                        <div className='row body-content'>
                            <div className='col-6'>
                                <label className='label-address-company' htmlFor='input-address-company'>Địa chỉ</label>
                                <input value={dataSubCompany.address} id='input-address-company' className='input-address-company'
                                    onChange={(e) => handleOnchangeInput('address', e)}
                                />
                            </div>

                            <div className='col-6'>
                                <label htmlFor='input-phone-company'>Phone</label>
                                <input value={dataSubCompany.phone} id='input-phone-company' className='input-phone-company'
                                    onChange={(e) => handleOnchangeInput('phone', e)}
                                />
                            </div>

                            <div className='col-6'>
                                <label htmlFor='input-taxID-company'>Tax ID</label>
                                <input value={dataSubCompany.taxId} id='input-taxID-company' className='input-taxID-company'
                                    onChange={(e) => handleOnchangeInput('taxId', e)}
                                />
                            </div>

                            <div className='col-6'>
                                <label htmlFor='input-email-company'>Email</label>
                                <input value={dataSubCompany.email} id='input-email-company' className='input-email-company'
                                    onChange={(e) => handleOnchangeInput('email', e)}
                                />
                            </div>

                            <div className='col-6'>
                                <label htmlFor='input-money-company'>Tiền tệ</label>
                                <select value={dataSubCompany.money} id='input-money-company' className='input-money-company'
                                    onChange={(e) => handleOnchangeInput('money', e)}
                                >
                                    <option value="VND">VND</option>
                                    <option value="USD">USD</option>
                                </select>
                                {/* <input id='input-money-company' className='input-money-company' /> */}
                            </div>

                            <div className='col-6'>
                                <label htmlFor='input-website-company'>Trang web</label>
                                <input value={dataSubCompany.website} id='input-website-company' className='input-website-company'
                                    onChange={(e) => handleOnchangeInput('website', e)}
                                />
                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-cancel-data-company' onClick={props?.closeSubModal}>
                        Hủy bỏ
                    </Button>
                    <Button className='btn-purple'>Lưu</Button>
                </Modal.Footer>
            </Modal>
            {
                imgPreviewSubCompany.isOpen === true &&
                <Lightbox
                    mainSrc={imgPreviewSubCompany.urlReview}
                    onCloseRequest={() =>
                        setImgPreviewSubCompany(prevState => ({
                            ...prevState,
                            isOpen: false
                        }))
                    }
                />
            }
        </>
    )
}

export default ModalSubCompany