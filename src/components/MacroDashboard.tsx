import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  MapPin, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  TrendingUpDown,
  BookOpen, 
  Layout, 
  AlertTriangle, 
  FileCheck, 
  MoreVertical, 
  Settings, 
  Bell, 
  Sparkles,
  UsersRound,
  GraduationCap,
  Building,
  Map,
  X,
  Compass
} from 'lucide-react';

interface WaitlistItem {
  rank: number;
  city: string;
  count: number;
  trend: 'up' | 'stable' | 'down';
}

export default function MacroDashboard() {
  const [selectedRegionalDetail, setSelectedRegionalDetail] = useState<string | null>(null);
  const [selectedMapNode, setSelectedMapNode] = useState<string | null>(null);

  const regionalsData = [
    { name: 'Polo Norte', fill: '78%', count: 420 },
    { name: 'Polo Sul', fill: '92%', count: 540 },
    { name: 'Região Leste', fill: '64%', count: 320 },
    { name: 'Central', fill: '85%', count: 680 },
    { name: 'Polo Oeste', fill: '59%', count: 280 }
  ];

  const waitlists: WaitlistItem[] = [
    { rank: 1, city: 'Porto Alegre', count: 420, trend: 'up' },
    { rank: 2, city: 'Canoas', count: 285, trend: 'stable' },
    { rank: 3, city: 'Gravataí', count: 142, trend: 'down' }
  ];

  // Specific spots representing schools on the custom visual map of Porto Alegre (SVG)
  const schoolSpots = [
    { name: 'La Salle Centro', x: 80, y: 150, pupils: 1420 },
    { name: 'La Salle Morro Santana', x: 220, y: 110, pupils: 820 },
    { name: 'La Salle Praia de Belas', x: 90, y: 220, pupils: 1150 },
    { name: 'La Salle Partenon', x: 190, y: 190, pupils: 960 },
    { name: 'La Salle Cristal', x: 70, y: 290, pupils: 620 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="lumi-gestao-macro-portal">
      
      {/* Top Search bar inside Conecta Portal layout (Matches Image 5 Header) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Mocking La Salle Conecta title breadcrumb inside layout */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-slate-800 tracking-tight">La Salle Conecta</span>
          <span className="text-slate-350 font-bold">/</span>
          <span className="text-slate-450 text-xs font-bold uppercase tracking-wider">Gestão Macro</span>
        </div>

        {/* Search tool */}
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Pesquisar na rede..."
            className="w-full bg-slate-50 text-slate-800 font-semibold pl-10 pr-4 py-2 rounded-xl border border-slate-200 outline-none text-xs focus:bg-white focus:ring-2 focus:ring-amber-300"
          />
          <Search size={13} className="text-slate-400 absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Main title block and critical warning alerts (Matches Image 5 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Title details */}
        <div className="lg:col-span-8 space-y-1.5">
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Painel de Gestão Macro</h1>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Bem-vindo, Gestor. Aqui está a visão consolidada da rede educativa sob sua supervisão. Otimize decisões com base em dados em tempo real.
          </p>
        </div>

        {/* Warning cards elements representing alerts on the right (PDS / Contratuais, Image 5 replica) */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Warning 1 - Low attendance notification */}
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 flex gap-3 shadow-inner">
            <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={16} />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-rose-900 leading-none">Unidades com baixa frequência (3)</h4>
              <p className="text-[10px] text-rose-800 font-semibold leading-tight">Abaixo de 75% na última semana de apuração.</p>
            </div>
          </div>

          {/* Warning 2 - Contractual pending */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex gap-3 shadow-inner">
            <FileCheck className="text-slate-550 shrink-0 mt-0.5" size={16} />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-900 leading-none">Pendências Contratuais (1)</h4>
              <p className="text-[10px] text-slate-600 font-semibold leading-tight">Polo Central - Renovação cadastral pendente.</p>
            </div>
          </div>

        </div>

      </div>

      {/* Scorecards grid for major capacity statistics (Matches Image 5 scoreboards row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* kpi 1 - Total de Instituições */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total de Instituições</span>
            <h2 className="text-2xl font-black text-indigo-950">42 <span className="text-xs font-bold text-slate-450 uppercase uppercase">Escolas</span></h2>
          </div>
          <div className="w-10 h-10 bg-indigo-50 text-indigo-800 rounded-2xl flex items-center justify-center text-lg">
            🏢
          </div>
        </div>

        {/* kpi 2 - Alunos Atendidos */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Alunos Atendidos</span>
            <h2 className="text-2xl font-black text-indigo-950">15.400</h2>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-800 rounded-2xl flex items-center justify-center text-lg">
            🎓
          </div>
        </div>

        {/* kpi 3 - Quadro de Educadores */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Quadro de Educadores</span>
            <h2 className="text-2xl font-black text-indigo-950">1.250</h2>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center justify-center text-lg">
            🧑‍🏫
          </div>
        </div>

        {/* kpi 4 - Equipe Multiprofissional */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Equipe Multiprofissional</span>
            <h2 className="text-2xl font-black text-indigo-950">85</h2>
          </div>
          <div className="w-10 h-10 bg-rose-50 text-rose-800 rounded-2xl flex items-center justify-center text-lg">
            🩺
          </div>
        </div>

      </div>

      {/* Comparison statistics grid (Regional occupy comparison on left, waitlist rank list on right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left comparative capacity chart (Matches Image 5 Ocupação de Vagas) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
          
          <div className="flex justify-between items-center pb-2 border-b border-slate-50">
            <div>
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Ocupação de Vagas por Regional</h3>
              <p className="text-[10px] text-slate-405 font-bold">Taxa comparativa de assentos preenchidos neste ciclo</p>
            </div>
            
            <select className="bg-slate-50 text-slate-700 font-bold py-1 px-3.5 rounded-xl border border-slate-200 text-[10px] outline-none cursor-pointer">
              <option>Este Mês</option>
              <option>Último Semestre</option>
            </select>
          </div>

          <div className="space-y-4 pt-2">
            {regionalsData.map((reg) => (
              <div 
                key={reg.name}
                onClick={() => setSelectedRegionalDetail(reg.name)}
                className="space-y-1.5 cursor-pointer group hover:bg-slate-50/50 p-2.5 rounded-2xl transition"
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span className="group-hover:text-brand-primary transition-colors">{reg.name}</span>
                  <span className="text-slate-900 font-extrabold">{reg.fill} <span className="text-[9px] text-slate-400">({reg.count} vagas)</span></span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-150">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: reg.fill }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right comparative Waitlist blocks list (Matches "Lista de Espera") */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
          
          <div>
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Lista de Espera por Município</h3>
            <p className="text-[10px] text-slate-450 font-bold">Atenção prioritária para redistribuição de vagas</p>
          </div>

          <div className="space-y-3.5">
            {waitlists.map((wl) => (
              <div key={wl.rank} className="bg-slate-50 border border-slate-150 rounded-2xl p-3.5 flex justify-between items-center hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-950 text-white font-extrabold text-xs flex items-center justify-center shadow-inner">
                    {wl.rank}
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{wl.city}</h4>
                    <span className="text-[9px] text-slate-450 uppercase font-black">Região Metropolitana</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-slate-950 font-mono">{wl.count}</span>
                  
                  {wl.trend === 'up' && (
                    <span className="p-1 rounded bg-rose-50 text-rose-600 border border-rose-100" title="Tendência de Crescimento">
                      <TrendingUp size={12} className="stroke-[3px]" />
                    </span>
                  )}
                  {wl.trend === 'stable' && (
                    <span className="p-1 rounded bg-amber-50 text-amber-600 border border-amber-100" title="Estável">
                      <TrendingUpDown size={12} className="stroke-[3px]" />
                    </span>
                  )}
                  {wl.trend === 'down' && (
                    <span className="p-1 rounded bg-emerald-50 text-emerald-600 border border-emerald-100" title="Tendência de Queda">
                      <TrendingDown size={12} className="stroke-[3px]" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => alert('Visualizando ranking metropolitano consolidado: Canoas (285), POA (420), Gravataí (142), Alvorada (98), Viamão (64).')}
            className="w-full text-center py-2 text-xs font-bold text-slate-450 hover:text-slate-800 transition"
          >
            Ver ranking completo &gt;
          </button>

        </div>

      </div>

      {/* Middle Recommendation observatory banner (Matches "Observatório La Salle da Infância") */}
      <div className="bg-radial from-slate-900 to-[#0a2540] text-white rounded-3xl p-6 relative overflow-hidden shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/5">
        
        <div className="space-y-3 z-10">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              INSIGHTS LUMI IA
            </span>
            <span className="text-[10px] text-teal-300 font-extrabold uppercase">Observatório La Salle da Infância</span>
          </div>

          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-bold tracking-tight max-w-2xl">
            "Tendência de crescimento em inclusão no Polo Sul. Baseado nos últimos relatórios, prevemos uma demanda 15% maior por profissionais de AEE no próximo semestre."
          </p>
        </div>

        <button 
          onClick={() => alert('Exibindo laudo analítico completo gerado pela inteligência Lumi.')}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider py-3 px-5 rounded-2xl transition z-10 shrink-0 shadow-md border border-amber-500 cursor-pointer flex items-center gap-1.5"
        >
          <span>Ver Relatório Completo</span>
          <Sparkles size={13} className="fill-slate-900" />
        </button>

        {/* Decorative circular graphics */}
        <div className="absolute right-1/4 -bottom-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-6 -top-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse"></div>
      </div>

      {/* Bottom rows Double Columns layout metrics (Coverage MAP on Left, frequency Circular Gauge on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Territorial coverage interactive map (Left, matches Map!) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
          
          <div>
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Cobertura Territorial</h3>
            <p className="text-[10px] text-slate-450 font-bold">Visualização espacial de pólos educacionais ativos na Grande Porto Alegre</p>
          </div>

          {/* Styled SVG map representation */}
          <div className="relative border border-slate-150 rounded-2xl overflow-hidden bg-slate-50 h-72 shadow-inner flex items-center justify-center">
            
            <svg 
              className="w-full h-full opacity-90 stroke-slate-200" 
              viewBox="0 0 350 350"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Map background grids representing districts */}
              <path d="M 20 80 Q 80 50 140 100 T 260 120 T 330 180 T 320 310" fill="none" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 300 20 Q 240 60 150 70 T 80 180 T 110 320" fill="none" strokeWidth="2" strokeDasharray="3 3" />
              
              {/* Porto Alegre River contour vector drawing */}
              <path 
                d="M 50 330 Q 80 280 90 220 T 110 140 T 130 50" 
                fill="none" 
                stroke="#bbdefb" 
                strokeWidth="10" 
                strokeLinecap="round"
                opacity="0.6"
              />
              
              <text x="35" y="180" fill="#90caf9" className="text-[8px] font-black uppercase tracking-widest font-mono" rotate="5 translate(10 10)">Guaíba River</text>

              {/* Porto Alegre city polygon mockup outline shapes */}
              <rect x="60" y="80" width="220" height="220" rx="30" fill="#31394c" fillOpacity="0.02" stroke="#2563eb" strokeWidth="1" strokeDasharray="4 4" />

              {/* Spots elements */}
              {schoolSpots.map((spot, index) => {
                const isSelected = selectedMapNode === spot.name;
                return (
                  <g 
                    key={index} 
                    className="cursor-pointer group"
                    onClick={() => setSelectedMapNode(spot.name)}
                  >
                    {/* Blink radiating pulse circles */}
                    <circle 
                      cx={spot.x} 
                      cy={spot.y} 
                      r={isSelected ? '15' : '8'} 
                      fill="#2563eb" 
                      fillOpacity={isSelected ? '0.2' : '0.1'} 
                      className="transition-all duration-300 group-hover:scale-125"
                    />
                    <circle 
                      cx={spot.x} 
                      cy={spot.y} 
                      r={isSelected ? '7' : '4'} 
                      fill={isSelected ? '#f59e0b' : '#2563eb'} 
                      stroke="white" 
                      strokeWidth="1.5"
                      className="transition-all"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Float coordinate target layout box */}
            <div className="absolute top-4 left-4 bg-[#0a2540]/90 backdrop-blur-md rounded-xl p-3 border border-white/10 text-white min-w-[130px] shadow-lg">
              <span className="text-[8px] font-black uppercase text-amber-300 tracking-wider">Metrópole POA</span>
              <h4 className="text-xs font-bold leading-tight">Porto Alegre</h4>
              <p className="text-[9px] text-slate-300 font-semibold mt-1">Clique nos marcadores no mapa acima para ver estatísticas.</p>
            </div>

            {/* Detail drawer when a node is clicked */}
            {selectedMapNode && (
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 text-slate-900 shadow-xl max-w-xs animate-slide-in">
                <button 
                  onClick={() => setSelectedMapNode(null)}
                  className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-800"
                >
                  <X size={12} />
                </button>
                <span className="text-[9px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-black uppercase">Escola Ativa</span>
                <h4 className="text-xs font-black text-indigo-950 mt-1.5">{selectedMapNode}</h4>
                <p className="text-[10px] text-slate-600 mt-1">Pupilos matriculados: <strong>{schoolSpots.find(s => s.name === selectedMapNode)?.pupils}</strong></p>
                <p className="text-[9px] text-slate-405 leading-relaxed font-semibold">Integrada totalmente aos canais digitais do La Salle Conecta.</p>
              </div>
            )}

            {/* Geographical indicator */}
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-slate-400 font-bold hidden sm:block">
              COORD: 30.0346° S, 51.2177° W
            </div>
          </div>

        </div>

        {/* Global Attendance Ring Gauge (Right, matches Gauge Wheel!) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between items-center text-center">
          
          <div className="w-full text-left">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Frequência Escolar</h3>
            <p className="text-[10px] text-slate-450 font-bold uppercase">Média Geral Consolidada</p>
          </div>

          {/* Circular ring attendance vector gauge chart */}
          <div className="relative w-44 h-44 my-4 flex items-center justify-center">
            
            <svg className="w-full h-full transform -rotate-90">
              {/* Outer background loop */}
              <circle 
                cx="88" 
                cy="88" 
                r="70" 
                stroke="#f1f5f9" 
                strokeWidth="14" 
                fill="transparent" 
              />
              {/* Core gold highlighted arc (92% width calculation: 2 * PI * r = 439.8 strokeDasharray, 92% is 404.6) */}
              <circle 
                cx="88" 
                cy="88" 
                r="70" 
                stroke="#0a2540" 
                strokeWidth="14" 
                fill="transparent" 
                strokeDasharray="439.8"
                strokeDashoffset="35.2" // representing 92% progress fill
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center score readout */}
            <div className="absolute text-center space-y-0.5">
              <span className="text-3xl font-black text-indigo-950 tracking-tighter">92%</span>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">MÉDIA GLOBAL</p>
            </div>

          </div>

          {/* Goal indicators */}
          <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-50 pt-4 text-xs font-semibold text-slate-500">
            <div className="text-center space-y-0.5">
              <span className="block text-[10px] text-slate-400 uppercase font-black">Meta Institucional</span>
              <strong className="text-indigo-950 font-black text-sm">95%</strong>
            </div>

            <div className="text-center space-y-0.5 border-l border-slate-100">
              <span className="block text-[10px] text-slate-400 uppercase font-black">Tendência Mensal</span>
              <strong className="text-emerald-700 font-black text-sm">+2.4%</strong>
            </div>
          </div>

        </div>

      </div>

      {/* Regional details popup */}
      {selectedRegionalDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100 space-y-4">
            <button 
              onClick={() => setSelectedRegionalDetail(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-405 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
              PÓLO COMPARATIVO
            </span>

            <h3 className="text-base font-bold text-slate-900">{selectedRegionalDetail}</h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              As taxas de preenchimento nessa regional indicam equilíbrio adequado. Nossos algoritmos sugerem re-alocação mútua no próximo bimestre para otimização de turmas.
            </p>

            <div className="bg-slate-50 p-3 rounded-2xl text-[11px] text-slate-705 font-medium space-y-1.5">
              <p>📍 Escolas Sincronizadas: <strong>8 unidades</strong></p>
              <p>⚡ Matrículas Ativas Estimadas: <strong>3.420 pupilos</strong></p>
              <p>🎯 Desempenho de BNCC Concluso: <strong>86%</strong></p>
            </div>

            <button 
              onClick={() => setSelectedRegionalDetail(null)}
              className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition cursor-pointer"
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
