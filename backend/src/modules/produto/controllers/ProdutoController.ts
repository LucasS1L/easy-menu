import {Request, Response} from "express";
import {container} from "tsyringe";
import CreateProdutoService from "../services/CreateProdutoService";
import produtoResponseDTO from "../dto/produtoResponseDTO";

export default class ProdutoController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {nome, descricao, subcategoriaId, tamanho, preco} = request.body;
        const createProduto = container.resolve(CreateProdutoService);
        const produto = await createProduto.execute({
            nome, descricao, subcategoriaId, tamanho, preco
        });
        return response.json(produtoResponseDTO(produto));
    }
}