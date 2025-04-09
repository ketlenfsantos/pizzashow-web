// DENTRO DESSA PASTA(AUTENTICAÇÃO) É A ROTA QUE TERA O CADASTRO E LOGINH
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'


/* Formulario do ZOD: critérios e armazenamento dos dados colocados no input.
Aqui é verificado antes de validar. */
const signInForm = z.object({
    // o email obrigatoriamente tera que ser uma string, no formato email.
    email: z.string().email(),

})

//CONVERTER o ZOD em tipagem do TYPESCRIPT(por meio do infer), ele espera um EMAIL que seja STRING.
type SignInForm = z.infer<typeof signInForm>


export function SignIn() {

    const [searchParams] = useSearchParams()

    /* useForm: HOOK do react-hook usado para gerenciar o estado do formulário, como 
    os valores dos campos de entrada, os erros de validação e o estado de submissão
    Register: registrar os campos do formulário(o que ta no input), rastreia e valida.
     handleSubmit: lidar com com a submissão do formulario,
     recebe função de retorno que sera executada QUANDO o formulario for enviado
     (ESTRUTURA COLOCADA NO FORM onSubmit{handleSubmit*oq ta salvo no useForm*(*executa 
        a função signIn* SignIn*)}) 
     O <SignInForm> é um tipo genério que apenas simboliza quais dados o useform ira manipular   
      -- Propriedade formState: retorna infos sobre o estado do formulario. No exemplo abaixo,
      enquanto os dados tiverem sendo carregados, colocamos la no button um disable
      para impedir que o usuario CLIQUE enquanto tiver sendo carregado. 
     */
    const {
         register, 
         handleSubmit, 
         formState: { isSubmitting },
         } = useForm<SignInForm>({
            defaultValues:{
                email:  searchParams.get('email') ?? ''
            }
         })

    /*o handle Submit SALVO no useForm vai chamar a função abaixo (signIn), 
    enviando os dados do formulario. Dentro da função abaixo estará salvo 
    EMAIL DO USUÁRIO.
    --- Quando o usuário fizer o Submit, o data será o objeto do formulario do zod,
    que la terá todas as especificações para não dar erro
    SignInForm = convertido ja em typescript, é o zod.
    Função assincrona: aguardando uma promise criada por mim mesma, ela sera resolvida apos 2 segundos.
  Após essa função ser chamada ela tem que aguardar 2 segundos para funcionar.  

    */

 const { mutateAsync: authenticate} = useMutation ({
    mutationFn: signIn,
 })

    async function handleSignIn(data: SignInForm) {

        try {
            await authenticate({email: data.email})

            toast.success('Enviamos um link de autenticação para o seu email', {
                // o action vai criar outra estrutura dentro do toast
                action: {
                    label: 'Reenviar',
                    onClick: () => handleSignIn(data)
                },
            })
        } catch {
            toast.error('Credenciais Inválidas')
        }

    }

    return (

        <>

            <Helmet title='Login' />
            {/* p-8: padding 8 */}
            <div className=" p-8">
                {/* todos os atributos que seriam mandados como filho para o button, serão enviados para o link */}
                <Button variant='ghost' asChild className=' absolute right-8 top-8'>
                    <Link to='/sign-up'  >
                        Seja um Parceiro
                    </Link>
                </Button>
                <div className=" w-[350px] flex flex-col  justify-center gap-6">
                    {/* div cabeçalho do formulario */}
                    <div className=' flex flex-col gap-2 text-center'>
                        <h1 className=' text-2xl font-semibold tracking-tight'> Acessar Painel </h1>
                        <p> Acompanhe suas vendas pelo painel do parceiro </p>
                    </div>
                    {/* div do formulário */}
                    <form onSubmit={handleSubmit(handleSignIn)} className=' space-y-4'>
                        <div className=' space-y-2'>
                            <Label htmlFor='email'> Seu e-mail</Label>
                            <Input id='email' type='email' {...register('email')} />
                            <Button disabled={isSubmitting} className=' w-full' type='submit'>
                                Acessar Painel
                            </Button>

                        </div>

                    </form>
                </div>

            </div>

        </>
    )
}