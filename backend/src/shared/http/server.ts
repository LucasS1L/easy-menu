import {app} from "./app";
import {dataSource} from "../typeorm";

dataSource.initialize().then(() => {
    app.listen(3333, () => {
        return console.log("Server rodando na porta 3333!");
    });
});