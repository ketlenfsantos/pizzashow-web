// valor pedidos mensais

// VALOR DOS PEDIDOS DIÁRIOS

import { api } from "@/lib/axios";


export interface GetMonthOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthOrdersAmount() {

  const response = await api.get<GetMonthOrdersAmountResponse>('/metrics/month-orders-amount')

  return response.data

}