const express = require("express");
const cookieParser = require('cookie-parser');
const accountProxy = require("../proxies/accountProxy");
const inventoryProxy = require("../proxies/inventoryProxy");
const accountingProxy = require("../proxies/accountingProxy");
const purchaseProxy = require("../proxies/purchaseProxy");
const saleProxy = require("../proxies/saleProxy");
const customerProxy = require("../proxies/customerProxy");
const bffProxy = require("../proxies/bffProxy");
const jwtService = require("../middlewares/JWTServices")

const router = express.Router();

router.use(cookieParser());

router.use("/account", jwtService.checkUserJWT, accountProxy);
router.use("/inventory", jwtService.checkUserJWT, inventoryProxy);
router.use("/purchase", purchaseProxy);
router.use("/sale", jwtService.checkUserJWT, saleProxy);
router.use("/accounting", accountingProxy);
router.use("/customer", customerProxy);
router.use("/bff", bffProxy);

// Handler for route-not-found
router.use((_req, res) => {
    res.status(404).json({
        code: 404,
        status: "Error",
        message: "Route not found.",
        data: null,
    });
});

module.exports = router;