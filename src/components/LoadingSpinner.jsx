// Componente LoadingSpinner reutilizável
export const LoadingSpinner = ({ size = 'md' }) => {
  // Define classes de tamanho para o spinner
  const sizes = {
    sm: 'w-4 h-4', // Pequeno
    md: 'w-8 h-8', // Médio (padrão)
    lg: 'w-12 h-12' // Grande
  };

  return (
    <div className="flex justify-center items-center"> {/* Centraliza o spinner */}
      <div 
        // Aplica tamanho, bordas e animação de rotação
        className={`${sizes[size]} border-4 border-light/30 border-t-light rounded-full animate-spin`}
      ></div>
    </div>
  );
};