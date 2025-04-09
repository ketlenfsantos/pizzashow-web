/* Pagina criada para os detalhes do pedido, que estará no botão da lupa
da pagina da listagem de pedidos*/

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DetalhesPedidos() {
    return (

        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Pedido: 821e78f7asdhdf128h
                </DialogTitle>
                <DialogDescription> Detalhes do pedido </DialogDescription>
            </DialogHeader>
            <div className=" space-y-6">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className=" text-muted-foreground"> Status</TableCell>
                            <TableCell className=" flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                                    <span className="font-medium text-muted-foreground">
                                        Pendente
                                    </span>
                                </div>

                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className=" text-muted-foreground"> Cliente</TableCell>
                            <TableCell className=" flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                                    <span className="font-medium text-muted-foreground">
                                        Nome do Cliente
                                    </span>
                                </div>

                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className=" text-muted-foreground"> Telefone </TableCell>
                            <TableCell className=" flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                                    <span className="font-medium text-muted-foreground">
                                        (51) 99856-999
                                    </span>
                                </div>

                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className=" text-muted-foreground"> Email</TableCell>
                            <TableCell className=" flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                                    <span className="font-medium text-muted-foreground">
                                        emailcliente@email.com
                                    </span>
                                </div>

                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className=" text-muted-foreground"> Realizado há</TableCell>
                            <TableCell className=" flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                                    <span className="font-medium text-muted-foreground">
                                        há 3 minutos
                                    </span>
                                </div>

                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

                {/* tabela da listagem dos itens */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=" text-right"> Qtd.</TableHead>
                            <TableHead className=" text-right"> Preço</TableHead>
                            <TableHead className=" text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell> Pizza Pepperoni Família</TableCell>
                            <TableCell className=" text-right"> 2 unid</TableCell>
                            <TableCell className=" text-right"> R$69,90</TableCell>
                            <TableCell className=" text-right"> R$139,80</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell> Pizza Pepperoni Família</TableCell>
                            <TableCell className=" text-right"> 2 unid</TableCell>
                            <TableCell className=" text-right"> R$59,90</TableCell>
                            <TableCell className=" text-right"> R$119,80</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        {/* colSpan- a celular ocupara o espaço de 3 */}
                        <TableCell colSpan={3}> Total do Pedido</TableCell>
                        <TableCell className=" text-right font-medium"> R$259,60</TableCell>
                    </TableFooter>
                </Table>

            </div>

        </DialogContent>
    )
}