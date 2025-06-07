import ProdutoVariacao from "../entities/ProdutoVariacao";

export default function produtoVariacaoResponseDTO(produtoVariacao: ProdutoVariacao) {
    return {
        id: produtoVariacao.id,
        tamanho: produtoVariacao.tamanho,
        preco: produtoVariacao.preco,
    };
}