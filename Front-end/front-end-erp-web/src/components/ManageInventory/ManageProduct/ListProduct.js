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
import { getProductsPagination } from '../../../services/inventoryServices'
import { LANGUAGES } from '../../../utils/constant'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl'
import { v4 as uuidv4 } from 'uuid';
import { Empty } from 'antd';

function ListProduct() {
    // const location = useLocation();
    const history = useHistory();
    // const url = location.pathname;
    const [currentView, setCurrentView] = useState('block')
    const [currentLimit] = useState(16)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [searchProduct, setSearchProduct] = useState("")
    // const queryParams = new URLSearchParams(location.search);
    // console.log(queryParams.get('type'))

    const [products, setProducts] = useState([])
    const language = useSelector(state => state.language.value)

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProductsPagination(currentPage, currentLimit)
            if (response.EC === 0 && response?.DT?.products.length > 0) {
                Promise.all([setProducts(response?.DT?.products), setTotalPage(response?.DT?.totalPage)])
            } else {
                toast.error(response?.EM)
            }
        }

        fetchProducts()
    }, [currentPage, currentLimit])

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
                    totalPageProduct={totalPage}
                    setCurrentProductPage={setCurrentPage}
                    urlImportProduct={'/manage-inventory/products/import'}
                    changeSearchProduct={setSearchProduct}
                />


                {currentView === 'block'
                    ?
                    <div className='manage-products-container container-fluid mt-3 ps-5 pe-5'>

                        <div className='product-items-wrap row'>

                            {
                                products && products.length > 0 ?
                                    (
                                        (() => {
                                            const filteredProducts = products.filter((item) => {
                                                return searchProduct.toLowerCase() === '' ||
                                                    (item?.nameVi.toLowerCase().includes(searchProduct.toLowerCase()) ||
                                                        (item?.barCode.toString()).toLowerCase().includes(searchProduct.toLowerCase()));
                                            })

                                            if (filteredProducts.length > 0) {
                                                return filteredProducts.map((item, index) => (
                                                    <div key={index} className='product-item d-flex col-4' onClick={() => handleNavigateToProductPage(item.productId)}>
                                                        <div className='image-product'>
                                                            <img className='img-product' src={item.image} alt='product img' />
                                                        </div>
                                                        <div className='des-product'>
                                                            <span className='name-product '><FormattedMessage id="nav.manage-inventory-product" />: {language === LANGUAGES.EN ? item.nameEn : item.nameVi}</span>
                                                            <span className='barcode-product'><MdBarcodeReader /> <FormattedMessage id="product-view-barcode" />: {item.barCode}</span>
                                                            <span className='cost-product'><FaCoins /><FormattedMessage id='nav.manage-inventory-create-product-cost' />: {formatCurrency(item.cost)}</span>
                                                        </div>
                                                    </div>
                                                )
                                                )
                                            } else {
                                                return (
                                                    <tr>
                                                        <td colSpan="6">
                                                            <div className='text-center w-100 fw-medium'>
                                                                <span>Không tìm thấy sản phẩm</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })()
                                    )
                                    :
                                    <tr >
                                        <td colSpan={6}>
                                            <Empty />
                                        </td>
                                    </tr>
                            }
                        </div>

                    </div>
                    :
                    <>
                        <div className='manage-products-container'>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Mã sản phẩm</th>
                                        <th scope="col"> <span className='hover-item'><FormattedMessage id="product-view-name" /></span></th>
                                        <th scope="col"><FormattedMessage id="product-view-barcode" /></th>
                                        <th scope="col"><FormattedMessage id="product-view-type" /></th>
                                        <th scope="col"><FormattedMessage id="product-view-group" /></th>
                                        <th scope="col"><FormattedMessage id="product-view-cost" /></th>
                                        <th scope="col"><FormattedMessage id="product-view-unit" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products && products.length > 0 ?
                                            (
                                                (() => {
                                                    const filteredProducts = products.filter((item) => {
                                                        return searchProduct.toLowerCase() === '' ||
                                                            (item?.nameVi.toLowerCase().includes(searchProduct.toLowerCase()) ||
                                                                (item?.barCode.toString()).toLowerCase().includes(searchProduct.toLowerCase()));
                                                    })

                                                    if (filteredProducts.length > 0) {
                                                        return filteredProducts.map((item, index) => (
                                                            <tr onClick={() => handleNavigateToProductPage(item.productId)} key={'product' + index} className='hover-item'>
                                                                <th scope="row">{item.productId}</th>
                                                                <td>{language === LANGUAGES.EN ? item.nameEn : item.nameVi}</td>
                                                                <td>{item.barCode}</td>
                                                                <td>{language === LANGUAGES.EN ? item?.typeData?.valueEn : item?.typeData?.valueVi}</td>
                                                                <td>{language === LANGUAGES.EN ? item?.groupData?.valueEn : item?.groupData?.valueVi}</td>
                                                                <td>{item.cost}</td>
                                                                <td>{language === LANGUAGES.EN ? item?.unitData?.valueEn : item?.unitData?.valueVi}</td>
                                                            </tr>
                                                        )
                                                        )
                                                    } else {
                                                        return (
                                                            <tr>
                                                                <td colSpan="6">
                                                                    <div className='text-center w-100 fw-medium'>
                                                                        <span>Không tìm thấy sản phẩm</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                })()
                                            )
                                            :
                                            <tr >
                                                <td colSpan={6}>
                                                    <Empty />
                                                </td>
                                            </tr>
                                    }

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