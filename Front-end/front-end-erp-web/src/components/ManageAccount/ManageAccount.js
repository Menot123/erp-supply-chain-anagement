import React from 'react'
import './ManageAccount.scss'
import FilterHeader from '../FilterHeader/FilterHeader';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import {
    useLocation
} from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import { useEffect, useState } from 'react'
import { getAllEmployee } from '../../services/userServices'
import { toast } from 'react-toastify';

function ManageAccount() {
    const location = useLocation();
    const url = location.pathname;

    const [employees, setEmployees] = useState([])

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

    return (
        <>
            {/* Nav manage account servive*/}
            {url === '/manage-accounts'
                ?
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
                                        <div className='employee-item d-flex col-4  '>
                                            <div className='avatar-employee'>
                                                <img className='img-employee' src={item.avatar} alt='avatar-employee' />
                                            </div>
                                            <div className='des-employee'>
                                                <span className='name-employee '>{item.name}</span>
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
                </div>
                :
                ''
            }
            {/* Nav manage account by department servive*/}

            {url === '/manage-accounts/department'
                ?
                <div className='body-manage-employees'>
                    <FilterHeader
                        namePage={'Phòng/Ban'}
                    />

                    <div className='manage-department-container container mt-3'>

                        <div className='row'>
                            <div className='department-items-wrap col-3'>
                                <div className='title-department-item'>
                                    <span className='department-item-name'>Administration</span>
                                    <IoMdMore className='more-action-department' />
                                </div>
                                <button className='btn btn-primary'>Nhân viên</button>
                            </div>

                            <div className='department-items-wrap col-3'>
                                <div className='title-department-item'>
                                    <span className='department-item-name'>Administration</span>
                                    <IoMdMore className='more-action-department' />
                                </div>
                                <button className='btn btn-primary'>Nhân viên</button>
                            </div>

                            <div className='department-items-wrap col-3'>
                                <div className='title-department-item'>
                                    <span className='department-item-name'>Administration</span>
                                    <IoMdMore className='more-action-department' />
                                </div>
                                <button className='btn btn-primary'>Nhân viên</button>
                            </div>

                            <div className='department-items-wrap col-3'>
                                <div className='title-department-item'>
                                    <span className='department-item-name'>Administration</span>
                                    <IoMdMore className='more-action-department' />
                                </div>
                                <button className='btn btn-primary'>Nhân viên</button>
                            </div>
                        </div>

                    </div>
                </div>
                :
                ''
            }
        </>
    )
}

export default ManageAccount