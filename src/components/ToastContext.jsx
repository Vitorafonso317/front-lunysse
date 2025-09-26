                                                                                                                                                                                                                                                                /* ==============================
   SISTEMA DE MENSAGENS E NOTIFICAÇÕES
   ============================== */
// Este arquivo gerencia o sistema de mensagens entre pacientes e psicólogos
// Utiliza Context API para compartilhar estado global das mensagens

import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Cria o contexto para compartilhar dados das mensagens entre componentes
const RequestContext = createContext();

// Hook personalizado para acessar o contexto de mensagens
// Facilita o uso do contexto em outros componentes
export const useRequest = () => useContext(RequestContext);

/* ==============================
   COMPONENTE DE NOTIFICAÇÃO INDIVIDUAL
   ============================== */
// Componente que renderiza uma única notificação/mensagem
// Props: request (dados da mensagem), onRemove (função para remover), onAction (ações da mensagem)
const RequestNotification = ({ request, onRemove, onAction }) => {
    // Estado para controlar se a notificação está visível (animação de entrada/saída)
    const [isVisible, setIsVisible] = useState(false);
    // Estado para controlar se uma ação está sendo processada (loading)
    const [isProcessing, setIsProcessing] = useState(false);

    // Função para fechar a notificação com animação
    // useCallback evita recriação desnecessária da função
    const handleClose = useCallback(() => {
        setIsVisible(false); // Inicia animação de saída
        setTimeout(() => onRemove(request.id), 300); // Remove após animação (300ms)
    }, [onRemove, request.id]);

    // Efeito para mostrar a notificação e configurar auto-fechamento
    useEffect(() => {
        setIsVisible(true); // Mostra a notificação com animação
        // Se a mensagem tem auto-fechamento ativado
        if (request.autoClose) {
            // Define timer para fechar automaticamente (padrão: 8 segundos)
            const timer = setTimeout(handleClose, request.duration || 8000);
            // Cleanup: limpa o timer se o componente for desmontado
            return () => clearTimeout(timer);
        }
    }, [request.autoClose, request.duration, handleClose]);

    // Função para processar ações da notificação (responder, marcar como lida, etc.)
    const handleAction = async (action, data) => {
        setIsProcessing(true); // Ativa estado de loading
        try {
            // Executa a ação passada como prop (ex: responder mensagem)
            await onAction(request.id, action, data);
            handleClose(); // Fecha a notificação após sucesso
        } catch (error) {
            console.error('Erro ao processar ação:', error);
        } finally {
            setIsProcessing(false); // Desativa loading independente do resultado
        }
    };

    // Função que retorna o ícone baseado no tipo da mensagem
    const getIcon = () => {
        switch (request.type) {
            case "message": return "💬"; // Ícone de mensagem
            default: return "📋"; // Ícone padrão
        }
    };

    // Função que retorna as cores baseadas na prioridade da mensagem
    const getColors = () => {
        switch (request.priority) {
            case "high": return "bg-red-50 border-red-200 text-red-800"; // Vermelho para alta prioridade
            case "medium": return "bg-yellow-50 border-yellow-200 text-yellow-800"; // Amarelo para média
            case "low": return "bg-blue-50 border-blue-200 text-blue-800"; // Azul para baixa
            default: return "bg-gray-50 border-gray-200 text-gray-800"; // Cinza padrão
        }
    };

    // Renderização da notificação
    return (
        // Container principal com animações e cores dinâmicas
        <div className={`relative max-w-md w-full rounded-xl shadow-lg border-2 overflow-hidden backdrop-blur-sm transform transition-all duration-300 ease-in-out ${isVisible ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"} ${getColors()}`}>
            <div className="p-4">
                {/* Cabeçalho com ícone, título e botão fechar */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                        {/* Ícone da mensagem */}
                        <span className="text-xl">{getIcon()}</span>
                        <div>
                            {/* Título da mensagem */}
                            <h4 className="font-semibold text-sm">{request.title}</h4>
                            {/* Remetente da mensagem */}
                            <p className="text-xs opacity-70">{request.from}</p>
                        </div>
                    </div>
                    {/* Botão para fechar a notificação */}
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        ✕
                    </button>
                </div>
                
                {/* Conteúdo da mensagem */}
                <p className="text-sm mb-4 leading-relaxed">{request.message}</p>
                
                {/* Botões de ação (se existirem) */}
                {request.actions && (
                    <div className="flex gap-2 mt-3">
                        {/* Mapeia as ações disponíveis */}
                        {request.actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => handleAction(action.type, action.data)}
                                disabled={isProcessing} // Desabilita durante processamento
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${action.primary ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {/* Mostra loading ou texto do botão */}
                                {isProcessing ? "..." : action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Barra vermelha pulsante para mensagens de alta prioridade */}
            {request.priority === "high" && (
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />
            )}
        </div>
    );
};

/* ==============================
   PROVEDOR DO CONTEXTO DE MENSAGENS
   ============================== */
// Componente que fornece o contexto de mensagens para toda a aplicação
// Gerencia o estado global das mensagens e fornece funções para manipulá-las
export const RequestProvider = ({ children }) => {
    // Estado que armazena todas as mensagens/solicitações ativas
    const [requests, setRequests] = useState([]);

    // Função para adicionar uma nova mensagem/solicitação
    const addRequest = (requestData) => {
        // Gera ID único combinando timestamp e número aleatório
        const id = Date.now() + Math.random();
        // Cria objeto da mensagem com dados padrão + dados fornecidos
        const request = {
            id,
            timestamp: new Date().toISOString(), // Data/hora de criação
            autoClose: false, // Por padrão não fecha automaticamente
            priority: "medium", // Prioridade padrão
            ...requestData // Sobrescreve com dados fornecidos
        };
        // Adiciona a nova mensagem ao estado
        setRequests(prev => [...prev, request]);
        return id; // Retorna o ID para referência
    };

    // Função para remover uma mensagem pelo ID
    const removeRequest = (id) => {
        setRequests(prev => prev.filter(r => r.id !== id));
    };

    // Função para processar ações das mensagens (responder, marcar como lida, etc.)
    const handleAction = async (requestId, action, data) => {
        console.log('Ação processada:', { requestId, action, data });
        // Simula processamento assíncrono (substitua por chamada real da API)
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Remove a mensagem após processar a ação
        removeRequest(requestId);
    };

    // Função de conveniência para enviar mensagens
    // Configura automaticamente os parâmetros para mensagens
    const sendMessage = (from, message, priority = "low") => {
        return addRequest({
            type: "message", // Tipo: mensagem
            title: "Nova Mensagem", // Título padrão
            from, // Remetente
            message, // Conteúdo da mensagem
            priority, // Prioridade (baixa por padrão)
            autoClose: true, // Mensagens fecham automaticamente
            duration: 6000, // Duração: 6 segundos
            // Ações disponíveis para o psicólogo
            actions: [
                { type: "reply", label: "Responder", primary: true }, // Ação principal
                { type: "mark_read", label: "Marcar como lida" } // Ação secundária
            ]
        });
    };

    // Fornece o contexto com todas as funções e dados para os componentes filhos
    return (
        <RequestContext.Provider value={{ addRequest, sendMessage, requests, removeRequest, handleAction }}>
            {children}
        </RequestContext.Provider>
    );
};