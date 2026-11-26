import React, { useState } from 'react';
import { 
  UserPlus, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  ShieldAlert, 
  ClipboardList, 
  Sparkles, 
  ArrowRight, 
  Search, 
  UserCheck, 
  Check, 
  X, 
  HeartHandshake, 
  ChevronRight, 
  Info, 
  Baby, 
  Building 
} from 'lucide-react';
import { Student } from '../types';

interface StudentEnrollmentProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  currentUser: any;
  onNavigate: (tab: string) => void;
}

const PRESET_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=150&h=150', label: 'Menino com camisolinha amarela' },
  { url: 'https://images.unsplash.com/photo-1516624683217-bf02fc6b6b7c?auto=format&fit=crop&q=80&w=150&h=150', label: 'Criança sorridente de tiara' },
  { url: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=150&h=150', label: 'Menino sorridente' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150', label: 'Menina de casaco cinza' },
  { url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=150&h=150', label: 'Criança loirinha fofa' },
  { url: 'https://images.unsplash.com/photo-1510210119931-1837856d227f?auto=format&fit=crop&q=80&w=150&h=150', label: 'Criança de cabelo cacheado' }
];

const AVAILABLE_CLASSES = [
  { id: 'bercario-1', name: 'Berçário I', ageGroup: 'bebês', desc: '0 a 1 ano e 6 meses' },
  { id: 'bercario-2', name: 'Berçário II - B', ageGroup: 'bebês', desc: '1 ano e 7 meses a 2 anos' },
  { id: 'maternal-1', name: 'Maternal I', ageGroup: 'pequenos', desc: '2 anos a 2 anos e 6 meses' },
  { id: 'maternal-1b', name: 'Maternal I - B', ageGroup: 'pequenos', desc: '2 anos e 7 meses a 3 anos' },
  { id: 'maternal-2', name: 'Maternal II', ageGroup: 'pequenos', desc: '3 anos a 3 anos e 6 meses' },
  { id: 'maternal-2b', name: 'Maternal II - B', ageGroup: 'pequenos', desc: '3 anos e 7 meses a 4 anos' },
  { id: 'infantil-2', name: 'Infantil II - B', ageGroup: 'pequenos', desc: '4 anos a 4 anos e 6 meses' },
  { id: 'infantil-2c', name: 'Infantil II - C', ageGroup: 'pequenos', desc: '4 anos e 7 meses a 5 anos' },
  { id: 'infantil-3', name: 'Infantil III - A', ageGroup: 'grandes', desc: '5 anos a 5 anos e 6 meses' },
  { id: 'infantil-3b', name: 'Infantil III - B', ageGroup: 'grandes', desc: '5 anos e 7 meses a 6 anos' },
  { id: 'class-fund-1', name: '1º Ano - Fund. I - A', ageGroup: 'grandes', desc: '6 a 7 anos' }
];

