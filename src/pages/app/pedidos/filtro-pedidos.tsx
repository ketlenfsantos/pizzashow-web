import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function FiltroPedidos() {
    return (
        <form className=" flex items-center gap-2">
            <span className=" text-sm font-semibold "> Filtros</span>
            <Input placeholder="ID do pedido" className=" h-8 w-auto" />
            <Input placeholder="Nome do Cliente" className=" h-8 w-[320px]" />
            {/* filtro: onde tu seleciona o que tu quer acessar */}
            <Select defaultValue="all">
                <SelectTrigger className=" h-8 w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all"> Todos </SelectItem>
                    <SelectItem value="pending"> Pendente</SelectItem>
                    <SelectItem value="canceled"> Cancelado</SelectItem>
                    <SelectItem value="processing"> Em preparo</SelectItem>
                    <SelectItem value="delivering"> Em entrega</SelectItem>
                    <SelectItem value="delivered"> Entregue</SelectItem>


                </SelectContent>
            </Select>
            <Button type="submit" variant="secondary" size="xs">
                <Search className=" mr-2 h-4 w-4 " />
                Filtrar resultados
            </Button>

            <Button type="button" variant="outline" size="xs">
                <X className=" mr-2 h-4 w-4 " />
                Remover filtros
            </Button>
        </form>
    )
}