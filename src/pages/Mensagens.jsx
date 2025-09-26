/* ==============================
   PÁGINA DE ENVIO DE MENSAGENS
   ============================== */
// Página onde pacientes podem enviar mensagens para seus psicólogos
// Permite definir prioridade e contém dicas de uso

import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Contexto de autenticação
import { useRequest } from '../components/ToastContext'; // Contexto de mensagens
import { Card } from '../components/Card'; // Componente de cartão
import { Button } from '../components/Button'; // Componente de botão
import { Input } from '../components/Input'; // Componente de input
import { Send, MessageCircle, ArrowLeft } from 'lucide-react'; // Ícones
import { Link } from 'react-router-dom'; // Navegação

export const Mensagens = () => {
  // Obtém dados do usuário logado
  const { user } = useAuth();
  // Obtém função para enviar mensagens
  const { sendMessage } = useRequest();
  // Estado para armazenar o conteúdo da mensagem
  const [message, setMessage] = useState('');
  // Estado para armazenar a prioridade selecionada
  const [priority, setPriority] = useState('low');

  // Função para enviar a mensagem
  const handleSendMessage = () => {
    // Valida se a mensagem não está vazia
    if (!message.trim()) return;
    // Envia a mensagem usando o contexto
    sendMessage(user.name, message, priority);
    // Limpa o formulário após envio
    setMessage('');
    setPriority('low');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-dark">Enviar Mensagem</h1>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Nova Mensagem para seu Psicólogo</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridade
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-32"
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
            Enviar Mensagem
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-blue-50">
        <h3 className="font-semibold text-blue-800 mb-2">Dicas para Mensagens</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Seja claro e específico sobre suas necessidades</li>
          <li>• Seu psicólogo responderá em até 24 horas</li>
          <li>• Use prioridade "Alta" para assuntos importantes</li>
          <li>• Para emergências, procure atendimento médico imediato</li>
        </ul>
      </Card>
    </div>
  );
};