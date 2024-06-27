import React from 'react'
import './ViewReceipt.scss'
import FilterHeader from '../../../FilterHeader/FilterHeader';
import { IoOptions } from "react-icons/io5";
import {
    useHistory, useLocation
} from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { getStockEntryInfo, getReceiptListItems } from '../../../../services/inventoryServices'
import { LANGUAGES } from '../../../../utils/constant'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl'

function ViewReceipt() {
    const language = useSelector(state => state.language.value)
    const location = useLocation();
    const history = useHistory();

    const pathParts = location.pathname.split('/')
    const idReceipt = pathParts[pathParts.length - 3] + '%2F' + pathParts[pathParts.length - 2] + '%2F' + pathParts[pathParts.length - 1];
    const idString = idReceipt.replace(/%2F/g, '/')

    const [receiptInfo, setReceiptInfo] = useState('');
    const [receiptItems, setReceiptItems] = useState([]);

    useEffect(() => {
        const fetchReceiptInfo = async () => {
            const res = await getStockEntryInfo(idReceipt)
            if (res && res.EC === 0) {
                setReceiptInfo(res.DT)
                console.log('Receipt Info:')
                console.log(res.DT)
            } else {
                toast.error(res.EM)
            }
            return res
        }

        const fetchReceiptListItems = async () => {
            const res = await getReceiptListItems(idReceipt)
            if (res && res.EC === 0) {
                setReceiptItems(res.DT)
                console.log('Product list of receipt info:')
                console.log(res.DT)
            } else {
                toast.error(res.EM)
            }
            return res
        }

        Promise.all([fetchReceiptInfo(), fetchReceiptListItems()])

    }, [])

    return (
        <>
            <div className='body-manage-input-warehouse'>
                <FilterHeader
                    namePage={language === LANGUAGES.EN ? 'Receipts' : 'Phiếu nhập kho (' + idString + ')'}
                    urlNewItem={'/manage-inventory/input-warehouse/' + idString}
                    urlImportProduct={'/manage-inventory/input-warehouse/import'}
                />

            </div>
        </>
    )
}

export default ViewReceipt