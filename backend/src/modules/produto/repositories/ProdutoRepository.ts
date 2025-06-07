import {Repository} from "typeorm";
import {dataSource} from "../../../shared/typeorm";
import Produto from "../entities/Produto";
import {ICreateProduto} from "../interfaces/ICreateProduto";

export class ProdutoRepository {
    private ormRepository: Repository<Produto>;

    constructor() {
        this.ormRepository = dataSource.getRepository(Produto);
    }

    public async findByNome(nome: string): Promise<Produto | null> {
        return await this.ormRepository.findOneBy({nome});
    }

    public async create({nome, descricao}: ICreateProduto): Promise<Produto> {
        const produto = this.ormRepository.create({nome, descricao});
        await this.ormRepository.save(produto);
        return produto;
    }
}
