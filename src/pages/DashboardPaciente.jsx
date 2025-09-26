import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useRequest } from '../components/ToastContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  Calendar, 
  Bell, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Heart,
  Brain,
  User,
  Star,
  ArrowRight,
  Activity
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const DashboardPaciente = () => {
  const { user } = useAuth();
  const { sendMessage } = useRequest();
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [requestsData] = await Promise.all([
          mockApi.getRequests(),
        ]);
        
        const userRequests = requestsData.filter(req => req.patientEmail === user.email);
        setRequests(userRequests);
        
        const allAppointments = await mockApi.getAppointmentsByEmail(user.email);
        setAppointments(allAppointments);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
        // Dados carregados
      }
    };

    loadData();
  }, [user.email]);

  if (loading) return <LoadingSpinner size="lg" />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.date);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate >= today && apt.status === 'agendado';
  });

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.date) < new Date() || apt.status === 'concluido'
  );

  const totalSessions = appointments.length;
  const completedSessions = pastAppointments.length;
  const nextAppointment = upcomingAppointments[0];
  const hasHistory = pastAppointments.length > 0;

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pendente':
        return { color: 'bg-blue-100 text-blue-800', text: 'Aguardando Avaliação', icon: Clock };
      case 'aceito':
        return { color: 'bg-green-100 text-green-800', text: 'Aceito como Paciente', icon: CheckCircle };
      case 'rejeitado':
        return { color: 'bg-red-100 text-red-800', text: 'Solicitação Rejeitada', icon: Bell };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: 'Status Desconhecido', icon: Bell };
    }
  };

  const progressPercentage = totalSessions > 0 ? Math.min((completedSessions / totalSessions) * 100, 100) : 0;

  return (
    <div className="space-y-8 bg-background min-h-screen p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-dark tracking-tight">Meu Dashboard</h1>
          <p className="text-dark/70 font-light">Olá, {user.name}! Como você está se sentindo hoje?</p>
        </div>
        <div className="flex items-center gap-3">
          {requests.length > 0 && (
            <div className="relative">
              <Bell className="w-6 h-6 text-medium" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {requests.length}
              </span>
            </div>
          )}
        </div>
      </motion.div>
           
      {/* Progress Overview */}
      <motion.div variants={fadeInUp}>
        <Card className="p-6 bg-gradient-to-r from-medium/10 to-accent/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-dark">Sua Jornada de Bem-estar</h2>
              <p className="text-dark/70 font-light">Acompanhe seu progresso terapêutico</p>
            </div>
            {/* 🖼️ ESPAÇO PARA IMAGEM: Ícone ou ilustração sobre progresso e bem-estar */}
            <Heart className="w-8 h-8 text-medium" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-black text-dark">{totalSessions}</div>
              <div className="text-sm text-dark/70">Sessões Totais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-dark">{completedSessions}</div>
              <div className="text-sm text-dark/70">Sessões Concluídas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-dark">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-dark/70">Progresso</div>
            </div>
          </div>
          
          {totalSessions > 0 && (
            <div className="mt-4">
              <div className="w-full bg-white/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-medium to-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Request Status */}
      {requests.length > 0 && (
        <motion.div variants={fadeInUp}>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-dark">Minhas Solicitações</h2>
            </div>
            
            <div className="space-y-4">
              {requests.map(request => {
                const statusInfo = getStatusInfo(request.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <div key={request.id} className="p-4 bg-white/50 rounded-xl">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="font-semibold text-dark">Solicitação para ser Paciente</p>
                        <p className="text-sm text-dark/70">
                          Enviada em {new Date(request.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className="w-4 h-4" />
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-dark/60 mb-3">{request.description}</p>
                    
                    {request.status === 'aceito' && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Parabéns!</strong> Você foi aceito como paciente. O psicólogo entrará em contato para agendar suas sessões.
                        </p>
                      </div>
                    )}
                    
                    {request.status === 'pendente' && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Status:</strong> Sua solicitação está sendo analisada pelo psicólogo.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Appointments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Appointment */}
          {nextAppointment && (
            <motion.div variants={fadeInUp}>
              <Card className="p-6 bg-gradient-to-r from-accent/10 to-light/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-dark">Próxima Sessão</h2>
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                
                <div className="flex items-center p-4 bg-white/50 rounded-xl">
                  {/* 🖼️ ESPAÇO PARA IMAGEM: Ícone personalizado para próxima sessão */}
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-dark">{nextAppointment.description}</p>
                    <p className="text-dark/70">
                      {new Date(nextAppointment.date).toLocaleDateString('pt-BR')} às {nextAppointment.time}
                    </p>
                    <p className="text-sm text-dark/60">Duração: {nextAppointment.duration} minutos</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                      Agendado
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Upcoming Sessions */}
          <motion.div variants={fadeInUp}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark">Próximas Sessões</h2>
                <Calendar className="w-5 h-5 text-medium" />
              </div>
              
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-dark/30 mx-auto mb-4" />
                  <p className="text-dark/70 mb-4">Você não tem sessões agendadas.</p>
                  <Link to="/agendamento">
                    <Button className="bg-medium hover:bg-dark">
                      {hasHistory ? 'Solicitar novo psicólogo' : 'Solicitar ser paciente'}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.slice(1).map(appointment => (
                    <div key={appointment.id} className="flex items-center p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-colors">
                      <div className="w-10 h-10 bg-light rounded-full flex items-center justify-center mr-4">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-dark">{appointment.description}</p>
                        <p className="text-sm text-dark/70">
                          {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                        </p>
                        <p className="text-xs text-dark/60">Duração: {appointment.duration} minutos</p>
                      </div>
                      <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                        Agendado
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Session History */}
          {pastAppointments.length > 0 && (
            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-dark">Histórico de Sessões</h2>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                
                <div className="space-y-3">
                  {pastAppointments.slice(0, 5).map(appointment => (
                    <div key={appointment.id} className="flex items-center p-4 bg-white/30 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-dark">{appointment.description}</p>
                        <p className="text-sm text-dark/70">
                          {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Concluída
                      </span>
                    </div>
                  ))}
                </div>
                
                {pastAppointments.length > 5 && (
                  <div className="mt-4 text-center">
                    <Link to="/historico" className="text-medium hover:text-accent font-medium inline-flex items-center gap-1">
                      Ver histórico completo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Wellness Tips */}
          <motion.div variants={fadeInUp}>
            <Card className="p-6">
              {/* 🖼️ ESPAÇO PARA IMAGEM: Banner ou ícone sobre dicas de bem-estar */}
              <h3 className="font-bold text-dark mb-4">Dicas de Bem-estar</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800 text-sm">Mindfulness</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Pratique 5 minutos de respiração consciente hoje.
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800 text-sm">Autocuidado</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Lembre-se de celebrar suas pequenas conquistas.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Mood Tracker */}
          <motion.div variants={fadeInUp}>
            <Card className="p-6">
              {/* 🖼️ ESPAÇO PARA IMAGEM: Ícone ou ilustração sobre humor e sentimentos */}
              <h3 className="font-bold text-dark mb-4">Como você está hoje?</h3>
              <div className="grid grid-cols-5 gap-2">
                {['😢', '😕', '😐', '😊', '😄'].map((emoji, index) => (
                  <button
                    key={index}
                    className="p-3 text-2xl hover:bg-white/50 rounded-lg transition-colors"
                    title={['Muito triste', 'Triste', 'Neutro', 'Feliz', 'Muito feliz'][index]}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <p className="text-xs text-dark/60 mt-3 text-center">
                Registre seu humor diário
              </p>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeInUp}>
            <Card className="p-6">
              <h3 className="font-bold text-dark mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Link to="/mensagens" className="w-full p-3 bg-green-500/10 hover:bg-green-500/20 rounded-lg text-left transition-colors block">
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-dark">Enviar Mensagem</span>
                  </div>
                </Link>
                
                <Link to="/agendamento" className="w-full p-3 bg-accent/10 hover:bg-accent/20 rounded-lg text-left transition-colors block">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="font-medium text-dark">Ver Agenda</span>
                  </div>
                </Link>
                

              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};