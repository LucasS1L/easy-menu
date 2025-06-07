import {Router} from "express";
import {celebrate, Joi, Segments} from "celebrate";
import ProdutoVariacaoController from "../controllers/ProdutoVariacaoController";

const produtoVariacaoRouter = Router();
const produtoVariacaoController = new ProdutoVariacaoController();

produtoVariacaoRouter.post("/",
    celebrate({
        [Segments.BODY]: {
            produtoId: Joi.number().integer().min(1).required(),
            tamanho: Joi.string().trim().max(10).required(),
            preco: Joi.number().precision(2).required(),
        },
    }),
    produtoVariacaoController.add
);

export default produtoVariacaoRouter;