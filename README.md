
---

# Proxy Cache CLI

![Proxy Cache CLI](https://img.shields.io/badge/Node.js-16%2B-green) ![License](https://img.shields.io/badge/license-MIT-blue)

**Proxy Cache CLI** é uma ferramenta simples de linha de comando (CLI) que cria um servidor proxy com cache para otimizar requisições HTTP. Ao encaminhar requisições para um servidor real, ele armazena as respostas em cache e, nas próximas requisições com os mesmos parâmetros, serve os dados diretamente do cache, melhorando a performance e reduzindo o tráfego.

## 🚀 Funcionalidades
- **Proxy com cache:** Encaminha requisições para um servidor real e armazena as respostas em cache.
- **Requisições repetidas:** Se a mesma solicitação for feita novamente, a resposta será servida diretamente do cache, sem precisar chamar o servidor real.
- **Configuração via CLI:** Permite configurar a porta e o servidor de destino diretamente pela linha de comando.

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

### Como executar o proxy

Para iniciar o servidor proxy com cache, execute o comando:

```bash
./proxy.js --port 4000 --target https://jsonplaceholder.typicode.com
```

Aqui, você está configurando o proxy para ouvir na porta `4000` e encaminhar as requisições para o servidor de destino `https://jsonplaceholder.typicode.com`.

### Exemplo de requisição

Após iniciar o proxy, você pode fazer requisições para o servidor proxy da seguinte forma:

```bash
curl http://localhost:4000/todos/1
```

O servidor proxy irá encaminhar essa requisição para o destino `https://jsonplaceholder.typicode.com/todos/1`, e na primeira vez que for feita, ele irá armazenar a resposta em cache. Nas próximas requisições para o mesmo endpoint, a resposta será retornada diretamente do cache, melhorando o tempo de resposta.

## ⚙️ Configuração

O projeto permite que você configure os seguintes parâmetros via CLI:

| Parâmetro         | Descrição                           | Padrão   |
|-------------------|-----------------------------------|----------|
| `--port` ou `-p`   | Define a porta do proxy          | `3000`   |
| `--target` ou `-t` | URL do servidor de destino      | Obrigatório |

Exemplo de como configurar:

```bash
./proxy.js --port 5000 --target https://jsonplaceholder.typicode.com
```

Este comando irá rodar o servidor proxy na porta `5000`, redirecionando as requisições para o servidor `https://jsonplaceholder.typicode.com`.

## 🧑‍💻 Como Funciona

O código implementa um **servidor HTTP** que age como um proxy para outro servidor. Ele possui duas funções principais:

1. **Cache de Respostas:** Quando uma requisição é feita, ele verifica se já existe uma resposta em cache para aquele endpoint. Se a resposta estiver no cache, ela é retornada diretamente. Caso contrário, a requisição é encaminhada para o servidor de destino e a resposta é armazenada no cache para futuras requisições.
   
2. **Encaminhamento de Requisição:** Caso a resposta não esteja no cache, a requisição é feita ao servidor de destino configurado. A resposta é então retornada ao cliente e armazenada no cache para otimizar a próxima requisição.

### Arquitetura do Código

- **`proxy.js`**: O arquivo principal, onde o servidor proxy é configurado e executado.
- **`cacheService.js`**: Responsável pela implementação do cache. Ele utiliza um mapa (`Map`) para armazenar as respostas em memória.
- **`env.config.js`**: Serviço de configuração que carrega as variáveis de ambiente necessárias (como `PORT` e `TARGET`).
- **`logger.js`**: Utilitário para logar eventos de execução, como quando uma requisição é servida do cache ou quando há erros.

### Fluxo de Requisição

1. O servidor proxy recebe uma requisição na porta configurada.
2. Ele verifica se a resposta já está no cache.
   - Se estiver, a resposta é retornada imediatamente.
   - Se não estiver, a requisição é encaminhada para o servidor de destino configurado (`TARGET`).
3. A resposta do servidor de destino é então armazenada no cache para futuras requisições.
4. Caso ocorra algum erro ao tentar acessar o servidor de destino, o servidor proxy retorna uma mensagem de erro 500.

## 💡 Melhorias Futuras
- **Suporte a Redis para cache persistente:** Atualizar o sistema de cache para usar o Redis, permitindo persistir as respostas em cache entre reinicializações do servidor.
- **Logs detalhados de requisições:** Melhorar o sistema de logs para monitorar as requisições de forma mais detalhada, incluindo tempos de resposta e erros.
- **Endpoint para limpar o cache manualmente:** Criar um endpoint que permita ao usuário limpar o cache quando necessário, útil para situações onde as respostas podem estar desatualizadas.

## 📄 Licença
Este projeto está sob a licença MIT.

## 📬 Contato
- **LinkedIn:** [Emanoel Carvalho](https://www.linkedin.com/in/emanoelcarvalho/)
- **GitHub:** [@emanoelCarvalho](https://github.com/emanoelCarvalho/)
- **Dev.to:** [@emanoelcarvalho](https://dev.to/emanoelcarvalho)
- **Email:** emanoel718@gmail.com

---

### Explicações adicionais:

1. **Cache:**
   - O cache é armazenado na memória do servidor utilizando um **Map**, que é uma estrutura de dados que permite associar um valor a uma chave. Neste caso, a chave é a URL da requisição e o valor é a resposta do servidor de destino.
   - O cache serve para otimizar o tempo de resposta para requisições repetidas ao mesmo endpoint.

2. **Servidor Proxy:**
   - O servidor HTTP escuta na porta configurada e redireciona as requisições para o servidor de destino (`TARGET`).
   - Ele é responsável por interceptar as requisições, verificar o cache e, se necessário, buscar a resposta do servidor real.

---
