const http = require("http");
const https = require("https");
const { URL } = require("url");
const { getFromCache, setToCache } = require("../src/services/cacheService");
const { log } = require("./utils/logger");

const config = require("./config/config");

const PORT = config.port;
const TARGET = config.target;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, TARGET);
  const cacheKey = url.toString();

  const cacheData = getFromCache(cacheKey);
  if (cacheData) {
    log(`🚀 Cache HIT para ${url.href}`);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(cacheData);
    return;
  }

  log(`🌐 Acessando ${url.href}`);

  const client = url.protocol === "https:" ? https : http;

  client
    .get(url, (proxyRes) => {
      let data = "";

      proxyRes.on("data", (chunk) => {
        data += chunk;
      });

      proxyRes.on("end", () => {
        setToCache(cacheKey, data);
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.end(data);
      });
    })
    .on("error", (err) => {
      log(`❌ Erro ao acessar ${url.href}: ${err.message}`);
      res.writeHead(500);
      res.end("Erro interno no servidor proxy");
    });
});

server.listen(PORT, () => {
  log(`🚀 Servidor proxy rodando em http://localhost:${PORT}`);
});
