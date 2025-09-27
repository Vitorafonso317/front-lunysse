// Importação de rotas do React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 
// Importa contexto de autenticação
import { useAuth } from '../context/AuthContext';
 
// Componentes reutilizáveis
import { Sidebar } from '../components/Sidebar';
import { PublicNavbar } from '../components/PublicNavbar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ScrollToTop } from '../components/ScrollToTop';
 
// Páginas públicas
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
 
// Páginas protegidas (apenas para usuários autenticados)
import { DashboardPsicologo } from '../pages/DashboardPsicologo';
import { DashboardPaciente } from '../pages/DashboardPaciente';
import { NotFound } from '../pages/NotFound';
import { Agendamento } from '../pages/Agendamento';
import { Historico } from '../pages/Historico';
import { Mensagens } from '../pages/Mensagens';
import { PerfilPsicologo } from '../pages/PerfilPsicologo';
import { PerfilPaciente } from '../pages/PerfilPaciente';
import { ChatIA } from '../pages/ChatIA';
import { Relatorios } from '../pages/Relatorios';
import { Solicitacoes } from '../pages/Solicitacoes';
import { Pacientes } from '../pages/Pacientes';
import { PacienteDetalhes } from '../pages/PacienteDetalhe';
import { SessaoDetalhes } from '../pages/SessaoDetalhes';

/* ==============================
   Componente de rota protegida
   ============================== */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Obtém usuário e estado de carregamento
 
  if (loading) return <LoadingSpinner size="lg" />; // Mostra spinner enquanto carrega
  if (!user) return <Navigate to="/login" replace />; // Redireciona não autenticados para login
 
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar /> {/* Sidebar lateral sempre visível */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {children} {/* Conteúdo da página protegida */}
        </div>
      </main>
    </div>
  );
};
 
/* ==============================
   Componente de rota pública
   ============================== */
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Obtém usuário e estado de carregamento
 
  if (loading) return <LoadingSpinner size="lg" />; // Mostra spinner enquanto carrega
  if (user) return <Navigate to="/dashboard" replace />; // Redireciona usuário logado para dashboard
 
  return (
    <div className="min-h-screen">
      <PublicNavbar /> {/* Navbar pública */}
      <main className="">
        {children} {/* Conteúdo da página pública */}
      </main>
    </div>
  );
};
 
/* ==============================
   Componente Dashboard condicional
   ============================== */
const Dashboard = () => {
  const { user } = useAuth();
  // Retorna dashboard específico baseado no tipo do usuário
  return user?.type === 'psicologo' ? <DashboardPsicologo /> : <DashboardPaciente />;
};
 
/* ==============================
   Configuração de rotas da aplicação
   ============================== */
export const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
 
        {/* ==============================
           Rotas Públicas
           ============================== */}
        <Route path="/" element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } />
       
        <Route path="/about" element={
          <PublicRoute>
            <About />
          </PublicRoute>
        } />
       
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
       
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
       
        {/* ==============================
           Rotas Protegidas
           ============================== */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard /> {/* Escolhe dashboard de psicólogo ou paciente */}
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard-paciente" element={
          <ProtectedRoute>
            <DashboardPaciente />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard-psicologo" element={
          <ProtectedRoute>
            <DashboardPsicologo />
          </ProtectedRoute>
        } />
        <Route path="/agendamento" element={
          <ProtectedRoute>
            <Agendamento />
          </ProtectedRoute>
        } />
        
        <Route path="/historico" element={
          <ProtectedRoute>
            <Historico />
          </ProtectedRoute>
        } />
        
        <Route path="/mensagens" element={
          <ProtectedRoute>
            <Mensagens />
          </ProtectedRoute>
        } />
        
        <Route path="/perfil-psicologo" element={
          <ProtectedRoute>
            <PerfilPsicologo />
          </ProtectedRoute>
        } />
        
        <Route path="/perfil-paciente" element={
          <ProtectedRoute>
            <PerfilPaciente />
          </ProtectedRoute>
        } />
        
        <Route path="/chat-ia" element={
          <ProtectedRoute>
            <ChatIA />
          </ProtectedRoute>
        } />
          <Route path="/relatorios" element={
          <ProtectedRoute>
            <Relatorios/>
          </ProtectedRoute>
        } />
          <Route path="/solicitacoes" element={
          <ProtectedRoute>
            <Solicitacoes/>
          </ProtectedRoute>
        } />
          <Route path="/pacientes" element={
          <ProtectedRoute>
            <Pacientes/>
          </ProtectedRoute>
        } />
          <Route path="/pacientes/:id" element={
          <ProtectedRoute>
            <PacienteDetalhes/>
          </ProtectedRoute>
        } />
          <Route path="/sessao/:sessionId" element={
          <ProtectedRoute>
            <SessaoDetalhes/>
          </ProtectedRoute>
        } />
        

        <Route path="*" element={<NotFound to="*" replace />} />
      </Routes>
    </Router>


  );
};