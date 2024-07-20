import React from 'react'
import './ManageInventory.scss'
import FilterHeader from '../FilterHeader/FilterHeader';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../utils/constant'

function ManageInventory() {
    const language = useSelector(state => state.language.value)

    return (
        <>
            <div className='body-manage-products'>
                <FilterHeader
                    namePage={language === LANGUAGES.EN ? 'Overview' : 'Tổng quan'}
                    isNoneAction={true}
                    hiddenBtnImport={true}
                />

                <div className='manage-products-container container-fluid mt-3 ps-5 pe-5'>
                    <div className='product-items-wrap row'>

                        <div className='product-item d-flex col-4  '>
                            <div className='sumary-title'>
                                Nhận hàng
                            </div>
                            <div className='sumary-title'>
                                <button type="button" className='btn btn-primary'>0 để xử lý</button>
                            </div>
                        </div>

                        <div className='product-item d-flex col-4  '>
                            <div className='sumary-title'>
                                Trả hàng
                            </div>
                            <div className='sumary-title'>
                                <button type="button" className='btn btn-primary'>0 để xử lý</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ManageInventory