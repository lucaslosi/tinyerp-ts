# TinyERP SDK

SDK em TypeScript para a API do Tiny ERP.

## Descrição

Este pacote fornece uma integração fácil com a API do Tiny ERP, transformando a documentação Swagger oficial em um SDK TypeScript totalmente tipado. Ideal para aplicações Node.js e TypeScript que precisam integrar com o Tiny ERP.

## Aviso de Isenção

**Este projeto não possui nenhuma afiliação oficial com a organização Tiny ERP.** Trata-se de um projeto independente criado para facilitar a integração com a API pública do Tiny ERP.

## Instalação

```bash
npm install tinyerp-js
# ou
yarn add tinyerp-js
# ou
pnpm add tinyerp-js
```

## Configuração

Antes de usar o SDK, você precisa configurar com seu token de acesso:

```typescript
import { OpenAPI } from "tinyerp-js";

// Configure a API com seu token
OpenAPI.TOKEN = "seu-token-aqui";

// Opcionalmente, você pode alterar a URL base se necessário
// OpenAPI.BASE = 'https://api.customizada.com.br';
```

## Exemplo de Uso

```typescript
import { OpenAPI, listarProdutosAction } from "tinyerp-js";

// Configure o token
OpenAPI.TOKEN = "seu-token-aqui";

// Exemplo: Listar produtos
async function listarProdutos() {
  try {
    const response = await listarProdutosAction({
      // Parâmetros da requisição aqui
    });

    console.log("Produtos:", response.items);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

listarProdutos();
```

## Interceptadores

O SDK possui suporte para interceptadores que permitem modificar requisições e respostas:

```typescript
// Interceptador de requisição
OpenAPI.interceptors.request.use((config) => {
  // Modificar a configuração da requisição
  console.log("Requisição enviada para:", config.url);
  return config;
});

// Interceptador de resposta
OpenAPI.interceptors.response.use((response) => {
  // Processar a resposta
  console.log("Resposta recebida com status:", response.status);
  return response;
});
```

## Regenerando o SDK

Este SDK é gerado automaticamente a partir da documentação Swagger do Tiny ERP. Para regenerar manualmente:

```bash
npm run generate
```

### Atualizações Automáticas

Este pacote é atualizado automaticamente toda semana através de uma GitHub Action que:

1. Verifica semanalmente se houve mudanças na API do Tiny ERP
2. Se houver alterações, gera uma nova versão do SDK
3. Incrementa automaticamente a versão do pacote
4. Cria uma tag e release no GitHub
5. Publica a nova versão no NPM

Isso garante que você sempre tenha acesso às funcionalidades mais recentes da API do Tiny ERP sem intervenção manual.

## Documentação

Para mais informações sobre como usar este SDK, consulte:

- [Exemplos](./examples/demo.ts)

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Autor

Mantido por [@lucaslosi](https://github.com/lucaslosi)

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
