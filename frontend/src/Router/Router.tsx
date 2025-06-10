import {Routes, Route} from "react-router-dom";
import {ROUTES} from "./ROUTES.ts";

import Home from "../Pages/Home/Home.tsx";


export default function Router(){
    return(
        <Routes>
            <Route path={ROUTES.home} element={ <Home/>}></Route>
        </Routes>
    )
}