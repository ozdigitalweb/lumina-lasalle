import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Home, 
  GraduationCap, 
  HeartHandshake, 
  Activity, 
  UsersRound, 
  Lightbulb, 
  Menu, 
  X, 
  UserCircle,
  Layers,
  Calendar,
  FileSpreadsheet,
  Megaphone,
  ShieldAlert,
  Globe,
  ClipboardList,
  UserPlus
} from 'lucide-react';
import { 
  Student, 
  RoutineState, 
  PedagogicalPlan, 
  InclusionReport, 
  FeedPost, 
  ChatMessage 
} from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_ROUTINES, 
  INITIAL_PEDAGOGICAL_PLANS, 
  INITIAL_INCLUSION_REPORTS, 
  INITIAL_FEED_POSTS 
} from './initialData';

// Modular child components
import Dashboard from './components/Dashboard';
import PedagogyPlanner from './components/PedagogyPlanner';
import CareRoutine from './components/CareRoutine';
import InclusionPortal from './components/InclusionPortal';
import FamilyFeed from './components/FamilyFeed';
import LumiAssistant from './components/LumiAssistant';
import DidacticSequences from './components/DidacticSequences';
import LoginScreen from './components/LoginScreen';
import AccessManager from './components/AccessManager';
import SchoolRegistries from './components/SchoolRegistries';
import ProfessionalCare from './components/ProfessionalCare';
import StudentEnrollment from './components/StudentEnrollment';

