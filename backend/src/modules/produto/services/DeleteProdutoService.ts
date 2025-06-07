import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../repositories/ProdutoRepository";
import AppError from "../../../shared/errors/AppError";
import path from "path";
import uploadConfig from "../../../config/upload";
import fs from "fs";

@injectable()
class DeleteProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: ProdutoRepository,
    ) {
    }

    public async execute(id: number): Promise<void> {
        const produto = await this.produtoRepository.findById(id);

        if (!produto) {
            throw new AppError("Produto não encontrado.", 422);
        }

        let imgFileExists;
        let imgFilePath;
        try {
            await this.produtoRepository.delete(produto);

            if (produto.imagem) {
                imgFilePath = path.join(uploadConfig.directory, produto.imagem);
                imgFileExists = await fs.promises.stat(imgFilePath);
            }
        } catch (error) {
            if ((error as DBError).code === "ENOENT") {
                console.log("Erro ao recuperar arquivo: " + error);
            } else {
                throw error;
            }
        }

        if (imgFileExists) {
            await fs.promises.unlink(imgFilePath!);
        }
    }
}

export default DeleteProdutoService;