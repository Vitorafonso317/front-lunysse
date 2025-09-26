/* ==============================
   PÁGINA DE CHAT COM IA PSICOLÓGICA
   ============================== */
// Componente principal do chat com IA especializada em psicologia
// Permite conversas em tempo real com assistente virtual

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle, Sparkles, Brain, Zap, MessageSquare } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { enviarParaIA } from '../services/aiservice'; // Serviço de comunicação com IA

export const ChatIA = () => {
  // Estado que armazena todas as mensagens da conversa
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot', // Tipo: 'bot' ou 'user'
      content: 'Olá! Sou sua assistente de IA especializada em psicologia. Como posso ajudá-lo hoje?',
      timestamp: new Date() // Data/hora da mensagem
    }
  ]);
  // Estado para armazenar o texto que o usuário está digitando
  const [inputMessage, setInputMessage] = useState('');
  // Estado para controlar se a IA está processando uma resposta
  const [isLoading, setIsLoading] = useState(false);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState(null);
  // Referência para o final da lista de mensagens (para scroll automático)
  const messagesEndRef = useRef(null);

  // Função para fazer scroll automático para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Efeito que executa o scroll sempre que novas mensagens são adicionadas
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Dependencia: executa quando 'messages' muda

  // Função principal para enviar mensagem e obter resposta da IA
  const handleSendMessage = async () => {
    // Valida se há conteúdo na mensagem
    if (!inputMessage.trim()) return;

    // Cria objeto da mensagem do usuário
    const userMessage = {
      id: Date.now(), // ID único baseado em timestamp
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    // Adiciona mensagem do usuário à lista
    setMessages(prev => [...prev, userMessage]);
    // Salva input atual e limpa o campo
    const currentInput = inputMessage;
    setInputMessage('');
    // Ativa estado de loading e limpa erros anteriores
    setIsLoading(true);
    setError(null);

    try {
      // Log para debug
      console.log('Enviando mensagem para IA:', currentInput);
      // Chama serviço de IA passando mensagem e histórico
      const aiResponse = await enviarParaIA(currentInput, messages);
      console.log('Resposta da IA:', aiResponse);
      
      // Valida se a IA retornou uma resposta válida
      if (!aiResponse) {
        throw new Error('Resposta vazia da IA');
      }
      
      // Cria objeto da mensagem da IA
      const botMessage = {
        id: Date.now() + 1, // ID diferente da mensagem do usuário
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };
      // Adiciona resposta da IA à lista
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      // Trata erros de comunicação com a IA
      console.error('Erro no chat:', err);
      setError(err.message || 'Erro desconhecido');
      // Cria mensagem de erro visível para o usuário
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: `Desculpe, ocorreu um erro: ${err.message || 'Erro de conexão'}`,
        timestamp: new Date(),
        isError: true // Flag para estilização diferente
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      // Sempre desativa loading, independente do resultado
      setIsLoading(false);
    }
  };

  // Função para capturar tecla Enter e enviar mensagem
  const handleKeyPress = (e) => {
    // Se Enter foi pressionado (sem Shift), envia a mensagem
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Impede quebra de linha
      handleSendMessage();
    }
    // Shift+Enter permite quebra de linha normal
  };

  // Renderização do componente
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header minimalista com informações básicas */}
      <div className="mb-8 p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100">
        <div className="flex items-center gap-3">
          {/* Ícone da IA */}
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          {/* Título e descrição */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Chat IA</h1>
            <p className="text-gray-600 text-sm">Assistente especializada em psicologia</p>
          </div>
        </div>
      </div>

      {/* Container principal do chat */}
      <Card className="h-[700px] flex flex-col shadow-2xl border-0 bg-gradient-to-b from-white to-gray-50">
        {/* Área de mensagens com scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/50 to-white">
          {/* Mapeia e renderiza todas as mensagens */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              {/* Container da mensagem individual */}
              <div className={`flex items-start space-x-3 max-w-[85%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : '' // Inverte layout para usuário
              }`}>
                {/* Avatar do usuário ou IA */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' // Azul para usuário
                    : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white animate-pulse' // Roxo para IA
                }`}>
                  {message.type === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                {/* Balão da mensagem */}
                <div className={`rounded-2xl px-5 py-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' // Estilo usuário
                    : message.isError
                    ? 'bg-red-50 text-red-800 border border-red-200' // Estilo erro
                    : 'bg-white text-gray-800 border border-gray-100' // Estilo IA normal
                }`}>
                  {/* Conteúdo da mensagem */}
                  {message.type === 'user' ? (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  ) : (
                    <div className="text-sm">
                      {/* Renderiza markdown para respostas da IA */}
                      <MarkdownRenderer content={message.content} />
                    </div>
                  )}
                  {/* Timestamp da mensagem */}
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Indicador de loading quando IA está processando */}
          {isLoading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="flex items-start space-x-3 max-w-[85%]">
                {/* Avatar da IA com animação */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg animate-pulse">
                  <Bot size={18} />
                </div>
                {/* Balão com animação de "digitando" */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl px-5 py-4 shadow-lg border border-purple-100">
                  <div className="flex items-center space-x-3">
                    {/* Três bolinhas saltitantes */}
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-purple-700 font-medium">IA está pensando...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Elemento para scroll automático */}
          <div ref={messagesEndRef} />
        </div>

        {/* Área de input para digitar mensagens */}
        <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex space-x-4">
            {/* Campo de texto */}
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress} // Captura Enter
                placeholder="Digite sua pergunta sobre psicologia..."
                className="w-full resize-none border-2 border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg bg-white"
                rows="2"
                disabled={isLoading} // Desabilita durante loading
              />
              {/* Dica visual */}
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                Enter para enviar
              </div>
            </div>
            {/* Botão de enviar */}
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading} // Desabilita se vazio ou loading
              className="self-end bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-4 rounded-2xl"
            >
              {/* Ícone muda baseado no estado */}
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" /> // Loading spinner
              ) : (
                <Send size={20} /> // Ícone de enviar
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Exibe mensagem de erro se houver */}
      {error && (
        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl flex items-center space-x-3 shadow-lg animate-fadeIn">
          <AlertCircle size={20} className="text-red-500" />
          <span className="text-red-700 font-medium">{error}</span>
        </div>
      )}

      {/* Seção de perguntas sugeridas para facilitar interação */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Perguntas Sugeridas
        </h3>
        {/* Grid responsivo com perguntas pré-definidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Array de sugestões com texto e emoji */}
          {[
            { text: 'Como lidar com pacientes com ansiedade?', icon: '🧠' },
            { text: 'Técnicas para terapia infantil', icon: '👶' },
            { text: 'Abordagens para terapia de casal', icon: '💑' },
            { text: 'Sinais de alerta em depressão', icon: '⚠️' }
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(suggestion.text)}
              className="group text-left p-4 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              disabled={isLoading}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{suggestion.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">{suggestion.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};