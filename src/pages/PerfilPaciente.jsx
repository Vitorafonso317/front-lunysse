/* ==============================
   PÁGINA DE PERFIL DO PACIENTE
   ============================== */
// Página para visualizar e editar informações do perfil do paciente
// Inclui dados pessoais, contato de emergência e informações de saúde

import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Contexto de autenticação
import { Card } from '../components/Card'; // Componente de cartão
import { Button } from '../components/Button'; // Componente de botão
import { ArrowLeft, User, Mail, Phone, Calendar, Edit3, Save, X, Heart } from 'lucide-react'; // Ícones
import { Link } from 'react-router-dom'; // Navegação

export const PerfilPaciente = () => {
  // Obtém dados do usuário logado
  const { user } = useAuth();
  // Estado para controlar se está no modo de edição
  const [isEditing, setIsEditing] = useState(false);
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: user.name || '', // Nome completo
    email: user.email || '', // Email (não editável)
    phone: user.phone || '', // Telefone
    birthDate: user.birthDate || '', // Data de nascimento
    emergencyContact: user.emergencyContact || '', // Contato de emergência
    emergencyPhone: user.emergencyPhone || '', // Telefone de emergência
    medicalHistory: user.medicalHistory || '', // Histórico médico
    currentMedications: user.currentMedications || '', // Medicações atuais
    goals: user.goals || '' // Objetivos da terapia
  });

  // Função para salvar as alterações do perfil
  const handleSave = () => {
    // TODO: Implementar chamada para API para salvar os dados
    console.log('Dados salvos:', formData);
    setIsEditing(false); // Sai do modo de edição
  };

  // Função para cancelar edição e restaurar dados originais
  const handleCancel = () => {
    // Restaura os dados originais do usuário
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      birthDate: user.birthDate || '',
      emergencyContact: user.emergencyContact || '',
      emergencyPhone: user.emergencyPhone || '',
      medicalHistory: user.medicalHistory || '',
      currentMedications: user.currentMedications || '',
      goals: user.goals || ''
    });
    setIsEditing(false); // Sai do modo de edição
  };

  // Função utilitária para calcular idade baseada na data de nascimento
  const calculateAge = (birthDate) => {
    if (!birthDate) return 'Não informado';
    const today = new Date();
    const birth = new Date(birthDate);
    // Calcula a diferença em anos
    const age = today.getFullYear() - birth.getFullYear();
    return `${age} anos`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-dark">Meu Perfil</h1>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            Editar Perfil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4" />
              Salvar
            </Button>
            <Button onClick={handleCancel} className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600">
              <X className="w-4 h-4" />
              Cancelar
            </Button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Foto e Informações Básicas */}
        <Card className="p-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <h2 className="text-xl font-bold text-dark mb-1">{formData.name}</h2>
            <p className="text-gray-600 mb-2">Paciente</p>
            <p className="text-sm text-gray-500">{calculateAge(formData.birthDate)}</p>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">Jornada de Bem-estar</span>
            </div>
            <p className="text-sm text-blue-700">
              Você está no caminho certo para uma vida mais equilibrada e saudável.
            </p>
          </div>
        </Card>

        {/* Informações Detalhadas */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{formData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{formData.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{formData.phone || 'Não informado'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('pt-BR') : 'Não informado'}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contato de Emergência</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Contato</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome completo"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span>{formData.emergencyContact || 'Não informado'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone de Emergência</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="(11) 99999-9999"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span>{formData.emergencyPhone || 'Não informado'}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Informações de Saúde</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Histórico Médico Relevante</label>
                {isEditing ? (
                  <textarea
                    value={formData.medicalHistory}
                    onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-20"
                    placeholder="Descreva condições médicas relevantes..."
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg min-h-20">
                    <span>{formData.medicalHistory || 'Não informado'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicações Atuais</label>
                {isEditing ? (
                  <textarea
                    value={formData.currentMedications}
                    onChange={(e) => setFormData({...formData, currentMedications: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-20"
                    placeholder="Liste medicações em uso..."
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg min-h-20">
                    <span>{formData.currentMedications || 'Não informado'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objetivos da Terapia</label>
                {isEditing ? (
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({...formData, goals: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-20"
                    placeholder="O que você espera alcançar com a terapia?"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg min-h-20">
                    <span>{formData.goals || 'Não informado'}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};