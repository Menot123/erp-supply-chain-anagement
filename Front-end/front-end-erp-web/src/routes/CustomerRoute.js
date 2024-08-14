import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
import HomeCustomer from '../components/Customer/HomeCustomer';
import { path } from '../utils/constant'
import { CustomerOpenInvoiceCreated } from '../components/Sales/Quotes/CustomerOpenInvoiceCreated';
import { PaymentSuccess } from '../components/Customer/PaymentSuccess';

function CustomerRoute() {
    return (
        <>
            <Switch>
                <Route exact path={path.CUSTOMER_INVOICE} component={CustomerOpenInvoiceCreated} />
                <Route path={path.CUSTOMER_PAYMENT_SUCCESS} component={PaymentSuccess} />
                <Route exact path={[path.CUSTOMER_HOME, path.CUSTOMER_HOME2]} component={HomeCustomer} />
            </Switch>

        </>
    )
}

export default CustomerRoute