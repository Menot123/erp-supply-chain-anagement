import React from 'react'
import ManageInventory from '../components/ManageInventory/ManageInventory';
import CreateNewProduct from '../components/ManageInventory/CreateNewProduct';
import {
    Switch,
    Route,
} from "react-router-dom";
// import ManageProduct from '../components/ManageInventory/ManageProduct';
import { path } from '../utils/constant'

function ManageEmployeeRoute() {
    return (
        <>
            <Switch>
                <Route exact path={path.MANAGE_INVENTORY} component={ManageInventory} />
                <Route path={path.MANAGE_PRODUCTS} component={ManageInventory} />
                <Route path={path.CREATE_PRODUCT} component={CreateNewProduct} />
            </Switch>

        </>
    )
}

export default ManageEmployeeRoute