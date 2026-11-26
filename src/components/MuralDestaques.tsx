import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Plus, 
  Trash2, 
  Heart, 
  MessageSquare, 
  Share2, 
  Calendar, 
  BookOpen, 
  Filter, 
  ChevronRight, 
  Upload, 
  X, 
  CheckCircle, 
  FileText,
  Bookmark,
  Bell,
  Settings,
  Flame,
  Award
} from 'lucide-react';

interface FeedCard {
  id: string;
  category: 'Projeto Inovador' | 'Boa Prática' | 'Conquista' | 'Evento Escolar';
  unit: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  comments: number;
  date: string;
  authorAvatars: string[];
}

export default function MuralDestaques() {
  const [activeTab, setActiveTab] = useState<'mural'>('mural');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [orderBy, setOrderBy] = useState<'novos' | 'curtidos'>('novos');

  // Primary active feed items
  const [posts, setPosts] = useState<FeedCard[]>([
    {
      id: 'post-1',
      category: 'Projeto Inovador',
      unit: 'La Salle Abel',
      title: 'Festival de Robótica: Pequenos Grandes Inventores',
      description: 'Nossos alunos do 5º ano desenvolveram soluções sustentáveis usando lego educacional e automação básica nos ateliês.',
      imageUrl: 'https://images.unsplash.com/photo-1531297484001-[robot]?auto=format&fit=crop&w=400&q=80', // Replace dynamically below
      likes: 154,
      comments: 18,
      date: 'Há 2 horas',
      authorAvatars: ['👨‍🏫', '👩‍💻', '👦']
    },
    {
      id: 'post-2',
      category: 'Boa Prática',
      unit: 'La Salle São Paulo',
      title: 'Mural das Emoções: Empatia em Foco',
      description: 'Implementação semanal de dinâmicas para reconhecimento de sentimentos e construção de inteligência socioemocional afetiva.',
      imageUrl: '', // Blank style mockup like Image 3
      likes: 42,
      comments: 8,
      date: 'Publicado em 14 Abr',
      authorAvatars: ['👩‍🎨', '👩‍🏫']
    },
    {
      id: 'post-3',
      category: 'Conquista',
      unit: 'La Salle Brasília',
      title: 'Olimpíada de Matemática: Ouro Nacional',
      description: 'Parabenizamos nosso aluno Pedro Santos pela conquista inédita na competição nacional, unindo lógica e colaboração coletiva.',
      imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=400&q=80',
      likes: 128,
      comments: 24,
      date: 'Publicado ontem',
      authorAvatars: ['👦', '👴', '👩‍💼']
    }
  ]);

  // Moderated queue - 5 items (represented in Image 3 badge "5 Pendentes")
  const [pendingPosts, setPendingPosts] = useState<FeedCard[]>([
    {
      id: 'pending-1',
      category: 'Boa Prática',
      unit: 'La Salle Caxias',
      title: 'Horta Comunitária e Nutrição Saudável',
      description: 'Pequenos aprendendo a plantar hortaliças orgânicas que agora enriquecem o cardápio da colação e expandem os sentidos.',
      imageUrl: '',
      likes: 0,
      comments: 0,
      date: 'Aguardando aprovação',
      authorAvatars: ['👨‍🌾']
    },
    {
      id: 'pending-2',
      category: 'Evento Escolar',
      unit: 'La Salle Porto Alegre',
      title: 'Sábado de Acolhimento das Famílias',
      description: 'Encontro com partilha de piqueniques, contação de histórias no jardim sensorial e risadas coletivas entre educadores.',
      imageUrl: '',
      likes: 0,
      comments: 0,
      date: 'Aguardando aprovação',
      authorAvatars: ['👩‍👩-👧']
    }
  ]);

  const [showModerationPanel, setShowModerationPanel] = useState(false);

  // New Post Form States
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'Projeto Inovador' | 'Boa Prática' | 'Conquista' | 'Evento Escolar'>('Projeto Inovador');
  const [newUnit, setNewUnit] = useState('La Salle Abel');
  const [newTags, setNewTags] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string>('');
  
  // Drag-and-drop state
  const [isDragOver, setIsDragOver] = useState(false);

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleUploadClick = () => {
    // Generate a beautiful placeholder from unsplash representing education/robotics
    const mockImages = [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80', // Kids drawing
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80', // Kids reading
      'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=400&q=80',// Creative toy bricks
    ];
    const picked = mockImages[Math.floor(Math.random() * mockImages.length)];
    setUploadedImage(picked);
  };

  const handlePublishNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) {
      alert('Por favor, preencha o título e a descrição do seu destaque.');
      return;
    }

    const newPostItem: FeedCard = {
      id: `post-${Date.now()}`,
      category: newCategory,
      unit: newUnit,
      title: newTitle,
      description: newDesc,
      imageUrl: uploadedImage || 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=400&q=80',
      likes: 1,
      comments: 0,
      date: 'Agora mesmo',
      authorAvatars: ['👩‍🏫']
    };

    setPosts([newPostItem, ...posts]);
    setNewTitle('');
    setNewDesc('');
    setNewTags('');
    setUploadedImage('');
    alert('Publicação enviada diretamente ao mural de conquistas da rede!');
  };

  const handleApprovePending = (pendingId: string) => {
    const item = pendingPosts.find(p => p.id === pendingId);
    if (!item) return;

    // Transition item from pending list to live list
    const approvedItem: FeedCard = {
      ...item,
      id: `post-${Date.now()}`,
      date: 'Agora mesmo',
      likes: 12,
      comments: 2
    };

    setPosts([approvedItem, ...posts]);
    setPendingPosts(prev => prev.filter(p => p.id !== pendingId));
    alert(`Publicação de "${item.unit}" aprovada e inserida no feed público.`);
  };

  const handleRejectPending = (pendingId: string) => {
    setPendingPosts(prev => prev.filter(p => p.id !== pendingId));
    alert('Publicação recusada e devolvida para os rascunhos da unidade.');
  };

  // Filter and order logic
  const filteredPosts = posts.filter(post => {
    // Search keyword query filter
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // Unit filter
    if (selectedUnit !== 'all' && post.unit !== selectedUnit) return false;

    // Category filter
    if (activeCategoryFilter !== 'all' && post.category !== activeCategoryFilter) return false;

    return true;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (orderBy === 'curtidos') return b.likes - a.likes;
    return 1; // Keep default newest placement array indices
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="lumi-mural-destaques-module">
      
      {/* Top Search & Accessory Bar (Matches image 3 header exactly) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Middle Search layout */}
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por projetos, notícias ou unidades da Rede..."
            className="w-full bg-slate-50 text-slate-800 font-semibold pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none text-xs focus:bg-white focus:ring-2 focus:ring-amber-300 transition-all"
          />
          <Search size={14} className="text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Action icons right alignment */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="relative p-2 text-slate-450 hover:text-slate-800 transition cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"></span>
          </div>
          <div className="p-2 text-slate-450 hover:text-slate-800 transition cursor-pointer">
            <Settings size={18} />
          </div>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" 
            alt="User Professional" 
            className="w-8 h-8 rounded-full border border-slate-200"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Main Container Banner Header for Highlights */}
      <div className="bg-[#0a2540] text-white rounded-3xl p-6 relative overflow-hidden shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="space-y-3 max-w-2xl">
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
            MURAL DE DESTAQUES
          </span>
          <h1 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
            Compartilhe o Brilho da nossa Comunidade
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed font-semibold">
            Explore as conquistas, inovações e as melhores práticas pedagógicas que iluminam o caminho de nossos alunos e educadores.
          </p>
        </div>

        {/* Highlight Stats (Matches Image 3 perfectly) */}
        <div className="flex gap-3 shrink-0">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center flex flex-col items-center justify-center min-w-[100px]">
            <span className="text-2xl font-black text-amber-300">{posts.length + 9}</span>
            <span className="text-[10px] font-bold text-slate-350 tracking-wider uppercase">Novos Destaques</span>
          </div>

          <div 
            onClick={() => setShowModerationPanel(true)}
            className="bg-amber-400/10 hover:bg-amber-400/20 rounded-2xl p-4 border border-amber-400/25 text-center flex flex-col items-center justify-center min-w-[100px] cursor-pointer group transition-all"
          >
            <span className="text-2xl font-black text-amber-400 group-hover:scale-110 transition-transform">{pendingPosts.length < 10 ? `0${pendingPosts.length}` : pendingPosts.length}</span>
            <span className="text-[10px] font-black text-amber-300 tracking-wider uppercase">Para Aprovar</span>
          </div>
        </div>

      </div>

      {/* Main Structural Layout Matrix (Filters on the left, feed on the right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Filters Rail & Image Posting Mock (Matches Image 3 column style) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Filtering Board */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-5">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5 pb-2 border-b border-slate-50">
              <Filter size={14} className="text-slate-400" />
              Filtrar Mural
            </h3>

            {/* Select Unit drop box */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase text-slate-400">Por Unidade</label>
              <select 
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 font-semibold px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none"
              >
                <option value="all">Todas as Unidades</option>
                <option value="La Salle Abel">La Salle Abel</option>
                <option value="La Salle São Paulo">La Salle São Paulo</option>
                <option value="La Salle Brasília">La Salle Brasília</option>
              </select>
            </div>

            {/* Categoria list */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase text-slate-400">Categoria de Destaque</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { tag: 'all', label: 'Ver Todos' },
                  { tag: 'Projeto Inovador', label: 'Projeto Inovador' },
                  { tag: 'Boa Prática', label: 'Boa Prática' },
                  { tag: 'Conquista', label: 'Conquista' },
                  { tag: 'Evento Escolar', label: 'Evento Escolar' }
                ].map((cat) => {
                  const isActive = activeCategoryFilter === cat.tag;
                  return (
                    <button
                      key={cat.tag}
                      onClick={() => setActiveCategoryFilter(cat.tag)}
                      className={`text-[10px] px-3 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition border font-bold ${
                        isActive 
                          ? 'bg-amber-400/20 text-slate-850 border-amber-400/50 hover:bg-amber-400/30' 
                          : 'border-slate-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Moderation Pending Box (Matches design) */}
            <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-amber-900 font-extrabold text-xs">
                <span>Moderação</span>
                <span className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase">
                  {pendingPosts.length} Pendentes
                </span>
              </div>
              <p className="text-[10px] text-slate-600 font-semibold leading-relaxed">
                Existem publicações aguardando sua revisão de rede antes de ficarem visíveis para as outras unidades.
              </p>
              <button 
                onClick={() => setShowModerationPanel(true)}
                className="w-full text-center py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 hover:shadow text-[11px] font-extrabold rounded-xl transition cursor-pointer"
              >
                Acessar Central de Aprovação
              </button>
            </div>

          </div>

          {/* New Highlight Creator Panel (Matches image 3 drag and drop form) */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              Novo Destaque
            </h3>

            {/* Simulated file drag uploader matches Image 3 */}
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleUploadClick(); }}
              onClick={handleUploadClick}
              className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-150 relative overflow-hidden flex flex-col justify-center items-center ${
                isDragOver ? 'border-amber-450 bg-amber-50/10' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              {uploadedImage ? (
                <div className="relative w-full h-24 rounded-lg overflow-hidden border border-slate-200">
                  <img src={uploadedImage} alt="Uploaded demo" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold bg-slate-900/60 px-2 py-0.5 rounded">Imagem Carregada</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload size={20} className="mx-auto text-slate-400" />
                  <p className="text-xs font-bold text-slate-700">Arraste fotos ou clique para carregar</p>
                  <p className="text-[9px] text-slate-450">Formatos: JPG, PNG, MP4 (Máx 20MB)</p>
                </div>
              )}
            </div>

            {/* Inputs */}
            <form onSubmit={handlePublishNewPost} className="space-y-3">
              <div className="space-y-1">
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Título do Destaque"
                  className="w-full bg-slate-50 text-slate-900 font-semibold px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-amber-300"
                />
              </div>

              <div className="space-y-1">
                <textarea 
                  value={newDesc}
                  rows={3}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Descrição detalhada do projeto ou notícia..."
                  className="w-full bg-slate-50 text-slate-900 font-semibold px-3 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-amber-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="bg-slate-50 text-slate-700 font-bold px-2 py-2 rounded-xl border border-slate-200 text-[10px] outline-none"
                >
                  <option value="Projeto Inovador">Inovação</option>
                  <option value="Boa Prática">Boa Prática</option>
                  <option value="Conquista">Conquista</option>
                  <option value="Evento Escolar">Evento Escolar</option>
                </select>

                <input 
                  type="text" 
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Tags (Ex: Robótica)"
                  className="bg-slate-50 text-slate-800 font-semibold px-2 py-2 rounded-xl border border-slate-200 text-[10px] outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider py-3 rounded-2xl transition shadow-md border border-amber-500 cursor-pointer"
              >
                Publicar no Mural
              </button>
            </form>

          </div>

        </div>

        {/* Right Section Scrollable Destaques Feed */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Feed Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Feed de Publicações</h2>
            
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>Ordenar por:</span>
              <select 
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value as any)}
                className="bg-white border-none py-1 pl-1 text-slate-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="novos">Mais Recentes</option>
                <option value="curtidos">Mais Curtidos</option>
              </select>
            </div>
          </div>

          {/* Posts Feed container */}
          <div className="space-y-4">
            
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post) => {
                const hasImage = post.imageUrl !== '';
                return (
                  <div 
                    key={post.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col sm:flex-row hover:shadow-md transition duration-200 transform hover:scale-101"
                  >
                    
                    {/* Cover image Column */}
                    {hasImage && (
                      <div className="sm:w-1/3 min-h-[160px] relative bg-slate-950 flex items-center justify-center overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt="Post Cover" 
                          className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-300" 
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Upper-left category indicator overlay */}
                        <span className="absolute top-3 left-3 bg-[#0a2540] text-amber-300 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-amber-400/20">
                          {post.category}
                        </span>
                      </div>
                    )}

                    {/* Content Column */}
                    <div className={`p-5 flex flex-col justify-between ${hasImage ? 'sm:w-2/3' : 'w-full'}`}>
                      
                      <div className="space-y-2">
                        
                        {/* Unit and Header actions */}
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-450 uppercase leading-none">
                          <span className="text-slate-900 flex items-center gap-1">🏫 {post.unit}</span>
                          <div className="flex items-center gap-2 text-slate-350 hover:text-slate-650 transition cursor-pointer">
                            <span>✏️</span>
                            <span onClick={() => {
                              setPosts(prev => prev.filter(p => p.id !== post.id));
                            }}>🗑️</span>
                          </div>
                        </div>

                        {/* If NO IMAGE, draw active category tag here */}
                        {!hasImage && (
                          <span className="inline-block bg-slate-100 text-slate-700 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                            {post.category}
                          </span>
                        )}

                        <h3 className="text-sm md:text-base font-black text-slate-950 tracking-tight leading-tight">
                          {post.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                          {post.description}
                        </p>
                      </div>

                      {/* Bottom stats and reviewers */}
                      <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-4">
                        
                        {/* Avatar bubble pile */}
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1.5 select-none text-[11px]">
                            {post.authorAvatars.map((av, index) => (
                              <div key={index} className="w-5 h-5 rounded-full bg-slate-100 border border-white flex items-center justify-center shadow-sm">
                                {av}
                              </div>
                            ))}
                            <div className="w-5 h-5 rounded-full bg-slate-500 border border-white flex items-center justify-center text-[8px] text-white font-bold font-mono">
                              +15
                            </div>
                          </div>
                          
                          <span className="text-[9px] text-slate-450 font-black cursor-pointer hover:text-slate-800 uppercase tracking-tight">Ver Detalhes &gt;</span>
                        </div>

                        {/* Interactive reaction counters (Image 3 layout) */}
                        <div className="flex items-center gap-4 text-[11px] font-extrabold text-slate-500 select-none">
                          <button 
                            onClick={() => handleLike(post.id)}
                            className="flex items-center gap-1 hover:text-rose-500 transition cursor-pointer"
                          >
                            <Heart size={13} className="text-rose-400 fill-rose-400" />
                            <span>{post.likes}</span>
                          </button>

                          <div className="flex items-center gap-1 cursor-pointer">
                            <MessageSquare size={13} className="text-sky-400" />
                            <span>{post.comments}</span>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                );
              })
            ) : (
              <p className="text-center text-xs text-slate-450 py-10 bg-white rounded-3xl border border-slate-100 font-semibold shadow-sm">Nenhum destaque pedagógico correspondente encontrado.</p>
            )}

            {/* Bottom Network Wide strip full alignment (matches Image 3 bottom band!) */}
            <div className="bg-[#fff9e6] border border-amber-300 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between text-[10px] font-black uppercase text-amber-900 tracking-wider">
                <span className="flex items-center gap-1.5">📢 Comunicado de Rede</span>
                <span>Há 4 horas</span>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs md:text-sm font-black text-slate-900 leading-snug">
                  Nova Metodologia de 'Aprendizagem Criativa' será expandida para todas as unidades em 2024
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                  Após o sucesso piloto nas unidades do RS, o modelo que integra artes, ciência e filosofia de forma lúdica passará a compor o currículo básico da Rede La Salle Conecta.
                </p>
              </div>

              {/* Action buttons footer */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => alert('Abrindo documento oficial consolidado no portal da Fundação La Salle...')}
                  className="bg-[#0a2540] hover:bg-slate-850 text-white font-extrabold text-[10px] uppercase tracking-wider py-2 px-4 rounded-xl transition cursor-pointer"
                >
                  Ler Comunicado na Íntegra
                </button>

                <button 
                  onClick={() => alert('Link copiado para área de transferência!')}
                  className="p-2 border border-amber-300 text-amber-950 hover:bg-amber-100 rounded-xl transition flex items-center justify-center cursor-pointer"
                  title="Compartilhar"
                >
                  <Share2 size={13} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Moderation Sliding Drawer (Interactive addition!) */}
      {showModerationPanel && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-end z-50 animate-fade-in">
          <div className="bg-white max-w-md w-full h-full p-6 shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-slate-100 animate-slide-in">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-base font-black text-slate-950 tracking-tight flex items-center gap-1.5">
                    🛡️ Central de Aprovação
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Moderação de Destaques de Rede</p>
                </div>
                <button 
                  onClick={() => setShowModerationPanel(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {pendingPosts.length > 0 ? (
                  pendingPosts.map((pend) => (
                    <div key={pend.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-150 space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-450">
                        <span>🏫 {pend.unit}</span>
                        <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[9px]">{pend.category}</span>
                      </div>

                      <h4 className="text-xs font-black text-slate-900">{pend.title}</h4>
                      <p className="text-[10px] text-slate-600 leading-relaxed font-semibold">{pend.description}</p>

                      <div className="flex gap-2 pt-2">
                        <button 
                          onClick={() => handleApprovePending(pend.id)}
                          className="flex-1 py-1.5 bg-emerald-550 hover:bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg transition text-center cursor-pointer flex items-center justify-center gap-1"
                        >
                          <CheckCircle size={10} />
                          <span>Aprovar</span>
                        </button>

                        <button 
                          onClick={() => handleRejectPending(pend.id)}
                          className="flex-1 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-extrabold text-[10px] uppercase tracking-wider rounded-lg transition text-center cursor-pointer"
                        >
                          Recusar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <span className="text-3xl">🎉</span>
                    <h4 className="text-xs font-bold text-slate-800 mt-2">Fila de Moderadores Limpa!</h4>
                    <p className="text-[10px] text-slate-405">Todas as publicações de rede foram devidamente revisadas.</p>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => setShowModerationPanel(false)}
              className="w-full py-3 bg-[#0a2540] hover:bg-slate-800 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition cursor-pointer mt-6"
            >
              Fechar Painel de Controle
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
