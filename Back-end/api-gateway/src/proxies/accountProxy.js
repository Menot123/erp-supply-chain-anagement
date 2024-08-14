const { createProxyMiddleware } = require("http-proxy-middleware");

const accountProxy = createProxyMiddleware({
    // target: "http://localhost:8085",
    target: "http://backend-account:8085",
    changeOrigin: true,
    pathRewrite: {
        "^/account": "",
    },
});

module.exports = accountProxy;