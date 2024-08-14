import React from 'react'
import './ManageInventory.scss'
import FilterHeader from '../FilterHeader/FilterHeader';
import { useSelector } from 'react-redux';
import { getStockEntrys } from '../../services/inventoryServices'
import { getStockDeliverys } from '../../services/inventoryServices'
import { useEffect, useState, useRef } from 'react'
import {
    useHistory
} from "react-router-dom";
import { LANGUAGES } from '../../utils/constant'

function ManageInventory() {
    const language = useSelector(state => state.language.value)
    const history = useHistory();
    // const [stockEntrys, setStockEntrys] = useState([])
    // const [stockDeliverys, setStockDeliverys] = useState([])
    const [countProcessEntry, setCountProcessEntry] = useState(0)
    const [countProcessDelivery, setCountProcessDelivery] = useState(0)

    const countDraftAndReadyItems = (data) => {
        const filteredItems = data.filter(item => item.status === "draft" || item.status === "ready");
        return filteredItems.length;
    };

    useEffect(() => {
        const fetchStockEntrys = async () => {
            let response = await getStockEntrys()
            // console.log('Entry ', response)
            if (response.EC == 0) {
                let countEntry = countDraftAndReadyItems(response.DT);
                setCountProcessEntry(countEntry)
                // console.log(countEntry)
            } else {
                console.log(response.EM)
            }
        }

        fetchStockEntrys()
    }, [])
    useEffect(() => {
        const fetchStockDeliverys = async () => {
            let response = await getStockDeliverys()
            // console.log('Delivery ', response)
            if (response.EC == 0) {
                let countDelivery = countDraftAndReadyItems(response.DT);
                setCountProcessDelivery(countDelivery)
                // console.log(countDelivery)
            } else {
                console.log(response.EM)
            }
        }

        fetchStockDeliverys()
    }, [])

    const handleNavigateToPage = (path) => {
        history.push(path)
    }

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

                        <div onClick={() => handleNavigateToPage('/manage-inventory/input-warehouse')} className='product-item d-flex col-4  '>
                            <div className='sumary-title'>
                                Nhận hàng
                            </div>
                            <div className='sumary-title'>
                                <button type="button" className='btn btn-primary'>{countProcessEntry} để xử lý</button>
                            </div>
                        </div>

                        <div onClick={() => handleNavigateToPage('/manage-inventory/output-warehouse')} className='product-item d-flex col-4  '>
                            <div className='sumary-title'>
                                Giao hàng
                            </div>
                            <div className='sumary-title'>
                                <button type="button" className='btn btn-primary'>{countProcessDelivery} để xử lý</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ManageInventory