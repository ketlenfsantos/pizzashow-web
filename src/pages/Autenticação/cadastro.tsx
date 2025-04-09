// DENTRO DESSA PASTA(AUTENTICAÇÃO) É A ROTA QUE TERA O CADASTRO E LOGINH
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerRestaurant } from '@/api/register-restaurant'


/* Formulario do ZOD: critérios e armazenamento dos dados colocados no input.
Aqui é verificado antes de validar. */
const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    // o email obrigatoriamente tera que ser uma string, no formato email.
    email: z.string().email(),

})

//CONVERTER o ZOD em tipagem do TYPESCRIPT(por meio do infer), ele espera um EMAIL que seja STRING.
type SignUpForm = z.infer<typeof signUpForm>


export function SignUp() {
    // redirecionar do usuário para pagina do LOGIN pelo botão de toast de sucesso ao cadastrar:

    const navigate = useNavigate()

    /* useForm: HOOK do react-hook usado para gerenciar o estado do formulário, como 
    os valores dos campos de entrada, os erros de validação e o estado de submissão
    Register: registrar os campos do formulário(o que ta no input), rastreia e valida.
     handleSubmit: lidar com com a submissão do formulario,
     recebe função de retorno que sera executada QUANDO o formulario for enviado
     (ESTRUTURA COLOCADA NO FORM onSubmit{handleSubmit*oq ta salvo no useForm*(*executa 
        a função signUp* SignUp*)}) 
     O <SignUpForm> é um tipo genério que apenas simboliza quais dados o useform ira manipular   
      -- Propriedade formState: retorna infos sobre o estado do formulario. No exemplo abaixo,
      enquanto os dados tiverem sendo carregados, colocamos la no button um disable
      para impedir que o usuario CLIQUE enquanto tiver sendo carregado. 
     */
    const {
         register, handleSubmit, formState: { isSubmitting }
         } = useForm<SignUpForm>()

    /*o handle Submit SALVO no useForm vai chamar a função abaixo (signUp), 
    enviando os dados do formulario. Dentro da função abaixo estará salvo 
    EMAIL DO USUÁRIO.
    --- Quando o usuário fizer o Submit, o data será o objeto do formulario do zod,
    que la terá todas as especificações para não dar erro
    SignUpForm = convertido ja em typescript, é o zod.
    Função assincrona: aguardando uma promise criada por mim mesma, ela sera resolvida apos 2 segundos.
  Após essa função ser chamada ela tem que aguardar 2 segundos para funcionar.  

    */

  const {mutateAsync: registerRestaurantFn} = useMutation ({
    mutationFn: registerRestaurant,
  })


    async function handleSignUp(data: SignUpForm) {
        //estrutura para as mensagens do TOAST
        try {
            await registerRestaurantFn({
                restaurantName: data.restaurantName,
                managerName: data.managerName,
                email: data.email,
                phone: data.phone,
            })

            toast.success('Restaurante cadastrado com sucesso', {
                // o action vai criar outra estrutura dentro do toast
                action: {
                    label: 'Login',
                    // forma de redirecionar usuário via useNavigate (sem precisar de link)
                    onClick: () => navigate(`/sign-in?email=${data.email}`),
                },
            })
        } catch {
            toast.error('Erro ao cadastrar Restaurante')
        }

    }

    return (

        <>

            <Helmet title='Cadastro' />
            {/* p-8: padding 8 */}
            <div className=" p-8">
                {/* BOTÃO PARA IR PARA A PAGINA DE LOGIN DE QUEM JA É USUÁRIO */}
                <Button variant='ghost' asChild className=' absolute right-8 top-8'>
                    <Link to='/sign-in'  >
                        Fazer Login
                    </Link>
                </Button>
                <div className=" w-[350px] flex flex-col  justify-center gap-6">
                    {/* div cabeçalho do formulario */}
                    <div className=' flex flex-col gap-2 text-center'>
                        <h1 className=' text-2xl font-semibold tracking-tight'> Criar conta grátis </h1>
                        <p> Seja um parceiro e comece suas vendas </p>
                    </div>
                    {/* div do formulário */}
                    <form onSubmit={handleSubmit(handleSignUp)} className=' space-y-4'>
                        <div className=' space-y-2'>
                            <Label htmlFor='email'> Nome do Estabelecimento</Label>
                            <Input id='restaurantName' type='text' {...register('restaurantName')} />

                        </div>

                        <div className=' space-y-2'>
                            <Label htmlFor='email'> Seu nome</Label>
                            <Input id='managerName' type='text' {...register('managerName')} />

                        </div>

                        <div className=' space-y-2'>
                            <Label htmlFor='email'> Seu e-mail</Label>
                            <Input id='email' type='email' {...register('email')} />

                        </div>

                        <div className=' space-y-2'>
                            <Label htmlFor='email'> Seu telefone</Label>
                            <Input id='phone' type='tel' {...register('phone')} />

                        </div>
                        <Button disabled={isSubmitting} className=' w-full' type='submit'>
                            Finalizar Cadastro
                        </Button>

                        <p className=' px-7 text-center text-sm leading-relaxed text-muted-foreground'>
                            Ao continuar, você concorda com nossos <a href='' className=' underline underline-offset-4'>Termos de serviço</a> e <a href='' className=' underline underline-offset-4'> Políticas de privacidade</a>
                        </p>



                    </form>
                </div>

            </div>

        </>
    )
}