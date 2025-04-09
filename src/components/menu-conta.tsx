//MENU PARA EDITAR CADASTRO/CONTA

import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { StoreProfileDialog } from "./ui/store-profile-dialog";

export function MenuConta() {
// faz com q não repita informações
   const {data: profile, isLoading: isLoadingProfile} = useQuery({
queryKey: ['profile'],
queryFn: getProfile,
    })

    const {data: managedRestaurant, isLoading: isLoadingManagedRestaurant} = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity,
            })

    return (
        <Dialog>
        <DropdownMenu>
            {/* um botão dentro de outro, o button tem estilização, o dropdown é o botao real */}
            <DropdownMenuTrigger asChild>
                {/* botão que vai abrir menu */}
                <Button 
                variant={"outline"} 
                className=" flex items-center gap-2 select-none">

                 {isLoadingManagedRestaurant ? 
                    <Skeleton className="h-4 w-48" /> : managedRestaurant?.name}
             

                    <ChevronDown className=" w-4 h-4" />
                </Button>

            </DropdownMenuTrigger>
            {/* CONTEÚDO DO MENU */}
            <DropdownMenuContent align="end" className=" w-56">
                {/* item não clicavel do menu */}
                <DropdownMenuLabel className=" flex flex-col">
                 {isLoadingProfile ? (
                    <div className="space-y-1.5">
                    <Skeleton className="h-4 w-32"/>
                    <Skeleton className="h-3 w-24" />
                    
                    </div>
                 ) : (
                    <> 
                    <span> {profile?.name}</span>
                    <span className=" text-xs font-normal text-muted-foreground">
                       {profile?.email}
                    </span>
                    </>
                 )}
            
           
                
                </DropdownMenuLabel>
                {/* linha para separar */}
                <DropdownMenuSeparator />

                 <DialogTrigger asChild>
                {/* ITENS CLICAVEIS DO MENU */}
                <DropdownMenuItem>
                    <Building className=" mr-4 h-4 w-4" />
                    <span> Perfil da Loja</span>
                </DropdownMenuItem>
</DialogTrigger>
                <DropdownMenuItem className=" text-rose-500 dark:text-rose-400">
                    <LogOut className=" mr-4 h-4 w-4" />
                    <span> Sair</span>
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
        <StoreProfileDialog/>
        </Dialog>
    )
}