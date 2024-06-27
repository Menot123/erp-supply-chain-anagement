import React from 'react'
import './Accounting.scss'
import FilterHeader from '../FilterHeader/FilterHeader';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../utils/constant'

function Accounting() {
    const language = useSelector(state => state.language.value)

    return (
        <>
            <div className='body-manage-accounting'>
                <FilterHeader
                    namePage={language === LANGUAGES.EN ? 'Accounting home' : 'Trang chủ kế toán'}
                />

                <div className='manage-accounting-container container-fluid mt-3 ps-5 pe-5'>
                    <div className='accounting-items-wrap row'>

                        <div className='accounting-item d-flex col-8  '>
                            <div className='sumary-title'>
                                Hóa đơn bán hàng
                            </div>
                            <div className='sumary-title'>
                                <button type="button" className='btn btn-primary'>Hóa đơn mới</button>
                            </div>
                        </div>

                        <div className='accounting-item d-flex col-8  '>
                            <div className='sumary-title'>
                                Hóa đơn mua hàng
                            </div>
                            <div className='sumary-title'>
                                <button type="button" className='btn btn-primary'>Tải lên</button>
                            </div>
                        </div>

                        <div className='accounting-item d-flex col-8  '>
                            <div className='sumary-title'>
                                Hoạt động khác
                            </div>
                            <div className='sumary-title'>
                                <button type="button" className='btn btn-primary'>Bút toán mới</button>
                            </div>
                        </div>

                        <div className='accounting-item d-flex col-8  '>
                            <div className='sumary-title'>
                                Báo cáo
                            </div>
                            <div className='sumary-title'>
                                <button type="button" className='btn btn-primary'>Thống kê doanh thu</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Accounting