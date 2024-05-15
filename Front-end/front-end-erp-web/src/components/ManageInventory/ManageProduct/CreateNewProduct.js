import React from 'react'
import './CreateNewProduct.scss'
import { RiImageAddLine } from "react-icons/ri";
import { useState, useEffect } from 'react'
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { createNewProduct, getAllCode } from '../../../services/inventoryServices'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant'
import { FormattedMessage, useIntl } from 'react-intl'


function CreateNewProduct() {

    const history = useHistory()
    const language = useSelector(state => state.language.value)
    const intl = useIntl();

    const defaultProduct = {
        barCode: '',
        nameVi: '',
        nameEn: '',
        type: '',
        group: '',
        image: '',
        cost: 0,
        unit: '',
        descriptionVi: '',
        descriptionEn: '',
        expiry: 0,
    }

    const defaultImgPreview = {
        urlReview: '',
        isOpen: false
    }

    const [imgPreview, setImgPreview] = useState(defaultImgPreview)

    const [dataProduct, setDataProduct] = useState(defaultProduct)
    const [type, setType] = useState([])
    const [selectTypes, setSelectTypes] = useState(null)
    const [group, setGroup] = useState([])
    const [selectGroup, setSelectGroup] = useState(null)
    const [unit, setUnit] = useState([])
    const [selectUnit, setSelectUnit] = useState(null)
    const [elementTypeSelect, setElementTypeSelect] = useState(null)
    const [elementGroupSelect, setElementGroupSelect] = useState(null)
    const [elementUnitSelect, setElementUnitSelect] = useState(null)

    useEffect(() => {
        const fetchDataProductNote = async () => {
            let resType = await getAllCode('Type')
            let resGroup = await getAllCode('Group')
            let resUnit = await getAllCode('Unit')
            if (resType.EC === 0 && resGroup.EC === 0 && resUnit.EC === 0) {
                Promise.all([setType(resType.DT), setGroup(resGroup.DT), setUnit(resUnit.DT)])
            } else {
                toast.error('Error when get list type, group and unit in all code')
            }
        }

        fetchDataProductNote()

    }, [])

    useEffect(() => {
        const buildDataSelect = () => {
            let arrType = []
            type.map((item, index) => {
                let typeObj = {}
                typeObj.value = item.keyType
                typeObj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                return arrType.push(typeObj)
            })
            setSelectTypes(arrType)
            let arrGroup = []
            group.map((item, index) => {
                let groupObj = {}
                groupObj.value = item.keyType
                groupObj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                return arrGroup.push(groupObj)
            })
            setSelectGroup(arrGroup)
            let arrUnit = []
            unit.map((item, index) => {
                let unitObj = {}
                unitObj.value = item.keyType
                unitObj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                return arrUnit.push(unitObj)
            })
            setSelectUnit(arrUnit)
        }
        // console.log(group)
        if (type && group && unit && type.length > 0 && group.length > 0 && unit.length > 0) {
            buildDataSelect()
        }
    }, [type, group, unit, language])


    const handleChangeInput = (type, value) => {
        if (type === 'type' || type === 'group' || type === 'unit') {
            setDataProduct((prevState) => ({
                ...prevState,
                [type]: value.value
            }));
            if (type === 'type') {
                setElementTypeSelect(value)
            } else if (type === 'group') {
                setElementGroupSelect(value)
            } else {
                setElementUnitSelect(value)
            }
        } else {
            setDataProduct((prevState) => ({
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
            setDataProduct((prevState) => ({
                ...prevState,
                image: imgBase64
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

    const validateDataProduct = () => {
        const fieldCheck = ['barCode', 'nameVi', 'nameEn', 'type', 'group', 'image', 'cost', 'unit', 'descriptionVi', 'descriptionEn', 'expiry'];
        const missingFields = [];

        fieldCheck.forEach(field => {
            if (!dataProduct[field]) {
                missingFields.push(field);
            }
        });

        return missingFields;
    };

    const cleanValueSubmit = () => {
        setDataProduct(defaultProduct)
        setImgPreview(defaultImgPreview)
        setElementTypeSelect(null)
        setElementGroupSelect(null)
        setElementUnitSelect(null)
    }

    const handleCreateProduct = async () => {
        // Validate data
        let check = validateDataProduct()

        if (check.length === 0) {
            let res = await createNewProduct(dataProduct)
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

    const handleCancelCreateProduct = () => {
        history.push('/manage-inventory/products')
    }

    return (
        <div className='wrapper-create-product'>
            <div className='header-create'>
                <span className='title-create'>
                    <span onClick={() => handleCancelCreateProduct()} className='bold'>{language === LANGUAGES.EN ? 'Product' : 'Sản phẩm'}</span>
                    <span> / </span>
                    <span><FormattedMessage id='nav.manage-inventory-create-product-title' /></span>
                </span>
                <div className='btn-actions'>
                    <button onClick={() => handleCreateProduct()} className='btn btn-primary btn-main'><FormattedMessage id='btn-save' /></button>
                    <button onClick={() => handleCancelCreateProduct()} className='ms-1 btn btn-outline-secondary'><FormattedMessage id='btn-cancel' /></button>
                </div>
            </div>
            <div className='container create-product-container'>
                <div className='name-group-image'>
                    <div className='name-group'>
                        <input onChange={(e) => handleChangeInput('nameVi', e.target.value)} value={dataProduct.nameVi} className="name-product mb-1 bg-body-secondary" type='text' placeholder={intl.formatMessage({ id: "nav.manage-inventory-create-product-name-vi" })} />
                        <input onChange={(e) => handleChangeInput('nameEn', e.target.value)} value={dataProduct.nameEn} className="name-product mb-1 bg-body-secondary" type='text' placeholder={intl.formatMessage({ id: "nav.manage-inventory-create-product-name-en" })} />
                        <Select onChange={(e) => handleChangeInput('group', e)}
                            placeholder={<div><FormattedMessage id='nav.manage-inventory-create-product-group' /></div>}
                            options={selectGroup && selectGroup.length > 0 ? selectGroup : []}
                            value={elementGroupSelect ? elementGroupSelect : ''}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    border: 'none',
                                    background: 'rgb(233, 236, 239)',
                                }),
                            }}
                        />
                    </div>
                    <div className='image'>
                        <div className='upload-image'>
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
                        <label className='label-input' htmlFor='barCode'><FormattedMessage id='nav.manage-inventory-create-product-barcode' /></label>
                        <input onChange={(e) => handleChangeInput('barCode', e.target.value)} value={dataProduct.barCode} className='input-inf bg-body-secondary' id='barCode' type='text' />
                    </div>

                    <div className='col-6 mt-2 d-flex wrap-type'>
                        <label className='label-input d-flex align-items-center' ><FormattedMessage id='nav.manage-inventory-create-product-type' /></label>
                        <Select className='type-select' onChange={(e) => handleChangeInput('type', e)}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    border: 'none',
                                    background: 'rgb(233, 236, 239)'
                                }),
                            }}
                            placeholder={<div> </div>}
                            options={selectTypes && selectTypes.length > 0 ? selectTypes : []}
                            // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            value={elementTypeSelect ? elementTypeSelect : ''}
                        />
                    </div>

                    <div className='col-6 mt-2 mb-1'>
                        <label className='label-input' htmlFor='cost'><FormattedMessage id='nav.manage-inventory-create-product-cost' /> (VNĐ)</label>
                        <input onChange={(e) => handleChangeInput('cost', e.target.value)} value={dataProduct.cost} className='input-inf bg-body-secondary' id='cost' type='cost' />
                    </div>


                    <div className='col-6 mt-2 mb-1'>
                        <div className="d-flex align-items-start">
                            <label className='label-input' htmlFor='expiry'><FormattedMessage id='nav.manage-inventory-create-product-expiry' /></label>
                            <input onChange={(e) => handleChangeInput('expiry', e.target.value)} value={dataProduct.expiry} className='input-inf bg-body-secondary' id='expiry' type='expiry' />
                        </div>
                    </div>

                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='descriptionVi'><FormattedMessage id='nav.manage-inventory-create-product-description-vi' /></label>
                        <input onChange={(e) => handleChangeInput('descriptionVi', e.target.value)} value={dataProduct.descriptionVi} className='input-inf bg-body-secondary' id='descriptionVi' type='text' />
                    </div>

                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='descriptionEn'><FormattedMessage id='nav.manage-inventory-create-product-description-en' /></label>
                        <input onChange={(e) => handleChangeInput('descriptionEn', e.target.value)} value={dataProduct.descriptionEn} className='input-inf bg-body-secondary' id='descriptionEn' type='text' />
                    </div>

                    <div className='col-6 mt-2 d-flex wrap-type'>
                        <label className='label-input d-flex align-items-center' ><FormattedMessage id='nav.manage-inventory-create-product-unit' /></label>
                        <Select className='type-select' onChange={(e) => handleChangeInput('unit', e)}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    border: 'none',
                                    background: 'rgb(233, 236, 239)',
                                }),
                            }}
                            placeholder={<div> </div>}
                            options={selectUnit && selectUnit.length > 0 ? selectUnit : []}
                            // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            value={elementUnitSelect ? elementUnitSelect : ''}
                        />
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

export default CreateNewProduct