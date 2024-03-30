import React from 'react'
import FilterHeader from '../../FilterHeader/FilterHeader'
import './Departments.scss'
import { IoMdMore } from "react-icons/io";
import { getAllType, getAllEmployeesByDepartment } from '../../../services/userServices'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { LANGUAGES } from '../../../utils/constant'
import { useSelector } from 'react-redux';


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

        const fetchEmployeesByDepartment = async () => {
            let resEmployees = await getAllEmployeesByDepartment('D1')
        }

        fetchDepartments()
        fetchEmployeesByDepartment()
    }, [])
    return (
        <>
            <FilterHeader
                namePage={'Phòng/Ban'}
            />
            <div className='row row-wrapper'>
                {departments && departments.length > 0 &&
                    departments.map((item, index) => {
                        return (
                            <div className='department-wrapper col-4'>
                                <div className='title-department'>
                                    <div className='name-department'>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</div>
                                    <IoMdMore className='more-actions-department hover-item' />
                                </div>
                                <div className='button-employees'>
                                    <button className='btn btn-main btn-view-employees'>Nhan Vien</button>
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