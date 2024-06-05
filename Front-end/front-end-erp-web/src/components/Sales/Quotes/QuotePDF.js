import React, { useEffect, useState, useMemo } from 'react'
import { IoMdMail } from "react-icons/io";
import { Table } from 'antd';

export const QuotePDF = (props) => {

    const [dataProducts, setDataProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [taxTotals, setTaxTotals] = useState({});

    const memoizedProductName = useMemo(() => props?.dataQuote?.productList, [props?.dataQuote?.productList]);

    const buildDataTableProduct = (products) => {
        let dataProducts = []
        if (products.length > 0) {
            products.map((product, index) => {
                return dataProducts.push({
                    key: index,
                    product: product?.name,
                    quantity: product?.quantity,
                    price: product?.price,
                    tax: 'Thuế GTGT phải nộp ' + product?.tax?.label,
                    total: product?.priceBeforeTax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                })
            })
        }
        return dataProducts
    }

    const calculateTotalPrice = () => {
        let totalBeforeTax = 0
        let totalPrice = 0
        if (props?.dataQuote?.productList && props?.dataQuote?.productList.length > 0) {
            props?.dataQuote?.productList.forEach(item => {
                totalBeforeTax += +item.priceBeforeTax;
                totalPrice += +item.priceBeforeTax + (+item?.priceBeforeTax * +item?.tax?.value / 100)
            });
        }
        Promise.all([setTotalPrice(totalBeforeTax), setFinalPrice(totalPrice)])
    };

    const calculateTaxTotals = () => {
        const totals = {};
        props?.dataQuote?.productList.forEach(item => {
            if (item?.tax && item?.tax?.value !== 0) {
                const taxValue = +item?.priceBeforeTax * +item?.tax.value / 100;
                if (totals[item?.tax.value]) {
                    totals[item?.tax.value] += taxValue;
                } else {
                    totals[item?.tax.value] = taxValue;
                }
            }
        });
        setTaxTotals(totals);
    };

    useEffect(() => {
        if (props?.dataQuote?.productList && props?.dataQuote?.productList.length > 0) {
            let productsBuild = buildDataTableProduct(props?.dataQuote?.productList)
            setDataProducts(productsBuild)
            calculateTaxTotals();
            calculateTotalPrice();
        }

    }, [props?.dataQuote?.productList]);


    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
        },
        {
            title: 'Số lượng',
            className: 'column-quantity',
            dataIndex: 'quantity',
            align: 'center',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Thuế',
            dataIndex: 'tax',
        },
        {
            title: 'Số tiền',
            dataIndex: 'total',
        },
    ];


    function getCurrentDate() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
        const currentDay = currentDate.getDate();

        return `${currentYear}/${currentMonth}/${currentDay}`;
    }


    return (
        // <div className='wrapper-quote-pdf'>
        //     <div className='logo-company'>
        //         <img alt='img-logo-company' src='' />
        //     </div>

        //     <hr />

        //     <div className='title-quote'>
        //         <h3>Báo giá # S00011</h3>
        //     </div>

        //     <div className='wrap-content-quote'>
        //         <div className='content-items'>
        //             <span className='label-content'>Ngày báo giá</span>
        //             <span className='text-content'>21/05/2024</span>
        //         </div>

        //         <div className='content-items'>
        //             <span className='label-content'>Ngày hết hạn</span>
        //             <span className='text-content'>20/06/2024</span>
        //         </div>

        //         <div className='content-items'>
        //             <span className='label-content'>Nhân viên kinh doanh</span>
        //             <span className='text-content'>Huỳnh Khánh Duy</span>
        //         </div>

        //         <div className='content-items'>
        //             <span className='label-content'>Diễn giải</span>
        //             <span className='text-content'>sp1</span>
        //         </div>

        //         <div className='content-items'>
        //             <span className='label-content'>Số lượng</span>
        //             <span className='text-content'>1,00 Đơn vị </span>
        //         </div>

        //         <div className='content-items'>
        //             <span className='label-content'>Đơn giá</span>
        //             <span className='text-content'>100.000,00</span>
        //         </div>

        //         <div className='content-items'>
        //             <span className='label-content'>Thuế</span>
        //             <span className='text-content'>Value Added Tax (VAT) 10%</span>
        //         </div>

        //         <div className='content-items'>
        //             <span className='label-content'>Số tiền</span>
        //             <span className='text-content'>100.000 ₫</span>
        //         </div>
        //     </div>
        // </div>

        <div ref={props?.componentPDF} style={{ width: '100%', }} >
            {/* position: 'absolute', left: '-2000px' */}
            <h2>Báo giá - S00003</h2>
            <div className='wrap-inf-quote d-flex gap-4'>
                <div className='inf-selling w-50 '>
                    <h5>Thông tin bán hàng</h5>
                    <hr className='mt-1 mb-2' />
                    <div className='date-created d-flex'>
                        <span className='label-date me-2'>Ngày:</span>
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className='date-expiration d-flex'>
                        <span className='label-date me-2'>Ngày hết hạn:</span>
                        <span>{props?.dataQuote?.expirationDay}</span>
                    </div>
                </div>

                <div className='address-bill-delivery w-50 '>
                    <h5>Địa chỉ xuất hóa đơn và giao hàng</h5>
                    <hr className='mt-1 mb-2' />
                    <span>{props?.fullDataCustomer?.fullName}</span> <br />
                    <span><IoMdMail /> {props?.fullDataCustomer?.email}</span>
                </div>
            </div>

            <Table
                className='mt-4'
                columns={columns}
                dataSource={dataProducts}
                pagination={false}
            />

            <div className='row'>
                <div className='col-6'></div>
                <div className='col-6 wrapper-price'>
                    <div className='price-before-tax d-flex justify-content-between bottom-line'>
                        <span className='title-price-before-tax'>Số tiền trước thuế</span>
                        <span>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>

                    {
                        Object.keys(taxTotals).map((taxValue, index) => (
                            <div key={'tax-total' + index} className='tax d-flex justify-content-between bottom-line'>
                                <span>Thuế GTGT {taxValue}% : </span>
                                <span>{taxTotals[taxValue].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                        ))
                    }

                    <div className='total d-flex justify-content-between bottom-line'>
                        <span className='title-total'>Tổng</span>
                        <span>{finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>

                </div>

            </div>

            <div className='policy-condition mt-4'>
                <h5>Điều khoản & điều kiện</h5>
                <hr className='mt-1 mb-2' />
                <span>{props?.dataQuote?.policyAndCondition}</span>
            </div>

            <div className='policy-condition mt-4'>
                <h5>Điều khoản thanh toán</h5>
                <hr className='mt-1 mb-2' />
                <span>Điều khoản thanh toán: {props?.paymentPolicyToQuote}</span>
            </div>
        </div>
    )
}
