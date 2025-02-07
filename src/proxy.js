const http = require("http");
const { URL } = require("url");
const EnvService = require("../src/services/config/env.config");
const { getFromCache, setToCache } = require("../src/services/cacheService");
const { log } = require("./utils/logger");

const configService = new EnvService();
const PORT = configService.getPort;
const TARGET = configService.getTarget;

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

  http
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
