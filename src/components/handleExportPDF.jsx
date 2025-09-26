/**
 * COMPONENTE: handleExportPDF
 * PROPÓSITO: Gera e exporta relatórios em formato PDF com design moderno
 * 
 * TECNOLOGIAS USADAS:
 * - jsPDF: Biblioteca para geração de PDFs no frontend
 * - Canvas API: Para renderização de elementos gráficos
 * 
 * ARQUITETURA:
 * - Função assíncrona que processa elementos DOM
 * - Extrai dados dos KPIs automaticamente
 * - Gera PDF com layout profissional e cores da marca
 * 
 * FLUXO DE EXECUÇÃO:
 * 1. Valida elemento DOM fornecido
 * 2. Configura dimensões e layout do PDF
 * 3. Cria header com branding da empresa
 * 4. Extrai e formata dados dos KPIs
 * 5. Adiciona seção de status e insights
 * 6. Gera rodapé com informações da empresa
 * 7. Salva arquivo com nome baseado na data
 * 
 * DESIGN PATTERNS:
 * - Error Handling: Try/catch para capturar erros
 * - Data Extraction: Query selectors para extrair dados do DOM
 * - Responsive Design: Layout que funciona em diferentes tamanhos
 * 
 * CORES DA MARCA UTILIZADAS:
 * - #2493BF (Azul principal)
 * - #264653 (Verde escuro)
 * - #2A9D8F (Verde médio) 
 * - #F4A261 (Laranja)
 * - #E76F51 (Vermelho)
 */

import jsPDF from "jspdf";

/**
 * Função principal para exportação de PDF
 * @param {HTMLElement} element - Elemento DOM contendo os dados para exportação
 * @returns {Promise<void>} - Promise que resolve quando PDF é gerado
 */
