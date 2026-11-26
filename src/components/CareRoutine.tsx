import React, { useState } from 'react';
import { 
  HeartPulse, 
  Check, 
  Save, 
  UserCheck, 
  Salad, 
  MoonStar, 
  Smile, 
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';
import { Student, RoutineState } from '../types';

interface CareRoutineProps {
  students: Student[];
  routines: RoutineState[];
  onSaveRoutine: (routine: RoutineState) => void;
  currentUser?: any;
}

export default function CareRoutine({ students, routines, onSaveRoutine, currentUser }: CareRoutineProps) {
  const isParent = currentUser?.role === 'Responsável';

  // Helper for parent to map their children IDs
  const getParentsChildrenIds = (): string[] => {
    const email = currentUser?.email?.toLowerCase() || '';

    // Attempt to load dynamic parents registered in SchoolRegistries from localStorage
    try {
      const savedParentsRaw = localStorage.getItem('la_salle_parents');
      if (savedParentsRaw) {
        const savedParents: any[] = JSON.parse(savedParentsRaw);
        const match = savedParents.find(p => p.email?.toLowerCase() === email);
        if (match && match.childrenIds) {
          return match.childrenIds;
        }
      }
    } catch (err) {
      console.error("Error reading dynamic parents mapping", err);
    }

    if (email === 'ricardo.responsavel@lasalle.org') return ['student-1', 'student-5', 'student-6']; // Guto, Alice, Bruno
    if (email === 'mariana.almeida@lasalle.org') return ['student-7', 'student-8']; // Leo, Guilherme
    if (email === 'carlos.rocha@lasalle.org') return ['student-3', 'student-9', 'student-10']; // Theo, Sophia, Lucas
    if (email === 'patricia.souza@lasalle.org') return ['student-2', 'student-11']; // Helena, Pedro
    if (email === 'fernanda.costa@lasalle.org') return ['student-4', 'student-12', 'student-13']; // Beatriz, Gabriel, Clara
    if (email === 'gustavo.pinheiro@lasalle.org') return ['student-14', 'student-15']; // Laura, Enzo
    return ['student-1', 'student-2', 'student-3'];
  };

  // Helper for teacher to map their linked students (represented as classes)
  const getTeachersStudentsIds = (): string[] => {
    const email = currentUser?.email?.toLowerCase() || '';
    if (!email) return [];

    try {
      const savedTeachers = localStorage.getItem('la_salle_teachers');
      const savedClasses = localStorage.getItem('la_salle_classes');

      if (savedTeachers && savedClasses) {
        const teachersList: any[] = JSON.parse(savedTeachers);
        const classesList: any[] = JSON.parse(savedClasses);

        // Find teacher by email
        const teacher = teachersList.find(t => t.email?.toLowerCase() === email);
        if (teacher) {
          // Find all class groups coordinated by this teacher
          const teacherClasses = classesList.filter(c => c.teacherId === teacher.id);
          const teacherClassIds = teacherClasses.map(c => c.id);

          // Return student IDs in these classes
          const linkedStudents = students.filter(s => teacherClassIds.includes(s.classId));
          return linkedStudents.map(s => s.id);
        }
      }
    } catch (err) {
      console.error("Error reading teacher students mapping", err);
    }

    // Static fallback lists based on the initial system roles setup
    if (email === 'luciana.admin@lasalle.org') {
      return students.filter(s => s.classId === 'infantil-2').map(s => s.id);
    }
    if (email === 'pedro.professor@lasalle.org') {
      return students.filter(s => s.classId === 'maternal-2').map(s => s.id);
    }
    if (email === 'bruna.santos@lasalle.org') {
      return students.filter(s => ['bercario-1', 'maternal-1'].includes(s.classId)).map(s => s.id);
    }
    if (email === 'silvia.coord@lasalle.org') {
      return students.filter(s => s.classId === 'infantil-3').map(s => s.id);
    }
    return [];
  };

  const myChildrenIds = getParentsChildrenIds();
  const myChildren = students.filter(s => myChildrenIds.includes(s.id));

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
      observations: 'Atividades ocorrendo alegremente com engajamento afetivo continuado.'
    };
  };

  // Color mapping helpers
  const getMealBadge = (val?: string) => {
    if (val === 'excellent') {
      return <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full">Excelente 🥦</span>;
    }
    if (val === 'medium' || val === 'good') {
      return <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full">Médio 🍎</span>;
    }
    return <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold rounded-full">Recusou/Parcial ⚠️</span>;
  };

  const getSleepBadge = (val?: string) => {
    if (val === 'good') {
      return <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold rounded-full">Dormiu Bem 💤</span>;
    }
    if (val === 'restless') {
      return <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full">Agitado 🌀</span>;
    }
    return <span className="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-full">Não Dormiu ⏰</span>;
  };

  const getHygieneBadge = (val?: string) => {
    if (val === 'ok') {
      return <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full">Fralda OK ✨</span>;
    }
    if (val === 'wet') {
      return <span className="px-3 py-1 bg-sky-50 text-sky-805 border border-sky-200 text-xs font-bold rounded-full">Muda Xixi 💧</span>;
    }
    if (val === 'dirty') {
      return <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold rounded-full">Muda Coco 💩</span>;
    }
    return <span className="px-3 py-1 bg-violet-50 text-violet-800 border border-violet-200 text-xs font-bold rounded-full">Banho tomado 🧼</span>;
  };

  const getMoodBadge = (val?: string) => {
    if (val === 'happy') {
      return <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full">Alegre 😊</span>;
    }
    if (val === 'calm') {
      return <span className="px-3 py-1 bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold rounded-full">Calmo 😌</span>;
    }
    if (val === 'crying') {
      return <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full">Choroso 🥺</span>;
    }
    return <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-255 text-xs font-bold rounded-full">Febre / Dói 🤒</span>;
  };

  // IF THE USER IS A RESPONSIBLE (PARENT)
  if (isParent) {
    return (
      <div className="space-y-8 animate-fade-in text-slate-800">
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-brand-primary tracking-tight">
            Diário de Cuidado Diário dos Seus Filhos
          </h2>
          <p className="text-slate-500 text-sm">
            Informações atualizadas sobre alimentação, sono, higiene e o bem-estar dos seus pequenos.
          </p>
        </div>

        {/* Display cards - dispostas por criança */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {myChildren.map((student) => {
            const routine = getChildRoutine(student.id);

            return (
              <div 
                key={student.id} 
                className="bg-white border border-slate-250 backdrop-blur-md rounded-[32px] p-6 md:p-8 hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Student profile header block */}
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blend-multiply bg-brand-light text-brand-primary flex items-center justify-center font-bold text-xl overflow-hidden shrink-0 shadow-xs">
                        {student.photo ? (
                          <img src={student.photo} alt={student.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <span>👶</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-850 leading-tight">{student.name}</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{student.className} • {student.age}</p>
                      </div>
                    </div>

                    {student.hasSpecialNeeds && (
                      <span className="text-[9px] bg-amber-50 text-amber-850 border border-amber-200/60 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        PEI Ativo
                      </span>
                    )}
                  </div>

                  {/* Inclusion section if applicable */}
                  {student.hasSpecialNeeds && student.peiPlan && (
                    <div className="bg-amber-50/30 border border-amber-200/50 p-4 rounded-xl space-y-1 text-xs">
                      <span className="font-bold text-amber-850 block uppercase tracking-wider">Metodologia e Foco Individualizado:</span>
                      <p className="text-slate-650 font-semibold">{student.peiPlan}</p>
                    </div>
                  )}

                  {/* Daily Care routine stats list arranged per child */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
                      <Clock size={15} className="text-brand-gold" />
                      Status Geral de Hoje
                    </h4>

                    <div className="space-y-3">
                      {/* Meals row */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                            <Salad size={16} />
                          </div>
                          <span className="text-xs font-bold text-slate-700">Alimentação Escolar</span>
                        </div>
                        {getMealBadge(routine.meals)}
                      </div>

                      {/* Sleep row */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                            <MoonStar size={16} />
                          </div>
                          <span className="text-xs font-bold text-slate-700">Qualidade do Sono</span>
                        </div>
                        {getSleepBadge(routine.sleep)}
                      </div>

                      {/* Hygiene row */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                            <HeartPulse size={16} />
                          </div>
                          <span className="text-xs font-bold text-slate-700">Higiene e Fralda</span>
                        </div>
                        {getHygieneBadge(routine.hygiene)}
                      </div>

                      {/* Mood row */}
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                            <Smile size={16} />
                          </div>
                          <span className="text-xs font-bold text-slate-700">Disposição e Humor</span>
                        </div>
                        {getMoodBadge(routine.mood)}
                      </div>
                    </div>
                  </div>

                  {/* Comments from teachers */}
                  {routine.observations && (
                    <div className="bg-slate-50/70 p-4 border border-slate-200/50 rounded-2xl space-y-1.5">
                      <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider block">Observações do Dia</span>
                      <p className="text-xs text-slate-650 font-semibold italic">"{routine.observations}"</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-400 font-semibold mt-4">
                  Registros inseridos hoje via La Salle Conectado.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // STANDARD TEACHER VIEW STATE FOR CREATING CARE ROUTINES
  const isTeacher = currentUser?.role === 'Professor';
  const teacherStudentsIds = getTeachersStudentsIds();
  const visibleStudents = isTeacher 
    ? students.filter(s => teacherStudentsIds.includes(s.id))
    : students;

  const [selectedClass, setSelectedClass] = useState('all');
  const [activeStudentId, setActiveStudentId] = useState<string | null>(visibleStudents[0]?.id || null);

  React.useEffect(() => {
    if (visibleStudents.length > 0) {
      if (!activeStudentId || !visibleStudents.some(s => s.id === activeStudentId)) {
        setActiveStudentId(visibleStudents[0].id);
      }
    } else {
      setActiveStudentId(null);
    }
  }, [visibleStudents, activeStudentId]);

  const [meals, setMeals] = useState<'excellent' | 'medium' | 'refused'>('excellent');
  const [sleep, setSleep] = useState<'good' | 'restless' | 'no'>('good');
  const [hygiene, setHygiene] = useState<'wet' | 'dirty' | 'bath' | 'ok'>('ok');
  const [mood, setMood] = useState<'happy' | 'calm' | 'crying' | 'fever'>('happy');
  const [observations, setObservations] = useState('');

  const handleSelectStudent = (id: string) => {
    setActiveStudentId(id);
    const existing = routines.find(r => r.studentId === id);
    if (existing) {
      setMeals(existing.meals);
      setSleep(existing.sleep);
      setHygiene(existing.hygiene);
      setMood(existing.mood);
      setObservations(existing.observations || '');
    } else {
      setMeals('excellent');
      setSleep('good');
      setHygiene('ok');
      setMood('happy');
      setObservations('');
    }
  };

  const activeStudent = visibleStudents.find(s => s.id === activeStudentId);

  const handleSave = () => {
    if (!activeStudentId) return;

    const newRoutine: RoutineState = {
      id: routines.find(r => r.studentId === activeStudentId)?.id || `routine-${Date.now()}`,
      studentId: activeStudentId,
      date: new Date().toISOString().split('T')[0],
      meals,
      sleep,
      hygiene,
      mood,
      observations
    };

    onSaveRoutine(newRoutine);
    alert(`Diário de cuidado de ${activeStudent?.name} atualizado com sucesso!`);
  };

  const filteredStudents = selectedClass === 'all' 
    ? visibleStudents 
    : visibleStudents.filter(s => s.classId === selectedClass);

  const classStatusSummary = () => {
    const classRoutines = routines.filter(r => visibleStudents.some(s => s.id === r.studentId && (selectedClass === 'all' || s.classId === selectedClass)));
    const total = classRoutines.length;
    if (total === 0) return null;

    const excellentMeals = classRoutines.filter(r => r.meals === 'excellent').length;
    const goodSleep = classRoutines.filter(r => r.sleep === 'good').length;
    const feverIncident = classRoutines.filter(r => r.mood === 'fever').length;

    return {
      excellentMeals: Math.round((excellentMeals / total) * 100),
      goodSleep: Math.round((goodSleep / total) * 100),
      feverIncident
    };
  };

  // Get unique classes of teacher's visible students to render filter tabs dynamically
  const teacherClassesList = Array.from(new Set(visibleStudents.map(s => s.classId)))
    .map(classId => {
      const student = visibleStudents.find(s => s.classId === classId);
      return { id: classId, name: student ? student.className : classId };
    });

  const summaryStats = classStatusSummary();

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Diário de Cuidado Diário
        </h2>
        <p className="text-slate-500 text-sm">
          Acompanhamento ágil e afetuoso de rotinas vitais: alimentação, sono, higiene e bem-estar socioemocional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Class Selection & Student Roster */}
        <div className="lg:col-span-4 bg-white border border-slate-100 p-5 rounded-3xl shadow-sm space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Selecione o Grupo / Turma</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedClass('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  selectedClass === 'all'
                    ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Todos
              </button>
              {teacherClassesList.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedClass(c.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedClass === c.id
                      ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Student Roster */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alunos ({filteredStudents.length})</h4>
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredStudents.map((s) => {
                const hasState = routines.some(r => r.studentId === s.id);
                const isActive = s.id === activeStudentId;

                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectStudent(s.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isActive 
                        ? 'bg-brand-light border-blue-200 text-brand-primary ring-1 ring-brand-primary/40'
                        : 'bg-white border-slate-150 text-slate-750 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center font-bold text-sm overflow-hidden shrink-0 shadow-2xs">
                        {s.photo ? (
                          <img src={s.photo} alt={s.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <span>👶</span>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold flex items-center gap-1.5 leading-none">
                          {s.name}
                          {s.hasSpecialNeeds && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-none">{s.className} • {s.age}</div>
                      </div>
                    </div>

                    <div className="flex gap-1.5 items-center">
                      {hasState ? (
                        <span className="text-[10px] bg-brand-light text-brand-primary font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Check size={10} /> Salvo
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-100 text-slate-400 font-semibold px-2 py-0.5 rounded-md">
                          Pendente
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Micro analytics for class */}
          {summaryStats && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-2.5">
              <h5 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Aproveitamento da Turma (Hoje)</h5>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-0.5">
                    <span>Nutrição Excelente</span>
                    <span>{summaryStats.excellentMeals}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-primary h-1.5 transition-all" style={{ width: `${summaryStats.excellentMeals}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-0.5">
                    <span>Qualidade de Sono</span>
                    <span>{summaryStats.goodSleep}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-1.5 transition-all" style={{ width: `${summaryStats.goodSleep}%` }}></div>
                  </div>
                </div>
                {summaryStats.feverIncident > 0 && (
                  <div className="text-[10px] bg-red-50 text-red-700 font-medium px-2 py-1 rounded border border-red-100">
                    Atenção: {summaryStats.feverIncident} caso(s) registrado(s) de indisposição/febre.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Selected Student Care Editor */}
        <div className="lg:col-span-8 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          {activeStudent ? (
            <div className="space-y-6">
              
              {/* Profile Card Summary Header */}
              <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center font-bold text-lg overflow-hidden shrink-0 shadow-xs">
                    {activeStudent.photo ? (
                      <img src={activeStudent.photo} alt={activeStudent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span>👶</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800 leading-tight">{activeStudent.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{activeStudent.className} • {activeStudent.age}</p>
                  </div>
                </div>
                {activeStudent.hasSpecialNeeds && (
                  <div className="inline-flex self-start sm:self-auto bg-amber-50 text-amber-805 border border-amber-200/50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Suporte Individualizado Ativo
                  </div>
                )}
              </div>

              {/* Status Items Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* 1. Meal state */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <Salad size={14} className="text-brand-primary" />
                    Alimentação / Nutrição
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 'excellent', desc: 'Excelente', bg: 'bg-brand-light text-brand-primary border-blue-200', inactive: 'bg-slate-50 border-slate-200' },
                      { val: 'medium', desc: 'Médio', bg: 'bg-amber-50 text-amber-800 border-amber-200', inactive: 'bg-slate-50 border-slate-200' },
                      { val: 'refused', desc: 'Recusou', bg: 'bg-rose-50 text-rose-800 border-rose-200', inactive: 'bg-slate-50 border-slate-200' }
                    ].map((item) => {
                      const sel = meals === item.val;
                      return (
                        <button
                          key={item.val}
                          onClick={() => setMeals(item.val as any)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            sel ? item.bg + ' outline-2' : item.inactive
                          }`}
                        >
                          {item.desc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Sleep state */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <MoonStar size={14} className="text-brand-primary" />
                    Momento do Repouso
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 'good', desc: 'Dormiu bem', bg: 'bg-brand-light text-brand-primary border-blue-200', inactive: 'bg-slate-50 border-slate-200' },
                      { val: 'restless', desc: 'Agitado', bg: 'bg-amber-50 text-amber-800 border-amber-200', inactive: 'bg-slate-50 border-slate-200' },
                      { val: 'no', desc: 'Não dormiu', bg: 'bg-slate-100 text-slate-600 border-slate-300', inactive: 'bg-slate-50 border-slate-200' }
                    ].map((item) => {
                      const sel = sleep === item.val;
                      return (
                        <button
                          key={item.val}
                          onClick={() => setSleep(item.val as any)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            sel ? item.bg + ' outline-2' : item.inactive
                          }`}
                        >
                          {item.desc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Hygiene check block */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <HeartPulse size={14} className="text-brand-primary" />
                    Higiene / Fralda
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { val: 'ok', desc: 'OK', bg: 'bg-brand-light text-brand-primary border-blue-200' },
                      { val: 'wet', desc: 'Muda xixi', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
                      { val: 'dirty', desc: 'Muda coco', bg: 'bg-amber-100 text-amber-900 border-amber-300' },
                      { val: 'bath', desc: 'Banho', bg: 'bg-blue-50 text-blue-800 border-blue-200' }
                    ].map((item) => {
                      const sel = hygiene === item.val;
                      return (
                        <button
                          key={item.val}
                          onClick={() => setHygiene(item.val as any)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            sel ? item.bg + ' outline-2' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          {item.desc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Mood and wellness state */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <Smile size={14} className="text-brand-primary" />
                    Bem-estar e Humor
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { val: 'happy', desc: 'Alegre', bg: 'bg-brand-light text-brand-primary border-blue-200' },
                      { val: 'calm', desc: 'Calmo/a', bg: 'bg-slate-100 text-slate-800 border-slate-250' },
                      { val: 'crying', desc: 'Choroso', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
                      { val: 'fever', desc: 'Febre/Doi', bg: 'bg-rose-50 text-rose-800 border-rose-200' }
                    ].map((item) => {
                      const sel = mood === item.val;
                      return (
                        <button
                          key={item.val}
                          onClick={() => setMood(item.val as any)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            sel ? item.bg + ' outline-2' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          {item.desc}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Free Text Diary Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Observações Pedagógicas & Afetivas</label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Ex: Explorou com entusiasmo as tintas secas; realizou encaixes sem frustração; sorriu bastante nas transições..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-2xl text-sm focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>

              {/* Button Save Action */}
              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  id="routine-btn-save"
                  onClick={handleSave}
                  className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
                >
                  <Save size={16} />
                  Salvar Diário de Cuidado
                </button>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-slate-400 space-y-2 p-8">
              <UserCheck size={48} className="stroke-slate-350" />
              <p className="font-semibold text-slate-500">Selecione uma criança na lista de chamada para iniciar.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
