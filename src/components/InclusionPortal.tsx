import React, { useState } from 'react';
import { 
  Sparkles, 
  Loader2, 
  Save, 
  FileText, 
  Heart, 
  Plus, 
  Clock, 
  User, 
  Calendar, 
  CheckCircle2, 
  Search, 
  Share2, 
  X, 
  Undo2, 
  Redo2, 
  MessageCircle, 
  Eye, 
  Headphones, 
  Info, 
  AlertCircle,
  HelpCircle,
  Maximize2
} from 'lucide-react';
import { Student, InclusionReport } from '../types';

interface InclusionPortalProps {
  students: Student[];
  reports: InclusionReport[];
  onAddReport: (report: InclusionReport) => void;
}

export default function InclusionPortal({ students, reports, onAddReport }: InclusionPortalProps) {
  // Tabs representing target layouts exactly
  const [portalTab, setPortalTab] = useState<'pdi' | 'adaptador' | 'lumiadapt'>('pdi');

  // Common: Selected Student
  const [selectedStudentName, setSelectedStudentName] = useState(students[0]?.name || 'Leo Almeida');

  React.useEffect(() => {
    if (students.length > 0 && !students.some(s => s.name === selectedStudentName)) {
      setSelectedStudentName(students[0].name);
    }
  }, [students, selectedStudentName]);

  // --- STATE FOR TAB 1: GESTÃO DE PDI (IMAGE 3) ---
  const [goals, setGoals] = useState([
    {
      id: 'g-1',
      term: 'Curto Prazo (3 meses)',
      meta: 'Meta: Dez/2023',
      color: 'bg-amber-400 text-[#002D62]',
      borderColor: 'border-amber-200',
      title: 'Comunicação e Socialização',
      desc: 'Identificar e expressar necessidades básicas de forma verbal ou através de suporte visual em 80% das ocasiões.'
    },
    {
      id: 'g-2',
      term: 'Médio Prazo (6 meses)',
      meta: 'Meta: Mar/2024',
      color: 'bg-blue-600 text-white',
      borderColor: 'border-blue-100',
      title: 'Alfabetização e Letramento',
      desc: 'Reconhecer e escrever o próprio nome completo e identificar todas as letras do alfabeto de forma autônoma.'
    },
    {
      id: 'g-3',
      term: 'Longo Prazo (12 meses)',
      meta: 'Meta: Ago/2024',
      color: 'bg-slate-300 text-slate-700',
      borderColor: 'border-slate-200',
      title: 'Independência Acadêmica',
      desc: 'Realizar atividades de interpretação de textos curtos com auxílio mínimo do mediador pedagógico.'
    }
  ]);

  const [pdiStrategies, setPdiStrategies] = useState([
    'Uso de antecipação visual para mudanças de rotina.',
    'Fragmentação de tarefas complexas em etapas menores.',
    'Reforço positivo imediato após conclusão de metas.'
  ]);

  const [pdiResources, setPdiResources] = useState([
    'Abafadores de Ruído',
    'Tablet c/ Software PECS',
    'Brinquedos Sensoriais',
    'Cronômetro Visual'
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { name: 'Dra. Letícia', role: 'Psicóloga', icon: '👩‍⚕️' },
    { name: 'Marcos Silva', role: 'Ed. Especialista', icon: '👨‍🏫' },
    { name: 'Julia Mendes', role: 'Fonoaudióloga', icon: '👩‍⚕️' }
  ]);

  // Interactive addition of PDI Goals
  const handleAddNewGoal = () => {
    const title = prompt('Qual o título do objetivo?');
    if (!title) return;
    const desc = prompt('Descreva detalhadamente o objetivo pedagógico:');
    if (!desc) return;
    
    setGoals([
      ...goals,
      {
        id: `g-${Date.now()}`,
        term: 'Curto Prazo (Adicionado)',
        meta: 'Meta: Personalizada',
        color: 'bg-emerald-500 text-white',
        borderColor: 'border-emerald-200',
        title,
        desc
      }
    ]);
  };

  // --- STATE FOR TAB 2: ADAPTADOR DE ATIVIDADES E RECURSOS (IMAGE 2) ---
  const [selectedRepositoryActivity, setSelectedRepositoryActivity] = useState('Ciclo da Água - Básico');
  const [activeInstructions, setActiveInstructions] = useState(
    'A água sobe (Evaporação). A água forma nuvens (Condensação). A chuva cai (Precipitação).'
  );
  
  // Pictograms in workspace
  const [pictograms, setPictograms] = useState([
    { id: 'chuva', label: 'Chuva', icon: '🌧️', selected: true },
    { id: 'sol', label: 'Sol', icon: '☀️', selected: true },
    { id: 'agua', label: 'Água', icon: '💧', selected: true }
  ]);

  const [tactileChips, setTactileChips] = useState([
    { id: 't-1', label: 'Algodão (Nuvens)' },
    { id: 't-2', label: 'Cola com Glitter Azul (Chuva)' }
  ]);

  // Dynamic input for tactiles
  const handleAddTactile = () => {
    const material = prompt('Qual recurso sensorial / tátil deseja vincular?');
    if (material) {
      setTactileChips([...tactileChips, { id: `t-${Date.now()}`, label: material }]);
    }
  };

  const handleRemoveTactile = (id: string) => {
    setTactileChips(tactileChips.filter(c => c.id !== id));
  };

  // --- STATE FOR TAB 3: ESPAÇO DE ADAPTAÇÃO "LUMIADAPT" (IMAGE 1) ---
  const [isLumiIaActive, setIsLumiIaActive] = useState(true);
  const [adaptedLumiText, setAdaptedLumiText] = useState(
    "A água se move o tempo todo.\nO sol aquece a água do mar.\nA água sobe e vira nuvem.\nDepois a água cai como chuva."
  );

  const [lumiVisualSupports, setLumiVisualSupports] = useState([
    { id: 'v-1', label: 'Sol', icon: '☀️' },
    { id: 'v-2', label: 'Nuvem', icon: '☁️' },
    { id: 'v-3', label: 'Chuva', icon: '🌧️' }
  ]);

  const [lumiSensoryResources, setLumiSensoryResources] = useState([
    { id: 's-1', label: 'Bolas de algodão (para as nuvens)' },
    { id: 's-2', label: 'Papel texturizado azul (para o mar)' }
  ]);

  const [activeSuggestionFilter, setActiveSuggestionFilter] = useState<'Braille' | 'Audio' | 'Visual' | 'Simplificado' | 'Sensorial'>('Visual');

  const handleAddLumiSensory = () => {
    const val = prompt('Indique um recurso tátil para adicionar à lista:');
    if (val) {
      setLumiSensoryResources([...lumiSensoryResources, { id: `s-${Date.now()}`, label: val }]);
    }
  };

  const handleRemoveLumiSensory = (id: string) => {
    setLumiSensoryResources(lumiSensoryResources.filter(r => r.id !== id));
  };


  return (
    <div className="space-y-6 text-slate-800 animate-fade-in">
      
      {/* Mini Title context bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/70 backdrop-blur-md p-5 rounded-[24px] border border-slate-100 shadow-3xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-brand-primary text-white font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">
              IA INCLUSIVA ACTIVADA
            </span>
            <span className="text-xs text-slate-400 font-bold">Lumi Adapt Suite</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight">
            Módulo de Educação Inclusiva e PDI
          </h2>
          <p className="text-slate-500 text-xs font-semibold">
            Clique nas abas abaixo para visualizar com perfeição os designs e fluxos sintonizados.
          </p>
        </div>

        {/* Global Student Selector */}
        <div className="flex items-center gap-2.5 bg-slate-100/80 p-2 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-500 pl-2">Estudante:</span>
          <select
            value={selectedStudentName}
            onChange={(e) => setSelectedStudentName(e.target.value)}
            className="bg-white px-3 py-1.5 rounded-xl text-xs font-black text-brand-primary border border-slate-200 focus:outline-none cursor-pointer"
          >
            {students.length > 0 ? (
              students.map(s => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.hasSpecialNeeds ? (s.specialNeeds || 'Educação Especial') : 'Geral'} • {s.className})
                </option>
              ))
            ) : (
              <>
                <option value="Leo Almeida">Leo Almeida (TEA • 3º Ano)</option>
                <option value="Guto Pinheiro">Guto Pinheiro (TEA • Pré II)</option>
                <option value="Theo Rocha">Theo Rocha (TDAH • Infantil III)</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* THREE LAYOUT TABS SWITCH (Matches screenshot architectures 1, 2 and 3) */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-full">
        <button
          onClick={() => setPortalTab('pdi')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${
            portalTab === 'pdi'
              ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10'
              : 'text-slate-500 hover:text-slate-800 bg-white/50'
          }`}
        >
          <span>📊</span>
          <span>Gestão de PDI (Imagem 3)</span>
        </button>
        <button
          onClick={() => setPortalTab('adaptador')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${
            portalTab === 'adaptador'
              ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10'
              : 'text-slate-500 hover:text-slate-800 bg-white/50'
          }`}
        >
          <span>🛠️</span>
          <span>Adaptador Estratégias (Imagem 2)</span>
        </button>
        <button
          onClick={() => setPortalTab('lumiadapt')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${
            portalTab === 'lumiadapt'
              ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10'
              : 'text-slate-500 hover:text-slate-800 bg-white/50'
          }`}
        >
          <span>✨</span>
          <span>Workspace LumiAdapt (Imagem 1)</span>
        </button>
      </div>

      {/* ----------------------------------------------------
         TAB 1: GESTÃO DE PDI (IMAGE 3) - DESIGNER EXACT COPY
         ---------------------------------------------------- */}
      {portalTab === 'pdi' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-[#FCFCFA] p-4 rounded-2xl border border-slate-200/60 shadow-3xs">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Gestão de PDI (Plano de Desenvolvimento Individualizado)</h3>
              <p className="text-xs text-slate-550 font-semibold mt-0.5">Personalize a jornada de desenvolvimento e acompanhe o progresso do aluno.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="px-4 py-2 bg-slate-150 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-all">
                <Clock size={13} />
                <span>Histórico</span>
              </button>
              <button 
                onClick={() => alert(`Plano PDI de ${selectedStudentName} salvo com sucesso!`)}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-primary/95 text-[#FFC72C] font-black rounded-xl text-xs flex items-center gap-1.5 transition-all"
              >
                <Save size={13} />
                <span>Salvar PDI</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Selector & Details */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Card 1: Selected Student details */}
              <div className="bg-white border border-slate-250 p-6 rounded-[32px] space-y-4 shadow-3xs">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Aluno Selecionado</h4>
                
                <div className="flex items-center gap-4 p-3 bg-slate-50/60 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-brand-primary flex items-center justify-center font-black text-lg shadow-sm overflow-hidden shrink-0">
                    {(() => {
                      const selectedStudentObj = students.find(s => s.name === selectedStudentName);
                      return selectedStudentObj?.photo ? (
                        <img src={selectedStudentObj.photo} alt={selectedStudentName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="text-xl">👦</span>
                      );
                    })()}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-brand-primary leading-tight">{selectedStudentName}</h4>
                    <p className="text-[11px] text-slate-450 font-bold uppercase mt-1">
                      {(() => {
                        const selectedStudentObj = students.find(s => s.name === selectedStudentName);
                        return selectedStudentObj?.className || "3º Ano • Ensino Fundamental";
                      })()}
                    </p>
                    <p className="text-[10px] text-brand-secondary font-black mt-0.5">Profª Ana Carolina Martins</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Diagnóstico e Condição */}
              <div className="bg-white border border-slate-250 p-6 rounded-[32px] space-y-3.5 shadow-3xs">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <span>📝</span>
                  <span>Diagnóstico e Condição</span>
                </h4>
                <p className="text-[10px] font-semibold text-slate-400">Informações clínicas e pedagógicas iniciais.</p>
                
                <textarea
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl p-4 text-xs font-semibold leading-relaxed text-slate-700 h-40 focus:outline-none focus:border-slate-350"
                  defaultValue={`${selectedStudentName} apresenta diagnóstico de Transtorno do Espectro Autista (TEA - Nível 1 de suporte). Demonstra altas habilidades em raciocínio lógico-matemático, porém possui desafios significativos na socialização espontânea e recepção de sons muito elevados.`}
                />
              </div>

            </div>

            {/* Right/Middle Columns: Goals and Schedules */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Card 3: Goals Timeline */}
              <div className="bg-white border border-slate-250 p-6 sm:p-8 rounded-[32px] shadow-3xs space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-slate-150">
                  <h4 className="text-base font-black text-brand-primary tracking-tight">🎯 Plano de Objetivos</h4>
                  <button 
                    onClick={handleAddNewGoal}
                    className="text-xs text-brand-secondary font-black hover:text-brand-primary tracking-wider uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <span>+ Novo Objetivo</span>
                  </button>
                </div>

                {/* Timeline nodes mapping image 3 details */}
                <div className="relative border-l-2 border-dashed border-slate-200 ml-4 pl-6 space-y-6">
                  {goals.map((g, idx) => (
                    <div key={g.id} className="relative group">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-gold border-4 border-white shadow-2xs group-hover:scale-110 transition-all"></span>
                      
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded ${g.color}`}>
                            {g.term}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold ml-auto">{g.meta}</span>
                        </div>
                        
                        <div className="bg-slate-50/60 border border-slate-150 p-4 rounded-2xl">
                          <h5 className="text-xs font-extrabold text-slate-800">{g.title}</h5>
                          <p className="text-xs text-slate-600 font-semibold leading-relaxed mt-1">{g.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side-by-Side: Estratégias Pedagógicas & Recursos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Pedagogical Strategies */}
                <div className="bg-white border border-slate-250 p-6 rounded-[32px] space-y-4 shadow-3xs">
                  <h4 className="text-sm font-black text-brand-primary tracking-tight border-b border-indigo-50 pb-2">💡 Estratégias Pedagógicas</h4>
                  <ul className="space-y-3">
                    {pdiStrategies.map((strat, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-650 font-semibold leading-relaxed">
                        <span className="text-brand-gold font-bold">✔</span>
                        <span>{strat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Necessary resources tags */}
                <div className="bg-white border border-slate-250 p-6 rounded-[32px] space-y-4 shadow-3xs">
                  <h4 className="text-sm font-black text-brand-primary tracking-tight border-b border-indigo-50 pb-2">📦 Recursos Necessários</h4>
                  <div className="flex flex-wrap gap-2">
                    {pdiResources.map((res, idx) => (
                      <span key={idx} className="bg-slate-100 hover:bg-slate-150 border border-slate-150 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 select-none cursor-default transition-colors">
                        {res}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      const additional = prompt('Qual recurso deseja planejar para o PDI?');
                      if (additional) setPdiResources([...pdiResources, additional]);
                    }}
                    className="text-[10px] font-black text-brand-secondary h-8 hover:underline uppercase block text-left"
                  >
                    + Adicionar Recurso
                  </button>
                </div>

              </div>

              {/* Grid: Multidisciplinar Team & Schedule Dates */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Team members */}
                <div className="md:col-span-8 bg-white border border-slate-250 p-6 rounded-[32px] space-y-4 shadow-3xs">
                  <h4 className="text-sm font-black text-brand-primary tracking-tight">👥 Equipe Multidisciplinar</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {teamMembers.map((member, idx) => (
                      <div key={idx} className="bg-slate-50/60 border border-slate-150 p-3.5 rounded-2xl flex flex-col items-center text-center space-y-1">
                        <span className="text-xl">{member.icon}</span>
                        <h5 className="text-xs font-black text-slate-800 leading-tight">{member.name}</h5>
                        <p className="text-[9px] font-bold text-slate-400 capitalize">{member.role}</p>
                        <button 
                          onClick={() => alert(`Enviando mensagem para ${member.name} no Portal Conecta...`)}
                          className="text-[10px] text-brand-secondary font-black flex items-center gap-1 hover:underline pt-1.5"
                        >
                          <MessageCircle size={10} />
                          <span>Mensagem</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar Schedule Timeline card */}
                <div className="md:col-span-4 bg-white border border-slate-250 p-5 rounded-[32px] space-y-3 shadow-3xs">
                  <h4 className="text-sm font-black text-brand-primary tracking-tight">📅 Cronograma</h4>
                  
                  <div className="space-y-2">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center justify-between text-[11px] font-bold text-slate-650">
                      <span>15 SET • Revisão Inicial</span>
                      <span className="text-emerald-600">✔</span>
                    </div>
                    <div className="bg-amber-50/65 border border-amber-200/60 rounded-xl p-2 flex items-center justify-between text-[11px] font-bold text-slate-650">
                      <span>22 NOV • Revisão Trimestral</span>
                      <span>📅</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center justify-between text-[11px] font-bold text-slate-600">
                      <span>10 FEV • Semestral</span>
                      <span className="text-slate-400">Pendente</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom full-width Advice box with dynamic suggetions generator */}
              <div className="bg-[#0D2137] text-white p-6 sm:p-8 rounded-[32px] border border-slate-850 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6 shadow-md shadow-slate-900/10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/15">
                  <Sparkles size={24} className="text-[#FFC72C] animate-pulse" />
                </div>
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <p className="text-[10px] text-[#FFC72C] font-black uppercase tracking-widest">Dica Premium de Lumi IA</p>
                  <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                    "Ao definir os objetivos de curto prazo para o Leo, tente focar em marcos que possam de fato ser compartilhados e comemorados em conjunto com a família no ambiente extraescolar."
                  </p>
                </div>
                <button 
                  onClick={() => {
                    alert('Lumi está examinando o histórico do aluno...');
                    setPdiStrategies([
                      ...pdiStrategies,
                      'Intercalar tarefas silenciosas com sessões terapêuticas com o dinossauro de pelúcia.'
                    ]);
                  }}
                  className="px-5 py-2.5 bg-brand-gold hover:bg-amber-400 text-brand-primary rounded-xl text-xs font-black uppercase tracking-wider shrink-0 shadow-sm transition-all"
                >
                  ✨ Gerar Sugestões
                </button>
              </div>

              {/* Bottom Buttons Row */}
              <div className="flex flex-wrap gap-4 items-center justify-between pt-2">
                <button 
                  onClick={() => {
                    const newStrat = prompt('Adicionar nova diretriz estratégica de PDI:');
                    if (newStrat) setPdiStrategies([...pdiStrategies, newStrat]);
                  }}
                  className="px-5 py-3 border border-slate-200 hover:bg-slate-50 bg-white text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                >
                  + Novo PDI
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => alert('Abrindo compartilhamento com e-mails cadastrados na instituição...')}
                    className="px-5 py-3 border border-slate-200 hover:bg-slate-50 bg-white text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all"
                  >
                    <Share2 size={13} />
                    <span>Compartilhar</span>
                  </button>
                  <button 
                    onClick={() => alert('PDI atualizado e sincronizado no prontuário integrado do aluno.')}
                    className="px-6 py-3 bg-[#0a1c30] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm hover:bg-[#112d4cfd] transition-all"
                  >
                    Salvar Alterações do PDI
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ----------------------------------------------------
         TAB 2: ADAPTADOR DE ATIVIDADES (IMAGE 2)
         ---------------------------------------------------- */}
      {portalTab === 'adaptador' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Adaptação de Atividades e Recursos</h3>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">Crie materiais de aprendizagem acessíveis a partir de atividades e recursos existentes.</p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-medium text-slate-500">Adaptação para:</span>
              <div className="bg-[#FFC72C]/15 border border-[#FFC72C]/45 text-brand-primary font-black text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                <span>👦 Leo Almeida</span>
                <span className="bg-[#FFC72C] text-[#002D62] text-[9px] px-1.5 font-bold rounded">LA</span>
              </div>
              <button 
                onClick={() => alert('Acesso gerado com sucesso!')}
                className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-all"
              >
                Compartilhar
              </button>
              <button 
                onClick={() => alert('Material Adaptado gravado na biblioteca virtual do educador!')}
                className="px-4 py-2 bg-[#002D62] text-white font-black text-xs rounded-xl hover:bg-[#002D62]/95 transition-all"
              >
                Salvar Adaptação
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Repository list column */}
            <div className="lg:col-span-3 bg-white border border-slate-250 p-5 rounded-[32px] space-y-4 shadow-3xs">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest pb-1 border-b border-indigo-50">Repositório</h4>
              
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filtrar disciplinas..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-bold text-slate-700 outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-3 pt-2">
                
                {/* Active Card Ciências */}
                <button 
                  onClick={() => {
                    setSelectedRepositoryActivity('Ciclo da Água - Básico');
                    setActiveInstructions('A água sobe (Evaporação). A água forma nuvens (Condensação). A chuva cai (Precipitação).');
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedRepositoryActivity === 'Ciclo da Água - Básico'
                      ? 'bg-amber-50/15 border-[#FFC72C] ring-1 ring-[#FFC72C]'
                      : 'bg-slate-50/50 hover:bg-slate-50 border-slate-150'
                  }`}
                >
                  <p className="text-[10px] text-[#002D62] font-black uppercase tracking-wider mb-1">⭐ Ciências</p>
                  <h5 className="text-xs font-black text-slate-800">Ciclo da Água - Básico</h5>
                  <p className="text-[10px] text-slate-450 font-semibold mt-1">Entendendo a evaporação e o meio ambiente...</p>
                  <div className="flex gap-1.5 mt-2">
                    <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Ensino Fundamental</span>
                    <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Visual</span>
                  </div>
                </button>

                {/* Math Card */}
                <button 
                  onClick={() => {
                    setSelectedRepositoryActivity('Introdução a Frações');
                    setActiveInstructions('Dividir pizzas de papelão em metades, terços e quartos para entender frações.');
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedRepositoryActivity === 'Introdução a Frações'
                      ? 'bg-amber-50/15 border-[#FFC72C] ring-1 ring-[#FFC72C]'
                      : 'bg-slate-50/50 hover:bg-slate-50 border-slate-150'
                  }`}
                >
                  <p className="text-[10px] text-orange-600 font-black uppercase tracking-wider mb-1">Matemática</p>
                  <h5 className="text-xs font-black text-slate-800 font-semibold">Introdução a Frações</h5>
                  <p className="text-[10px] text-slate-450 font-semibold mt-1">Dividindo partes inteiras usando círculos e...</p>
                  <div className="flex gap-1.5 mt-2">
                    <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Manipulativos</span>
                  </div>
                </button>

                {/* History Card */}
                <button 
                  onClick={() => {
                    setSelectedRepositoryActivity('A Rota da Seda');
                    setActiveInstructions('Mapeamento tátil de rotas comerciais famosas com fios de lã de diferentes materiais.');
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedRepositoryActivity === 'A Rota da Seda'
                      ? 'bg-amber-50/15 border-[#FFC72C] ring-1 ring-[#FFC72C]'
                      : 'bg-slate-50/50 hover:bg-slate-50 border-slate-150'
                  }`}
                >
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-wider mb-1">História</p>
                  <h5 className="text-xs font-black text-slate-800 font-semibold">A Rota da Seda</h5>
                  <p className="text-[10px] text-slate-450 font-semibold mt-1">Mapa interativo explorando rotas...</p>
                  <div className="flex gap-1.5 mt-2">
                    <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Mapas</span>
                  </div>
                </button>

              </div>
            </div>

            {/* Central workspace columns */}
            <div className="lg:col-span-5 bg-white border border-slate-250 p-6 rounded-[32px] space-y-6 shadow-3xs">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-50">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📘</span>
                  <div>
                    <h4 className="text-sm font-black text-brand-primary">Espaço de Trabalho</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Adaptando: {selectedRepositoryActivity}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 px-2 rounded hover:bg-slate-100 bg-slate-50 border border-slate-200 text-xs">
                    <Undo2 size={12} />
                  </button>
                  <button className="p-1 px-2 rounded hover:bg-slate-100 bg-slate-50 border border-slate-200 text-xs">
                    <Redo2 size={12} />
                  </button>
                </div>
              </div>

              {/* Box 1: Simplified Language Instructions */}
              <div className="space-y-2">
                <h5 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <span>🖋️</span>
                  <span>Instrução Simplificada</span>
                </h5>
                <textarea
                  value={activeInstructions}
                  onChange={(e) => setActiveInstructions(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-semibold leading-relaxed text-slate-705 h-28 focus:outline-none focus:border-brand-primary"
                />
              </div>

              {/* Box 2: Visual Support and Pictograms */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <span>🖼️</span>
                    <span>Suporte Visual e Pictogramas</span>
                  </h5>
                  <button 
                    onClick={() => {
                      const l = prompt('Qual o novo pictograma de apoio visual?');
                      if (l) setPictograms([...pictograms, { id: `p-${Date.now()}`, label: l, icon: '⭐', selected: true }]);
                    }}
                    className="text-[10px] font-black text-brand-secondary hover:underline cursor-pointer"
                  >
                    + Explorar ARASAAC
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {pictograms.map((pict) => (
                    <button
                      key={pict.id}
                      onClick={() => {
                        setPictograms(pictograms.map(p => p.id === pict.id ? { ...p, selected: !p.selected } : p));
                      }}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        pict.selected 
                          ? 'border-brand-primary bg-slate-50/50 ring-1 ring-brand-primary/20' 
                          : 'border-slate-150 opacity-55 hover:opacity-85'
                      }`}
                    >
                      <span className="text-xl mb-1">{pict.icon}</span>
                      <span className="text-[10px] font-extrabold text-slate-700 leading-none">{pict.label}</span>
                    </button>
                  ))}

                  <button 
                    onClick={() => {
                      const label = prompt('Digite o nome do ícone:');
                      if (label) setPictograms([...pictograms, { id: `pic-${Date.now()}`, label, icon: '📁', selected: true }]);
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-dashed border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-400 text-center transition-all cursor-pointer"
                  >
                    <span className="text-lg">📁</span>
                    <span className="text-[8px] font-black uppercase tracking-wider mt-1 block">Adicionar Novo</span>
                  </button>
                </div>
              </div>

              {/* Box 3: Related tactile tactile components */}
              <div className="space-y-3">
                <h5 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <span>🧸</span>
                  <span>Recurso Tátil Relacionado</span>
                </h5>
                
                <div className="flex flex-wrap gap-2">
                  {tactileChips.map((chip) => (
                    <span key={chip.id} className="bg-brand-gold/15 border border-brand-gold/25 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-1.5 select-none animate-fade-in">
                      <span>{chip.label}</span>
                      <button 
                        onClick={() => handleRemoveTactile(chip.id)}
                        className="text-[10px] text-slate-450 hover:text-black hover:scale-110 shrink-0 font-bold ml-1.5 cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  <button 
                    onClick={handleAddTactile}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-extrabold text-slate-600 transition-colors uppercase cursor-pointer"
                  >
                    + Vincular Kit Sensorial
                  </button>
                </div>
              </div>

            </div>

            {/* Right assistant dashboard side panel */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Assistente Lumi block */}
              <div className="bg-[#002B55] text-white p-6 rounded-[32px] border border-[#003B70] space-y-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm text-brand-gold">
                    ✨
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-brand-gold uppercase tracking-wider leading-none">Assistente Lumi</h5>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Insights Inteligentes</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl italic text-xs leading-relaxed text-slate-100">
                  "Com base no perfil do Leo, sugiro adicionar uma **Fonte de Alta Legibilidade** e uma **Barreira Tátil** para as áreas do diagrama para ajudar na orientação espacial."
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <button 
                    onClick={() => alert('Atalhando gravação de audiodescritivo sobre o ciclo d\'água...')}
                    className="w-full text-left py-2 px-3 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>🎙️ Adicionar Vídeo em Libras</span>
                    <span>➔</span>
                  </button>
                  <button 
                    onClick={() => alert('Sintetizando faixa de audiodescrição adaptada...')}
                    className="w-full text-left py-2 px-3 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>🔊 Gerar Audiodescrição</span>
                    <span>➔</span>
                  </button>
                  <button 
                    onClick={() => alert('Conselhos de acessibilidade Braille impressos no pátio.')}
                    className="w-full text-left py-2 px-3 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>👁️ Dica de Conversação para Braille</span>
                    <span>➔</span>
                  </button>
                </div>
              </div>

              {/* Scorecard checklist accessibility */}
              <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 shadow-3xs space-y-4">
                <h4 className="text-xs font-black tracking-widest text-[#002D62] uppercase pb-2 border-b border-indigo-50">
                  🔍 Verificação de Acessibilidade
                </h4>
                
                <div className="space-y-3.5">
                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="text-emerald-600 mt-0.5 font-bold">✔</span>
                    <div>
                      <p className="font-extrabold text-slate-800 leading-none">Nível de Linguagem</p>
                      <p className="text-[10px] font-medium text-slate-500 mt-1">Frases simples confirmadas.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="text-amber-500 mt-0.5 font-bold">⚠️</span>
                    <div>
                      <p className="font-extrabold text-slate-800 leading-none">Contraste Visual</p>
                      <p className="text-[10px] font-medium text-slate-500 mt-1">Aumentar contraste do botão.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="text-slate-400 mt-0.5 font-bold">●</span>
                    <div>
                      <p className="font-extrabold text-slate-800 leading-none">Texto Alternativo</p>
                      <p className="text-[10px] font-medium text-slate-500 mt-1">3 imagens sem descrição.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vincular ao Objetivo dropdown card */}
              <div className="bg-white border border-slate-250 rounded-[32px] p-6 shadow-3xs space-y-3">
                <h4 className="text-xs font-black text-brand-primary uppercase tracking-wider">Vincular ao Objetivo do PDI</h4>
                <select className="w-full bg-slate-50 border border-slate-150 p-3 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer">
                  <option>Objetivo 2.1: Expansão de Comunicação</option>
                  <option>Objetivo 2.2: Letramento Táctil</option>
                  <option>Objetivo 2.3: Interação Sensorial</option>
                </select>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ----------------------------------------------------
         TAB 3: ESPAÇO DE ADAPTAÇÃO "LUMIADAPT" (IMAGE 1)
         ---------------------------------------------------- */}
      {portalTab === 'lumiadapt' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#F9F9F6] p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-xl font-bold text-brand-primary tracking-tight">Espaço de Adaptação LumiAdapt</h3>
              <p className="text-xs text-slate-550 font-semibold mt-0.5">Visão do Educador no Espaço Adaptativo para material adaptado simplificado.</p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-medium text-slate-500">Adaptação Ativa:</span>
              <span className="bg-brand-gold text-[#002D62] font-black text-xs px-3 py-1 rounded-md">O Ciclo Hidrológico</span>
              <button 
                onClick={() => alert('Sincronia efetuada com sucesso!')}
                className="px-4 py-2 bg-brand-primary text-[#FFC72C] font-black text-xs rounded-xl hover:bg-brand-primary/95 transition-all shadow-sm"
              >
                Salvar Adaptação
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Atividade de Origem */}
            <div className="lg:col-span-4 bg-white border border-slate-250 p-6 rounded-[32px] space-y-5 shadow-3xs">
              <h4 className="text-sm font-black text-slate-800 tracking-tight pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Atividade de Origem</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase">Original</span>
              </h4>

              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  defaultValue="Ciclo da Água"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-4 text-xs font-semibold text-slate-700 outline-none"
                />
              </div>

              {/* Water cycle picture mockup */}
              <div className="space-y-4">
                <div className="relative aspect-video bg-[#EEF4F8] rounded-2xl overflow-hidden border border-slate-200 flex flex-col items-center justify-center">
                  {/* Vector water cycle diagram mock */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/50 via-teal-100/30 to-blue-200/50 flex flex-col items-center justify-center p-3">
                    <span className="text-3xl animate-bounce">🌧️</span>
                    <div className="w-16 h-16 border-4 border-dashed border-teal-400 rounded-full animate-spin flex items-center justify-center mt-2">
                      <span className="text-sm">🔄</span>
                    </div>
                    <span className="text-[10px] font-black text-[#002D62] uppercase tracking-widest mt-1">O Ciclo da Água</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-base font-black text-brand-primary">O Ciclo Hidrológico</h5>
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                    O ciclo da água, ou ciclo hidrológico, refere-se ao movimento contínuo da água acima e abaixo da superfície da Terra. A água da Terra muda de estado entre as fases líquida, sólida e gasosa, em um processo dinâmico impulsionado pela energia solar e pela gravidade...
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">Ciências</span>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">Nível 4</span>
                </div>
              </div>
            </div>

            {/* Middle Column: Espaço de Adaptação */}
            <div className="lg:col-span-5 bg-white border border-slate-250 p-6 rounded-[32px] space-y-6 shadow-3xs">
              
              <div className="flex justify-between items-center pb-3 border-b border-indigo-50">
                <h4 className="text-sm font-black text-brand-primary">Espaço de Adaptação</h4>
                
                {/* Active switch mockup */}
                <div className="flex items-center gap-2 bg-amber-50/70 border border-amber-200/60 px-3.5 py-1.5 rounded-full select-none">
                  <span className="text-[10px] font-black text-slate-700 uppercase flex items-center gap-1">
                    <span>💡</span>
                    <span>Lumi IA Ativa</span>
                  </span>
                  <button 
                    onClick={() => setIsLumiIaActive(!isLumiIaActive)}
                    className={`w-8 h-4 rounded-full transition-all relative shrink-0 cursor-pointer ${isLumiIaActive ? 'bg-amber-400' : 'bg-slate-350'}`}
                  >
                    <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${isLumiIaActive ? 'right-0.5' : 'left-0.5'}`}></span>
                  </button>
                </div>
              </div>

              {/* Box 1: Simplified language textbox */}
              <div className="bg-[#FAF9F6] border border-stone-200 p-4.5 rounded-2xl space-y-3.5 relative">
                <div className="flex justify-between items-center">
                  <h5 className="text-[10px] font-black tracking-widest text-slate-450 uppercase flex items-center gap-1">
                    <span>☰</span>
                    <span>Linguagem Simplificada</span>
                  </h5>
                </div>

                <textarea
                  value={adaptedLumiText}
                  onChange={(e) => setAdaptedLumiText(e.target.value)}
                  className="w-full bg-transparent border-0 resize-none text-xs font-semibold leading-relaxed text-stone-850 h-28 focus:outline-none focus:ring-0 outline-none p-0"
                />

                {/* Insight yellow alert box */}
                <div className="border border-amber-200 bg-amber-50/40 p-3 rounded-xl flex items-start gap-2 text-[10px] font-semibold text-slate-650 leading-relaxed">
                  <span className="text-amber-500 text-xs">💡</span>
                  <span>Insight Lumi IA: Utilizamos frases mais curtas e verbos concretos para apoiar o nível de compreensão da Maya / Leo.</span>
                </div>
              </div>

              {/* Box 2: Visual supports */}
              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <h5 className="text-[10px] font-black tracking-widest text-[#002D62] uppercase">🎛️ Suportes Visuais</h5>
                  <button 
                    onClick={() => {
                      const sup = prompt('Deseja adicionar qual suporte de pictograma visual?');
                      if (sup) setLumiVisualSupports([...lumiVisualSupports, { id: `v-${Date.now()}`, label: sup, icon: '⭐' }]);
                    }}
                    className="text-[10px] font-black text-brand-secondary hover:underline cursor-pointer"
                  >
                    + Adicionar Ícone
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {lumiVisualSupports.map((vs) => (
                    <div key={vs.id} className="border border-slate-200 rounded-xl p-2.5 flex flex-col items-center justify-center text-center bg-slate-50/50">
                      <span className="text-base mb-1">{vs.icon}</span>
                      <span className="text-[10px] font-black text-slate-700">{vs.label}</span>
                    </div>
                  ))}

                  <button 
                    onClick={() => {
                      const sp = prompt('Adicionar ícone de suporte visual:');
                      if (sp) setLumiVisualSupports([...lumiVisualSupports, { id: `vs-${Date.now()}`, label: sp, icon: '📁' }]);
                    }}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-slate-350 hover:bg-slate-50 rounded-xl p-2.5 text-slate-400 cursor-pointer"
                  >
                    <span>📁</span>
                    <span className="text-[9px] font-black uppercase tracking-wider mt-0.5 leading-none">Novo</span>
                  </button>
                </div>
              </div>

              {/* Box 3: Sensory Useful resources */}
              <div className="space-y-3">
                <h5 className="text-[10px] font-black tracking-widest text-[#002D62] uppercase">🎯 Recursos Úteis / Sensoriais</h5>
                
                <div className="space-y-2">
                  {lumiSensoryResources.map((res) => (
                    <div key={res.id} className="bg-stone-50 border border-slate-150 rounded-xl px-3.5 py-2.5 flex justify-between items-center text-xs font-bold text-slate-755 animate-fade-in">
                      <div className="flex items-center gap-2">
                        <span className="text-[#FFC72C]">🌾</span>
                        <span>{res.label}</span>
                      </div>
                      <button 
                        onClick={() => handleRemoveLumiSensory(res.id)}
                        className="text-[10px] text-slate-400 hover:text-black font-extrabold cursor-pointer ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={handleAddLumiSensory}
                    className="text-xs text-slate-500 font-extrabold border border-dashed border-slate-200 hover:border-slate-350 w-full text-center py-2 rounded-xl bg-slate-50 border-spacing-2 cursor-pointer"
                  >
                    + Vincular Novo Recurso Sensorial
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Sugestões Lumi */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Sugestões Card list */}
              <div className="bg-white border border-slate-250 p-5 rounded-[32px] space-y-4 shadow-3xs">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-150">
                  <div className="w-6 h-6 bg-amber-400 rounded-lg flex items-center justify-center font-bold text-slate-905">
                    ✨
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-brand-primary uppercase">Sugestões</h4>
                    <p className="text-[9px] text-slate-400 font-semibold uppercase mt-0.5">Insights Lumi IA</p>
                  </div>
                </div>

                {/* Sub-selector tabs */}
                <div className="flex flex-col gap-1.5 pt-1">
                  {[
                    { id: 'Braille', label: 'Braille', emoji: '🖨️' },
                    { id: 'Audio', label: 'Áudio', emoji: '🔊' },
                    { id: 'Visual', label: 'Suporte Visual', emoji: '👁️' },
                    { id: 'Simplificado', label: 'Simplificado', emoji: '📑' },
                    { id: 'Sensorial', label: 'Sensorial', emoji: '🌾' }
                  ].map((subT) => {
                    const active = activeSuggestionFilter === subT.id;
                    return (
                      <button
                        key={subT.id}
                        onClick={() => setActiveSuggestionFilter(subT.id as any)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center justify-between transition-all cursor-pointer ${
                          active
                            ? 'bg-amber-400 text-brand-primary shadow-2xs border border-transparent'
                            : 'bg-slate-50/60 text-slate-500 border border-slate-100 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{subT.emoji}</span>
                          <span>{subT.label}</span>
                        </span>
                        <span>➔</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Contrast optimization / Interaction cards */}
              <div className="space-y-4">
                
                {/* Contrast Optimization Advice */}
                <div className="bg-white border border-amber-300 rounded-[28px] p-5 shadow-2xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wide">
                    <span>💡</span>
                    <span>Otimização de Contraste</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-semibold leading-relaxed">
                    Aumente o contraste nos rótulos do ciclo da água. Use destaque amarelo em palavras-chave como 'Evaporação'.
                  </p>
                </div>

                {/* Interactive Element Advice */}
                <div className="bg-white border border-blue-200 rounded-[28px] p-5 shadow-2xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wide">
                    <span>🎨</span>
                    <span>Elemento Interativo</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-semibold leading-relaxed">
                    Adicione modelos 3D táteis de nuvens usando tinta relevo para a mesa de trabalho da Maya.
                  </p>
                </div>

                {/* Vincular ao objetivo link button */}
                <button 
                  onClick={() => alert('Adaptador de atividades vinculado no PEI atual de ' + selectedStudentName)}
                  className="w-full py-4 border border-indigo-100 bg-white hover:bg-violet-50 text-indigo-700 font-extrabold text-xs uppercase text-center rounded-[24px] tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs block"
                >
                  <span>🔗</span>
                  <span>Vincular ao PDI</span>
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
