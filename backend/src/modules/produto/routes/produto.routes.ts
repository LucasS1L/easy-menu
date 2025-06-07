import ProdutoController from "../controllers/ProdutoController";
import {Router} from "express";
import {celebrate, Joi, Segments} from "celebrate";

const produtoRouter = Router();
const produtoController = new ProdutoController();

produtoRouter.post("/",
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().trim().max(50).required(),
            descricao: Joi.string().trim().max(300).required(),
            tamanho: Joi.string().trim().max(10).required(),
            preco: Joi.number().precision(2).required(),
        },
    }),
    produtoController.create
);

export default produtoRouter;