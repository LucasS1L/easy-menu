import path from "path";
import fs from "fs";
import {inject, injectable} from "tsyringe";
import {ProdutoRepository} from "../repositories/ProdutoRepository";
import Produto from "../entities/Produto";
import AppError from "../../../shared/errors/AppError";
import uploadConfig from "../../../config/upload";

@injectable()
class UpdateImagemProdutoService {

    constructor(
        @inject(ProdutoRepository)
        private produtoRepository: ProdutoRepository,
    ) {
    }

    public async execute(id: number, imgFilename: string): Promise<Produto> {
        const produto = await this.produtoRepository.findById(id);

        if (!produto) {
            throw new AppError("Produto não encontrado.", 422);
        }

        if (produto.imagem) {
            const imgFilePath = path.join(uploadConfig.directory, produto.imagem);

            let imgFileExists;

            try {
                imgFileExists = await fs.promises.stat(imgFilePath);
            } catch (error) {
                console.log("Erro ao recuperar arquivo:" + error);
            }

            if (imgFileExists) {
                await fs.promises.unlink(imgFilePath);
            }

        }
        produto.imagem = imgFilename;
        await this.produtoRepository.update(produto);
        return produto;
    }
}

export default UpdateImagemProdutoService;