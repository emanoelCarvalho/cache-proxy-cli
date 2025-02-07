const http = require("http");
const { URL } = require("url");

const config = require("./services/configService");

const PORT = config.getEnv("PORT");
const TARGET = config.getEnv("TARGET");

const cache = new Map();

const server = http.createServer((req, res) => {
  const url = new URL(req.url, TARGET);
  const cacheKey = url.toString();

  if (cache.has(cacheKey)) {
    console.log(`🔄 Servindo do cache: ${cacheKey}`);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(cache.get(cacheKey));
    return;
  }

  console.log(`➡️ Encaminhando requisição para ${url.href}`);

  http
    .get(url, (proxyRes) => {
      let data = "";

      proxyRes.on("data", (chunk) => {
        data += chunk;
      });

      proxyRes.on("end", () => {
        cache.set(cacheKey, data);
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.end(data);
      });
    })
    .on("error", (err) => {
      console.error(`Erro ao acessar ${url.href}: ${err.message}`);
      res.writeHead(500);
      res.end("Erro interno no servidor proxy");
    });
});

server.listen(PORT, () => {
  console.log(`🚀 Proxy rodando em http://localhost:${PORT}`);
});
