const { createProxyMiddleware } = require("http-proxy-middleware");

const customerProxy = createProxyMiddleware({
    // target: "http://localhost:8086",
    target: "http://backend-customer:8086",
    changeOrigin: true,
    pathRewrite: {
        "^/customer": "",
    },
});

module.exports = customerProxy;