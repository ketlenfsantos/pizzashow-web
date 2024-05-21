import './global.css'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { rotas } from './Rotas'
import { ThemeProvider } from './components/theme/theme-provider'


export function App() {
  return (
    // HelmetProvider em torno de todo conteúdo
    <HelmetProvider>
      <ThemeProvider storageKey='pizzashop-theme' defaultTheme='dark'>
        {/* Helmet possui diversas propriedades, uma delas é o titleTemplate:
      por meio dele, colocamos o %s que sera o titulo especifico de cada pagina, após, 
      o "pizza.shop" aparecerá em TODAS paginas junto com o primeiro item que pode ser alterado
      */}
        <Helmet titleTemplate='%s | pizza.shop' />
        <Toaster richColors />

        < RouterProvider router={rotas} />
      </ThemeProvider>
    </HelmetProvider>
  )


}