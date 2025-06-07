import {inject, injectable} from "tsyringe";
import {Transactional} from "typeorm-transactional";
import {ProdutoRepository} from "../repositories/ProdutoRepository";
import {ProdutoVariacaoRepository} from "../repositories/ProdutoVariacaoRepository";
import {ICreateProdutoRequest} from "../interfaces/ICreateProdutoRequest";
import AppError from "../../../shared/errors/AppError";
import Produto from "../entities/Produto";

@injectable()
class CreateProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: ProdutoRepository,
        @inject(ProdutoVariacaoRepository)
        private produtoVariacaoRepository: ProdutoVariacaoRepository,
    ) {
    }

    @Transactional()
    public async execute({
                             nome, descricao, tamanho, preco
                         }: ICreateProdutoRequest): Promise<Produto> {

        const produtoExists = await this.produtoRepository.findByNome(nome);

        if (produtoExists) {
            throw new AppError("Já existe um produto com esse nome.", 422);
        }

        const produto = await this.produtoRepository.create({
            nome, descricao
        });

        const produtoVariacao = await this.produtoVariacaoRepository.add({produto, tamanho, preco});

        return {...produto, produtoVariacao: [produtoVariacao]};
    }

}

export default CreateProdutoService;