import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Users, Mail, Phone, Calendar, Activity, CheckCircle } from 'lucide-react';
 
export const Pacientes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const loadPatients = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getPatients(user.id);
      console.log('Pacientes carregados:', data); // Debug
      setPatients(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    loadPatients();
  }, [user.id]);
 
  // Recarrega quando a página fica visível
  useEffect(() => {
    const handleFocus = () => loadPatients();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);
 
  if (loading) return <LoadingSpinner size="lg" />;
 
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-light" />
        <h1 className="text-3xl font-bold text-white">Meus Pacientes</h1>
      </div>
 
      <div className="grid gap-6">
        {patients.length === 0 ? (
          <Card className="text-center py-12">
            <Users className="w-16 h-16 text-dark/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark mb-2">Nenhum paciente encontrado</h3>
            <p className="text-dark/70">Seus pacientes aparecerão aqui conforme os agendamentos.</p>
          </Card>
        ) : (
          patients.map(patient => (
            <Card
              key={patient.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/pacientes/${patient.id}`)}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-light to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dark">{patient.name}</h3>
                    <p className="text-sm text-dark/60">Paciente #{patient.id}</p>
                  </div>
                </div>
 
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-dark/60" />
                    <div>
                      <p className="text-sm text-dark/60">Idade</p>
                      <p className="font-medium text-dark">{patient.age} anos</p>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-dark/60" />
                    <div>
                      <p className="text-sm text-dark/60">Data de Nascimento</p>
                      <p className="font-medium text-dark">{new Date(patient.birthDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-dark/60" />
                    <div>
                      <p className="text-sm text-dark/60">Telefone</p>
                      <a href={`tel:${patient.phone}`} className="font-medium text-dark hover:text-light transition-colors">
                        {patient.phone}
                      </a>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-dark/60" />
                    <div>
                      <p className="text-sm text-dark/60">Total de Sessões</p>
                      <p className="font-medium text-dark">{patient.totalSessions}</p>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-dark/60" />
                    <div>
                      <p className="text-sm text-dark/60">Status do Tratamento</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'Ativo' || patient.status === 'Em tratamento'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-dark/60" />
                    <div>
                      <p className="text-sm text-dark/60">Email</p>
                      <a href={`mailto:${patient.email}`} className="font-medium text-dark hover:text-light transition-colors">
                        {patient.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
 
 
    </div>
  );
};
 