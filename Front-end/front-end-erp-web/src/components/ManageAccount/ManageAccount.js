import React from 'react'
import './ManageAccount.scss'
import FilterHeader from '../FilterHeader/FilterHeader';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import {
    useLocation
} from "react-router-dom";
import { useEffect, useState } from 'react'
import { getAllEmployee } from '../../services/userServices'
import { toast } from 'react-toastify';
import ModalDetailEmployee from './Modal/ModalDetailEmployee';
import { LANGUAGES } from '../../utils/constant'
import { useSelector } from 'react-redux';


function ManageAccount() {
    const location = useLocation();

    const [employees, setEmployees] = useState([])
    const [isShowModalDetailEmployee, setIsShowModalDetailEmployee] = useState(false)
    const [infoEmployeeDetail, setInfoEmployeeDetail] = useState(null)
    const language = useSelector(state => state.language.value)

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await getAllEmployee()
            if (+response.EC === 0) {
                setEmployees(response.DT)
            } else {
                toast.error(response.EM)
            }
        }

        fetchEmployees()
    }, [])

    const reloadDataEmployee = async () => {
        const response = await getAllEmployee()
        if (+response.EC === 0) {
            setEmployees(response.DT)
        } else {
            toast.error(response.EM)
        }
    }

    const handleDetailEmployee = (employee) => {
        Promise.all([setIsShowModalDetailEmployee(true), setInfoEmployeeDetail(employee)])
    }

    const closeModalDetail = () => {
        setIsShowModalDetailEmployee(false)
    }

    return (
        <>
            <div className='body-manage-employees'>
                <FilterHeader
                    namePage={'Nhân Viên'}
                    urlNewItem={'/manage-accounts/create'}
                />

                <div className='manage-employees-container container mt-3'>

                    <div className='employee-items-wrap row'>
                        {employees && employees.length > 0 &&
                            employees.map((item, index) => {
                                return (
                                    <div onClick={() => handleDetailEmployee(item)} key={index} className='employee-item d-flex col-4  '>
                                        <div className='avatar-employee'>
                                            <img className='img-employee' src={item.avatar} alt='avatar-employee' />
                                        </div>
                                        <div className='des-employee'>
                                            <span className='name-employee '>{language === LANGUAGES.EN ? item.firstName + ' ' + item.lastName : item.lastName + ' ' + item.firstName}</span>
                                            <span className='position-employee'>{item.position}</span>
                                            <span className='email-employee'><MdEmail />{item.email}</span>
                                            <span className='phone-employee'><FaPhoneAlt className='icon-phone' />{item.phone}</span>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

                <ModalDetailEmployee
                    isShowModalDetailEmployee={isShowModalDetailEmployee}
                    closeModal={closeModalDetail}
                    infoEmployeeDetail={infoEmployeeDetail}
                    reloadData={reloadDataEmployee}
                />

            </div>
        </>
    )
}

export default ManageAccount