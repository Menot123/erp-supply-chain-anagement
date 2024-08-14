import React from 'react'
import '../Sales/SalesHeader/SalesHeader.scss'
import { FaSearch } from "react-icons/fa";
import { FormattedMessage, useIntl } from 'react-intl'
import { useHistory, useLocation } from 'react-router-dom'
import { FaTimes } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Dropdown, Popconfirm } from 'antd';
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteInvoices, deleteCustomer } from "../../services/saleServices"
import { toast } from 'react-toastify';
import { HiSquares2X2 } from "react-icons/hi2";
import { MdViewList } from "react-icons/md";
import { Pagination } from 'antd';


const CustomerHeader = (props) => {

    const intl = useIntl();
    const history = useHistory()
    const location = useLocation();
    const url = location.pathname;

    const handleDeleteInvoices = async (listInvoices) => {
        if (listInvoices && listInvoices.length > 0) {
            let res = {}
            res = await deleteInvoices(listInvoices)

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
                    onConfirm={() => handleDeleteInvoices(props?.selectedItems)}
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

    const handleCreateNewCustomer = () => {
        history.push('/sale-order/customers/create')
    }

    const handleChangeFilter = (e) => {
        props?.changeFilter(e.target.value)
    }

    const handleChangeView = (value) => {
        if (props?.setCurrentViewEmployee) {
            props?.setCurrentViewEmployee(value)
        }
        if (props?.setCurrentViewProduct) {
            props?.setCurrentViewProduct(value)
        }
    }

    return (
        <>
            <div className='wrapper-sales-header'>
                <>
                    <div className='wrap-content-left'>

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
                </>


                {url === '/sale-order/customers' && props?.customers && props?.customers.length > 0 &&

                    <div className='d-flex gap-1'>
                        <div className='d-flex justify-content-end pe-4'>
                            <Pagination defaultCurrent={props?.page} total={props?.totalQuotesSent} pageSize={props?.pageSize} onChange={props?.onChangePagination} />
                        </div>

                        <div className='view-options d-flex'>
                            <div onClick={() => handleChangeView('block')} className={props?.currentView === 'block' ? 'view-option-rectangle active' : 'view-option-rectangle'}>
                                <HiSquares2X2 />
                            </div>
                            <div onClick={() => handleChangeView('list')} className={props?.currentView === 'list' ? 'view-option-rows active' : 'view-option-rows'}>
                                <MdViewList />
                            </div>

                        </div>
                    </div>

                }
            </div>



        </>

    )
}

export default CustomerHeader