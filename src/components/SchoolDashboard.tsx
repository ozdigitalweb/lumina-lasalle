import React, { useState } from 'react';
import { 
  Users, 
  Home, 
  TrendingUp, 
  Calendar, 
  FileText, 
  UserCheck, 
  GraduationCap, 
  Activity, 
  Sliders, 
  Plus, 
  BellRing, 
  X, 
  Settings, 
  ArrowRight, 
  Search,
  BookOpen,
  Laptop,
  CheckCircle,
  FolderOpen
} from 'lucide-react';
import { motion } from 'motion/react';

export default function SchoolDashboard() {
  const [timeframe, setTimeframe] = useState<'trimestre' | 'semestre' | 'ano'>('trimestre');
  const [activeQuickAlerts, setActiveQuickAlerts] = useState({
    pdi: true,
    revisao: true,
    reuniao: true
  });

  const [activeChartHover, setActiveChartHover] = useState<number | null>(null);

  // Stats dynamically change with timeframe selection (providing stunning responsive UI!)
  const statsByTimeframe = {
    trimestre: {
      matriculas: '1.240',
      matriculasDiff: '+5%',
      vagas: '45',
      vagasPercent: '96%',
      frequencia: '94.2%',
      frequenciaStatus: 'Em tempo real',
      inclusao: '88',
      inclusaoPDI: '92%'
    },
    semestre: {
      matriculas: '1.218',
      matriculasDiff: '+8.3%',
      vagas: '67',
      vagasPercent: '94%',
      frequencia: '93.8%',
      frequenciaStatus: 'Acumulado Semestre',
      inclusao: '84',
      inclusaoPDI: '95%'
    },
    ano: {
      matriculas: '1.140',
      matriculasDiff: '+12.4%',
      vagas: '145',
      vagasPercent: '88%',
      frequencia: '94.7%',
      frequenciaStatus: 'Anual Geral',
      inclusao: '76',
      inclusaoPDI: '89%'
    }
  };

  const currentStats = statsByTimeframe[timeframe];

  // SVG Chart Bars definition corresponding to "Visão Geral de Matrículas"
  const chartData = [
    { label: 'Jan', value: 920, height: '45%' },
    { label: 'Fev', value: 1040, height: '55%' },
    { label: 'Mar', value: 1100, height: '62%' },
    { label: 'Abr', value: 1180, height: '70%' },
    { label: 'Mai', value: 1220, height: '78%' },
    { label: 'Jun', value: 1240, height: '84%' }
  ];

  const handleDismissAlert = (key: 'pdi' | 'revisao' | 'reuniao') => {
    setActiveQuickAlerts(prev => ({ ...prev, [key]: false }));
  };

  const alertCount = Object.values(activeQuickAlerts).filter(Boolean).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="lumi-academy-admin-portal">
      
      {/* Top Workspace controls and Active Timeframe tabs (Matches Image 4 header) */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Dashboard de Gestão Escolar
          </h1>
          <p className="text-xs text-slate-450 font-bold uppercase tracking-wider">
            Lumi Academy • Bem-vindo(a) de volta, acompanhe o crescimento
          </p>
        </div>

        {/* Timeframe switchers (Matches Image 4 exactly with gold/yellow selected tab) */}
        <div className="bg-slate-150 p-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-bold self-stretch md:self-auto justify-center">
          {[
            { id: 'trimestre', label: 'Trimestre' },
            { id: 'semestre', label: 'Semestre' },
            { id: 'ano', label: 'Ano 2024' }
          ].map((item) => {
            const active = timeframe === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTimeframe(item.id as any)}
                className={`px-4 py-2 rounded-xl uppercase tracking-wider text-[10px] font-extrabold transition-all duration-150 shrink-0 cursor-pointer ${
                  active 
                    ? 'bg-amber-400 text-slate-950 shadow-sm border border-amber-500/20' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Primary KPI Metrics Grid Row (Matches Image 4 Scorecards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 - Matrículas Ativas */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Matrículas Ativas</span>
            <Users className="text-slate-300 w-5 h-5" />
          </div>
          
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-[#0a2540] tracking-tight">{currentStats.matriculas}</h2>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
              <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded-md border border-emerald-100 font-extrabold">
                {currentStats.matriculasDiff}
              </span>
              <span>vs. ano anterior</span>
            </div>
          </div>
        </div>

        {/* Metric 2 - Vagas Disponíveis with micro progress bar */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#fff9e6] bg-amber-50/5 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Vagas Disponíveis</span>
            <Home className="text-amber-500/40 w-5 h-5" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{currentStats.vagas}</h2>
            
            {/* Custom mini progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span>Capacidade: {currentStats.vagasPercent}</span>
                <span>Preenchido</span>
              </div>
              <div className="w-full h-1.5 bg-slate-150 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: currentStats.vagasPercent }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Metric 3 - Frequência Média with animated signal point */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Frequência Média</span>
            <Activity className="text-slate-350 w-5 h-5" />
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black text-emerald-700 tracking-tight">{currentStats.frequencia}</h2>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{currentStats.frequenciaStatus}</span>
            </div>
          </div>
        </div>

        {/* Metric 4 - Alunos Inclusão */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Alunos Inclusão</span>
            <GraduationCap className="text-slate-300 w-5 h-5" />
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{currentStats.inclusao}</h2>
            <p className="text-[10px] font-bold text-slate-450 tracking-wide uppercase">PDIs em dia: {currentStats.inclusaoPDI}</p>
          </div>
        </div>

      </div>

      {/* Main Row splits (Left primary charts, Right events alerts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Layout for Enrollment trends and cycle attendance comparison */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card: Visão Geral de Matrículas (Matches Image 4) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Visão Geral de Matrículas</h3>
                <p className="text-[10px] text-slate-400 font-bold">Acompanhamento consolidado do semestre corrente</p>
              </div>
              <TrendingUp className="text-slate-400 w-5 h-5" />
            </div>

            {/* Custom Interactive SVG bars chart (Fits requirements perfectly with pristine look!) */}
            <div className="relative pt-6 h-60">
              {activeChartHover !== null && (
                <div 
                  className="absolute top-0 transform -translate-x-1/2 bg-[#0a2540] text-amber-300 text-[10px] font-black py-1.5 px-3 rounded-xl shadow-lg border border-amber-400/20 pointer-events-none z-10 transition-all duration-150"
                  style={{ left: `${(activeChartHover * 16) + 10}%` }}
                >
                  {chartData[activeChartHover].label}: {chartData[activeChartHover].value} alunos
                </div>
              )}

              {/* Grid backgrounds */}
              <div className="absolute inset-x-0 bottom-8 h-40 border-b border-dashed border-slate-100 flex flex-col justify-between text-[9px] text-slate-400 font-bold">
                <div className="w-full border-t border-dashed border-slate-100/70 pt-1">1.250</div>
                <div className="w-full border-t border-dashed border-slate-100/70 pt-1">1.000</div>
                <div className="w-full border-t border-dashed border-slate-100/70 pt-1">750</div>
              </div>

              {/* Columns rendering with interactive mouse overs */}
              <div className="absolute inset-x-0 bottom-8 h-40 flex justify-around items-end px-4">
                {chartData.map((data, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center group cursor-pointer w-12"
                    onMouseEnter={() => setActiveChartHover(index)}
                    onMouseLeave={() => setActiveChartHover(null)}
                  >
                    {/* Glowing pill bar */}
                    <div 
                      className={`w-8 rounded-t-xl transition-all duration-300 relative ${
                        activeChartHover === index 
                          ? 'bg-amber-400 shadow-md shadow-amber-400/20 scale-x-105' 
                          : 'bg-indigo-950/90 hover:bg-[#0a2540]'
                      }`}
                      style={{ height: data.height }}
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-white/20 rounded-t-xl"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Footer labels */}
              <div className="absolute inset-x-0 bottom-1 flex justify-around text-[10px] font-bold text-slate-450 px-4">
                {chartData.map((d, i) => (
                  <span key={i} className="w-12 text-center">{d.label}</span>
                ))}
              </div>

            </div>
          </div>

          {/* Card: Frequência por Ciclo Progress Rows */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Frequência por Ciclo</h3>
              <p className="text-[10px] text-slate-400 font-semibold">Desempenho de comparecimento agrupado por série escolar</p>
            </div>

            <div className="space-y-4">
              {/* Infantil Progress bar element (La Salle gold styling matching image 4!) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Infantil (Pré ao Jardim II)</span>
                  <span className="text-[#986e10] font-black">96.8%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-150">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '96.8%' }}></div>
                </div>
              </div>

              {/* Fundamental Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Fundamental (1º ao 9º Ano)</span>
                  <span className="text-[#986e10] font-black">91.5%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-150">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '91.5%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Sidebar split for Inclusion Progress & Critical warnings list */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Inclusion Progress Subcard */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
            <div>
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Inclusão & Desenvolvimento</h3>
              <p className="text-[10px] text-slate-405 font-bold">Metas do plano de atendimento individual (PEI)</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-700">
                  <span>Avaliações Neuropsicológicas</span>
                  <span>75%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-950 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-700">
                  <span>Relatórios Pedagógicos</span>
                  <span>50%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-950 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Alertas e Ocorrências list panel (Triangular alert icon, matches Image 4) */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Alertas e Ocorrências</span>
              </div>
              {alertCount > 0 && (
                <span className="bg-rose-50 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded border border-rose-100">
                  {alertCount} novo{alertCount > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="space-y-2.5">
              
              {/* Alert 1 - Critical Red banner */}
              {activeQuickAlerts.pdi && (
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-rose-900 leading-none">PDI Pendente</p>
                    <p className="text-[10px] text-rose-800 font-semibold">3 pendências de PDI crítica no fundamental</p>
                  </div>
                  <button 
                    onClick={() => handleDismissAlert('pdi')}
                    className="p-1 hover:bg-rose-200 text-rose-400 hover:text-rose-900 rounded transition cursor-pointer"
                  >
                    <X size={12} className="stroke-[3px]" />
                  </button>
                </div>
              )}

              {/* Alert 2 - Warning Yellow state */}
              {activeQuickAlerts.revisao && (
                <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-amber-900 leading-none">Relatórios</p>
                    <p className="text-[10px] text-amber-800 font-semibold">2 solicitações de revisão de relatório de inclusão</p>
                  </div>
                  <button 
                    onClick={() => handleDismissAlert('revisao')}
                    className="p-1 hover:bg-amber-200 text-amber-400 hover:text-amber-950 rounded transition cursor-pointer"
                  >
                    <X size={12} className="stroke-[3px]" />
                  </button>
                </div>
              )}

              {/* Alert 3 - Info Grey panel */}
              {activeQuickAlerts.reuniao && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-800 leading-none">Reuniao Agendada</p>
                    <p className="text-[10px] text-slate-600 font-semibold">1 Reunião de pais agendada para hoje (14:00)</p>
                  </div>
                  <button 
                    onClick={() => handleDismissAlert('reuniao')}
                    className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-800 rounded transition cursor-pointer"
                  >
                    <X size={12} className="stroke-[3px]" />
                  </button>
                </div>
              )}

              {alertCount === 0 && (
                <div className="text-center py-6 text-xs text-slate-400 font-semibold">
                  <span>🎉 Sem ocorrências pendentes de atenção.</span>
                </div>
              )}

            </div>

            <button 
              onClick={() => alert('Abrindo painel geral de comunicações de ocorrências...')}
              className="w-full text-center py-2 text-xs font-bold text-slate-450 hover:text-slate-700 transition"
            >
              Ver todas as notificações
            </button>

          </div>

        </div>

      </div>

      {/* Acesso Rápido Grid Buttons Row (Matches Image 4 precisely) */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Acesso Rápido</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: 'Relatórios Pedagógicos', sub: 'BNCC Plano', logo: '📄' },
            { label: 'Desempenho de Turmas', sub: 'Quadro Notas', logo: '📊' },
            { label: 'Gestão de Professores', sub: 'Matérias Grade', logo: '🧑‍🏫' },
            { label: 'Conecta Eventos', sub: 'Calendários', logo: '📅' },
            { label: 'Configurações', sub: 'Portal Admin', logo: '⚙️' }
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => alert(`Acessando módulo integrado: ${btn.label}`)}
              className="bg-white rounded-3xl p-5 shadow-sm border border-slate-150 text-center hover:bg-indigo-50/10 transition-all duration-150 transform hover:scale-102 flex flex-col items-center justify-center gap-2.5 cursor-pointer"
            >
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-lg shadow-sm">
                {btn.logo}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 leading-tight">{btn.label}</h4>
                <p className="text-[9px] text-slate-450 uppercase font-bold tracking-wider">{btn.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Institutional Newsletter Strip footer (Matches Image 4 perfectly with dark ocean theme) */}
      <div className="bg-[#0a2540] text-white rounded-3xl p-6 shadow-md border border-white/5 flex flex-col lg:flex-row justify-between gap-6">
        
        {/* Call to action section */}
        <div className="space-y-4 lg:w-1/3 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-black tracking-tight text-white leading-tight">
              Comunicados Institucionais
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              Fique por dentro das últimas atualizações e notícias internas compartilhadas de forma consolidada da nossa rede escolar.
            </p>
          </div>

          <button 
            onClick={() => alert('Redirecionando ao Mural de Eventos Geral...')}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider py-2.5 px-5 rounded-2xl transition w-max border border-amber-500 cursor-pointer"
          >
            Ver Mural Completo
          </button>
        </div>

        {/* Small card modules list block (Matches Image 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-2/3">
          
          {/* Card 1 - RH Training */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5 space-y-3 hover:bg-white/15 transition-all">
            <div className="flex justify-between items-center">
              <span className="bg-amber-400 text-slate-950 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">RH</span>
              <span className="text-[9px] text-slate-400 font-bold">há 2 horas</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-100 hover:text-amber-300 transition duration-150">Treinamento de Professores: Inclusão 360º</h4>
              <p className="text-[10px] text-slate-350 leading-relaxed font-semibold">
                A nova jornada de formação continuada focada em acolhimento começa em 15 de maio no campus central.
              </p>
            </div>
          </div>

          {/* Card 2 - Logistics tablets upgrade */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5 space-y-3 hover:bg-white/15 transition-all">
            <div className="flex justify-between items-center">
              <span className="bg-[#4a8df8] text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">Logística</span>
              <span className="text-[9px] text-slate-400 font-bold">há 5 horas</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-100 hover:text-amber-300 transition duration-150">Renovação de Equipamentos TI</h4>
              <p className="text-[10px] text-slate-350 leading-relaxed font-semibold">
                A partir da próxima semana, novos tablets com licenças pedagógicas chegarão para apoiar os ateliês de tecnologia.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
