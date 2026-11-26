import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Award, HeartHandshake, BookCopy, Speech } from 'lucide-react';
import { ChatMessage } from '../types';

interface LumiAssistantProps {
  chatMessages: ChatMessage[];
  onSendMessage: (message: string) => Promise<string>;
}

export default function LumiAssistant({ chatMessages, onSendMessage }: LumiAssistantProps) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Suggested prompt pills
  const SUGGESTIONS = [
    { text: 'Ideias de materiais para brincar heurístico', icon: <BookCopy size={12} /> },
    { text: 'Como acalmar uma criança imersa em sobrecarga sensorial?', icon: <HeartHandshake size={12} /> },
    { text: 'História infantil bem curta sobre o vagalume Lumi', icon: <Speech size={12} /> },
    { text: 'Roteiro de 1 dia sobre Meio Ambiente na infância', icon: <Award size={12} /> }
  ];

  const handleSend = async (messageText: string) => {
    if (!messageText.trim()) return;

    setLoading(true);
    setError(null);
    setInputText('');

    try {
      await onSendMessage(messageText);
    } catch (err: any) {
      console.error(err);
      setError('Lumi piscou e não ouviu muito bem. Verifique sua conexão e tente falar novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll on new chats
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col justify-between">
      
      {/* Scrollable conversation section */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
        
        {/* Lumi Greetings Header */}
        <div className="bg-gradient-to-r from-[#003366] to-[#001F3F] rounded-3xl p-6 text-white text-center space-y-4 shadow relative overflow-hidden">
          {/* Animated glow bugs */}
          <div className="absolute top-2 left-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-6 right-1/4 w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse"></div>

          <div className="mx-auto w-16 h-16 rounded-full bg-amber-400 border-4 border-slate-900 text-teal-950 text-2xl flex items-center justify-center font-bold shadow-md">
            ✨
          </div>

          <div className="space-y-1.5 max-w-2xl mx-auto">
            <h3 className="text-xl font-extrabold text-white">Lumi • Consultor Pedagógico da Infância</h3>
            <p className="text-xs text-amber-200 uppercase tracking-widest font-bold">Inteligência Educacional La Salle Conecta</p>
            <p className="text-xs text-blue-100/90 leading-relaxed font-sans">
              Descubra caminhos afetuosos de aprendizagem, alinhe planos à BNCC ou tire dúvidas sobre inclusão e diálogo com famílias na prática escolar.
            </p>
          </div>
        </div>

        {/* Chats stream list */}
        {chatMessages.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-400">Nenhuma conversa iniciada. Escolha um tema abaixo ou pergunte algo livremente!</p>
          </div>
        ) : (
          <div className="space-y-4 select-text">
            {chatMessages.map((msg) => {
              const isLumi = msg.sender === 'lumi';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isLumi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  {/* Mascot indicator icon */}
                  {isLumi ? (
                    <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center border border-brand-primary shrink-0 shadow-2xs select-none">
                      ✨
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 border border-slate-300 select-none">
                      EU
                    </div>
                  )}

                  {/* Message body block */}
                  <div className={`p-4 rounded-3xl shadow-2xs leading-relaxed text-sm ${
                    isLumi 
                      ? 'bg-white border border-slate-100 text-slate-800 rounded-tl-none' 
                      : 'bg-brand-primary text-white rounded-tr-none'
                  }`}>
                    {/* Render paragraphs cleanly */}
                    {msg.text.split('\n\n').map((para, i) => {
                      if (para.startsWith('1.') || para.startsWith('-')) {
                        return <p key={i} className="mb-2 last:mb-0 leading-relaxed font-sans">{para}</p>;
                      }
                      return <p key={i} className="mb-2.5 last:mb-0 leading-relaxed font-sans">{para}</p>;
                    })}
                    
                    <span className="block text-[9px] text-right mt-1.5 opacity-45 select-none font-semibold">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Recommended pills and text editor tools */}
      <div className="space-y-4 pt-4 border-t border-slate-100 shrink-0">
        
        {/* Templates Pills (Horizontal row) */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Sugestões de Perguntas Rápidas</span>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(s.text)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-150 transition-all cursor-pointer shadow-3xs"
              >
                {s.icon}
                <span>{s.text}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-xs text-rose-600 italic bg-rose-50 p-2 rounded border border-rose-100">{error}</p>
        )}

        {/* Main Text Input Box */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
          className="flex gap-2.5 items-center relative"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            placeholder={loading ? "Lumi está sintonizando a luz guia..." : "Escreva uma mensagem ou peça ideias de atividades para o Lumi..."}
            className="flex-1 bg-white border border-slate-200/80 px-4.5 py-3.5 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-brand-primary shadow-sm"
          />

          <button
            id="lumi-btn-send"
            type="submit"
            disabled={loading || !inputText.trim()}
            className="p-3.5 bg-gradient-to-r from-brand-primary to-brand-secondary font-bold rounded-2xl text-white hover:from-brand-primary-hover hover:to-brand-primary-hover shadow transition-all duration-150 cursor-pointer disabled:opacity-40"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin text-amber-300" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
