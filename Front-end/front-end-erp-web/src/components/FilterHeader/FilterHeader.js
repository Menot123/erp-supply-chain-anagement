import React from 'react'
import './FilterHeader.scss'
import { IoFilterSharp } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { HiSquares2X2 } from "react-icons/hi2";
import { MdViewList } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useIntl } from 'react-intl'
import { useHistory, useLocation } from 'react-router-dom'


function FilterHeader(props) {
    const intl = useIntl();
    const history = useHistory()
    const location = useLocation();
    const url = location.pathname;
    const handleCreateNewItem = () => {
        history.push(props.urlNewItem ? props.urlNewItem : '/home')
    }

    return (
        <div className='filter-create-item'>
            <div className='content-left-item'>
                <span className='title-create-item'>{props?.namePage}</span>
                <div className='action-import d-flex'>
                    <button onClick={() => handleCreateNewItem()} className='btn btn-primary btn-create-item'>Tạo</button>
                    <button className='ms-1 btn btn-outline-secondary'>Nhập</button>
                </div>
            </div>
            <div className='search-input-wrap d-flex flex-column'>
                <div className='d-flex form-control item-search'>
                    <input type='text' className='input-search-text' placeholder={intl.formatMessage({ id: "homepage.search" })} />
                    <span className="icon-search"><FaSearch /></span>
                </div>
                <div className='advance-filter d-flex justify-content-between mt-1'>
                    <div className='filter-group-by'>
                        <IoFilterSharp />
                        <span className='text-filter-by'>Nhóm theo</span>
                        <GoTriangleDown />
                    </div>
                    <div className='view-options d-flex'>
                        <div className='view-option-rectangle'>
                            <HiSquares2X2 />
                        </div>
                        <div className='view-option-rows'>
                            <MdViewList />
                        </div>

                    </div>
                </div>
            </div>

        </div>


    )
}

export default FilterHeader