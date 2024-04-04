import React from 'react'
import './ManageInventory.scss'
import FilterHeader from '../FilterHeader/FilterHeader';
import CreateNewProduct from './CreateNewProduct';
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
            {/* Nav manage inventory servive*/}
            {url === '/manage-inventory'
                ?
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
                :
                ''
            }

            {/* Nav manage inventory by product servive*/}
            {url === '/manage-inventory/products'
                ?
                <div className='body-manage-products'>
                    <FilterHeader
                        namePage={language === LANGUAGES.EN ? 'Product' : 'Sản phẩm'}
                        urlNewItem={'/manage-inventory/products/create'}
                    />

                    <div className='manage-products-container container-fluid mt-3 ps-5 pe-5'>

                        <div className='product-items-wrap row'>
                            {products && products.length > 0 &&
                                products.map((item, index) => {
                                    return (
                                        <div key={index} className='product-item d-flex col-4  '>
                                            <div className='image-product'>
                                                <img className='img-product' src={item.image} alt='product img' />
                                            </div>
                                            <div className='des-product'>
                                                <span className='name-product '>Sản phẩm: {item.nameVi}</span>
                                                <span className='barcode-product'><MdBarcodeReader /> Mã vạch: {item.barCode}</span>
                                                <span className='cost-product'><FaCoins /> Giá: {formatCurrency(item.cost)}</span>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>

                </div>
                :
                ''
            }

            {/* Nav create product servive*/}
            {url === '/manage-inventory/products/create'
                ?
                <CreateNewProduct />
                :
                ''
            }
        </>
    )
}

export default ManageInventory