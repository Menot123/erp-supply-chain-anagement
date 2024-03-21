const { createProxyMiddleware } = require("http-proxy-middleware");

const saleProxy = createProxyMiddleware({
    target: "http://localhost:8084",
    changeOrigin: true,
    pathRewrite: {
        "^/sale": "",
    },
});

module.exports = saleProxy;