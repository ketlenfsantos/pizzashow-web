//MENU PARA EDITAR CADASTRO/CONTA

import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function MenuConta() {
    return (
        <DropdownMenu>
            {/* um botão dentro de outro, o button tem estilização, o dropdown é o botao real */}
            <DropdownMenuTrigger asChild>
                {/* botão que vai abrir menu */}
                <Button variant={"outline"} className=" flex items-center gap-2 select-none">
                    Nome da Loja
                    <ChevronDown className=" w-4 h-4" />
                </Button>

            </DropdownMenuTrigger>
            {/* CONTEÚDO DO MENU */}
            <DropdownMenuContent align="end" className=" w-56">
                {/* item não clicavel do menu */}
                <DropdownMenuLabel className=" flex flex-col">
                    <span> Ketlen Figueiredo</span>
                    <span className=" text-xs font-normal text-muted-foreground">
                        ketlen@email.com.br
                    </span>
                </DropdownMenuLabel>
                {/* linha para separar */}
                <DropdownMenuSeparator />

                {/* ITENS CLICAVEIS DO MENU */}
                <DropdownMenuItem>
                    <Building className=" mr-4 h-4 w-4" />
                    <span> Perfil da Loja</span>
                </DropdownMenuItem>

                <DropdownMenuItem className=" text-rose-500 dark:text-rose-400">
                    <LogOut className=" mr-4 h-4 w-4" />
                    <span> Sair</span>
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}