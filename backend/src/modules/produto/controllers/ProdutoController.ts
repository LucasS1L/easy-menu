import {Request, Response} from "express";
import {container} from "tsyringe";
import ListProdutoService from "../services/ListProdutoService";
import ShowProdutoService from "../services/ShowProdutoService";
import CreateProdutoService from "../services/CreateProdutoService";
import produtoResponseDTO from "../dto/produtoResponseDTO";
import toDTOList from "../../../shared/util/toDTOList";

export default class ProdutoController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listProduto = container.resolve(ListProdutoService);
        const produtos = await listProduto.execute();
        return response.json(toDTOList(produtos, produtoResponseDTO));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const showProduto = container.resolve(ShowProdutoService);
        const produto = await showProduto.execute(Number(id));
        return response.json(produtoResponseDTO(produto));
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {nome, descricao, subcategoriaId, tamanho, preco} = request.body;
        const createProduto = container.resolve(CreateProdutoService);
        const produto = await createProduto.execute({
            nome, descricao, subcategoriaId, tamanho, preco
        });
        return response.json(produtoResponseDTO(produto));
    }
}