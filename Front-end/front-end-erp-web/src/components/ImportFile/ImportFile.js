import React from 'react'
import './ImportFile.scss'
import Papa from 'papaparse'
import { toast } from 'react-toastify';
import { CSVLink, CSVDownload } from "react-csv";
import { FormattedMessage } from 'react-intl'
import { NavLink } from "react-router-dom";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import iconCSVFile from '../../assets/img/smiling_face.svg'
import _ from 'lodash'
import { postDataUsersFromFile } from '../../services/userServices'
import { useState } from 'react'

function ImportFile() {

    const [isImportingData, setIsImportingData] = useState(false)

    const csvDataExample = [
        ["firstName", "lastName", "email", "phone", "birth", "address", "role", "department"],
        ["Duy", "Huỳnh Khánh", "khanhduy1@gmail.com", "+84368887763", "2002", "Quận 7, Tp.HCM", "R1", "D1"],
        ["Đạt", "Nguyễn Tiến", "ngjyentiend@gmail.com", "+8434353622", "2002", "Quận 7, Tp.HCM", "R1", "D4"],
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
                        setTimeout(() => {
                            setIsImportingData(false);
                            toast.error('Your file is empty or incorrect template')
                        }, 1000);
                        return
                    } else {
                        const dataSend = res?.data
                        let resBulkCreate = await postDataUsersFromFile(dataSend)
                        if (resBulkCreate && +resBulkCreate?.EC === 0) {
                            setTimeout(() => {
                                setIsImportingData(false);
                                toast.success(resBulkCreate?.EM)
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                setIsImportingData(false);
                                toast.error(resBulkCreate?.EM)
                            }, 1000);
                        }
                    }
                }
            })
            setTimeout(() => {
                setIsImportingData(false);
            }, 1000);
        }
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
            <div className='wrapper-import-employee'>
                <div className='content-heading'>
                    <div className='btn-actions'>
                        <label htmlFor='file-upload' className='ms-1 btn btn-main'><FormattedMessage id="filter-header-import.file" /></label>
                        <input type='file' id='file-upload' hidden onChange={(e) => handleImportFile(e)} />
                        <NavLink to='/manage-accounts' className='btn btn-outline-secondary btn-cancel-import'><FormattedMessage id="filter-header-import.cancel" /></NavLink>
                    </div>
                    <div className='title-heading'>
                        <NavLink className='title-text1' to='/manage-accounts'><FormattedMessage id="department-btn.employees" /></NavLink> <span className='title-text2'><FormattedMessage id="filter-header-import.sub-title" /></span>
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
                        filename={"example_data_employees.csv"}
                    ><FaDownload /><FormattedMessage id="import-body-btn-example-data" /></CSVLink>
                </div>
            </div >
        </>
    )
}

export default ImportFile