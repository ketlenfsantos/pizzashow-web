import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function TotalPedidosMes() {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className=" text-base font-semibold  "> Pedidos (mês)</CardTitle>
                <Utensils className=" h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className=" space-y-1">
                <span className=" text-2xl font-bold tracking-tight"> 900</span>
                <p className=" text-xs text-muted-foreground">
                    <span className=" text-emerald-500 "> +6% </span>
                </p>


            </CardContent>
        </Card>
    )
}