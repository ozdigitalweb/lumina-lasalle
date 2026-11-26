import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  PlusCircle, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Search, 
  Calendar, 
  User, 
  Briefcase, 
  ClipboardCheck, 
  Sparkles,
  Award,
  BookOpen,
  Filter,
  CheckCircle,
  FileSpreadsheet,
  AlertCircle,
  FilePlus,
  Send,
  Building2,
  Trash2
} from 'lucide-react';
import { Student } from '../types';

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Coordenador' | 'Professor' | 'Responsável';
  className?: string;
}

interface ProfessionalCareProps {
  students: Student[];
  currentUser: CurrentUser | null;
}

export interface ProfessionalRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  professionalName: string;
  professionalRole: 
    | 'Educador'
    | 'Coordenação Pedagógica'
    | 'Psicologia'
    | 'Psicopedagogia'
    | 'Fonoaudiologia'
    | 'Terapia Ocupacional'
    | 'Assistência Social'
    | 'Equipe de Inclusão'
    | 'Gestão Escolar';
  recordType: 
    | 'Evolução da aprendizagem'
    | 'Intervenções realizadas'
    | 'Estratégias utilizadas'
    | 'Encaminhamentos'
    | 'Relatórios'
    | 'Recomendações';
  title: string;
  content: string;
  date: string;
}

