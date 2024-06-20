import React, { useEffect, useState, useMemo } from 'react'
import { IoMdMail } from "react-icons/io";
import { Table } from 'antd';
import logo from '../../../assets/img/logo.png'


export const InvoicePDF = (props) => {

    const [dataProducts, setDataProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [taxTotals, setTaxTotals] = useState({});

    const memoizedProductName = useMemo(() => props?.dataInvoice?.productList, [props?.dataInvoice?.productList]);

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
        if (props?.dataInvoice?.productList && props?.dataInvoice?.productList.length > 0) {
            props?.dataInvoice?.productList.forEach(item => {
                totalBeforeTax += +item.priceBeforeTax;
                totalPrice += +item.priceBeforeTax + (+item?.priceBeforeTax * +item?.tax?.value / 100)
            });
        }
        Promise.all([setTotalPrice(totalBeforeTax), setFinalPrice(totalPrice)])
    };

    const calculateTaxTotals = () => {
        const totals = {};
        props?.dataInvoice?.productList.forEach(item => {
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
        if (props?.dataInvoice?.productList && props?.dataInvoice?.productList.length > 0) {
            let productsBuild = buildDataTableProduct(props?.dataInvoice?.productList)
            setDataProducts(productsBuild)
            calculateTaxTotals();
            calculateTotalPrice();
        }

    }, [props?.dataInvoice?.productList]);



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

    const formatDate = (dateString) => {
        let parts = dateString.split('/');
        let year = parts[0];
        let month = parts[1];
        let day = parts[2];

        // Đảm bảo tháng và ngày có hai chữ số
        month = ("0" + month).slice(-2);
        day = ("0" + day).slice(-2);

        // Kết hợp lại các phần tử thành chuỗi theo định dạng yyyy-mm-dd
        return `${year}-${month}-${day}`;
    }

    return (
        <div ref={props?.componentPDF} style={{ width: '100%', }} >
            <div className='heading-invoice d-flex justify-content-between align-items-center'>
                <h2 style={{ color: "#6464b5" }}>Hóa đơn - INV{props?.dataInvoice?.quoteId}</h2>
                <div className='wrap-img-element'>
                    <img src={logo} alt="logo company" />
                </div>
            </div>

            <div className='wrap-inf-quote d-flex gap-4'>
                <div className='inf-selling w-50 '>
                    <h5>Thông tin bán hàng</h5>
                    <hr className='mt-1 mb-2' />
                    <div className='date-created d-flex'>
                        <span className='label-date me-2'>Ngày lập hóa đơn:</span>
                        <span>{formatDate(getCurrentDate())}</span>
                    </div>
                    <div className='date-expiration d-flex'>
                        <span className='label-date me-2'>Ngày đến hạn: </span>
                        <span>{props?.dataInvoice?.expirationDay}</span>
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
                <span>{props?.dataInvoice?.policyAndCondition}</span>
            </div>

            <div className='policy-condition mt-4'>
                <h5>Điều khoản thanh toán</h5>
                <hr className='mt-1 mb-2' />
                <span>Điều khoản thanh toán: {props?.paymentPolicyToQuote}</span>
            </div>
        </div >
    )
}
