import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../repositories/ProdutoRepository";
import AppError from "../../../shared/errors/AppError";
import path from "path";
import uploadConfig from "../../../config/upload";
import fs from "fs";

@injectable()
class ShowImagemProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: ProdutoRepository
    ) {
    }

    public async execute(id: number): Promise<string> {
        const produto = await this.produtoRepository.findById(id);

        if (!produto) {
            throw new AppError("Produto não encontrado.", 404);
        }

        if (!produto.imagem) {
            throw new AppError("Produto sem imagem cadastrada.", 404);
        }

        const imgFilePath = path.join(uploadConfig.directory, produto.imagem);

        try {
            await fs.promises.stat(imgFilePath);
        } catch (error) {
            throw new AppError("Imagem não encontrada.", 404);
        }

        return imgFilePath;
    }
}

export default ShowImagemProdutoService;