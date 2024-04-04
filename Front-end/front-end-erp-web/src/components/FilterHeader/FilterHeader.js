import React from 'react'
import './FilterHeader.scss'
import { IoFilterSharp } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { HiSquares2X2 } from "react-icons/hi2";
import { MdViewList } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useIntl } from 'react-intl'
import { useHistory, useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { NavLink } from "react-router-dom";
import { useState } from 'react'
import ReactPaginate from 'react-paginate';


function FilterHeader(props) {
    const intl = useIntl();
    const history = useHistory()
    const location = useLocation();
    const url = location.pathname;
    const isNoneAction = (location.pathname === '/manage-inventory')
    const [inputSearch, setInputSearch] = useState('')

    const handleCreateNewItem = () => {
        history.push(props.urlNewItem ? props.urlNewItem : '/home')
    }

    const handleChangeFilter = (e) => {
        setInputSearch(e.target.value)
        if (props?.changeSearchEmployee) {
            props?.changeSearchEmployee(e.target.value)
        }
    }

    const handleChangeView = (value) => {
        if (props?.setCurrentViewEmployee) {
            props?.setCurrentViewEmployee(value)
        }
    }

    const handlePageClick = async (e) => {
        if (props?.setCurrentEmployeePage) {
            props?.setCurrentEmployeePage(+e.selected + 1)
        }
    };

    return (
        <div className='filter-create-item'>
            <div className='content-left-item'>
                <span className='title-create-item'>{props?.namePage}</span>
                <div className='action-import d-flex'>
                    {isNoneAction
                        ? ''
                        : <>
                            <button onClick={() => handleCreateNewItem()} className='btn btn-primary btn-create-item'><FormattedMessage id='filter-header.create' /></button>
                            <NavLink to='/manage-accounts/import' className='ms-1 btn btn-outline-secondary'><FormattedMessage id='filter-header.import' /></NavLink>
                        </>}
                </div>
            </div>
            <div className='search-input-wrap d-flex flex-column'>
                <div className='d-flex form-control item-search'>
                    <input value={inputSearch} onChange={(e) => handleChangeFilter(e)} type='text' className='input-search-text' placeholder={intl.formatMessage({ id: "homepage.search" })} />
                    <span className="icon-search"><FaSearch /></span>
                </div>
                <div className={props?.totalPageEmployee ? 'advance-filter d-flex justify-content-between mt-1' : 'advance-filter d-flex justify-content-end mt-1'}>
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
                    <div className='view-options d-flex'>
                        <div onClick={() => handleChangeView('block')} className={props?.currentView === 'block' ? 'view-option-rectangle active' : 'view-option-rectangle'}>
                            <HiSquares2X2 />
                        </div>
                        <div onClick={() => handleChangeView('list')} className={props?.currentView === 'list' ? 'view-option-rows active' : 'view-option-rows'}>
                            <MdViewList />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default FilterHeader