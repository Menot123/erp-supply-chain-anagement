import React from 'react'
import Accounting from '../components/Accounting/Accounting';

import {
    Switch,
    Route,
} from "react-router-dom";
import { path } from '../utils/constant'

function ManageEmployeeRoute() {
    return (
        <>
            <Switch>
                <Route exact path={path.MANAGE_ACCOUNTING} component={Accounting} />
            </Switch>

        </>
    )
}

export default ManageEmployeeRoute