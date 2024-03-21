const express = require("express");
const accountProxy = require("../proxies/accountProxy");
const inventoryProxy = require("../proxies/inventoryProxy");
const accountingProxy = require("../proxies/accountingProxy");
const purchaseProxy = require("../proxies/purchaseProxy");
const saleProxy = require("../proxies/saleProxy");

const router = express.Router();

router.use("/account", accountProxy);
router.use("/inventory", inventoryProxy);
router.use("/purchase", purchaseProxy);
router.use("/sale", saleProxy);
router.use("/accounting", accountingProxy);

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