export default function ProfessionalCare({ students, currentUser }: ProfessionalCareProps) {
  // Local state for professional records
  const [records, setRecords] = useState<ProfessionalRecord[]>(() => {
    const saved = localStorage.getItem('la_salle_professional_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    
    // Rich, pedagogical & clinical seeded records
    return [
      {
        id: 'rec-1',
        studentId: 'student-1',
        studentName: 'Guto Pinheiro',
        classId: 'infantil-2',
        className: 'Infantil II - B',
        professionalName: 'Dra. Amanda Rezende',
        professionalRole: 'Psicologia',
        recordType: 'Recomendações',
        title: 'Orientações sensoriais e regulação tátil em momentos de transição',
        date: '2026-06-20',
        content: 'Recomendamos o uso sistemático de abafadores auditivos em momentos de transição de alta intensidade ruidosa (ex: entrada e saída de salas). Identificou-se regulação afetiva positiva ao explorar brinquedos de encaixe com texturas variadas. Evitar forçar contato visual prolongado na assembleia.'
      },
      {
        id: 'rec-2',
        studentId: 'student-1',
        studentName: 'Guto Pinheiro',
        classId: 'infantil-2',
        className: 'Infantil II - B',
        professionalName: 'Dra. Clarice Neves',
        professionalRole: 'Terapia Ocupacional',
        recordType: 'Intervenções realizadas',
        title: 'Estimulação de motricidade fina e preensão de pinça com argila',
        date: '2026-06-18',
        content: 'Realizado treino de preensão palmar através de modelagem com argila úmida e encaixes de dinossauros colecionáveis. O educando obteve ganho de sustentação muscular e estabilidade escapular, demonstrando menos fadiga na hora de manusear canetas e giz de cera.'
      },
      {
        id: 'rec-3',
        studentId: 'student-3',
        studentName: 'Theo Rocha',
        classId: 'infantil-3',
        className: 'Infantil III - A',
        professionalName: 'Dr. Fábio Arruda',
        professionalRole: 'Psicopedagogia',
        recordType: 'Evolução da aprendizagem',
        title: 'Progresso em foco ativo e completude de tarefas de seriação',
        date: '2026-06-21',
        content: 'Em sessão psicopedagógica, Theo conseguiu manter atenção alternada por 15 minutos em jogo de seriação numérica, um acréscimo significativo de tempo sobre a sessão anterior. O uso de feedbacks positivos imediatos e turnos breves de fala com apoio visual surtiu efeito excelente.'
      },
      {
        id: 'rec-4',
        studentId: 'student-3',
        studentName: 'Theo Rocha',
        classId: 'infantil-3',
        className: 'Infantil III - A',
        professionalName: 'Dra. Letícia Camargo',
        professionalRole: 'Fonoaudiologia',
        recordType: 'Estratégias utilizadas',
        title: 'Processamento auditivo central e pausas didáticas de autorregulação',
        date: '2026-06-19',
        content: 'Estimulado o campo de consciência fonológica através de cantigas corporais encadeadas. Theo responde de forma mais coerente e precisa quando as instruções são dadas de frente, com contato visual em sua altura física e frases com menos de 8 palavras.'
      },
      {
        id: 'rec-5',
        studentId: 'student-4',
        studentName: 'Beatriz Costa',
        classId: 'bercario-1',
        className: 'Berçário I',
        professionalName: 'Dra. Clara Mendonça',
        professionalRole: 'Assistência Social',
        recordType: 'Relatórios',
        title: 'Mapeamento e escuta qualificada da rede de apoio sociofamiliar',
        date: '2026-06-15',
        content: 'Realizada escuta qualificada com a genitora Fernanda. Foram fornecidas orientações de acesso ao programa de apoio comunitário e agendamento de consultas complementares. A família demonstra alto comprometimento e ambiente acolhedor, necessitando apenas de flexibilidade de horários.'
      },
      {
        id: 'rec-6',
        studentId: 'student-8',
        studentName: 'Guilherme Almeida',
        classId: 'maternal-2',
        className: 'Maternal II',
        professionalName: 'Helena Martins',
        professionalRole: 'Coordenação Pedagógica',
        recordType: 'Recomendações',
        title: 'Apoio e acolhimento em transição para o portão escolar',
        date: '2026-06-18',
        content: 'Recomendamos manter a rotina estruturada de despedidas rápidas e afetuosas na porta do berçário. O choro de Guilherme na separação foca em cerca de 4 minutos e cede totalmente quando ele é conduzido para a caixa heurística de areia.'
      },
      {
        id: 'rec-7',
        studentId: 'student-1',
        studentName: 'Guto Pinheiro',
        classId: 'infantil-2',
        className: 'Infantil II - B',
        professionalName: 'Prof. Marcelo Pontes',
        professionalRole: 'Equipe de Inclusão',
        recordType: 'Estratégias utilizadas',
        title: 'Adaptação pedagógica curricular com rotina visual individual',
        date: '2026-06-17',
        content: 'Implementado painel visual rotineiro na mesa do aluno Guto. A estruturação das tarefas em 3 blocos visuais distintos ("Agora", "Depois", "Livre") diminuiu sensivelmente a ansiedade de antecipação e melhorou o foco em atividades de letramento.'
      }
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('la_salle_professional_records', JSON.stringify(records));
  }, [records]);

  // General tab state (Mode selection based on current user)
  // 'register' (Professionals input) | 'teacher' (Class filter) | 'parent' (Child timeline)
  const defaultMode = currentUser?.role === 'Responsável' ? 'parent' : 'register';
  const [activeMenu, setActiveMenu] = useState<'register' | 'teacher' | 'parent'>(defaultMode);

  // Form Fields State
  const [formStudentId, setFormStudentId] = useState('');
  const [formProfessionalName, setFormProfessionalName] = useState(currentUser?.name || '');
  const [formProfessionalRole, setFormProfessionalRole] = useState<'Educador' | 'Coordenação Pedagógica' | 'Psicologia' | 'Psicopedagogia' | 'Fonoaudiologia' | 'Terapia Ocupacional' | 'Assistência Social' | 'Equipe de Inclusão' | 'Gestão Escolar'>('Psicologia');
  const [formRecordType, setFormRecordType] = useState<'Evolução da aprendizagem' | 'Intervenções realizadas' | 'Estratégias utilizadas' | 'Encaminhamentos' | 'Relatórios' | 'Recomendações'>('Evolução da aprendizagem');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Search in records
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load dynamic registered specialists from local storage to connect with SchoolRegistries
  const [registeredSpecialists, setRegisteredSpecialists] = useState<any[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('la_salle_specialists');
      if (saved) {
        setRegisteredSpecialists(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeMenu]);

  // Class selection for teacher mode
  const [selectedClassId, setSelectedClassId] = useState('');

  // Accordion lists expanded IDs
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

  // Feedback Notification
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'danger' } | null>(null);

  const triggerNotification = (text: string, type: 'success' | 'danger' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Pre-filled specialties for ease of selection & tags
  const SPECIALTIES = [
    'Educador',
    'Coordenação Pedagógica',
    'Psicologia',
    'Psicopedagogia',
    'Fonoaudiologia',
    'Terapia Ocupacional',
    'Assistência Social',
    'Equipe de Inclusão',
    'Gestão Escolar'
  ];

  const RECORD_TYPES = [
    'Evolução da aprendizagem',
    'Intervenções realizadas',
    'Estratégias utilizadas',
    'Encaminhamentos',
    'Relatórios',
    'Recomendações'
  ];

  // Helper function to map parent email to child list
  const getParentsChildrenIds = (email: string): string[] => {
    const normEmail = email.toLowerCase() || '';
    
    // Attempt to load dynamic parents registered in SchoolRegistries from localStorage
    try {
      const savedParentsRaw = localStorage.getItem('la_salle_parents');
      if (savedParentsRaw) {
        const savedParents: any[] = JSON.parse(savedParentsRaw);
        const match = savedParents.find(p => p.email?.toLowerCase() === normEmail);
        if (match && match.childrenIds) {
          return match.childrenIds;
        }
      }
    } catch (err) {
      console.error("Error reading dynamic parents mapping", err);
    }

    if (normEmail === 'ricardo.responsavel@lasalle.org') return ['student-1', 'student-5', 'student-6']; // Guto, Alice, Bruno
    if (normEmail === 'mariana.almeida@lasalle.org') return ['student-7', 'student-8']; // Leo, Guilherme
    if (normEmail === 'carlos.rocha@lasalle.org') return ['student-3', 'student-9', 'student-10']; // Theo, Sophia, Lucas
    if (normEmail === 'patricia.souza@lasalle.org') return ['student-2', 'student-11']; // Helena, Pedro
    if (normEmail === 'fernanda.costa@lasalle.org') return ['student-4', 'student-12', 'student-13']; // Beatriz, Gabriel, Clara
    if (normEmail === 'gustavo.pinheiro@lasalle.org') return ['student-14', 'student-15']; // Laura, Enzo
    return [];
  };

  // Toggle record accordion expand/collapse
  const toggleRecordExpand = (recordId: string) => {
    if (expandedRecordIds.includes(recordId)) {
      setExpandedRecordIds(expandedRecordIds.filter(id => id !== recordId));
    } else {
      setExpandedRecordIds([...expandedRecordIds, recordId]);
    }
  };

  // Handle Form Submission to save attendance
  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formStudentId) {
      triggerNotification('Por favor, selecione uma criança matriculada.', 'danger');
      return;
    }
    if (!formTitle.trim()) {
      triggerNotification('Por favor, insira um resumo da evolução ou título.', 'danger');
      return;
    }
    if (!formContent.trim()) {
      triggerNotification('Por favor, preencha o detalhamento clínico/pedagógico.', 'danger');
      return;
    }
    if (!formProfessionalName.trim()) {
      triggerNotification('Por favor, preencha o nome do profissional.', 'danger');
      return;
    }

    const matchedStudent = students.find(s => s.id === formStudentId);
    if (!matchedStudent) {
      triggerNotification('Estudante não localizado na secretaria base.', 'danger');
      return;
    }

    const newRecord: ProfessionalRecord = {
      id: `record-dynamic-${Date.now()}`,
      studentId: matchedStudent.id,
      studentName: matchedStudent.name,
      classId: matchedStudent.classId,
      className: matchedStudent.className,
      professionalName: formProfessionalName.trim(),
      professionalRole: formProfessionalRole,
      recordType: formRecordType,
      title: formTitle.trim(),
      content: formContent.trim(),
      date: formDate
    };

    setRecords([newRecord, ...records]);
    setFormTitle('');
    setFormContent('');
    triggerNotification(`Atendimento para "${matchedStudent.name}" registrado com absoluto sucesso no prontuário!`);
  };

  // Handle delete record (Admins and Coordinators only)
  const handleDeleteRecord = (id: string, studentName: string) => {
    if (confirm(`Tem certeza de que deseja remover permanentemente este registro de atendimento de ${studentName}?`)) {
      setRecords(records.filter(r => r.id !== id));
      triggerNotification('Registro excluído do prontuário escolar unificado.');
    }
  };

  // Filter distinct classrooms representing what class options exist
  const getUniqueClasses = () => {
    const classMap: { [key: string]: string } = {};
    students.forEach(s => {
      if (s.classId && s.className) {
        classMap[s.classId] = s.className;
      }
    });
    return Object.entries(classMap).map(([id, name]) => ({ id, name }));
  };
  const classrooms = getUniqueClasses();

  // Set default form student and class dropdown if empty or invalid
  useEffect(() => {
    if (students.length > 0) {
      if (!formStudentId || !students.some(s => s.id === formStudentId)) {
        setFormStudentId(students[0].id);
      }
    } else {
      setFormStudentId('');
    }
    if (classrooms.length > 0) {
      if (!selectedClassId || !classrooms.some(c => c.id === selectedClassId)) {
        setSelectedClassId(classrooms[0].id);
      }
    } else {
      setSelectedClassId('');
    }
  }, [students, classrooms, formStudentId, selectedClassId]);

  // Filter records based on active role & setup values
  const getFilteredRecords = () => {
    if (activeMenu === 'parent') {
      const parentEmail = currentUser?.email || 'ricardo.responsavel@lasalle.org';
      const myChildrenIds = getParentsChildrenIds(parentEmail);
      return records.filter(r => myChildrenIds.includes(r.studentId));
    }
    
    if (activeMenu === 'teacher') {
      return records.filter(r => r.classId === selectedClassId);
    }

    // Default: admin search / general professional lists
    let result = records;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.studentName.toLowerCase().includes(query) ||
        r.title.toLowerCase().includes(query) ||
        r.content.toLowerCase().includes(query) ||
        r.professionalName.toLowerCase().includes(query) ||
        r.professionalRole.toLowerCase().includes(query) ||
        r.recordType.toLowerCase().includes(query)
      );
    }
    return result;
  };

  const filteredRecords = getFilteredRecords();

  // Get parent's children to display custom selector info
  const parentEmail = currentUser?.email || 'ricardo.responsavel@lasalle.org';
  const myChildren = students.filter(s => getParentsChildrenIds(parentEmail).includes(s.id));

  // Determine if user has editing/registration authorization (Everyone except Parents)
  const isAuthorizedToRegister = currentUser?.role !== 'Responsável';

  // Get specialty coloring helper for design cards
  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case 'Educador': return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Coordenação Pedagógica': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Psicologia': return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Psicopedagogia': return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Fonoaudiologia': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Terapia Ocupacional': return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Assistência Social': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Equipe de Inclusão': return 'bg-violet-50 text-violet-800 border-violet-200';
      case 'Gestão Escolar': return 'bg-slate-50 text-slate-800 border-slate-200';
      default: return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  // Get record type icon or badge tag helper
  const getRecordTypeBadge = (type: string) => {
    switch (type) {
      case 'Evolução da aprendizagem': return 'bg-[#002D62]/5 text-[#002D62] text-[10px] font-black uppercase tracking-wider';
      case 'Intervenções realizadas': return 'bg-rose-600/10 text-rose-800 text-[10px] font-black uppercase tracking-wider';
      case 'Estratégias utilizadas': return 'bg-emerald-600/10 text-emerald-800 text-[10px] font-black uppercase tracking-wider';
      case 'Encaminhamentos': return 'bg-orange-600/10 text-orange-800 text-[10px] font-black uppercase tracking-wider';
      case 'Relatórios': return 'bg-slate-100 text-slate-850 text-[10px] font-black uppercase tracking-wider';
      case 'Recomendações': return 'bg-amber-150 text-amber-950 text-[10px] font-black uppercase tracking-wider';
      default: return 'bg-slate-50 text-slate-550 text-[10px] font-black';
    }
  };

  return (
    <div className="space-y-6" id="multiprofessional-care-attendance-panel">
      
      {/* Dynamic Notification Bubble */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl flex items-center gap-3 border text-xs max-w-md ${
          notification.type === 'success' 
            ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
            : 'bg-rose-50 text-rose-900 border-rose-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="text-emerald-500 shrink-0" size={18} />
          ) : (
            <AlertCircle className="text-rose-500 shrink-0" size={18} />
          )}
          <span className="font-extrabold leading-relaxed">{notification.text}</span>
        </div>
      )}

      {/* Hero Header Area */}
      <div className="bg-[#002D62] rounded-[32px] p-6 md:p-8 text-white relative overflow-hidden select-none border border-slate-950/20 shadow-md">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-450/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <span className="text-[10px] bg-amber-400 text-slate-950 px-3 py-1 rounded-full font-black uppercase tracking-widest inline-block border border-amber-500">
              Prontuário Multiprofissional
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mt-1.5 flex items-center gap-2">
              <HeartHandshake className="text-amber-400 animate-pulse" size={28} />
              Atendimento e Apoio Integral
            </h1>
            <p className="text-blue-100/90 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
              Ambiente unificado para registro de evoluções, estratégias pedagógicas e intervenções clínicas dos educandos matriculados, promovendo cooperação segura do corpo institucional com pais e docentes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
            <div className="bg-white/10 px-3 py-2 rounded-2xl border border-white/5 text-center shrink-0">
              <p className="text-[10px] text-blue-200 uppercase font-black tracking-widest leading-none">Profissionais</p>
              <p className="text-lg font-black text-amber-300 leading-none mt-1">9 Especialidades</p>
            </div>
            <div className="bg-white/10 px-3 py-2 rounded-2xl border border-white/5 text-center shrink-0">
              <p className="text-[10px] text-blue-200 uppercase font-black tracking-widest leading-none">Registros</p>
              <p className="text-lg font-black text-white leading-none mt-1">{records.length} Prontuários</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Selector Tabs */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-105 flex flex-wrap gap-1.5 justify-start">
        {isAuthorizedToRegister && (
          <button
            onClick={() => setActiveMenu('register')}
            className={`py-3 px-4.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-start gap-2 transition cursor-pointer ${
              activeMenu === 'register'
                ? 'bg-[#002D62] text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <FilePlus size={15} />
            <span>Postar Atendimentos</span>
          </button>
        )}

        <button
          onClick={() => setActiveMenu('teacher')}
          className={`py-3 px-4.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-start gap-2 transition cursor-pointer ${
            activeMenu === 'teacher'
              ? 'bg-[#002D62] text-white shadow-sm'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <BookOpen size={15} />
          <span>Visão de Professores</span>
        </button>

        <button
          onClick={() => setActiveMenu('parent')}
          className={`py-3 px-4.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-start gap-2 transition cursor-pointer ${
            activeMenu === 'parent'
              ? 'bg-[#002D62] text-white shadow-sm'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Users size={15} />
          <span>Visão de Pais</span>
        </button>
      </div>

      {/* Display Grid Content depending on active session */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* --- ZONE 1: REGISTER ENVIRONMENT FOR MULTIPROFESSIONALS --- */}
        {activeMenu === 'register' && (
          <>
            {/* Professional Form Section */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <PlusCircle className="text-[#002D62]" size={20} />
                <div>
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Lançar Novo Atendimento</h2>
                  <p className="text-[10px] text-slate-450 font-bold">Ficha unificada de evolução clínica e inclusão</p>
                </div>
              </div>

              <form onSubmit={handleSaveAttendance} className="space-y-4 text-xs font-semibold">
                
                {/* Selecionar Profissional Cadastrado */}
                {registeredSpecialists.length > 0 && (
                  <div className="space-y-1 bg-amber-50/45 p-3 rounded-2xl border border-amber-200 mb-2">
                    <label className="block text-[10px] text-amber-950 uppercase font-black tracking-wider flex items-center gap-1">
                      <span>👤 Autopreenchimento por Profissional Cadastrado</span>
                    </label>
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                          const matchedSec = registeredSpecialists.find(sp => sp.id === val);
                          if (matchedSec) {
                            setFormProfessionalName(matchedSec.name);
                            // Set role if matches or default
                            const roleMatch = matchedSec.professionName;
                            setFormProfessionalRole(roleMatch as any);
                          }
                        }
                      }}
                      className="w-full bg-white text-slate-900 font-bold p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-300"
                    >
                      <option value="">Selecione um profissional da equipe...</option>
                      {registeredSpecialists.map((sp) => (
                        <option key={sp.id} value={sp.id}>
                          {sp.name} — {sp.professionName} ({sp.registerNum})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {/* Specialty Selection */}
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-450 uppercase font-black tracking-wider">Especialidade do Profissional *</label>
                  <select
                    value={formProfessionalRole}
                    onChange={(e) => setFormProfessionalRole(e.target.value as any)}
                    className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-amber-300"
                  >
                    {SPECIALTIES.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                {/* Professional Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-450 uppercase font-black tracking-wider">Nome do Profissional Responsável *</label>
                  <input
                    type="text"
                    value={formProfessionalName}
                    onChange={(e) => setFormProfessionalName(e.target.value)}
                    placeholder="Ex: Dra. Clarice Neves"
                    className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-amber-300"
                    required
                  />
                </div>

                {/* Student Selection */}
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-450 uppercase font-black tracking-wider">Criança Matriculada / Educando *</label>
                  <select
                    value={formStudentId}
                    onChange={(e) => setFormStudentId(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 font-black p-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-amber-300 animate-fade-in"
                  >
                    <option value="">Selecione o educando...</option>
                    {students.map(st => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.className}) {st.hasSpecialNeeds ? '★ Inclusão' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Record Type Category */}
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-450 uppercase font-black tracking-wider">Tipo de Registro da Evolução *</label>
                  <select
                    value={formRecordType}
                    onChange={(e) => setFormRecordType(e.target.value as any)}
                    className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-amber-300"
                  >
                    {RECORD_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-450 uppercase font-black tracking-wider">Título Resumido do Atendimento *</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ex: Sessão de motricidade e equilíbrio postural"
                    className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-amber-300"
                    required
                  />
                </div>

                {/* Date Selection */}
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-450 uppercase font-black tracking-wider">Data do Atendimento / Ocorrência</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 font-bold p-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-amber-300"
                  />
                </div>

                {/* Detailed Content Narrative */}
                <div className="space-y-1">
                  <label className="block text-[10px] text-slate-450 uppercase font-black tracking-wider">Detalhamento e Evolução Clínica/Pedagógica *</label>
                  <textarea
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    rows={4}
                    placeholder="Descreva as intervenções realizadas, estratégias utilizadas, reações observadas na criança, progresso no ritmo e eventuais encaminhamentos ou orientações recomendadas..."
                    className="w-full bg-slate-50 text-slate-900 font-semibold p-3.5 rounded-xl border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-amber-300 resize-none leading-relaxed"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <Send size={14} />
                  <span>Gravar Atendimento Clínico</span>
                </button>

              </form>
            </div>

            {/* List and Search of All Registered Records for Professionals View */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-150 shadow-sm space-y-4">
                
                {/* Search Bar / Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ClipboardCheck size={18} className="text-[#002D62]" />
                      Histórico Geral de Atendimentos
                    </h2>
                    <p className="text-[10px] text-slate-450 font-bold">Filtros dinâmicos e pesquisa por prontuário</p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Pesquisar por aluno, profissional..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 font-bold pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none text-xs focus:bg-white focus:ring-2 focus:ring-amber-300"
                    />
                    <Search size={14} className="text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* List Container */}
                {filteredRecords.length === 0 ? (
                  <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <AlertCircle size={32} className="text-slate-350 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 font-extrabold">Nenhum atendimento corresponde aos critérios.</p>
                    <p className="text-[10px] text-slate-400 font-bold">Cadastre uma nova evolução pedagógica/clínica ao lado.</p>
                  </div>
                ) : (
                  <div className="space-y-3.5 max-h-[640px] overflow-y-auto pr-1">
                    {filteredRecords.map((item) => {
                      const isExpanded = expandedRecordIds.includes(item.id);
                      return (
                        <div 
                          key={item.id}
                          className="bg-slate-50 border border-slate-155 rounded-2xl hover:bg-white hover:border-[#002D62]/45 transition duration-150"
                        >
                          {/* Card Header clickable to expand */}
                          <div 
                            onClick={() => toggleRecordExpand(item.id)}
                            className="p-4 flex justify-between items-start gap-3 cursor-pointer select-none"
                          >
                            <div className="space-y-1.5 flex-1">
                              {/* Meta Info */}
                              <div className="flex flex-wrap gap-1.5 items-center">
                                <span className="font-black text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded uppercase">
                                  {item.className}
                                </span>
                                <span className={`border px-2 py-0.5 rounded ${getSpecialtyColor(item.professionalRole)} text-[9px] font-black uppercase tracking-wider`}>
                                  {item.professionalRole}
                                </span>
                                <span className={`px-2 py-0.5 rounded ${getRecordTypeBadge(item.recordType)}`} style={{ fontSize: '9px' }}>
                                  {item.recordType}
                                </span>
                              </div>

                              <h3 className="text-xs font-black text-slate-850 leading-snug">
                                {item.studentName} — <span className="font-bold text-[#002D62] text-xs">{item.title}</span>
                              </h3>

                              <div className="flex items-center gap-4 text-[10px] text-slate-450 font-black">
                                <span className="flex items-center gap-1">
                                  <User size={11} />
                                  {item.professionalName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar size={11} />
                                  {new Date(item.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                </span>
                              </div>
                            </div>

                            {/* Controls and expanded icons */}
                            <div className="flex items-center gap-2 shrink-0">
                              {(currentUser?.role === 'Administrador' || currentUser?.role === 'Coordenador') && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteRecord(item.id, item.studentName);
                                  }}
                                  className="p-1.5 bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100 rounded-lg transition"
                                  title="Excluir do prontuário"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                              <button className="text-slate-450 hover:text-slate-850 p-1 rounded-full hover:bg-slate-200 transition">
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </div>
                          </div>

                          {/* Collapsible content detail description */}
                          {isExpanded && (
                            <div className="px-4 pb-4 border-t border-slate-100 pt-3 text-xs bg-white/70 rounded-b-2xl animate-slide-in">
                              <h4 className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1.5">NARRATIVE / CONTEÚDO ANALÍTICO:</h4>
                              <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-line text-xs bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                                {item.content}
                              </p>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>
          </>
        )}

        {/* --- ZONE 2: TEACHERS VIEW / TURMAS E LISTAGEM DE ALUNOS --- */}
        {activeMenu === 'teacher' && (
          <div className="col-span-12 bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-4">
            
            {/* Header Description */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen size={18} className="text-[#002D62]" />
                  Acesso de Professores: Lista de Prontuários por Turma
                </h2>
                <p className="text-[10px] text-slate-450 font-bold">Selecione uma de suas turmas para rastrear os atendimentos multiprofissionais anotados</p>
              </div>

              {/* Class Selector Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Escolher Turma:</span>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="bg-slate-50 text-slate-900 font-extrabold px-3 py-2 rounded-xl border border-slate-200 text-xs focus:bg-white outline-none focus:ring-2 focus:ring-amber-300"
                >
                  {classrooms.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* List Students from selected classroom who have records */}
            {(() => {
              // Students in the selected class
              const classStudents = students.filter(s => s.classId === selectedClassId);

              if (classStudents.length === 0) {
                return (
                  <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-500 font-extrabold">Nenhum aluno cadastrado nesta turma.</p>
                  </div>
                );
              }

              // Filter students who have at least one record
              const studentsWithRecords = classStudents.map(st => {
                const childRecords = records.filter(r => r.studentId === st.id);
                return { ...st, childRecords };
              }).filter(st => st.childRecords.length > 0);

              if (studentsWithRecords.length === 0) {
                const className = classrooms.find(c => c.id === selectedClassId)?.name || 'turma';
                return (
                  <div className="p-10 text-center bg-amber-50/50 rounded-2xl border border-[#fed7aa]">
                    <AlertCircle size={24} className="text-amber-600 mx-auto mb-2" />
                    <p className="text-xs text-amber-900 font-extrabold">Nenhum aluno da turma "{className}" possui registros clínicos.</p>
                    <p className="text-[10px] text-amber-700 font-bold mt-1">Os profissionais especializados (Psicologia, Terapia Ocupacional, etc) ainda não anotaram evoluções para as crianças desta turma.</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentsWithRecords.map(st => (
                    <div key={st.id} className="p-5 bg-slate-50 border border-slate-150 rounded-2xl space-y-3 hover:bg-white hover:border-[#002D62]/40 transition duration-150">
                      
                      {/* Kid Profile Header */}
                      <div className="pb-2 border-b border-slate-100 flex justify-between items-center">
                        <div>
                          <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5 leading-none">
                            <span className="text-slate-400">👶</span>
                            {st.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] uppercase font-bold text-slate-450">{st.age} • {st.className}</span>
                            {st.hasSpecialNeeds && (
                              <span className="bg-rose-50 text-rose-800 text-[8px] font-black uppercase px-2 py-0.2 rounded border border-rose-200">
                                {st.specialNeeds || 'Educação Especial'}
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                          {st.childRecords.length} Registros
                        </span>
                      </div>

                      {/* Timeline records for this student */}
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                        {st.childRecords.map(rec => (
                          <div 
                            key={rec.id} 
                            className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 shadow-xs text-xs animate-slide-in hover:shadow-sm"
                          >
                            <div className="flex justify-between items-center flex-wrap gap-1">
                              <span className={`px-2 py-0.5 rounded overflow-hidden text-center inline-block ${getSpecialtyColor(rec.professionalRole)} text-[9px] font-black uppercase tracking-wider`}>
                                {rec.professionalRole}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400">
                                {new Date(rec.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                              </span>
                            </div>

                            <p className="font-extrabold text-[#002D62] text-[11px] leading-snug">{rec.title}</p>
                            <p className="text-[10px] text-slate-450 uppercase font-black leading-none">{rec.recordType}</p>
                            
                            <p className="text-[11px] text-slate-650 leading-relaxed font-semibold whitespace-pre-wrap pt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                              {rec.content}
                            </p>

                            <div className="text-[10px] font-bold text-slate-400 text-right pr-1 italic">
                              Escrito por: {rec.professionalName}
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              );
            })()}

          </div>
        )}

        {/* --- ZONE 3: PARENTS VIEW / SEGURANÇA E ACESSO EXCLUSIVO --- */}
        {activeMenu === 'parent' && (
          <div className="col-span-12 bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-4">
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800">
                <Users size={18} />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Espaço Família: Canal de Apoio ao Responsável</h2>
                <p className="text-[10px] text-slate-450 font-bold">Consulte com segurança técnica e acolhimento os feedbacks emitidos pelos profissionais para seus filhos</p>
              </div>
            </div>

            {/* Parent Identity Box */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-150 rounded-2xl text-xs space-y-1.5">
              <p className="font-black text-emerald-900 tracking-tight flex items-center gap-1.5 text-[11px]">
                <CheckCircle size={14} className="text-emerald-600" />
                Sessão com Criptografia de Prontuário Escolar Ativa
              </p>
              <p className="text-slate-600 font-semibold leading-relaxed">
                Prezado(a) <strong className="text-emerald-950">{currentUser?.name || '(Simulação de Responsável)'}</strong>, conforme os regulamentos e a Carta de Inclusão da Fundação La Salle Conecta, você possui canal restrito de acompanhamento técnico. Você possui <strong className="font-extrabold text-[#002D62]">{myChildren.length} assistido(s)</strong> listados abaixo:
              </p>
              <div className="flex gap-2 flex-wrap pt-0.5">
                {myChildren.map(c => (
                  <span key={c.id} className="bg-white border border-emerald-200 text-[#002D62] px-2.5 py-1 rounded-full font-black text-[11px]">
                    👶 {c.name} ({c.className})
                  </span>
                ))}
              </div>
            </div>

            {/* Check if parent has children */}
            {myChildren.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-500 font-extrabold">Seu e-mail cadastral não retornou dependentes ativos.</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">Por favor, regularize as relações de filiação na secretaria de "Cadastros Base".</p>
              </div>
            ) : (
              <div className="space-y-6">
                {myChildren.map(child => {
                  const childRecords = records.filter(r => r.studentId === child.id);
                  
                  return (
                    <div key={child.id} className="space-y-3">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 flex justify-between items-center">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          ⭐ Evoluções lançadas para: {child.name}
                        </span>
                        <span className="text-[10px] font-black bg-[#002D62] text-white px-2 py-0.5 rounded-full">
                          {childRecords.length} Prontuários
                        </span>
                      </div>

                      {childRecords.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 bg-slate-50/50 rounded-xl border border-slate-100 italic text-[11px] font-medium">
                          Nenhum relatório técnico ou evolução postada para {child.name} até o presente momento.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {childRecords.map(rec => (
                            <div 
                              key={rec.id}
                              className="bg-white p-5 rounded-2xl border border-slate-155 hover:border-emerald-300 hover:shadow-sm transition font-semibold space-y-2.5 text-xs text-slate-800"
                            >
                              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                <span className={`px-2 py-0.5 rounded ${getSpecialtyColor(rec.professionalRole)} text-[9px] font-black uppercase tracking-wider`}>
                                  {rec.professionalRole}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold">
                                  {new Date(rec.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                </span>
                              </div>

                              <div>
                                <h4 className="font-extrabold text-[#002D62] text-[11px] leading-snug">{rec.title}</h4>
                                <span className={`inline-block px-2 py-0.5 rounded mt-1 ${getRecordTypeBadge(rec.recordType)}`}>
                                  {rec.recordType}
                                </span>
                              </div>

                              <p className="text-[11px] text-slate-650 leading-relaxed font-semibold bg-emerald-50/10 p-3 rounded-xl border border-emerald-100/30 whitespace-pre-line">
                                {rec.content}
                              </p>

                              <div className="pt-1.5 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-50">
                                <span>Professores autorizados têm acesso</span>
                                <span className="font-bold italic text-slate-500">Por: {rec.professionalName}</span>
                              </div>

                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
