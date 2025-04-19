// PÁGINA DOS PEDIDOS


import {
    Table,
    TableBody,


    TableHead,

    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Helmet } from "react-helmet-async";
import { ListagemPedidos } from "./listagem-pedidos";
import { FiltroPedidos } from "./filtro-pedidos";
import { Paginaçao } from "@/components/paginação";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { OrderTableSkeleton } from "./order-table-skeleton";




export function Pedidos() {

    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get ('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')


// verificar se a pagina ta salva no search Params, se nao tiver usa pagina 0
// usa-se o zod para converter em numero
const pageIndex = z.coerce.number()

.transform (page => page -1)
.parse(searchParams.get('page') ?? '1')


    const { data: result, isLoading: isLoadingOrders } =useQuery({
      queryKey: ['orders', pageIndex,orderId, customerName, status ],
      queryFn: () => getOrders({pageIndex, orderId, customerName, status: status === 'all' ? null : status}),  
    })

//   função para ativar os botões de paginação

function handlePaginate(pageIndex: number){
    // para alterar url
setSearchParams((state) => {
    state.set('page', (pageIndex +1).toString())

    return state
})
}

    return (
        <>
            <Helmet title="Pedidos" />

            <div className=" flex flex-col gap-4">
                <h1 className=" text-3xl font-bold tracking-tight"> Pedidos </h1>


                <div className=" space-y-2.5 ">

                    <FiltroPedidos />


                    {/* Tabela */}
                    <div className=" border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className=" w-[64px]"> </TableHead>
                                    <TableHead className="w-[140px]">Identificador</TableHead>
                                    <TableHead className=" w-[180px]">Realizado há</TableHead>
                                    <TableHead className=" w-[140px]">Status</TableHead>
                                    <TableHead >Cliente</TableHead>
                                    <TableHead className=" w-[140px]">Total do Pedido</TableHead>
                                    <TableHead className=" w-[164px]"> </TableHead>
                                    <TableHead className=" w-[132px]"> </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
{isLoadingOrders && <OrderTableSkeleton />}
                                
                             {result && result.orders.map(order  => {
                              return <ListagemPedidos key={order.orderId} order={order} />
                             })}
                            
                            </TableBody>
                        </Table>
                    </div>
                   {result && (
 <Paginaçao
 onPageChange={handlePaginate} 
 pageIndex={pageIndex} 
 totalCount={result.meta.totalCount}
  perPage={result.meta.perPage} />

                   )}

                </div>
            </div>
        </>
    )
}