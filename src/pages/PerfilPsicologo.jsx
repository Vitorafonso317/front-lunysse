/* ==============================
   PÁGINA DE PERFIL DO PSICÓLOGO
   ============================== */
// Página para visualizar e editar informações do perfil do psicólogo
// Inclui dados pessoais e profissionais com modo de edição

import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Contexto de autenticação
import { Card } from '../components/Card'; // Componente de cartão
import { Button } from '../components/Button'; // Componente de botão
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from 'lucide-react'; // Ícones
import { Link } from 'react-router-dom'; // Navegação

export const PerfilPsicologo = () => {
  // Obtém dados do usuário logado
  const { user } = useAuth();
  // Estado para controlar se está no modo de edição
  const [isEditing, setIsEditing] = useState(false);
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: user.name || '', // Nome completo
    email: user.email || '', // Email (não editável)
    phone: user.phone || '', // Telefone
    crp: user.crp || '', // Número do CRP
    specialty: user.specialty || '', // Especialidade
    bio: user.bio || '', // Biografia/sobre mim
    address: user.address || '', // Endereço do consultório
    experience: user.experience || '' // Tempo de experiência
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
      crp: user.crp || '',
      specialty: user.specialty || '',
      bio: user.bio || '',
      address: user.address || '',
      experience: user.experience || ''
    });
    setIsEditing(false); // Sai do modo de edição
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
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <h2 className="text-xl font-bold text-dark mb-1">{formData.name}</h2>
            <p className="text-gray-600 mb-2">Psicólogo(a)</p>
            <p className="text-sm text-gray-500">CRP: {formData.crp || 'Não informado'}</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">CRP</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.crp}
                    onChange={(e) => setFormData({...formData, crp: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span>{formData.crp || 'Não informado'}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Informações Profissionais</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Terapia Cognitivo-Comportamental"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span>{formData.specialty || 'Não informado'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experiência</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 5 anos"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <span>{formData.experience || 'Não informado'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sobre Mim</label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-24"
                    placeholder="Conte um pouco sobre sua abordagem terapêutica..."
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded-lg min-h-24">
                    <span>{formData.bio || 'Não informado'}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço do Consultório</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Endereço completo"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{formData.address || 'Não informado'}</span>
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