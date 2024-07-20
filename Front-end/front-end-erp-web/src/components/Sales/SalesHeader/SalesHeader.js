import React from 'react'
import './SalesHeader.scss'
import { FaSearch } from "react-icons/fa";
import { FormattedMessage, useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { FaTimes } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Dropdown, Popconfirm } from 'antd';
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteQuotesSent } from "../../../services/saleServices"
import { toast } from 'react-toastify';

function SalesHeader(props) {

    const intl = useIntl();
    const history = useHistory()

    const handleDeleteQuotes = async (listQuote) => {
        if (listQuote && listQuote.length > 0) {
            const res = await deleteQuotesSent(listQuote)
            if (res?.EC === 0) {
                props?.handleUncheckAll()
                props?.reloadData()
                toast.success("Xóa thành công")
            } else {
                toast.error("Có lỗi xảy ra khi thực hiện xóa, vui lòng thử lại sau!")
            }
        }
    }

    const items = [
        {
            key: '1',
            label: (
                <Popconfirm
                    placement="topLeft"
                    title={"Tạm biệt, dữ liệu!"}
                    description={<div>
                        <span>Bạn đã sẵn sàng khiến tập dữ liệu bốc hơi hoàn toàn? Bạn có chắc chắn không?</span>
                        <p>Tập dữ liệu sẽ biến mất vĩnh viễn!</p>
                        <p>Hãy suy nghĩ kỹ trước khi nhấp vào nút 'Xóa' nhé!</p>
                    </div>}
                    okText="Xóa"
                    cancelText="Không. Hãy giữ lại"
                    onConfirm={() => handleDeleteQuotes(props?.selectedItems)}
                    okType="danger"
                >
                    <div className='d-flex align-items-center'  >

                        <FaRegTrashCan />
                        <span className='ms-1'>Xóa</span>
                    </div>
                </Popconfirm>

            ),
        }
    ];

    const handleCreateNewItem = () => {
        history.push('/sale-order/new-quote')
    }

    const handleChangeFilter = (e) => {
        props?.changeFilter(e.target.value)
    }

    return (
        <div className='wrapper-sales-header'>
            <div className='wrap-content-left'>
                <button onClick={() => handleCreateNewItem()} className='btn btn-purple btn-create-quote'><FormattedMessage id="sales-btn-new" /></button>
                <span className='title-create-item'><FormattedMessage id="sales-title-quote" /></span>

            </div>

            {props?.selectedItems?.length > 0 &&
                <>
                    <div className='d-flex align-items-center gap-2 '>
                        <div className='num-selectedItems'>
                            <span>
                                <span className='fw-bold'>{props?.selectedItems?.length}</span> đã chọn
                            </span>
                            <FaTimes className='hover-item' onClick={props?.handleUncheckAll} />
                        </div>

                        <div className='actions-selected hover-item'>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottomLeft"
                                trigger={['click']}
                            >
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <IoIosSettings />
                                    </div>
                                    <span>Hành động</span>
                                </div>

                            </Dropdown>

                        </div>
                    </div>

                </>
            }

            <div className='d-flex form-control item-search'>
                <input onChange={(e) => handleChangeFilter(e)} type='text' className='input-search-text' placeholder={intl.formatMessage({ id: "homepage.search" })} />
                <span className="icon-search"><FaSearch /></span>
            </div>
        </div>
    )
}

export default SalesHeader