import { createBrowserRouter } from "react-router-dom";

import { SignIn } from "./pages/Autenticação/login";
import { LayoutApp } from "./pages/_layouts/app";
import { LayoutAutenticação } from "./pages/_layouts/autenti";
import { SignUp } from "./pages/Autenticação/cadastro";
import { Pedidos } from "./pages/app/pedidos/pedidos";
import { Dashboard } from "./pages/Dashboard/dashboard";
import { NotFound } from "./pages/404";



export const rotas = createBrowserRouter([
    // // quando acessar tal rota, caira no elemento tal
    // rota da pagina principal, utiliza-se o children para aparecer outra pagina na tela tb
    {
        path: '/',
        element: <LayoutApp />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Dashboard />, },
            { path: '/pedidos', element: <Pedidos /> }
        ],
    },
    {
        path: '/',
        element: <LayoutAutenticação />,
        children: [
            {
                path: '/sign-in',
                element: <SignIn />,
            },
            {
                path: '/sign-up',
                element: <SignUp />,
            },
        ],
    },
])