import {createBrowserRouter} from "react-router-dom";
import {canvasRouter} from "./routes";

export function useAppRouter(){
    return createBrowserRouter(canvasRouter)
}