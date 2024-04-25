import React from 'react'
import './DataCompanyModal.scss'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCameraEnhance } from "react-icons/md";
import Lightbox from 'react-image-lightbox';
import ModalSubCompany from './ModalSubCompany';
import { FormattedMessage, useIntl } from 'react-intl'
import { validateData } from '../../../utils/functions'
import { postDataCompany, getAllBranches, getDetailCompany, deleteBranch } from '../../../services/userServices'
import { toast } from 'react-toastify';
import { FaRegBuilding } from "react-icons/fa";
import ModalDetailBranch from './ModalDetailBranch';
import { FaRegTrashCan } from "react-icons/fa6";

function DataCompanyModal(props) {

    const intl = useIntl();

    const defaultDataCompany = {
        name: '',
        logo: '',
        address: '',
        phone: '',
        taxId: '',
        email: '',
        money: 'VND',
        website: '',
        idCompany: ''
    }

    const defaultImgPreview = {
        urlReview: '',
        isOpen: false
    }

    const [dataCompany, setDataCompany] = useState(defaultDataCompany)
    const [imgPreview, setImgPreview] = useState(defaultImgPreview)
    const [optionConfigCompany, setOptionConfigCompany] = useState('1')
    const [isShowSubModal, setIsShowSubModal] = useState(false)
    const [subCompanies, setSubCompanies] = useState([])
    const [isShowModalDetail, setIsShowModalDetail] = useState(false)
    const [idCompanyDetail, setIdCompanyDetail] = useState(null)

    const fetchBranches = async () => {
        let res = await getAllBranches()
        if (res.EC === 0) {
            setSubCompanies(res?.DT)
        } else {
            toast.error('Error when get branches company')
        }
    }

    const fetchInfoCompany = async () => {
        let res = await getDetailCompany()
        if (res.EC === 0) {
            if (res?.DT) {
                Promise.all([
                    props?.isCreated(true),
                    setDataCompany(res?.DT),
                    setImgPreview(prevState => ({
                        ...prevState,
                        urlReview: res?.DT?.logo.replace(/"/g, '')
                    }))
                ])
            }
        }
    }

    const fetchInfoCompanyFirstTime = async () => {
        let res = await getDetailCompany()
        if (res.EC === 0) {
            if (res?.DT) {
                Promise.all([
                    setDataCompany(res?.DT),
                    setImgPreview(prevState => ({
                        ...prevState,
                        urlReview: res?.DT?.logo.replace(/"/g, '')
                    }))
                ])
            }
        }
    }

    useEffect(() => {
        fetchBranches()
        fetchInfoCompanyFirstTime()
    }, [])

    useEffect(() => {
        if (dataCompany && dataCompany?.name) {
            props?.isCreated(true)
        }
    }, [dataCompany, props])

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

    const handleShowModalDetail = () => {
        setIsShowModalDetail(true)
    }

    const handleCloseModalDetail = () => {
        setIsShowModalDetail(false)
    }

    const clearDataModal = () => {
        setDataCompany(defaultDataCompany)
        setImgPreview(defaultImgPreview)
    }

    const handleCreateDataCompany = async () => {
        let fieldCheck = ['name', 'logo', 'idCompany', 'address', 'phone', 'taxId', 'email', 'money', 'website',]
        const checkEmptyFields = validateData(fieldCheck, dataCompany)
        if (checkEmptyFields.length === 0) {
            const response = await postDataCompany(dataCompany)
            if (response.EC === 0) {
                clearDataModal()
                props?.handleClose()
                fetchInfoCompany()
                toast.success(intl.formatMessage({ id: "modal-company-toast-success" }))
            } else {
                toast.error(response.EM)
            }
        } else {
            toast.warning(intl.formatMessage({ id: "modal-company-data-toast.missing" }) + checkEmptyFields.toString())
        }
    }

    const showDetailCompany = (idCompany) => {
        setIdCompanyDetail(idCompany)
        handleShowModalDetail()
    }

    const handleDeleteBranch = async (idBranch, nameBranch) => {
        if (idBranch) {
            if (window.confirm(intl.formatMessage({ id: "modal-company-branches-toast.delete-confirm" }) + nameBranch + '?')) {
                let res = await deleteBranch(idBranch)
                if (+res.EC === 0) {
                    fetchBranches()
                    toast.success(intl.formatMessage({ id: "modal-company-branches-toast.delete-success" }) + nameBranch)
                }
                else {
                    toast.error(intl.formatMessage({ id: "modal-company-branches-toast.delete-failed" }) + nameBranch)
                }
            }

        }
    }

    return (
        <>
            <ModalSubCompany
                showSubModal={isShowSubModal}
                closeSubModal={handleCloseSubModal}
                reloadDataBranches={fetchBranches}
            />
            <ModalDetailBranch
                showModalDetail={isShowModalDetail}
                closeModalDetail={handleCloseModalDetail}
                idCompanyDetail={idCompanyDetail}
                reloadDataBranches={fetchBranches}
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
                    <Modal.Title><FormattedMessage id='modal-company-data-title' /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='name-company-logo d-flex  justify-content-between'>
                        <h1 className='name-company d-flex flex-column'>
                            <label className="label-name-company" htmlFor='input-name-company'><FormattedMessage id='modal-company-data-name.company' /></label>
                            <input
                                value={dataCompany.name} id="input-name-company"
                                type='text' className="input-name-company"
                                placeholder={intl.formatMessage({ id: "modal-company-data-name.placeholder" })}
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
                                    <FormattedMessage id='modal-company-data-info.nav' />
                                </div>

                                <div onClick={() => handleClickActive('sub-company')} className='branch'>
                                    <FormattedMessage id='modal-company-data-branches' />
                                </div>
                            </div>
                        </div>
                        {optionConfigCompany === '1' ?
                            <div className='row body-content'>
                                <div className='col-6'>
                                    <label className='label-address-company' htmlFor='input-address-company'><FormattedMessage id='modal-company-data-address' /></label>
                                    <input value={dataCompany.address} id='input-address-company' className='input-address-company'
                                        onChange={(e) => handleOnchangeInput('address', e)}
                                    />
                                </div>

                                <div className='col-6'>
                                    <label htmlFor='input-phone-company'><FormattedMessage id='modal-company-data-phone' /></label>
                                    <input value={dataCompany.phone} id='input-phone-company' className='input-phone-company'
                                        onChange={(e) => handleOnchangeInput('phone', e)}
                                    />
                                </div>

                                <div className='col-6'>
                                    <label htmlFor='input-taxID-company'><FormattedMessage id='modal-company-data-tax' /></label>
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
                                    <label htmlFor='input-money-company'><FormattedMessage id='modal-company-data-currency' /></label>
                                    <select value={dataCompany.money} id='input-money-company' className='input-money-company'
                                        onChange={(e) => handleOnchangeInput('money', e)}
                                    >
                                        <option value="VND">VND</option>
                                        <option value="USD">USD</option>
                                    </select>
                                    {/* <input id='input-money-company' className='input-money-company' /> */}
                                </div>

                                <div className='col-6'>
                                    <label htmlFor='input-website-company'><FormattedMessage id='modal-company-data-website' /></label>
                                    <input value={dataCompany.website} id='input-website-company' className='input-website-company'
                                        onChange={(e) => handleOnchangeInput('website', e)}
                                    />
                                </div>

                                <div className='col-6'>
                                    <label htmlFor='input-id-company'><FormattedMessage id='modal-company-data-id' /></label>
                                    <input value={dataCompany.idCompany} id='input-id-company' className='input-id-company'
                                        onChange={(e) => handleOnchangeInput('idCompany', e)}
                                    />
                                </div>
                            </div>
                            :
                            <div className='body-content-sub-company'>
                                <table className="table table-striped table-hover table-sub-company">
                                    <thead>
                                        <tr>
                                            <th scope="col"><FormattedMessage id='modal-company-data-branches.name' /></th>
                                            <th scope="col"><FormattedMessage id='modal-company-data-branches.idBranch' /></th>
                                            <th scope="col"><FormattedMessage id='modal-company-data-branches.address' /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subCompanies && subCompanies.length > 0
                                            &&
                                            subCompanies.map((item, index) => {
                                                return (
                                                    <tr onClick={() => showDetailCompany(item.id)} key={'branch' + index} className='hover-item'>
                                                        <td >
                                                            <FaRegBuilding />
                                                            <span className='ms-2'>{item.name}</span>
                                                        </td>
                                                        <td >
                                                            <span>{item.idCompany}</span>
                                                        </td>
                                                        <td >
                                                            <span>{item.address}</span>
                                                        </td>
                                                        <td onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteBranch(item.id, item.name);
                                                        }} style={{ zIndex: 10 }}>
                                                            <FaRegTrashCan className='float-end' />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr>
                                            <td colSpan='4'>
                                                <span onClick={() => handleShowSubModal()} className='add-sub-company'><FormattedMessage id='modal-company-data-branches.btn-addLine' /></span>
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
                        <FormattedMessage id='btn-cancel' />
                    </Button>
                    <Button onClick={() => handleCreateDataCompany()} className='btn-purple'><FormattedMessage id='btn-save' /></Button>
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