const { createProxyMiddleware } = require("http-proxy-middleware");

const accountingProxy = createProxyMiddleware({
    target: "http://localhost:8082",
    changeOrigin: true,
    pathRewrite: {
        "^/accounting": "",
    },
});

module.exports = accountingProxy;