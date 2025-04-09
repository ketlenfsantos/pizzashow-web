// para buscar dados do perfil logado



import { api } from "@/lib/axios";

interface  GetManagedRestaurantResponse {
  name: string;
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>("/managed-restaurant");  

  return response.data

}