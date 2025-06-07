import {Request, Response} from "express";
import {container} from "tsyringe";
import ListProdutoService from "../services/ListProdutoService";
import ShowProdutoService from "../services/ShowProdutoService";
import CreateProdutoService from "../services/CreateProdutoService";
import UpdateProdutoService from "../services/UpdateProdutoService";
import UpdateImagemProdutoService from "../services/UpdateImagemProdutoService";
import ShowImagemProdutoService from "../services/ShowImagemProdutoService";
import DeleteProdutoService from "../services/DeleteProdutoService";
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

    public async update(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const {nome, descricao} = request.body;

        const updateProduto = container.resolve(UpdateProdutoService);
        const produto = await updateProduto.execute({id: Number(id), nome, descricao});
        return response.json(produtoResponseDTO(produto));
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const deleteProduto = container.resolve(DeleteProdutoService);
        await deleteProduto.execute(Number(id));
        return response.status(204).send();
    }

    public async updateImagem(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const updateImagem = container.resolve(UpdateImagemProdutoService);
        const produto = await updateImagem.execute(Number(id), request.file?.filename as string);
        return response.json(produtoResponseDTO(produto));
    }

    public async showImagem(request: Request, response: Response): Promise<void> {
        const {id} = request.params;
        const showImagem = container.resolve(ShowImagemProdutoService);
        const imgFilePath = await showImagem.execute(Number(id));
        return response.sendFile(imgFilePath);
    }
}