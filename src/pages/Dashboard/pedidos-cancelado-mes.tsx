import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function PedidosCanceladosMes() {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className=" text-base font-semibold  "> Cancelamentos (mês)</CardTitle>
                <DollarSign className=" h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className=" space-y-1">
                <span className=" text-2xl font-bold tracking-tight"> 15</span>
                <p className=" text-xs text-muted-foreground">
                    <span className=" text-emerald-500 "> -2% </span>
                </p>


            </CardContent>
        </Card>
    )
}