import React from 'react'
import './DetailProduct.scss'
import { RiImageAddLine } from "react-icons/ri";
import { useState, useEffect } from 'react'
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { updateProductInformation, getAllCode, getProductWithId, deleteProduct, getProviders, getProviderByProductId, deleteProductProvider, createProductProvider } from '../../../services/inventoryServices'
import { getProvider } from '../../../services/purchaseServices'
import { useHistory, useParams } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant'
import { IoMdSettings } from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';
import { FormattedMessage, useIntl } from 'react-intl'
import { Tabs, Input, Select, Tooltip, DatePicker } from 'antd';
import _ from 'lodash'
import { IoOptions } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";


function DetailProduct() {

    let { id } = useParams();
    const history = useHistory()
    const language = useSelector(state => state.language.value)
    const intl = useIntl();
    const [isEdit, setIsEdit] = useState(false);

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

    const [creatingProvider, setCreatingProvider] = useState({})
    const [isCreatingProvider, setIsCreatingProvider] = useState(false)
    const [selectProvider, setSelectProvider] = useState([])
    const [listProvider, setListProvider] = useState([])
    const [listAllProvider, setListAllProvider] = useState([])

    const defaultProvider = {
        nameProvider: '',
        providerId: '',
    }

    useEffect(() => {
        const fetchAllProvider = async () => {
            const res = await getProviders()
            if (res && res.EC === 0) {
                setListAllProvider(res.DT)
                // console.log(res.DT)
            } else {
                toast.error(res.EM)
            }
            return res
        }

        Promise.all([fetchAllProvider()])

    }, [])

    useEffect(() => {
        if (listAllProvider.length > 0) {
            const buildSelectProvider = () => {
                let providerSelect = listAllProvider.map((item, index) => {
                    // console.log(item)
                    return (
                        {
                            value: item.providerId,
                            label: item.nameVi
                        }
                    )
                })
                setSelectProvider(providerSelect)
            }
            buildSelectProvider()
        }
    }, [listAllProvider])

    useEffect(() => {
        let mounted = true;
        const fetchDataProductNote = async () => {
            try {
                const resType = await getAllCode('Type');
                const resGroup = await getAllCode('Group');
                const resUnit = await getAllCode('Unit');

                if (mounted && resType.EC === 0 && resGroup.EC === 0 && resUnit.EC === 0) {
                    Promise.all([setType(resType.DT), setGroup(resGroup.DT), setUnit(resUnit.DT)]);
                } else {
                    history.push('/not-found')
                }
            } catch (error) {
                // Handle error here
                console.error(error);
            }
        };
        fetchDataProductNote();
        return () => {
            // Cleanup function to set mounted to false when component unmounts
            mounted = false;
        };

    }, [])

    useEffect(() => {
        const fetchDataProviderOfProduct = async () => {
            try {
                let resProvider = await getProviderByProductId(id);
                if (resProvider.EC === 0) {
                    // console.log("product provider ", resProvider.DT);
                    // console.log("list all provider ", listAllProvider)
                    const mergedData = listAllProvider.filter(provider => resProvider.DT.some(product => product.providerId === provider.providerId))
                        .map(provider => ({ nameProvider: provider.nameVi, providerId: provider.providerId }));
                    if (mergedData.length > 0) {
                        setIsCreatingProvider(true);
                    }
                    setListProvider(mergedData);
                }

            } catch (error) {
                console.log(error);
            }
        }

        fetchDataProviderOfProduct();
    }, [listAllProvider]);

    useEffect(() => {
        let canFetchData = true;

        const fetchDataProduct = async () => {
            if (!canFetchData) return;

            try {
                let resProduct = await getProductWithId(id);
                if (resProduct.EC === 0) {
                    setImgPreview(prevState => ({
                        ...prevState,
                        urlReview: resProduct.DT.image
                    }));
                    setDataProduct({ ...resProduct.DT });

                    let typeBuild = {}
                    let groupBuild = {}
                    let unitBuild = {}
                    if (type && type.length > 0) {
                        type.forEach((item) => {
                            if (item.keyType === resProduct.DT.type) {
                                typeBuild.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                typeBuild.value = item.keyType
                            }
                        })
                    }
                    if (group && group.length > 0) {
                        group.forEach((item) => {
                            if (item.keyType === resProduct.DT.group) {
                                groupBuild.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                groupBuild.value = item.keyType
                            }
                        })
                    }
                    if (unit && unit.length > 0) {
                        unit.forEach((item) => {
                            if (item.keyType === resProduct.DT.unit) {
                                unitBuild.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                unitBuild.value = item.keyType
                            }
                        })
                    }

                    Promise.all([setElementTypeSelect(typeBuild), setElementGroupSelect(groupBuild), setElementUnitSelect(unitBuild)]);
                } else {
                    history.push('/manage-inventory/products');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchDataProduct();

        return () => {
            // Cleanup function to prevent fetchDataProduct from being called
            canFetchData = false;
        };
    }, [group, type, unit, language]);


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
        setDataProduct(defaultProvider)
        setImgPreview(defaultImgPreview)
        setElementTypeSelect(null)
        setElementGroupSelect(null)
        setElementUnitSelect(null)
    }

    const handleSaveEditProduct = async () => {
        // Validate data
        let check = validateDataProduct()

        if (check.length === 0) {
            let res = await updateProductInformation(id, dataProduct)
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

    const handeOpenEditProduct = () => {
        setIsEdit(true)
    }

    const handleCancelEditProduct = () => {
        setIsEdit(false)
    }

    const handleNavigateToPage = (url) => {
        history.push(url)
    }

    const handleDeleteProduct = async () => {
        try {
            const isDelete = await deleteProduct(id);
            if (isDelete.EC === 0) {
                toast.success('Delete product successfully')
                history.push('/manage-inventory/products')
            }
            else {
                toast.error('Delete product failed')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href="/"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            style={{ textDecoration: 'none', color: 'black' }}
        >
            {children}
        </a>
    ));

    const onChangeTab = (key) => {

    };

    const updateEmptyFieldProvider = (providerCreating, type) => {
        const updatedProviders = listProvider.map(item => {
            if (item.providerId === providerCreating?.providerId) {
                // Cập nhật giá trị của trường (field) tương ứng
                if (type === 'name') {
                    return { ...item, emptyName: true };
                }
            }
            return item;
        });

        // Cập nhật danh sách sản phẩm mới
        setListProvider(updatedProviders);
    }

    const handleAddNewInput = () => {
        // Add new provider
        if (!isCreatingProvider) {
            setIsCreatingProvider(true)
            let _listProvider = _.cloneDeep(listProvider)
            _listProvider.push(defaultProvider)
            setListProvider(_listProvider)
            setCreatingProvider(defaultProvider)
            // console.log(_listProvider)
        } else {
            // Existing provider is creating
            // console.log(listProvider)
            const providerCreating = listProvider[listProvider.length - 1]
            if (providerCreating) {
                if (!providerCreating?.nameProvider || providerCreating?.nameProvider === '') {
                    updateEmptyFieldProvider(providerCreating, 'nameProvider')
                    return
                }
                else {
                    let _listProvider = _.cloneDeep(listProvider)
                    _listProvider.push(defaultProvider)
                    setListProvider(_listProvider)
                    setCreatingProvider(defaultProvider)
                }
            }
        }
    }

    const handleOnchangeNameProvider = async (e, labeledValue) => {
        let _listProvider = _.cloneDeep(listProvider)
        let creatingProvider = _listProvider[_listProvider.length - 1]
        if (creatingProvider) {
            creatingProvider = {
                ...creatingProvider,
                lineId: _listProvider.length,
                providerId: e,
                nameProvider: labeledValue?.label
            }
        }
        const providerExists = listProvider.some(provider => provider.providerId === e);
        if (!providerExists) {
            _listProvider[_listProvider.length - 1] = creatingProvider
            let dataCreated = { productId: id, providerId: e }
            let createPoPr = await createProductProvider(dataCreated)
            setListProvider(_listProvider);
        }
        else {
            toast.error(`Nhà cung cấp này đã tồn tại`);
        }
    }

    const handleRemoveProvider = async (provider) => {
        let _listProvider = _.cloneDeep(listProvider);
        if (_listProvider && _listProvider.length > 0) {
            _listProvider = _listProvider.filter(item => item.providerId !== provider.providerId);
        }
        // deleteProductProvider
        if (provider.providerId !== '') {
            let dataDelete = { productId: id, providerId: provider.providerId };
            let deleteProcess = await deleteProductProvider(dataDelete);
            console.log(deleteProcess);
            // console.log(id);
            // console.log(provider.providerId);
        }
        setListProvider(_listProvider)
        setIsCreatingProvider(false)
    };

    return (
        <div className='wrapper-view-product'>
            <div className='header-view'>
                <span className='title-view'>
                    <div className='d-flex justify-content-start'>
                        <span onClick={() => handleNavigateToPage('/manage-inventory/products')} className='bold'>{language === LANGUAGES.EN ? 'Product' : 'Sản phẩm'}</span>
                        <span > / </span>
                        <span >{id} </span>
                        {isEdit
                            ? ''
                            : <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-basic">
                                    <IoMdSettings />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleDeleteProduct()} href="#">Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>}
                    </div>

                </span>
                <div className='btn-actions'>
                    {isEdit
                        ? <button onClick={() => handleSaveEditProduct()} className='btn btn-primary btn-main'><FormattedMessage id='btn-save' /></button>
                        : <button onClick={() => handeOpenEditProduct()} className='btn btn-primary btn-main'><FormattedMessage id='btn-edit' /></button>
                    }
                    {isEdit
                        ? <button onClick={() => handleCancelEditProduct()} className='ms-1 btn btn-outline-secondary'><FormattedMessage id='btn-cancel' /></button>
                        : <button onClick={() => handleNavigateToPage('/manage-inventory/products/create')} className='ms-1 btn btn-outline-secondary'><FormattedMessage id='filter-header.create' /></button>
                    }
                </div>
            </div>
            <div className='container view-product-container'>
                <div className='name-group-image'>
                    <div className='name-group'>
                        {/* Name Product */}
                        {isEdit
                            ?
                            <>
                                <div className='d-flex align-items-center'>
                                    <label className='me-1' htmlFor="nameVi"><FormattedMessage id="product-view-name-vi" /></label>
                                    <input onChange={(e) => handleChangeInput('nameVi', e.target.value)} value={dataProduct.nameVi} id='nameVi' className="name-product name-product-edit mb-1 bg-body-secondary w-75" type='text' placeholder={intl.formatMessage({ id: "nav.manage-inventory-create-product-name-vi" })} />
                                </div>
                                <div className='d-flex align-items-center'>
                                    <label className='me-1' htmlFor="nameEn"><FormattedMessage id="product-view-name-en" /></label>
                                    <input onChange={(e) => handleChangeInput('nameEn', e.target.value)} value={dataProduct.nameEn} className="name-product name-product-edit mb-1 bg-body-secondary w-75" type='text' placeholder={intl.formatMessage({ id: "nav.manage-inventory-create-product-name-en" })} />
                                </div>
                            </>
                            :
                            <>
                                <div className="name-product mb-3 align-content-center">
                                    {language === LANGUAGES.VI ? dataProduct.nameVi : dataProduct.nameEn}
                                </div>
                            </>
                        }

                        <div className='d-flex align-items-center'>
                            <label className='me-1' htmlFor="group"><FormattedMessage id="product-view-group" /></label>
                            <Select onChange={(e) => handleChangeInput('group', e)}
                                placeholder={<div><FormattedMessage id='nav.manage-inventory-create-product-group' /></div>}
                                options={selectGroup && selectGroup.length > 0 ? selectGroup : []}
                                value={elementGroupSelect ? elementGroupSelect : ''}
                                id='group'
                                isDisabled={!isEdit}

                                // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        border: 'none',
                                        background: isEdit ? 'rgb(233, 236, 239)' : 'white',
                                        marginLeft: '6px',
                                    }),
                                }}
                            />
                        </div>

                    </div>
                    <div className='image'>
                        {isEdit
                            ? <div className='upload-image'>
                                <input hidden id="img-upload" type='file'
                                    onChange={(e) => handleChangeImage(e)}
                                />
                                <label className='label-upload' htmlFor="img-upload"><RiImageAddLine className='icon-upload hover-item ms-1 mb-1' /></label>
                            </div>
                            : ''}

                        <div className='preview-image h-50 w-50'
                            style={{ backgroundImage: `url(${imgPreview.urlReview})` }}
                            onClick={() => openPreviewImage()}
                        ></div>
                    </div>
                </div>
                <Tabs
                    onChange={onChangeTab}
                    type="card"
                    items={[{
                        label: `Thông tin sản phẩm`,
                        key: 'tab-1',
                        children: <div className='information-detail row'>
                            <div className='col-6 mt-2'>
                                <label className='label-input' htmlFor='barCode'><FormattedMessage id='nav.manage-inventory-create-product-barcode' /></label>
                                {isEdit
                                    ? <input onChange={(e) => handleChangeInput('barCode', e.target.value)} value={dataProduct.barCode} className='input-inf bg-body-secondary' id='barCode' type='text' />
                                    : <span className='input-inf' id='barCode'>{dataProduct.barCode}</span>
                                }
                            </div>

                            <div className='col-6 mt-2 d-flex wrap-type'>
                                <label className={isEdit ? 'label-input d-flex align-items-top' : 'label-input d-flex align-items-center'}><FormattedMessage id='nav.manage-inventory-create-product-type' /></label>
                                <ReactSelect className='type-select' onChange={(e) => handleChangeInput('type', e)}
                                    isDisabled={!isEdit}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            border: 'none',
                                            background: isEdit ? 'rgb(233, 236, 239)' : 'white',
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
                                {isEdit
                                    ? <input onChange={(e) => handleChangeInput('cost', e.target.value)} value={dataProduct.cost} className='input-inf bg-body-secondary' id='cost' type='cost' />
                                    : <span className='input-inf' id='cost' >{dataProduct.cost}</span>
                                }


                            </div>


                            <div className='col-6 mt-2 mb-1'>
                                <div className="d-flex align-items-start">
                                    <label className='label-input' htmlFor='expiry'><FormattedMessage id='nav.manage-inventory-create-product-expiry' /></label>
                                    {isEdit
                                        ? <input onChange={(e) => handleChangeInput('expiry', e.target.value)} value={dataProduct.expiry} className='input-inf bg-body-secondary' id='expiry' type='expiry' />
                                        : <span className='input-inf' id='expiry' >{dataProduct.expiry}</span>
                                    }
                                </div>
                            </div>

                            <div className='col-6 mt-2'>
                                <label className='label-input' htmlFor='descriptionVi'><FormattedMessage id='nav.manage-inventory-create-product-description-vi' /></label>
                                {isEdit
                                    ? <input onChange={(e) => handleChangeInput('descriptionVi', e.target.value)} value={dataProduct.descriptionVi} className='input-inf bg-body-secondary' id='descriptionVi' type='text' />
                                    : <span className='input-inf' id='descriptionVi' >{dataProduct.descriptionVi}</span>
                                }

                            </div>

                            <div className='col-6 mt-2'>
                                <label className='label-input' htmlFor='descriptionEn'><FormattedMessage id='nav.manage-inventory-create-product-description-en' /></label>
                                {isEdit
                                    ? <input onChange={(e) => handleChangeInput('descriptionEn', e.target.value)} value={dataProduct.descriptionEn} className='input-inf bg-body-secondary' id='descriptionEn' type='text' />
                                    : <span className='input-inf' id='descriptionEn' >{dataProduct.descriptionEn}</span>
                                }

                            </div>

                            <div className='col-6 mt-2 d-flex wrap-type'>
                                <label className={isEdit ? 'label-input d-flex align-items-top' : 'label-input d-flex align-items-center'} ><FormattedMessage id='nav.manage-inventory-create-product-unit' /></label>
                                <ReactSelect className='type-select' onChange={(e) => handleChangeInput('unit', e)}
                                    isDisabled={!isEdit}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            border: 'none',
                                            background: isEdit ? 'rgb(233, 236, 239)' : 'white',
                                        }),
                                    }}
                                    placeholder={<div> </div>}
                                    options={selectUnit && selectUnit.length > 0 ? selectUnit : []}
                                    // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    value={elementUnitSelect ? elementUnitSelect : ''}
                                />
                            </div>

                        </div>,
                    },
                    {
                        label: `Nhà cung cấp`,
                        key: 'tab-2',
                        children: <>
                            <thead>
                                <tr>
                                    <th scope="col">Nhà cung cấp</th>
                                    <th scope="col"><IoOptions /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listProvider.map((item, index) => {
                                        return (
                                            <tr key={'product' + index}>
                                                <td>
                                                    <Select
                                                        key={index}
                                                        className={item?.emptyName
                                                            ? 'name-creating-product empty-data'
                                                            : 'name-creating-product'}
                                                        placeholder="Nhập để tìm một nhà cung cấp..."
                                                        variant="borderless"
                                                        showSearch
                                                        onChange={(e, labeledValue) => handleOnchangeNameProvider(e, labeledValue)}
                                                        style={{ width: 200 }}
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                        filterSort={(optionA, optionB) =>
                                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                        }
                                                        options={selectProvider}
                                                        value={item.nameProvider}
                                                    />
                                                </td>
                                                <td>
                                                    <Tooltip placement="top" title={`Xóa sản phẩm "${item.name}"`}>
                                                        <FaRegTrashCan className='hover-item' onClick={() => handleRemoveProvider(item)} />
                                                    </Tooltip>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan='7'>
                                        <span onClick={() => handleAddNewInput()} className='add-output-warehouse'>Thêm một dòng</span>
                                    </td>
                                </tr>
                            </tbody>
                        </>,
                    },
                    ]}
                />
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

export default DetailProduct