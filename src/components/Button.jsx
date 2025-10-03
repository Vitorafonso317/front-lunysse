/**
 * COMPONENTE: Button
 * PROPÓSITO: Componente reutilizável para botões com design consistente
 * 
 * CARACTERÍSTICAS:
 * - Sistema de variantes para diferentes contextos
 * - Múltiplos tamanhos responsivos
 * - Estado de loading integrado
 * - Acessibilidade built-in
 * - Transições suaves
 * 
 * DESIGN SYSTEM:
 * - Cores baseadas no tema da aplicação
 * - Bordas arredondadas consistentes
 * - Estados hover e focus bem definidos
 * - Feedback visual para interações
 * 
 * ESTADOS SUPORTADOS:
 * - Normal: Estado padrão interativo
 * - Hover: Mudança visual ao passar mouse
 * - Focus: Destaque para navegação por teclado
 * - Loading: Desabilitado com feedback visual
 * - Disabled: Não interativo
 * 
 * ACESSIBILIDADE:
 * - Focus ring para navegação por teclado
 * - Estados disabled apropriados
 * - Contraste adequado para legibilidade
 */

/**
 * Componente Button reutilizável
 * @param {React.ReactNode} children - Conteúdo interno do botão (texto, ícones, etc.)
 * @param {string} variant - Variante de estilo ('primary', 'secondary')
 * @param {string} size - Tamanho do botão ('sm', 'md', 'lg')
 * @param {boolean} loading - Estado de carregamento
 * @param {string} className - Classes CSS adicionais
 * @param {object} props - Props adicionais (onClick, type, disabled, etc.)
 * @returns {JSX.Element} Elemento button estilizado
 */
export const Button = ({ 
  children,                    // Conteúdo interno do botão (texto ou ícones)
  variant = 'primary',         // Define o estilo visual (padrão: primary)
  size = 'md',                // Define o tamanho do botão (padrão: md)
  loading = false,            // Indica se o botão está em estado de carregamento
  className = '',             // Permite adicionar classes extras personalizadas
  ...props                    // Captura outras props (ex: onClick, type, etc.)
}) => {
  // ===== CLASSES BASE =====
  // CONSISTÊNCIA: Aplicadas em todos os botões independente da variante
  // ACESSIBILIDADE: Focus ring e outline para navegação por teclado
  // PERFORMANCE: Transições suaves para melhor UX
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // ===== SISTEMA DE VARIANTES =====
  // DESIGN TOKENS: Cores baseadas no sistema de design da aplicação
  // HIERARQUIA VISUAL: Primary para ações principais, secondary para ações secundárias
  const variants = {
    // PRIMARY: Botão de ação principal
    // - Fundo colorido para máximo destaque
    // - Texto branco para contraste
    // - Hover escurece ligeiramente
    // - Focus ring na cor da marca
    primary: 'bg-light text-white hover:bg-accent focus:ring-light',
    
    // SECONDARY: Botão de ação secundária
    // - Fundo transparente para menos destaque
    // - Borda colorida para definição
    // - Hover preenche com cor
    // - Mantém acessibilidade
    secondary: 'bg-transparent border border-light text-light hover:bg-accent hover:border-accent focus:ring-light'
  };
  
  // ===== SISTEMA DE TAMANHOS =====
  // RESPONSIVIDADE: Diferentes tamanhos para diferentes contextos
  // HIERARQUIA: sm para ações menores, lg para CTAs importantes
  const sizes = {
    // SMALL: Para ações secundárias ou espaços limitados
    sm: 'px-3 py-1.5 text-sm',
    
    // MEDIUM: Tamanho padrão para a maioria dos casos
    md: 'px-4 py-2 text-base',
    
    // LARGE: Para CTAs importantes ou telas maiores
    lg: 'px-6 py-3 text-lg'
  };

  // ===== RENDERIZAÇÃO =====
  return (
    <button
      // ===== COMPOSIÇÃO DINÂMICA DE CLASSES =====
      // ORDEM: base → variante → tamanho → customizadas → estados
      // CONDICIONAL: Adiciona estilos de loading quando necessário
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className} 
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}
      `.replace(/\s+/g, ' ').trim()} // Remove espaços extras
      
      // ===== ESTADO DISABLED =====
      // UX: Previne cliques durante loading
      // ACESSIBILIDADE: Screen readers identificam estado
      disabled={props.disabled || loading}
      
      // ===== PROPS FORWARDING =====
      // FLEXIBILIDADE: Permite todas as props nativas de button
      // EXEMPLOS: onClick, onFocus, type, form, data-*, aria-*
      {...props}
    >
      {/* ===== CONTEÚDO CONDICIONAL ===== */}
      {/* LOADING STATE: Substitui conteúdo por indicador de carregamento */}
      {/* FEEDBACK VISUAL: Usuário sabe que ação está sendo processada */}
      {loading ? 'Carregando...' : children}
    </button>
  );
};

/**
 * EXEMPLOS DE USO:
 * 
 * 1. BOTÃO BÁSICO:
 * <Button onClick={handleSubmit}>
 *   Enviar
 * </Button>
 * 
 * 2. BOTÃO SECUNDÁRIO:
 * <Button variant="secondary" onClick={handleCancel}>
 *   Cancelar
 * </Button>
 * 
 * 3. BOTÃO COM LOADING:
 * <Button loading={isSubmitting} onClick={handleSubmit}>
 *   Salvar Dados
 * </Button>
 * 
 * 4. BOTÃO GRANDE COM ÍCONE:
 * <Button size="lg" className="flex items-center gap-2">
 *   <Icon name="save" />
 *   Salvar Documento
 * </Button>
 * 
 * 5. BOTÃO DE FORMULÁRIO:
 * <Button type="submit" disabled={!isValid}>
 *   Criar Conta
 * </Button>
 * 
 * MELHORIAS FUTURAS:
 * 
 * 1. MAIS VARIANTES:
 *    - danger: Para ações destrutivas (vermelho)
 *    - success: Para confirmações (verde)
 *    - warning: Para ações de atenção (amarelo)
 *    - ghost: Transparente com hover sutil
 * 
 * 2. ESTADOS AVANÇADOS:
 *    - Spinner animado durante loading
 *    - Ícones de sucesso/erro após ações
 *    - Tooltip integrado para explicações
 * 
 * 3. ACESSIBILIDADE AVANÇADA:
 *    - ARIA labels automáticos
 *    - Suporte a screen readers
 *    - Navegação por teclado otimizada
 * 
 * 4. ANIMAÇÕES:
 *    - Ripple effect ao clicar
 *    - Micro-interações suaves
 *    - Loading skeleton states
 * 
 * 5. RESPONSIVIDADE:
 *    - Tamanhos adaptativos por breakpoint
 *    - Touch targets otimizados para mobile
 *    - Densidade variável (compact, comfortable)
 */