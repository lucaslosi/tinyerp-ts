/**
 * Exemplos de uso do SDK do Tiny ERP
 *
 * Este arquivo contém exemplos práticos de como utilizar o SDK para interagir
 * com a API do Tiny ERP em um projeto Node.js/TypeScript.
 */

import {
  ApiError,
  CriarPedidoActionData,
  OpenAPI,
  criarPedidoAction,
  listarProdutosAction,
  obterProdutoAction,
} from "../src";

// Configurar o token de acesso (substitua por seu token real)
OpenAPI.TOKEN = "seu-token-aqui";

/**
 * Exemplo: Listar produtos
 */
async function listarProdutos() {
  try {
    const resposta = await listarProdutosAction({
      nome: "Blusa",
    });
    console.log("=== Lista de Produtos ===");
    console.log(`Total de registros: ${resposta.itens?.length}`);
    resposta.itens?.forEach((produto) => {
      console.log(`ID: ${produto.id}`);
      console.log(`Nome: ${produto.descricao}`);
      console.log(`Preço: R$ ${produto.precos?.preco}`);
      console.log("-------------------------");
    });

    return resposta;
  } catch (erro) {
    if (erro instanceof ApiError) {
      console.error(`Erro da API (${erro.status}): ${erro.message}`);
    } else {
      console.error("Erro desconhecido:", erro);
    }
    throw erro;
  }
}

/**
 * Exemplo: Buscar detalhes de um produto específico
 */
async function buscarProduto(id: string) {
  try {
    const resposta = await obterProdutoAction({
      idProduto: parseInt(id, 10),
    });

    console.log("=== Detalhes do Produto ===");
    console.log(`ID: ${resposta.id}`);
    console.log(`Nome: ${resposta.descricao}`);
    console.log(`Preço: R$ ${resposta.precos?.preco}`);

    return resposta;
  } catch (erro) {
    if (erro instanceof ApiError) {
      if (erro.status === 404) {
        console.error(`Produto com ID ${id} não encontrado`);
      } else {
        console.error(`Erro da API (${erro.status}): ${erro.message}`);
      }
    } else {
      console.error("Erro desconhecido:", erro);
    }
    throw erro;
  }
}

/**
 * Exemplo: Criar um novo pedido
 */
async function criarPedido() {
  try {
    const novoPedido: CriarPedidoActionData = {
      requestBody: {
        idContato: 12345,
        itens: [
          {
            produto: {
              id: 12345,
            },
            quantidade: 2,
            valorUnitario: 29.9,
          },
          {
            produto: {
              id: 67890,
            },
            quantidade: 1,
            valorUnitario: 49.9,
          },
        ],
        pagamento: {
          formaPagamento: {
            id: 123,
          },
          meioPagamento: {
            id: 123,
          },
        },
      },
    };

    const resposta = await criarPedidoAction(novoPedido);

    console.log("=== Pedido Criado com Sucesso ===");
    console.log(`ID do Pedido: ${resposta.id}`);
    console.log(`Número do Pedido: ${resposta.numeroPedido}`);

    return resposta;
  } catch (erro) {
    if (erro instanceof ApiError) {
      console.error(`Erro ao criar pedido (${erro.status}): ${erro.message}`);
      if (erro.body) {
        console.error("Detalhes do erro:", erro.body);
      }
    } else {
      console.error("Erro desconhecido:", erro);
    }
    throw erro;
  }
}

/**
 * Exemplo de uso com interceptadores
 */
function configurarInterceptadores() {
  // Interceptador de requisição
  OpenAPI.interceptors.request.use((config) => {
    console.log(`[${new Date().toISOString()}] Enviando requisição`);
    return config;
  });

  // Interceptador de resposta
  OpenAPI.interceptors.response.use((response) => {
    console.log(
      `[${new Date().toISOString()}] Resposta recebida: ${response.status}`
    );
    return response;
  });

  console.log("Interceptadores configurados com sucesso");
}

/**
 * Exemplo: Executar demonstrações
 */
async function executarDemos() {
  configurarInterceptadores();

  try {
    console.log("\n\n============= INÍCIO DA DEMONSTRAÇÃO =============\n");

    // Listar produtos
    await listarProdutos();

    // Buscar produto específico (substitua pelo ID real de um produto)
    // await buscarProduto('12345');

    // Criar pedido
    // await criarPedido();

    console.log("\n============= FIM DA DEMONSTRAÇÃO =============");
  } catch (erro) {
    console.error("Erro durante a demonstração:", erro);
  }
}

// Descomente a linha abaixo para executar as demonstrações
// executarDemos();

export {
  buscarProduto,
  configurarInterceptadores,
  criarPedido,
  executarDemos,
  listarProdutos,
};
