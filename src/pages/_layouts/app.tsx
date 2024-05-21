// LAYOUT PARA O APP

import { Header } from "@/components/cabeçalho";
import { Outlet } from "react-router-dom";

export function LayoutApp() {
    return (
        <div className=" flex min-h-screen flex-col antialiased">

            <Header />

            <div className=" flex flex-1 flex-col gap-4 p-8 pt-6">

                {/* componente especial do reacter, OUTLET, especificar onde fica o 
            conteudo especifico de cada pagina, não se repetirá em outras */}
                <Outlet />

            </div>
        </div>
    )
}