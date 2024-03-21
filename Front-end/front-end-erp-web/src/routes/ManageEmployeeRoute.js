import React from 'react'
import CreateNewEmployee from '../components/ManageAccount/CreateNewEmployee';
import {
    Switch,
    Route,
} from "react-router-dom";
import ManageAccount from '../components/ManageAccount/ManageAccount';
import { path } from '../utils/constant'

function ManageEmployeeRoute() {
    return (
        <>
            <Switch>
                <Route exact path={path.MANAGE_EMPLOYEES} component={ManageAccount} />
                <Route path={path.CREATE_EMPLOYEE} component={CreateNewEmployee} />
            </Switch>

        </>
    )
}

export default ManageEmployeeRoute