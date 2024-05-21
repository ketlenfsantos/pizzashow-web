// CABEÇALHO DA PAGINA PRINCIPAL.

import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./nav-link"
import { BotãoTrocaDoTema } from "./theme/botão-troca-tema";
import { MenuConta } from "./menu-conta";

export function Header() {
    return (
        <div className=" border-b">
            <div className=" flex h-16 items-center gap-6 px-6">
                <Pizza className=" h-6 w-6" />
                {/* separator é uma linha que separa  */}
                <Separator orientation='vertical' className='h-6' />
                <nav className=" flex items-center space-x-4 lg:space-x-6">
                    <NavLink to='/'>
                        <Home className=' h-4 w-4' />
                        Início
                    </NavLink>

                    <NavLink to="/pedidos">
                        <UtensilsCrossed className=' h-4 w-4' />
                        Pedidos
                    </NavLink>

                </nav>

                <div className=" ml-auto flex items-center gap-2 " >
                    <BotãoTrocaDoTema />
                    <MenuConta />
                </div>

            </div>

        </div>
    )
}
