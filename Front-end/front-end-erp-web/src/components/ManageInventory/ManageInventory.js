import React from 'react'
import './ManageInventory.scss'
import FilterHeader from '../FilterHeader/FilterHeader';
import { MdBarcodeReader } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import {
    useLocation
} from "react-router-dom";
import { useEffect, useState } from 'react'
import { getAllProducts } from '../../services/productServices'
import { toast } from 'react-toastify';

function ManageInventory() {
    const location = useLocation();
    const url = location.pathname;

    const [products, setProducts] = useState([])

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
            {/* Nav manage account servive*/}
            {url === '/manage-inventory'
                ?
                <div className='body-manage-products'>
                    <FilterHeader
                        namePage={'Tổng quan'}
                    />


                </div>
                :
                ''
            }
            {/* Nav manage account by department servive*/}

            {url === '/manage-inventory/products'
                ?
                <div className='body-manage-products'>
                    <FilterHeader
                        namePage={'Sản phẩm'}
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
        </>
    )
}

export default ManageInventory