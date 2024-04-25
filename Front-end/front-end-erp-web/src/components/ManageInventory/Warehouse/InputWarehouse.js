import React from 'react'
import './InputWarehouse.scss'
import FilterHeader from '../../FilterHeader/FilterHeader';
import { IoOptions } from "react-icons/io5";
// import {
//     useHistory
// } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getProductsPagination } from '../../../services/productServices'
import { LANGUAGES } from '../../../utils/constant'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl'

function InputWarehouse() {
    // const history = useHistory();
    const [currentView, setCurrentView] = useState('list')
    const [currentLimit] = useState(16)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const [products, setProducts] = useState([])
    const tempProductsLength = 1
    const language = useSelector(state => state.language.value)

    // Checkbox
    const [isOpenDropdownFilter, setIsOpenDropdownFilter] = useState(false)

    const [contactChecked, setContactChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setContactChecked(event.target.checked);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProductsPagination(currentPage, currentLimit)
            if (response.EC === 0 && response?.DT?.products.length > 0) {
                Promise.all([setProducts(response?.DT?.products), setTotalPage(response?.DT?.totalPage)])
            } else {
                toast.error(response?.EM)
            }
        }

        fetchProducts()
    }, [currentPage, currentLimit])


    // const handleNavigateToProductPage = (productId) => {
    //     history.push('/manage-inventory/products/' + productId)
    // }

    return (
        <>
            <div className='body-manage-input-warehouse'>
                <FilterHeader
                    namePage={language === LANGUAGES.EN ? 'Receipts' : 'Phiếu nhập kho'}
                    urlNewItem={'/manage-inventory/products/create'}
                    setCurrentViewProduct={setCurrentView}
                    currentView={currentView}
                    totalPageProduct={totalPage}
                    setCurrentProductPage={setCurrentPage}
                    urlImportProduct={'/manage-inventory/products/import'}
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
                                        <th className='align-middle' style={{ backgroundColor: '#f1e3f5' }} scope="col"><input type="checkbox" /></th>
                                        <th className='align-middle' style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-reference-code" /></th>
                                        <th className={`align-middle ${contactChecked ? '' : 'hidden'}`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-contact" /></th>
                                        <th className={`align-middle`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-person-in-charge" /></th>
                                        <th className={`align-middle`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-planned-date" /></th>
                                        <th className={`align-middle`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-product-availabilty" /></th>
                                        <th className={`align-middle`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-deadline" /></th>
                                        <th className={`align-middle`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-effective-date" /></th>
                                        <th className={`align-middle`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-original-document" /></th>
                                        <th className={`align-middle`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-order-delay-of" /></th>
                                        <th className={`align-middle`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-activity-type" /></th>
                                        <th className={`align-middle`} style={{ backgroundColor: '#f1e3f5' }} scope="col"><FormattedMessage id="inventory-reiceipt-status" /></th>

                                        <th className='align-middle' style={{ backgroundColor: '#f1e3f5' }} scope="col"><IoOptions className='hover-item fs-4' onClick={() => setIsOpenDropdownFilter(!isOpenDropdownFilter)} />
                                            <div className={`dropdown-setting shadow rounded ${isOpenDropdownFilter ? '' : 'hidden'}`}>
                                                <div className='item'><label className='w-100'>
                                                    <input className="form-check-input ms-2" type="checkbox" value=""
                                                        checked={contactChecked}
                                                        onChange={handleCheckboxChange}
                                                        aria-label="Checkbox for following text input" />
                                                    <FormattedMessage id="inventory-reiceipt-contact" />
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                                    <FormattedMessage id="inventory-reiceipt-person-in-charge" />
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                                    <FormattedMessage id="inventory-reiceipt-planned-date" />
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                                    <FormattedMessage id="inventory-reiceipt-product-availabilty" />
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                                    <FormattedMessage id="inventory-reiceipt-deadline" />
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                                    <FormattedMessage id="inventory-reiceipt-effective-date" />
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                                    <FormattedMessage id="inventory-reiceipt-original-document" />
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                                    <FormattedMessage id="inventory-reiceipt-order-delay-of" />
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                                    <FormattedMessage id="inventory-reiceipt-activity-type" />
                                                </label></div>

                                                <div className='mt-2 item'><label className="w-100">
                                                    <input className="form-check-input ms-2" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                                    <FormattedMessage id="inventory-reiceipt-status" />
                                                </label></div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {products && products.length > 0 ? ( */}
                                    {tempProductsLength > 0 ? (
                                        (() => {
                                            // if (products.length > 0) {
                                            if (tempProductsLength > 0) {
                                                return <>
                                                    <tr className='hover-item'>
                                                        <th scope="row"><input type="checkbox" /></th>
                                                        <td>ET001</td>
                                                        <td className={`${contactChecked ? '' : 'hidden'}`}>0123456789</td>
                                                        <td className={``}>Nguyễn Tiến Đạt</td>
                                                        <td className={``}>08/01/2024</td>
                                                        <td className={``}></td>
                                                        <td className={``}></td>
                                                        <td className={``}>11/04/2024 05:59:32</td>
                                                        <td className={``}>Bổ sung thủ công</td>
                                                        <td className={``}></td>
                                                        <td className={``}>Tôn Đức Thắng erp: Phiếu nhập kho</td>
                                                        <td className={``}>Hoàn tất</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr className='hover-item'>
                                                        <th scope="row"><input type="checkbox" /></th>
                                                        <td>ET001</td>
                                                        <td className={`${contactChecked ? '' : 'hidden'}`}>0123456789</td>
                                                        <td className={``}>Nguyễn Tiến Đạt</td>
                                                        <td className={``}>08/01/2024</td>
                                                        <td className={``}></td>
                                                        <td className={``}></td>
                                                        <td className={``}>11/04/2024 05:59:32</td>
                                                        <td className={``}>Bổ sung thủ công</td>
                                                        <td className={``}></td>
                                                        <td className={``}>Tôn Đức Thắng erp: Phiếu nhập kho</td>
                                                        <td className={``}>Hoàn tất</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr className='hover-item'>
                                                        <th scope="row"><input type="checkbox" /></th>
                                                        <td>ET001</td>
                                                        <td className={`${contactChecked ? '' : 'hidden'}`}>0123456789</td>
                                                        <td className={``}>Nguyễn Tiến Đạt</td>
                                                        <td className={``}>08/01/2024</td>
                                                        <td className={``}></td>
                                                        <td className={``}></td>
                                                        <td className={``}>11/04/2024 05:59:32</td>
                                                        <td className={``}>Bổ sung thủ công</td>
                                                        <td className={``}></td>
                                                        <td className={``}>Tôn Đức Thắng erp: Phiếu nhập kho</td>
                                                        <td className={``}>Hoàn tất</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr className='hover-item'>
                                                        <th scope="row"><input type="checkbox" /></th>
                                                        <td>ET001</td>
                                                        <td className={`${contactChecked ? '' : 'hidden'}`}>0123456789</td>
                                                        <td className={``}>Nguyễn Tiến Đạt</td>
                                                        <td className={``}>08/01/2024</td>
                                                        <td className={``}></td>
                                                        <td className={``}></td>
                                                        <td className={``}>11/04/2024 05:59:32</td>
                                                        <td className={``}>Bổ sung thủ công</td>
                                                        <td className={``}></td>
                                                        <td className={``}>Tôn Đức Thắng erp: Phiếu nhập kho</td>
                                                        <td className={``}>Hoàn tất</td>
                                                        <td></td>
                                                    </tr>
                                                </>
                                                // return products.map((item, index) => (
                                                //     <tr onClick={() => handleNavigateToProductPage(item.productId)} key={'product' + index} className='hover-item'>
                                                //         <th scope="row">{index + 1}</th>
                                                //         <td>{language === LANGUAGES.EN ? item.nameEn : item.nameVi}</td>
                                                //         <td>{item.productId}</td>
                                                //         <td>{language === LANGUAGES.EN ? item?.typeData?.valueEn : item?.typeData?.valueVi}</td>
                                                //         <td>{language === LANGUAGES.EN ? item?.groupData?.valueEn : item?.groupData?.valueVi}</td>
                                                //         <td>{item.cost}</td>
                                                //         <td>{language === LANGUAGES.EN ? item?.unitData?.valueEn : item?.unitData?.valueVi}</td>
                                                //     </tr>
                                                // ));
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