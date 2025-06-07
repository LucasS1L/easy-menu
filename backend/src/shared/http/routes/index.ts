import {Router} from "express";
import produtoRouter from "../../../modules/produto/routes/produto.routes";
import {notFoundRouter} from "./notFoundRoute";

const routes = Router();

routes.use("/api/v1/produtos", produtoRouter);

routes.use(notFoundRouter);

export default routes;