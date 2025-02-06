# Proxy Cache CLI

![Proxy Cache CLI](https://img.shields.io/badge/Node.js-16%2B-green) ![License](https://img.shields.io/badge/license-MIT-blue)

Uma ferramenta CLI que inicia um servidor proxy com cache, armazenando respostas e otimizando requisições repetidas.

## 🚀 Funcionalidades
- Encaminha requisições para um servidor real.
- Armazena em cache as respostas.
- Retorna do cache se a mesma solicitação for feita novamente.
- Configuração via CLI.

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
# Clone o projeto
git clone https://github.com/emanoelCarvalho/proxy-cache-cli.git
cd proxy-cache-cli

# Instale as dependências
npm install
```

## 🛠 Uso

Para iniciar o proxy, execute:

```bash
./proxy.js --port 4000 --target https://jsonplaceholder.typicode.com
```

Exemplo de requisição ao proxy:

```bash
curl http://localhost:4000/todos/1
```

## ⚙️ Configuração

| Parâmetro         | Descrição                           | Padrão   |
|-------------------|-----------------------------------|----------|
| `--port` ou `-p` | Define a porta do proxy          | `3000`   |
| `--target` ou `-t` | URL do servidor de destino      | Obrigatório |

## 💡 Melhorias Futuras
- Suporte a Redis para cache persistente.
- Logs detalhados de requisições.
- Endpoint para limpar o cache manualmente.

## 📄 Licença
Este projeto está sob a licença MIT.

## 📬 Contato
- **LinkedIn:** [Emanoel Carvalho](https://www.linkedin.com/in/emanoelcarvalho/)
- **GitHub:** [@emanoelCarvalho](https://github.com/emanoelCarvalho/)
- **Dev.to:** [@emanoelcarvalho](https://dev.to/emanoelcarvalho)
- **Email:** emanoel718@gmail.com

