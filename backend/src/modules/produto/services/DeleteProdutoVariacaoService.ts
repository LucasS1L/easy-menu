import {inject, injectable} from "tsyringe";
import {ProdutoVariacaoRepository} from "../repositories/ProdutoVariacaoRepository";
import AppError from "../../../shared/errors/AppError";

@injectable()
class DeleteProdutoVariacaoService {

    constructor(
        @inject(ProdutoVariacaoRepository)
        private produtoVariacaoRepository: ProdutoVariacaoRepository,
    ) {
    }

    public async execute(id: number): Promise<void> {
        const variacao = await this.produtoVariacaoRepository.findById(id);

        if (!variacao) {
            throw new AppError("Variação não encontrada.", 422);
        }

        await this.produtoVariacaoRepository.delete(variacao);
    }
}

export default DeleteProdutoVariacaoService;