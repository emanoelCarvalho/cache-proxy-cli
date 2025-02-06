#!/usr/bin/env node

const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const { Command } = require("commander");

const app = express();
const cache = new NodeCache({
  stdTTL: 60,
});

const program = new Command();

program
  .version("1.0.0")
  .description("Proxy Server CLI with Caching")
  .option("-p, --port <number>", "Porta do proxy", "3000")
  .option("-t, --target <url>", "URL do servidor real")
  .parse(process.argv);

const options = program.opts();

if (!options.target) {
  console.error(
    "Erro: Você precisa fornecer um servidor de destino com --target <URL>"
  );
  process.exit(1);
}

const PORT = options.port;
const TARGET_URL = options.target;

app.use(async (req, res) => {
  const cacheKey = `${req.method}:${req.url}`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    console.log(`Cache hit: ${req.url}`);
    return res.send(cachedResponse);
  }

  try {
    console.log(`Cache miss: ${req.url}, encaminhando para ${TARGET_URL}`);
    const response = await axios({
      method: req.method,
      url: `${TARGET_URL}${req.url}`,
      headers: req.headers,
      data: req.body,
    });

    cache.set(cacheKey, response.data);
    res.send(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.listen(PORT, () => {
    console.log("Servidor proxy rodando na porta", PORT);
    console.log("Encaminhando requisições para", TARGET_URL);
})