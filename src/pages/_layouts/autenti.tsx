// LAYOUT DA PAGINA DE AUTENTICAÇÃO.

import { Outlet } from "react-router-dom";
import { Pizza } from 'lucide-react'

export function LayoutAutenticação() {
    return (
        // min-h-screen - tela ocupe altura inteira do navegador
        // grid-cols-2 = tela divida em 2
        //  abaixo, div com cor de fundo. Ocupará a altura inteira e tera duas colunas
        <div className="grid min-h-screen grid-cols-2 antialiased">

            {/* foreground sempre será a cor oposta do background(tudo que vai por cima)
            valor default: background */}
            <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
                {/* div que o logo ficará dentro */}
                <div className="flex items-center gap-3 text-lg text-foreground">
                    <Pizza className="h-5 w-5" />
                    <span className="font-semibold">pizza.shop</span>
                </div>

                <footer className="text-sm">
                    Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
                </footer>
            </div>
            {/* todo conteudo do login fique centralizado */}
            <div className="flex flex-col items-center justify-center relative">
                <Outlet />
            </div>
        </div>
    )
}