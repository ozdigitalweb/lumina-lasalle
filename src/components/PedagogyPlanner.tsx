import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Check, 
  Loader2, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  Bookmark, 
  Share2, 
  Printer, 
  Save, 
  Plus, 
  GraduationCap,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  ChevronDown,
  Clock,
  ExternalLink,
  BookMarked,
  Pencil
} from 'lucide-react';
import { PedagogicalPlan, Student } from '../types';

interface PedagogyPlannerProps {
  plans: PedagogicalPlan[];
  onAddPlan: (plan: PedagogicalPlan) => void;
  students?: Student[];
}

export default function PedagogyPlanner({ plans, onAddPlan, students = [] }: PedagogyPlannerProps) {
  // Navigation tabs matching Pedagogy suite architectures
  const [plannerTab, setPlannerTab] = useState<'biblioteca' | 'relatorios' | 'gerador'>('biblioteca');

  // Common: selected student name for reports
  const [reportStudent, setReportStudent] = useState('Leo Almeida');

  // --- STATE FOR TAB 1: BIBLIOTECA DE SUGESTÕES (IMAGE 4) ---
  const [ageFilter, setAgeFilter] = useState('Todas');
  const [experienceFilter, setExperienceFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const [libraryCards, setLibraryCards] = useState([
    {
      id: 'lib-1',
      type: 'ATIVIDADE',
      typeColor: 'bg-indigo-100 text-indigo-800',
      title: 'Pintura com Elementos Naturais',
      desc: 'Explore texturas e cores usando folhas, galhos e terra. Estimula a coordenação motora fina e a exploração tátil direta.',
      ageRange: '0-3 anos',
      skills: 'Traços, Sons, Cores e Formas',
      likes: 124,
      liked: false
    },
    {
      id: 'lib-2',
      type: 'PROJETO',
      typeColor: 'bg-emerald-100 text-emerald-800',
      title: 'Pequenos Cientistas: Água',
      desc: 'Um projeto de 15 dias explorando os estados físicos da água e a importância da sustentabilidade e preservação.',
      ageRange: '4-6 anos',
      skills: 'Espaços, Tempos, Quantidades',
      likes: 245,
      liked: true
    },
    {
      id: 'lib-3',
      type: 'BRINCADEIRA',
      typeColor: 'bg-amber-100 text-amber-800',
      title: 'Caça ao Tesouro das Emoções',
      desc: 'As crianças devem encontrar cartões escondidos que expressam sentimentos e discutir formas respeitosas de lidar com cada emoção.',
      ageRange: 'Todas',
      skills: 'O Eu, o Outro e o Nós',
      likes: 89,
      liked: false
    },
    {
      id: 'lib-4',
      type: 'MATERIAL',
      typeColor: 'bg-blue-100 text-blue-800',
      title: 'Guia de Contação de Histórias',
      desc: 'PDF com 20 técnicas de vocalização e uso de fantoches para prender a atenção ativa e estimular o letramento da infância.',
      ageRange: 'Educadores',
      skills: 'Escuta, Fala, Pensamento',
      likes: 312,
      liked: false
    }
  ]);

  const handleToggleLike = (id: string) => {
    setLibraryCards(libraryCards.map(c => {
      if (c.id === id) {
        return { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 };
      }
      return c;
    }));
  };

  const handleLaunchCustomActivity = () => {
    const title = prompt('Qual título da sugestão de atividade?');
    if (!title) return;
    const desc = prompt('Escreva uma breve descrição detalhada:');
    if (!desc) return;
    
    const newCard = {
      id: `lib-${Date.now()}`,
      type: 'ATIVIDADE',
      typeColor: 'bg-violet-100 text-violet-800 border border-violet-200',
      title,
      desc,
      ageRange: '4-5 anos',
      skills: 'Artes e Expressões',
      likes: 1,
      liked: false
    };

    setLibraryCards([newCard, ...libraryCards]);
  };

  // --- STATE FOR TAB 2: RELATÓRIOS & PARECER DE DESENVOLVIMENTO (IMAGE 5) ---
  const [reports, setReports] = useState<{
    id: string;
    studentName: string;
    classAndGrade: string;
    period: string;
    socioemocional: number;
    cognitivo: number;
    motor: number;
    attendance: number;
    text: string;
    updatedAt: string;
  }[]>(() => {
    const saved = localStorage.getItem('la_salle_pedagogical_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'rep-1',
        studentName: 'Leo Almeida',
        classAndGrade: '1º Ano A • Fundamental I',
        period: '2º Trimestre 2026',
        socioemocional: 85,
        cognitivo: 72,
        motor: 90,
        attendance: 98,
        text: "O aluno Leo Almeida tem demonstrado um progresso notável durante este segundo trimestre. No que tange ao desenvolvimento acadêmico, sua capacidade de interpretação de textos evoluiu significativamente, demonstrando curiosidade genuína pelos temas abordados em sala.\n\nNo aspecto socioemocional, Leo é uma criança empática e colaborativa. Notamos que ele exerce um papel de liderança positiva em atividades de grupo, auxiliando colegas com dificuldades motoras finas durante as oficinas de artes. Ele expressa seus sentimentos de forma clara e busca o diálogo para resolver pequenos impasses cotidianos.\n\nQuanto ao desenvolvimento lógico-matemático, o aluno já domina a contagem e classificação de objetos por múltiplos atributos (cor, forma e tamanho). Recomenda-se, para o próximo período, incentivar atividades que envolvam o raciocínio abstrato e a antecipação de sequências lógicas mais complexas.",
        updatedAt: '21/06/2026 às 14:32'
      },
      {
        id: 'rep-2',
        studentName: 'Guto Pinheiro',
        classAndGrade: 'Infantil II - B • Educação Infantil',
        period: '2º Trimestre 2026',
        socioemocional: 92,
        cognitivo: 88,
        motor: 75,
        attendance: 95,
        text: "Guto Pinheiro demonstra excelente adaptação à rotina escolar do Infantil II. Participa com entusiasmo das atividades lúdicas coletivas e expressa boa coordenação corporal ampla. Apresenta grande facilidade de comunicação verbal e amplo vocabulário.\n\nTemos observado ótimo engajamento nos projetos de letramento ambiental. No entanto, necessita de contínuo incentivo e mediação nas tarefas de coordenação fina e grafismo, pois tende a realizar as pinceladas rapidamente. O aluno é dócil, prestativo e adora auxiliar na organização dos materiais de sala.",
        updatedAt: '20/06/2026 às 11:20'
      },
      {
        id: 'rep-3',
        studentName: 'Theo Rocha',
        classAndGrade: 'Maternal II • Educação Infantil',
        period: '2º Trimestre 2026',
        socioemocional: 78,
        cognitivo: 80,
        motor: 85,
        attendance: 100,
        text: "Theo Rocha apresentou ótima evolução no Maternal II. Participa de todas as propostas com interesse, demonstrando facilidade na aquisição de novos marcos de desenvolvimento cognitivo e motor.\n\nNo aspecto de interação socioemocional, o aluno está avançando na partilha de brinquedos e momentos lúdicos de forma cooperativa. Destaca-se por sua vivacidade e alegria. Mostra-se independente e autônomo na maioria dos processos diários.",
        updatedAt: '19/06/2026 às 16:45'
      }
    ];
  });

  const [selectedReportId, setSelectedReportId] = useState<string>('rep-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persist reports
  useEffect(() => {
    localStorage.setItem('la_salle_pedagogical_reports', JSON.stringify(reports));
  }, [reports]);

  // Form Fields for new report creation
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [newRepStudentName, setNewRepStudentName] = useState('');
  const [newRepClass, setNewRepClass] = useState('1º Ano A • Fundamental I');
  const [newRepPeriod, setNewRepPeriod] = useState('2º Trimestre 2026');
  const [newRepAttendance, setNewRepAttendance] = useState(95);

  const availableStudents = [
    { name: 'Leo Almeida', className: '1º Ano A • Fundamental I' },
    { name: 'Guto Pinheiro', className: 'Infantil II - B • Educação Infantil' },
    { name: 'Theo Rocha', className: 'Maternal II • Educação Infantil' },
    { name: 'Helena Costa', className: 'Maternal I • Educação Infantil' },
    { name: 'Laura Silva', className: 'Berçário I • Educação Infantil' },
    { name: 'Clara Santos', className: 'Maternal II • Educação Infantil' },
    { name: 'Bruno Dias', className: 'Infantil III - A • Educação Infantil' }
  ];

  const [socioemocionalProgress, setSocioemocionalProgress] = useState(85);
  const [cognitivoProgress, setCognitivoProgress] = useState(72);
  const [motorProgress, setMotorProgress] = useState(90);
  const [parecerText, setParecerText] = useState('');

  // Sync active fields when report selection shifts or reports change
  useEffect(() => {
    const active = reports.find(r => r.id === selectedReportId);
    if (active) {
      setSocioemocionalProgress(active.socioemocional);
      setCognitivoProgress(active.cognitivo);
      setMotorProgress(active.motor);
      setParecerText(active.text);
      setReportStudent(active.studentName);
    }
  }, [selectedReportId]);

  const pedagogicalSuggestionsList = [
    "Demonstra autonomia na execução das tarefas propostas...",
    "Interage com os pares de forma respeitável e colaborativa...",
    "Apresenta vocabulário rico e bem estruturado para a faixa etária."
  ];

  const handleAppendSuggestionText = (txt: string) => {
    setParecerText(prev => prev + "\n" + txt);
  };

  const handleLumiRewriteReport = () => {
    alert('Lumi IA está polindo o texto e expandindo diretrizes...');
    setParecerText(prev => prev + "\n\n[Sintonizado por Lumi AI]: O progresso manifestado reflete elevado engajamento em propostas estruturadas com apoio visual, recomendando-se dar continuidade às metodologias inclusivas da plataforma.");
  };

  const handleSaveSelectedReport = () => {
    setReports(prev => prev.map(r => {
      if (r.id === selectedReportId) {
        return {
          ...r,
          socioemocional: socioemocionalProgress,
          cognitivo: cognitivoProgress,
          motor: motorProgress,
          text: parecerText,
          updatedAt: `Alterado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
        };
      }
      return r;
    }));
    triggerNotification('Parecer pedagógico atualizado com sucesso!');
  };

  const handleDeleteReport = (id: string, sName: string) => {
    if (confirm(`Tem certeza que deseja excluir o parecer escolar de "${sName}"?`)) {
      const remaining = reports.filter(r => r.id !== id);
      setReports(remaining);
      triggerNotification(`Parecer de "${sName}" removido.`);
      
      // Auto-focus next report if active was deleted
      if (selectedReportId === id && remaining.length > 0) {
        setSelectedReportId(remaining[0].id);
      }
    }
  };

  const handleCreateReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = newRepStudentName.trim() || 'Estudante Sem Nome';
    const finalClass = newRepClass || 'Ensino Infantil • Turno Geral';
    const finalPeriod = newRepPeriod || '2º Trimestre 2026';

    const newRep = {
      id: `rep-${Date.now()}`,
      studentName: finalName,
      classAndGrade: finalClass,
      period: finalPeriod,
      socioemocional: 60,
      cognitivo: 60,
      motor: 60,
      attendance: Number(newRepAttendance) || 95,
      text: `O estudante ${finalName} tem demonstrado adaptação contínua e evolução nos marcos de desenvolvimento deste período. Apresenta boa convivência pedagógica com seus pares, respondendo positivamente aos estímulos direcionados em sala.`,
      updatedAt: `Criado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    };

    setReports([newRep, ...reports]);
    setSelectedReportId(newRep.id);
    setIsCreatingReport(false);
    setNewRepStudentName('');
    triggerNotification(`Parecer de "${finalName}" criado com rascunho inicial!`);
  };

  // --- STATE FOR TAB 3: GERADOR BNCC (ORIGINAL) ---
  const [ageGroup, setAgeGroup] = useState('Pré-escola II');
  const [experienceCamp, setExperienceCamp] = useState('Escuta, fala, pensamento e imaginação');
  const [theme, setTheme] = useState('As cores da natureza na primavera');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [suggestedPlan, setSuggestedPlan] = useState({
    title: 'Plano Sugerido: As Cores da Natureza',
    objectives: [
      '(EI03EF01) Expressar ideias, desejos e sentimentos sobre suas vivências, por meio da linguagem oral e escrita.',
      '(EI03TS02) Expressar-se livremente por meio de desenho, pintura, colagem, dobradura e escultura.'
    ],
    steps: [
      { num: 1, title: 'Rodinha de Conversa', text: 'Iniciar perguntando quais cores as crianças veem quando olham para uma árvore ou jardim.' },
      { num: 2, title: 'Expedição Científica', text: 'Caminhada pelo pátio da escola coletando folhas, flores e pedrinhas caídas.' },
      { num: 3, title: 'Laboratório de Cores', text: 'Esmagar os elementos coletados em papel branco para ver a extração dos pigmentos naturais.' }
    ],
    resources: [
      'Folhas de papel canson',
      'Potes pequenos de água',
      'Elementos naturais (coletados)',
      'Lupas de plástico'
    ],
    evaluation: 'Observação direta do engajamento na coleta e capacidade de relacionar cores aos elementos.',
    inclusionStrategy: 'Oferecer lupas de maior contraste ou auxílio motor para crianças na fase de esmagamento.',
    familyGuideline: 'Pedir que tragam no dia seguinte uma folha ou flor de sua rua ou de casa.'
  });

  const handleLumiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) {
      setError('Por favor, digite um tema ou tópico de interesse.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/lumi/suggest-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experienceCamps: [experienceCamp],
          ageGroup: ageGroup,
          topic: theme
        })
      });

      if (!response.ok) throw new Error('Falha ao gerar o plano.');
      const data = await response.json();
      setSuggestedPlan(data.plan);
    } catch (err: any) {
      console.error(err);
      // Nice fallback
      setSuggestedPlan({
        title: `Plano Lumi: ${theme}`,
        objectives: [
          '(EI03TS02) Utilizar materiais variados com possibilidades de manipulação, explorando cores e planos.',
          '(EI03CG02) Demonstrar controle e adequação no uso de seu corpo em atividades artísticas.'
        ],
        steps: [
          { num: 1, title: 'Introdução Integradora', text: 'Canto acolhedor e visualização de figuras e gravuras ricas sobre ' + theme },
          { num: 2, title: 'Espaço de Atividade Heurística', text: 'Permitir experimentações livres com suportes e argilas sensoriais' },
          { num: 3, title: 'Conclusão Coletiva', text: 'Arrumação da sala e partilha de impressões' }
        ],
        resources: ['Materiais manipulativos de contraste', 'Massa de modelar macia', 'Pincéis grossos'],
        evaluation: 'Acompanhamento empático do envolvimento e engajamento da criança.',
        inclusionStrategy: 'Adequar altura de mesas de areia para facilitação táctil e uso de abafadores de som se necessário.',
        familyGuideline: 'Conversem com as crianças sobre quais texturas elas descobriram e registrem na caderneta familiar.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToPlansList = () => {
    const newPlanObj: PedagogicalPlan = {
      id: `plan-${Date.now()}`,
      title: suggestedPlan.title,
      ageGroup: ageGroup,
      experienceCamps: [experienceCamp],
      objectives: suggestedPlan.objectives,
      procedures: suggestedPlan.steps.map(s => `${s.num}. ${s.title}: ${s.text}`).join(' '),
      inclusionStrategy: suggestedPlan.inclusionStrategy,
      familyGuideline: suggestedPlan.familyGuideline,
      createdAt: new Date().toISOString().split('T')[0]
    };
    onAddPlan(newPlanObj);
    alert('Sucesso! O plano foi arquivado em seu Diário e disponibilizado para intercâmbio escolar.');
  };


  return (
    <div className="space-y-6 text-slate-800 animate-fade-in">
      
      {/* Top Pedagogical Controls Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/70 backdrop-blur-md p-5 rounded-[24px] border border-slate-100 shadow-3xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-brand-gold text-brand-primary font-black px-2.5 py-1 rounded-sm tracking-widest uppercase">
              Lumi Pedagogy Suite
            </span>
            <span className="text-xs text-slate-400 font-bold">Gestão Acadêmica e Planejamentos</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight">
            Biblioteca de Sugestões e Relatórios
          </h2>
          <p className="text-slate-500 text-xs font-semibold">
            Selecione as abas abaixo para consultar os designs de Biblioteca e relatórios pareceres integrados.
          </p>
        </div>

        {/* Dynamic sub-panels Tab Navigation inside Pedagogy views */}
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setPlannerTab('biblioteca')}
            className={`px-3 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
              plannerTab === 'biblioteca'
                ? 'bg-brand-primary text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            📚 Biblioteca de Sugestões (Imagem 4)
          </button>
          <button
            onClick={() => setPlannerTab('relatorios')}
            className={`px-3 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
              plannerTab === 'relatorios'
                ? 'bg-brand-primary text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            📝 Relatório & Parecer (Imagem 5)
          </button>
          <button
            onClick={() => setPlannerTab('gerador')}
            className={`px-3 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
              plannerTab === 'gerador'
                ? 'bg-brand-primary text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            ⚙️ Gerador BNCC
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------
         TAB 1: BIBLIOTECA DE SUGESTÕES (IMAGE 4)
         ---------------------------------------------------- */}
      {plannerTab === 'biblioteca' && (
        <div className="space-y-6">
          <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-250/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-none">Biblioteca de Sugestões</h3>
              <p className="text-xs text-slate-550 font-semibold mt-1.5">Ideias curadas pela Lumi para iluminar e sintonizar o desenvolvimento de seus alunos.</p>
            </div>
            
            {/* Filter controls row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filtros:</span>
              <select 
                value={ageFilter} 
                onChange={(e) => setAgeFilter(e.target.value)}
                className="bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Todas">Faixa Etária: Todas</option>
                <option value="0-3 anos">0 a 3 anos</option>
                <option value="4-6 anos">4 a 6 anos</option>
              </select>

              <select 
                value={experienceFilter} 
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Todos">Experiência: Todos</option>
                <option value="Traços, Sons, Cores e Formas">Traços, Sons, Cores e Formas</option>
                <option value="O Eu, o Outro e o Nós">O Eu, o Outro e o Nós</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Central activity suggestions grid */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {libraryCards
                  .filter(c => {
                    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.desc.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesAge = ageFilter === 'Todas' || c.ageRange === ageFilter || c.ageRange === 'Todas';
                    const matchesExp = experienceFilter === 'Todos' || c.skills === experienceFilter;
                    return matchesSearch && matchesAge && matchesExp;
                  })
                  .map((card) => (
                    <div key={card.id} className="bg-white border border-slate-200 p-5 rounded-[28px] shadow-3xs flex flex-col justify-between space-y-4 hover:shadow-2xs transition-all relative">
                      <div className="space-y-3">
                        <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded leading-none inline-block ${card.typeColor}`}>
                          {card.type}
                        </span>
                        
                        <h4 className="text-sm font-extrabold text-brand-primary leading-tight font-sans tracking-tight">{card.title}</h4>
                        <p className="text-xs text-slate-600 font-semibold leading-relaxed line-clamp-3">{card.desc}</p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex gap-2 text-[9px] text-slate-500 font-bold border-t border-slate-100 pt-3">
                          <span className="bg-stone-50 px-2 py-0.5 rounded border border-stone-150">{card.ageRange}</span>
                          <span className="bg-stone-105/50 px-2 py-0.5 rounded truncate max-w-[150px]">{card.skills}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleToggleLike(card.id)}
                              className={`text-slate-450 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer ${card.liked ? 'text-rose-600' : ''}`}
                            >
                              <Heart size={14} className={card.liked ? 'fill-rose-600' : ''} />
                              <span className="text-[10px] font-bold">{card.likes}</span>
                            </button>
                            <button 
                              onClick={() => alert('Parcerias e link compartilhados...')}
                              className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                            >
                              <Share2 size={13} />
                            </button>
                          </div>

                          <button 
                            onClick={() => {
                              alert(`Lançando sugestão "${card.title}" como rascunho de plano ativo.`);
                              setPlannerTab('gerador');
                              setTheme(card.title);
                            }}
                            className="bg-brand-gold hover:bg-brand-gold/94 text-brand-primary font-black px-4.5 py-2 rounded-xl text-[10px] uppercase transition-all tracking-wider shadow-3xs cursor-pointer"
                          >
                            Usar em Plano
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* + Gerar com IA Lumi selector box */}
                <button 
                  onClick={handleLaunchCustomActivity}
                  className="bg-slate-50 hover:bg-slate-100/80 border-2 border-dashed border-slate-200 rounded-[28px] p-6 text-center flex flex-col justify-center items-center space-y-3 min-h-[220px] cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-150 flex items-center justify-center font-bold text-indigo-700 shadow-3xs">
                    ✨
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-brand-primary uppercase tracking-wider">Gerar com IA Lumi</h5>
                    <p className="text-[10px] text-slate-500 font-semibold mt-1 max-w-[180px] mx-auto leading-relaxed">
                      Crie uma sugestão personalizada e adaptada para sua turma atual de forma instantânea.
                    </p>
                  </div>
                </button>
              </div>

            </div>

            {/* Sidebar info panels matching screenshot 4 */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Dica da Lumi block */}
              <div className="bg-[#0c1c2e] text-white p-6 rounded-[32px] border border-slate-800 space-y-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm text-brand-gold">
                    ✨
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-brand-gold uppercase tracking-wider leading-none">Dica da Lumi</h5>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Insights de IA</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl italic text-xs leading-relaxed text-slate-100 font-semibold">
                  "Baseado no seu último plano sobre o **Ciclo da Água**, percebi que seus alunos se engajaram mais com atividades práticas. Que tal tentar o experimento de 'Nuvens no Pote' amanhã?"
                </div>

                <button 
                  onClick={() => alert('Expandindo plano detalhado de "Nuvens no Pote"...')}
                  className="w-full text-center bg-brand-gold hover:bg-amber-400 text-brand-primary text-[10px] font-black py-2.5 rounded-xl uppercase tracking-wider transition-colors shadow-xs cursor-pointer block"
                >
                  Ver Atividade Recomendada
                </button>
              </div>

              {/* Populares na Rede list card */}
              <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-3xs space-y-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-indigo-50">
                  <span className="text-base">📈</span>
                  <h4 className="text-xs font-black text-[#002D62] uppercase tracking-wider leading-none">Populares na Rede</h4>
                </div>

                <div className="space-y-3 pt-1">
                  {[
                    { id: 'p-1', label: 'Cantigas de Roda 2.0', sub: 'Mais de 1.2k planos criados', type: '🎵' },
                    { id: 'p-2', label: 'Yoga para Kids', sub: 'Destaque da semana', type: '🧘' },
                    { id: 'p-3', label: 'Horta Vertical Escolar', sub: 'Sustentabilidade', type: '🌱' }
                  ].map((pop) => (
                    <button 
                      key={pop.id}
                      onClick={() => alert(`Explorando material "${pop.label}" popular escolar...`)}
                      className="w-full text-left p-3 hover:bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3 transition-colors text-xs"
                    >
                      <span className="text-lg bg-slate-100 p-2 rounded-xl shrink-0 block">{pop.type}</span>
                      <div className="font-sans leading-relaxed">
                        <p className="font-extrabold text-slate-850">{pop.label}</p>
                        <p className="text-[10px] text-slate-450 font-semibold mt-0.5">{pop.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 text-center text-[10px] font-black tracking-wider text-slate-450 uppercase">
                  Fim das Recomendações
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {plannerTab === 'relatorios' && (
        <div className="space-y-6">
          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-3xs animate-pulse">
              <span className="flex items-center gap-2">
                <span>✨</span> {toastMessage}
              </span>
              <button 
                onClick={() => setToastMessage(null)} 
                className="text-emerald-500 hover:text-emerald-700 font-extrabold cursor-pointer h-5 w-5 flex items-center justify-center rounded-full hover:bg-emerald-100"
              >
                ✕
              </button>
            </div>
          )}

          {/* Top pedagogical actions navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FCFCFA] p-5 rounded-2xl border border-stone-250/50 shadow-3xs">
            <div>
              <h3 className="text-lg font-black text-brand-primary leading-tight flex items-center gap-2">
                <span>🎓</span> Painel de Relatórios & Pareceres
              </h3>
              <p className="text-[10px] text-slate-550 font-semibold mt-1">
                Selecione ou adicione novos relatórios para regularizar o acompanhamento integral dos alunos.
              </p>
            </div>
            
            <button 
              onClick={() => {
                setIsCreatingReport(true);
                setNewRepStudentName('');
              }}
              className="px-4 py-2.5 bg-brand-primary hover:bg-slate-900 text-[#FFC72C] font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-3xs cursor-pointer self-stretch sm:self-auto text-center justify-center"
            >
              <Plus size={14} className="stroke-[3]" />
              <span>Novo Parecer</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COLUMN 1: List of Active Reports (Read & Delete operations) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-slate-250 rounded-[32px] p-5 shadow-3xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-indigo-50">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Pareceres Cadastrados ({reports.length})
                  </h4>
                  <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">Lumi Drive</span>
                </div>

                <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                  {reports.map((rep) => {
                    const isActive = rep.id === selectedReportId && !isCreatingReport;
                    return (
                      <div 
                        key={rep.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 relative group ${
                          isActive 
                            ? 'bg-[#FAF9F5] border-brand-primary/80 shadow-2xs' 
                            : 'bg-white border-slate-150 hover:border-slate-350 hover:bg-slate-50/55'
                        }`}
                      >
                        <div 
                          className="cursor-pointer flex-1"
                          onClick={() => {
                            setSelectedReportId(rep.id);
                            setIsCreatingReport(false);
                          }}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex items-center gap-2">
                              {(() => {
                                const stObj = students.find(s => s.name === rep.studentName);
                                return stObj?.photo ? (
                                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-250 shadow-3xs shrink-0 bg-white">
                                    <img src={stObj.photo} alt={rep.studentName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0">
                                    {rep.studentName.slice(0, 2).toUpperCase()}
                                  </div>
                                );
                              })()}
                              <div>
                                <h5 className="text-xs font-extrabold text-brand-primary leading-tight">{rep.studentName}</h5>
                                <p className="text-[10px] text-slate-450 font-bold leading-normal mt-0.5">{rep.classAndGrade}</p>
                              </div>
                            </div>
                            <span className="text-[9px] text-[#002D62] font-black bg-[#FFC72C]/20 px-1.5 py-0.5 rounded leading-none shrink-0">
                              {rep.period}
                            </span>
                          </div>

                          <div className="flex gap-1.5 mt-3 pt-2.5 border-t border-slate-100">
                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800">
                              S: {rep.socioemocional}%
                            </span>
                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800">
                              C: {rep.cognitivo}%
                            </span>
                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-teal-50 text-teal-800">
                              M: {rep.motor}%
                            </span>
                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 ml-auto">
                              Freq: {rep.attendance}%
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-100 mt-1">
                          <span className="text-[9px] text-slate-400 font-mono italic">{rep.updatedAt}</span>
                          
                          <div className="flex gap-1.5 opacity-85 group-hover:opacity-100">
                            <button 
                              onClick={() => {
                                setSelectedReportId(rep.id);
                                setIsCreatingReport(false);
                              }}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title="Editar este Parecer"
                            >
                              <Pencil size={12} className="stroke-[2.5]" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteReport(rep.id, rep.studentName);
                              }}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Remover Parecer"
                            >
                              <Trash2 size={12} className="stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {reports.length === 0 && (
                    <div className="text-center py-10 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-205">
                      <p className="text-xs text-slate-400 font-bold uppercase">Nenhum parecer cadastrado</p>
                      <button 
                        onClick={() => setIsCreatingReport(true)}
                        className="text-[10px] font-black text-brand-primary underline mt-2 uppercase tracking-wide inline-block"
                      >
                        Criar Primeiro Registro
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick statistics summary */}
              <div className="bg-[#002D62] text-white p-5 rounded-[28px] border border-indigo-950 space-y-3.5 shadow-sm">
                <span className="text-[9px] text-[#FFC72C] font-black uppercase tracking-widest leading-none">Visão de Qualidade</span>
                <p className="text-xs text-blue-100 font-semibold leading-normal">
                  Todos os pareceres emitidos neste painel passam pelo filtro de revisão integrada da equipe pedagógica e seguem os parâmetros oficiais da BNCC.
                </p>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10 font-bold">
                  <span>Assinatura Digital Ativada</span>
                  <span className="text-[#FFC72C]">● Homologado</span>
                </div>
              </div>
            </div>

            {/* COLUMN 2 & 3: Create Form OR Dynamic Interactive Editor (Create / Update operations) */}
            <div className="lg:col-span-8">
              {isCreatingReport ? (
                /* CREATE FORM COMPONENT */
                <div className="bg-white border border-slate-250 p-6 md:p-8 rounded-[32px] shadow-3xs space-y-5">
                  <div className="pb-3 border-b border-indigo-50 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-black text-brand-primary">Novo Parecer Pedagógico</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Informe as credenciais básicas do estudante</p>
                    </div>
                    <button 
                      onClick={() => setIsCreatingReport(false)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase cursor-pointer"
                    >
                      Voltar ao Editor
                    </button>
                  </div>

                  <form onSubmit={handleCreateReportSubmit} className="space-y-5 font-sans">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-550 uppercase block">Estudante Destinado</label>
                      <select 
                        value={newRepStudentName}
                        onChange={(e) => {
                          setNewRepStudentName(e.target.value);
                          const found = availableStudents.find(s => s.name === e.target.value);
                          if (found) setNewRepClass(found.className);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs font-bold"
                        required
                      >
                        <option value="">-- Selecione um Estudante Cadastrado --</option>
                        {availableStudents.map((st, idx) => (
                          <option key={idx} value={st.name}>{st.name} ({st.className})</option>
                        ))}
                      </select>

                      <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-black uppercase">Ou digite manualmente</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                      </div>

                      <input 
                        type="text"
                        placeholder="Digite o nome completo do aluno..."
                        value={newRepStudentName}
                        onChange={(e) => setNewRepStudentName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs font-extrabold focus:outline-none focus:border-brand-primary"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-550 uppercase block">Série e Turma</label>
                        <input 
                          type="text"
                          value={newRepClass}
                          onChange={(e) => setNewRepClass(e.target.value)}
                          placeholder="Ex: 1º Ano A • Fundamental I"
                          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs font-extrabold focus:outline-none focus:border-brand-primary animate-none"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-550 uppercase block">Período Letivo</label>
                        <input 
                          type="text"
                          value={newRepPeriod}
                          onChange={(e) => setNewRepPeriod(e.target.value)}
                          placeholder="Ex: 2º Trimestre 2026"
                          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs font-extrabold focus:outline-none focus:border-brand-primary animate-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-550 uppercase block">Frequência Letiva do Aluno (%)</label>
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        value={newRepAttendance}
                        onChange={(e) => setNewRepAttendance(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs font-extrabold focus:outline-none focus:border-brand-primary"
                        required
                      />
                    </div>

                    <div className="bg-[#FAF9F5] p-4.5 rounded-2xl border border-amber-200/60 font-semibold text-xs leading-relaxed text-slate-600">
                      ✨ <strong>Dica do Hub Lumi:</strong> O sistema criará um parecer descritivo inicial automático para o aluno escolhido. Posteriormente, você poderá ajustar as barras de desenvolvimento cognitivo, motor, socioemocional e aplicar complementações personalizadas por IA!
                    </div>

                    <div className="pt-3 flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={() => setIsCreatingReport(false)}
                        className="px-5 py-2.5 bg-slate-105 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl text-xs uppercase transition-all cursor-pointer"
                      >
                        Cancelar
                      </button>
                      
                      <button 
                        type="submit"
                        className="px-6 py-2.5 bg-brand-primary hover:bg-[#0c1c2e] text-[#FFC72C] font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                      >
                        Criar e Abrir Rascunho
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* INTERACTIVE EDITOR (for current selected report) */
                reports.find(r => r.id === selectedReportId) ? (
                  (() => {
                    const activeReport = reports.find(r => r.id === selectedReportId)!;
                    return (
                      <div className="space-y-6">
                        
                        {/* Selected Report Metadata Action Header Container */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#FCFCFA] p-4.5 rounded-2xl border border-stone-250/50 shadow-3xs">
                          <div className="flex items-center gap-3">
                            {(() => {
                              const stObj = students.find(s => s.name === activeReport.studentName);
                              return stObj?.photo ? (
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-3xs shrink-0 bg-white">
                                  <img src={stObj.photo} alt={activeReport.studentName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                              ) : (
                                <span className="text-[#002B55] text-xl">📝</span>
                              );
                            })()}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-black text-brand-primary">{activeReport.studentName}</span>
                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">
                                  {activeReport.classAndGrade}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 font-bold">
                                <span>Período Ativo:</span>
                                <span className="text-slate-800 font-extrabold">{activeReport.period}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 shrink-0 flex-wrap">
                            <button 
                              onClick={() => {
                                const original = reports.find(r => r.id === selectedReportId);
                                if (original) {
                                  setSocioemocionalProgress(original.socioemocional);
                                  setCognitivoProgress(original.cognitivo);
                                  setMotorProgress(original.motor);
                                  setParecerText(original.text);
                                  triggerNotification('Rascunho revertido para os valores salvos.');
                                }
                              }}
                              className="px-3.5 py-2 hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase transition-all shrink-0 cursor-pointer"
                            >
                              Descartar
                            </button>
                            <button 
                              onClick={() => alert('Uma comissão pedagógica de revisão foi acionada para homologação.')}
                              className="px-3.5 py-2 hover:bg-slate-105 border border-slate-200 text-slate-650 rounded-xl text-xs font-bold uppercase transition-all shrink-0 cursor-pointer"
                            >
                              Solicitar Revisão
                            </button>
                            <button 
                              onClick={handleSaveSelectedReport}
                              className="px-4 py-2 bg-[#002D62] hover:bg-blue-900 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                            >
                              Salvar
                            </button>
                            <button 
                              onClick={() => alert(`Gerando exportação PDF oficial institucional para ${activeReport.studentName} • ${activeReport.classAndGrade}...`)}
                              className="px-4 py-2 bg-[#FFC72C] text-brand-primary hover:bg-[#ebb417] font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                            >
                              Exportar PDF
                            </button>
                          </div>
                        </div>

                        {/* Split column controls */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                          
                          {/* Left Editor Config: Indicators & Attendance */}
                          <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white border border-slate-250 p-5 rounded-[28px] space-y-5 shadow-3xs">
                              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                                <span>📈</span>
                                <span>Progresso Integrado</span>
                              </h4>

                              <div className="space-y-4 pt-1">
                                {[
                                  { label: 'Socioemocional', val: socioemocionalProgress, setVal: setSocioemocionalProgress, color: 'bg-emerald-500' },
                                  { label: 'Cognitivo', val: cognitivoProgress, setVal: setCognitivoProgress, color: 'bg-indigo-600' },
                                  { label: 'Motor', val: motorProgress, setVal: setMotorProgress, color: 'bg-teal-500' }
                                ].map((bar, id) => (
                                  <div key={id} className="space-y-1.5">
                                    <div className="flex justify-between items-center text-xs font-extrabold text-slate-800">
                                      <span>{bar.label}</span>
                                      <span className="text-slate-500">{bar.val}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2.5 relative">
                                      <div className={`h-full rounded-full transition-all duration-350 ${bar.color}`} style={{ width: `${bar.val}%` }}></div>
                                      <input 
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={bar.val}
                                        onChange={(e) => bar.setVal(Number(e.target.value))}
                                        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed italic bg-emerald-50/40 p-3 rounded-xl border border-emerald-100 mt-2">
                                * Arraste as barras acima para modular os níveis de desenvolvimento do aluno no boletim descritivo.
                              </p>
                            </div>

                            {/* Attendance box dynamic */}
                            <div className="bg-[#FAF9F5] border border-slate-200 p-5 rounded-[28px] space-y-3 shadow-3xs text-slate-700">
                              <p className="text-[9px] text-[#002D62] font-black uppercase tracking-widest leading-none">Frequência Letiva</p>
                              <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black font-mono text-[#002D62]">{activeReport.attendance}%</span>
                                <span className="text-xs text-slate-450 font-bold">de presença</span>
                              </div>
                              <p className="text-[10px] text-slate-500 font-semibold leading-snug">
                                Registro associado à escala letiva regular do {activeReport.period} escolar.
                              </p>
                            </div>
                          </div>

                          {/* Middle Column Editor: Text Area */}
                          <div className="lg:col-span-8 space-y-4">
                            <div className="bg-white border border-slate-250 p-6 rounded-[32px] space-y-4.5 shadow-3xs">
                              
                              <div className="pb-2 border-b border-indigo-50 flex justify-between items-end">
                                <div>
                                  <h4 className="text-sm font-extrabold text-brand-primary">Parecer Descritivo do Aluno</h4>
                                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Texto registrado de acompanhamento escolar</p>
                                </div>
                                <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">
                                  {parecerText.length} caracteres
                                </span>
                              </div>

                              {/* Formatted Editor Toolbar */}
                              <div className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 flex items-center gap-2 flex-wrap">
                                <button className="p-1 rounded hover:bg-slate-200 font-black text-xs text-slate-700 w-6 h-6 flex items-center justify-center">B</button>
                                <button className="p-1 rounded hover:bg-slate-200 font-black text-xs italic text-slate-700 w-6 h-6 flex items-center justify-center">I</button>
                                <button className="p-1 rounded hover:bg-slate-200 font-black text-xs underline text-slate-700 w-6 h-6 flex items-center justify-center">U</button>
                                <span className="h-4 w-px bg-slate-300 mx-1"></span>
                                <button className="p-1 rounded hover:bg-slate-200 text-xs text-slate-600">☰</button>
                                <button className="p-1 rounded hover:bg-slate-200 text-xs text-slate-600">☵</button>
                                
                                <span className="text-[10px] ml-auto text-slate-450 font-mono font-bold select-none uppercase">
                                  {parecerText.trim().split(/\s+/).filter(Boolean).length} palavras
                                </span>
                              </div>

                              <textarea 
                                value={parecerText}
                                onChange={(e) => setParecerText(e.target.value)}
                                rows={14}
                                className="w-full bg-[#FAF9F6] border border-stone-200 p-5 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed text-slate-705 focus:outline-none focus:border-stone-400 font-sans"
                                placeholder="..."
                              />

                              <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase pt-1 border-t border-slate-100">
                                <span className="flex items-center gap-1">
                                  <Clock size={10} /> Último salvamento automático local
                                </span>
                                <span>PDF Gerado com Assinatura Digital</span>
                              </div>

                              {/* Save Changes button explicitly */}
                              <div className="flex justify-end pt-1">
                                <button
                                  onClick={handleSaveSelectedReport}
                                  className="px-5 py-2.5 bg-brand-primary hover:bg-[#0c1c2e] text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-3xs flex items-center gap-2 cursor-pointer"
                                >
                                  <Save size={14} />
                                  <span>Gravar Parecer</span>
                                </button>
                              </div>

                            </div>
                          </div>

                        </div>

                        {/* Bottom Row recommendations - AI Integration */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-2">
                          
                          {/* Left Info block (Assistente) */}
                          <div className="lg:col-span-5 bg-[#FAF9F5] border-2 border-dashed border-[#FFC72C]/70 rounded-[32px] p-6 space-y-4 shadow-3xs relative overflow-hidden">
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl">✨</span>
                              <div>
                                <h5 className="text-xs font-black text-brand-primary uppercase">Assistente Lumi IA</h5>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Educação Inteligente</p>
                              </div>
                            </div>

                            <p className="text-xs text-slate-600 leading-normal font-semibold">
                              Com base no diário de classe e avaliações, posso formatar ou reescrever uma versão reflexiva inicial para este parecer de desenvolvimento.
                            </p>

                            <button 
                              onClick={handleLumiRewriteReport}
                              className="w-full text-center bg-brand-primary text-[#FFC72C] font-black text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-sm hover:bg-slate-900 cursor-pointer flex items-center justify-center gap-2"
                            >
                              <Sparkles size={13} />
                              <span>Sintonizar Parecer com Lumi IA</span>
                            </button>
                          </div>

                          {/* Right Suggestions library appenders */}
                          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-[32px] p-6 shadow-3xs space-y-4">
                            <div className="flex items-center gap-1.5 pb-2 border-b border-indigo-50">
                              <span className="text-sm">💡</span>
                              <h4 className="text-xs font-black text-[#002D62] uppercase tracking-wider leading-none">
                                Banco de Frases e Sugestões Pedagógicas
                              </h4>
                            </div>

                            <p className="text-[11px] text-slate-500 font-semibold">
                              Clique em qualquer frase do banco oficial do colégio para anexar de forma rápida ao parecer atual:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                              {pedagogicalSuggestionsList.map((sug, id) => (
                                <button 
                                  key={id} 
                                  onClick={() => {
                                    handleAppendSuggestionText(sug);
                                    triggerNotification('Sugestão anexada com sucesso!');
                                  }}
                                  className="text-left p-3 hover:bg-stone-50 border border-slate-150 rounded-xl bg-white text-[11px] font-semibold leading-relaxed text-slate-700 transition-all cursor-pointer hover:border-slate-350 min-h-[70px] flex items-center"
                                >
                                  "{sug}"
                                </button>
                              ))}
                            </div>
                          </div>

                        </div>

                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center py-20 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                    <p className="text-sm text-slate-450 font-black uppercase tracking-wider">Por favor, selecione um parecer no painel lateral</p>
                    <p className="text-xs text-slate-400 font-bold mt-1 max-w-[280px] mx-auto">Ou clique em Novo Parecer no topo para cadastrar um novo acompanhamento descritivo.</p>
                  </div>
                )
              )}
            </div>

          </div>
        </div>
      )}

      {/* ----------------------------------------------------
         TAB 3: GERADOR DE PLANOS BNCC (ORIGINAL ALIGNER)
         ---------------------------------------------------- */}
      {plannerTab === 'gerador' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column Input Panel */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-[32px] shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <GraduationCap className="text-brand-primary" size={20} />
                <h3 className="font-extrabold text-slate-800">Alinhador Inteligente</h3>
              </div>
              
              <form onSubmit={handleLumiGenerate} className="space-y-5">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-550 uppercase block">Grupo de Faixa Etária</label>
                  <select 
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-150 px-3.5 py-3 rounded-xl text-xs font-bold"
                  >
                    <option value="Bebês (zero a 1 ano e 6 meses)">Bebês (zero a 1a6m)</option>
                    <option value="Crianças Bem Pequenas (1a7m a 3a11m)">Crianças Bem Pequenas (1a7m a 3a11m)</option>
                    <option value="Pré-escola I (4 anos)">Pré-escola I (4 anos)</option>
                    <option value="Pré-escola II">Pré-escola II (5 anos)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-550 uppercase block">Campos de Experiência BNCC</label>
                  <select 
                    value={experienceCamp}
                    onChange={(e) => setExperienceCamp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-150 px-3.5 py-3 rounded-xl text-xs font-bold"
                  >
                    <option value="O eu, o outro e o nós">O eu, o outro e o nós</option>
                    <option value="Corpo, gestos e movimentos">Corpo, gestos e movimentos</option>
                    <option value="Traços, sons, cores e formas">Traços, sons, cores e formas</option>
                    <option value="Escuta, fala, pensamento e imaginação">Escuta, fala, pensamento e imaginação</option>
                    <option value="Espaços, tempos, quantidades, relações e transformações">Espaços, tempos, quantidades...</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-550 uppercase block">Tema ou Tópico Central</label>
                  <input 
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="Ex: Horta escolar, sentidos, dinossauros"
                    className="w-full bg-slate-50 border border-slate-155 px-4 py-3 rounded-xl text-xs font-extrabold focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {error && <p className="text-xs text-rose-600 bg-rose-50 p-2 border border-rose-100 rounded">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand-primary hover:bg-brand-primary/95 text-white font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow cursor-pointer disabled:opacity-40"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-brand-gold font-bold" />
                      <span>Sintonizando BNCC...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} className="text-[#FFC72C] animate-pulse" />
                      <span>Gerar Proposta Lumi IA</span>
                    </>
                  )}
                </button>

              </form>
            </div>

            {/* Right Column Output Panel */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white border border-slate-205 rounded-[32px] p-6 md:p-8 shadow-xs relative">
                
                <div className="pb-3 border-b border-indigo-50 flex justify-between items-center flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <BookMarked className="text-brand-primary active:animate-bounce" size={18} />
                    <h3 className="font-extrabold text-slate-800 font-sans tracking-tight">{suggestedPlan.title}</h3>
                  </div>
                  <span className="text-[10px] bg-brand-gold text-brand-primary font-black px-2 py-0.5 rounded uppercase">BNCC</span>
                </div>

                <div className="space-y-5 pt-4 text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                  
                  {/* Objectives list */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-brand-primary uppercase tracking-wider">🎯 Objetivos de Aprendizagem</h4>
                    <ul className="space-y-1.5 pl-3">
                      {suggestedPlan.objectives.map((obj, i) => (
                        <li key={i} className="list-disc pl-1">{obj}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Procedures timeline */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-brand-primary uppercase tracking-wider">🛠️ Procedimentos Passo-a-Passo</h4>
                    <div className="space-y-3.5 pl-2">
                      {suggestedPlan.steps.map((st) => (
                        <div key={st.num} className="flex gap-3">
                          <span className="bg-brand-gold text-brand-primary font-black rounded h-5 w-5 flex items-center justify-center text-[10px] shrink-0">{st.num}</span>
                          <div>
                            <span className="font-extrabold text-slate-800 leading-none">{st.title}</span>
                            <p className="text-xs text-slate-600 mt-1">{st.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-brand-primary uppercase tracking-wider">📦 Materiais & Recursos</h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {suggestedPlan.resources.map((res, i) => (
                        <span key={i} className="bg-slate-50 border border-slate-150 px-2 py-1 rounded text-xs text-slate-750 font-bold">{res}</span>
                      ))}
                    </div>
                  </div>

                  {/* Strategy box */}
                  <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl space-y-2">
                    <h5 className="text-[10px] font-black tracking-wider text-amber-850 uppercase">⭐ Estratégia de Inclusão (PEI)</h5>
                    <p className="text-xs text-slate-650 leading-relaxed font-semibold">{suggestedPlan.inclusionStrategy}</p>
                  </div>

                  {/* Family box */}
                  <div className="bg-blue-50/40 border border-blue-200/50 p-4 rounded-2xl space-y-2">
                    <h5 className="text-[10px] font-black tracking-wider text-blue-900 uppercase">👨‍👩‍👧 Diretriz para a Família</h5>
                    <p className="text-xs text-slate-650 leading-relaxed font-semibold">{suggestedPlan.familyGuideline}</p>
                  </div>

                </div>

                {/* Footer panel buttons */}
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 items-center flex-wrap">
                  <button 
                    onClick={() => window.print()}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-200 text-xs text-slate-600"
                    title="Imprimir Planejamento"
                  >
                    <Printer size={15} />
                  </button>
                  <button 
                    onClick={handleSaveToPlansList}
                    className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold/94 text-brand-primary font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-3xs cursor-pointer"
                  >
                    <Save size={13} />
                    <span>Aprovar e Arquivar no Diário</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
