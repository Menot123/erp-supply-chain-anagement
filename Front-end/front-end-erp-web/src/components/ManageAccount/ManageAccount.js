import React from 'react'
import './ManageAccount.scss'
import temp_ava from './d37.png'
import FilterHeader from '../FilterHeader/FilterHeader';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import {
    useLocation
} from "react-router-dom";
import { IoMdMore } from "react-icons/io";

function ManageAccount() {
    const location = useLocation();
    const url = location.pathname;

    return (
        <>
            {url === '/manage-accounts'
                ?
                <div className='body-manage-employees'>
                    <FilterHeader
                        namePage={'Nhân Viên'}
                        urlNewItem={'/manage-accounts/create'}
                    />

                    <div className='manage-employees-container container mt-3'>

                        <div className='employee-items-wrap row'>
                            <div className='employee-item d-flex col-3  '>
                                <div className='avatar-employee'>
                                    <img className='img-employee' src={temp_ava} alt='avatar-employee' />
                                </div>
                                <div className='des-employee'>
                                    <span className='name-employee '>Abigail Peterson</span>
                                    <span className='position-employee'>Tư vấn viên</span>
                                    <span className='email-employee'><MdEmail /> test@gmail.com</span>
                                    <span className='phone-employee'><FaPhoneAlt className='icon-phone' />09999999</span>
                                </div>

                            </div>

                            <div className='employee-item d-flex col-3  '>
                                <div className='avatar-employee'>
                                    <img className='img-employee' src={temp_ava} alt='avatar-employee' />
                                </div>
                                <div className='des-employee'>
                                    <span className='name-employee '>Abigail Peterson</span>
                                    <span className='position-employee'>Tư vấn viên</span>
                                    <span className='email-employee'><MdEmail /> test@gmail.com</span>
                                    <span className='phone-employee'><FaPhoneAlt className='icon-phone' />09999999</span>
                                </div>

                            </div>

                            <div className='employee-item d-flex col-3  '>
                                <div className='avatar-employee'>
                                    <img className='img-employee' src={temp_ava} alt='avatar-employee' />
                                </div>
                                <div className='des-employee'>
                                    <span className='name-employee '>Abigail Peterson</span>
                                    <span className='position-employee'>Tư vấn viên</span>
                                    <span className='email-employee'><MdEmail /> test@gmail.com</span>
                                    <span className='phone-employee'><FaPhoneAlt className='icon-phone' />09999999</span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                :
                ''
            }
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