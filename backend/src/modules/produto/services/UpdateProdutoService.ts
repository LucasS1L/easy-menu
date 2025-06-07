import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../repositories/ProdutoRepository";
import {IUpdateProdutoRequest} from "../interfaces/IUpdateProdutoRequest";
import AppError from "../../../shared/errors/AppError";
import Produto from "../entities/Produto";

@injectable()
class UpdateProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: ProdutoRepository,
    ) {
    }

    public async execute({id, nome, descricao}: IUpdateProdutoRequest): Promise<Produto> {
        const produto = await this.produtoRepository.findById(id);

        if (!produto) {
            throw new AppError("Produto não encontrado.", 422);
        }

        if (nome) {
            const produtoExists = await this.produtoRepository.findByNome(nome);
            if (produtoExists && produtoExists.id !== produto.id) {
                throw new AppError("Já existe um produto com esse nome.", 422);
            }
            produto.nome = nome;
        }

        if (descricao) produto.descricao = descricao;
        await this.produtoRepository.update(produto);
        return produto;
    }
}

export default UpdateProdutoService;