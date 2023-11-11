import React from "react";
import {CANVAS_ROUTE} from "../utils/consts";
import Layout from "../pages/Layout";

export const canvasRouter = [
    {
        path: CANVAS_ROUTE + '/:id',
        element: <Layout />,
        errorElement: <Layout />,
    },
]