import {Router} from "express";
import {notFoundRouter} from "./notFoundRoute";

const routes = Router();

routes.use(notFoundRouter);

export default routes;