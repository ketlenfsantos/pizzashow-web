// LAYOUT PARA O APP

import { Header } from "@/components/cabeçalho";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function LayoutApp() {
// para o usuario ser redirecionado caso n esteja autenticado:
const navigate = useNavigate()

useEffect(() => {
   const interceptorId = api.interceptors.response.use(
    response => response,
    error => {
        if (isAxiosError(error)) {
            const status = error.response?.status
            const code = error.response?.data.code

            if (status === 401 && code === 'UNAUTHORIZED') {
                navigate('/sign-in', { replace: true })
            }
        }
    },
   )

return () => {
    // remove o interceptor quando o componente for desmontado
    api.interceptors.response.eject(interceptorId)
   }

}, [navigate])

    return (
        <div className=" flex min-h-screen flex-col antialiased">

            <Header />

            <div className=" flex flex-1 flex-col gap-4 p-8 pt-6">

                {/* componente especial do reacter, OUTLET, especificar onde fica o 
            conteudo especifico de cada pagina, não se repetirá em outras */}
                <Outlet />

            </div>
        </div>
    )
}