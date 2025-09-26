import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRequest } from '../components/ToastContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Calendar, Clock, ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NovaConsulta = () => {
  const { user } = useAuth();
  const { requestAppointment } = useRequest();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
    type: 'consulta'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.reason) return;

    requestAppointment(
      user.name,
      formData.date,
      formData.time,
      formData.reason
    );

    setFormData({ date: '', time: '', reason: '', type: 'consulta' });
  };

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-dark">Solicitar Nova Consulta</h1>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Plus className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Agendar Sessão</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Data Preferida
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                min={minDate}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Horário Preferido
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione um horário</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Consulta
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="consulta">Consulta Regular</option>
              <option value="acompanhamento">Acompanhamento</option>
              <option value="avaliacao">Avaliação</option>
              <option value="retorno">Retorno</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo da Consulta
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Descreva brevemente o motivo da consulta..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-24"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Solicitar Consulta
          </Button>
        </form>
      </Card>

      <Card className="p-6 bg-green-50">
        <h3 className="font-semibold text-green-800 mb-2">Informações Importantes</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Sua solicitação será analisada pelo psicólogo</li>
          <li>• Você receberá uma resposta em até 24 horas</li>
          <li>• Horários sujeitos à disponibilidade</li>
          <li>• Consultas podem ser reagendadas se necessário</li>
        </ul>
      </Card>
    </div>
  );
};