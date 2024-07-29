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
import SaleOrderInvoice from '../components/Sales/SaleOrderInvoice';
import { OpenInvoiceCreated } from '../components/Sales/Quotes/OpenInvoiceCreated';
import ListConsumer from '../components/Sales/ListCustomer';
import NewCustomer from '../components/Sales/NewCustomer';
import ReportInvoice from '../components/Sales/Statistic/ReportInvoice';

function SaleOrderRoute() {
    return (
        <>
            <Switch>
                <Route exact path={path.SALE_ORDER} component={SaleOrder} />
                <Route exact path={path.SALE_INVOICES_STATISTIC} component={ReportInvoice} />
                <Route exact path={path.SALE_INVOICES} component={SaleOrderInvoice} />
                <Route exact path={path.SALE_INVOICES_DETAIL} component={OpenInvoiceCreated} />
                <Route exact path={path.SALE_ORDER_CUSTOMERS} component={ListConsumer} />
                <Route exact path={path.SALE_ORDER_CUSTOMERS_CREATE} component={NewCustomer} />
                <Route exact path={path.SALE_ORDER_CUSTOMERS_DETAIL} component={NewCustomer} />
                <Route exact path={path.CREATE_QUOTE} component={NewQuote} />
                <Route exact path={path.SALE_PRODUCTS} component={ListProduct} />
                <Route exact path={path.SALE_CREATE_PRODUCT} component={CreateNewProduct} />
                <Route exact path={path.SALE_IMPORT_PRODUCT} component={ImportProduct} />
                <Route exact path={path.OPEN_QUOTE} component={OpenQuoteCreated} />
            </Switch>

        </>
    )
}

export default SaleOrderRoute