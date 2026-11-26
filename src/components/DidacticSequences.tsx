import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Copy, 
  Trash2, 
  Music, 
  Sprout, 
  BookOpen, 
  Save, 
  ArrowRight, 
  RefreshCw,
  LayoutGrid
} from 'lucide-react';

interface SequenceItem {
  id: string;
  stepName: string;
  bnccCode: string;
  duration: string;
  title: string;
}

export default function DidacticSequences() {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSaved, setLastSaved] = useState('Última alteração: hoje às 14:35');

  // Initial sequence items matching Image 4
  const [steps, setSteps] = useState<SequenceItem[]>([
    {
      id: 'step-1',
      stepName: '1º PASSO',
      bnccCode: 'BNCC: EI03EO01',
      duration: 'Duração: 20 min',
      title: 'Roda de Conversa sobre os Sentidos'
    },
    {
      id: 'step-2',
      stepName: '2º PASSO',
      bnccCode: 'BNCC: EI03TS02',
      duration: 'Duração: 45 min',
      title: 'Exploração de Texturas'
    },
    {
      id: 'step-3',
      stepName: '3º PASSO',
      bnccCode: 'BNCC: EI03CG01',
      duration: 'Duração: 15 min',
      title: 'Reflexão Coletiva: O que sentimos?'
    }
  ]);

  // Library suggestions matching sidebar
  const libraryItems = [
    {
      title: 'Oficina de Sons',
      category: 'MUSICOLOGIA',
      bncc: 'EI03TS01',
      duration: '30 min',
      icon: <Music size={15} />
    },
    {
      title: 'Horta dos Pequenos',
      category: 'NATUREZA',
      bncc: 'EI03ET03',
      duration: '50 min',
      icon: <Sprout size={15} />
    },
    {
      title: 'Leitura Deleite',
      category: 'LINGUAGEM',
      bncc: 'EI03EF03',
      duration: '25 min',
      icon: <BookOpen size={15} />
    },
    {
      title: 'Teatrinho de Dedoches',
      category: 'CORPO & GESTOS',
      bncc: 'EI02CG04',
      duration: '35 min',
      icon: <LayoutGrid size={15} />
    }
  ];

  const filteredLibrary = libraryItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFromLibrary = (item: typeof libraryItems[0]) => {
    const nextStepNum = steps.length + 1;
    const newStep: SequenceItem = {
      id: `step-${Date.now()}`,
      stepName: `${nextStepNum}º PASSO`,
      bnccCode: `BNCC: ${item.bncc}`,
      duration: `Duração: ${item.duration}`,
      title: item.title
    };
    setSteps([...steps, newStep]);
    updateSaveTimestamp();
  };

  const handleAddNewSequence = () => {
    const nextStepNum = steps.length + 1;
    const newStep: SequenceItem = {
      id: `step-${Date.now()}`,
      stepName: `${nextStepNum}º PASSO`,
      bnccCode: 'BNCC: EI03ET02',
      duration: 'Duração: 30 min',
      title: 'Nova Atividade Integradora'
    };
    setSteps([...steps, newStep]);
    updateSaveTimestamp();
  };

  const handleDeleteStep = (id: string) => {
    const remaining = steps.filter(s => s.id !== id);
    // re-map stepNames (1º Passo, 2º Passo etc) to keep integrity
    const remapped = remaining.map((s, idx) => ({
      ...s,
      stepName: `${idx + 1}º PASSO`
    }));
    setSteps(remapped);
    updateSaveTimestamp();
  };

  const handleDuplicate = () => {
    alert('Toda a Sequência Didática foi duplicada no banco de rascunhos pedagógicos!');
  };

  const handleSave = () => {
    alert('Parabéns! Roteiro de Sequências Didáticas salvo com sucesso.');
    updateSaveTimestamp();
  };

  const updateSaveTimestamp = () => {
    const now = new Date();
    const formatted = `Última alteração: hoje às ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setLastSaved(formatted);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Header and Add button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-brand-gold text-brand-primary font-black px-2.5 py-1 rounded-sm tracking-wider uppercase">
              LUMI WORKSPACE
            </span>
            <span className="text-xs text-slate-450 font-bold">Suíte de Estruturação Curricular</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-brand-primary tracking-tight">
            Sequenciador de Atividades
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-semibold">
            Desenvolva a jornada escolar de forma lógica, ritmada e perfeitamente ancorada à BNCC.
          </p>
        </div>

        <button 
          onClick={handleAddNewSequence}
          className="px-5 py-3 bg-[#002D62] hover:bg-brand-primary-hover text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer self-start md:self-center shrink-0"
        >
          <Plus size={15} className="text-brand-gold" />
          <span>Criar Nova Sequência</span>
        </button>
      </div>

      {/* Main Double Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Sequence steps list layout */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-brand-primary">
                Organização de Sequências Didáticas
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase mt-0.5">
                Monte sua grade conectando micro-atividades lúdicas
              </p>
            </div>

            {/* List steps flow */}
            <div className="space-y-4 relative pl-3 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:border-l before:border-dashed before:border-slate-200">
              {steps.map((st, idx) => (
                <div 
                  key={st.id} 
                  className="relative flex items-center md:justify-between flex-wrap md:flex-nowrap gap-4 bg-white hover:bg-slate-50/50 p-4.5 rounded-2xl border border-slate-150 transition-all shadow-2xs hover:shadow-sm"
                >
                  {/* Step visual indicator */}
                  <div className="flex items-center gap-4">
                    {/* Drag points simulator element */}
                    <div className="text-slate-300 font-bold tracking-widest hidden sm:block text-xs cursor-grab select-none">
                      ⠿
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Step Number Round badge */}
                      <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 font-black text-[11px] rounded-lg tracking-wider text-center shrink-0">
                        {st.stepName}
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="text-sm font-extrabold text-slate-800 leading-tight">
                          {st.title}
                        </h4>
                        
                        {/* Badges anchor */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] bg-brand-light text-brand-primary px-2 py-0.5 rounded-md font-bold">
                            {st.bnccCode}
                          </span>
                          <span className="text-[10px] bg-amber-50 text-amber-850 px-2 py-0.5 rounded-md font-bold">
                            {st.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-1.5 ml-auto sm:ml-0 self-end md:self-center">
                    <button className="p-2 text-slate-400 hover:text-brand-primary bg-slate-500/0 hover:bg-slate-50 rounded-lg transition-all cursor-pointer">
                      <Edit size={14} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-brand-primary bg-slate-500/0 hover:bg-slate-50 rounded-lg transition-all cursor-pointer">
                      <Copy size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteStep(st.id)}
                      className="p-2 text-slate-400 hover:text-rose-550 bg-slate-500/0 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Drag & Drop addition area */}
            <button 
              onClick={handleAddNewSequence}
              className="w-full py-5 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-450 hover:bg-slate-50 hover:border-slate-350 transition-all cursor-pointer"
            >
              <span>+ Arraste uma atividade ou clique para adicionar</span>
            </button>

          </div>

        </div>

        {/* Right Column: Library & Advisor hints */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Library Search box - "Biblioteca" */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-xs space-y-4">
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-base font-black text-brand-primary flex items-center gap-1.5">
                <span>📚 Biblioteca</span>
              </h3>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow animate-pulse"></div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar atividades..."
                className="w-full bg-slate-50 border border-slate-200/90 pl-9 pr-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-primary focus:bg-white"
              />
            </div>

            {/* Library list */}
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {filteredLibrary.map((lib, id) => (
                <div 
                  key={id}
                  onClick={() => handleAddFromLibrary(lib)}
                  className="bg-slate-50/50 hover:bg-slate-100/70 border border-slate-150 p-3 rounded-xl flex items-center justify-between gap-3 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/90 border border-slate-200 text-slate-600 flex items-center justify-center font-bold">
                      {lib.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800 leading-none group-hover:text-brand-primary transition-colors">
                        {lib.title}
                      </h4>
                      <p className="text-[9px] text-[#005EA6] font-extrabold uppercase mt-1">
                        {lib.category}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold group-hover:translate-x-0.5 transition-transform">
                    +
                  </span>
                </div>
              ))}

              {filteredLibrary.length === 0 && (
                <p className="text-center text-xs text-slate-400 py-4 font-semibold italic">Nenhum recurso encontrado.</p>
              )}
            </div>

            {/* Link to full library */}
            <button className="text-xs font-bold text-[#005EA6] hover:text-brand-primary flex items-center gap-1 transition-colors w-full justify-center pt-1 cursor-pointer">
              <span>Ver biblioteca completa</span>
              <ArrowRight size={13} />
            </button>

          </div>

          {/* Dica da Lumi Widget */}
          <div className="bg-brand-light/35 border border-brand-primary/10 rounded-[32px] p-6 relative overflow-hidden space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white shadow-2xs border border-slate-150/80 flex items-center justify-center font-bold text-sm">
                🐝
              </div>
              <div>
                <h4 className="font-extrabold text-[#002D62] text-xs">Dica da Lumi AI</h4>
                <p className="text-[9px] text-slate-450 font-bold uppercase tracking-wide">Roteiro Equilibrado</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-650 font-semibold leading-relaxed m-0 italic bg-white/70 p-3 rounded-2xl border border-brand-primary/5">
              "Intercale atividades de alta energia com momentos de calma. Isso ajuda a manter o foco dos pequenos e respeita o ritmo biológico deles!"
            </p>
          </div>

        </div>

      </div>

      {/* Persistent footer bar mimicking Image 4 exactly */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-405">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{lastSaved}</span>
        </div>

        <div className="flex gap-2.5 w-full sm:w-auto">
          {/* Duplicate Sequence */}
          <button 
            onClick={handleDuplicate}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 rounded-xl text-xs font-extrabold transition-all cursor-pointer"
          >
            <Copy size={13} />
            <span>Duplicar Sequência</span>
          </button>

          {/* Save Sequence */}
          <button 
            onClick={handleSave}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3.5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl text-xs font-black uppercase transition-all shadow-xs cursor-pointer"
          >
            <Save size={13} className="text-brand-gold" />
            <span>Salvar Sequência</span>
          </button>
        </div>
      </div>

    </div>
  );
}
