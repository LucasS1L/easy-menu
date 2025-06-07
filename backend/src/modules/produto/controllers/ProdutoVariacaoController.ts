import {Request, Response} from "express";
import {container} from "tsyringe";
import AddProdutoVariacaoService from "../services/AddProdutoVariacaoService";
import produtoVariacaoResponseDTO from "../dto/produtoVariacaoResponseDTO";

export default class ProdutoVariacaoController {

    public async add(request: Request, response: Response): Promise<Response> {
        const {produtoId, tamanho, preco} = request.body;
        const createProdutoVariacao = container.resolve(AddProdutoVariacaoService);
        const produtoVariacao = await createProdutoVariacao.execute({produtoId, tamanho, preco});
        return response.json(produtoVariacaoResponseDTO(produtoVariacao));
    }

}