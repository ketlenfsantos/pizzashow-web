import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, } from "lucide-react"
import { Button } from "./ui/button"

export interface PaginaçaoProps {
    // contabiliza pagina a partir do um
    pageIndex: number
    totalCount: number
    // numero de registros por pagina
    perPage: number
}


export function Paginaçao({ pageIndex, totalCount, perPage }: PaginaçaoProps) {

    // calculo do numero total de páginas:
    // metodo math arredonda pra cima, se for divisao por zero sera 1
    const pages = Math.ceil(totalCount / perPage) || 1

    return (
        <div className=" flex items-center justify-between">
            <span className=" text-sm text-muted-foreground">
                Total de {totalCount} item(s)
            </span>

            <div className=" flex items-center gap-6 lg:gap-8">
                <div className=" flex text-sm font-medium">
                    Página {pageIndex + 1} de {pages}
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" className=" h-8 w-8 p-0">
                        <ChevronsLeft className=" h-4 w-4" />
                        <span className=" sr-only"> Primeira página</span>
                    </Button>

                    <Button variant="outline" className=" h-8 w-8 p-0">
                        <ChevronLeft className=" h-4 w-4" />
                        <span className=" sr-only"> Página anterior</span>
                    </Button>
                    <Button variant="outline" className=" h-8 w-8 p-0">
                        <ChevronRight className=" h-4 w-4" />
                        <span className=" sr-only"> Próxima página</span>
                    </Button>

                    <Button variant="outline" className=" h-8 w-8 p-0">
                        <ChevronsRight className=" h-4 w-4" />
                        <span className=" sr-only"> Ultima página</span>
                    </Button>
                </div>
            </div>

        </div>
    )
}