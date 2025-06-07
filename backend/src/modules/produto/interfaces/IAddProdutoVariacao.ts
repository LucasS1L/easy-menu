import Produto from "../entities/Produto";

export interface IAddProdutoVariacao {
    produto: Produto;
    tamanho: string;
    preco: number;
}