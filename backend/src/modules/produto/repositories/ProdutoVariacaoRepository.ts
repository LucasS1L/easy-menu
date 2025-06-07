import {Repository} from "typeorm";
import {dataSource} from "../../../shared/typeorm";
import ProdutoVariacao from "../entities/ProdutoVariacao";
import {IAddProdutoVariacao} from "../interfaces/IAddProdutoVariacao";

export class ProdutoVariacaoRepository {
    private ormRepository: Repository<ProdutoVariacao>;

    constructor() {
        this.ormRepository = dataSource.getRepository(ProdutoVariacao);
    }

    public async findDuplicated(tamanho: string, produtoId: number): Promise<ProdutoVariacao | null> {
        return await this.ormRepository.findOne({
            relations: ["produto"], where: {
                tamanho, produto: {
                    id: produtoId,
                },
            }
        });
    }

    public async add({produto, tamanho, preco}: IAddProdutoVariacao): Promise<ProdutoVariacao> {
        const produtoVariacao = this.ormRepository.create({produto, tamanho, preco});
        await this.ormRepository.save(produtoVariacao);
        return produtoVariacao;
    }
}
