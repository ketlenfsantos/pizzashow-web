// AQUI ESTARA TODOS OS PEDIDOS.

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableRow, TableCell } from "@/components/ui/table"
import { ArrowRight, X } from "lucide-react"
import { Search } from "lucide-react"
import { DetalhesPedidos } from "./detalhes-pedido"
import { OrderStatus } from "@/components/ui/order-status"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelOrder } from "@/api/cancel.order"
import { GetOrdersResponse } from "@/api/get-orders"
import { approveOrder } from "@/api/approve-order"
import { deliverOrder } from "@/api/deliver-order"
import { dispatchOrder } from "@/api/dispatch-order"


export interface ListagemPedidosProps{
    order: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }
}

export function ListagemPedidos( {order} : ListagemPedidosProps) {

    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const queryClient = useQueryClient()

    // FUNÇÃO COM A FUNÇÃO DE ARMAZENAMENTO DE CACHE DE CANCELAMENTO:
    function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
        // aqui eu pego o cache de pedidos que já foi carregado, e atualizo o status do pedido que foi cancelado.    
        const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey: ['orders'],
           })

            // código abaixo: percorrendo todas as listas de pedidos carregadas, seja na paginação ou não, quando encontrar o pedido com o mesmo ID com pedido que eu pedi pra cancelar, ele troca o status. 

        ordersListCache.forEach(([cacheKey, cacheData]) => {
        if(!cacheData) {
            return
        }
        
        queryClient.setQueryData<GetOrdersResponse> (cacheKey, {
        
            ...cacheData,
            orders: cacheData.orders.map((order) => {   
                if(order.orderId === orderId) {
                    return {
                        ...order,status}
                    
                }
                return order
            }),   
        })
        
        })

    }

    // mutation para cancelar o pedido
const {mutateAsync: cancelOrderFn, isPending: isCancelingOrder} = useMutation ({
mutationFn: cancelOrder,    
async onSuccess(_,{orderId}) {
      // aqui eu atualizo o cache de pedidos, e coloco o status como cancelado
    updateOrderStatusOnCache(orderId, 'canceled')
    },
})

// mutation para aprovação do pedido (vai consultar)
const {mutateAsync: approveOrderFn, isPending: isApprovingOrder} = useMutation ({
    mutationFn: approveOrder,    
    async onSuccess(_,{orderId}) {
          // aqui eu atualizo o cache de pedidos, e coloco o status como cancelado
        updateOrderStatusOnCache(orderId, 'processing')
        },
    })
// mutation para dispacth 
const {mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder} = useMutation ({
    mutationFn: dispatchOrder,    
    async onSuccess(_,{orderId}) {
          // aqui eu atualizo o cache de pedidos, e coloco o status como cancelado
        updateOrderStatusOnCache(orderId, 'delivering')
        },
    })
    


//  mutation para deliver
const {mutateAsync: deliverOrderFn, isPending: isDeliveringOrder} = useMutation ({
    mutationFn: deliverOrder,    
    async onSuccess(_,{orderId}) {
          // aqui eu atualizo o cache de pedidos, e coloco o status como cancelado
        updateOrderStatusOnCache(orderId, 'delivered')
        },
    })




    return (

        <TableRow >
            <TableCell>

                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="lg" className="w-8 h-8">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>
                    <DetalhesPedidos open={isDetailsOpen} orderId={order.orderId} />


                </Dialog>
            </TableCell>

            <TableCell className="font-mono text-xs font-medium">
                {order.orderId}
            </TableCell>
            <TableCell className="text-muted-foreground">
               {formatDistanceToNow(order.createdAt, {
                locale:ptBR,
                addSuffix: true,
               })}
            </TableCell>
            <TableCell>
              <OrderStatus status={order.status}/>
            </TableCell>
            <TableCell className="font-medium">
               {order.customerName}
            </TableCell>
            <TableCell className="font-medium">{order.total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            } )}
            
            </TableCell>
            <TableCell>
{/* se a ordem estiver em pendente, vai mostrar o botão aprovar. */}
                {order.status === 'pending' && (
                        <Button 
                        onClick={() => approveOrderFn({orderId: order.orderId})}
                        disabled=   {isApprovingOrder}
                        variant="outline" size="lg">
                        <ArrowRight className="mr-2 h-3 w-3" />
                        Aprovar
                    </Button>
                    )}
{/* se o statuos for processando */}
                {order.status === 'processing' && (
                        <Button 
                        onClick={() => dispatchOrderFn({orderId: order.orderId})}
                        disabled=   {isDispatchingOrder}
                        variant="outline" size="lg">
                        <ArrowRight className="mr-2 h-3 w-3" />
                        Em entrerga
                    </Button>
                    )}

              {/* se o statuos for delivering (entregue) */}
              {order.status === 'delivering' && (
                        <Button 
                        onClick={() => deliverOrderFn({orderId: order.orderId})}
                        disabled=   {isDeliveringOrder}
                        variant="outline" size="lg">
                        <ArrowRight className="mr-2 h-3 w-3" />
                       Entregue
                    </Button>
                    )}



            
            </TableCell>
            <TableCell>
                <Button 
                disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder } 
                onClick={() => cancelOrderFn({orderId: order.orderId})}
                variant="ghost" 
                size="lg">
                    <X className="mr-2 h-3 w-3" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>

    )
}