/* ==============================
   PÁGINA DE HISTÓRICO DE SESSÕES
   ============================== */
// Página que exibe o histórico de sessões concluídas do paciente
// Mostra data, horário e status das sessões passadas

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Contexto de autenticação
import { mockApi } from '../services/mockApi'; // API simulada
import { Card } from '../components/Card'; // Componente de cartão
import { LoadingSpinner } from '../components/LoadingSpinner'; // Componente de loading
import { CheckCircle, Calendar, Clock, ArrowLeft } from 'lucide-react'; // Ícones
import { Link } from 'react-router-dom'; // Navegação

export const Historico = () => {
  // Obtém dados do usuário logado
  const { user } = useAuth();
  // Estado para armazenar as sessões do histórico
  const [appointments, setAppointments] = useState([]);
  // Estado para controlar o loading
  const [loading, setLoading] = useState(true);

  // Efeito para carregar o histórico quando o componente monta
  useEffect(() => {
    const loadHistory = async () => {
      try {
        // Busca todas as sessões do usuário
        const allAppointments = await mockApi.getAppointmentsByEmail(user.email);
        // Filtra apenas sessões passadas ou concluídas
        const pastAppointments = allAppointments.filter(apt => 
          new Date(apt.date) < new Date() || apt.status === 'concluido'
        );
        setAppointments(pastAppointments);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      } finally {
        setLoading(false); // Para o loading independente do resultado
      }
    };

    loadHistory();
  }, [user.email]); // Recarrega se o email do usuário mudar

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-dark">Histórico de Sessões</h1>
      </div>

      <Card className="p-6">
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Nenhuma sessão concluída ainda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map(appointment => (
              <div key={appointment.id} className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-dark">{appointment.description}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(appointment.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Concluída
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};