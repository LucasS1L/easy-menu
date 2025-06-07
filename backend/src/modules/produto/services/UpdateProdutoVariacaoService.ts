import {inject, injectable} from "tsyringe";
import {ProdutoVariacaoRepository} from "../repositories/ProdutoVariacaoRepository";
import AppError from "../../../shared/errors/AppError";
import {IUpdateProdutoVariacaoRequest} from "../interfaces/IUpdateProdutoVariacaoRequest";
import ProdutoVariacao from "../entities/ProdutoVariacao";

@injectable()
class UpdateProdutoVariacaoService {

    constructor(
        @inject(ProdutoVariacaoRepository)
        private produtoVariacaoRepository: ProdutoVariacaoRepository,
    ) {
    }

    public async execute({id, tamanho, preco}: IUpdateProdutoVariacaoRequest): Promise<ProdutoVariacao> {
        const variacao = await this.produtoVariacaoRepository.findById(id);

        if (!variacao) {
            throw new AppError("Variação não encontrada.", 422);
        }

        if (tamanho) {
            const variacaoExists = await this.produtoVariacaoRepository.findDuplicated(tamanho, variacao.produto.id);
            if (variacaoExists && variacaoExists.id !== variacao.id) {
                throw new AppError("Variação já existente.", 422);
            }
            variacao.tamanho = tamanho;
        }

        if (preco) variacao.preco = preco;

        await this.produtoVariacaoRepository.update(variacao);
        return variacao;
    }
}

export default UpdateProdutoVariacaoService;