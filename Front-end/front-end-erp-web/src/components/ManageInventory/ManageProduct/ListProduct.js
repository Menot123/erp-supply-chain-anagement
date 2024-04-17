import React from 'react'
import './ListProduct.scss'
import FilterHeader from '../../FilterHeader/FilterHeader';
import { MdBarcodeReader } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import {
    useHistory
} from "react-router-dom";
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../services/productServices'
import { LANGUAGES } from '../../../utils/constant'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl'

function ListProduct() {
    // const location = useLocation();
    const history = useHistory();
    // const url = location.pathname;
    const [currentView, setCurrentView] = useState('block')
    // const queryParams = new URLSearchParams(location.search);
    // console.log(queryParams.get('type'))

    const [products, setProducts] = useState([])
    const language = useSelector(state => state.language.value)

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getAllProducts()
            if (+response.EC === 0) {
                setProducts(response.DT)
            } else {
                toast.error(response.EM)
            }
        }

        fetchProducts()
    }, [])

    const formatCurrency = (number) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });

        const formattedNumber = formatter.format(number);
        const modifiedResult = formattedNumber.replace('₫', 'VNĐ');
        // console.log(formattedNumber);

        return modifiedResult;
    }

    const handleNavigateToProductPage = (productId) => {
        history.push('/manage-inventory/products/' + productId)
    }

    return (
        <>
            <div className='body-manage-products'>
                <FilterHeader
                    namePage={language === LANGUAGES.EN ? 'Product' : 'Sản phẩm'}
                    urlNewItem={'/manage-inventory/products/create'}
                    setCurrentViewProduct={setCurrentView}
                    currentView={currentView}
                />


                {currentView === 'block'
                    ?
                    <div className='manage-products-container container-fluid mt-3 ps-5 pe-5'>

                        <div className='product-items-wrap row'>
                            {products && products.length > 0 &&
                                products.map((item, index) => {
                                    return (
                                        <div key={index} className='product-item d-flex col-4  ' onClick={() => handleNavigateToProductPage(item.productId)}>
                                            <div className='image-product'>
                                                <img className='img-product' src={item.image} alt='product img' />
                                            </div>
                                            <div className='des-product'>
                                                <span className='name-product '>Sản phẩm: {item.nameVi}</span>
                                                <span className='barcode-product'><MdBarcodeReader /> Mã vạch: {item.barCode}</span>
                                                <span className='cost-product'><FaCoins /><FormattedMessage id='nav.manage-inventory-create-product-cost' />: {formatCurrency(item.cost)}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                    :
                    <>
                        <div className='manage-employees-container'>
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col"> <span className='hover-item'>Tên sản phẩm</span></th>
                                        <th scope="col">Mã sản phẩm</th>
                                        <th scope="col">Loại sản phẩm</th>
                                        <th scope="col">Nhóm sản phẩm</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Đơn vị tính</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products && products.length > 0 ? (
                                        (() => {
                                            if (products.length > 0) {
                                                return products.map((item, index) => (
                                                    <tr onClick={() => handleNavigateToProductPage(item.productId)} key={'product' + index} className='hover-item'>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{language === LANGUAGES.EN ? item.nameEn : item.nameVi}</td>
                                                        <td>{item.productId}</td>
                                                        <td>{item.type}</td>
                                                        <td>{item.group}</td>
                                                        <td>{item.cost}</td>
                                                        <td>{item.unit}</td>
                                                    </tr>
                                                ));
                                            } else {
                                                return (
                                                    <tr>
                                                        <td colSpan="6">
                                                            <div className='text-center w-100 fw-bold'>
                                                                <span>Không có sản phẩm</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })()
                                    ) : (
                                        <div className='text-center w-100 fw-bold'>
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                }

            </div>
        </>
    )
}

export default ListProduct