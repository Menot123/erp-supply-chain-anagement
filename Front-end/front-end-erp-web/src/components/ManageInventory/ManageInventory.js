import React from 'react'
import './ManageInventory.scss'
import FilterHeader from '../FilterHeader/FilterHeader';
import CreateNewProduct from './ManageProduct/CreateNewProduct';
import { MdBarcodeReader } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import {
    useLocation
} from "react-router-dom";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../services/productServices'
import { LANGUAGES } from '../../utils/constant'
import { toast } from 'react-toastify';

function ManageInventory() {
    const location = useLocation();
    const url = location.pathname;

    const [products, setProducts] = useState([])
    const language = useSelector(state => state.language.value)

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await getAllProducts()
            if (+response.EC === 0) {
                setProducts(response.DT)
            } else {
                toast.error(response.EM)
            }
        }

        fetchEmployees()
    }, [])

    const formatCurrency = (number) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });

        return formatter.format(number);
    }

    return (
        <>
            <div className='body-manage-products'>
                <FilterHeader
                    namePage={language === LANGUAGES.EN ? 'Overview' : 'Tổng quan'}
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