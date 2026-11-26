import React, { useState } from 'react';
import { Shield, Sparkles, Key, Mail, Lock, User, RefreshCw, CheckCircle, ArrowLeft } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (user: { id: string; name: string; email: string; role: 'Administrador' | 'Coordenador' | 'Professor' | 'Responsável'; className?: string }) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryStep, setRecoveryStep] = useState<1 | 2 | 3>(1); // 1: Email form, 2: Token code, 3: New password
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [recoveryMessage, setRecoveryMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sample quick accounts
  const QUICK_ACCOUNTS = [
    // --- ADMINISTRADORES ORIGINAIS (2) ---
    { id: 'usr-admin-super', name: 'Super Adm (Webmaster)', email: 'webmaster@oz.com.br', role: 'Administrador' as const, desc: 'Acesso total (Senha: 30tnvsslum)', color: 'border-l-4 border-indigo-600' },
    { id: 'usr-admin-luciana', name: 'Luciana Baptista', email: 'luciana.admin@lasalle.org', role: 'Administrador' as const, desc: 'Acesso total e gestão de acessos', color: 'border-l-4 border-rose-500' },

    // --- COORDENADORES ORIGINAIS (2) ---
    { id: 'usr-coord-helena', name: 'Helena Martins', email: 'helena.coordenadora@lasalle.org', role: 'Coordenador' as const, desc: 'Gestão escolar, sem controle de acessos', color: 'border-l-4 border-amber-500' },
    { id: 'usr-prof-carolina', name: 'Dra. Carolina Mendes', email: 'carolina.psico@lasalle.org', role: 'Coordenador' as const, desc: 'Psicóloga • Atendimento de Inclusão Clí./Ped.', color: 'border-l-4 border-purple-500' },

    // --- PROFESSORES ORIGINAIS (2) ---
    { id: 'usr-teacher-pedro', name: 'Prof. Pedro Reis', email: 'pedro.professor@lasalle.org', role: 'Professor' as const, desc: 'Diários de cuidado, BNCC e sequências didáticas', color: 'border-l-4 border-sky-500' },
    { id: 'usr-teacher-amanda', name: 'Profª Amanda Costa', email: 'amanda.costa@lasalle.org', role: 'Professor' as const, desc: 'Tutora da Turma: Berçário II - B', color: 'border-l-4 border-sky-500' },

    // --- NOVOS PROFESSORES INCLUÍDOS HOJE ---
    { id: 'usr-teacher-bruna', name: 'Profª Bruna Santos', email: 'bruna.santos@lasalle.org', role: 'Professor' as const, desc: 'Tutora do Berçário I e Maternal I', color: 'border-l-4 border-sky-500' },
    { id: 'usr-teacher-silvia', name: 'Profª Sílvia Martins', email: 'silvia.coord@lasalle.org', role: 'Professor' as const, desc: 'Tutora do Infantil III - A', color: 'border-l-4 border-sky-500' },

    // --- RESPONSÁVEIS ORIGINAIS (2) ---
    { id: 'usr-parent-ricardo', name: 'Ricardo Dias (Pai)', email: 'ricardo.responsavel@lasalle.org', role: 'Responsável' as const, desc: 'Pai de Guto, Alice e Bruno', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-mariana', name: 'Mariana Almeida (Mãe)', email: 'mariana.almeida@lasalle.org', role: 'Responsável' as const, desc: 'Mãe de Leo e Guilherme', color: 'border-l-4 border-emerald-500' },

    // --- NOVOS RESPONSÁVEIS INCLUÍDOS HOJE ---
    { id: 'usr-parent-marcos', name: 'Marcos Silva (Pai)', email: 'marcos.silva@fam.org', role: 'Responsável' as const, desc: 'Pai de Guilherme e Mariana', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-juliana', name: 'Juliana Santos (Mãe)', email: 'juliana.santos@fam.org', role: 'Responsável' as const, desc: 'Mãe de Pedro', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-felipe', name: 'Felipe Oliveira (Pai)', email: 'felipe.oliveira@fam.org', role: 'Responsável' as const, desc: 'Pai de Enzo, Ana e Carlos', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-aline', name: 'Aline Souza (Mãe)', email: 'aline.souza@fam.org', role: 'Responsável' as const, desc: 'Mãe de Lucas', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-thiago', name: 'Thiago Rodrigues (Pai)', email: 'thiago.rodrigues@fam.org', role: 'Responsável' as const, desc: 'Pai de Júlia e Gabriel', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-patriciaferr', name: 'Patrícia Ferreira (Mãe)', email: 'patricia.ferreira@fam.org', role: 'Responsável' as const, desc: 'Mãe de Sofia, Mateo e Beatriz', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-roberto', name: 'Roberto Alves (Pai)', email: 'roberto.alves@fam.org', role: 'Responsável' as const, desc: 'Pai de Manuela', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-carla', name: 'Carla Pereira (Mãe)', email: 'carla.pereira@fam.org', role: 'Responsável' as const, desc: 'Mãe de Davi e Lívia', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-sandra', name: 'Sandra Gomes (Mãe)', email: 'sandra.gomes@fam.org', role: 'Responsável' as const, desc: 'Mãe de Alice, Arthur e Laura', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-eduardo', name: 'Eduardo Ribeiro (Pai)', email: 'eduardo.ribeiro@fam.org', role: 'Responsável' as const, desc: 'Pai de Heitor', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-marianamart', name: 'Mariana Martins (Mãe)', email: 'mariana.martins@fam.org', role: 'Responsável' as const, desc: 'Mãe de Helena e Miguel', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-rafael', name: 'Rafael Carvalho (Pai)', email: 'rafael.carvalho@fam.org', role: 'Responsável' as const, desc: 'Pai de Lorena, Bernardo e Isabella', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-beatriz', name: 'Beatriz Almeida (Mãe)', email: 'beatriz.almeida@fam.org', role: 'Responsável' as const, desc: 'Mãe de Valentina', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-ricardolopes', name: 'Ricardo Lopes (Pai)', email: 'ricardo.lopes@fam.org', role: 'Responsável' as const, desc: 'Pai de Samuel e Giovanna', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-fernandasoa', name: 'Fernanda Soares (Mãe)', email: 'fernanda.soares@fam.org', role: 'Responsável' as const, desc: 'Mãe de Daniel, Lucca e Marina', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-brunofern', name: 'Bruno Fernandes (Pai)', email: 'bruno.fernandes@fam.org', role: 'Responsável' as const, desc: 'Pai de Emanuel', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-camilavieira', name: 'Camila Vieira (Mãe)', email: 'camila.vieira@fam.org', role: 'Responsável' as const, desc: 'Mãe de Leonardo e Clara', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-gustavobarb', name: 'Gustavo Barbosa (Pai)', email: 'gustavo.barbosa@fam.org', role: 'Responsável' as const, desc: 'Pai de Felipe, Joana e Rafael', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-leticiarocha', name: 'Letícia Rocha (Mãe)', email: 'leticia.rocha@fam.org', role: 'Responsável' as const, desc: 'Mãe de Eduarda', color: 'border-l-4 border-emerald-500' },
    { id: 'usr-parent-danieldias', name: 'Daniel Dias (Pai)', email: 'daniel.dias@fam.org', role: 'Responsável' as const, desc: 'Pai de Gabriel e Isabela', color: 'border-l-4 border-emerald-500' },
  ];

  const handleRegularLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    // Checking specific super administrator credentials
    if (email.toLowerCase() === 'webmaster@oz.com.br') {
      if (password !== '30tnvsslum') {
        setErrorMessage('Senha incorreta para o usuário Super Administrador.');
        return;
      }
      onLoginSuccess({
        id: 'usr-admin-super',
        name: 'Super Adm (Webmaster)',
        email: 'webmaster@oz.com.br',
        role: 'Administrador'
      });
      return;
    }

    // Match quick account or allow any valid password for test convenience
    const matchedAccount = QUICK_ACCOUNTS.find(acc => acc.email.toLowerCase() === email.toLowerCase());
    if (matchedAccount) {
      onLoginSuccess({
        id: matchedAccount.id,
        name: matchedAccount.name,
        email: matchedAccount.email,
        role: matchedAccount.role,
        className: matchedAccount.role === 'Responsável' ? 'Área da Família' : undefined
      });
    } else {
      // Create generic account for test passwords
      onLoginSuccess({
        id: `usr-gen-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: 'Professor',
        className: '2º Ano B'
      });
    }
  };

  const handleQuickLogin = (account: typeof QUICK_ACCOUNTS[0]) => {
    onLoginSuccess({
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      className: account.role === 'Responsável' ? 'Área da Família' : undefined
    });
  };

  const startPasswordRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim()) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }
    setRecoveryStep(2);
    setRecoveryMessage(`Código de verificação enviado para ${recoveryEmail}`);
  };

  const verifyRecoveryCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryCode.trim() !== '1234') {
      setErrorMessage('Código inválido ou expirado. Para testes passe "1234".');
      return;
    }
    setRecoveryStep(3);
    setErrorMessage('');
  };

  const resetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMessage('Sua senha deve conter ao menos 6 caracteres.');
      return;
    }
    alert('Sua senha foi redefinida com sucesso! Você já pode realizar o login.');
    setIsRecovering(false);
    setRecoveryStep(1);
    setRecoveryEmail('');
    setRecoveryCode('');
    setNewPassword('');
    setEmail(recoveryEmail);
    setPassword(newPassword);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans select-none" id="la-salle-conecta-auth-screen">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-105">
        
        {/* Left Side: Editorial Banner */}
        <div className="lg:col-span-5 bg-[#002D62] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="space-y-4 relative z-10">
            <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-md border border-amber-500">
              LS
            </div>
            <div>
              <span className="text-xs font-black text-amber-300 tracking-wider block uppercase">Plataforma Unificada</span>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mt-1">
                La Salle Conecta
              </h1>
            </div>
            <p className="text-xs text-blue-100/90 leading-relaxed font-medium">
              Conectando educadores, equipes pedagógicas e responsáveis para o acolhimento seguro e o desenvolvimento afetivo da primeira infância.
            </p>
          </div>

          <div className="space-y-4 pt-10 border-t border-white/10 relative z-10">
            <div className="bg-white/10 rounded-2xl p-4 border border-white/5 micro-elevation">
              <p className="text-[11px] text-amber-300 font-extrabold flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
                <Sparkles size={11} className="animate-spin-slow text-amber-300" />
                <span>Mascote Lumi Vagalume</span>
              </p>
              <p className="text-[10px] text-slate-100/90 leading-normal font-medium">
                "Nos pequenos detalhes, iluminamos o futuro das nossas crianças com inteligência e cuidado compartilhado!"
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-bold">
              Fundação La Salle © 2026 • Todos os direitos reservados.
            </div>
          </div>
        </div>

        {/* Right Side: Form Content + Quick Accounts */}
        <div className="lg:col-span-7 p-6 md:p-12 flex flex-col justify-center space-y-8 bg-white selection:bg-amber-100 selection:text-slate-950">
          
          {/* Recovery Flow Card */}
          {isRecovering ? (
            <div className="space-y-6">
              
              <button 
                onClick={() => { setIsRecovering(false); setRecoveryStep(1); setErrorMessage(''); }}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-505 hover:text-slate-900 transition-colors"
                type="button"
              >
                <ArrowLeft size={16} />
                <span>Voltar para o Login</span>
              </button>

              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Esqueceu a senha?</h2>
                <p className="text-xs text-slate-500 mt-1">Siga as instruções para resgatar o acesso de sua estação unificada.</p>
              </div>

              {errorMessage && (
                <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3.5 rounded-xl text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Step 1: Request recovery email */}
              {recoveryStep === 1 && (
                <form onSubmit={startPasswordRecovery} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Seu E-mail Institucional ou Pessoal</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        value={recoveryEmail} 
                        onChange={(e) => setRecoveryEmail(e.target.value)} 
                        placeholder="Ex: professor@lasalle.org"
                        className="w-full bg-slate-50 text-slate-950 font-semibold pl-10 pr-4 py-3 rounded-xl border border-slate-205 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs transition-all"
                      />
                      <Mail size={14} className="text-slate-400 absolute left-3.5 top-[14px]" />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#002D62] hover:bg-[#003B80] text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition shadow-md cursor-pointer"
                  >
                    Enviar Código de Recuperação
                  </button>
                </form>
              )}

              {/* Step 2: Input verification token code */}
              {recoveryStep === 2 && (
                <form onSubmit={verifyRecoveryCode} className="space-y-4">
                  <div className="bg-amber-50 border border-amber-100 text-amber-900 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <CheckCircle size={16} className="text-amber-500 shrink-0" />
                    <span>{recoveryMessage}</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Código de 4 Dígitos</label>
                      <span className="text-[10px] text-indigo-600 font-bold">Use "1234" para simular</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        maxLength={4}
                        value={recoveryCode} 
                        onChange={(e) => setRecoveryCode(e.target.value)} 
                        placeholder="Ex: 1234"
                        className="w-full bg-slate-50 text-slate-950 font-black tracking-widest pl-10 pr-4 py-3 rounded-xl border border-slate-205 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs transition-all text-center"
                      />
                      <Key size={14} className="text-slate-400 absolute left-3.5 top-[14px]" />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#002D62] hover:bg-[#003B80] text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition shadow-md cursor-pointer"
                  >
                    Confirmar Código
                  </button>
                </form>
              )}

              {/* Step 3: Input new password */}
              {recoveryStep === 3 && (
                <form onSubmit={resetPassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Nova Senha de Acesso</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        required
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="Mínimo 6 caracteres"
                        className="w-full bg-slate-50 text-slate-950 font-semibold pl-10 pr-4 py-3 rounded-xl border border-slate-205 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs transition-all"
                      />
                      <Lock size={14} className="text-slate-400 absolute left-3.5 top-[14px]" />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl transition shadow-md cursor-pointer border border-amber-500"
                  >
                    Redefinir e Salvar Senha
                  </button>
                </form>
              )}

            </div>
          ) : (
            <>
              {/* Regular Access Form */}
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#002D62] to-[#004B87] text-white p-5 rounded-[20px] border border-blue-400/20 shadow-md">
                  <div className="space-y-1 text-left">
                    <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-sm tracking-widest uppercase inline-block font-sans">
                      Matrículas 2026 Abertas
                    </span>
                    <h4 className="text-sm font-black text-white">Novo Aluno ou Responsável?</h4>
                    <p className="text-[10px] text-blue-100 font-medium leading-tight">
                      Acesse a secretaria digital de pré-matrículas e cadastre seu filho agora mesmo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin({
                      id: 'usr-parent-new',
                      name: 'Responsável Visitante',
                      email: 'novo.responsavel@lasalle.org',
                      role: 'Responsável',
                      desc: 'Acesso Rápido para Matrícula de Novos Alunos'
                    } as any)}
                    className="shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-wider transition-all shadow hover:scale-105 active:scale-95 duration-150 cursor-pointer"
                  >
                    Fazer Pré-Matrícula
                  </button>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight leading-none">Estação de Trabalho</h2>
                  <p className="text-xs text-slate-500 mt-1.5">Insira suas credenciais ou selecione um perfil administrativo abaixo.</p>
                </div>

                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3.5 rounded-xl text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleRegularLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Endereço de E-mail</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="usuario@lasalle.org"
                        className="w-full bg-slate-50 text-slate-950 font-semibold pl-10 pr-4 py-3 rounded-xl border border-slate-205 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs transition-all"
                      />
                      <User size={14} className="text-slate-400 absolute left-3.5 top-[14px]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Senha de Segurança</label>
                      <button 
                        type="button" 
                        onClick={() => { setIsRecovering(true); setRecoveryStep(1); setErrorMessage(''); }}
                        className="text-[10px] text-indigo-650 font-bold hover:underline"
                      >
                        Esqueceu sua senha?
                      </button>
                    </div>
                    <div className="relative">
                      <input 
                        type="password" 
                        required
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="••••••••"
                        className="w-full bg-slate-50 text-slate-950 font-semibold pl-10 pr-4 py-3 rounded-xl border border-slate-205 focus:bg-white focus:ring-2 focus:ring-amber-300 outline-none text-xs transition-all"
                      />
                      <Lock size={14} className="text-slate-400 absolute left-3.5 top-[14px]" />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#002D62] hover:bg-[#003B80] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition shadow-md cursor-pointer"
                  >
                    Entrar no Sistema unificado
                  </button>
                </form>
              </div>

              {/* Perfil Selection Grid (Convenient Review Helper) */}
              <div className="space-y-3.5 pt-6 border-t border-slate-100">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Shield size={12} className="text-slate-400" />
                  <span>Acesso Rápido - Perfis e Permissões</span>
                </p>
                <div className="max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {QUICK_ACCOUNTS.map((acc, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickLogin(acc)}
                        type="button"
                        className={`text-left p-3.5 bg-slate-50 hover:bg-amber-450/5 hover:border-amber-450/40 border border-slate-200 rounded-2xl transition duration-150 group relative ${acc.color}`}
                      >
                        <div className="flex justify-between items-start leading-none mb-1">
                          <span className="text-xs font-black text-slate-800">{acc.name}</span>
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 group-hover:text-amber-600 transition-colors">
                            {acc.role}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-normal leading-tight font-medium">
                          {acc.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
