import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, Users, Calendar, BarChart3, Activity, Target, Award } from 'lucide-react';
import { handleExportPDF } from '../components/handleExportPDF.jsx';
import { Button } from '../components/Button';

export const Relatorios = () => {
  const reportRef = useRef(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [patientFilter, setPatientFilter] = useState('todos');
  const [periodFilter, setPeriodFilter] = useState('12');

  useEffect(() => {
    const loadReportsData = async () => {
      try {
        const data = await mockApi.getReportsData(user.id);
        setOriginalData(data);
        setReportsData(data);
      } catch (error) {
        console.error('Erro ao carregar dados dos relatórios:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReportsData();
  }, [user.id]);

  const applyFilters = () => {
    if (!originalData) return;

    let filteredData = { ...originalData };

    // Filtro de período
    const monthsToShow = parseInt(periodFilter);
    filteredData.frequencyData = originalData.frequencyData.slice(-monthsToShow);

    // Recalcular estatísticas baseado no período
    const totalSessionsInPeriod = filteredData.frequencyData.reduce((sum, month) => sum + month.sessions, 0);
    
    // Filtro de pacientes
    let patientMultiplier = 1;
    if (patientFilter === 'ativos') {
      patientMultiplier = 0.8; // 80% dos pacientes são ativos
    } else if (patientFilter === 'novos') {
      patientMultiplier = 0.3; // 30% são novos pacientes
    }

    filteredData.stats = {
      ...originalData.stats,
      activePatients: Math.round(originalData.stats.activePatients * patientMultiplier),
      totalSessions: totalSessionsInPeriod || originalData.stats.totalSessions,
      attendanceRate: patientFilter === 'novos' ? 
        Math.max(65, originalData.stats.attendanceRate - 10) : 
        originalData.stats.attendanceRate
    };

    setReportsData(filteredData);
  };

  useEffect(() => {
    applyFilters();
  }, [patientFilter, periodFilter, originalData]);

  if (loading) return <LoadingSpinner size="lg" />;
  if (!reportsData) return <div>Erro ao carregar dados</div>;

  const { stats, frequencyData, statusData, riskAlerts, patientsData } = reportsData;
  const hasNoData = stats.activePatients === 0 && stats.totalSessions === 0;

  return (
    <div className="min-h-screen">
      {/* Elementos decorativos de fundo */}
      <div className="bg-decoration bg-decoration-1"></div>
      <div className="bg-decoration bg-decoration-2"></div>
      <div className="bg-decoration bg-decoration-3"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark font-primary">Relatórios & Analytics</h1>
                <p className="text-medium mt-1 font-body">Insights sobre sua prática profissional</p>
              </div>
            </div>
            <Button
              onClick={() => handleExportPDF(reportRef.current)}
              className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium font-secondary"
            >
              <BarChart3 className="w-4 h-4" />
              Exportar PDF
            </Button>
          </div>
          
          {/* Filtros e Período */}
          <div className="glassmorphism p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-dark font-secondary">Período de Análise</h3>
                <p className="text-sm text-medium mt-1 font-body">
                  {patientFilter === 'todos' ? 'Todos os pacientes' : 
                   patientFilter === 'ativos' ? 'Apenas pacientes ativos' : 'Apenas novos pacientes'} • 
                  Últimos {periodFilter} meses - Dados atualizados em tempo real
                </p>
              </div>
              <div className="flex items-center gap-4">
                <select 
                  value={patientFilter}
                  onChange={(e) => setPatientFilter(e.target.value)}
                  className="input-field px-3 py-2 rounded-lg text-sm text-dark focus:ring-light"
                >
                  <option value="todos">Todos os pacientes</option>
                  <option value="ativos">Pacientes ativos</option>
                  <option value="novos">Novos pacientes</option>
                </select>
                <select 
                  value={periodFilter}
                  onChange={(e) => setPeriodFilter(e.target.value)}
                  className="input-field px-3 py-2 rounded-lg text-sm text-dark focus:ring-light"
                >
                  <option value="12">Últimos 12 meses</option>
                  <option value="6">Últimos 6 meses</option>
                  <option value="3">Últimos 3 meses</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div ref={reportRef}>
          {hasNoData ? (
            <div className="glassmorphism p-12 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2 font-primary">Dados insuficientes</h3>
              <p className="text-medium max-w-md mx-auto mb-6 font-body">
                Os relatórios aparecerão aqui conforme você realizar atendimentos e acumular dados.
              </p>
              <div className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium font-secondary">
                <Activity className="w-4 h-4" />
                Comece aceitando solicitações
              </div>
            </div>
          ) : (
            <>
              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="glassmorphism p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-light rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-dark mb-1">{stats.activePatients}</div>
                  <div className="text-sm font-medium text-medium font-secondary">Pacientes Ativos</div>
                  <div className="text-xs text-green-600 mt-2 font-body">+12% vs mês anterior</div>
                </div>

                <div className="glassmorphism p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-dark mb-1">{stats.totalSessions}</div>
                  <div className="text-sm font-medium text-medium font-secondary">Total de Sessões</div>
                  <div className="text-xs text-blue-600 mt-2 font-body">+8% vs mês anterior</div>
                </div>

                <div className="glassmorphism p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-dark mb-1">{stats.attendanceRate}%</div>
                  <div className="text-sm font-medium text-medium font-secondary">Taxa de Conclusão</div>
                  <div className="text-xs text-green-600 mt-2 font-body">Excelente desempenho</div>
                </div>

                <div className="glassmorphism p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-dark mb-1">{stats.riskAlerts}</div>
                  <div className="text-sm font-medium text-medium font-secondary">Alertas de Risco</div>
                  <div className="text-xs text-gray-600 mt-2 font-body">{stats.riskAlerts === 0 ? 'Nenhum alerta ativo' : 'Requer atenção'}</div>
                </div>
              </div>

              {/* Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="glassmorphism p-6">
                  <h3 className="text-lg font-semibold text-dark mb-4 font-secondary">Desempenho Mensal</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-medium font-body">Sessões realizadas</span>
                      <span className="text-dark font-semibold">{stats.totalSessions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-medium font-body">Média por paciente</span>
                      <span className="text-dark font-semibold">{stats.activePatients > 0 ? Math.round(stats.totalSessions / stats.activePatients) : 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-medium font-body">Taxa de conclusão</span>
                      <span className="text-green-600 font-semibold">{stats.attendanceRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="glassmorphism p-6">
                  <h3 className="text-lg font-semibold text-dark mb-4 font-secondary">Frequência de Sessões</h3>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={frequencyData.slice(-6)}>
                        <Bar dataKey="sessions" fill="#2493BF" />
                        <Tooltip />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glassmorphism p-6">
                  <h3 className="text-lg font-semibold text-dark mb-4 font-secondary">Status das Sessões</h3>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          outerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Alertas de Risco */}
              {riskAlerts.length > 0 && (
                <div className="glassmorphism p-6 mb-12">
                  <h3 className="text-lg font-semibold text-dark mb-4 font-secondary flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Alertas de Risco
                  </h3>
                  <div className="space-y-3">
                    {riskAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-dark">{alert.patient}</p>
                          <p className="text-sm text-gray-600">{alert.reason}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.risk === 'Alto' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {alert.risk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};