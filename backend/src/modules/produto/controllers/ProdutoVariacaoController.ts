import {Request, Response} from "express";
import {container} from "tsyringe";
import AddProdutoVariacaoService from "../services/AddProdutoVariacaoService";
import UpdateProdutoVariacaoService from "../services/UpdateProdutoVariacaoService";
import produtoVariacaoResponseDTO from "../dto/produtoVariacaoResponseDTO";

export default class ProdutoVariacaoController {

    public async add(request: Request, response: Response): Promise<Response> {
        const {produtoId, tamanho, preco} = request.body;
        const createProdutoVariacao = container.resolve(AddProdutoVariacaoService);
        const produtoVariacao = await createProdutoVariacao.execute({produtoId, tamanho, preco});
        return response.json(produtoVariacaoResponseDTO(produtoVariacao));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const {tamanho, preco} = request.body;
        const updateProdutoVariacao = container.resolve(UpdateProdutoVariacaoService);
        const produtoVariacao = await updateProdutoVariacao.execute({
            id: Number(id), tamanho, preco
        });
        return response.json(produtoVariacaoResponseDTO(produtoVariacao));
    }

}