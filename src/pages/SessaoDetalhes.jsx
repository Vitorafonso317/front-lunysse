import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft, Edit3, Save, X, User, Calendar, Clock, FileText } from 'lucide-react';

export const SessaoDetalhes = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [session, setSession] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editReport, setEditReport] = useState('');
  const [editStatus, setEditStatus] = useState('');
 
  useEffect(() => {
    const loadSessionData = async () => {
      try {
        const sessionData = await mockApi.getSessionDetails(parseInt(sessionId));
        setSession(sessionData);
        setEditNotes(sessionData.notes || '');
        setEditReport(sessionData.fullReport || '');
        setEditStatus(sessionData.status);
 
        const patients = await mockApi.getPatients(user.id);
        const patientData = patients.find(p => p.id === sessionData.patientId);
        setPatient(patientData);
      } catch (error) {
        console.error('Erro ao carregar dados da sessão:', error);
        navigate('/pacientes');
      } finally {
        setLoading(false);
      }
    };
 
    loadSessionData();
  }, [sessionId, user.id, navigate]);
 
  const handleSave = async () => {
    try {
      await mockApi.updateSessionStatus(session.id, editStatus);
      await mockApi.updateSessionNotes(session.id, editNotes, editReport);
     
      setSession({
        ...session,
        status: editStatus,
        notes: editNotes,
        fullReport: editReport
      });
     
      setEditing(false);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };
 
  const handleCancel = () => {
    setEditNotes(session.notes || '');
    setEditReport(session.fullReport || '');
    setEditStatus(session.status);
    setEditing(false);
  };
 
  if (loading) return <LoadingSpinner size="lg" />;
  if (!session || !patient) return null;
 
  const statusOptions = [
    { value: 'agendado', label: 'Agendado', color: 'bg-blue-100 text-blue-800' },
    { value: 'iniciado', label: 'Iniciado', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'concluido', label: 'Concluído', color: 'bg-green-100 text-green-800' },
    { value: 'cancelado', label: 'Cancelado', color: 'bg-red-100 text-red-800' }
  ];
 
  const currentStatus = statusOptions.find(s => s.value === session.status);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate(`/pacientes/${patient.id}`)}
            className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 active:scale-95 border border-gray-200 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Detalhes da Sessão</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {!editing ? (
            <Button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <Edit3 size={16} />
              <span className="hidden sm:inline">Editar</span>
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="flex items-center gap-2 text-sm sm:text-base"
              >
                <Save size={16} />
                <span className="hidden sm:inline">Salvar</span>
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="flex items-center gap-2 text-sm sm:text-base"
              >
                <X size={16} />
                <span className="hidden sm:inline">Cancelar</span>
              </Button>
            </div>
          )}
        </div>
      </div>
 
      {/* Informações da Sessão */}
      <Card>
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-dark">Sessão #{session.id}</h2>
              <p className="text-dark/60 mt-1">{session.description}</p>
            </div>
           
            <div className="flex-shrink-0">
              {editing ? (
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light focus:border-transparent text-sm"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${currentStatus?.color}`}>
                  {currentStatus?.label}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">Paciente</p>
                <p className="font-semibold text-dark truncate">{patient.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">Data e Hora</p>
                <p className="font-semibold text-dark text-sm sm:text-base">
                  {new Date(session.date).toLocaleDateString('pt-BR')} às {session.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">Duração</p>
                <p className="font-semibold text-dark">{session.duration} minutos</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
 
      {/* Anotações Rápidas */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-dark">Anotações Rápidas</h3>
          </div>

          {editing ? (
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Adicione anotações rápidas sobre a sessão..."
              className="w-full h-24 sm:h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light focus:border-transparent resize-none text-sm sm:text-base"
            />
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg min-h-[100px]">
              {session.notes ? (
                <p className="text-dark leading-relaxed text-sm sm:text-base">{session.notes}</p>
              ) : (
                <p className="text-gray-500 italic text-sm sm:text-base">Nenhuma anotação adicionada</p>
              )}
            </div>
          )}
        </div>
      </Card>
 
      {/* Relatório Completo */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-dark">Relatório Completo da Sessão</h3>
          </div>

          {editing ? (
            <textarea
              value={editReport}
              onChange={(e) => setEditReport(e.target.value)}
              placeholder="Relatório detalhado da sessão..."
              className="w-full h-48 sm:h-64 lg:h-80 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light focus:border-transparent resize-none text-sm leading-relaxed"
            />
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg min-h-[200px] sm:min-h-[300px]">
              {session.fullReport ? (
                <pre className="text-dark leading-relaxed whitespace-pre-wrap font-sans text-sm sm:text-base overflow-x-auto">
                  {session.fullReport}
                </pre>
              ) : (
                <p className="text-gray-500 italic text-sm sm:text-base">Nenhum relatório adicionado</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};