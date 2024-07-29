import React, { useEffect, useState } from 'react'
import BarChart from './BarChart'
import { DatePicker, Select } from 'antd';
import { toast } from 'react-toastify';
import { getStatistic } from '../../../services/saleServices'
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

function ReportInvoice() {
    // Lấy ngày hiện tại
    const today = new Date();
    const defaultEndDate = today.toISOString().split('T')[0];

    // Lấy ngày 1 của tháng hiện tại
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const defaultStartDate = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfMonth.getDate().toString().padStart(2, '0')}`;

    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate)
    const [dataChart, setDataChart] = useState([])
    const [chartLabel, setChartLabel] = useState([])
    const [statusFilter, setStatusFilter] = useState('custom')
    const [yearFilter, setYearFilter] = useState('2024')
    const monthsOfYear = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const calculateTotals = (dateList, listInvoicePaid) => {
        // Tạo một đối tượng để lưu trữ tổng giá trị total cho từng ngày
        const totals = {};

        // Lặp qua mảng các đối tượng để tính tổng total cho từng ngày
        listInvoicePaid.forEach(item => {
            const totalValue = parseInt(item.total); // Chuyển đổi total từ string sang integer
            if (totals[item.datePaid]) {
                totals[item.datePaid] += totalValue;
            } else {
                totals[item.datePaid] = totalValue;
            }
        });

        // Tạo mảng kết quả chứa tổng giá trị total tương ứng với các ngày trong dateArray
        const result = dateList.map(date => totals[date] || 0);

        return result;
    };

    const calculateMonthlyTotals = (invoices) => {
        const monthsArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

        // Tạo một đối tượng để lưu trữ tổng giá trị total cho từng tháng
        const monthlyTotals = {};

        // Lặp qua mảng các đối tượng để tính tổng total cho từng tháng
        invoices.forEach(item => {
            const date = new Date(item.datePaid); // Tạo đối tượng Date từ chuỗi ngày
            const month = (date.getMonth() + 1).toString(); // Lấy tháng từ ngày và chuyển thành chuỗi

            if (monthlyTotals[month]) {
                monthlyTotals[month] += parseInt(item.total, 10); // Chuyển total sang số nguyên trước khi cộng
            } else {
                monthlyTotals[month] = parseInt(item.total, 10); // Chuyển total sang số nguyên trước khi khởi tạo
            }
        });

        // Tạo mảng kết quả chứa tổng giá trị total tương ứng với các tháng trong monthsArray
        const result = monthsArray.map(month => monthlyTotals[month] || 0);

        return result;
    };

    useEffect(() => {

        const buildDataChart = (dateList, listInvoicePaid) => {
            let result = ''
            if (listInvoicePaid && listInvoicePaid.length > 0 && dateList && dateList.length > 0) {
                result = calculateTotals(dateList, listInvoicePaid)
            }
            setDataChart(result)
        }

        const buildDataChartPerMonth = (listInvoicePaid) => {
            let result = ''
            if (listInvoicePaid && listInvoicePaid.length > 0) {
                result = calculateMonthlyTotals(listInvoicePaid)
            }
            setDataChart(result)
        }

        const fetchDataStatistic = async () => {
            let res = {}
            if (statusFilter === 'custom') {
                res = await getStatistic(startDate, endDate)
            } else {
                res = await getStatistic(`${yearFilter}-01-01`, `${yearFilter}-12-31`)
            }
            if (res && res?.EC === 0) {
                let arrDate = getDateArray(startDate, endDate)
                setChartLabel(arrDate)
                if (statusFilter === 'custom') {
                    buildDataChart(arrDate, res?.DT);
                } else {
                    buildDataChartPerMonth(res?.DT);
                }
            }
        }

        fetchDataStatistic()
    }, [startDate, endDate, yearFilter, statusFilter])

    const getDaysInMonth = (month) => {
        const monthIndex = new Date(`${month} 1, 2024`).getMonth();
        return new Date(2024, monthIndex + 1, 0).getDate();
    };

    const generateLabels = (month) => {
        const days = getDaysInMonth(month);
        return Array.from({ length: days }, (_, i) => i + 1);
    };

    const handleOnchangeDatePicker = (date, dateString) => {
        if (dateString && dateString.length > 1) {
            Promise.all([setStartDate(dateString[0]), setEndDate(dateString[1])])
        } else {
            toast.error("Có lỗi xảy ra khi chọn thời gian thống kê")
        }
    }

    const getDateArray = (startDate, endDate) => {
        let start = new Date(startDate);
        let end = new Date(endDate);
        let result = [];
        let currentDate = start;

        while (currentDate <= end) {
            result.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return result;
    };

    const handleChangeFilter = (value) => {
        setStatusFilter(value);
    };

    const handleOnchangeYearPicker = (year, yearString) => {
        setYearFilter(yearString)
    }

    return (
        <div className='chart container pt-4' style={{ width: 1000, height: 800 }}>
            <div className='wrapDatePicker d-flex justify-content-end gap-3'>
                <Select
                    defaultValue={statusFilter ?? 'custom'}
                    style={{
                        width: 120,
                    }}
                    onChange={handleChangeFilter}
                    options={[
                        {
                            value: 'custom',
                            label: 'Tùy chỉnh',
                        },
                        {
                            value: 'year',
                            label: 'Theo năm',
                        },
                    ]}
                />
                {statusFilter === 'custom' ?
                    <RangePicker onChange={handleOnchangeDatePicker} />
                    :
                    <DatePicker
                        onChange={handleOnchangeYearPicker}
                        picker="year"
                        value={yearFilter ? dayjs(yearFilter) : null}
                        style={{ width: '288px' }}
                    />

                }
            </div>
            <BarChart
                dataChart={dataChart}
                chartLabel={statusFilter === 'custom' ? chartLabel : monthsOfYear}
            />
        </div>

    )
}

export default ReportInvoice