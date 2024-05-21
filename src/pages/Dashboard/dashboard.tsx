import { TotalPedidosMes } from "./pedidos-mes";
import { PedidosCanceladosMes } from "./pedidos-cancelado-mes";
import { PedidosDiarios } from "./pedidos-diarios";
import { ReceitaMensal } from "./receita-mensal";
import { GraficoReceita } from "./grafico-receita";
import { PopularProductsChart } from "./grafico-produtos-populares";


export function Dashboard() {
    return (
        <div className=" flex flex-col gap-4">
            <h1 className=" text-3xl font-bold tracking-tight"> Dashboard</h1>

            <div className="grid grid-cols-4 gap-4">
                <ReceitaMensal />
                <TotalPedidosMes />
                <PedidosDiarios />
                <PedidosCanceladosMes />

            </div>
            {/* div do grafico, 9 colunas, o grafico ocupera 6 por meio de uma span */}
            <GraficoReceita />
            <PopularProductsChart />

            <div className=" grid grid-cols-9 gap-4">


            </div>

        </div>
    )
}