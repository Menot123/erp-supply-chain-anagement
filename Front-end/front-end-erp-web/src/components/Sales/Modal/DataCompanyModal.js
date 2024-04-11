import React from 'react'
import './DataCompanyModal.scss'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdCameraEnhance } from "react-icons/md";

function DataCompanyModal(props) {

    const handleChangeImage = () => {

    }

    return (
        <Modal
            show={props?.show}
            onHide={props?.handleClose}
            backdrop="static"
            keyboard={false}
            size={'lg'}
        >
            <Modal.Header closeButton>
                <Modal.Title>Thiết lập dữ liệu công ty</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='name-company-logo d-flex  justify-content-between'>
                    <h1 className='name-company d-flex flex-column'>
                        <label className="label-name-company" htmlFor='input-name-company'>Tên công ty</label>
                        <input id="input-name-company" type='text' className="input-name-company" placeholder='ví dụ. Công ty của tôi' />
                    </h1>

                    <div className='wrap-img-logo'>
                        <input hidden id="img-upload" type='file'
                            onChange={(e) => handleChangeImage(e)}
                        />
                        <label className='label-upload hover-item' htmlFor="img-upload"><MdCameraEnhance className='icon-upload  ms-1 mb-1' /> Your logo</label>
                    </div>
                </div>
                <div className='wrap-content-body'>
                    <div className='heading-content-body'>
                        <div className='two-blocks d-flex'>
                            <div className='general-inf active'>
                                Thông tin tổng quan
                            </div>

                            <div className='branch'>
                                Chi nhánh
                            </div>
                        </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-cancel-data-company' onClick={props?.handleClose}>
                    Hủy bỏ
                </Button>
                <Button className='btn-purple'>Lưu</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DataCompanyModal