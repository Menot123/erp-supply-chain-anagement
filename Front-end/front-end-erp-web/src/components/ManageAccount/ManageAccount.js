import React from 'react'
import './ManageAccount.scss'
import FilterHeader from '../FilterHeader/FilterHeader';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import {
    useLocation
} from "react-router-dom";
import { useEffect, useState } from 'react'
import { getAllEmployee, getAllEmployeesByDepartment, getEmployeesPagination } from '../../services/userServices'
import { toast } from 'react-toastify';
import ModalDetailEmployee from './Modal/ModalDetailEmployee';
import { LANGUAGES } from '../../utils/constant'
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import PuffLoader from "react-spinners/PuffLoader";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";

function ManageAccount() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const department = searchParams.get('department');

    const [employees, setEmployees] = useState([])
    const [isShowModalDetailEmployee, setIsShowModalDetailEmployee] = useState(false)
    const [infoEmployeeDetail, setInfoEmployeeDetail] = useState(null)
    const language = useSelector(state => state.language.value)
    const [isLoading, setIsLoading] = useState(false)
    const [searchEmployee, setSearchEmployee] = useState('')
    const [currentView, setCurrentView] = useState('block')
    const [sortEmployees, setSortEmployees] = useState(true)
    const [totalPage, setTotalPage] = useState(0)
    const [currentLimit, setCurrentLimit] = useState(12)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchEmployees = async () => {
            if (currentPage === 1) {
                if (department) {
                    setIsLoading(true)
                    let res = await getAllEmployeesByDepartment(department, currentPage, currentLimit)
                    setIsLoading(false)
                    if (res.EC === 0) {
                        Promise.all([setEmployees(res?.DT?.employees), setTotalPage(res?.DT?.totalPage)])
                    } else {
                        toast.error(res?.EM)
                    }
                } else {
                    setIsLoading(true)
                    let res = await getEmployeesPagination(currentPage, currentLimit)
                    setIsLoading(false)
                    if (res.EC === 0 && res?.DT?.employees.length > 0) {
                        Promise.all([setEmployees(res?.DT?.employees), setTotalPage(res?.DT?.totalPage)])
                    } else {
                        toast.error(res?.EM)
                    }
                }
            } else {
                if (department) {
                    let res = await getAllEmployeesByDepartment(department, currentPage, currentLimit)
                    if (res.EC === 0) {
                        Promise.all([setEmployees(res?.DT?.employees), setTotalPage(res?.DT?.totalPage)])
                    } else {
                        toast.error(res?.EM)
                    }
                } else {
                    let res = await getEmployeesPagination(currentPage, currentLimit)
                    if (res.EC === 0 && res?.DT?.employees.length > 0) {
                        Promise.all([setEmployees(res?.DT?.employees), setTotalPage(res?.DT?.totalPage)])
                    } else {
                        toast.error(res?.EM)
                    }
                }
            }

        }

        fetchEmployees()
    }, [currentPage, department, currentLimit])

    const fetchEmployeesPagination = async () => {
        let res = await getEmployeesPagination(currentPage, currentLimit)
        if (res.EC === 0 && res?.DT?.employees.length > 0) {
            Promise.all([setEmployees(res?.DT?.employees), setTotalPage(res?.DT?.totalPage)])
        } else {
            toast.error(res?.EM)
        }
    }

    const changeSearchEmployee = (content) => {
        setSearchEmployee(content)
    }

    const reloadDataEmployee = async () => {
        fetchEmployeesPagination()
    }

    const handleDetailEmployee = (employee) => {
        Promise.all([setIsShowModalDetailEmployee(true), setInfoEmployeeDetail(employee)])
    }

    const closeModalDetail = () => {
        setIsShowModalDetailEmployee(false)
    }

    const handleSortListEmployees = () => {
        setSortEmployees(!sortEmployees)
        employees.reverse()
    }

    return (
        <>

            <div className='body-manage-employees'>
                <FilterHeader
                    namePage={<FormattedMessage id='filter-header-title.employee' />}
                    urlNewItem={'/manage-accounts/create'}
                    changeSearchEmployee={changeSearchEmployee}
                    setCurrentViewEmployee={setCurrentView}
                    currentView={currentView}
                    totalPageEmployee={totalPage}
                    setCurrentEmployeePage={setCurrentPage}
                />
                <PuffLoader
                    className='loader-manage-employee'
                    color={'#861e6b'}
                    loading={isLoading}
                    size={150}
                    aria-label="Loading Spinner"
                />
                {currentView === 'block' ?
                    <div className='manage-employees-container container mt-3'>

                        <div className='employee-items-wrap row'>
                            {!isLoading && employees && employees.length > 0 ? (
                                (() => {
                                    const filteredEmployees = employees.filter((item) => {
                                        return searchEmployee.toLowerCase() === '' ||
                                            (item.firstName.toLowerCase().includes(searchEmployee.toLowerCase()) ||
                                                item.lastName.toLowerCase().includes(searchEmployee.toLowerCase()));
                                    });
                                    if (filteredEmployees.length > 0) {
                                        return filteredEmployees.map((item, index) => (
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
                                        ));
                                    } else {
                                        return (
                                            <div className='text-center w-100 fw-bold'>
                                                <span><FormattedMessage id='filter-header-empty-employee' /></span>
                                            </div>
                                        );
                                    }
                                })()
                            ) : (
                                <div className='text-center w-100 fw-bold'>
                                    {isLoading ? <FormattedMessage id='Manage-account.loading-data' /> : <FormattedMessage id='Manage-account.empty-list' />}
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    <>
                        <div className='manage-employees-container'>
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col"> <span onClick={() => handleSortListEmployees()} className='hover-item'>Tên {sortEmployees ? <GoTriangleDown /> : <GoTriangleUp />}</span></th>
                                        <th scope="col">Điện thoại</th>
                                        <th scope="col">Email công việc</th>
                                        <th scope="col">Phòng/Ban</th>
                                        <th scope="col">Chức vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees && employees.length > 0 ? (
                                        (() => {
                                            const filteredEmployees = employees.filter((item) => {
                                                return searchEmployee.toLowerCase() === '' ||
                                                    (item.firstName.toLowerCase().includes(searchEmployee.toLowerCase()) ||
                                                        item.lastName.toLowerCase().includes(searchEmployee.toLowerCase()));
                                            });
                                            if (filteredEmployees.length > 0) {
                                                return filteredEmployees.map((item, index) => (
                                                    <tr onClick={() => handleDetailEmployee(item)} key={'employee' + index} className='hover-item'>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{language === LANGUAGES.EN ? item.firstName + ' ' + item.lastName : item.lastName + ' ' + item.firstName}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.email}</td>
                                                        <td>{language === LANGUAGES.EN ? item?.departmentData?.valueEn : item?.departmentData?.valueVi}</td>
                                                        <td>{language === LANGUAGES.EN ? item?.positionData?.valueEn : item?.positionData?.valueVi}</td>
                                                    </tr>
                                                ));
                                            } else {
                                                return (
                                                    <tr>
                                                        <td colSpan="6">
                                                            <div className='text-center w-100 fw-bold'>
                                                                <span>Không có nhân viên ở phòng ban này</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })()
                                    ) : (
                                        <div className='text-center w-100 fw-bold'>
                                            {isLoading ? <FormattedMessage id='Manage-account.loading-data' /> : <FormattedMessage id='Manage-account.empty-list' />}
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                }

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