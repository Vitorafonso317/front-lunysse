import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Bell, User, Clock, AlertCircle, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
 
export const Solicitacoes = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRequests, setProcessingRequests] = useState(new Set());
 
  useEffect(() => {
    loadRequests();
  }, [user.id]);
 
  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getRequests(user.id);
      // Filtrar apenas solicitações pendentes
      const pendingRequests = data.filter(req => req.status === 'pendente');
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleAcceptRequest = async (requestId, requestData) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
   
    try {
      // Verificar se já existe paciente com mesmo email
      const existingPatients = await mockApi.getPatients(user.id);
      const duplicatePatient = existingPatients.find(p => p.email === requestData.patientEmail);
     
      if (duplicatePatient) {
        toast.error('Este paciente já está cadastrado em sua lista!');
        return;
      }
 
      // Criar novo paciente
      await mockApi.createPatient({
        name: requestData.patientName,
        email: requestData.patientEmail,
        phone: requestData.patientPhone,
        birthDate: '1990-01-01', // Valor padrão - pode ser atualizado depois
        age: 30, // Valor padrão - pode ser atualizado depois
        status: 'Ativo',
        psychologistId: user.id
      });
 
      // Atualizar status da solicitação
      await mockApi.updateRequestStatus(requestId, 'aceito', 'Paciente aceito e cadastrado no sistema');
     
      // Remover solicitação da lista
      setRequests(prev => prev.filter(req => req.id !== requestId));
     
      toast.success('Solicitação aceita! Paciente adicionado à sua lista.');
    } catch (error) {
      console.error('Erro ao aceitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };
 
  const handleRejectRequest = async (requestId) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
   
    try {
      await mockApi.updateRequestStatus(requestId, 'rejeitado', 'Solicitação rejeitada pelo psicólogo');
     
      // Remover solicitação da lista
      setRequests(prev => prev.filter(req => req.id !== requestId));
     
      toast.success('Solicitação rejeitada.');
    } catch (error) {
      console.error('Erro ao rejeitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };
 
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
 
  const getStatusColor = (status) => {
    switch (status) {
      case 'aceito': return 'bg-green-100 text-green-800';
      case 'rejeitado': return 'bg-red-100 text-red-800';
      case 'pendente': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
 
  if (loading) return <LoadingSpinner size="lg" />;
 
  return (
    <div className="min-h-screen">
      {/* Elementos decorativos de fundo */}
      <div className="bg-decoration bg-decoration-1"></div>
      <div className="bg-decoration bg-decoration-2"></div>
      <div className="bg-decoration bg-decoration-3"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-dark font-primary">Solicitações de Atendimento</h1>
              <p className="text-medium mt-1 font-body">Gerencie solicitações de novos pacientes</p>
            </div>
          </div>
          
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glassmorphism p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-medium font-secondary">Total Pendentes</p>
                  <p className="text-2xl font-bold text-dark">{requests.length}</p>
                </div>
                <div className="w-10 h-10 bg-light rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <div className="glassmorphism p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-medium font-secondary">Alta Prioridade</p>
                  <p className="text-2xl font-bold text-red-600">{requests.filter(r => r.urgency === 'alta').length}</p>
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <div className="glassmorphism p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-medium font-secondary">Média Prioridade</p>
                  <p className="text-2xl font-bold text-yellow-600">{requests.filter(r => r.urgency === 'media').length}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <div className="glassmorphism p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-medium font-secondary">Baixa Prioridade</p>
                  <p className="text-2xl font-bold text-green-600">{requests.filter(r => r.urgency === 'baixa').length}</p>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
 
        {/* Lista de Solicitações */}
        <div className="space-y-6">
          {requests.length === 0 ? (
            <div className="glassmorphism p-12 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2 font-primary">Nenhuma solicitação pendente</h3>
              <p className="text-medium max-w-md mx-auto font-body">
                As solicitações de novos pacientes aparecerão aqui para sua análise e aprovação.
              </p>
            </div>
          ) : (
            requests.map(request => (
              <div key={request.id} className="glassmorphism hover:shadow-lg transition-all duration-300">
                {/* Header do Card */}
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-dark font-primary">{request.patientName}</h3>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-medium font-body">{request.patientEmail}</p>
                          <p className="text-sm text-medium font-body">{request.patientPhone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium font-secondary ${
                        request.urgency === 'alta' ? 'bg-red-500 text-white' :
                        request.urgency === 'media' ? 'bg-yellow-500 text-white' :
                        'bg-green-500 text-white'
                      }`}>
                        {request.urgency === 'alta' ? 'Alta Prioridade' : 
                         request.urgency === 'media' ? 'Média Prioridade' : 'Baixa Prioridade'}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-white font-secondary">
                        Pendente
                      </span>
                    </div>
                  </div>
                </div>
 
                {/* Conteúdo */}
                <div className="p-6">
                  {/* Descrição da Necessidade */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-dark mb-3 font-secondary">Descrição da Necessidade</h4>
                    <div className="glassmorphism-light p-4">
                      <p className="text-dark leading-relaxed font-body">{request.description}</p>
                    </div>
                  </div>
                  
                  {/* Informações Adicionais */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark font-secondary">Data de Envio</p>
                        <p className="text-sm text-medium font-body">
                          {new Date(request.createdAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark font-secondary">Tipo de Solicitação</p>
                        <p className="text-sm text-medium font-body">Novo Paciente</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Observações */}
                  {request.notes && (
                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-dark mb-2 font-secondary">Observações</h5>
                      <div className="bg-light/20 rounded-lg p-3">
                        <p className="text-sm text-dark font-body">{request.notes}</p>
                      </div>
                    </div>
                  )}
 
                  {/* Ações */}
                  <div className="flex gap-3 pt-4 border-t border-white/20">
                    <Button
                      variant="secondary"
                      onClick={() => handleRejectRequest(request.id)}
                      loading={processingRequests.has(request.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors font-secondary"
                    >
                      <X className="w-4 h-4" />
                      {processingRequests.has(request.id) ? 'Rejeitando...' : 'Rejeitar'}
                    </Button>
                    <Button
                      onClick={() => handleAcceptRequest(request.id, request)}
                      loading={processingRequests.has(request.id)}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg font-secondary"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {processingRequests.has(request.id) ? 'Processando...' : 'Aceitar como Paciente'}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
 