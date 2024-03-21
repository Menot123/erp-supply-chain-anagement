const { createProxyMiddleware } = require("http-proxy-middleware");

const inventoryProxy = createProxyMiddleware({
    target: "http://localhost:8081",
    changeOrigin: true,
    pathRewrite: {
        "^/inventory": "",
    },
});

module.exports = inventoryProxy;