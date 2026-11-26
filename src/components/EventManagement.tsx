import React, { useState } from 'react';
import { 
  FileText, 
  MapPin, 
  Users, 
  Clock, 
  Upload, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Clock3, 
  Lightbulb, 
  Send, 
  Award, 
  X, 
  EyeOff, 
  Plus,
  HelpCircle,
  Home,
  FileSpreadsheet,
  Search,
  CheckCircle2
} from 'lucide-react';

interface Attendee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'confirmed' | 'pending';
}

export default function EventManagement() {
  // Toggles for visual resource checkboxes
  const [resources, setResources] = useState({
    inscricoesOnline: true,
    convitesDigitais: true,
    rsvp: false,
    galeriaFotos: true,
    transmissaoVivo: false,
    certificadosDigitais: false
  });

  // Basic Form States
  const [eventName, setEventName] = useState('Mostra Cultural de Primavera');
  const [eventDesc, setEventDesc] = useState('Descubra o resultado do projeto focado na estação das flores com materiais ecológicos.');
  const [eventStart, setEventStart] = useState('2024-09-22T14:00');
  const [eventEnd, setEventEnd] = useState('2024-09-22T17:30');
  const [eventLocation, setEventLocation] = useState('Auditório LaSalle Unidade Centro');
  const [eventType, setEventType] = useState('Mostra Pedagógica');
  const [eventTarget, setEventTarget] = useState<'geral' | 'familias' | 'educadores'>('familias');

  const [managedEvents, setManagedEvents] = useState([
    { id: 'evt-1', name: 'Mostra Cultural de Primavera', desc: 'Descubra o resultado do projeto focado na estação das flores com materiais ecológicos.', start: '2024-09-22T14:00', end: '2024-09-22T17:30', location: 'Auditório LaSalle Unidade Centro', type: 'Mostra Pedagógica', target: 'familias' as const },
    { id: 'evt-2', name: 'Festa da Família Conecta', desc: 'Encontro comunitário para integração coletiva regada a piquenique e riso.', start: '2024-10-05T09:00', end: '2024-10-05T13:00', location: 'Pátio Central LaSalle Abel', type: 'Festa Escolar', target: 'familias' as const },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [listSearch, setListSearch] = useState('');

  // Interactive attendee list
  const [attendees, setAttendees] = useState<Attendee[]>([
    { id: '1', name: 'Ricardo Silva', role: 'Pai do Aluno - 3º Ano', avatar: '👨‍💼', status: 'confirmed' },
    { id: '2', name: 'Dra. Helena Martins', role: 'Palestrante Convidada', avatar: '👩‍⚕️', status: 'pending' },
    { id: '3', name: 'Ana Carolina Vaz', role: 'Mãe do Aluno - Infantil', avatar: '👩‍💻', status: 'confirmed' }
  ]);

  const [showAllAttendeesModal, setShowAllAttendeesModal] = useState(false);
  const [attendeeSearchQuery, setAttendeeSearchQuery] = useState('');
  const [isSuccessNotification, setIsSuccessNotification] = useState(false);

  // Full mock list with 12 extra participants
  const mockAllAttendees: Attendee[] = [
    { id: '1', name: 'Ricardo Silva', role: 'Pai do Aluno - 3º Ano', avatar: '👨‍💼', status: 'confirmed' },
    { id: '2', name: 'Dra. Helena Martins', role: 'Palestrante Convidada', avatar: '👩‍⚕️', status: 'pending' },
    { id: '3', name: 'Ana Carolina Vaz', role: 'Mãe do Aluno - Infantil', avatar: '👩‍💻', status: 'confirmed' },
    { id: '4', name: 'Juliana Portella', role: 'Coordenadora Pedagógica', avatar: '👩‍🏫', status: 'confirmed' },
    { id: '5', name: 'Marcos de Souza', role: 'Pai da Aluna Beatriz', avatar: '👨‍🔧', status: 'confirmed' },
    { id: '6', name: 'Fernanda Lima', role: 'Pai do Aluno Yuri', avatar: '👩‍🎨', status: 'pending' },
    { id: '7', name: 'Eduardo Baptista', role: 'Professor de Educação Física', avatar: '👨', status: 'confirmed' },
    { id: '8', name: 'Amanda Albuquerque', role: 'Mãe de Lucas - 5º Ano', avatar: '👩‍💼', status: 'confirmed' },
    { id: '9', name: 'Sérgio Reis', role: 'Pai do Murilo - 2º Ano', avatar: '👨‍🌾', status: 'confirmed' },
    { id: '10', name: 'Carla Dias', role: 'Mãe da Alice - Maternal II', avatar: '👩‍🍳', status: 'pending' }
  ];

  const handleToggleResource = (key: keyof typeof resources) => {
    setResources(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim() || !eventLocation.trim()) {
      alert('Por favor, preencha o nome e o local do evento.');
      return;
    }

    if (editingEventId) {
      setManagedEvents(prev => prev.map(evt => evt.id === editingEventId ? {
        id: editingEventId,
        name: eventName,
        desc: eventDesc,
        start: eventStart,
        end: eventEnd,
        location: eventLocation,
        type: eventType,
        target: eventTarget
      } : evt));
      alert('Evento atualizado com sucesso!');
    } else {
      const newEvt = {
        id: `evt-${Date.now()}`,
        name: eventName,
        desc: eventDesc,
        start: eventStart,
        end: eventEnd,
        location: eventLocation,
        type: eventType,
        target: eventTarget
      };
      setManagedEvents(prev => [...prev, newEvt]);
      alert('Novo evento criado com sucesso!');
    }

    setEditingEventId(null);
    setIsFormOpen(false);
    setIsSuccessNotification(true);
    setTimeout(() => {
      setIsSuccessNotification(false);
    }, 4500);
  };

  const handleDeleteEvent = (id: string, name: string) => {
    if (confirm(`Deseja realmente remover o evento "${name}"?`)) {
      setManagedEvents(prev => prev.filter(e => e.id !== id));
      alert('Evento removido.');
    }
  };

  const handleStartEdit = (evt: typeof managedEvents[0]) => {
    setEditingEventId(evt.id);
    setEventName(evt.name);
    setEventDesc(evt.desc);
    setEventStart(evt.start);
    setEventEnd(evt.end);
    setEventLocation(evt.location);
    setEventType(evt.type);
    setEventTarget(evt.target);
    setIsFormOpen(true);
  };

  const handleStartCreate = () => {
    setEditingEventId(null);
    setEventName('');
    setEventDesc('');
    setEventStart('2024-09-22T14:00');
    setEventEnd('2024-09-22T17:30');
    setEventLocation('');
    setEventType('Mostra Pedagógica');
    setEventTarget('familias');
    setIsFormOpen(true);
  };

  const filteredAttendees = mockAllAttendees.filter(a => 
    a.name.toLowerCase().includes(attendeeSearchQuery.toLowerCase()) ||
    a.role.toLowerCase().includes(attendeeSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="event-management-module">
      
      {/* Top Breadcrumb Header Bar (Image 2 style) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span className="text-brand-primary">La Salle Conecta</span>
          <span>&gt;</span>
          <span>Eventos</span>
          <span>&gt;</span>
          <span className="text-slate-700 font-black">Criação</span>
        </div>

        {/* Dummy Tabs Indicator */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
          <button className="px-3 py-1 bg-slate-50 rounded-full hover:text-slate-800 transition">Dashboard</button>
          <button className="px-3 py-1 bg-slate-50 rounded-full hover:text-slate-800 transition">Calendário</button>
          <button className="px-4 py-1.5 bg-brand-light text-brand-primary border border-brand-primary/20 rounded-full font-extrabold shadow-sm">Eventos</button>
          <button className="px-3 py-1 bg-slate-50 rounded-full hover:text-slate-800 transition">Relatórios</button>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Mini Sidebar - Portal Gestor Nav (Matches image 2 layout perfectly) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-6">
            
            {/* Header info */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-150">
              <div className="w-10 h-10 bg-[#0a2540] text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner">
                🏫
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 leading-tight">Portal Gestor</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Coordenação Escolar</p>
              </div>
            </div>

            {/* Simulated Action Item */}
            <button 
              onClick={handleStartCreate}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl py-3 px-4 text-xs font-extrabold flex items-center justify-center gap-2 transition shadow-md border border-amber-500 cursor-pointer"
            >
              <Plus size={14} className="stroke-[3px]" />
              <span>Novo Evento</span>
            </button>

            {/* Options list as tabs inside component */}
            <nav className="space-y-1">
              {[
                { id: 'visao', label: 'Lista de Eventos', active: !isFormOpen, click: () => setIsFormOpen(false) },
                { id: 'criar', label: 'Criar / Editar', active: isFormOpen, click: () => setIsFormOpen(true) },
                { id: 'recursos', label: 'Ativar Recursos', active: false, click: () => setIsFormOpen(true) },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.click}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                    item.active 
                      ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm border border-amber-500' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Bottom menu supports links */}
            <div className="pt-4 border-t border-slate-150 flex justify-between text-[11px] font-bold text-slate-400 px-2 mt-4">
              <button className="hover:text-slate-650 flex items-center gap-1"><HelpCircle size={12} /> Suporte</button>
              <button className="hover:text-amber-600 flex items-center gap-1">Sair</button>
            </div>

          </div>
        </div>

        {/* Center Primary Event Editor Form Panel or Event Lists */}
        <div className="lg:col-span-6 space-y-6">
          {!isFormOpen ? (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
              <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">Cronograma de Eventos</h1>
                  <p className="text-xs text-slate-450 mt-1">Gerencie a lista de eventos publicados de maneira simplificada.</p>
                </div>
                <button 
                  onClick={handleStartCreate}
                  className="bg-[#002D62] text-white text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-xl hover:bg-blue-900 transition"
                >
                  + Novo
                </button>
              </div>

              {/* Search filter for events list */}
              <input 
                type="text" 
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
                placeholder="Filtrar eventos por nome..."
                className="w-full bg-slate-50 text-slate-900 pl-4 pr-4 py-2.5 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs font-semibold"
              />

              <div className="space-y-4">
                {managedEvents.filter(e => e.name.toLowerCase().includes(listSearch.toLowerCase())).map((evt) => (
                  <div key={evt.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-slate-300 transition">
                    <div className="space-y-1">
                      <span className="inline-block bg-[#002D62]/10 text-[#002D62] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        {evt.type}
                      </span>
                      <h3 className="text-xs font-black text-slate-900">{evt.name}</h3>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{evt.desc}</p>
                      <div className="flex gap-4 text-[10px] text-slate-400 font-bold">
                        <span>📍 {evt.location}</span>
                        <span>👥 Público: {evt.target}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 shrink-0">
                      <button 
                        onClick={() => handleStartEdit(evt)}
                        className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-650 hover:bg-amber-400 hover:text-slate-900 hover:border-amber-400 transition"
                        type="button"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(evt.id, evt.name)}
                        className="px-2.5 py-1.5 bg-rose-50 border border-slate-105 rounded-lg text-[10px] font-bold text-rose-700 hover:bg-rose-100 transition"
                        type="button"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handlePublish} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
              
              {/* Heading section */}
              <div className="border-b border-slate-100 pb-4">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  {editingEventId ? 'Editando Evento Escolhido' : 'Criação de Evento'}
                </h1>
                <p className="text-xs text-slate-450 mt-1">Configure os detalhes, defina o público e ative os recursos do seu evento escolar.</p>
              </div>

              {/* Success notification banner */}
              {isSuccessNotification && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center gap-3 animate-slide-in">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                  <div>
                    <p className="font-bold">Evento Publicado com Sucesso!</p>
                    <p className="text-[11px] text-emerald-600">Disparado no feed da família e adicionado ao calendário de todas as unidades da rede.</p>
                  </div>
                </div>
              )}

              {/* Fieldset - Informações Básicas (Matches layout shape perfectly) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 shadow-sm flex items-center justify-center font-bold">
                    ⓘ
                  </div>
                  <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">Informações Básicas</h2>
                </div>

                {/* Event title */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Nome do Evento</label>
                  <input 
                    type="text" 
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Ex: Mostra Cultural de Primavera"
                    className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none transition-all text-xs"
                  />
                </div>

                {/* Event description */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Descrição</label>
                  <textarea 
                    value={eventDesc}
                    rows={3}
                    onChange={(e) => setEventDesc(e.target.value)}
                    placeholder="Descreva os objetivos e a programação do evento..."
                    className="w-full bg-slate-50 text-slate-900 font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none transition-all text-xs resize-none"
                  />
                </div>

                {/* Dates row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                      <Clock size={11} className="text-slate-400" /> Início (Data e Hora)
                    </label>
                    <input 
                      type="datetime-local" 
                      value={eventStart}
                      onChange={(e) => setEventStart(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 font-bold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                      <Clock size={11} className="text-slate-400" /> Fim (Data e Hora)
                    </label>
                    <input 
                      type="datetime-local" 
                      value={eventEnd}
                      onChange={(e) => setEventEnd(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 font-bold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Location and dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                      <MapPin size={11} className="text-slate-400" /> Local ou Link Online
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="Endereço físico ou URL"
                        className="w-full bg-slate-50 text-slate-800 font-semibold pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs outline-none"
                      />
                      <MapPin size={14} className="text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Tipo de Evento</label>
                    <select 
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 font-semibold px-4 py-3 rounded-xl border border-slate-200 text-xs outline-none"
                    >
                      <option value="">Selecione um tipo...</option>
                      <option value="Mostra Pedagógica">Mostra Pedagógica</option>
                      <option value="Festa Escolar">Festa Escolar</option>
                      <option value="Reunião de Pais">Reunião de Pais</option>
                      <option value="Formação Continuada">Formação Continuada</option>
                    </select>
                  </div>
                </div>

                {/* Audience Badges */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Público-alvo</label>
                  <div className="flex gap-3">
                    {[
                      { id: 'geral', label: 'Geral' },
                      { id: 'familias', label: 'Famílias' },
                      { id: 'educadores', label: 'Educadores' }
                    ].map((aud) => {
                      const active = eventTarget === aud.id;
                      return (
                        <button
                          type="button"
                          key={aud.id}
                          onClick={() => setEventTarget(aud.id as any)}
                          className={`py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition border ${
                            active 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm font-extrabold' 
                              : 'bg-white text-slate-550 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${active ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white'}`}>
                            {active && <Check size={10} className="stroke-[3px]" />}
                          </div>
                          <span>{aud.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Fieldset - Recursos Ativos (Matches image 2 bottom layout) */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-800 shadow-sm flex items-center justify-center font-bold">
                    ⚙
                  </div>
                  <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">Recursos Ativos</h2>
                </div>

                {/* Switches Grid pattern */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'inscricoesOnline', label: 'Inscrições Online' },
                    { key: 'convitesDigitais', label: 'Convites Digitais' },
                    { key: 'rsvp', label: 'RSVP' },
                    { key: 'galeriaFotos', label: 'Galeria de Fotos/Vídeos' },
                    { key: 'transmissaoVivo', label: 'Transmissão ao Vivo' },
                    { key: 'certificadosDigitais', label: 'Certificados Digitais' }
                  ].map((item) => {
                    const checked = resources[item.key as keyof typeof resources];
                    return (
                      <div 
                        key={item.key}
                        className="bg-slate-50 rounded-2xl p-4 border border-slate-150 flex justify-between items-center hover:bg-indigo-50/10 transition"
                      >
                        <span className="text-xs font-bold text-slate-700">{item.label}</span>
                        
                        {/* Interactive switch knob */}
                        <button
                          type="button"
                          onClick={() => handleToggleResource(item.key as keyof typeof resources)}
                          className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer ${
                            checked ? 'bg-[#986e10] md:bg-brand-primary' : 'bg-slate-250'
                          }`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-150 ${
                            checked ? 'transform translate-x-6' : 'transform translate-x-1'
                          }`}></div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-600 transition"
                >
                  Voltar para Lista
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md"
                >
                  {editingEventId ? 'Atualizar Evento' : 'Publicar Evento'}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Right Side Options Controls & Interactive Registered Users */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Action Control Panel */}
          <div className="bg-[#0a2540] text-white rounded-3xl p-5 shadow-sm space-y-4 relative overflow-hidden group">
            
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <span className="text-xs font-black uppercase text-slate-350 tracking-widest">▲ Gerenciamento</span>
            </div>

            <button 
              onClick={handlePublish}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider py-3 rounded-2xl transition shadow-md border border-amber-500 cursor-pointer"
            >
              Publicar Evento
            </button>

            <button 
              type="button"
              onClick={() => {
                alert('Rascunho de "Mostra Cultural de Primavera" salvo em seu banco local temporário.');
              }}
              className="w-full border border-white/20 hover:bg-white/5 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>💾</span>
              <span>Salvar Rascunho</span>
            </button>

            {/* Quick Action Utilities */}
            <div className="pt-2 text-xs font-bold space-y-3 pl-1 text-slate-300">
              <button 
                type="button" 
                onClick={() => alert('Convites digitais gerados e enviados para 420 endereços de famílias da base.')}
                className="w-full text-left flex items-center gap-2 hover:text-white transition"
              >
                <Send size={12} className="text-amber-400" />
                <span>Enviar Convites</span>
              </button>
              
              <button 
                type="button" 
                onClick={() => alert('Os modelos de certificado serão liberados após a conferência de presença.')}
                className="w-full text-left flex items-center gap-2 hover:text-white transition"
              >
                <Award size={12} className="text-emerald-450" />
                <span>Gerar Certificados</span>
              </button>

              <button 
                type="button" 
                onClick={() => alert('O evento agora encontra-se em modo privado (rascunho).')}
                className="w-full text-left flex items-center gap-2 hover:text-amber-400 transition text-rose-350"
              >
                <EyeOff size={12} className="text-rose-400" />
                <span>Despublicar</span>
              </button>
            </div>

          </div>

          {/* Registered Attendees (Image 2 style) */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
            
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Inscritos</h3>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-100">
                124 confirmados
              </span>
            </div>

            {/* Simulated list */}
            <div className="space-y-3">
              {attendees.map((att) => (
                <div key={att.id} className="flex justify-between items-center p-2.5 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-150 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-120 flex items-center justify-center text-sm shadow-sm">
                      {att.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-none">{att.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">{att.role}</p>
                    </div>
                  </div>

                  {att.status === 'confirmed' ? (
                    <div className="text-emerald-500 bg-emerald-50 p-1 rounded-full border border-emerald-100">
                      <Check size={11} className="stroke-[3px]" />
                    </div>
                  ) : (
                    <div className="text-amber-500 bg-amber-50 p-1 r-full flex items-center justify-center" title="Aguardando confirmação">
                      <Clock3 size={11} className="stroke-[3px]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowAllAttendeesModal(true)}
              className="w-full text-center py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition border border-dashed border-slate-200 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Ver todos os participantes</span>
              <ArrowRight size={12} />
            </button>

          </div>

          {/* Tip container inside layout */}
          <div className="bg-emerald-50 border border-emerald-150 rounded-3xl p-5 shadow-sm flex gap-3 text-slate-700">
            <Lightbulb className="text-emerald-700 shrink-0 mt-0.5" size={16} />
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-emerald-950">Dica de Gestor</h4>
              <p className="text-[10px] text-emerald-800 leading-relaxed font-semibold">
                Eventos com Inscrições Online e Convites Digitais ativos costumam ter uma taxa de comparecimento 40% superior.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Comprehensive Attendees Modal */}
      {showAllAttendeesModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 space-y-4">
            <button 
              onClick={() => setShowAllAttendeesModal(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-405 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div>
              <h3 className="text-base font-bold text-slate-900">Participantes Confirmados ({mockAllAttendees.length})</h3>
              <p className="text-xs text-slate-450">Mostra Cultural de Primavera • Base Geral Integrada</p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input 
                type="text" 
                value={attendeeSearchQuery}
                onChange={(e) => setAttendeeSearchQuery(e.target.value)}
                placeholder="Buscar por nome ou grau de parentesco..."
                className="w-full bg-slate-50 text-slate-950 font-semibold pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-amber-300"
              />
              <Search size={14} className="text-slate-450 absolute left-3.5 top-3.5" />
            </div>

            {/* List container */}
            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
              {filteredAttendees.length > 0 ? (
                filteredAttendees.map((att) => (
                  <div key={att.id} className="flex justify-between items-center p-2.5 bg-slate-50/70 rounded-2xl border border-slate-150 hover:bg-white transition-all">
                    <div className="flex items-center gap-3">
                      <div className="text-base">{att.avatar}</div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{att.name}</h4>
                        <p className="text-[10px] text-slate-450">{att.role}</p>
                      </div>
                    </div>

                    {att.status === 'confirmed' ? (
                      <span className="text-[9px] bg-emerald-50 text-emerald-800 font-black px-2 py-0.5 rounded-md border border-emerald-200 uppercase">Confirmado</span>
                    ) : (
                      <span className="text-[9px] bg-amber-50 text-amber-700 font-black px-2 py-0.5 rounded-md border border-amber-200 uppercase">Pendente</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-slate-400 py-6">Nenhum participante encontrado.</p>
              )}
            </div>

            <button 
              onClick={() => setShowAllAttendeesModal(false)}
              className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition cursor-pointer"
            >
              Fechar Lista
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
