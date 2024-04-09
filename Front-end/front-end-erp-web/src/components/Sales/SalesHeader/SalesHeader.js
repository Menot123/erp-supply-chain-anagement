import React from 'react'
import './SalesHeader.scss'
import { FaSearch } from "react-icons/fa";
import { FormattedMessage, useIntl } from 'react-intl'
import ReactPaginate from 'react-paginate';


function SalesHeader() {

    const intl = useIntl();

    const handleCreateNewItem = () => {

    }

    const handleChangeFilter = () => {

    }

    return (
        <div className='wrapper-sales-header'>
            <div className='wrap-content-left'>
                <button onClick={() => handleCreateNewItem()} className='btn btn-purple btn-create-quote'><FormattedMessage id="sales-btn-new" /></button>
                <span className='title-create-item'><FormattedMessage id="sales-title-quote" /></span>

            </div>

            <div className='d-flex form-control item-search'>
                <input onChange={(e) => handleChangeFilter(e)} type='text' className='input-search-text' placeholder={intl.formatMessage({ id: "homepage.search" })} />
                <span className="icon-search"><FaSearch /></span>
            </div>

            <ReactPaginate
                nextLabel=">"
                onPageChange={'handlePageClick'}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={20}
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
        </div>
    )
}

export default SalesHeader