export default function StudentEnrollment({ students, setStudents, currentUser, onNavigate }: StudentEnrollmentProps) {
  const isParent = currentUser?.role === 'Responsável';
  const isStaff = currentUser?.role === 'Coordenador' || currentUser?.role === 'Administrador';

  // State for parents: Form submission
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    ageGroup: 'pequenos' as 'bebês' | 'pequenos' | 'grandes',
    classId: 'maternal-1',
    hasSpecialNeeds: false,
    specialNeeds: '',
    photo: PRESET_PHOTOS[0].url,
    cep: '',
    address: '',
    city: 'Brasília-DF'
  });
  
  const [enrollmentSuccess, setEnrollmentSuccess] = useState<string | null>(null);

  // State for staff: Filters & Selection
  const [staffTab, setStaffTab] = useState<'pendentes' | 'homologados' | 'estatisticas'>('pendentes');
  const [staffSearch, setStaffSearch] = useState('');

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSelectPhoto = (url: string) => {
    setFormData(prev => ({
      ...prev,
      photo: url
    }));
  };

  // Submit Parent Form
  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age) {
      alert("Por favor, preencha o nome e a idade do aluno.");
      return;
    }

    const selectedClass = AVAILABLE_CLASSES.find(c => c.id === formData.classId);
    
    const newStudentId = `student-enroll-${Date.now()}`;
    const newStudent: Student & { parentEmail?: string; parentName?: string; enrollmentDate?: string; status?: 'pendente' | 'aprovado' } = {
      id: newStudentId,
      name: formData.name,
      age: formData.age,
      ageGroup: formData.ageGroup,
      classId: formData.classId,
      className: selectedClass ? selectedClass.name : 'Maternal I',
      hasSpecialNeeds: formData.hasSpecialNeeds,
      specialNeeds: formData.hasSpecialNeeds ? formData.specialNeeds : '',
      peiPlan: formData.hasSpecialNeeds ? 'Plano de Atendimento Educacional Especializado (AEE) pendente de homologação técnica com a coordenação e psicopedagoga.' : undefined,
      photo: formData.photo,
      cep: formData.cep,
      address: formData.address,
      city: formData.city,
      parentEmail: currentUser?.email?.toLowerCase() || 'parent.generic@lasalle.org',
      parentName: currentUser?.name || 'Responsável',
      enrollmentDate: new Date().toLocaleDateString('pt-BR'),
      status: 'pendente'
    };

    setStudents(prev => [newStudent as Student, ...prev]);
    setEnrollmentSuccess(newStudentId);
    
    // Reset form
    setFormData({
      name: '',
      age: '',
      ageGroup: 'pequenos',
      classId: 'maternal-1',
      hasSpecialNeeds: false,
      specialNeeds: '',
      photo: PRESET_PHOTOS[0].url,
      cep: '',
      address: '',
      city: 'Brasília-DF'
    });
    setFormStep(1);
  };

  // Staff Actions: Approve/Homologate Enrollment
  const handleApproveEnrollment = (studentId: string) => {
    setStudents(prev => 
      prev.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            status: 'aprovado'
          } as any;
        }
        return student;
      })
    );
  };

  // Filter dynamic enrollments
  const allDynamicEnrollments = students.filter(s => s.id.startsWith('student-enroll-')) as any[];
  
  const pendingEnrollments = allDynamicEnrollments.filter(s => s.status !== 'aprovado');
  const approvedEnrollments = allDynamicEnrollments.filter(s => s.status === 'aprovado');

  const filteredPending = pendingEnrollments.filter(s => 
    s.name.toLowerCase().includes(staffSearch.toLowerCase()) || 
    s.parentName?.toLowerCase().includes(staffSearch.toLowerCase())
  );

  const filteredApproved = approvedEnrollments.filter(s => 
    s.name.toLowerCase().includes(staffSearch.toLowerCase()) || 
    s.parentName?.toLowerCase().includes(staffSearch.toLowerCase())
  );

  // Stats calculation
  const totalEnrolls = allDynamicEnrollments.length;
  const totalPending = pendingEnrollments.length;
  const totalApproved = approvedEnrollments.length;
  const totalSpecialNeeds = allDynamicEnrollments.filter(s => s.hasSpecialNeeds).length;

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-brand-primary text-white font-black px-2.5 py-1 rounded-sm tracking-wider uppercase">
              Secretaria Digital La Salle
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              Matrículas e Vagas 2026
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tight">
            {isParent ? 'Nova Matrícula' : 'Gestão de Novas Matrículas'}
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            {isParent 
              ? 'Inscreva seu filho no Colégio La Salle. Nosso sistema integrará o cuidado diário e o plano BNCC automaticamente.'
              : 'Analise, homologue e aprove as solicitações de novas matrículas realizadas pelos pais diretamente pelo painel.'
            }
          </p>
        </div>
        
        {isParent && (
          <button 
            onClick={() => onNavigate('dashboard')}
            className="self-start md:self-center px-4.5 py-2.5 bg-white border border-slate-200 text-slate-705 font-bold rounded-xl text-xs hover:bg-slate-50 transition cursor-pointer"
          >
            Voltar ao Painel
          </button>
        )}
      </div>

      {/* PARENT VIEW: STEPPED MATRICULATION FORM */}
      {isParent && (
        <div className="max-w-4xl mx-auto">
          {enrollmentSuccess ? (
            /* SUCCESS BANNER */
            <div className="bg-white border-2 border-emerald-400 rounded-[32px] p-8 md:p-12 text-center space-y-6 shadow-md animate-fade-in">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={44} className="animate-bounce" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900">Pré-Matrícula Enviada!</h3>
                <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base font-medium">
                  A inscrição de <strong>{students.find(s => s.id === enrollmentSuccess)?.name}</strong> foi recebida pela nossa equipe pedagógica e está aguardando homologação na coordenação escolar.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/80 max-w-md mx-auto space-y-1 text-left">
                <p className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 justify-center md:justify-start">
                  <Info size={14} />
                  O que acontece agora?
                </p>
                <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-1 pl-1">
                  <li>O coordenador avaliará a alocação na turma desejada.</li>
                  <li>Seu filho será listado na sua aba inicial do painel.</li>
                  <li>Caso possua necessidades especiais, a equipe psicopedagógica iniciará o rascunho do PEI.</li>
                </ul>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={() => setEnrollmentSuccess(null)}
                  className="px-5 py-3 bg-slate-105 hover:bg-slate-150 text-slate-700 font-bold rounded-2xl text-xs transition cursor-pointer"
                >
                  Matricular Outro Filho
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-5 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold rounded-2xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Ir para o Painel</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            /* ENROLLMENT FORM CARD */
            <form onSubmit={handleSubmitEnrollment} className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xs">
              {/* Form Navigation Headers */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center text-xs font-bold text-slate-500">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${formStep === 1 ? 'bg-brand-primary text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                    {formStep === 1 ? '1' : <Check size={12} />}
                  </span>
                  <span className={formStep === 1 ? 'text-slate-900 font-black' : 'text-slate-500'}>Dados do Aluno</span>
                </div>
                <div className="w-12 h-px bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${formStep === 2 ? 'bg-brand-primary text-white' : 'bg-slate-200 text-slate-550'}`}>
                    2
                  </span>
                  <span className={formStep === 2 ? 'text-slate-900 font-black' : 'text-slate-500'}>Endereço & Foto</span>
                </div>
              </div>

              {/* Form Body - Step 1 */}
              {formStep === 1 && (
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-brand-primary mb-2">
                    <Baby className="shrink-0" size={20} />
                    <div className="text-xs font-medium leading-relaxed">
                      Preencha os dados do seu filho. As turmas sugeridas são baseadas na BNCC para garantir o estímulo motor e socioafetivo adequado.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Nome Completo do Aluno <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Guto Dias Silva"
                        className="w-full px-4 py-3 border border-slate-200 hover:border-slate-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl text-sm transition outline-none"
                        required
                      />
                    </div>

                    {/* Age / Birth */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Idade Atual ou Data <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Ex: 3 anos e 2 meses ou 14/05/2023"
                        className="w-full px-4 py-3 border border-slate-200 hover:border-slate-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-xl text-sm transition outline-none"
                        required
                      />
                    </div>

                    {/* Age Group */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Estágio de Desenvolvimento</label>
                      <select 
                        name="ageGroup"
                        value={formData.ageGroup}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white transition outline-none"
                      >
                        <option value="bebês">Bebês (0 a 1 ano e 6 meses)</option>
                        <option value="pequenos">Crianças Bem Pequenas / Pequenas (1 ano e 7 meses a 5 anos)</option>
                        <option value="grandes">Crianças Grandes (Acima de 5 anos / Fundamental)</option>
                      </select>
                    </div>

                    {/* Target Class Group */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">Turma Desejada</label>
                      <select 
                        name="classId"
                        value={formData.classId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white transition outline-none"
                      >
                        {AVAILABLE_CLASSES.map(cls => (
                          <option key={cls.id} value={cls.id}>
                            {cls.name} ({cls.desc})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Needs */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        id="hasSpecialNeeds" 
                        name="hasSpecialNeeds"
                        checked={formData.hasSpecialNeeds}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-brand-primary border-slate-300 rounded focus:ring-brand-primary cursor-pointer"
                      />
                      <label htmlFor="hasSpecialNeeds" className="text-xs md:text-sm font-bold text-slate-700 cursor-pointer select-none">
                        Meu filho possui alguma necessidade educacional especial ou laudo médico?
                      </label>
                    </div>

                    {formData.hasSpecialNeeds && (
                      <div className="bg-amber-50/50 border border-amber-200 p-4.5 rounded-2xl space-y-3 animate-fade-in">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                          <ShieldAlert size={15} className="text-amber-600" />
                          <span>Atendimento Integrado e Inclusivo La Salle</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-normal font-medium">
                          Nossa instituição possui psicopedagogos, psicólogos e corpo de inclusão preparados para redigir o PEI (Plano de Ensino Individualizado). Descreva abaixo para agilizar nosso acolhimento pedagógico.
                        </p>
                        <textarea 
                          name="specialNeeds"
                          value={formData.specialNeeds}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Ex: Diagnóstico de Transtorno do Espectro Autista (TEA), necessidade de apoio motor, alergia alimentar grave, etc."
                          className="w-full p-3 border border-amber-300/60 hover:border-amber-400 rounded-xl text-sm transition outline-none bg-white font-medium"
                          required={formData.hasSpecialNeeds}
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit / Next Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                    >
                      <span>Próximo Passo</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Form Body - Step 2 */}
              {formStep === 2 && (
                <div className="p-6 md:p-8 space-y-8">
                  
                  {/* Avatar / Photo Selection */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider block">Foto do Aluno para Identificação</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Escolha um dos perfis pré-definidos para representar a imagem do seu filho nas rotinas de cuidado.</p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
                      {PRESET_PHOTOS.map((p, idx) => {
                        const isSelected = formData.photo === p.url;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectPhoto(p.url)}
                            className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                              isSelected ? 'border-brand-primary ring-2 ring-brand-primary/30 scale-105' : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-brand-primary/10 flex items-center justify-center">
                                <span className="bg-brand-primary text-white rounded-full p-1 shadow-xs">
                                  <Check size={10} />
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guardian Address Pre-fill & Form */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider block">Endereço de Contato da Família</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 block uppercase">CEP</label>
                        <input 
                          type="text" 
                          name="cep"
                          value={formData.cep}
                          onChange={handleInputChange}
                          placeholder="Ex: 70390-025"
                          className="w-full px-4 py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-sm transition outline-none"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 block uppercase">Endereço Residencial</label>
                        <input 
                          type="text" 
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Ex: SHIGS 706, Bloco G, Casa 12"
                          className="w-full px-4 py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-sm transition outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pre-filled Guardian validation block */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-light text-brand-primary rounded-xl flex items-center justify-center font-bold">
                      <HeartHandshake size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-900 leading-tight">Responsável Legal Vinculado</p>
                      <p className="text-[11px] text-slate-500 leading-tight">{currentUser?.name} ({currentUser?.email})</p>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="pt-4 border-t border-slate-100 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                    >
                      Voltar
                    </button>
                    
                    <button
                      type="submit"
                      className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
                    >
                      <UserPlus size={14} />
                      <span>Concluir Matrícula</span>
                    </button>
                  </div>

                </div>
              )}
            </form>
          )}
        </div>
      )}

      {/* STAFF VIEW: AUDIT & APPROVAL PANEL */}
      {isStaff && (
        <div className="space-y-6">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
              <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider block">Total Solicitações</span>
              <p className="text-2xl font-black text-slate-800 mt-2">{totalEnrolls}</p>
            </div>
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
              <span className="text-[10px] text-amber-800 uppercase font-black tracking-wider block">Aguardando Homologação</span>
              <p className="text-2xl font-black text-amber-700 mt-2">{totalPending}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-150 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
              <span className="text-[10px] text-emerald-800 uppercase font-black tracking-wider block">Matrículas Homologadas</span>
              <p className="text-2xl font-black text-emerald-700 mt-2">{totalApproved}</p>
            </div>
            <div className="bg-purple-50 border border-purple-150 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
              <span className="text-[10px] text-purple-800 uppercase font-black tracking-wider block">Inclusão Pedagógica (PEI)</span>
              <p className="text-2xl font-black text-purple-700 mt-2">{totalSpecialNeeds}</p>
            </div>
          </div>

          {/* Filtering and Tab Select */}
          <div className="bg-white border border-slate-200 rounded-[28px] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex gap-2">
              <button
                onClick={() => setStaffTab('pendentes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${staffTab === 'pendentes' ? 'bg-amber-100 text-amber-850' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Pendentes ({totalPending})
              </button>
              <button
                onClick={() => setStaffTab('homologados')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${staffTab === 'homologados' ? 'bg-emerald-100 text-emerald-850' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Homologados ({totalApproved})
              </button>
              <button
                onClick={() => setStaffTab('estatisticas')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${staffTab === 'estatisticas' ? 'bg-brand-light text-brand-primary' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Visão Geral das Turmas
              </button>
            </div>

            {staffTab !== 'estatisticas' && (
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar aluno ou responsável..."
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-primary w-full md:w-60"
                />
              </div>
            )}
          </div>

          {/* Tab Render: Pending */}
          {staffTab === 'pendentes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPending.length === 0 ? (
                <div className="md:col-span-2 text-center py-12 bg-white border border-dashed border-slate-200 rounded-[28px] text-slate-450 text-xs font-medium space-y-1">
                  <p>Nenhuma pré-matrícula pendente encontrada.</p>
                  <p className="text-[10px]">Novas inscrições feitas por Pais aparecem aqui em tempo real.</p>
                </div>
              ) : (
                filteredPending.map(s => (
                  <div key={s.id} className="bg-white border border-slate-200 rounded-[28px] p-6 hover:shadow-md transition-all flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      {/* Student Profile Row */}
                      <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-150 shadow-2xs">
                          <img src={s.photo} alt={s.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-extrabold text-slate-900 leading-none">{s.name}</h4>
                            <span className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 font-bold rounded-md uppercase tracking-wide">Pendente</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                            {s.className} • {s.age}
                          </p>
                        </div>
                      </div>

                      {/* Parent details info */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Responsável</span>
                          <span className="font-bold text-slate-750">{s.parentName}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Data Solicitação</span>
                          <span className="font-semibold text-slate-700">{s.enrollmentDate || '12/08/2026'}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Contato Email</span>
                          <span className="font-medium text-slate-650 text-[11px] truncate block">{s.parentEmail}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Localidade / DF</span>
                          <span className="font-semibold text-slate-700">{s.cep || '70390-025'}</span>
                        </div>
                      </div>

                      {/* Special Needs Section if appropriate */}
                      {s.hasSpecialNeeds ? (
                        <div className="bg-purple-50/50 border border-purple-200 p-3.5 rounded-xl space-y-1">
                          <p className="text-[10px] font-black text-purple-900 uppercase tracking-wider flex items-center gap-1">
                            <ShieldAlert size={12} className="text-purple-600" />
                            Necessidade Educacional lauda / declarada
                          </p>
                          <p className="text-xs text-slate-650 font-medium leading-relaxed">
                            {s.specialNeeds || 'Laudo declarado, necessitando adaptações.'}
                          </p>
                        </div>
                      ) : (
                        <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 font-semibold italic">
                          Sem necessidades especiais relatadas. Plano de adaptação comum ativo.
                        </div>
                      )}
                    </div>

                    {/* Actions panel */}
                    <div className="pt-4 border-t border-slate-100 flex gap-2">
                      <button
                        onClick={() => handleApproveEnrollment(s.id)}
                        className="flex-1 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition shadow-xs cursor-pointer"
                      >
                        <UserCheck size={14} />
                        <span>Homologar Matrícula</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab Render: Approved */}
          {staffTab === 'homologados' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredApproved.length === 0 ? (
                <div className="md:col-span-2 text-center py-12 bg-white border border-dashed border-slate-200 rounded-[28px] text-slate-450 text-xs font-medium">
                  Nenhuma matrícula homologada dinâmica no histórico recente.
                </div>
              ) : (
                filteredApproved.map(s => (
                  <div key={s.id} className="bg-white border border-slate-200 rounded-[28px] p-6 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      {/* Student Profile Row */}
                      <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-emerald-200 shadow-2xs">
                          <img src={s.photo} alt={s.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-extrabold text-slate-900 leading-none">{s.name}</h4>
                            <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 font-bold rounded-md uppercase tracking-wide">Aprovado</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                            {s.className} • {s.age}
                          </p>
                        </div>
                      </div>

                      {/* Parent details info */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Responsável</span>
                          <span className="font-bold text-slate-750">{s.parentName}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Data Solicitação</span>
                          <span className="font-semibold text-slate-700">{s.enrollmentDate || '12/08/2026'}</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Vínculo Escola</span>
                          <span className="font-bold text-emerald-700">Colégio La Salle Brasília</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Status Diário</span>
                          <span className="font-bold text-slate-600">Integrado à Chamada</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 text-[11px] font-bold rounded-xl text-center">
                      ✓ Aluno homologado e ativo no ecossistema La Salle Conecta.
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab Render: Stats & General Classes List */}
          {staffTab === 'estatisticas' && (
            <div className="bg-white border border-slate-200 rounded-[28px] p-6 md:p-8 space-y-6">
              <h4 className="text-sm font-black text-brand-primary uppercase tracking-wider border-b border-slate-200/60 pb-2">Vagas e Alocação por Classe BNCC</h4>
              
              <div className="space-y-4.5">
                {AVAILABLE_CLASSES.map(cls => {
                  const onClass = students.filter(s => s.classId === cls.id);
                  const isSpecial = onClass.filter(s => s.hasSpecialNeeds).length;
                  return (
                    <div key={cls.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 p-4 bg-slate-50/70 border border-slate-150 rounded-2xl">
                      <div className="space-y-0.5">
                        <p className="text-sm font-extrabold text-slate-900">{cls.name}</p>
                        <p className="text-[11px] text-slate-450 font-semibold">{cls.desc} • Código BNCC Ativo</p>
                      </div>

                      <div className="flex gap-4 items-center">
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-700">Total Alunos: <span className="text-slate-900 font-extrabold">{onClass.length}</span></p>
                          {isSpecial > 0 && (
                            <p className="text-[10px] text-purple-700 font-bold">Inclusão Pedagógica (PEI): {isSpecial}</p>
                          )}
                        </div>
                        <span className="px-2.5 py-1 text-[10px] bg-white border border-slate-250 text-slate-700 font-extrabold rounded-lg">BNCC Ativo</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
