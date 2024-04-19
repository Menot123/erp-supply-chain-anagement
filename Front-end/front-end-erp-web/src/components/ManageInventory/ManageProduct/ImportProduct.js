import React from 'react'
import './ImportProduct.scss'
import Papa from 'papaparse'
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import { FormattedMessage } from 'react-intl'
import { NavLink } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import iconCSVFile from '../../../assets/img/smiling_face.svg'
import { importNewProducts } from '../../../services/productServices'
import { useState } from 'react'

function ImportProduct() {

    const [isImportingData, setIsImportingData] = useState(false)

    const csvDataExample = [
        ["barCode", "nameVi", "nameEn", "type", "group", "cost", "unit", "descriptionVi", "descriptionEn", "expiry"],
        ["123456", "Sản phẩm mẫu 1", "Example product 1", "T1", "G1", "50000", "U1", "Đây là mô tả 1", "This is description 1", "8"],
        ["789123", "Sản phẩm mẫu 2", "Example product 2", "T1", "G1", "50000", "U1", "Đây là mô tả 2", "This is description 2", "8"],
    ];

    const handleImportFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setIsImportingData(true)
            let file = e.target.files[0]
            if (file.type !== 'text/csv') {
                setTimeout(() => {
                    setIsImportingData(false);
                    toast.warning('Only access csv file!')
                }, 1000);
                return
            }
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async function (res) {
                    if (res?.data?.length === 0) {
                        handleTimeoutAndToast(<FormattedMessage id="import-toast-error-empty-file" />)
                        return
                    } else {
                        const dataSend = res?.data
                        let resBulkCreate = await importNewProducts(dataSend)
                        if (resBulkCreate && +resBulkCreate?.EC === 0) {
                            setTimeout(() => {
                                setIsImportingData(false);
                                toast.success(<FormattedMessage id="import-toast-success" />)
                            }, 1000);
                        } else if (resBulkCreate && +resBulkCreate?.EC === -1) {
                            handleTimeoutAndToast(<FormattedMessage id="import-toast-error-wrong-header" />)
                        }
                        else if (resBulkCreate && +resBulkCreate?.EC === -3) {
                            handleTimeoutAndToast(<FormattedMessage id="import-product-toast-error-all-existing" />)
                        }
                        else if (resBulkCreate && +resBulkCreate?.EC === -4) {
                            handleTimeoutAndToast(<FormattedMessage id="import-product-toast-error-missing-barcode" />)
                        } else {
                            handleTimeoutAndToast(<FormattedMessage id="import-toast-error-something-wrong" />)
                        }
                    }
                }
            })
            setTimeout(() => {
                setIsImportingData(false);
            }, 1000);
        }
    }

    const handleTimeoutAndToast = (message) => {
        setTimeout(() => {
            setIsImportingData(false);
            toast.error(message)
        }, 1000);
    }

    return (
        <>
            {isImportingData
                ?
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
                : ''
            }
            <div className='wrapper-import-product'>
                <div className='content-heading'>
                    <div className='btn-actions'>
                        <label htmlFor='file-upload' className='ms-1 btn btn-main'><FormattedMessage id="filter-header-import.file" /></label>
                        <input type='file' id='file-upload' hidden onChange={(e) => handleImportFile(e)} />
                        <NavLink to='/manage-inventory/products' className='btn btn-outline-secondary btn-cancel-import'><FormattedMessage id="filter-header-import.cancel" /></NavLink>
                    </div>
                    <div className='title-heading'>
                        <NavLink className='title-text1' to='/manage-inventory/products'><FormattedMessage id="nav.manage-inventory-product" /></NavLink> <span className='title-text2'><FormattedMessage id="filter-header-import.sub-title" /></span>
                    </div>
                </div>
                <div className='content-body'>
                    <div className='icon-file'>
                        <img src={iconCSVFile} alt='img-smiling-csvFile' />
                    </div>
                    <span className='text-content-line1'><FormattedMessage id="import-body-title-main" /></span>
                    <span className='text-content-line2'><FormattedMessage id="import-body-title-recommend" /></span>
                    <span className='text-content-line3'><FormattedMessage id="import-body-title-help" /></span>
                    <CSVLink
                        className='text-content-line4'
                        data={csvDataExample}
                        filename={"example_data_products.csv"}
                    ><FaDownload /><FormattedMessage id="import-product-body-btn-example-data" /></CSVLink>
                </div>
            </div >
        </>
    )
}

export default ImportProduct