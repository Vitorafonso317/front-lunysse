import { createContext, useContext, useState, useEffect } from 'react';

// Criação de um contexto de autenticação.
// Esse contexto vai permitir que qualquer componente da aplicação acesse informações
// sobre o usuário autenticado, sem precisar passar props manualmente.
const AuthContext = createContext();

// Hook personalizado para consumir o contexto de autenticação.
// Se alguém tentar usar esse hook fora do AuthProvider, será lançada uma exceção.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Componente Provider que vai encapsular a aplicação ou partes dela
// e fornecer os dados de autenticação (user, login, logout, loading) para os filhos.
export const AuthProvider = ({ children }) => {
  // Estado para armazenar os dados do usuário autenticado
  const [user, setUser] = useState(null);

  // Estado para controlar se ainda está carregando as informações iniciais (ex: leitura do localStorage)
  const [loading, setLoading] = useState(true);

  // Efeito que roda apenas uma vez (quando o componente é montado).
  // Ele verifica se já existe um token e dados de usuário no localStorage
  // e, caso existam, atualiza o estado do usuário.
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData)); // Converte a string salva em objeto
    }
    setLoading(false); // Finaliza o estado de carregamento
  }, []);

  // Função de login:
  // - Salva o token e os dados do usuário no localStorage
  // - Atualiza o estado do usuário para o contexto
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Função de logout:
  // - Remove token e dados de usuário do localStorage
  // - Reseta o estado do usuário para null
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Retorna o Provider com os valores que estarão disponíveis
  // para todos os componentes que estiverem dentro dele.
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};