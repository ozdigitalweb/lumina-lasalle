import React, { useState } from 'react';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Bell, 
  Settings, 
  Check, 
  Sparkles,
  Calendar as CalendarIcon,
  X,
  MapPin,
  Users
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  date: number; // Day of June 2024
  type: 'festa' | 'mostra' | 'reuniao' | 'formacao';
  target: 'geral' | 'familias' | 'educadores';
  colorClass: string;
}

export default function SchoolCalendar() {
  const [activeView, setActiveView] = useState<'mensal' | 'semanal' | 'lista'>('mensal');
  const [selectedTarget, setSelectedTarget] = useState<'geral' | 'familias' | 'educadores'>('geral');
  
  // Checking states for event types
  const [filters, setFilters] = useState({
    festa: true,
    mostra: true,
    reuniao: true,
    formacao: true
  });

  // Calendar event items
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 'evt-1',
      title: 'Reunião de Pais - 1º Ano',
      date: 15,
      type: 'reuniao',
      target: 'familias',
      colorClass: 'bg-amber-400 text-slate-900 border-amber-500 font-semibold'
    },
    {
      id: 'evt-2',
      title: 'Mostra Pedagógica 2024',
      date: 22,
      type: 'mostra',
      target: 'geral',
      colorClass: 'bg-teal-50 text-teal-800 border-teal-200 font-medium'
    },
    {
      id: 'evt-3',
      title: 'Festa Junina (Prep)',
      date: 22,
      type: 'festa',
      target: 'geral',
      colorClass: 'bg-pink-50 text-pink-700 border-pink-200 font-medium'
    }
  ]);

  // Modals / Interactivity
  const [showTalentModal, setShowTalentModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [viewingEvent, setViewingEvent] = useState<EventItem | null>(null);
  
  // Form state
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<'festa' | 'mostra' | 'reuniao' | 'formacao'>('reuniao');
  const [newEventTarget, setNewEventTarget] = useState<'geral' | 'familias' | 'educadores'>('geral');

  // Days mapping for June 2024. June 1st is Saturday.
  // We need to print May 26 to May 31 as grayed out previous days.
  const prevMonthDays = [26, 27, 28, 29, 30, 31];
  const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const toggleFilter = (type: 'festa' | 'mostra' | 'reuniao' | 'formacao') => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const activeEvents = events.filter(evt => {
    // Check type filter
    if (!filters[evt.type]) return false;
    // Check target filter
    if (selectedTarget !== 'geral' && evt.target !== selectedTarget) {
      return false;
    }
    return true;
  });

  const getDayEvents = (day: number) => {
    return activeEvents.filter(evt => evt.date === day);
  };

  const handleOpenAddEvent = (day: number) => {
    setEditingEventId(null);
    setNewEventTitle('');
    setNewEventType('reuniao');
    setNewEventTarget('geral');
    setSelectedDay(day);
    setShowAddEventModal(true);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim() || selectedDay === null) return;

    let color = '';
    switch (newEventType) {
      case 'festa': color = 'bg-pink-50 text-pink-700 border-pink-200 font-medium'; break;
      case 'mostra': color = 'bg-teal-50 text-teal-800 border-teal-200 font-medium'; break;
      case 'reuniao': color = 'bg-amber-400 text-slate-900 border-amber-500 font-semibold'; break;
      case 'formacao': color = 'bg-indigo-50 text-indigo-700 border-indigo-200 font-medium'; break;
    }

    if (editingEventId) {
      // Update
      setEvents(prev => prev.map(evt => evt.id === editingEventId ? {
        ...evt,
        title: newEventTitle,
        type: newEventType,
        target: newEventTarget,
        colorClass: color
      } : evt));
      setEditingEventId(null);
      alert('Evento atualizado com sucesso no calendário escolar!');
    } else {
      // Create
      const newEvt: EventItem = {
        id: `evt-${Date.now()}`,
        title: newEventTitle,
        date: selectedDay,
        type: newEventType,
        target: newEventTarget,
        colorClass: color
      };
      setEvents(prev => [...prev, newEvt]);
      alert('Novo evento agendado de forma sincronizada!');
    }

    setNewEventTitle('');
    setShowAddEventModal(false);
  };

  const handleSelectEventForEdit = (evt: EventItem) => {
    setEditingEventId(evt.id);
    setSelectedDay(evt.date);
    setNewEventTitle(evt.title);
    setNewEventType(evt.type);
    setNewEventTarget(evt.target);
    setViewingEvent(null);
    setShowAddEventModal(true);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (confirm(`Excluir o evento "${title}"? esta ação removerá o aviso do cronograma.`)) {
      setEvents(prev => prev.filter(evt => evt.id !== id));
      setViewingEvent(null);
      alert('Evento removido do calendário.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="lumi-schools-calendar-module">
      
      {/* Mini Segmented header inside page block mirroring Image 1 toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-slate-950 font-bold text-lg shadow-sm">
            LS
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              Lumi Schools <span className="text-xs bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded-full">Calendário</span>
            </h2>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">La Salle Conecta • Sistema Unificado</p>
          </div>
        </div>

        {/* Mock Navigation links inside layout */}
        <div className="flex items-center gap-5 text-sm font-semibold text-slate-500">
          <button className="text-slate-950 border-b-2 border-amber-400 pb-1 px-1 cursor-pointer">Calendar</button>
          <button className="hover:text-slate-800 transition pb-1 px-1 cursor-pointer">Events</button>
          <button className="hover:text-slate-800 transition pb-1 px-1 cursor-pointer">Directory</button>
          <button className="hover:text-slate-800 transition pb-1 px-1 cursor-pointer">Reports</button>
        </div>

        {/* Profile and action quick stats */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleOpenAddEvent(15)}
            className="bg-[#0a2540] hover:bg-slate-850 text-white rounded-full px-4 py-2 text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Event</span>
          </button>
          
          <div className="relative p-2 text-slate-500 hover:text-slate-800 transition cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </div>

          <div className="p-2 text-slate-500 hover:text-slate-800 transition cursor-pointer">
            <Settings size={18} />
          </div>

          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
            alt="Profile Avatar" 
            className="w-8 h-8 rounded-full border border-slate-200 shadow-sm"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Main Structural calendar grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side Options Panel (Image 1 replica) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Filter Container */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-6">
            
            {/* Filter by Type */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-3 bg-brand-primary rounded-full"></span>
                Filtrar por Tipo
              </h3>
              
              <div className="space-y-2.5">
                {[
                  { key: 'festa', label: 'Festa Junina', color: 'bg-pink-500' },
                  { key: 'mostra', label: 'Mostra Pedagógica', color: 'bg-teal-500' },
                  { key: 'reuniao', label: 'Reunião de Família', color: 'bg-amber-400' },
                  { key: 'formacao', label: 'Formação de Professores', color: 'bg-indigo-500' }
                ].map((item) => {
                  const checked = filters[item.key as 'festa' | 'mostra' | 'reuniao' | 'formacao'];
                  return (
                    <label 
                      key={item.key} 
                      className="flex items-center gap-3 cursor-pointer group select-none"
                    >
                      <div className="relative">
                        <input 
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleFilter(item.key as 'festa' | 'mostra' | 'reuniao' | 'formacao')}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-md border-2 transition-all duration-150 flex items-center justify-center ${
                          checked 
                            ? 'border-brand-primary bg-brand-primary' 
                            : 'border-slate-350 bg-white group-hover:border-slate-400'
                        }`}>
                          {checked && <Check size={12} className="text-white stroke-[3px]" />}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
                        {item.label}
                      </span>
                      <span className={`w-2 h-2 rounded-full ml-auto ${item.color}`}></span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Target Audience Button Row */}
            <div className="space-y-3.5 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Users size={14} className="text-slate-400" />
                Público-alvo
              </h3>
              
              <div className="flex flex-col gap-2">
                {[
                  { id: 'geral', label: 'Geral' },
                  { id: 'familias', label: 'Famílias' },
                  { id: 'educadores', label: 'Educadores' }
                ].map((audience) => {
                  const active = selectedTarget === audience.id;
                  return (
                    <button
                      key={audience.id}
                      onClick={() => setSelectedTarget(audience.id as any)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all duration-150 ${
                        active 
                          ? 'bg-amber-400 text-slate-950 shadow-sm border border-amber-500 font-extrabold' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      {audience.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Lower Alert Ad Banner in deep navy (matches Image 1 perfectly) */}
          <div className="bg-[#0a2540] text-white rounded-3xl p-5 relative overflow-hidden shadow-md group">
            
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-300"></div>
            
            <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-4 shadow-sm">
              NOVO
            </span>
            
            <h4 className="text-sm font-bold leading-snug tracking-tight mb-3">
              Prepare-se para a Mostra de Talentos de Julho!
            </h4>
            
            <button 
              onClick={() => setShowTalentModal(true)}
              className="text-amber-300 text-xs font-bold hover:text-white transition flex items-center gap-1 cursor-pointer mt-4"
            >
              <span>Ver detalhes</span>
              <span>&gt;</span>
            </button>
          </div>

        </div>

        {/* Center / Right Side Main Calendar Canvas Component (Image 1 replica) */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
            
            {/* Header controls inside calendar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              
              {/* Month Selection */}
              <div className="flex items-center gap-4">
                <h1 className="text-xl md:text-2xl font-black text-[#0a2540] tracking-tight">
                  Junho 2024
                </h1>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button className="p-1.5 hover:bg-white rounded text-slate-600 transition cursor-pointer">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-white rounded text-slate-600 transition cursor-pointer">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* View Switches & Download buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold text-slate-500">
                  {[
                    { id: 'mensal', label: 'Mensal' },
                    { id: 'semanal', label: 'Semanal' },
                    { id: 'lista', label: 'Lista' }
                  ].map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveView(v.id as any)}
                      className={`px-4 py-1.5 rounded-lg transition-all ${
                        activeView === v.id 
                          ? 'bg-white text-slate-900 shadow-sm font-extrabold' 
                          : 'hover:text-slate-800'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>

                <button className="p-2 border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 rounded-full transition shadow-sm cursor-pointer">
                  <Download size={16} />
                </button>
              </div>

            </div>

            {/* Calendar Grid Container */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              
              {/* Day Headers */}
              <div className="grid grid-cols-7 bg-slate-50 border-b border-indigo-50 text-center py-3">
                {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((day, ix) => (
                  <span 
                    key={day} 
                    className={`text-[10px] font-black uppercase tracking-wider ${
                      ix === 0 || ix === 6 ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-7 grid-rows-5 select-none bg-slate-50/10">
                
                {/* Grayed out May days */}
                {prevMonthDays.map((day) => (
                  <div 
                    key={`prev-${day}`} 
                    className="min-h-[90px] md:min-h-[110px] p-2 border-r border-b border-slate-150 bg-slate-50/70 text-slate-350 text-xs font-semibold cursor-not-allowed"
                  >
                    {day}
                  </div>
                ))}

                {/* June days */}
                {currentMonthDays.map((day) => {
                  const dayEvents = getDayEvents(day);
                  const isToday = day === 21; // Mocking June 21st, 2024 as current style matching 2024
                  
                  return (
                    <div 
                      key={`day-${day}`}
                      onClick={() => handleOpenAddEvent(day)}
                      className={`min-h-[90px] md:min-h-[110px] p-2 border-r border-b border-slate-100 bg-white hover:bg-indigo-50/20 transition-all flex flex-col justify-between cursor-pointer group relative ${
                        isToday ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-[11px] font-bold ${
                          isToday 
                            ? 'w-5 h-5 bg-brand-primary text-white rounded-full flex items-center justify-center' 
                            : 'text-slate-650 group-hover:text-slate-900'
                        }`}>
                          {day}
                        </span>
                        
                        <span className="opacity-0 group-hover:opacity-100 text-[10px] text-brand-primary font-bold flex items-center transition-all bg-brand-light px-1 py-0.5 rounded">
                          + Event
                        </span>
                      </div>

                      {/* Display events of day */}
                      <div className="space-y-1 mt-1.5 grow overflow-y-auto">
                        {dayEvents.map((evt) => (
                           <div 
                             key={evt.id}
                             onClick={(e) => {
                               e.stopPropagation();
                               setViewingEvent(evt);
                             }}
                             className={`text-[9px] md:text-[10px] px-1.5 py-1 rounded-md border leading-tight truncate transition-all shadow-sm transform hover:scale-102 hover:shadow-md ${evt.colorClass}`}
                             title={evt.title}
                           >
                             {evt.title}
                           </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

              </div>

            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-200 text-center">
              <p className="text-xs text-slate-500 font-medium">Toque em qualquer dia para criar um novo evento de forma instantânea e sincronizada.</p>
            </div>

          </div>
        </div>

      </div>

      {/* Talent Show Detail Modal */}
      {showTalentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setShowTalentModal(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-405 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-4">
              COMUNICADO ESPECIAL
            </span>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Mostra de Talentos de Julho 2024
            </h3>
            
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              A Mostra de Talentos é o momento estelar da rede Lumi Schools de celebrar as inteligências múltiplas dos pequenos. Teremos canto, apresentações de artes plásticas feitas nos ateliês e demonstração de robótica.
            </p>

            <div className="space-y-2.5 mb-6 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <CalendarIcon size={14} className="text-brand-primary" />
                <span><strong>Data:</strong> 12 de Julho de 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-rose-500" />
                <span><strong>Local:</strong> Auditório Central La Salle Lumi</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-indigo-500" />
                <span><strong>Quem participa:</strong> Alunos do Fundamental e Educação Infantil</span>
              </div>
            </div>

            <button 
              onClick={() => setShowTalentModal(false)}
              className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition cursor-pointer"
            >
              Voltar ao Painel
            </button>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <form 
            onSubmit={handleCreateEvent}
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 space-y-4"
          >
            <button 
              type="button"
              onClick={() => setShowAddEventModal(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-405 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500" />
              <span>Agendar Evento</span>
            </h3>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Dia selecionado (Junho)</label>
              <input 
                type="text" 
                value={`${selectedDay} de Junho de 2024`} 
                disabled 
                className="w-full bg-slate-50 text-slate-600 rounded-xl px-4 py-2.5 text-xs font-bold border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Nome do Evento</label>
              <input 
                type="text" 
                required
                value={newEventTitle} 
                onChange={(e) => setNewEventTitle(e.target.value)} 
                placeholder="Ex: Formação Pedagógica Integrada"
                className="w-full bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 text-xs font-semibold border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Tipo de Evento</label>
                <select 
                  value={newEventType}
                  onChange={(e) => setNewEventType(e.target.value as any)}
                  className="w-full bg-slate-50 text-slate-700 rounded-xl px-4 py-2.5 text-xs font-semibold border border-slate-200 outline-none"
                >
                  <option value="reuniao">Reunião</option>
                  <option value="mostra">Mostra</option>
                  <option value="festa">Festa</option>
                  <option value="formacao">Formação</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1.5">Público-alvo</label>
                <select 
                  value={newEventTarget}
                  onChange={(e) => setNewEventTarget(e.target.value as any)}
                  className="w-full bg-slate-50 text-slate-700 rounded-xl px-4 py-2.5 text-xs font-semibold border border-slate-200 outline-none"
                >
                  <option value="geral">Geral</option>
                  <option value="familias">Famílias</option>
                  <option value="educadores">Educadores</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition cursor-pointer"
            >
              {editingEventId ? 'Salvar Alterações' : 'Confirmar Evento'}
            </button>
          </form>
        </div>
      )}

      {/* Viewing Event Details Modal */}
      {viewingEvent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in text-slate-800">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 space-y-4">
            <button 
              type="button"
              onClick={() => setViewingEvent(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-405 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span>📅 Detalhes do Evento</span>
            </h3>

            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Título do Evento</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{viewingEvent.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Dia do Evento</p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">{viewingEvent.date} de Junho de 2024</p>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Público-alvo</p>
                <span className="inline-block bg-slate-100 px-2.5 py-0.5 rounded text-[10px] font-bold text-slate-700 capitalize mt-0.5">
                  {viewingEvent.target}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleSelectEventForEdit(viewingEvent)}
                className="flex-1 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold uppercase rounded-xl transition cursor-pointer text-center"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDeleteEvent(viewingEvent.id, viewingEvent.title)}
                className="flex-1 py-2.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold uppercase rounded-xl transition cursor-pointer text-center"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
