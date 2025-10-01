# 🧠 Lunysse - Sistema de Agendamento Psicológico

Sistema web moderno para gestão de consultas psicológicas, desenvolvido com React 19 + Vite, focado em atendimentos voluntários em universidades, ONGs e projetos sociais.

![Lunysse Logo](public/logo.png)

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](CHANGELOG.md)
[![React](https://img.shields.io/badge/React-19.1.1-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646cff.svg)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1.12-38bdf8.svg)](https://tailwindcss.com/)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Modelo de Dados](#modelo-de-dados)
- [API Mock](#api-mock)
- [Chat com IA](#chat-com-ia)
- [Componentes](#componentes)
- [Rotas](#rotas)
- [Design System](#design-system)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O **Lunysse** é uma plataforma web desenvolvida para facilitar o agendamento e gestão de consultas psicológicas em ambientes de atendimento voluntário. O sistema oferece interfaces diferenciadas para psicólogos e pacientes, com foco na experiência do usuário e eficiência operacional.

### Objetivos

- Simplificar o processo de agendamento de consultas
- Facilitar a gestão de pacientes para psicólogos
- Fornecer relatórios e analytics para acompanhamento
- Manter histórico completo de sessões
- Garantir interface moderna e responsiva

## ✨ Funcionalidades

### 👨⚕️ Para Psicólogos

- **Dashboard Personalizado**: Visão geral com KPIs e próximos agendamentos
- **Gestão de Pacientes**: Lista completa com informações detalhadas
- **Detalhes do Paciente**: Histórico de sessões, anotações e relatórios
- **Gestão de Sessões**: Edição de status, anotações e relatórios clínicos
- **Chat com IA**: Assistente especializada em psicologia clínica
- **Relatórios e Analytics**: Gráficos de frequência, status e alertas de risco
- **Solicitações**: Gerenciamento de pedidos de novos pacientes
- **Modal de Confirmação**: Confirmação de logout com "Deseja realmente sair?"

### 👤 Para Pacientes

- **Dashboard Simples**: Próximos agendamentos e informações relevantes
- **Agendamento Flexível**: Escolha de psicólogo, data e horário
- **Seleção de Especialista**: Lista de psicólogos com especialidades
- **Verificação de Disponibilidade**: Horários livres em tempo real

### 🔐 Sistema de Autenticação

- Login seguro com validação
- Diferenciação automática de perfis (psicólogo/paciente)
- Registro de novos usuários com validação
- Contexto global de autenticação
- Proteção de rotas por perfil
- Modal de confirmação para logout

## 🛠 Tecnologias

### Frontend
- **React 19.1.1** - Biblioteca principal
- **Vite 7.1.2** - Build tool e dev server
- **React Router DOM 7.8.2** - Roteamento
- **Tailwind CSS 4.1.12** - Framework CSS moderno
- **Framer Motion 12.23.12** - Animações fluidas
- **Lucide React 0.542.0** - Ícones modernos
- **Recharts 3.2.1** - Gráficos e visualizações
- **React Hot Toast 2.6.0** - Notificações
- **@huggingface/inference 4.8.0** - Integração com IA

### Persistência
- **LocalStorage** - Armazenamento local dos dados
- **Mock API** - Simulação de backend

### Design
- **Glassmorphism** - Efeitos visuais modernos
- **Design System** - Paleta de cores consistente
- **Responsivo** - Mobile-first approach

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/vitor-afonso/lunysse-sistema-psicologico.git
cd lunysse-sistema-psicologico
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

## 💻 Uso

### Contas de Teste

#### Psicólogos
- **Dra. Ana Costa**: `ana@test.com` / `123456` - Terapia Cognitivo-Comportamental
- **Dr. Carlos Mendes**: `carlos@test.com` / `123456` - Psicologia Infantil
- **Dra. Lucia Ferreira**: `lucia@test.com` / `123456` - Terapia Familiar

#### Paciente
- **Maria Santos**: `paciente@test.com` / `123456`

### Fluxo de Uso

1. **Login**: Acesse com uma das contas de teste
2. **Dashboard**: Visualize informações relevantes ao seu perfil
3. **Navegação**: Use a sidebar para acessar diferentes seções
4. **Agendamento** (Pacientes): Escolha psicólogo, data e horário
5. **Gestão** (Psicólogos): Gerencie pacientes e sessões
6. **Logout**: Confirmação com modal "Deseja realmente sair?"

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.jsx      # Botão customizado com variantes
│   ├── Card.jsx        # Container com glassmorphism
│   ├── ConfirmModal.jsx # Modal de confirmação
│   ├── Input.jsx       # Input com validação
│   ├── LoadingSpinner.jsx # Spinner de carregamento
│   ├── MarkdownRenderer.jsx # Renderizador de markdown para IA
│   ├── NotificationPanel.jsx # Painel de notificações
│   ├── PublicNavbar.jsx # Navbar para páginas públicas
│   ├── ScrollToTop.jsx # Componente para scroll automático
│   ├── Sidebar.jsx     # Sidebar adaptativa com modal de logout
│   └── ToastContext.jsx # Contexto para notificações
├── context/            # Contextos React
│   └── AuthContext.jsx # Contexto de autenticação
├── pages/              # Páginas da aplicação
│   ├── About.jsx       # Página sobre o projeto
│   ├── Agendamento.jsx # Sistema de agendamento (pacientes)
│   ├── ChatIA.jsx      # Chat com IA especializada (psicólogos)
│   ├── DashboardPaciente.jsx # Dashboard para pacientes
│   ├── DashboardPsicologo.jsx # Dashboard para psicólogos
│   ├── Historico.jsx   # Histórico de sessões
│   ├── Home.jsx        # Página inicial pública
│   ├── Login.jsx       # Login padrão
│   ├── Mensagens.jsx   # Sistema de mensagens
│   ├── NovaConsulta.jsx # Nova consulta
│   ├── NotFound.jsx    # Página 404 personalizada
│   ├── PacienteDetalhe.jsx # Detalhes e histórico do paciente
│   ├── Pacientes.jsx   # Lista de pacientes (psicólogos)
│   ├── PerfilPaciente.jsx # Perfil do paciente
│   ├── PerfilPsicologo.jsx # Perfil do psicólogo
│   ├── Register.jsx    # Cadastro de usuários
│   ├── Relatorios.jsx  # Relatórios e analytics (psicólogos)
│   ├── SessaoDetalhes.jsx # Detalhes e gestão de sessões
│   └── Solicitacoes.jsx # Solicitações de novos pacientes
├── routes/             # Configuração de rotas
│   └── AppRoutes.jsx   # Rotas principais
├── services/           # Serviços e APIs
│   ├── aiservice.js    # Serviço de IA
│   └── mockApi.js      # API mockada
├── App.jsx             # Componente principal
├── index.css           # Estilos globais Tailwind
└── main.jsx            # Entry point
```

## 🔌 API Mock

### Estrutura da API

A API mockada simula um backend real com as seguintes funcionalidades:

#### Autenticação
- `login(email, password)` - Autenticação de usuário
- `register(userData)` - Registro de novo usuário

#### Usuários
- `getPsychologists()` - Lista psicólogos disponíveis

#### Pacientes
- `getPatients(psychologistId)` - Lista pacientes do psicólogo
- `createPatient(patientData)` - Criar novo paciente

#### Agendamentos
- `getAppointments(userId, userType)` - Lista agendamentos
- `createAppointment(appointmentData)` - Criar agendamento
- `getAvailableSlots(date, psychologistId)` - Horários disponíveis
- `updateAppointment(id, data)` - Atualizar agendamento
- `cancelAppointment(id)` - Cancelar agendamento

#### Sessões
- `getSessionDetails(sessionId)` - Detalhes da sessão
- `updateSessionStatus(sessionId, status)` - Atualizar status
- `updateSessionNotes(sessionId, notes, report)` - Atualizar anotações

#### Solicitações
- `getRequests(psychologistId)` - Lista solicitações
- `updateRequestStatus(requestId, status, notes)` - Atualizar solicitação
- `createRequest(requestData)` - Criar nova solicitação

#### Relatórios
- `getReportsData(psychologistId)` - Dados para relatórios

### Persistência

Os dados são armazenados no `localStorage` do navegador:

- `lunysse_users` - Usuários do sistema
- `lunysse_patients` - Pacientes cadastrados
- `lunysse_appointments` - Agendamentos e sessões
- `lunysse_requests` - Solicitações de novos pacientes

## 🤖 Chat com IA

### Funcionalidades

- **Assistente Especializada**: IA treinada em psicologia clínica
- **Respostas Estruturadas**: Formatação markdown para melhor legibilidade
- **Histórico de Conversa**: Contexto mantido durante a sessão
- **Tratamento de Erros**: Mensagens informativas para problemas de conexão
- **Interface Moderna**: Design consistente com o sistema

### Configuração

1. **Modelo Utilizado**:
   - **Provider**: Hugging Face
   - **Especialização**: Psicologia clínica
   - **Parâmetros**: max_tokens: 1500, temperature: 0.7

2. **Funcionalidades da IA**:
   - Respostas formatadas em markdown
   - Contexto de conversa mantido (últimas 10 mensagens)
   - Orientações baseadas em evidências científicas
   - Tratamento de erros específicos (token inválido, rate limit, conexão)

### Exemplos de Uso

- "Como lidar com pacientes com ansiedade?"
- "Técnicas para terapia infantil"
- "Abordagens para terapia de casal"
- "Sinais de alerta em depressão"
- "Orientações sobre aspectos éticos"

## 🎨 Design System

### Paleta de Cores

```css
:root {
  --dark: #010440;      /* Azul escuro principal */
  --medium: #024873;    /* Azul médio */
  --light: #2493BF;     /* Azul claro */
  --accent: #26B0BF;    /* Azul accent */
  --background: #F2EFE9; /* Bege claro */
}
```

### Componentes Base

#### Button
- Variantes: primary, secondary, danger
- Estados: normal, hover, loading, disabled
- Tamanhos: sm, md, lg

#### Card
- Glassmorphism effect
- Sombras suaves
- Bordas arredondadas

#### ConfirmModal
- Modal de confirmação reutilizável
- Overlay com blur
- Botões de ação customizáveis

### Breakpoints Responsivos

```css
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
2xl: 1536px /* Extra Large */
```

## 🧩 Componentes Principais

### Componentes de UI

#### `<Button />`
Botão customizado com variantes e estados.

```jsx
<Button variant="primary" size="lg" loading={isLoading}>
  Confirmar
</Button>
```

#### `<Card />`
Container com efeito glassmorphism.

```jsx
<Card className="p-6">
  <h2>Título do Card</h2>
  <p>Conteúdo...</p>
</Card>
```

#### `<ConfirmModal />`
Modal de confirmação reutilizável.

```jsx
<ConfirmModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={handleConfirm}
  title="Confirmar Ação"
  message="Deseja realmente continuar?"
  confirmText="Sim"
  cancelText="Cancelar"
/>
```

### Componentes de Layout

#### `<Sidebar />`
Navegação lateral com modal de confirmação de logout.

#### `<PublicNavbar />`
Navbar para páginas públicas.

## 🛣 Rotas

### Rotas Públicas
- `/` - Página inicial
- `/about` - Sobre o projeto
- `/login` - Login
- `/register` - Cadastro

### Rotas Protegidas
- `/dashboard` - Dashboard (redireciona por tipo de usuário)
- `/agendamento` - Agendamento (apenas pacientes)
- `/historico` - Histórico de sessões
- `/mensagens` - Sistema de mensagens
- `/perfil-paciente` - Perfil do paciente
- `/perfil-psicologo` - Perfil do psicólogo
- `/chat-ia` - Chat com IA (apenas psicólogos)
- `/relatorios` - Relatórios (apenas psicólogos)
- `/solicitacoes` - Solicitações (apenas psicólogos)
- `/pacientes` - Lista de pacientes (apenas psicólogos)
- `/pacientes/:id` - Detalhes do paciente
- `/sessao/:sessionId` - Detalhes da sessão

## 📊 Funcionalidades Avançadas

### Sistema de Relatórios

- **KPIs Dinâmicos**: Calculados em tempo real
- **Gráficos Interativos**: Recharts para visualizações
- **Alertas de Risco**: Baseados em padrões de comportamento
- **Dados Históricos**: Análise temporal de sessões

### Gestão de Solicitações

- **Pedidos de Pacientes**: Sistema para novos pacientes solicitarem atendimento
- **Aprovação/Rejeição**: Psicólogos podem aceitar ou recusar solicitações
- **Notificações**: Alertas para novas solicitações

### Interface Responsiva

- **Mobile-First**: Design otimizado para dispositivos móveis
- **Sidebar Adaptativa**: Menu hambúrguer em telas pequenas
- **Cards Flexíveis**: Layout que se adapta ao conteúdo
- **Navegação Intuitiva**: UX consistente em todos os dispositivos

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint do código
npm run lint

# Instalar dependências
npm install
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use ESLint para manter consistência
- Componentes em PascalCase
- Funções em camelCase
- Constantes em UPPER_CASE

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvedor Principal**: Vitor Afonso
- **Projeto**: Sistema de Agendamento Psicológico Lunysse

## 🔄 Versão Atual

**v1.0.0** - Sistema completo com todas as funcionalidades principais implementadas:

- ✅ Sistema de autenticação completo
- ✅ Dashboard para psicólogos e pacientes
- ✅ Gestão de pacientes e sessões
- ✅ Chat com IA especializada
- ✅ Relatórios e analytics
- ✅ Sistema de solicitações
- ✅ Interface responsiva
- ✅ Modal de confirmação de logout
- ✅ Detalhes de sessões com edição

## 📞 Contato

- **Desenvolvedor**: Vitor Afonso
- **GitHub**: https://github.com/Vitorafonso317/front-lunysse

---

<div align="center">
  <p>Desenvolvido com ❤️ para facilitar o acesso à saúde mental</p>
  <p><strong>Lunysse v1.0.0 - Sistema de Agendamento Psicológico</strong></p>
  <p>React 19 • Vite 7 • Tailwind CSS 4 • Hugging Face AI</p>
</div>