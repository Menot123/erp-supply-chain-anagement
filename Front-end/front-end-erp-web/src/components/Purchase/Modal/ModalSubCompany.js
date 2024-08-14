import React, { useEffect } from 'react'
import './DataCompanyModal.scss'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCameraEnhance } from "react-icons/md";
import Lightbox from 'react-image-lightbox';
import { validateData } from '../../../utils/functions'
import { postDataBranchCompany } from '../../../services/userServices'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'react-toastify';

function ModalSubCompany(props) {

    const intl = useIntl();

    const defaultDataSubCompany = {
        name: '',
        logo: '',
        address: '',
        phone: '',
        taxId: '',
        email: '',
        money: 'VND',
        website: '',
        idCompany: '',
        mainCompanyId: ''
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

    const clearDataModal = () => {
        setDataSubCompany(defaultDataSubCompany)
        setImgPreviewSubCompany(defaultImgPreviewSubCompany)
    }

    const handlePostDataBranch = async () => {
        let fieldCheck = ['name', 'logo', 'idCompany', 'mainCompanyId', 'address', 'phone', 'taxId', 'email', 'money', 'website',]
        const checkEmptyFields = validateData(fieldCheck, dataSubCompany)
        if (checkEmptyFields.length === 0) {
            const response = await postDataBranchCompany(-10, dataSubCompany)
            if (response.EC === 0) {
                clearDataModal()
                props?.closeSubModal()
                props?.reloadDataBranches()
                toast.success(intl.formatMessage({ id: "modal-company-toast-branches.success" }))
            } else {
                toast.error(response.EM)
            }
        } else {
            toast.warning(intl.formatMessage({ id: "modal-company-data-toast.missing" }) + checkEmptyFields.toString())
        }
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
                    <Modal.Title><FormattedMessage id='modal-company-branches.title' /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='name-company-logo d-flex  justify-content-between'>
                        <h1 className='name-company d-flex flex-column'>
                            <label className="label-name-company" htmlFor='input-name-company'><FormattedMessage id="modal-company-data-name.company" /></label>
                            <input
                                value={dataSubCompany.name} id="input-name-company"
                                type='text' className="input-name-company"
                                placeholder={intl.formatMessage({ id: "modal-company-data-name.placeholder" })}
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
                                    <FormattedMessage id='modal-company-data-info.nav' />
                                </div>
                            </div>
                        </div>

                        <div className='row body-content'>
                            <div className='col-6'>
                                <label className='label-address-company' htmlFor='input-address-company'><FormattedMessage id='modal-company-data-address' /></label>
                                <input value={dataSubCompany.address} id='input-address-company' className='input-address-company'
                                    onChange={(e) => handleOnchangeInput('address', e)}
                                />
                            </div>

                            <div className='col-6'>
                                <label htmlFor='input-phone-company'><FormattedMessage id='modal-company-data-phone' /></label>
                                <input value={dataSubCompany.phone} id='input-phone-company' className='input-phone-company'
                                    onChange={(e) => handleOnchangeInput('phone', e)}
                                />
                            </div>

                            <div className='col-6'>
                                <label htmlFor='input-taxID-company'><FormattedMessage id='modal-company-data-tax' /></label>
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
                                <label htmlFor='input-money-company'><FormattedMessage id='modal-company-data-currency' /></label>
                                <select value={dataSubCompany.money} id='input-money-company' className='input-money-company'
                                    onChange={(e) => handleOnchangeInput('money', e)}
                                >
                                    <option value="VND">VND</option>
                                    <option value="USD">USD</option>
                                </select>
                                {/* <input id='input-money-company' className='input-money-company' /> */}
                            </div>

                            <div className='col-6'>
                                <label htmlFor='input-website-company'><FormattedMessage id='modal-company-data-website' /></label>
                                <input value={dataSubCompany.website} id='input-website-company' className='input-website-company'
                                    onChange={(e) => handleOnchangeInput('website', e)}
                                />
                            </div>

                            <div className='col-6'>
                                <label htmlFor='input-id-company'><FormattedMessage id='modal-company-data-id' /></label>
                                <input value={dataSubCompany.idCompany} id='input-id-company' className='input-id-company'
                                    onChange={(e) => handleOnchangeInput('idCompany', e)}
                                />
                            </div>

                            <div className='col-6'>
                                <label htmlFor='input-mainId-company'><FormattedMessage id='modal-company-branches.iDMainCompany' /></label>
                                <input value={dataSubCompany.mainCompanyId} id='input-mainId-company' className='input-mainId-company'
                                    onChange={(e) => handleOnchangeInput('mainCompanyId', e)}
                                />
                            </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-cancel-data-company' onClick={props?.closeSubModal}>
                        <FormattedMessage id='btn-cancel' />
                    </Button>
                    <Button onClick={handlePostDataBranch} className='btn-purple'>
                        <FormattedMessage id='btn-save' />
                    </Button>
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