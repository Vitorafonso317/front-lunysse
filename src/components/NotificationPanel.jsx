/* ==============================
   PAINEL DE NOTIFICAÇÕES DO PSICÓLOGO
   ============================== */
// Componente que exibe as mensagens recebidas dos pacientes
// Aparece apenas no dashboard do psicólogo como um dropdown

import { useState } from 'react';
import { useRequest } from './ToastContext'; // Hook para acessar mensagens
import { Bell, X, MessageCircle } from 'lucide-react'; // Ícones

export const NotificationPanel = () => {
    // Obtém mensagens e funções do contexto
    const { requests, removeRequest, handleAction } = useRequest();
    // Estado para controlar se o painel está aberto ou fechado
    const [isOpen, setIsOpen] = useState(false);

    // Conta quantas mensagens não lidas existem
    const unreadCount = requests.length;

    // Função para marcar mensagem como lida (remove da lista)
    const handleMarkAsRead = (requestId) => {
        removeRequest(requestId);
    };

    // Função para responder mensagem
    const handleReply = (requestId) => {
        // TODO: Implementar lógica de resposta (abrir modal, redirecionar, etc.)
        console.log('Responder mensagem:', requestId);
        removeRequest(requestId); // Remove da lista após responder
    };

    // Renderização do painel de notificações
    return (
        <div className="relative">
            {/* Botão do sino com contador de mensagens */}
            <button
                onClick={() => setIsOpen(!isOpen)} // Alterna entre aberto/fechado
                className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
                {/* Ícone do sino */}
                <Bell className="w-6 h-6" />
                {/* Badge com contador (só aparece se houver mensagens) */}
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Painel dropdown (só aparece quando isOpen é true) */}
            {isOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
                    {/* Cabeçalho do painel */}
                    <div className="p-4 border-b">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800">Notificações</h3>
                            {/* Botão para fechar o painel */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Lista de mensagens */}
                    <div className="max-h-80 overflow-y-auto">
                        {/* Estado vazio - quando não há mensagens */}
                        {requests.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p>Nenhuma notificação</p>
                            </div>
                        ) : (
                            // Lista das mensagens
                            requests.map(request => (
                                <div key={request.id} className="p-4 border-b hover:bg-gray-50">
                                    <div className="flex items-start gap-3">
                                        {/* Ícone da mensagem */}
                                        <MessageCircle className="w-5 h-5 text-blue-500 mt-1" />
                                        <div className="flex-1">
                                            {/* Cabeçalho da mensagem com prioridade */}
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-medium text-sm text-gray-800">
                                                    {request.title}
                                                </h4>
                                                {/* Badge de prioridade com cores dinâmicas */}
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    request.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                    request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {/* Texto da prioridade em português */}
                                                    {request.priority === 'high' ? 'Alta' : 
                                                     request.priority === 'medium' ? 'Média' : 'Baixa'}
                                                </span>
                                            </div>
                                            {/* Remetente da mensagem */}
                                            <p className="text-xs text-gray-600 mb-1">De: {request.from}</p>
                                            {/* Conteúdo da mensagem */}
                                            <p className="text-sm text-gray-700 mb-3">{request.message}</p>
                                            {/* Botões de ação */}
                                            <div className="flex gap-2">
                                                {/* Botão para responder */}
                                                <button
                                                    onClick={() => handleReply(request.id)}
                                                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                >
                                                    Responder
                                                </button>
                                                {/* Botão para marcar como lida */}
                                                <button
                                                    onClick={() => handleMarkAsRead(request.id)}
                                                    className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
                                                >
                                                    Marcar como lida
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};