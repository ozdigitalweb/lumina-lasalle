import React, { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  Award, 
  BookOpen, 
  HeartPulse, 
  ShieldAlert, 
  ArrowRight, 
  Eye, 
  Calendar, 
  Clock, 
  Utensils, 
  HelpCircle, 
  MoreVertical, 
  MessageSquare, 
  GraduationCap,
  Smile,
  HeartHandshake,
  UserPlus
} from 'lucide-react';
import { Student, RoutineState } from '../types';

interface DashboardProps {
  students: Student[];
  routines: RoutineState[];
  onNavigate: (tab: string) => void;
  currentUser?: any;
}

export default function Dashboard({ students, routines, onNavigate, currentUser }: DashboardProps) {
  const [showLumiPopup, setShowLumiPopup] = useState(true);
  const [lumiStatus, setLumiStatus] = useState<string | null>(null);

  const isParent = currentUser?.role === 'Responsável';

  const handleLumiSolve = () => {
    setLumiStatus("loading");
    setTimeout(() => {
      setLumiStatus("success");
    }, 1500);
  };

  const getFamilyName = (): string => {
    if (!currentUser) return "Família";
    const name = currentUser.name || "";
    if (name.includes("Ricardo")) return "Família Dias";
    if (name.includes("Mariana")) return "Família Almeida";
    if (name.includes("Carlos")) return "Família Rocha";
    if (name.includes("Patrícula") || name.includes("Patrícia")) return "Família Souza";
    if (name.includes("Fernanda")) return "Família Costa";
    if (name.includes("Gustavo")) return "Família Pinheiro";
    return name.replace(/\([^)]*\)/g, "").trim(); 
  };

  // Map parents to student IDs exactly
  const getParentsChildrenIds = (): string[] => {
    const email = currentUser?.email?.toLowerCase() || '';
    let baseIds: string[] = [];
    if (email === 'ricardo.responsavel@lasalle.org') baseIds = ['student-1', 'student-5', 'student-6']; // Guto, Alice, Bruno
    else if (email === 'mariana.almeida@lasalle.org') baseIds = ['student-7', 'student-8']; // Leo, Guilherme
    else if (email === 'carlos.rocha@lasalle.org') baseIds = ['student-3', 'student-9', 'student-10']; // Theo, Sophia, Lucas
    else if (email === 'patricia.souza@lasalle.org') baseIds = ['student-2', 'student-11']; // Helena, Pedro
    else if (email === 'fernanda.costa@lasalle.org') baseIds = ['student-4', 'student-12', 'student-13']; // Beatriz, Gabriel, Clara
    else if (email === 'gustavo.pinheiro@lasalle.org') baseIds = ['student-14', 'student-15']; // Laura, Enzo
    else baseIds = ['student-1', 'student-2', 'student-3']; // backup default

    // Add dynamically enrolled student ids for this parent
    const dynamicIds = students
      .filter((s: any) => s.parentEmail?.toLowerCase() === email)
      .map(s => s.id);

    return Array.from(new Set([...baseIds, ...dynamicIds]));
  };

  // Helper to fetch/simulate student routine for the parent's dashboard view
  const getChildRoutine = (childId: string): RoutineState => {
    const existing = routines.find(r => r.studentId === childId);
    if (existing) return existing;
    
    // Default simulated routines matching child personalities
    const dateStr = new Date().toISOString().split('T')[0];
    if (childId === 'student-5') {
      return { id: 'm-r-5', studentId: childId, date: dateStr, meals: 'excellent', sleep: 'good', hygiene: 'ok', mood: 'happy', observations: 'Alice aceitou muito bem o almoço e as frutas. Brincou bastante de pintura e demonstrou excelente interatividade.' };
    }
    if (childId === 'student-6') {
      return { id: 'm-r-6', studentId: childId, date: dateStr, meals: 'good' as any, sleep: 'good', hygiene: 'ok', mood: 'calm', observations: 'Bruno participou com alegria do circuito motor. Brincou de forma cooperativa dividindo blocos no parque.' };
    }
    if (childId === 'student-7') {
      return { id: 'm-r-7', studentId: childId, date: dateStr, meals: 'excellent', sleep: 'good', hygiene: 'ok', mood: 'happy', observations: 'Leo esteve focado na aula de artes plásticas hoje. Expressou criatividade desenhando dinossauros.' };
    }
    if (childId === 'student-8') {
      return { id: 'm-r-8', studentId: childId, date: dateStr, meals: 'excellent', sleep: 'good', hygiene: 'ok', mood: 'happy', observations: 'Guilherme adorou móbiles e cantou bastante na rodinha afetiva. Dormiu profundamente por 1h40m.' };
    }
    if (childId === 'student-9') {
      return { id: 'm-r-9', studentId: childId, date: dateStr, meals: 'excellent', sleep: 'good', hygiene: 'ok', mood: 'calm', observations: 'Sophia tomou mamadeira completa e aceitou papinha de maçã. Tirou duas ótimas sonecas hoje.' };
    }
    if (childId === 'student-10') {
      return { id: 'm-r-10', studentId: childId, date: dateStr, meals: 'medium', sleep: 'good', hygiene: 'ok', mood: 'happy', observations: 'Lucas treinou seu equilíbrio tátil no circuito divertido de cordas e fitas de forma super confiante.' };
    }
    if (childId === 'student-11') {
      return { id: 'm-r-11', studentId: childId, date: dateStr, meals: 'excellent', sleep: 'good', hygiene: 'ok', mood: 'happy', observations: 'Pedro correu bastante na quadra conduzindo ondulações do paraquedas gigante de tecidos.' };
    }
    if (childId === 'student-12') {
      return { id: 'm-r-12', studentId: childId, date: dateStr, meals: 'excellent', sleep: 'good', hygiene: 'ok', mood: 'happy', observations: 'Gabriel moldou casinhas de gesso decorando as janelas de cores vibrantes brilhantes.' };
    }
    if (childId === 'student-13') {
      return { id: 'm-r-13', studentId: childId, date: dateStr, meals: 'medium', sleep: 'good', hygiene: 'ok', mood: 'happy', observations: 'Clara descansou olhando gibizinhos e dividiu colchonetes com os amiguinhos com muita doçura.' };
    }
    if (childId === 'student-14') {
      return { id: 'm-r-14', studentId: childId, date: dateStr, meals: 'excellent', sleep: 'good', hygiene: 'ok', mood: 'happy', observations: 'Laura tocou tamborzinho mantendo o ritmo perfeitamente e aprendeu novas rimas.' };
    }
    if (childId === 'student-15') {
      return { id: 'm-r-15', studentId: childId, date: dateStr, meals: 'excellent', sleep: 'good', hygiene: 'ok', mood: 'happy', observations: 'Enzo adorou os jogos de cooperação física com bambolês na quadra de esportes.' };
    }
    return {
      id: `default-r-${childId}`,
      studentId: childId,
      date: dateStr,
      meals: 'excellent',
      sleep: 'good',
      hygiene: 'ok',
      mood: 'happy',
      observations: 'Participação ativa e contente em todas as vivências lúdicas do dia letivo.'
    };
  };

  const myChildrenIds = getParentsChildrenIds();
  const myChildren = students.filter(s => myChildrenIds.includes(s.id));
  const familyName = getFamilyName();

  // Color mapping utilities
  const getMealBadge = (val?: string) => {
    if (val === 'excellent') {
      return <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50 rounded-lg">Nutrição Excelente</span>;
    }
    if (val === 'medium' || val === 'good') {
      return <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/50 rounded-lg">Nutrição Média</span>;
    }
    return <span className="px-2.5 py-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/50 rounded-lg">Nutrição Parcial / Recusou</span>;
  };

  const getSleepBadge = (val?: string) => {
    if (val === 'good') {
      return <span className="px-2.5 py-1 text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200/50 rounded-lg">Dormiu Bem</span>;
    }
    if (val === 'restless') {
      return <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/50 rounded-lg">Sono Agitado</span>;
    }
    return <span className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200 rounded-lg">Não Dormiu</span>;
  };

  const getHygieneBadge = (val?: string) => {
    if (val === 'ok') {
      return <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50 rounded-lg">Higiene OK</span>;
    }
    if (val === 'wet') {
      return <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/50 rounded-lg">Troca de Xixi</span>;
    }
    if (val === 'dirty') {
      return <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-350 rounded-lg">Troca Fecal</span>;
    }
    return <span className="px-2.5 py-1 text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/50 rounded-lg">Banho Relatado</span>;
  };

  const getMoodBadge = (val?: string) => {
    if (val === 'happy') {
      return <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50 rounded-lg">Humor: Alegre 😊</span>;
    }
    if (val === 'calm') {
      return <span className="px-2.5 py-1 text-[11px] font-bold bg-slate-50 text-slate-700 border border-slate-200 rounded-lg">Humor: Calmo 😌</span>;
    }
    if (val === 'crying') {
      return <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/50 rounded-lg">Humor: Choroso 🥺</span>;
    }
    return <span className="px-2.5 py-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-250 rounded-lg">Humor: Febre/Doi 🤒</span>;
  };

  // PARENT SPECIFIC VIEW
  if (isParent) {
    return (
      <div className="space-y-8 animate-fade-in text-slate-800">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-brand-gold text-brand-primary font-black px-2.5 py-1 rounded-sm tracking-wider uppercase">
                Área de Acompanhamento da Família
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Atualizado agora mesmo
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tight">
              Olá, {familyName}!
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              Abaixo estão listadas as informações de rotina, cuidado e desenvolvimento pedagógico dos seus filhos.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 self-start md:self-center">
            <button 
              onClick={() => onNavigate('matriculas')}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-light hover:bg-blue-100 text-brand-primary border border-brand-primary/25 font-extrabold rounded-xl text-xs transition-all shadow-sm cursor-pointer"
            >
              <UserPlus size={15} className="text-brand-primary animate-pulse" />
              <span>Nova Matrícula 2026</span>
            </button>
            <button 
              onClick={() => onNavigate('familia')}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              <HeartHandshake size={15} className="text-brand-gold" />
              <span>Espaço Família Completo</span>
            </button>
            <button 
              onClick={() => onNavigate('school_calendar')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-705 font-bold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
            >
              <Calendar size={15} className="text-brand-primary" />
              <span>Calendário Escolar</span>
            </button>
          </div>
        </div>

        {/* HIGH IMPACT REGISTRATION BANNER FOR PARENTS */}
        <div className="bg-gradient-to-r from-[#002D62] to-[#004B87] text-white rounded-[24px] p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-blue-400/20">
          <div className="space-y-1.5 max-w-2xl text-left">
            <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-sm tracking-wider uppercase inline-block">
              MATRÍCULAS ABERTAS - ANO LETIVO 2026
            </span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight">
              Deseja matricular um novo aluno ou mais um filho?
            </h3>
            <p className="text-blue-100 text-xs md:text-sm font-medium">
              Aproveite o processo 100% digital integrado da Secretaria La Salle. O preenchimento leva menos de 5 minutos e sincroniza diretamente com a equipe de coordenação.
            </p>
          </div>
          <button
            onClick={() => onNavigate('matriculas')}
            className="shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2 border border-amber-500 hover:scale-105 active:scale-95 duration-150"
          >
            <UserPlus size={16} className="text-slate-950 animate-bounce" />
            <span>Matricular Novo Aluno</span>
          </button>
        </div>

        {/* Dynamic Cards list - strictly arranged per-child */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-brand-primary uppercase tracking-wider border-b border-slate-200/60 pb-2">
            Seus Filhos Matriculados ({myChildren.length})
          </h3>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {myChildren.map((child) => {
              const routine = getChildRoutine(child.id);
              return (
                <div 
                  key={child.id} 
                  className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    {/* Header profile info */}
                    <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-brand-light text-brand-primary rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm overflow-hidden shrink-0">
                          {child.photo ? (
                            <img src={child.photo} alt={child.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <span>{child.name.includes('Guto') || child.name.includes('Guilherme') || child.name.includes('Beatriz') || child.name.includes('Sophia') ? '👶' : '👦'}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="text-xl font-extrabold text-slate-900 leading-tight">
                            {child.name}
                          </h4>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                            {child.className} • {child.age}
                          </p>
                        </div>
                      </div>
                      
                      {child.hasSpecialNeeds && (
                        <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200/60 px-3 py-1 font-black rounded-full uppercase tracking-wider">
                          Plano PEI Ativo
                        </span>
                      )}
                    </div>

                    {/* Inclusion / PEI specific plan section if applicable */}
                    {child.hasSpecialNeeds && child.peiPlan && (
                      <div className="bg-amber-50/40 border border-amber-200/55 p-4 rounded-2xl space-y-1.5 shadow-2xs">
                        <p className="text-[10px] font-black text-amber-850 uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldAlert size={12} className="text-amber-600" />
                          Linhas de Apoio Individualizado (Foco Pedagógico)
                        </p>
                        <p className="text-xs text-slate-650 font-medium leading-relaxed">
                          {child.peiPlan}
                        </p>
                      </div>
                    )}

                    {/* Detailed Routine items for this specific child */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-black text-brand-primary uppercase tracking-widest flex items-center gap-2">
                        <Clock size={14} className="text-brand-gold" />
                        Acompanhamento da Rotina (Hoje)
                      </h5>

                      <div className="grid grid-cols-2 gap-3.5">
                        {/* Nutrition */}
                        <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col justify-between space-y-2">
                          <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider flex items-center gap-1">
                            <Utensils size={11} className="text-brand-primary" /> Almoço / Lanche
                          </span>
                          <div>{getMealBadge(routine.meals)}</div>
                        </div>

                        {/* Sleep */}
                        <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col justify-between space-y-2">
                          <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider flex items-center gap-1">
                            <Clock size={11} className="text-brand-primary" /> Momento de Sono
                          </span>
                          <div>{getSleepBadge(routine.sleep)}</div>
                        </div>

                        {/* Hygiene */}
                        <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col justify-between space-y-2">
                          <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider flex items-center gap-1">
                            <HeartPulse size={11} className="text-brand-primary" /> Trocas / Higiene
                          </span>
                          <div>{getHygieneBadge(routine.hygiene)}</div>
                        </div>

                        {/* Wellbeing & Mood */}
                        <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col justify-between space-y-2">
                          <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider flex items-center gap-1">
                            <Smile size={11} className="text-brand-primary" /> Humor e Emoções
                          </span>
                          <div>{getMoodBadge(routine.mood)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Teacher's pedagogical observation text */}
                    {routine.observations && (
                      <div className="bg-slate-50/70 border border-slate-200/50 p-4.5 rounded-2xl space-y-1.5">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Diário Pedagógico & Afetivo da Professora
                        </p>
                        <p className="text-xs text-slate-650 italic font-semibold leading-relaxed">
                          "{routine.observations}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions for this student */}
                  <div className="pt-4 border-t border-slate-100 flex gap-3 mt-4">
                    <button 
                      onClick={() => onNavigate('familia')}
                      className="flex-1 py-3 px-4 bg-slate-50 border border-slate-200 hover:border-slate-350 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Eye size={13} className="text-brand-primary" />
                      <span>Fotos e Relatórios completos</span>
                    </button>
                    <button 
                      onClick={() => onNavigate('lumi')}
                      className="py-3 px-4 bg-brand-light hover:bg-blue-100 text-brand-primary rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Sparkles size={13} className="text-brand-gold animate-pulse" />
                      <span>Falar com Lumi</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner about Lassalian values */}
        <div className="bg-[#002D62] text-white p-8 rounded-[36px] border border-[#003B80] shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 relative z-10 text-center md:text-left max-w-xl">
            <h4 className="text-lg font-extrabold text-brand-gold tracking-tight">Projeto Escolar: "Estamos Todos Conectados"</h4>
            <p className="text-xs text-blue-100 font-medium leading-relaxed">
              O La Salle Conecta promove uma ponte afetiva viva entre a escola e o lar, mantendo os pais cientes e seguros sobre todos os passos de bem-estar de seus amados filhos.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('school_calendar')}
            className="shrink-0 bg-white/10 hover:bg-white/15 border border-white/10 py-3.5 px-6 rounded-2xl text-xs font-bold text-white transition-all cursor-pointer relative z-10"
          >
            Ver Calendário de Eventos da Escola
          </button>
        </div>

      </div>
    );
  }

  // STANDARD TEACHER / ADMIN VIEW (PRESERVED)
  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Top Welcome Title & Subtitle with Day Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-brand-gold text-brand-primary font-black px-2.5 py-1 rounded-sm tracking-wider uppercase">
              DIA LETIVO 142
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              Segunda-feira, 12 de Agosto
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-brand-primary tracking-tight">
            Bom dia, {currentUser?.name || "Professora"}!
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Pronta para iluminar novos caminhos hoje?
          </p>
        </div>

        {/* Quick Action Navigation Buttons matching top right */}
        <div className="flex flex-wrap gap-2 sm:gap-3 self-start md:self-center">
          {(currentUser?.role === 'Coordenador' || currentUser?.role === 'Administrador') && (
            <button 
              onClick={() => onNavigate('matriculas')}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-light hover:bg-blue-100 text-brand-primary border border-brand-primary/25 font-extrabold rounded-xl text-xs transition-all shadow-sm cursor-pointer"
            >
              <UserPlus size={15} className="text-brand-primary" />
              <span>Análise de Matrículas</span>
            </button>
          )}

          <button 
            id="dash-btn-diario"
            onClick={() => onNavigate('cuidado')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-705 font-bold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
          >
            <BookOpen size={15} className="text-brand-primary" />
            <span>Diário Digital</span>
          </button>
          
          <button 
            id="dash-btn-obs"
            onClick={() => onNavigate('inclusao')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-705 font-bold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
          >
            <Eye size={15} className="text-brand-primary" />
            <span>Observações</span>
          </button>

          <button 
            id="dash-btn-planejar"
            onClick={() => onNavigate('pedagogia')}
            className="flex items-center gap-2 px-4.5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            <Sparkles size={15} className="text-brand-gold" />
            <span>Planejamento IA</span>
          </button>
        </div>
      </div>

      {/* Main Column Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Grid Section: Classroom cards & Upcoming lessons */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Classrooms Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Class Cards 1 */}
            <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-xs relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-50 text-brand-secondary rounded-2xl flex items-center justify-center">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">1º Ano A</h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">24 Alunos Ativos</p>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  MANHÃ
                </span>
              </div>
              <div className="h-12 bg-slate-50/10 rounded-xl mb-4"></div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onNavigate('cuidado')}
                  className="flex-1 py-3 px-4 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Diário Digital</span>
                </button>
                <button className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-550 rounded-xl transition-all cursor-pointer">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Class Cards 2 */}
            <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-xs relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-violet-50 text-violet-700 rounded-2xl flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">2º Ano B</h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">18 Alunos Ativos</p>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  TARDE
                </span>
              </div>
              <div className="h-12 bg-slate-50/10 rounded-xl mb-4"></div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onNavigate('cuidado')}
                  className="flex-1 py-3 px-4 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Diário Digital</span>
                </button>
                <button className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-550 rounded-xl transition-all cursor-pointer">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* Upcoming Plans Section */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-brand-primary tracking-tight">
                Próximos Planejamentos
              </h3>
              <button 
                onClick={() => onNavigate('pedagogia')}
                className="text-xs text-brand-secondary hover:text-brand-primary font-bold flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Ver calendário completo</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Timeline Flow */}
            <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              
              {/* Timeline Item 1 */}
              <div className="relative group">
                <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-brand-gold border-4 border-white shadow-xs group-hover:scale-110 transition-transform"></div>
                <div className="bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2.5 transition-all">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10px] text-slate-450 font-black tracking-widest uppercase">
                      AMANHÃ, 13 AGO
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] bg-brand-primary text-white font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      <Sparkles size={10} className="text-brand-gold animate-pulse" />
                      LUMI IA
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800">
                    Explorando o Ciclo da Água
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                    Atividade prática com experimentos e contação de história interativa estimulando a curiosidade natural sobre fenômenos da natureza.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative group">
                <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-xs group-hover:scale-110 transition-transform"></div>
                <div className="bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2.5 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-450 font-black tracking-widest uppercase">
                      QUARTA, 14 AGO
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800">
                    Iniciação à Alfabetização: Letra M
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                    Música e jogos motores para reconhecimento fonético da letra M em roda de conversa afetuosa e desenhos de tracejados.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Grid Section: Pending Records sidebar style container */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Pending Tasks Panel with speech bubble helper beneath */}
          <div className="bg-rose-50/30 border border-slate-200/90 rounded-[32px] p-6 shadow-xs space-y-5">
            <h3 className="font-extrabold text-slate-850 text-base flex items-center gap-2 pb-2 border-b border-rose-100">
              <span className="text-rose-500 text-lg">⚠️</span>
              <span className="text-brand-primary">Registros Pendentes</span>
            </h3>

            {/* List */}
            <div className="space-y-3">
              
              {/* Item 1 */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 leading-none">Chamada - 1º Ano A</h4>
                    <span className="text-[10px] text-slate-400 font-medium">Venceu há 2 horas</span>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate('cuidado')}
                  className="text-xs font-bold text-brand-secondary hover:text-brand-primary transition-colors pr-1 cursor-pointer"
                >
                  Fazer
                </button>
              </div>

              {/* Item 2 */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <Utensils size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 leading-none">Higiene & Alimentação</h4>
                    <span className="text-[10px] text-slate-400 font-medium">Turma Berçário II</span>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate('cuidado')}
                  className="text-xs font-bold text-brand-secondary hover:text-brand-primary transition-colors pr-1 cursor-pointer"
                >
                  Fazer
                </button>
              </div>

              {/* Item 3 */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                    <HelpCircle size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 leading-none">Obs. Pedagógicas</h4>
                    <span className="text-[10px] text-slate-400 font-medium">3 alunos sem registro</span>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate('inclusao')}
                  className="text-xs font-bold text-brand-secondary hover:text-brand-primary transition-colors pr-1 cursor-pointer"
                >
                  Ver
                </button>
              </div>

            </div>

            {/* Lumi Assistant Speech Bubble overlay card */}
            {showLumiPopup && (
              <div className="relative mt-4 bg-white rounded-3xl p-4.5 border border-slate-200/80 shadow-md animate-fade-in space-y-3.5 before:absolute before:bottom-[100%] before:right-8 before:w-0 before:h-0 before:border-8 before:border-transparent before:border-bottom-white">
                
                {/* Floating mascot badge */}
                <div className="absolute -top-3.5 -left-3.5 w-8 h-8 rounded-full bg-brand-gold text-slate-900 font-bold flex items-center justify-center shadow-md animate-bounce">
                  ✨
                </div>

                <p className="text-xs font-medium text-slate-650 leading-relaxed pl-1 pt-1">
                  "Olá! Percebi que você tem <strong>3 registros pendentes</strong> hoje. Quer que eu te ajude a preencher agora usando as notas de voz e anotações expressivas?"
                </p>

                <div className="flex gap-2 text-[11px] font-bold">
                  {lumiStatus === null && (
                    <>
                      <button 
                        onClick={handleLumiSolve}
                        className="px-3.5 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-lg transition-all cursor-pointer"
                      >
                        Sim, vamos lá
                      </button>
                      <button 
                        onClick={() => setShowLumiPopup(false)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-150 text-slate-600 rounded-lg transition-all cursor-pointer"
                      >
                        Mais tarde
                      </button>
                    </>
                  )}

                  {lumiStatus === "loading" && (
                    <span className="text-brand-primary animate-pulse py-1">Carregando sugestões de preenchimento...</span>
                  )}

                  {lumiStatus === "success" && (
                    <span className="text-emerald-700 py-1 font-semibold flex items-center gap-1">
                      ✓ Preenchimentos gerados com sucesso! Verifique no Diário.
                    </span>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Presence Bar Charts */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-black text-brand-primary uppercase tracking-widest flex items-center gap-2">
              <span>📊 Frequência</span>
            </h4>

            {/* Bar columns container */}
            <div className="flex justify-between items-end h-24 pt-2 pb-1 border-b border-slate-100 px-2">
              <div className="flex flex-col items-center gap-1.5 w-8">
                <div className="w-5 bg-brand-gold rounded-xs transition-all h-[90%]"></div>
                <span className="text-[10px] text-slate-400 font-bold">S</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-8">
                <div className="w-5 bg-brand-gold rounded-xs transition-all h-[80%]"></div>
                <span className="text-[10px] text-slate-400 font-bold">T</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-8">
                <div className="w-5 bg-brand-gold rounded-xs transition-all h-[92%]"></div>
                <span className="text-[10px] text-slate-400 font-bold">Q</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-8">
                <div className="w-5 bg-brand-gold rounded-xs transition-all h-[75%]"></div>
                <span className="text-[10px] text-slate-400 font-bold">Q</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-8">
                <div className="w-5 bg-brand-gold rounded-xs transition-all h-[95%]"></div>
                <span className="text-[10px] text-slate-400 font-bold">S</span>
              </div>
            </div>

            {/* Charts footer stats */}
            <div className="grid grid-cols-2 gap-4 text-center pt-2">
              <div>
                <p className="text-lg font-black text-slate-800">92%</p>
                <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Presença Média</p>
              </div>
              <div className="border-l border-slate-100">
                <p className="text-lg font-black text-[#FFC72C]">3</p>
                <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Faltas Críticas</p>
              </div>
            </div>
          </div>

          {/* Recent Messages Widget */}
          <div className="bg-[#002D62] text-white rounded-[32px] p-6 shadow-md border border-[#003B80] space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <span>✉️ Mensagens Recentes</span>
            </h4>

            {/* Messages list */}
            <div className="space-y-3">
              
              {/* Message 1 */}
              <div className="bg-white/10 hover:bg-white/15 rounded-2xl p-4.5 border border-white/5 transition-all flex items-center shadow-xs gap-3.5 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-slate-300 overflow-hidden ring-2 ring-white/10 shrink-0 flex items-center justify-center font-bold text-slate-700">
                  👩
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white leading-none">Mãe do Arthur (1ºA)</h4>
                  <p className="text-[11px] text-blue-100/80 mt-1 truncate max-w-[180px]">
                    "Professora, o Arthur está com febre..."
                  </p>
                </div>
              </div>

              {/* Message 2 */}
              <div className="bg-white/10 hover:bg-white/15 rounded-2xl p-4.5 border border-white/5 transition-all flex items-center shadow-xs gap-3.5 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-brand-gold text-slate-900 font-extrabold text-xs shrink-0 flex items-center justify-center shadow-sm">
                  CP
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white leading-none">Coord. Pedagógica</h4>
                  <p className="text-[11px] text-blue-100/80 mt-1 truncate max-w-[180px]">
                    "Helena, podemos revisar o plano da..."
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
