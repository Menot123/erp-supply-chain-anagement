import React from 'react'
import './InputWarehouse.scss'
import FilterHeader from '../../FilterHeader/FilterHeader';
import { IoOptions } from "react-icons/io5";
import {
    useHistory
} from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { getStockEntrys } from '../../../services/inventoryServices'
import { LANGUAGES } from '../../../utils/constant'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl'

function InputWarehouse() {
    const history = useHistory();
    const [currentView, setCurrentView] = useState('list')
    const [currentLimit] = useState(16)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

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
        const fetchStockEntrys = async () => {
            const response = await getStockEntrys()
            if (response.EC == 0) {
                Promise.all([setStockEntrys(response?.DT)])
                console.log(response.DT)
            } else {
                toast.error(response?.EM)
            }
        }

        fetchStockEntrys()
    }, [currentPage, currentLimit])

    const handleNavigateToReceiptPage = (receiptId) => {
        history.push('/manage-inventory/input-warehouse/' + receiptId)
    }

    return (
        <>
            <div className='body-manage-input-warehouse'>
                <FilterHeader
                    namePage={language === LANGUAGES.EN ? 'Receipts' : 'Phiếu nhập kho'}
                    urlNewItem={'/manage-inventory/input-warehouse/create'}
                    setCurrentViewProduct={setCurrentView}
                    currentView={currentView}
                    totalPageProduct={totalPage}
                    setCurrentProductPage={setCurrentPage}
                    showActions={isShowActions}
                    setShowActions={setIsShowActions}
                    listCheckedItems={listCheckedItems}
                    numberCheckedItems={numberCheckedItems}
                    urlImportProduct={'/manage-inventory/input-warehouse/import'}
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
                                        <th className='align-middle' style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-reference-code" /></th>
                                        <th className={`align-middle ${contactChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-contact" /></th>
                                        <th className={`align-middle ${personInChargeChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-person-in-charge" /></th>
                                        <th className={`align-middle ${plannedDateChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-planned-date" /></th>
                                        <th className={`align-middle ${productAvailabilityChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-product-availabilty" /></th>
                                        <th className={`align-middle ${deadlineChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-deadline" /></th>
                                        <th className={`align-middle ${effectiveDateChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-effective-date" /></th>
                                        <th className={`align-middle ${originalDocumentChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-original-document" /></th>
                                        <th className={`align-middle ${orderDelayOfChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-order-delay-of" /></th>
                                        <th className={`align-middle ${activityTypeChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-activity-type" /></th>
                                        <th className={`align-middle ${statusChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-status" /></th>

                                        <th ref={dropdownFilterRef} className='align-middle' style={{ backgroundColor: '#f1e3f5' }} scope="col"><IoOptions className='hover-item fs-4' onClick={() => setIsOpenDropdownFilter(!isOpenDropdownFilter)} />
                                            <div className={`dropdown-setting shadow rounded ${isOpenDropdownFilter ? '' : 'hidden'}`}>
                                                <div className='item'><label className='w-100'>
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={contactChecked}
                                                        onChange={() => { setContactChecked(!contactChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-contact" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={personInChargeChecked}
                                                        onChange={() => { setPersonInChargeChecked(!personInChargeChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-person-in-charge" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={plannedDateChecked}
                                                        onChange={() => { setplannedDateChecked(!plannedDateChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-planned-date" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={productAvailabilityChecked}
                                                        onChange={() => { setProductAvailabilityChecked(!productAvailabilityChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-product-availabilty" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={deadlineChecked}
                                                        onChange={() => { setDeadlineChecked(!deadlineChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-deadline" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={effectiveDateChecked}
                                                        onChange={() => { setEffectiveDateChecked(!effectiveDateChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-effective-date" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={originalDocumentChecked}
                                                        onChange={() => { setOriginalDocumentChecked(!originalDocumentChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-original-document" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={orderDelayOfChecked}
                                                        onChange={() => { setOrderDelayOfChecked(!orderDelayOfChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-order-delay-of" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={activityTypeChecked}
                                                        onChange={() => { setActivityTypeChecked(!activityTypeChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-activity-type" /></span>
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={statusChecked}
                                                        onChange={() => { setStatusChecked(!statusChecked) }}
                                                        aria-label="Checkbox for following text input" />
                                                    <span style={{ marginLeft: '6px', fontWeight: 'normal' }}><FormattedMessage id="inventory-reiceipt-status" /></span>
                                                </label></div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {tempProductsLength > 0 ? ( */}
                                    {stockEntrys ? (
                                        (() => {
                                            // if (products.length > 0) {
                                            if (tempProductsLength > 0) {
                                                // return <>
                                                //     <tr className='hover-item'>
                                                //         {allElementsChecked
                                                //             ? <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" checked /></th>
                                                //             : <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" /></th>
                                                //         }

                                                //         <td>ET001</td>
                                                //         <td className={`${contactChecked ? '' : 'hidden'}`}>0123456789</td>
                                                //         <td className={`${personInChargeChecked ? '' : 'hidden'}`}>Nguyễn Tiến Đạt</td>
                                                //         <td className={`${plannedDateChecked ? '' : 'hidden'}`}>08/01/2024</td>
                                                //         <td className={`${productAvailabilityChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${deadlineChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${effectiveDateChecked ? '' : 'hidden'}`}>11/04/2024 05:59:32</td>
                                                //         <td className={`${originalDocumentChecked ? '' : 'hidden'}`}>Bổ sung thủ công</td>
                                                //         <td className={`${orderDelayOfChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${activityTypeChecked ? '' : 'hidden'}`}>Tôn Đức Thắng erp: Phiếu nhập kho</td>
                                                //         <td className={`${statusChecked ? '' : 'hidden'}`}>Hoàn tất</td>
                                                //         <td></td>
                                                //     </tr>
                                                //     <tr className='hover-item'>
                                                //         {allElementsChecked
                                                //             ? <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" checked /></th>
                                                //             : <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" /></th>
                                                //         }

                                                //         <td>ET001</td>
                                                //         <td className={`${contactChecked ? '' : 'hidden'}`}>0123456789</td>
                                                //         <td className={`${personInChargeChecked ? '' : 'hidden'}`}>Nguyễn Tiến Đạt</td>
                                                //         <td className={`${plannedDateChecked ? '' : 'hidden'}`}>08/01/2024</td>
                                                //         <td className={`${productAvailabilityChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${deadlineChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${effectiveDateChecked ? '' : 'hidden'}`}>11/04/2024 05:59:32</td>
                                                //         <td className={`${originalDocumentChecked ? '' : 'hidden'}`}>Bổ sung thủ công</td>
                                                //         <td className={`${orderDelayOfChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${activityTypeChecked ? '' : 'hidden'}`}>Tôn Đức Thắng erp: Phiếu nhập kho</td>
                                                //         <td className={`${statusChecked ? '' : 'hidden'}`}>Hoàn tất</td>
                                                //         <td></td>
                                                //     </tr>
                                                //     <tr className='hover-item'>
                                                //         {allElementsChecked
                                                //             ? <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" checked /></th>
                                                //             : <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" /></th>
                                                //         }

                                                //         <td>ET001</td>
                                                //         <td className={`${contactChecked ? '' : 'hidden'}`}>0123456789</td>
                                                //         <td className={`${personInChargeChecked ? '' : 'hidden'}`}>Nguyễn Tiến Đạt</td>
                                                //         <td className={`${plannedDateChecked ? '' : 'hidden'}`}>08/01/2024</td>
                                                //         <td className={`${productAvailabilityChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${deadlineChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${effectiveDateChecked ? '' : 'hidden'}`}>11/04/2024 05:59:32</td>
                                                //         <td className={`${originalDocumentChecked ? '' : 'hidden'}`}>Bổ sung thủ công</td>
                                                //         <td className={`${orderDelayOfChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${activityTypeChecked ? '' : 'hidden'}`}>Tôn Đức Thắng erp: Phiếu nhập kho</td>
                                                //         <td className={`${statusChecked ? '' : 'hidden'}`}>Hoàn tất</td>
                                                //         <td></td>
                                                //     </tr>
                                                //     <tr className='hover-item'>
                                                //         {allElementsChecked
                                                //             ? <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" checked /></th>
                                                //             : <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" /></th>
                                                //         }

                                                //         <td>ET001</td>
                                                //         <td className={`${contactChecked ? '' : 'hidden'}`}>0123456789</td>
                                                //         <td className={`${personInChargeChecked ? '' : 'hidden'}`}>Nguyễn Tiến Đạt</td>
                                                //         <td className={`${plannedDateChecked ? '' : 'hidden'}`}>08/01/2024</td>
                                                //         <td className={`${productAvailabilityChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${deadlineChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${effectiveDateChecked ? '' : 'hidden'}`}>11/04/2024 05:59:32</td>
                                                //         <td className={`${originalDocumentChecked ? '' : 'hidden'}`}>Bổ sung thủ công</td>
                                                //         <td className={`${orderDelayOfChecked ? '' : 'hidden'}`}></td>
                                                //         <td className={`${activityTypeChecked ? '' : 'hidden'}`}>Tôn Đức Thắng erp: Phiếu nhập kho</td>
                                                //         <td className={`${statusChecked ? '' : 'hidden'}`}>Hoàn tất</td>
                                                //         <td></td>
                                                //     </tr>
                                                // </>
                                                return stockEntrys.map((item, index) => (
                                                    <tr onClick={() => handleNavigateToReceiptPage(item.stockEntryId)} key={'receipt' + index} className='hover-item'>
                                                        {allElementsChecked
                                                            ? <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" checked /></th>
                                                            : <th scope="row"><input onChange={(e) => checkedOrUncheckedElement(e)} className='form-check-input' type="checkbox" /></th>
                                                        }
                                                        <td>{item.stockEntryId}</td>
                                                        <td className={`${contactChecked ? '' : 'hidden'}`}>{item.providerId}</td>
                                                        <td className={`${personInChargeChecked ? '' : 'hidden'}`}>{item.userId}</td>
                                                        <td className={`${plannedDateChecked ? '' : 'hidden'}`}>{item.scheduledDate}</td>
                                                        <td className={`${productAvailabilityChecked ? '' : 'hidden'}`}></td>
                                                        <td className={`${deadlineChecked ? '' : 'hidden'}`}></td>
                                                        <td className={`${effectiveDateChecked ? '' : 'hidden'}`}>{item.createdAt}</td>
                                                        <td className={`${originalDocumentChecked ? '' : 'hidden'}`}>Bổ sung thủ công</td>
                                                        <td className={`${orderDelayOfChecked ? '' : 'hidden'}`}></td>
                                                        <td className={`${activityTypeChecked ? '' : 'hidden'}`}>{item.warehouseId}: Phiếu nhập kho</td>
                                                        <td className={`${statusChecked ? '' : 'hidden'}`}>{item.status}</td>
                                                        <td></td>
                                                    </tr>
                                                ));
                                            } else {
                                                return (
                                                    <tr>
                                                        <td colSpan="13">
                                                            <div className='text-center w-100 fw-bold'>
                                                                <span>Chưa có phiếu nhập kho</span>
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

export default InputWarehouse