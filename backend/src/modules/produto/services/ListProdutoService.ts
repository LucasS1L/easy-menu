import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../repositories/ProdutoRepository";
import Produto from "../entities/Produto";

@injectable()
class ListProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: ProdutoRepository,
    ) {
    }

    public async execute(): Promise<Produto[]> {
        return await this.produtoRepository.findAll();
    }
}

export default ListProdutoService;