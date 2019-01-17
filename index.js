const http = require("http");
const url = require("url");
const httpProxy = require("http-proxy");
const hostRemove = "local.programmer5000.com";

const proxy = httpProxy.createProxyServer({hostRewrite: true, cookieDomainRewrite: hostRemove});
http.createServer(function(req, res) {
  const host = req.headers.host.split("").reverse().join("").replace(("." + hostRemove).split("").reverse().join(""), "").split("").reverse().join("").replace(/:[0-9]+$/, "");
  console.log(host);
  req.headers.host = host;
  proxy.web(req, res, { target: "http://" + host + "/" });
}).listen(8000);

proxy.on("proxyRes", (proxyRes, req, res) => {
  const proxyUrl = new url.URL(proxyRes.headers.location);
  proxyUrl.hostname += "." + hostRemove;
  proxyRes.headers.location = proxyUrl.toString();
});
