import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { getManagedRestaurant, GetManagedRestaurantResponse } from "@/api/get-managed-restaurant";
import { z } from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";


const storeProfileSchema = z.object ({
  name: z.string().min(1, {message: 'Nome é obrigatório'}),
  description: z.string().nullable(),

})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog () {

  const queryClient = useQueryClient()

  const {data: managedRestaurant} = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
        })

        const {
          register,
          handleSubmit,
          formState: {isSubmitting},
        } = useForm<StoreProfileSchema>({
          resolver: zodResolver(storeProfileSchema),
          defaultValues: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? ''
          },
        })

function updateManagedRestaurantCache({name, description} : StoreProfileSchema) { const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])
  if(cached) {
    queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
      ...cached,
      name,
      description,
    },
  )
  }

  return {cached}
}


        const {mutateAsync: updateProfileFn} = useMutation({
          mutationFn: updateProfile,   
          // onMutate dispara antes da mutação ser feita, e é o lugar ideal para atualizar o cache
          // e otimizar a experiência do usuário
          onMutate({ name,description }) {
          const {cached} = updateManagedRestaurantCache({name, description})
          return {previousProfile: cached}

          },

          onError(_, __, context) {
            // se der erro, volta o cache para o que era antes (do OnMutate) 
            if (context?.previousProfile) {
              updateManagedRestaurantCache(context.previousProfile)
            }
          },
             })

             async function handleUpdateProfile(data:StoreProfileSchema) {
              try{
                await updateProfileFn({
                  name:data.name,
                  description: data.description
                })

                toast.success('Perfil atualizado com sucesso!')

              }
              catch{
                toast.error('Erro ao atualizar perfil, tente novamente!')

              }
             }




  return(
  <DialogContent> 
    <DialogHeader>
<DialogTitle> Perfil da Loja </DialogTitle>
<DialogDescription>
  Atualize as informações do seu estabelecimento visíveis ao seu Cliente
  </DialogDescription>
    </DialogHeader>

<form onSubmit={handleSubmit(handleUpdateProfile)}>

<div className="space-y-4  py-4">
  
  <div className="grid grid-cols-4 items-center gap-4 ">
<Label className="text-right" htmlFor="name"> Nome </Label>
<Input className="col-span-3" id="name" {...register('name')} />

  </div>


  <div className="grid grid-cols-4 items-center gap-4 ">
<Label className="text-right" htmlFor="description"> Descrição </Label>
<Textarea className="col-span-3" id="description" {...register('description')} />

  </div>


   </div>


    <DialogFooter>
      <DialogClose asChild>
      <Button variant="ghost" type="button"> Cancelar</Button>
      </DialogClose>
      
      <Button type="submit" variant='default' disabled={isSubmitting}> Salvar</Button>
    </DialogFooter>
    </form>
     </DialogContent>
  )
}