// Importa o componente Link do React Router, usado para navegação sem recarregar a página
import { Link } from "react-router-dom";
 
// Importa o componente Button personalizado (provavelmente estilizado com Tailwind ou Radix)
import { Button } from "../components/Button";
 
// Importa o componente Card personalizado, usado como container visual
import { Card } from "../components/Card";
 
// Importa o ícone Home da biblioteca lucide-react
import { Home } from "lucide-react";
 
// Declara o componente NotFound (página de erro 404)
export const NotFound = () => {
  return (
    // Container externo que ocupa a tela inteira, centraliza conteúdo (vertical e horizontal)
    <div className="min-h-screen flex items-center justify-center p-4">
     
      {/* Card centralizado com largura máxima definida */}
      <Card className="text-center max-w-md">
       
        {/* Bloco que contém os textos principais */}
        <div className="mb-6">
          {/* Título grande indicando o erro 404 */}
          <h1 className="text-6xl font-bold text-light mb-4">404</h1>
         
          {/* Subtítulo explicativo */}
          <h2 className="text-2xl font-semibold text-dark mb-2">
            Página não encontrada
          </h2>
         
          {/* Parágrafo com mensagem amigável */}
          <p className="text-dark/70">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>
 
        {/*
          ⚠️ Problema de semântica:
          Se Button renderiza <button>, aqui teremos <a><button>...</button></a>, o que é HTML inválido.  
          Alternativas:  
            - Usar useNavigate() no onClick do botão  
            - Ou permitir que Button renderize <a> (asChild pattern)
        */}
        <Link to="/dashboard">
          <Button className="flex items-center gap-2 mx-auto">
            {/* Ícone de casa para indicar "voltar ao início"
                Sugestão: aria-hidden="true" para não ser lido por leitores de tela */}
            <Home size={20} aria-hidden="true" />
            Voltar ao Início
          </Button>
        </Link>
      </Card>
    </div>
  );
};