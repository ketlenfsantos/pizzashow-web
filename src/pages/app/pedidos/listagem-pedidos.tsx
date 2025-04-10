// AQUI ESTARA TODOS OS PEDIDOS.

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableRow, TableCell } from "@/components/ui/table"
import { ArrowRight, X } from "lucide-react"
import { Search } from "lucide-react"
import { DetalhesPedidos } from "./detalhes-pedido"


export function ListagemPedidos() {
    return (

        <TableRow >
            <TableCell>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <DetalhesPedidos />


                </Dialog>
            </TableCell>

            <TableCell className="font-mono text-xs font-medium">
                821e78f7asdhdf128h
            </TableCell>
            <TableCell className="text-muted-foreground">
                há 15 minutos
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">
                        Pendente
                    </span>
                </div>
            </TableCell>
            <TableCell className="font-medium">
                Nome da sua loja
            </TableCell>
            <TableCell className="font-medium">R$ 149,90</TableCell>
            <TableCell>
                <Button variant="outline" size="xs">
                    <ArrowRight className="mr-2 h-3 w-3" />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="ghost" size="xs">
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>

    )
}