import AppError from "../../../shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {ProdutoVariacaoRepository} from "../repositories/ProdutoVariacaoRepository";
import {ProdutoRepository} from "../repositories/ProdutoRepository";
import {IAddProdutoVariacaoRequest} from "../interfaces/IAddProdutoVariacaoRequest";
import ProdutoVariacao from "../entities/ProdutoVariacao";

@injectable()
class AddProdutoVariacaoService {

    constructor(
        @inject(ProdutoVariacaoRepository)
        private produtoVariacaoRepository: ProdutoVariacaoRepository,
        @inject(ProdutoRepository)
        private produtoRepository: ProdutoRepository,
    ) {
    }

    public async execute({produtoId, tamanho, preco}: IAddProdutoVariacaoRequest): Promise<ProdutoVariacao> {
        const produto = await this.produtoRepository.findById(produtoId);

        if (!produto) {
            throw new AppError("Produto não encontrado.", 422);
        }

        const variacaoExists = await this.produtoVariacaoRepository.findDuplicated(tamanho, produto.id);
        if (variacaoExists) {
            throw new AppError("Variação já existente.", 422);
        }

        return await this.produtoVariacaoRepository.add({produto, tamanho, preco});
    }

}

export default AddProdutoVariacaoService;