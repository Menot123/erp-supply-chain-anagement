import React from 'react'
import ManageInventory from '../components/ManageInventory/ManageInventory';
import ListProduct from '../components/ManageInventory/ManageProduct/ListProduct';
import CreateNewProduct from '../components/ManageInventory/ManageProduct/CreateNewProduct';
import DetailProduct from '../components/ManageInventory/ManageProduct/DetailProduct';
import ImportProduct from '../components/ManageInventory/ManageProduct/ImportProduct';
import InputWarehouse from '../components/ManageInventory/Warehouse/InputWarehouse';
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
                {/* Product Route */}
                <Route path={path.CREATE_PRODUCT} component={CreateNewProduct} />
                <Route exact path={path.IMPORT_PRODUCT} component={ImportProduct} />
                <Route path={path.ID_PRODUCT} component={DetailProduct} />
                <Route path={path.MANAGE_PRODUCTS} component={ListProduct} />
                {/* In-Out Warehouse */}
                <Route path={path.INPUT_WAREHOUSE} component={InputWarehouse} />
                {/* <Route path={path.OUTPUT_WAREHOUSE} component={} /> */}
                <Route exact path={path.MANAGE_INVENTORY} component={ManageInventory} />
            </Switch>

        </>
    )
}

export default ManageEmployeeRoute