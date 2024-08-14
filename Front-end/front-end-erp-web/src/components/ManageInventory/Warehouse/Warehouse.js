import React from 'react'
import './Warehouse.scss'
import FilterHeader from '../../FilterHeader/FilterHeader';
import { IoOptions } from "react-icons/io5";
import {
    useHistory
} from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { getStockEntrys, getStocks } from '../../../services/inventoryServices'
import { LANGUAGES } from '../../../utils/constant'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl'

function Warehouse() {
    const history = useHistory();
    const [currentView, setCurrentView] = useState('list')
    const [currentLimit] = useState(16)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const [stocks, setStocks] = useState([])
    const [stockEntrys, setStockEntrys] = useState([])
    const tempProductsLength = 1
    const language = useSelector(state => state.language.value)

    // Checkbox
    const [isShowActions, setIsShowActions] = useState(false);
    const [numberCheckedItems, setNumberCheckedItems] = useState(0);
    const [allElementsChecked, setAllElementsChecked] = useState(false);

    const [isOpenDropdownFilter, setIsOpenDropdownFilter] = useState(false)
    const dropdownFilterRef = useRef(null);

    const [contactChecked, setContactChecked] = useState(true);
    const [personInChargeChecked, setPersonInChargeChecked] = useState(true);
    const [plannedDateChecked, setplannedDateChecked] = useState(false);
    const [productAvailabilityChecked, setProductAvailabilityChecked] = useState(false);
    const [deadlineChecked, setDeadlineChecked] = useState(false);
    const [effectiveDateChecked, setEffectiveDateChecked] = useState(true);
    const [originalDocumentChecked, setOriginalDocumentChecked] = useState(true);
    const [orderDelayOfChecked, setOrderDelayOfChecked] = useState(false);
    const [activityTypeChecked, setActivityTypeChecked] = useState(false);
    const [statusChecked, setStatusChecked] = useState(true);

    const status = [
        { id: 1, status: 'draft' },
        { id: 2, status: 'ready' },
        { id: 3, status: 'done' }
    ];

    const renderStatus = (item) => {
        let statusClass = '';
        let statusText = '';

        if (item === 'draft') {
            statusClass = 'gray';
            statusText = 'Nháp';
        } else if (item === 'ready') {
            statusClass = 'blue';
            statusText = 'Sẵn sàng';
        } else if (item === 'done') {
            statusClass = 'green';
            statusText = 'Hoàn thành';
        }

        return (
            <td key={item.id}>
                <span className={statusClass}>{statusText}</span>
            </td>
        );
    };

    const csvDataExportVi = [
        ["Mã tham chiếu", "Liên hệ", "Người phụ trách", "Ngày theo kế hoạch", "Tình trạng còn hàng của sản phẩm", "Hạn chót", "Ngày hiệu lực", "Chứng từ gốc", "Đơn hàng chậm trễ của", "Loại hoạt động", "Trạng thái"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"]
    ];
    const csvDataExportEn = [
        ["Reference", "Contact", "Responsible", "Scheduled Date", "Product Availability", "Deadline", "Effective Date", "Source Document", "Back Order of", "Operation Type", "Status"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"],
        // ["WH/IN/001", "0123456789", "Nguyễn Tiến Đạt", "08/01/2024", "", "", "05/09/2024 04:18:45", "", "", "Nhập kho", "Hoàn tất"]
    ];

    const [listCheckedItems, setListCheckedItems] = useState([["Mã tham chiếu", "Liên hệ", "Người phụ trách", "Ngày theo kế hoạch", "Tình trạng còn hàng của sản phẩm", "Hạn chót", "Ngày hiệu lực", "Chứng từ gốc", "Đơn hàng chậm trễ của", "Loại hoạt động", "Trạng thái"]]);



    const exampleItem = {
        reference: 'WH/IN/001',
        contact: '0123456789',
        responsible: 'Nguyễn Tiến Đạt',
        scheduledDate: '08/01/2024',
        productAvailability: '',
        deadline: '',
        effectiveDate: '05/09/2024 04:18:45',
        sourceDocument: '',
        backOrderof: '',
        operationType: 'Nhập kho',
        status: 'Sẵn sàng',
    }

    const itemObj2Array = (exampleItem) => {
        const valuesArray = [];
        for (const key in exampleItem) {
            if (exampleItem.hasOwnProperty(key)) {
                valuesArray.push(exampleItem[key]);
            }
        }
        return valuesArray;
    }

    const checkedOrUncheckedElement = (element) => {
        const arrayItem = itemObj2Array(exampleItem);
        setAllElementsChecked(false);
        // console.log(element.target.checked)
        if (element.target.checked) {
            const updateListChecked = [...listCheckedItems, arrayItem];
            setListCheckedItems(updateListChecked);
            console.log(updateListChecked);
            setIsShowActions(true);
            setNumberCheckedItems(updateListChecked.length - 1);
        }
        else {
            const removeItemListChecked = listCheckedItems;
            removeItemListChecked.pop();
            setListCheckedItems(removeItemListChecked);
            console.log(removeItemListChecked);
            if (removeItemListChecked.length === 1) {
                setIsShowActions(false);
            }
            setNumberCheckedItems(removeItemListChecked.length - 1);
        }
    }

    const checkAllElements = (element) => {
        if (allElementsChecked) {
            setAllElementsChecked(false);
        }
        else {
            setAllElementsChecked(true);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownFilterRef.current && !dropdownFilterRef.current.contains(event.target)) {
                setIsOpenDropdownFilter(false)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const fetchStocks = async () => {
            const response = await getStocks()
            if (response.EC == 0) {
                setStocks(response?.DT)
                console.log(response.DT)
            } else {
                toast.error(response?.EM)
            }
        }
        fetchStocks()
    }, [])

    useEffect(() => {
        const fetchStockEntrys = async () => {
            const response = await getStockEntrys()
            if (response.EC == 0) {
                Promise.all([setStockEntrys(response?.DT)])
                // console.log(response.DT)
            } else {
                toast.error(response?.EM)
            }
        }
        fetchStockEntrys()
    }, [currentPage, currentLimit])

    const handleNavigateToProductViewPage = (productId) => {
        history.push('/manage-inventory/products/' + productId)
    }

    return (
        <>
            <div className='body-manage-input-warehouse'>
                <FilterHeader
                    namePage={language === LANGUAGES.EN ? 'Warehouse' : 'Tồn kho'}
                    urlNewItem={'/manage-inventory/input-warehouse'}
                    setCurrentViewProduct={setCurrentView}
                    currentView={currentView}
                    totalPageProduct={totalPage}
                    setCurrentProductPage={setCurrentPage}
                    isWarehouse={true}
                    showActions={isShowActions}
                    setShowActions={setIsShowActions}
                    listCheckedItems={listCheckedItems}
                    numberCheckedItems={numberCheckedItems}
                    urlImportProduct={'/manage-inventory/output-warehouse'}
                />


                {currentView === 'block'
                    ?
                    <div className='manage-input-warehouse-container container-fluid mt-3 ps-5 pe-5'>

                        <div className='input-warehouse-items-wrap row'>
                            {/* {products && products.length > 0 &&
                                products.map((item, index) => {
                                    return (
                                        <div key={index} className='input-warehouse-item d-flex col-4  ' onClick={() => handleNavigateToProductPage(item.productId)}>
                                            <div className='image-input-warehouse'>
                                                <img className='img-input-warehouse' src={item.image} alt='input-warehouse img' />
                                            </div>
                                            <div className='des-input-warehouse'>
                                                <span className='name-input-warehouse '><FormattedMessage id="nav.manage-inventory-product" />: {language === LANGUAGES.EN ? item.nameEn : item.nameVi}</span>
                                                <span className='barcode-input-warehouse'><MdBarcodeReader /> <FormattedMessage id="product-view-barcode" />: {item.barCode}</span>
                                                <span className='cost-input-warehouse'><FaCoins /><FormattedMessage id='nav.manage-inventory-create-product-cost' />: {formatCurrency(item.cost)}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            } */}
                        </div>

                    </div>
                    :
                    <>
                        <div className='manage-input-warehouse-container'>
                            <table className="table table-striped table-hover">
                                <thead className='table-heading'>
                                    <tr className='table-row-heading'>
                                        <th className='align-middle' style={{ backgroundColor: '#f1e3f5' }} scope="col"><input onChange={(e) => checkAllElements(e)} className='form-check-input' type="checkbox" /></th>
                                        <th className='align-middle' style={{ backgroundColor: '#f1e3f5' }} scope="col">Mã kho</th>
                                        <th className={`align-middle ${contactChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col">Sản phẩm</th>
                                        <th className={`align-middle ${personInChargeChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col">Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {tempProductsLength > 0 ? ( */}
                                    {stocks ? (
                                        (() => {
                                            // if (products.length > 0) {
                                            if (stocks.length > 0) {
                                                return stocks.map((item, index) => (
                                                    <tr key={'receipt' + index} className='hover-item'>
                                                        {allElementsChecked
                                                            ? <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" checked /></th>
                                                            : <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" /></th>
                                                        }
                                                        <td onClick={() => handleNavigateToProductViewPage(item.productData.productId)}>{item.warehouseData.warehouseId}</td>
                                                        <td onClick={() => handleNavigateToProductViewPage(item.productData.productId)} className={`${contactChecked ? '' : 'hidden'}`}>{item.productData.nameVi}</td>
                                                        <td onClick={() => handleNavigateToProductViewPage(item.productData.productId)} className={`${personInChargeChecked ? '' : 'hidden'}`}>{item.quantity}</td>
                                                    </tr>
                                                ));
                                            } else {
                                                return (
                                                    <tr>
                                                        <td colSpan="13">
                                                            <div className='text-center w-100 fw-bold'>
                                                                <span>Chưa có sản phẩm trong kho</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })()
                                    ) : (
                                        <div className='text-center w-100 fw-bold'>
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                }

            </div>
        </>
    )
}

export default Warehouse