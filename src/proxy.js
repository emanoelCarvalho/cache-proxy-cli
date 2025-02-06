const http = require('http');
const { URL } = require('url');

const PORT = 4000;
const TARGET = 'http://jsonplaceholder.typicode.com'; // Servidor real
const cache = new Map(); // Cache em memória

// Criação do servidor proxy
const server = http.createServer((req, res) => {
    const url = new URL(req.url, TARGET);
    const cacheKey = url.toString();

    // Se a resposta já estiver no cache, retorna diretamente
    if (cache.has(cacheKey)) {
        console.log(`🔄 Servindo do cache: ${cacheKey}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(cache.get(cacheKey));
        return;
    }

    console.log(`➡️ Encaminhando requisição para ${url.href}`);

    // Faz a requisição ao servidor real
    http.get(url, (proxyRes) => {
        let data = '';

        proxyRes.on('data', (chunk) => {
            data += chunk;
        });

        proxyRes.on('end', () => {
            // Armazena a resposta no cache
            cache.set(cacheKey, data);
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            res.end(data);
        });
    }).on('error', (err) => {
        console.error(`Erro ao acessar ${url.href}: ${err.message}`);
        res.writeHead(500);
        res.end('Erro interno no servidor proxy');
    });
});

// Inicia o servidor proxy
server.listen(PORT, () => {
    console.log(`🚀 Proxy rodando em http://localhost:${PORT}`);
});
