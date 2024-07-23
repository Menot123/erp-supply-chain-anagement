import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
import { path } from '../utils/constant'
import SaleOrder from '../components/Sales/SaleOrder';
import { NewQuote } from '../components/Sales/Quotes/NewQuote';
import { OpenQuoteCreated } from '../components/Sales/Quotes/OpenQuoteCreated';
import ListProduct from '../components/ManageInventory/ManageProduct/ListProduct';
import CreateNewProduct from '../components/ManageInventory/ManageProduct/CreateNewProduct';
import ImportProduct from '../components/ManageInventory/ManageProduct/ImportProduct';

function SaleOrderRoute() {
    return (
        <>
            <Switch>
                <Route exact path={path.SALE_ORDER} component={SaleOrder} />
                <Route exact path={path.CREATE_QUOTE} component={NewQuote} />
                <Route exact path={path.SALE_PRODUCTS} component={ListProduct} />
                <Route exact path={path.OPEN_QUOTE} component={OpenQuoteCreated} />
                <Route exact path={path.SALE_CREATE_PRODUCT} component={CreateNewProduct} />
                <Route exact path={path.SALE_IMPORT_PRODUCT} component={ImportProduct} />
            </Switch>

        </>
    )
}

export default SaleOrderRoute