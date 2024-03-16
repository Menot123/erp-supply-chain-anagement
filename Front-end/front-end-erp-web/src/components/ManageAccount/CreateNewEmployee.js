import React from 'react'
import './CreateNewEmployee.scss'
import { RiImageAddLine } from "react-icons/ri";

function CreateNewEmployee() {
    return (
        <div className='wrapper-create-employee'>
            <div className='header-create'>
                <span className='title-create'>Thêm nhân viên mới</span>
                <div className='btn-actions'>
                    <button className='btn btn-primary btn-main'>Lưu</button>
                    <button className='ms-1 btn btn-outline-secondary'>Hủy bỏ</button>
                </div>
            </div>
            <div className='container create-employee-container'>
                <div className='name-position-avatar'>
                    <div className='name-position'>
                        <input className="name-employee" type='text' placeholder='Tên nhân viên' />
                        <input className="position-employee" type='text' placeholder='Chức vụ' />
                    </div>
                    <div className='avatar'>
                        <RiImageAddLine className='icon-upload hover-item' />
                    </div>
                </div>
                <div className='information-detail row'>
                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='phone'>Điện thoại</label>
                        <input className='input-inf' id='phone' type='text' />
                    </div>

                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='email'>Email công việc</label>
                        <input className='input-inf' id='email' type='email' />
                    </div>

                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='department'>Bộ phận</label>
                        <input className='input-inf' id='department' type='text' />
                    </div>

                    <div className='col-6 mt-2'>
                        <label className='label-input' htmlFor='position'>Chức vụ</label>
                        <input className='input-inf' id='position' type='text' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateNewEmployee