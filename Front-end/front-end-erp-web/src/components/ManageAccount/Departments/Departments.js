import React from 'react'
import FilterHeader from '../../FilterHeader/FilterHeader'
import './Departments.scss'
import { IoMdMore } from "react-icons/io";
import { getAllType } from '../../../services/userServices'
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


    useEffect(() => {
        const fetchDepartments = async () => {
            let resDepartment = await getAllType('Department')
            if (resDepartment && resDepartment.EC === 0) {
                setDepartments(resDepartment.DT)
            } else {
                toast.error(resDepartment.EM)
            }
        }

        fetchDepartments()
    }, [])
    return (
        <>
            <FilterHeader
                namePage={<FormattedMessage id='filter-header-title.department' />}
            />
            <div className='row row-wrapper'>
                {departments && departments.length > 0 &&
                    departments.map((item, index) => {
                        return (
                            <div key={uuidv4()} className='department-wrapper col-4'>
                                <div className='title-department'>
                                    <div className='name-department'>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</div>
                                    <IoMdMore className='more-actions-department hover-item' />
                                </div>
                                <div className='button-employees'>
                                    <NavLink to={'/manage-accounts/?department=' + item?.keyType} className='btn btn-main btn-view-employees'><FormattedMessage id='department-btn.employees' /></NavLink>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </>
    )
}

export default Departments