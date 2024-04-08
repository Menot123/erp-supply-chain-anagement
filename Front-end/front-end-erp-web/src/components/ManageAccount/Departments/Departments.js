import React from 'react'
import FilterHeader from '../../FilterHeader/FilterHeader'
import './Departments.scss'
import { IoMdMore } from "react-icons/io";
import { getAllDepartments } from '../../../services/userServices'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { LANGUAGES } from '../../../utils/constant'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from "react-router-dom";
import { FormattedMessage } from 'react-intl'

function Departments() {

    const language = useSelector(state => state.language.value)
    const [departments, setDepartments] = useState([])
    const [searchDepartment, setSearchDepartment] = useState('')


    useEffect(() => {
        const fetchDepartments = async () => {
            let resDepartment = await getAllDepartments()
            if (resDepartment && resDepartment.EC === 0) {
                setDepartments(resDepartment.DT)
            } else {
                toast.error(resDepartment.EM)
            }
        }

        fetchDepartments()
    }, [])

    const changeSearchDepartment = (content) => {
        setSearchDepartment(content)
    }


    return (
        <>
            <FilterHeader
                namePage={<FormattedMessage id='filter-header-title.department' />}
                urlNewItem={'/manage-accounts/create-department'}
                hiddenViewMode={true}
                hiddenBtnImport={true}
                changeSearchDepartment={changeSearchDepartment}
            />
            <div className='row row-wrapper'>
                {departments && departments.length > 0 ? (
                    (() => {
                        const filteredDepartments = departments.filter((item) => {
                            return searchDepartment.toLowerCase() === '' ||
                                (item.nameVi.toLowerCase().includes(searchDepartment.toLowerCase()) ||
                                    item.nameEn.toLowerCase().includes(searchDepartment.toLowerCase()));
                        });
                        if (filteredDepartments.length > 0) {
                            return filteredDepartments.map((item, index) => (
                                <div key={uuidv4()} className='department-wrapper col-4'>
                                    <div className='title-department'>
                                        <div className='name-department'>{language === LANGUAGES.EN ? item.nameEn : item.nameVi}</div>
                                        <IoMdMore className='more-actions-department hover-item' />
                                    </div>
                                    <div className='button-employees'>
                                        <NavLink to={'/manage-accounts/?department=' + item?.departmentCode} className='btn btn-main btn-view-employees'><FormattedMessage id='department-btn.employees' /></NavLink>
                                    </div>
                                </div>
                            ));
                        } else {
                            return (
                                <div className='text-center w-100 fw-bold'>
                                    {<FormattedMessage id='filter-header-empty-department' />}
                                </div>
                            );
                        }
                    })()
                ) : (
                    <div className='text-center w-100 fw-bold'>
                        <span><FormattedMessage id='filter-header-empty-employee' /></span>
                    </div>
                )}
                {/* {departments && departments.length > 0 &&

                    departments.map((item, index) => {
                        return (
                            <div key={uuidv4()} className='department-wrapper col-4'>
                                <div className='title-department'>
                                    <div className='name-department'>{language === LANGUAGES.EN ? item.nameEn : item.nameVi}</div>
                                    <IoMdMore className='more-actions-department hover-item' />
                                </div>
                                <div className='button-employees'>
                                    <NavLink to={'/manage-accounts/?department=' + item?.departmentCode} className='btn btn-main btn-view-employees'><FormattedMessage id='department-btn.employees' /></NavLink>
                                </div>
                            </div>
                        )
                    })
                } */}

            </div>

        </>
    )
}

export default Departments