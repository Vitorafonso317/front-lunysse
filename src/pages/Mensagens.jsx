import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Send, MessageCircle, ArrowLeft, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Mensagens = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [psychologist, setPsychologist] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    loadMessages();
    if (user.type === 'paciente') {
      loadPsychologist();
    } else {
      loadPatients();
    }
  }, [user]);

  // Efeito separado para recarregar mensagens quando paciente muda
  useEffect(() => {
    if (selectedPatient) {
      loadMessages();
    }
  }, [selectedPatient]);

  const loadMessages = async () => {
    try {
      let data = await mockApi.getMessages(user.id, user.type);
      
      // Filtra mensagens por paciente selecionado (para psicólogos)
      if (user.type === 'psicologo' && selectedPatient) {
        data = data.filter(msg => msg.patientId === selectedPatient.id);
      }
      
      setMessages(data);
    } catch (error) {
      toast.error('Erro ao carregar mensagens');
    } finally {
      setLoading(false);
    }
  };

  const loadPsychologist = async () => {
    try {
      const appointments = await mockApi.getAppointments(user.id, 'paciente');
      if (appointments.length > 0) {
        const psychologists = await mockApi.getPsychologists();
        const psych = psychologists.find(p => p.id === appointments[0].psychologistId);
        setPsychologist(psych);
      }
    } catch (error) {
      console.error('Erro ao carregar psicólogo:', error);
    }
  };

  const loadPatients = async () => {
    try {
      const patientsData = await mockApi.getPatients(user.id);
      setPatients(patientsData);
      if (patientsData.length > 0) {
        setSelectedPatient(patientsData[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setSending(true);
    
    try {
      let messageData;
      
      if (user.type === 'paciente') {
        const appointments = await mockApi.getAppointments(user.id, 'paciente');
        if (appointments.length === 0) {
          toast.error('Você precisa ter um agendamento para enviar mensagens');
          return;
        }
        
        messageData = {
          patientId: user.id,
          psychologistId: appointments[0].psychologistId,
          senderType: 'paciente',
          senderName: user.name,
          content: newMessage
        };
      } else {
        if (!selectedPatient) {
          toast.error('Selecione um paciente para enviar mensagem');
          return;
        }
        
        messageData = {
          patientId: selectedPatient.id,
          psychologistId: user.id,
          senderType: 'psicologo',
          senderName: user.name,
          content: newMessage
        };
      }
      
      const sentMessage = await mockApi.sendMessage(messageData);
      
      // Adiciona mensagem imediatamente à lista
      setMessages(prev => [...prev, sentMessage]);
      setNewMessage('');
      toast.success('Mensagem enviada com sucesso!');
      
    } catch (error) {
      toast.error('Erro ao enviar mensagem');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-dark">Mensagens</h1>
        {user.type === 'paciente' && psychologist && (
          <span className="text-gray-600">com {psychologist.name}</span>
        )}
        {user.type === 'psicologo' && selectedPatient && (
          <span className="text-gray-600">com {selectedPatient.name}</span>
        )}
      </div>

      {user.type === 'psicologo' && patients.length > 0 && (
        <Card className="p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecionar Paciente
          </label>
          <select
            value={selectedPatient?.id || ''}
            onChange={(e) => {
              const patientId = parseInt(e.target.value);
              const patient = patients.find(p => p.id === patientId);
              setSelectedPatient(patient);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Escolha um paciente</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </Card>
      )}

      <Card className="p-6 h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhuma mensagem ainda</p>
              <p className="text-sm">Inicie uma conversa!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderType === user.type ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderType === user.type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4" />
                    <span className="text-xs font-medium">{message.senderName}</span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderType === user.type ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
            loading={sending}
            className="self-end bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-blue-50">
        <h3 className="font-semibold text-blue-800 mb-2">Dicas para Mensagens</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Seja claro e específico sobre suas necessidades</li>
          <li>• {user.type === 'paciente' ? 'Seu psicólogo' : 'Seus pacientes'} pode{user.type === 'paciente' ? '' : 'm'} responder a qualquer momento</li>
          <li>• Use Enter para enviar, Shift+Enter para nova linha</li>
          <li>• Para emergências, procure atendimento médico imediato</li>
        </ul>
      </Card>
    </div>
  );
};