export const handleExportPDF = async (element) => {
  // VALIDAÇÃO DE ENTRADA
  // Verifica se o elemento DOM foi fornecido corretamente
  // IMPORTANTE: Sem elemento, não há dados para extrair
  if (!element) {
    alert("Elemento não encontrado");
    return;
  }

  try {
    // CONFIGURAÇÃO INICIAL DO PDF
    // 'p' = Portrait (retrato), 'mm' = milímetros, 'a4' = tamanho padrão
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // DIMENSÕES E LAYOUT
    // Obtém dimensões da página para cálculos de posicionamento
    const pageWidth = pdf.internal.pageSize.getWidth();   // ~210mm para A4
    const pageHeight = pdf.internal.pageSize.getHeight(); // ~297mm para A4
    const margin = 15;                                    // Margem de 15mm
    const contentWidth = pageWidth - (margin * 2);       // Área útil: 180mm
    let yPosition = 15;                                   // Posição vertical inicial

    // ===== HEADER MODERNO COM GRADIENTE VISUAL =====
    // DESIGN: Simula gradiente usando duas cores sobrepostas
    // COR PRINCIPAL: #2493BF (azul da marca) convertido para RGB
    pdf.setFillColor(36, 147, 191); // #2493BF
    pdf.rect(0, 0, pageWidth, 50, 'F'); // Retângulo preenchido (F = Fill)
    
    // COR SECUNDÁRIA: Cria efeito de profundidade
    pdf.setFillColor(38, 70, 83); // #264653 (verde escuro da marca)
    pdf.rect(0, 40, pageWidth, 10, 'F'); // Faixa inferior para gradiente
    
    // ===== LOGO/ÍCONE SIMULADO =====
    // DESIGN: Círculo branco com letra 'L' da marca Lunysse
    pdf.setFillColor(255, 255, 255); // Branco para contraste
    pdf.circle(25, 25, 8, 'F'); // Círculo: x=25, y=25, raio=8
    
    // LETRA DA MARCA
    pdf.setTextColor(36, 147, 191); // Azul da marca
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('L', 22, 28); // Posicionamento manual para centralizar
    
    // ===== TÍTULO PRINCIPAL =====
    // TIPOGRAFIA: Fonte grande e bold para impacto visual
    pdf.setTextColor(255, 255, 255); // Branco para contraste com fundo azul
    pdf.setFontSize(28); // Tamanho grande para destaque
    pdf.setFont('helvetica', 'bold');
    pdf.text('ANALYTICS DASHBOARD', 40, 25);
    
    // ===== DATA E HORA DE GERAÇÃO =====
    // INFORMAÇÃO CONTEXTUAL: Quando o relatório foi gerado
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const currentDate = new Date().toLocaleDateString('pt-BR'); // Formato brasileiro
    const currentTime = new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
    pdf.text(`${currentDate} • ${currentTime}`, 40, 35); // Bullet point para separação
    
    yPosition = 70; // Move posição para baixo do header

    // ===== EXTRAÇÃO DE DADOS DOS KPIs =====
    // SELETORES DOM: Busca cards de KPI na estrutura HTML
    // PADRÃO: .grid > div seleciona cards filhos diretos do grid
    const kpiCards = element.querySelectorAll('.grid > div');
    const kpiData = []; // Array para armazenar dados extraídos
    
    // PROCESSAMENTO DOS CARDS
    // Para cada card, extrai título e valor
    kpiCards.forEach(card => {
      // OPTIONAL CHAINING: ?. previne erro se elemento não existir
      const title = card.querySelector('p')?.textContent;   // Título do KPI
      const value = card.querySelector('h3')?.textContent;  // Valor numérico
      
      // VALIDAÇÃO: Só adiciona se ambos existirem
      if (title && value) {
        kpiData.push({ title, value });
      }
    });

    // ===== RENDERIZAÇÃO DOS KPIs EM CARDS MODERNOS =====
    // RENDERIZAÇÃO CONDICIONAL: Só cria seção se houver dados
    if (kpiData.length > 0) {
      // ===== CÁLCULOS DE LAYOUT =====
      // GRID RESPONSIVO: 2 colunas com espaçamento
      const cardWidth = (contentWidth - 15) / 2;  // Largura: (180-15)/2 = 82.5mm
      const cardHeight = 25;                      // Altura fixa: 25mm
      let xPos = margin;                          // Posição horizontal inicial
      let cardRow = 0;                            // Contador de linhas
      
      // ===== POSICIONAMENTO DOS CARDS =====
      // ALGORITMO: 2 cards por linha, quebra automaticamente
      kpiData.forEach((kpi, index) => {
        // LÓGICA DE QUEBRA DE LINHA
        if (index % 2 === 0 && index > 0) {
          cardRow++;           // Nova linha a cada 2 cards
          xPos = margin;       // Volta para posição inicial
        } else if (index % 2 === 1) {
          xPos = margin + cardWidth + 5; // Segunda coluna com espaçamento
        }
        
        // CÁLCULO DA POSIÇÃO VERTICAL
        const yPos = yPosition + (cardRow * (cardHeight + 10));
        
        // ===== EFEITO DE SOMBRA =====
        // TÉCNICA: Retângulo cinza deslocado simula sombra
        pdf.setFillColor(245, 245, 245); // Cinza claro para sombra
        pdf.rect(xPos + 1, yPos + 1, cardWidth, cardHeight, 'F'); // Deslocado 1mm
        
        // ===== CARD PRINCIPAL =====
        pdf.setFillColor(255, 255, 255); // Fundo branco
        pdf.rect(xPos, yPos, cardWidth, cardHeight, 'F');
        
        // ===== BORDA DO CARD =====
        pdf.setDrawColor(230, 230, 230); // Cinza claro para borda sutil
        pdf.rect(xPos, yPos, cardWidth, cardHeight, 'S'); // S = Stroke (contorno)
        
        // ===== ÍCONE COLORIDO =====
        // PALETA DE CORES: Cores da marca em sequência
        const colors = [
          [36,147,191],  // #2493BF - Azul principal
          [244,162,97],  // #F4A261 - Laranja
          [42,157,143],  // #2A9D8F - Verde médio
          [231,111,81]   // #E76F51 - Vermelho
        ];
        const color = colors[index % 4]; // Cicla pelas cores
        pdf.setFillColor(...color); // Spread operator para RGB
        pdf.circle(xPos + 12, yPos + 12, 6, 'F'); // Círculo colorido
        
        // ===== VALOR NUMÉRICO =====
        // HIERARQUIA VISUAL: Valor grande e colorido para destaque
        pdf.setTextColor(...color); // Mesma cor do ícone
        pdf.setFontSize(20);         // Fonte grande para impacto
        pdf.setFont('helvetica', 'bold');
        pdf.text(kpi.value, xPos + 25, yPos + 10);
        
        // ===== TÍTULO DO KPI =====
        // CONTRASTE: Cor neutra para não competir com o valor
        pdf.setTextColor(100, 100, 100); // Cinza médio
        pdf.setFontSize(10);              // Fonte menor
        pdf.setFont('helvetica', 'normal');
        pdf.text(kpi.title, xPos + 25, yPos + 18);
      });
      
      // ===== ATUALIZAÇÃO DA POSIÇÃO VERTICAL =====
      // CÁLCULO: Número de linhas * altura + espaçamento extra
      yPosition += Math.ceil(kpiData.length / 2) * (cardHeight + 10) + 20;
    }

    // ===== SEÇÃO DE STATUS COM DESIGN MODERNO =====
    // BACKGROUND: Cinza muito claro para destaque sutil
    pdf.setFillColor(250, 250, 250);
    pdf.rect(margin, yPosition, contentWidth, 40, 'F');
    
    // BORDA: Cinza claro para delimitação
    pdf.setDrawColor(220, 220, 220);
    pdf.rect(margin, yPosition, contentWidth, 40, 'S');
    
    // ===== TÍTULO DA SEÇÃO =====
    pdf.setTextColor(60, 60, 60);   // Cinza escuro para legibilidade
    pdf.setFontSize(16);            // Tamanho médio para hierarquia
    pdf.setFont('helvetica', 'bold');
    pdf.text('STATUS GERAL', margin + 10, yPosition + 15);
    
    // ===== DETECÇÃO DE ALERTAS =====
    // SELETOR AVANÇADO: Busca seção de alertas por classe parcial
    const alertsSection = element.querySelector('[class*="Alertas de Risco"]');
    // FALLBACK: Array vazio se não encontrar alertas
    const alerts = alertsSection?.querySelectorAll('[class*="flex items-center justify-between"]') || [];
    
    // ===== STATUS CONDICIONAL =====
    if (alerts.length === 0) {
      // ===== ESTADO SEGURO =====
      pdf.setFillColor(42, 157, 143); // Verde da marca (#2A9D8F)
      pdf.circle(margin + 15, yPosition + 28, 4, 'F'); // Indicador verde
      
      pdf.setTextColor(42, 157, 143);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SISTEMA SEGURO', margin + 25, yPosition + 30);
      
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Todos os indicadores estão dentro dos parâmetros normais', margin + 25, yPosition + 35);
    } else {
      // ===== ESTADO DE ALERTA =====
      pdf.setFillColor(231, 111, 81); // Vermelho da marca (#E76F51)
      pdf.circle(margin + 15, yPosition + 28, 4, 'F'); // Indicador vermelho
      
      pdf.setTextColor(231, 111, 81);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${alerts.length} ALERTA(S) DETECTADO(S)`, margin + 25, yPosition + 30);
      
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Requer atenção imediata', margin + 25, yPosition + 35);
    }
    
    yPosition += 50; // Espaçamento após seção de status

    // ===== SEÇÃO DE INSIGHTS =====
    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INSIGHTS RÁPIDOS', margin, yPosition);
    yPosition += 15;
    
    // ===== INSIGHTS AUTOMÁTICOS =====
    // CONTEÚDO ESTÁTICO: Insights genéricos para demonstração
    // TODO: Implementar insights dinâmicos baseados nos dados reais
    const insights = [
      '• Performance geral dentro dos padrões esperados',
      '• Engajamento dos usuários em alta',
      '• Recomenda-se manter rotina atual de atendimentos'
    ];
    
    // RENDERIZAÇÃO DOS INSIGHTS
    insights.forEach(insight => {
      pdf.setTextColor(80, 80, 80);   // Cinza médio para texto
      pdf.setFontSize(11);            // Fonte menor para detalhes
      pdf.setFont('helvetica', 'normal');
      pdf.text(insight, margin + 5, yPosition);
      yPosition += 8;                 // Espaçamento entre linhas
    });
    
    // ===== RODAPÉ MODERNO =====
    // BACKGROUND: Cinza claro para delimitar rodapé
    pdf.setFillColor(245, 245, 245);
    pdf.rect(0, pageHeight - 25, pageWidth, 25, 'F');
    
    // ===== MARCA DA EMPRESA =====
    pdf.setTextColor(36, 147, 191); // Azul da marca
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('LUNYSSE', margin, pageHeight - 12);
    
    // ===== INFORMAÇÕES LEGAIS =====
    pdf.setTextColor(120, 120, 120); // Cinza para informações secundárias
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Plataforma de Saúde Mental • Confidencial', margin, pageHeight - 6);
    
    // ===== WEBSITE =====
    pdf.setTextColor(36, 147, 191); // Azul da marca
    pdf.text('lunysse.com', pageWidth - margin - 25, pageHeight - 12);
    
    // ===== GERAÇÃO E DOWNLOAD DO ARQUIVO =====
    // NOME DO ARQUIVO: Inclui data para organização
    const fileName = `analytics_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName); // Dispara download no navegador
    
    // FEEDBACK DE SUCESSO
    alert('Dashboard exportado com sucesso!');
    
  } catch (err) {
    // ===== TRATAMENTO DE ERROS =====
    // LOG: Para debug durante desenvolvimento
    console.error('Erro:', err);
    
    // FEEDBACK: Informa usuário sobre o erro
    alert(`Erro ao exportar: ${err.message}`);
  }
};

/**
 * MELHORIAS FUTURAS:
 * 
 * 1. INSIGHTS DINÂMICOS:
 *    - Analisar dados reais dos KPIs
 *    - Gerar insights baseados em tendências
 *    - Alertas personalizados por contexto
 * 
 * 2. CUSTOMIZAÇÃO:
 *    - Permitir escolha de cores
 *    - Templates diferentes por tipo de relatório
 *    - Logo personalizável
 * 
 * 3. DADOS AVANÇADOS:
 *    - Gráficos em formato de imagem
 *    - Tabelas com dados detalhados
 *    - Múltiplas páginas para relatórios extensos
 * 
 * 4. PERFORMANCE:
 *    - Cache de configurações
 *    - Compressão de PDF
 *    - Progress bar para arquivos grandes
 */