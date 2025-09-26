/**
 * COMPONENTE: Card
 * PROPÓSITO: Componente reutilizável para criar containers com design consistente
 * 
 * CARACTERÍSTICAS:
 * - Glassmorphism: Efeito de vidro moderno com transparência e blur
 * - Variantes: Diferentes estilos para diferentes contextos
 * - Flexibilidade: Aceita props customizadas e classes CSS adicionais
 * - Acessibilidade: Estrutura semântica adequada
 * 
 * DESIGN SYSTEM:
 * - Bordas arredondadas (rounded-2xl) para modernidade
 * - Sombras suaves (shadow-lg) para profundidade
 * - Padding consistente (p-6) para espaçamento interno
 * 
 * VARIANTES DISPONÍVEIS:
 * - default: Glassmorphism com transparência
 * - solid: Fundo sólido branco com borda
 * - gradient: Gradiente sutil com blur
 * 
 * USO COMUM:
 * - Formulários e seções de conteúdo
 * - Cards de informação e KPIs
 * - Modais e overlays
 * - Containers de dados
 */

/**
 * Componente Card reutilizável
 * @param {React.ReactNode} children - Conteúdo interno do card
 * @param {string} className - Classes CSS adicionais (opcional)
 * @param {string} variant - Variante de estilo ('default', 'solid', 'gradient')
 * @param {object} props - Props adicionais passadas para o elemento div
 * @returns {JSX.Element} Elemento div estilizado como card
 */
export const Card = ({ children, className = '', variant = 'default', ...props }) => {
  // ===== SISTEMA DE VARIANTES =====
  // PADRÃO DE DESIGN: Diferentes estilos para diferentes contextos
  // MANUTENIBILIDADE: Centraliza estilos em um objeto para fácil modificação
  const variants = {
    // GLASSMORPHISM: Efeito de vidro moderno
    // - Transparência com backdrop-blur
    // - Bordas sutis com opacidade
    // - Usado em overlays e elementos flutuantes
    default: 'glassmorphism',
    
    // SÓLIDO: Fundo opaco tradicional
    // - Fundo branco puro
    // - Borda cinza sutil
    // - Usado em formulários e conteúdo principal
    solid: 'bg-white border border-gray-200',
    
    // GRADIENTE: Efeito sutil com cores da marca
    // - Gradiente suave usando cores do tema
    // - Backdrop blur para profundidade
    // - Usado em elementos de destaque
    gradient: 'bg-gradient-to-br from-accent/10 to-light/10 backdrop-blur-sm border border-white/20'
  };

  // ===== RENDERIZAÇÃO =====
  return (
    <div
      // COMPOSIÇÃO DE CLASSES CSS:
      // 1. Estilos base: bordas arredondadas, sombra, padding
      // 2. Variante selecionada: estilo específico do tipo de card
      // 3. Classes customizadas: permite override e extensão
      className={`rounded-2xl shadow-lg p-6 ${variants[variant]} ${className}`}
      
      // SPREAD OPERATOR: Passa todas as props adicionais
      // FLEXIBILIDADE: Permite adicionar eventos, IDs, data-attributes, etc.
      // EXEMPLO: onClick, onHover, data-testid, aria-label
      {...props}
    >
      {/* CHILDREN: Conteúdo interno fornecido pelo componente pai */}
      {/* COMPOSIÇÃO: Padrão React para componentes container */}
      {children}
    </div>
  );
};

/**
 * EXEMPLOS DE USO:
 * 
 * 1. CARD BÁSICO:
 * <Card>
 *   <h2>Título</h2>
 *   <p>Conteúdo do card</p>
 * </Card>
 * 
 * 2. CARD COM VARIANTE:
 * <Card variant="solid">
 *   <form>...</form>
 * </Card>
 * 
 * 3. CARD COM CLASSES CUSTOMIZADAS:
 * <Card className="hover:scale-105 transition-transform">
 *   <div>Card com animação</div>
 * </Card>
 * 
 * 4. CARD COM PROPS ADICIONAIS:
 * <Card onClick={handleClick} data-testid="user-card">
 *   <UserProfile />
 * </Card>
 * 
 * MELHORIAS FUTURAS:
 * 
 * 1. MAIS VARIANTES:
 *    - success, warning, error para diferentes estados
 *    - dark mode variants
 *    - size variants (sm, md, lg, xl)
 * 
 * 2. ANIMAÇÕES:
 *    - Hover effects built-in
 *    - Loading states
 *    - Entrance animations
 * 
 * 3. ACESSIBILIDADE:
 *    - ARIA labels automáticos
 *    - Focus management
 *    - Screen reader optimizations
 * 
 * 4. PERFORMANCE:
 *    - Memoização para cards estáticos
 *    - Lazy loading para cards com imagens
 *    - Virtual scrolling para listas de cards
 */