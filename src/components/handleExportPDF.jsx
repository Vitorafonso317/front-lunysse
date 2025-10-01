import jsPDF from "jspdf";

export const handleExportPDF = async (element) => {
  if (!element) {
    alert("Elemento não encontrado");
    return;
  }

  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = 20;

    // Header moderno com gradiente
    pdf.setFillColor(36, 147, 191); // #2493BF
    pdf.rect(0, 0, pageWidth, 60, 'F');
    
    pdf.setFillColor(38, 70, 83); // #264653
    pdf.rect(0, 50, pageWidth, 10, 'F');
    
    // Logo simulado
    pdf.setFillColor(255, 255, 255);
    pdf.circle(30, 30, 12, 'F');
    
    pdf.setTextColor(36, 147, 191);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('L', 26, 35);
    
    // Título principal
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RELATÓRIO DE ANALYTICS', 50, 30);
    
    // Subtítulo
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Sistema Lunysse - Plataforma de Saúde Mental', 50, 40);
    
    // Data e hora
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const currentTime = new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
    pdf.text(`Gerado em: ${currentDate} às ${currentTime}`, 50, 50);
    
    yPosition = 80;

    // Extração de dados dos KPIs
    const kpiCards = element.querySelectorAll('.grid > div');
    const kpiData = [];
    
    kpiCards.forEach(card => {
      const valueElement = card.querySelector('.text-2xl');
      const titleElement = card.querySelector('.text-sm');
      
      if (valueElement && titleElement) {
        const value = valueElement.textContent.trim();
        const title = titleElement.textContent.trim();
        kpiData.push({ title, value });
      }
    });

    // Seção de KPIs
    if (kpiData.length > 0) {
      pdf.setTextColor(60, 60, 60);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('INDICADORES PRINCIPAIS (KPIs)', margin, yPosition);
      yPosition += 15;
      
      // Grid de KPIs - 2 por linha
      const cardWidth = (contentWidth - 10) / 2;
      const cardHeight = 35;
      let xPos = margin;
      let cardRow = 0;
      
      kpiData.forEach((kpi, index) => {
        if (index % 2 === 0 && index > 0) {
          cardRow++;
          xPos = margin;
        } else if (index % 2 === 1) {
          xPos = margin + cardWidth + 10;
        }
        
        const yPos = yPosition + (cardRow * (cardHeight + 10));
        
        // Sombra do card
        pdf.setFillColor(240, 240, 240);
        pdf.rect(xPos + 2, yPos + 2, cardWidth, cardHeight, 'F');
        
        // Card principal
        pdf.setFillColor(255, 255, 255);
        pdf.rect(xPos, yPos, cardWidth, cardHeight, 'F');
        
        // Borda
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.5);
        pdf.rect(xPos, yPos, cardWidth, cardHeight, 'S');
        
        // Ícone colorido
        const colors = [
          [36,147,191],  // Azul
          [42,157,143],  // Verde
          [244,162,97],  // Laranja
          [231,111,81]   // Vermelho
        ];
        const color = colors[index % 4];
        pdf.setFillColor(...color);
        pdf.circle(xPos + 15, yPos + 15, 8, 'F');
        
        // Valor
        pdf.setTextColor(...color);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text(kpi.value, xPos + 30, yPos + 12);
        
        // Título
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        // Quebra de linha para títulos longos
        const words = kpi.title.split(' ');
        let line = '';
        let lineY = yPos + 22;
        
        words.forEach(word => {
          const testLine = line + word + ' ';
          const textWidth = pdf.getTextWidth(testLine);
          
          if (textWidth > cardWidth - 35 && line !== '') {
            pdf.text(line.trim(), xPos + 30, lineY);
            line = word + ' ';
            lineY += 4;
          } else {
            line = testLine;
          }
        });
        
        if (line.trim() !== '') {
          pdf.text(line.trim(), xPos + 30, lineY);
        }
      });
      
      yPosition += Math.ceil(kpiData.length / 2) * (cardHeight + 10) + 20;
    }

    // Seção de Status Geral
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, yPosition, contentWidth, 50, 'F');
    
    pdf.setDrawColor(226, 232, 240);
    pdf.rect(margin, yPosition, contentWidth, 50, 'S');
    
    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('STATUS GERAL DO SISTEMA', margin + 10, yPosition + 15);
    
    // Verificar alertas
    const alertsCount = kpiData.find(kpi => kpi.title.includes('Alertas'))?.value || '0';
    const hasAlerts = parseInt(alertsCount) > 0;
    
    if (hasAlerts) {
      pdf.setFillColor(239, 68, 68);
      pdf.circle(margin + 15, yPosition + 30, 5, 'F');
      
      pdf.setTextColor(239, 68, 68);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${alertsCount} ALERTA(S) DETECTADO(S)`, margin + 25, yPosition + 32);
      
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Requer atenção imediata dos profissionais', margin + 25, yPosition + 40);
    } else {
      pdf.setFillColor(34, 197, 94);
      pdf.circle(margin + 15, yPosition + 30, 5, 'F');
      
      pdf.setTextColor(34, 197, 94);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SISTEMA OPERANDO NORMALMENTE', margin + 25, yPosition + 32);
      
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Todos os indicadores dentro dos parâmetros esperados', margin + 25, yPosition + 40);
    }
    
    yPosition += 70;

    // Seção de Insights
    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INSIGHTS E RECOMENDAÇÕES', margin, yPosition);
    yPosition += 15;
    
    const insights = [
      '• Performance geral dos atendimentos dentro dos padrões de qualidade',
      '• Engajamento dos pacientes demonstra boa adesão ao tratamento',
      '• Recomenda-se manter a rotina atual de acompanhamentos',
      '• Monitoramento contínuo dos indicadores de risco é essencial'
    ];
    
    insights.forEach(insight => {
      pdf.setTextColor(80, 80, 80);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text(insight, margin + 5, yPosition);
      yPosition += 8;
    });
    
    yPosition += 20;

    // Seção de Resumo Executivo
    pdf.setFillColor(245, 245, 245);
    pdf.rect(margin, yPosition, contentWidth, 40, 'F');
    
    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RESUMO EXECUTIVO', margin + 10, yPosition + 15);
    
    pdf.setTextColor(80, 80, 80);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Este relatório apresenta uma visão consolidada dos principais indicadores', margin + 10, yPosition + 25);
    pdf.text('de performance da plataforma Lunysse, auxiliando na tomada de decisões', margin + 10, yPosition + 32);
    pdf.text('estratégicas para otimização dos serviços de saúde mental oferecidos.', margin + 10, yPosition + 39);

    // Rodapé moderno
    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, pageHeight - 30, pageWidth, 30, 'F');
    
    // Linha separadora
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.5);
    pdf.line(0, pageHeight - 30, pageWidth, pageHeight - 30);
    
    // Informações do rodapé
    pdf.setTextColor(36, 147, 191);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('LUNYSSE', margin, pageHeight - 15);
    
    pdf.setTextColor(120, 120, 120);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Plataforma de Saúde Mental • Confidencial e Seguro', margin, pageHeight - 8);
    
    // Website e contato
    pdf.setTextColor(36, 147, 191);
    pdf.setFontSize(9);
    pdf.text('lunysse.com', pageWidth - margin - 20, pageHeight - 15);
    
    pdf.setTextColor(120, 120, 120);
    pdf.text('Desenvolvido por Vitor Afonso', pageWidth - margin - 35, pageHeight - 8);

    // Salvar arquivo
    const fileName = `relatorio_lunysse_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    alert('Relatório exportado com sucesso!');
    
  } catch (err) {
    console.error('Erro ao exportar PDF:', err);
    alert(`Erro ao exportar relatório: ${err.message}`);
  }
};