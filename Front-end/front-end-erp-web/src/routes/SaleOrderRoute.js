import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
import { path } from '../utils/constant'
import SaleOrder from '../components/Sales/SaleOrder';
import { NewQuote } from '../components/Sales/Quotes/NewQuote';
import { OpenQuoteCreated } from '../components/Sales/Quotes/OpenQuoteCreated';

function SaleOrderRoute() {
    return (
        <>
            <Switch>
                <Route exact path={path.SALE_ORDER} component={SaleOrder} />
                <Route exact path={path.CREATE_QUOTE} component={NewQuote} />
                <Route exact path={path.OPEN_QUOTE} component={OpenQuoteCreated} />
            </Switch>

        </>
    )
}

export default SaleOrderRoute