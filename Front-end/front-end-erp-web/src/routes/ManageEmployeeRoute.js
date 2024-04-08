import React from 'react'
import CreateNewEmployee from '../components/ManageAccount/CreateNewEmployee';
import {
    Switch,
    Route,
} from "react-router-dom";
import ManageAccount from '../components/ManageAccount/ManageAccount';
import { path } from '../utils/constant'
import Departments from '../components/ManageAccount/Departments/Departments';
import ImportFile from '../components/ImportFile/ImportFile';
import CreateNewDepartment from '../components/ManageAccount/Departments/CreateNewDepartment';

function ManageEmployeeRoute() {
    return (
        <>
            <Switch>
                <Route exact path={path.CREATE_EMPLOYEE} component={CreateNewEmployee} />
                <Route exact path={path.CREATE_DEPARTMENT} component={CreateNewDepartment} />
                <Route exact path={path.IMPORT_EMPLOYEE} component={ImportFile} />
                <Route path={path.MANAGE_EMPLOYEES_BY_DEPARTMENT} component={Departments} />
                <Route path={path.MANAGE_EMPLOYEES} component={ManageAccount} />
            </Switch>

        </>
    )
}

export default ManageEmployeeRoute