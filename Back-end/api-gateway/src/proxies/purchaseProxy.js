const { createProxyMiddleware } = require("http-proxy-middleware");

const purchaseProxy = createProxyMiddleware({
    target: "http://localhost:8083",
    changeOrigin: true,
    pathRewrite: {
        "^/purchase": "",
    },
});

module.exports = purchaseProxy;