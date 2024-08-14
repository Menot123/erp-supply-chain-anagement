import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
import { path } from '../utils/constant'
import SaleOrder from '../components/Sales/SaleOrder';
import ListProvider from '../components/Purchase/ListProvider';
import ListProduct from '../components/ManageInventory/ManageProduct/ListProduct';
import { NewQuote } from '../components/Purchase/Quotes/NewQuote';
import ManagePurchase from '../components/Purchase/ManagePurchase';
import NewProvider from '../components/Purchase/NewProvider.js';
import { OpenQuoteCreated } from '../components/Purchase/Quotes/OpenQuoteCreated';

function ManagePurchaseRoute() {
    return (
        <>
            <Switch>
                <Route exact path={path.PURCHASE_PROVIDERS} component={ListProvider} />
                <Route exact path='/manage-purchase/providers/create' component={NewProvider} />
                <Route exact path='/manage-purchase/orders' component={ManagePurchase} />
                <Route exact path='/manage-purchase/providers/:id' component={NewProvider} />
                <Route exact path='/manage-purchase/products/' component={ListProduct} />
                {/* <Route exact path={path.SALE_INVOICES_STATISTIC} component={ReportInvoice} />
                <Route exact path={path.SALE_INVOICES} component={SaleOrderInvoice} />
                <Route exact path={path.SALE_INVOICES_DETAIL} component={OpenInvoiceCreated} />
                <Route exact path={path.SALE_ORDER_CUSTOMERS} component={ListConsumer} />
                <Route exact path={path.SALE_ORDER_CUSTOMERS_CREATE} component={NewProvider} />
                <Route exact path={path.SALE_ORDER_CUSTOMERS_DETAIL} component={NewProvider} /> */}
                <Route exact path={path.PURCHASE_NEW} component={NewQuote} />
                {/* <Route exact path={path.SALE_PRODUCTS} component={ListProduct} />
                <Route exact path={path.SALE_CREATE_PRODUCT} component={CreateNewProduct} />
                <Route exact path={path.SALE_IMPORT_PRODUCT} component={ImportProduct} />
                <Route exact path={path.OPEN_QUOTE} component={OpenQuoteCreated} /> */}
                <Route exact path='/manage-purchase/:id' component={OpenQuoteCreated} />
                <Route exact path={path.MANAGE_PURCHASE} component={ManagePurchase} />

            </Switch>

        </>
    )
}

export default ManagePurchaseRoute