// Image Replica Mockup Dashboards
import SchoolCalendar from './components/SchoolCalendar';
import EventManagement from './components/EventManagement';
import MuralDestaques from './components/MuralDestaques';
import SchoolDashboard from './components/SchoolDashboard';
import MacroDashboard from './components/MacroDashboard';

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Coordenador' | 'Professor' | 'Responsável';
  className?: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // User auth state
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    const saved = localStorage.getItem('la_salle_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (user: CurrentUser) => {
    setCurrentUser(user);
    localStorage.setItem('la_salle_user', JSON.stringify(user));
    if (user.email === 'novo.responsavel@lasalle.org') {
      setActiveTab('matriculas');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('la_salle_user');
  };

  // States with localStorage durability
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('la_salle_students');
    if (saved) {
      try {
        const parsed: Student[] = JSON.parse(saved);
        const merged = [...parsed];
        INITIAL_STUDENTS.forEach(init => {
          const existingIdx = merged.findIndex(s => s.id === init.id);
          if (existingIdx !== -1) {
            merged[existingIdx] = {
              ...merged[existingIdx],
              classId: init.classId,
              className: init.className
            };
          } else {
            merged.push(init);
          }
        });
        return merged;
      } catch (e) {
        return INITIAL_STUDENTS;
      }
    }
    return INITIAL_STUDENTS;
  });

  const [routines, setRoutines] = useState<RoutineState[]>(() => {
    const saved = localStorage.getItem('la_salle_routines');
    return saved ? JSON.parse(saved) : INITIAL_ROUTINES;
  });

  const [plans, setPlans] = useState<PedagogicalPlan[]>(() => {
    const saved = localStorage.getItem('la_salle_plans');
    return saved ? JSON.parse(saved) : INITIAL_PEDAGOGICAL_PLANS;
  });

  const [reports, setReports] = useState<InclusionReport[]>(() => {
    const saved = localStorage.getItem('la_salle_reports');
    return saved ? JSON.parse(saved) : INITIAL_INCLUSION_REPORTS;
  });

  const [posts, setPosts] = useState<FeedPost[]>(() => {
    const saved = localStorage.getItem('la_salle_posts');
    return saved ? JSON.parse(saved) : INITIAL_FEED_POSTS;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('la_salle_chat_messages');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist edits to localStorage
  useEffect(() => {
    localStorage.setItem('la_salle_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('la_salle_routines', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('la_salle_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('la_salle_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('la_salle_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('la_salle_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Action methods
  const handleAddPlan = (newPlan: PedagogicalPlan) => {
    setPlans([newPlan, ...plans]);
  };

  const handleSaveRoutine = (updatedRoutine: RoutineState) => {
    const index = routines.findIndex(r => r.studentId === updatedRoutine.studentId && r.date === updatedRoutine.date);
    if (index >= 0) {
      const copy = [...routines];
      copy[index] = updatedRoutine;
      setRoutines(copy);
    } else {
      setRoutines([updatedRoutine, ...routines]);
    }
  };

  const handleAddReport = (newReport: InclusionReport) => {
    setReports([newReport, ...reports]);
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: `comment-${Date.now()}`,
          author: 'Silvia (Professora Coordenadora)',
          text: text,
          date: 'Agora mesmo'
        };
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));
  };

  const handleSendMessage = async (rawText: string): Promise<string> => {
    const userMsg: ChatMessage = {
      id: `chat-${Date.now()}-user`,
      sender: 'user',
      text: rawText,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);

    const historyPayload = chatMessages.slice(-5).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text
    }));

    try {
      const response = await fetch('/api/lumi/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: rawText,
          history: historyPayload,
          currentUser: currentUser
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao obter resposta de Lumi.');
      }

      const data = await response.json();
      const assistantText = data.text;

      const lumiMsg: ChatMessage = {
        id: `chat-${Date.now()}-lumi`,
        sender: 'lumi',
        text: assistantText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages((prev) => [...prev, lumiMsg]);
      return assistantText;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Helper to filter students so they only appear to the tutor/teacher of the class they are enrolled in
  const getFilteredStudentsForUser = (user: CurrentUser | null, allStudents: Student[]): Student[] => {
    if (!user) return [];
    if (user.role !== 'Professor') {
      return allStudents;
    }

    const email = user.email.toLowerCase();

    try {
      const savedTeachers = localStorage.getItem('la_salle_teachers');
      const savedClasses = localStorage.getItem('la_salle_classes');

      let teachersList: any[] = [];
      let classesList: any[] = [];

      if (savedTeachers) {
        teachersList = JSON.parse(savedTeachers);
      } else {
        teachersList = [
          { id: 'teacher-1', name: 'Profª Luciana Martins', code: 'PE-4122', email: 'luciana.admin@lasalle.org', phone: '(61) 98114-5511', status: 'Ativo' },
          { id: 'teacher-2', name: 'Prof. Pedro Reis', code: 'PE-2510', email: 'pedro.professor@lasalle.org', phone: '(61) 98455-8822', status: 'Ativo' },
          { id: 'teacher-3', name: 'Profª Bruna Santos', code: 'PE-7723', email: 'bruna.santos@lasalle.org', phone: '(61) 99122-3344', status: 'Ativo' },
          { id: 'teacher-4', name: 'Profª Sílvia Coordenadora', code: 'PE-1002', email: 'silvia.coord@lasalle.org', phone: '(61) 98233-4400', status: 'Ativo' },
          { id: 'teacher-5', name: 'Profª Amanda Costa', code: 'PE-5100', email: 'amanda.costa@lasalle.org', phone: '(61) 98122-0005', status: 'Ativo' },
          { id: 'teacher-6', name: 'Prof. Fernando Lima', code: 'PE-6100', email: 'fernando.lima@lasalle.org', phone: '(61) 98122-0006', status: 'Ativo' },
          { id: 'teacher-7', name: 'Profª Camila Rodrigues', code: 'PE-7100', email: 'camila.rodrigues@lasalle.org', phone: '(61) 98122-0007', status: 'Ativo' },
          { id: 'teacher-8', name: 'Profª Daniela Souza', code: 'PE-8100', email: 'daniela.souza@lasalle.org', phone: '(61) 98122-0008', status: 'Ativo' },
          { id: 'teacher-9', name: 'Prof. Rodrigo Ramos', code: 'PE-9100', email: 'rodrigo.ramos@lasalle.org', phone: '(61) 98122-0009', status: 'Ativo' },
          // Novos professores - Ensino Fundamental e Médio
          { id: 'teacher-10', name: 'Profª Clara Mendes', code: 'PE-1010', email: 'clara.mendes@lasalle.org', phone: '(61) 98220-1010', status: 'Ativo' },
          { id: 'teacher-11', name: 'Prof. Roberto Santos', code: 'PE-1111', email: 'roberto.santos@lasalle.org', phone: '(61) 98220-1111', status: 'Ativo' },
          { id: 'teacher-12', name: 'Profª Paula Lima', code: 'PE-1212', email: 'paula.lima@lasalle.org', phone: '(61) 98220-1212', status: 'Ativo' },
          { id: 'teacher-13', name: 'Prof. Carlos Souza', code: 'PE-1313', email: 'carlos.souza@lasalle.org', phone: '(61) 98220-1313', status: 'Ativo' }
        ];
      }

      if (savedClasses) {
        classesList = JSON.parse(savedClasses);
      } else {
        classesList = [
          { id: 'maternal-2', name: 'Maternal II', gradeId: 'grade-3', schoolId: 'school-1', teacherId: 'teacher-2', shift: 'Integral' },
          { id: 'infantil-2', name: 'Infantil II - B', gradeId: 'grade-4', schoolId: 'school-1', teacherId: 'teacher-1', shift: 'Tarde' },
          { id: 'bercario-1', name: 'Berçário I', gradeId: 'grade-1', schoolId: 'school-1', teacherId: 'teacher-3', shift: 'Manhã' },
          { id: 'maternal-1', name: 'Maternal I', gradeId: 'grade-2', schoolId: 'school-1', teacherId: 'teacher-3', shift: 'Integral' },
          { id: 'infantil-3', name: 'Infantil III - A', gradeId: 'grade-5', schoolId: 'school-1', teacherId: 'teacher-4', shift: 'Manhã' },
          { id: 'bercario-2', name: 'Berçário II - B', gradeId: 'grade-1', schoolId: 'school-1', teacherId: 'teacher-5', shift: 'Tarde' },
          { id: 'maternal-1b', name: 'Maternal I - B', gradeId: 'grade-2', schoolId: 'school-1', teacherId: 'teacher-6', shift: 'Integral' },
          { id: 'maternal-2b', name: 'Maternal II - B', gradeId: 'grade-3', schoolId: 'school-1', teacherId: 'teacher-7', shift: 'Manhã' },
          { id: 'infantil-2c', name: 'Infantil II - C', gradeId: 'grade-4', schoolId: 'school-1', teacherId: 'teacher-8', shift: 'Tarde' },
          { id: 'infantil-3b', name: 'Infantil III - B', gradeId: 'grade-5', schoolId: 'school-1', teacherId: 'teacher-9', shift: 'Integral' },
          // Novas turmas - Ensino Fundamental I, II e Médio
          { id: 'class-fund-1', name: '1º Ano - Fund. I - A', gradeId: 'grade-6', schoolId: 'school-1', teacherId: 'teacher-10', shift: 'Manhã' },
          { id: 'class-fund-5', name: '5º Ano - Fund. I - B', gradeId: 'grade-7', schoolId: 'school-1', teacherId: 'teacher-10', shift: 'Tarde' },
          { id: 'class-fund-9', name: '9º Ano - Fund. II - A', gradeId: 'grade-8', schoolId: 'school-1', teacherId: 'teacher-11', shift: 'Integral' },
          { id: 'class-medio-1', name: '1º Ano - Ensino Médio A', gradeId: 'grade-9', schoolId: 'school-1', teacherId: 'teacher-12', shift: 'Manhã' },
          { id: 'class-medio-3', name: '3º Ano - Ensino Médio B', gradeId: 'grade-10', schoolId: 'school-1', teacherId: 'teacher-13', shift: 'Integral' }
        ];
      }

      // Find teacher by email
      const teacher = teachersList.find(t => t.email?.toLowerCase() === email);
      if (teacher) {
        // Find all class groups coordinated by this teacher
        const teacherClasses = classesList.filter(c => c.teacherId === teacher.id);
        const teacherClassIds = teacherClasses.map(c => c.id);

        // Return only students in these classes
        return allStudents.filter(s => teacherClassIds.includes(s.classId));
      }
    } catch (err) {
      console.error("Error reading teacher students mapping", err);
    }

    // Static fallback lists based on the initial system roles setup
    if (email === 'luciana.admin@lasalle.org') {
      return allStudents.filter(s => s.classId === 'infantil-2');
    }
    if (email === 'pedro.professor@lasalle.org') {
      return allStudents.filter(s => s.classId === 'maternal-2');
    }
    if (email === 'bruna.santos@lasalle.org') {
      return allStudents.filter(s => ['bercario-1', 'maternal-1'].includes(s.classId));
    }
    if (email === 'silvia.coord@lasalle.org') {
      return allStudents.filter(s => s.classId === 'infantil-3');
    }
    if (email === 'amanda.costa@lasalle.org') {
      return allStudents.filter(s => s.classId === 'bercario-2');
    }
    if (email === 'fernando.lima@lasalle.org') {
      return allStudents.filter(s => s.classId === 'maternal-1b');
    }
    if (email === 'camila.rodrigues@lasalle.org') {
      return allStudents.filter(s => s.classId === 'maternal-2b');
    }
    if (email === 'daniela.souza@lasalle.org') {
      return allStudents.filter(s => s.classId === 'infantil-2c');
    }
    if (email === 'rodrigo.ramos@lasalle.org') {
      return allStudents.filter(s => s.classId === 'infantil-3b');
    }

    return [];
  };

  // Filter tabs dynamically based on user role to demonstrate "Gestor de acesso, com niveis de permissão"
  const getVisibleTabs = () => {
    if (!currentUser) return [];
    
    const all = [
      { id: 'dashboard', name: 'Painel Central', icon: <Home size={18} /> },
      { id: 'school_calendar', name: 'Calendário Lumi', icon: <Calendar size={18} /> },
      { id: 'event_manage', name: 'Gestão de Eventos', icon: <FileSpreadsheet size={18} /> },
      { id: 'mural_destaques', name: 'Mural de Eventos', icon: <Megaphone size={18} /> },
      { id: 'school_dashboard', name: 'Lumi Admin', icon: <ShieldAlert size={18} /> },
      { id: 'macro_dashboard', name: 'Gestão Macro', icon: <Globe size={18} /> },
      { id: 'pedagogia', name: 'Plano BNCC', icon: <GraduationCap size={18} /> },
      { id: 'sequencias', name: 'Sequências Didáticas', icon: <Layers size={18} /> },
      { id: 'cuidado', name: 'Cuidado Diário', icon: <Activity size={18} /> },
      { id: 'inclusao', name: 'Educação Inclusiva', icon: <UsersRound size={18} /> },
      { id: 'familia', name: 'Espaço Família', icon: <HeartHandshake size={18} /> },
      { id: 'atendimento_profissional', name: 'Atendimento Multiprofissional', icon: <HeartHandshake size={18} /> },
      { id: 'lumi', name: 'Falar com Lumi', icon: <Lightbulb size={18} /> },
      { id: 'cadastros_base', name: 'Cadastros Base', icon: <ClipboardList size={18} /> },
      { id: 'matriculas', name: 'Matrícula de Alunos', icon: <UserPlus size={18} /> },
      { id: 'gestor_acesso', name: 'Gestor de Acesso', icon: <Layers size={18} /> }
    ];

    if (currentUser.role === 'Responsável') {
      // Parents only see family, calendar, feed, logs, chat, dashboard, professional care and matriculas
      return all.filter(t => ['dashboard', 'school_calendar', 'mural_destaques', 'cuidado', 'familia', 'lumi', 'atendimento_profissional', 'matriculas'].includes(t.id));
    }
    
    if (currentUser.role === 'Professor') {
      // Teachers see everything except global macro/admin boards, access manager, base registries, event management, and matriculas
      return all.filter(t => !['school_dashboard', 'macro_dashboard', 'gestor_acesso', 'cadastros_base', 'event_manage', 'matriculas'].includes(t.id));
    }

    if (currentUser.role === 'Coordenador') {
      // Coordinator sees all except access manager
      return all.filter(t => !['gestor_acesso'].includes(t.id));
    }

    // Administrador sees all
    return all;
  };

  const visibleTabs = getVisibleTabs();

  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans text-slate-800">
      
      {/* Top Professional Header Bar */}
      <header className="bg-white border-b border-slate-200 h-16 sticky top-0 z-40 px-4 md:px-8 flex justify-between items-center select-none shadow-sm">
        <div className="flex items-center gap-2.5">
          {/* Logo glow circle representing LaSalle Connected philosophy */}
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-extrabold shadow-md shadow-brand-primary/10 border border-brand-primary">
            LS
          </div>
          <div>
            <span className="text-sm font-black text-brand-primary tracking-tight block leading-none">LA SALLE CONECTA</span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider block uppercase">Desenvolvimento da Infância</span>
          </div>
        </div>

        {/* Right accessories */}
        <div className="hidden md:flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2 bg-brand-light text-brand-primary px-3 py-1.5 rounded-full border border-brand-primary/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Estação: {currentUser.role}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <UserCircle size={15} />
            <span>{currentUser.name}</span>
          </div>
          <button 
            type="button"
            onClick={handleLogout}
            className="text-rose-600 hover:text-rose-800 transition font-black cursor-pointer uppercase text-[10px] tracking-wider"
          >
            Sair
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button 
          id="btn-mobile-menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-800"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Main Structural Frame */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* Left Drawer Navigation Side-rail */}
        <aside className="hidden md:block w-64 bg-white border-r border-slate-200 shrink-0 p-5 space-y-6 select-none">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-450 uppercase tracking-widest px-3">Módulos Escolares</p>
            <nav className="space-y-1 pt-1.5">
              {visibleTabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`sidebar-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-left transition-all duration-150 cursor-pointer ${
                      active 
                        ? 'bg-brand-light text-brand-primary font-semibold shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-850'
                    }`}
                  >
                    <span className={active ? 'text-brand-primary' : 'text-slate-400'}>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-4">
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                <span>Lumi Vagalume</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                Conectando dados do Berçário de forma inteligente e fornecendo conselhos para o acolhimento afetivo das famílias.
              </p>
            </div>
            
            <div className="text-[10px] text-slate-400 text-center font-bold">
              Fundação La Salle © 2026
            </div>
          </div>
        </aside>

        {/* Mobile floating navigation panel overlay */}
        {isMobileMenuOpen && (
          <div className="absolute inset-0 z-30 bg-slate-900/50 md:hidden flex justify-start animate-fade-in select-none">
            <div className="bg-white w-64 h-full p-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-xs font-black text-slate-850">La Salle Conecta</span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X size={18} className="text-slate-650" />
                  </button>
                </div>
                
                <nav className="space-y-1.5">
                  {visibleTabs.map((tab) => {
                    const active = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                        className={`w-full flex items-center justify-start gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                          active 
                            ? 'bg-brand-light text-brand-primary font-bold' 
                            : 'text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <span className={active ? 'text-brand-primary' : 'text-slate-400'}>{tab.icon}</span>
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="text-[10px] text-slate-400 font-bold border-t border-slate-200 pt-3">
                Fundação La Salle • Pastoral "Estamos Todos Conectados"
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Display Canvas Area containing tabs routers */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-brand-bg">
          
          {activeTab === 'dashboard' && (
            <Dashboard 
              students={getFilteredStudentsForUser(currentUser, students)} 
              routines={routines} 
              onNavigate={(t) => setActiveTab(t)} 
              currentUser={currentUser}
            />
          )}

          {activeTab === 'school_calendar' && (
            <SchoolCalendar />
          )}

          {activeTab === 'event_manage' && (
            <EventManagement />
          )}

          {activeTab === 'mural_destaques' && (
            <MuralDestaques />
          )}

          {activeTab === 'school_dashboard' && (
            <SchoolDashboard />
          )}

          {activeTab === 'macro_dashboard' && (
            <MacroDashboard />
          )}

          {activeTab === 'pedagogia' && (
            <PedagogyPlanner 
              plans={plans} 
              onAddPlan={handleAddPlan} 
              students={students}
            />
          )}

          {activeTab === 'cuidado' && (
            <CareRoutine 
              students={getFilteredStudentsForUser(currentUser, students)} 
              routines={routines} 
              onSaveRoutine={handleSaveRoutine} 
              currentUser={currentUser}
            />
          )}

          {activeTab === 'inclusao' && (
            <InclusionPortal 
              students={getFilteredStudentsForUser(currentUser, students)} 
              reports={reports} 
              onAddReport={handleAddReport} 
            />
          )}

          {activeTab === 'familia' && (
            <FamilyFeed 
              posts={posts} 
              onAddComment={handleAddComment} 
              onLikePost={handleLikePost} 
              currentUser={currentUser}
              students={students}
            />
          )}

          {activeTab === 'atendimento_profissional' && (
            <ProfessionalCare 
              students={getFilteredStudentsForUser(currentUser, students)}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'lumi' && (
            <LumiAssistant 
              chatMessages={chatMessages} 
              onSendMessage={handleSendMessage} 
            />
          )}

          {activeTab === 'sequencias' && (
            <DidacticSequences />
          )}

          {activeTab === 'gestor_acesso' && (
            <AccessManager />
          )}

          {activeTab === 'cadastros_base' && (
            <SchoolRegistries students={students} setStudents={setStudents} />
          )}

          {activeTab === 'matriculas' && (
            <StudentEnrollment 
              students={students} 
              setStudents={setStudents} 
              currentUser={currentUser}
              onNavigate={(t) => setActiveTab(t)}
            />
          )}

        </main>

      </div>
    </div>
  );
}
