import React, { useState } from 'react';
import { Shield, Plus, Edit, Trash2, Search, UserCheck, ShieldAlert, BadgeCheck, X, CheckSquare } from 'lucide-react';

interface ManageUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Coordenador' | 'Professor' | 'Responsável';
  className?: string;
  status: 'Ativo' | 'Inativo';
}

export default function AccessManager() {
  const [users, setUsers] = useState<ManageUser[]>([
    { id: 'usr-admin-super', name: 'Super Adm (Webmaster)', email: 'webmaster@oz.com.br', role: 'Administrador', status: 'Ativo' },
    { id: 'usr-admin-luciana', name: 'Luciana Baptista', email: 'luciana.admin@lasalle.org', role: 'Administrador', status: 'Ativo' },
    { id: 'usr-coord-helena', name: 'Helena Martins', email: 'helena.coordenadora@lasalle.org', role: 'Coordenador', status: 'Ativo' },
    { id: 'usr-teacher-pedro', name: 'Prof. Pedro Reis', email: 'pedro.professor@lasalle.org', role: 'Professor', className: '1º Ano A', status: 'Ativo' },
    { id: 'usr-parent-ricardo', name: 'Ricardo Dias (Pai)', email: 'ricardo.responsavel@lasalle.org', role: 'Responsável', className: 'Área da Família', status: 'Ativo' },
    { id: 'usr-parent-mariana', name: 'Mariana Almeida (Mãe)', email: 'mariana.almeida@lasalle.org', role: 'Responsável', className: 'Área da Família', status: 'Ativo' },
    { id: 'usr-parent-carlos', name: 'Carlos Rocha (Pai)', email: 'carlos.rocha@lasalle.org', role: 'Responsável', className: 'Área da Família', status: 'Ativo' },
    { id: 'usr-parent-patricia', name: 'Patrícia Souza (Mãe)', email: 'patricia.souza@lasalle.org', role: 'Responsável', className: 'Área da Família', status: 'Ativo' },
    { id: 'usr-parent-fernanda', name: 'Fernanda Costa (Mãe)', email: 'fernanda.costa@lasalle.org', role: 'Responsável', className: 'Área da Família', status: 'Ativo' },
    { id: 'usr-parent-gustavo', name: 'Gustavo Pinheiro (Pai)', email: 'gustavo.pinheiro@lasalle.org', role: 'Responsável', className: 'Área da Família', status: 'Ativo' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState<ManageUser | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState<'Administrador' | 'Coordenador' | 'Professor' | 'Responsável'>('Professor');
  const [formClass, setFormClass] = useState('1º Ano A');
  const [formStatus, setFormStatus] = useState<'Ativo' | 'Inativo'>('Ativo');

  const openAddModal = () => {
    setEditingUser(null);
    setFormName('');
    setFormEmail('');
    setFormRole('Professor');
    setFormClass('1º Ano A');
    setFormStatus('Ativo');
    setShowFormModal(true);
  };

  const openEditModal = (user: ManageUser) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    setFormClass(user.className || '1º Ano A');
    setFormStatus(user.status);
    setShowFormModal(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (editingUser) {
      // Update
      setUsers(prev => prev.map(u => u.id === editingUser.id ? {
        ...u,
        name: formName,
        email: formEmail,
        role: formRole,
        className: formRole === 'Professor' || formRole === 'Responsável' ? formClass : undefined,
        status: formStatus
      } : u));
      alert(`Usuário "${formName}" atualizado com sucesso!`);
    } else {
      // Create
      const newUser: ManageUser = {
        id: `usr-${Date.now()}`,
        name: formName,
        email: formEmail,
        role: formRole,
        className: formRole === 'Professor' || formRole === 'Responsável' ? formClass : undefined,
        status: formStatus
      };
      setUsers(prev => [...prev, newUser]);
      alert(`Usuário "${formName}" criado com permissão de ${formRole}!`);
    }

    setShowFormModal(false);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja remover o acesso de "${name}"? Esta ação é irreversível.`)) {
      setUsers(prev => prev.filter(u => u.id !== id));
      alert(`Usuário "${name}" removido com sucesso.`);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="lumi-gestao-de-acessos">
      
      {/* Module Title */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <Shield className="text-brand-primary" size={26} />
            <span>Gestor de Acesso da Unidade</span>
          </h2>
          <p className="text-slate-550 text-xs md:text-sm">
            Configure permissões, controle perfis de acesso, libere novos responsáveis e professores de maneira ágil.
          </p>
        </div>

        <button 
          onClick={openAddModal}
          className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-md transition flex items-center gap-1.5 self-start md:self-center cursor-pointer"
        >
          <Plus size={14} className="stroke-[3px]" />
          <span>Cadastrar Usuário</span>
        </button>
      </div>

      {/* Permission Description Banner Table */}
      <div className="bg-[#002D62] text-white p-5 rounded-3xl grid grid-cols-1 md:grid-cols-4 gap-4 border border-blue-900 shadow-sm">
        <div className="space-y-1">
          <span className="text-[10px] text-rose-300 font-bold uppercase tracking-wider">Perfil 1</span>
          <h4 className="text-sm font-black flex items-center gap-1">
            <ShieldAlert size={14} className="text-rose-400" />
            <span>Administrador</span>
          </h4>
          <p className="text-[10px] text-blue-100 leading-relaxed font-semibold">
            Controle total. Acesso a relatórios de auditoria, cadastros, sequências pedagógicas e todos os painéis.
          </p>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
          <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Perfil 2</span>
          <h4 className="text-sm font-black flex items-center gap-1">
            <BadgeCheck size={14} className="text-amber-400" />
            <span>Coordenador</span>
          </h4>
          <p className="text-[10px] text-blue-100 leading-relaxed font-semibold">
            Modera destaques das unidades, confere relatórios BNCC de professores e gere eventos, sem controle de usuários.
          </p>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
          <span className="text-[10px] text-sky-300 font-bold uppercase tracking-wider">Perfil 3</span>
          <h4 className="text-sm font-black flex items-center gap-1">
            <UserCheck size={14} className="text-sky-400" />
            <span>Professor</span>
          </h4>
          <p className="text-[10px] text-blue-100 leading-relaxed font-semibold">
            Alimenta diário de cuidado diário, cria sequências didáticas e objetivos BNCC para seus alunos cadastrados.
          </p>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
          <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Perfil 4</span>
          <h4 className="text-sm font-black flex items-center gap-1">
            <CheckSquare size={14} className="text-emerald-400" />
            <span>Responsável</span>
          </h4>
          <p className="text-[10px] text-blue-100 leading-relaxed font-semibold">
            Visualiza a rotina alimentar/higienica de seus filhos, interage no Espaço Família e usa conselhos Lumi de apoio emocional.
          </p>
        </div>
      </div>

      {/* Main Filter & Roster card */}
      <div className="bg-white rounded-[32px] p-6 shadow-xs border border-slate-100 space-y-6">
        
        {/* Search header container */}
        <div className="relative max-w-md w-full">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, e-mail institucional ou nível..."
            className="w-full bg-slate-50 text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-205 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs font-semibold"
          />
          <Search size={14} className="text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        {/* User Roster Table with customized grid */}
        <div className="overflow-x-auto border border-slate-150 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider border-b border-slate-150">
                <th className="py-3 px-4">Nome completo</th>
                <th className="py-3 px-4">E-mail</th>
                <th className="py-3 px-4">Nível de Permissão</th>
                <th className="py-3 px-4">Classe Vinculada</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-705">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">{user.name}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-505">{user.email}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wide ${
                        user.role === 'Administrador' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        user.role === 'Coordenador' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        user.role === 'Professor' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                        'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {user.className || <span className="text-slate-350">—</span>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full mr-1.5 ${
                        user.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}></span>
                      <span className="text-slate-650">{user.status}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="p-1.5 hover:bg-slate-100 hover:text-slate-900 rounded-lg text-slate-400 transition"
                        title="Editar Permissões"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-slate-400 transition"
                        title="Remover Acesso"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-405 font-medium">Nenhum perfil encontrado com os parâmetros informados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Form Dialog Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in text-slate-800">
          <form 
            onSubmit={handleSaveUser}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 space-y-4"
          >
            <button 
              type="button"
              onClick={() => setShowFormModal(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-405 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Shield className="text-brand-primary" size={18} />
              <span>{editingUser ? 'Editar Acesso' : 'Cadastrar Novo Operador'}</span>
            </h3>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Nome Completo</label>
              <input 
                type="text" 
                required
                value={formName} 
                onChange={(e) => setFormName(e.target.value)} 
                placeholder="Ex: Prof. José de Souza"
                className="w-full bg-slate-50 text-slate-950 font-semibold px-4 py-2.5 rounded-xl border border-slate-205 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">E-mail de Trabalho</label>
              <input 
                type="email" 
                required
                value={formEmail} 
                onChange={(e) => setFormEmail(e.target.value)} 
                placeholder="Ex: jose.souza@lasalle.org"
                className="w-full bg-slate-50 text-slate-950 font-semibold px-4 py-2.5 rounded-xl border border-slate-205 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Nível de Permissão</label>
                <select 
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as any)}
                  className="w-full bg-slate-50 text-slate-800 font-bold px-3 py-2.5 rounded-xl border border-slate-205 outline-none text-xs"
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Coordenador">Coordenador</option>
                  <option value="Professor">Professor</option>
                  <option value="Responsável">Responsável/Pais</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Status Geral</label>
                <select 
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                  className="w-full bg-slate-50 text-slate-800 font-bold px-3 py-2.5 rounded-xl border border-slate-205 outline-none text-xs"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>

            {(formRole === 'Professor' || formRole === 'Responsável') && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Filtro de Classe / Turma Vinculada</label>
                <input 
                  type="text" 
                  value={formClass} 
                  onChange={(e) => setFormClass(e.target.value)} 
                  placeholder="Ex: 1º Ano A, Infantil II"
                  className="w-full bg-slate-50 text-slate-950 font-semibold px-4 py-2.5 rounded-xl border border-slate-205 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs"
                />
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-3 bg-[#002D62] hover:bg-[#003B80] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition shadow-md cursor-pointer"
            >
              {editingUser ? 'Salvar Alterações' : 'Confirmar Cadastro'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
