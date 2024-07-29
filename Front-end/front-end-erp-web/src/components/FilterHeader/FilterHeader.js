import React from 'react'
import './FilterHeader.scss'
import { HiSquares2X2 } from "react-icons/hi2";
import { MdViewList } from "react-icons/md";
import { IoCloseSharp, IoSettingsSharp } from "react-icons/io5";
import { FaSearch, FaUpload } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { useIntl } from 'react-intl'
import { useHistory, useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { NavLink } from "react-router-dom";
import { useState } from 'react'
import ReactPaginate from 'react-paginate';
import { path } from '../../utils/constant'

function FilterHeader(props) {
    const intl = useIntl();
    const history = useHistory()
    const location = useLocation();
    const isNoneAction = (location.pathname === '/manage-inventory')
    const [inputSearch, setInputSearch] = useState('')


    const handleCreateNewItem = () => {
        if (location?.pathname === path.SALE_PRODUCTS) {
            history.push(path.SALE_CREATE_PRODUCT)
        } else {
            history.push(props.urlNewItem ? props.urlNewItem : '/home')
        }
    }

    const handleChangeFilter = (e) => {
        setInputSearch(e.target.value)
        if (props?.changeSearchEmployee) {
            props?.changeSearchEmployee(e.target.value)
        } else if (props?.changeSearchDepartment) {
            props?.changeSearchDepartment(e.target.value)
        }
    }

    const handleChangeView = (value) => {
        if (props?.setCurrentViewEmployee) {
            props?.setCurrentViewEmployee(value)
        }
        if (props?.setCurrentViewProduct) {
            props?.setCurrentViewProduct(value)
        }
    }

    const handlePageClick = async (e) => {
        if (props?.setCurrentEmployeePage) {
            props?.setCurrentEmployeePage(+e.selected + 1)
        }
        if (props?.setCurrentProductPage) {
            props?.setCurrentProductPage(+e.selected + 1)
        }
    };

    return (
        <div className='filter-create-item'>
            {props?.hiddenBtnImport
                ?
                <div className='content-left-item d-flex align-items-center gap-1'>
                    <div className='action-import d-flex' >
                        {isNoneAction
                            ? ''
                            : <>
                                <button onClick={() => handleCreateNewItem()} className='btn btn-primary btn-create-item'><FormattedMessage id='filter-header.create' /></button>
                            </>}
                    </div>
                    <span className='title-create-item'>{props?.namePage}</span>
                </div>
                :
                <div className='content-left-item'>
                    <span className='title-create-item'>{props?.namePage}</span>
                    <div className='action-import d-flex' >
                        {isNoneAction
                            ? ''
                            : <>
                                {props.isWarehouse
                                    ? <>
                                        <button onClick={() => handleCreateNewItem()} className='btn btn-primary btn-create-item'>Nhập kho</button>
                                        <NavLink to={props?.urlImportProduct ? props.urlImportProduct : '/manage-accounts/import'} className='ms-1 btn btn-outline-secondary'>Xuất kho</NavLink>

                                    </>
                                    : <>
                                        <button onClick={() => handleCreateNewItem()} className='btn btn-primary btn-create-item'><FormattedMessage id='filter-header.create' /></button>
                                        {
                                            location?.pathname === path.SALE_PRODUCTS
                                                ?
                                                <NavLink to={'/sale-order/products/import'} className='ms-1 btn btn-outline-secondary'><FormattedMessage id='filter-header.import' /></NavLink>
                                                :
                                                <NavLink to={props?.urlImportProduct ? props.urlImportProduct : '/manage-accounts/import'} className='ms-1 btn btn-outline-secondary'><FormattedMessage id='filter-header.import' /></NavLink>
                                        }
                                    </>
                                }

                            </>}
                    </div>
                </div>
            }
            {props?.showActions && props?.currentView === 'list'
                ? <div className='m-auto'>
                    <div className="container text-center">
                        <div className="row">
                            <div className="col border border-1 text-nowrap pt-1 pb-1 me-1">
                                {props?.numberCheckedItems} đã chọn <IoCloseSharp size={18} />
                            </div>
                            <div className="col border border-1 text-nowrap me-1 pt-1 pb-1">
                                <CSVLink style={{ textDecoration: 'none', color: 'black' }} data={props.listCheckedItems} filename={"export_data_receipts.csv"}>
                                    <FaUpload size={14} /> Xuất
                                </CSVLink>
                            </div>
                            <div className="col border border-1 text-nowrap pt-1 pb-1">
                                <IoSettingsSharp /> Hành động
                            </div>
                        </div>
                    </div>
                </div>
                : ''
            }

            <div className={props?.hiddenBtnImport ? 'search-input-wrap d-flex flex-column h-60' : 'search-input-wrap d-flex flex-column'}>
                <div className='d-flex form-control item-search'>
                    <input value={inputSearch} onChange={(e) => handleChangeFilter(e)} type='text' className='input-search-text' placeholder={intl.formatMessage({ id: "homepage.search" })} />
                    <span className="icon-search"><FaSearch /></span>
                </div>
                <div className={props?.totalPageEmployee ? 'advance-filter d-flex justify-content-between mt-1' : 'advance-filter d-flex justify-content-between mt-1'}>
                    {props?.totalPageEmployee > 0 &&
                        <ReactPaginate
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={2}
                            pageCount={props?.totalPageEmployee}
                            previousLabel="<"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    }
                    {props?.totalPageProduct > 0 &&
                        <ReactPaginate
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={2}
                            pageCount={props?.totalPageProduct}
                            previousLabel="<"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    }
                    {props?.hiddenViewMode ? '' :
                        <div className='view-options d-flex'>
                            <div onClick={() => handleChangeView('block')} className={props?.currentView === 'block' ? 'view-option-rectangle active' : 'view-option-rectangle'}>
                                <HiSquares2X2 />
                            </div>
                            <div onClick={() => handleChangeView('list')} className={props?.currentView === 'list' ? 'view-option-rows active' : 'view-option-rows'}>
                                <MdViewList />
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default FilterHeader