import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import { AvailabilityPicker } from '../components/AvailabilityPicker';

export const Agendamento = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  const [psychologists, setPsychologists] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [requestData, setRequestData] = useState({
    description: '',
    urgency: 'media'
  });
  
  const [availableDays] = useState([
    'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'
  ]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    loadPsychologists();
  }, []);

  const loadPsychologists = async () => {
    try {
      const data = await mockApi.getPsychologists();
      setPsychologists(data);
    } catch {
      toast.error('Erro ao carregar psicólogos');
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPsychologist || !requestData.description) {
      toast.error('Selecione um psicólogo e descreva sua necessidade');
      return;
    }

    setSubmitting(true);
    
    try {
      await mockApi.createRequest({
        patientName: user.name,
        patientEmail: user.email,
        patientPhone: user.phone || '(11) 99999-9999',
        preferredPsychologist: parseInt(selectedPsychologist),
        description: requestData.description,
        urgency: requestData.urgency
      });
      
      toast.success('Solicitação enviada! O psicólogo avaliará e entrará em contato se aceitar você como paciente.');
      navigate('/dashboard');
      
    } catch {
      toast.error('Erro ao enviar solicitação');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Elementos decorativos de fundo */}
      <div className="bg-decoration bg-decoration-1"></div>
      <div className="bg-decoration bg-decoration-2"></div>
      <div className="bg-decoration bg-decoration-3"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-dark font-primary">Solicitar Atendimento Psicológico</h1>
              <p className="text-medium mt-1 font-body">Conecte-se com um profissional especializado</p>
            </div>
          </div>
          
          {/* Informações do Processo */}
          <div className="glassmorphism p-6">
            <h3 className="text-lg font-semibold text-dark mb-3 font-secondary">Como funciona o processo</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-light text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <p className="font-medium text-dark font-secondary">Envie sua solicitação</p>
                  <p className="text-medium font-body">Descreva sua necessidade e escolha um psicólogo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-light text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <p className="font-medium text-dark font-secondary">Análise profissional</p>
                  <p className="text-medium font-body">O psicólogo avaliará sua solicitação</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-light text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <p className="font-medium text-dark font-secondary">Início do atendimento</p>
                  <p className="text-medium font-body">Agendamento da primeira consulta</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário Principal */}
        <div className="glassmorphism">
          <form onSubmit={handleRequestSubmit} className="p-8 space-y-8">
            {/* Seleção de Psicólogo */}
            <div>
              <label className="block text-sm font-medium text-dark mb-3 font-secondary">
                Psicólogo Especialista *
              </label>
              <select
                value={selectedPsychologist}
                onChange={(e) => setSelectedPsychologist(e.target.value)}
                className="input-field w-full px-4 py-3 rounded-lg focus:ring-light text-dark"
                required
              >
                <option value="">Selecione um profissional</option>
                {psychologists.map(psych => (
                  <option key={psych.id} value={psych.id}>
                    {psych.name} - {psych.specialty}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-medium font-body">
                Escolha o profissional que melhor atende à sua necessidade
              </p>
            </div>

            {/* Descrição da Necessidade */}
            <div>
              <label className="block text-sm font-medium text-dark mb-3 font-secondary">
                Descrição da Necessidade *
              </label>
              <textarea
                value={requestData.description}
                onChange={(e) => setRequestData({...requestData, description: e.target.value})}
                className="input-field w-full px-4 py-3 rounded-lg focus:ring-light resize-none text-dark"
                rows={6}
                placeholder="Descreva brevemente sua situação atual, objetivos para o tratamento e preferências de horário. Essas informações ajudarão o profissional a entender melhor sua necessidade."
                required
              />
              <div className="mt-2 flex items-center gap-2 text-sm text-medium font-body">
                <div className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span>Informações protegidas por sigilo profissional</span>
              </div>
            </div>

            {/* Nível de Prioridade */}
            <div>
              <label className="block text-sm font-medium text-dark mb-3 font-secondary">
                Nível de Prioridade
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'baixa', label: 'Baixa', desc: 'Posso aguardar algumas semanas', color: 'green' },
                  { value: 'media', label: 'Média', desc: 'Gostaria de iniciar em breve', color: 'yellow' },
                  { value: 'alta', label: 'Alta', desc: 'Preciso de atendimento urgente', color: 'red' }
                ].map(option => (
                  <div
                    key={option.value}
                    onClick={() => setRequestData({...requestData, urgency: option.value})}
                    className={`glassmorphism-light p-4 cursor-pointer transition-all border-2 ${
                      requestData.urgency === option.value
                        ? `border-${option.color}-500`
                        : 'border-transparent hover:border-white/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                        option.color === 'green' ? 'bg-green-500' :
                        option.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div className="font-medium text-dark font-secondary">{option.label}</div>
                      <div className="text-sm text-medium mt-1 font-body">{option.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <AvailabilityPicker
                availableDays={availableDays}
                selectedSlots={selectedSlots}
                onChange={setSelectedSlots}
              />          
            </div>

            {/* Resumo da Solicitação */}
            {selectedPsychologist && (
              <div className="glassmorphism-light p-6">
                <h3 className="text-lg font-semibold text-dark mb-4 font-secondary">Resumo da Solicitação</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-medium font-secondary">Profissional Selecionado</p>
                        <p className="text-dark font-semibold">
                          {psychologists.find(p => p.id === parseInt(selectedPsychologist))?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-medium font-secondary">Especialidade</p>
                        <p className="text-dark font-body">
                          {psychologists.find(p => p.id === parseInt(selectedPsychologist))?.specialty}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-light/20 rounded-lg p-4">
                    <h4 className="font-semibold text-dark mb-2 font-secondary">Próximos Passos</h4>
                    <p className="text-sm text-medium leading-relaxed font-body">
                      Após o envio, o profissional analisará sua solicitação e, se aprovada, 
                      entrará em contato para agendar a primeira consulta.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/20">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                className="btn-ghost flex-1 py-3 text-sm font-medium rounded-lg font-secondary"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={submitting}
                className="btn-primary flex-1 py-3 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-secondary"
                disabled={!selectedPsychologist || !requestData.description}
              >
                {submitting ? 'Enviando Solicitação...' : 'Enviar Solicitação'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};