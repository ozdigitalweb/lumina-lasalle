import React, { useState } from 'react';
import { 
  Heart, 
  Utensils, 
  Moon, 
  ShieldCheck, 
  Palette, 
  Bell, 
  Megaphone, 
  FileText, 
  ChevronRight, 
  Check, 
  Send, 
  MessageCircle, 
  Sparkles, 
  User, 
  Calendar, 
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

import { Student } from '../types';

interface FamilyFeedProps {
  // Keeping types compatible with parent props
  posts: any[];
  onAddComment: (postId: string, text: string) => void;
  onLikePost: (postId: string) => void;
  currentUser?: any;
  students?: Student[];
}

interface StudentDayData {
  name: string;
  avatar: string;
  class: string;
  overview: {
    meals: string;
    sleep: string;
    hygiene: string;
    activity: string;
  };
  lumiQuote: string;
  development: {
    social: number;
    socialText: string;
    language: number;
    languageText: string;
  };
  gallery: string[];
}

export default function FamilyFeed({ posts, onAddComment, onLikePost, currentUser, students = [] }: FamilyFeedProps) {
  // Sub-tabs in top bar
  const [activeMenu, setActiveMenu] = useState<'inicio' | 'agenda' | 'financeiro'>('inicio');

  // Status variables for interactive buttons
  const [authorizedMuseum, setAuthorizedMuseum] = useState(false);
  const [medicineChecked, setMedicineChecked] = useState(false);
  
  // Legacy post commenting system
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>({});

  // Dataset of 15 students matching the 6 parents
  const studentsData: Record<string, StudentDayData> = {
    guto: {
      name: "Guto Pinheiro",
      avatar: "👶",
      class: "Infantil II - B • Tarde",
      overview: {
        meals: "Comeu toda a sopa e repetiu os vegetais com bastante apetite.",
        sleep: "Dormiu por 45 minutos com trilha sonora de ninar.",
        hygiene: "1 troca completa efetuada. Pele íntegra.",
        activity: "Colagem sensorial guiada com folhas secas e gravetos."
      },
      lumiQuote: "Guto organizou os potes de tinta por tom cromático de forma espontânea, revelando raciocínio lógico e percepção visual refinada.",
      development: {
        social: 78,
        socialText: "Guto demonstrou excelente foco e permaneceu engajado durante toda a roda de leitura.",
        language: 65,
        languageText: "Fez rimas com seu próprio nome e balbuciou expressões rítmicas."
      },
      gallery: [
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80"
      ]
    },
    alice: {
      name: "Alice Silva",
      avatar: "👧",
      class: "Maternal I • Integral",
      overview: {
        meals: "Aceitou muito bem as frutas do lanche, mas comeu apenas metade do almoço.",
        sleep: "Dormiu 1h 15min tranquilamente.",
        hygiene: "2 trocas normais.",
        activity: "Exploração de texturas na bacia de sementes."
      },
      lumiQuote: "Alice demonstrou grande entusiasmo tátil hoje ao mergulhar as mãos na bacia sensorial!",
      development: {
        social: 82,
        socialText: "Cooperou espontaneamente na hora de guardar as peças do jogo.",
        language: 75,
        languageText: "Identificou as cores 'azul' e 'verde' nos blocos de montar."
      },
      gallery: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80"
      ]
    },
    bruno: {
      name: "Bruno Dias",
      avatar: "👦",
      class: "Infantil III - A • Manhã",
      overview: {
        meals: "Comeu muito bem todo o prato principal de arroz, feijão e ovos mexidos.",
        sleep: "Repousou em silêncio por 30 minutos.",
        hygiene: "Banho tomado após brincadeira na terra do pátio.",
        activity: "Montagem de circuito geométrico divertido no parquinho."
      },
      lumiQuote: "Bruno liderou seus colegas hoje no arranjo dos blocos para o circuito motor, demonstrando excelente iniciativa recreativa!",
      development: {
        social: 88,
        socialText: "Expressou empatia ao ajudar um amiguinho que tropeçou no percurso de equilíbrio.",
        language: 84,
        languageText: "Construiu frases completas exemplificando as regras da brincadeira com muita clareza."
      },
      gallery: [
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80"
      ]
    },
    leo: {
      name: "Leo Almeida",
      avatar: "👦",
      class: "1º Ano A • Tarde",
      overview: {
        meals: "Comeu toda a fruta e o almoço de maneira autônoma.",
        sleep: "Dormiu por 1h 20min (13:30 - 14:50)",
        hygiene: "3 trocas normais realizadas.",
        activity: "Exploração tátil e desenho criativo com guache gelado."
      },
      lumiQuote: "Hoje o Leo explorou muito bem as texturas na aula de artes! Ele adorou sentir o guache frio nas mãos.",
      development: {
        social: 85,
        socialText: "Leo demonstrou grande empatia hoje ao dividir os brinquedos favoritos na brinquedoteca.",
        language: 72,
        languageText: "Novas palavras identificadas no repertório: \"borboleta\" e \"pintura\"."
      },
      gallery: [
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80"
      ]
    },
    guilherme: {
      name: "Guilherme Almeida",
      avatar: "👶",
      class: "Maternal II • Integral",
      overview: {
        meals: "Refeição completa, adorou o purê cremoso de abóbora.",
        sleep: "Soneca restauradora de 1h 40min de tarde.",
        hygiene: "3 trocas convencionais de rotina.",
        activity: "Simulações teatrais interativas com fantoches de bichinhos."
      },
      lumiQuote: "Guilherme imitou o som de um gatinho com muita graça e clareza, divertindo todos os amiguinhos do grupo!",
      development: {
        social: 80,
        socialText: "Brincou de forma paralela mas expressou viva curiosidade nos brinquedos dos colegas.",
        language: 70,
        languageText: "Sinalizou seus desejos de água e brinquedos usando novas junções linguísticas curtas."
      },
      gallery: [
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80"
      ]
    },
    theo: {
      name: "Theo Rocha",
      avatar: "👦",
      class: "Infantil III - A • Manhã",
      overview: {
        meals: "Comeu o sanduíche natural inteiro de forma independente.",
        sleep: "Optou por descansar folheando livrinhos de história ilustrados.",
        hygiene: "2 trocas normais.",
        activity: "Organização comunitária e rega na horta escolar."
      },
      lumiQuote: "Theo demonstrou liderança entusiasmada e ótimo companheirismo ao plantar as sementes na nossa Horta Afetiva.",
      development: {
        social: 86,
        socialText: "Theo expressou carinho e dividiu a pazinha de jardinagem cooperativamente.",
        language: 79,
        languageText: "Descreveu com exatidão o passo a passo de desenvolvimento e rega das hortaliças."
      },
      gallery: [
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80"
      ]
    },
    sophia: {
      name: "Sophia Rocha",
      avatar: "👶",
      class: "Berçário I • Manhã",
      overview: {
        meals: "Tomou 150ml de mamadeira integral e aceitou papinha de maçã fresca.",
        sleep: "Dormiu por duas sonecas calmas de 50 minutos cada.",
        hygiene: "4 trocas de fralda cuidadosas. Pele totalmente saudável.",
        activity: "Estímulo visual com móbiles coloridos e músicas harmônicas."
      },
      lumiQuote: "Sophia sorriu de forma adorável aos estímulos de sons e cantigas, excelente resposta expressiva primordial.",
      development: {
        social: 70,
        socialText: "Buscou abrigo emocional e sorriu nos momentos de interação com a equipe docente.",
        language: 60,
        languageText: "Balbuciou vogais alegres acompanhando o som da música de acolhimento."
      },
      gallery: [
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80"
      ]
    },
    lucas: {
      name: "Lucas Rocha",
      avatar: "👦",
      class: "Maternal I • Integral",
      overview: {
        meals: "Comeu quase todo o almoço mas pulou o suco de frutas.",
        sleep: "Soneca tranquila de tarde por 1h 10min.",
        hygiene: "2 trocas completas de rotina.",
        activity: "Circuito lúdico de zigue-zague com cordas e fitas no chão."
      },
      lumiQuote: "Lucas exercitou seu equilíbrio e controle psicomotor de forma confiante nas fitas coloridas.",
      development: {
        social: 77,
        socialText: "Interagiu de forma animada nas rodas de conversa e cantigas recreativas.",
        language: 68,
        languageText: "Expressou sentimentos utilizando novas junções de duas sílabas com excelente pronúncia."
      },
      gallery: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80"
      ]
    },
    helena: {
      name: "Helena Souza",
      avatar: "👧",
      class: "Maternal II • Integral",
      overview: {
        meals: "Alimentação robusta no almoço e adorou fatias doces de manga.",
        sleep: "Dormiu muito bem por 1h 30min no repouso da tarde.",
        hygiene: "2 trocas higiênicas normais e banhinho relaxante.",
        activity: "Rodas de contação de histórias com fantoches de dedos."
      },
      lumiQuote: "Helena simulou de forma hilária os sons de vento e animais, demonstrando uma imaginação muito rica!",
      development: {
        social: 84,
        socialText: "Helena expressou solidariedade natural acalmando um amiguinho triste.",
        language: 80,
        languageText: "Integrou em suas frases novos termos de qualificação de cenários de floresta."
      },
      gallery: [
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80"
      ]
    },
    pedro: {
      name: "Pedro Souza",
      avatar: "👦",
      class: "Infantil II - B • Tarde",
      overview: {
        meals: "Comeu toda a refeição principal e a fruta fresca de sobremesa.",
        sleep: "Repousou tranquilamente por 45 minutos.",
        hygiene: "3 trocas normais registradas.",
        activity: "Atividades coletivas integradas com paraquedas de tecido gigante."
      },
      lumiQuote: "Pedro correu e gargalhou intensamente conduzindo a ondulação de balões do paraquedas, excelente alegria contagiante!",
      development: {
        social: 81,
        socialText: "Fez parcerias divertidas respeitando os combinados coletivos e o tempo do amigo.",
        language: 74,
        languageText: "Expressou-se com frases exclamativas cheias de empolgação sobre a gincana."
      },
      gallery: [
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80"
      ]
    },
    beatriz: {
      name: "Beatriz Costa",
      avatar: "👶",
      class: "Berçário I • Manhã",
      overview: {
        meals: "Papinha salgada orgânica muito bem aceita. Bebeu água mineral.",
        sleep: "Duas sonecas excelentes: 1h e 45min consecutivamente.",
        hygiene: "3 trocas convencionais completas realizadas.",
        activity: "Engatinhar estimulado em superfícies táteis diversas."
      },
      lumiQuote: "Beatriz tocou superfícies de camurça e lixa no tapete com muita curiosidade física, ótima exploração investigativa.",
      development: {
        social: 75,
        socialText: "Interagiu docemente rindo diante dos aplausos e cantorias de acolhida matinal.",
        language: 62,
        languageText: "Emitiu sons e sorrisos rítmicos marcando a batida da cantiga de roda."
      },
      gallery: [
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80"
      ]
    },
    gabriel: {
      name: "Gabriel Costa",
      avatar: "👦",
      class: "1º Ano A • Tarde",
      overview: {
        meals: "Almoçou todo o prato principal e pediu repetição de salada de rúcula.",
        sleep: "Dormiu tranquilamente por 50 minutos.",
        hygiene: "Higiene individual após as refeições feita com autonomia.",
        activity: "Artes plásticas livres com moldes de gesso e pincéis."
      },
      lumiQuote: "Gabriel moldou casinhas de gesso cobrindo as janelas com cores brilhantes de forma super caprichada!",
      development: {
        social: 87,
        socialText: "Gabriel emprestou alegremente seus moldes de casinha de gesso para os amigos da sala.",
        language: 81,
        languageText: "Dialogou sobre histórias fantásticas de naves espaciais que idealizou no desenho."
      },
      gallery: [
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80"
      ]
    },
    clara: {
      name: "Clara Costa",
      avatar: "👧",
      class: "Maternal I • Integral",
      overview: {
        meals: "Comeu o arroz com brócolis mas deixou a sopa. Adorou fatias de pêssego.",
        sleep: "Dormiu profundamente por 1h 15min.",
        hygiene: "2 trocas normais.",
        activity: "Brincadeiras heurísticas ordenando argolas plásticas."
      },
      lumiQuote: "Clara distribuiu as argolas de gesso e plástico por tamanho com excelente atenção motora fina.",
      development: {
        social: 79,
        socialText: "Convidou uma amiguinha próxima para dividir o colchonete de leitura de histórias.",
        language: 73,
        languageText: "Fez repetições vocais precisas e divertidas de palavras lidas nos quadrinhos."
      },
      gallery: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80"
      ]
    },
    laura: {
      name: "Laura Pinheiro",
      avatar: "👧",
      class: "Maternal II • Integral",
      overview: {
        meals: "Comeu toda a refeição de feijão, frango desfiado e repetiu brócolis.",
        sleep: "Repousou confortavelmente por 1h 25min de tarde.",
        hygiene: "2 trocas higiênicas regulares.",
        activity: "Aulas de ritmo e musicalização com tambores e chocalhos."
      },
      lumiQuote: "Laura bateu o tamborzinho coordenadamente acompanhando o compasso ditado pelo mestre, excelente!",
      development: {
        social: 83,
        socialText: "Organizadora voluntária exemplar das canastras de ritmo musical ao fim de aula.",
        language: 78,
        languageText: "Entoou rimas sonoras bem cantadas e memorizou os versinhos da parlenda ensaiada."
      },
      gallery: [
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80"
      ]
    },
    enzo: {
      name: "Enzo Pinheiro",
      avatar: "👦",
      class: "Infantil III - A • Manhã",
      overview: {
        meals: "Devorou o sanduíche natural de frango e bebeu todo o suco natural.",
        sleep: "Repousou bem ouvindo clássicos de piano instrumental de fundo.",
        hygiene: "Higiene individual das mãos desenvolvida autonomamente.",
        activity: "Quadra esportiva de coordenação motora ampla com bambolês."
      },
      lumiQuote: "Enzo passou pelos bambolês com saltos coordenados de muita segurança e vigor físico corporal.",
      development: {
        social: 85,
        socialText: "Enzo aplaudiu as conquistas motoras dos colegas com verdadeiro companheirismo coletivo.",
        language: 82,
        languageText: "Fez relatos vibrantes sobre como aprendeu a nadar no fim de semana."
      },
      gallery: [
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80"
      ]
    }
  };

  // Get children belongs to current user
  const getParentsChildren = (): string[] => {
    const email = currentUser?.email?.toLowerCase() || 'ricardo.responsavel@lasalle.org';
    if (email === 'ricardo.responsavel@lasalle.org') return ['guto', 'alice', 'bruno'];
    if (email === 'mariana.almeida@lasalle.org') return ['leo', 'guilherme'];
    if (email === 'carlos.rocha@lasalle.org') return ['theo', 'sophia', 'lucas'];
    if (email === 'patricia.souza@lasalle.org') return ['helena', 'pedro'];
    if (email === 'fernanda.costa@lasalle.org') return ['beatriz', 'gabriel', 'clara'];
    if (email === 'gustavo.pinheiro@lasalle.org') return ['laura', 'enzo'];
    return ['guto', 'alice', 'bruno']; // legacy default fallback
  };

  const parentsChildren = getParentsChildren();

  // Active student state
  const [selectedStudent, setSelectedStudent] = useState<string>(() => parentsChildren[0]);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  // Sync selection if logged in user changes
  React.useEffect(() => {
    setSelectedStudent(parentsChildren[0]);
  }, [currentUser?.email]);

  const student = studentsData[selectedStudent] || studentsData[parentsChildren[0]];

  // Post comment handler
  const handlePostComment = (postId: string) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    onAddComment(postId, text.trim());
    setCommentText({
      ...commentText,
      [postId]: ''
    });
  };

  const getFamilyName = (): string => {
    if (!currentUser) return "Família Almeida";
    const name = currentUser.name || "";
    if (name.includes("Ricardo")) return "Família Dias";
    if (name.includes("Mariana")) return "Família Almeida";
    if (name.includes("Carlos")) return "Família Rocha";
    if (name.includes("Patrícula") || name.includes("Patrícia")) return "Família Souza";
    if (name.includes("Fernanda")) return "Família Costa";
    if (name.includes("Gustavo")) return "Família Pinheiro";
    return name.replace(/\([^)]*\)/g, "").trim(); 
  };
  
  const familyName = getFamilyName();

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">

      {/* Top Header Navigation matching Image 5 */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
        
        {/* Brand & Dynamic Tabs */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-primary text-brand-gold flex items-center justify-center font-bold text-center">
              🏫
            </span>
            <span className="font-extrabold text-brand-primary tracking-tight text-lg">Lumi Família</span>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setActiveMenu('inicio')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMenu === 'inicio' 
                  ? 'bg-white text-brand-primary shadow-2xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setActiveMenu('agenda')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMenu === 'agenda' 
                  ? 'bg-white text-brand-primary shadow-2xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Agenda
            </button>
            <button
              onClick={() => setActiveMenu('financeiro')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMenu === 'financeiro' 
                  ? 'bg-white text-brand-primary shadow-2xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Financeiro
            </button>
          </div>
        </div>

        {/* User context & notifications */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <button className="relative w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-550 border border-white"></span>
          </button>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 py-1.5 px-4 rounded-xl">
            <div className="w-7 h-7 rounded-sm bg-brand-gold/20 text-brand-primary flex items-center justify-center font-bold text-xs">
              👩‍🦰
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-extrabold leading-none uppercase">Responsável</p>
              <p className="text-xs font-bold text-slate-800 leading-tight">{familyName}</p>
            </div>
          </div>
        </div>

      </div>

      {activeMenu === 'inicio' && (
        <>
          {/* Main Content Dashboard */}
          <div className="space-y-6">
            
            {/* Greetings Banner + Selector */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-50 border border-slate-200/60 p-6 rounded-3xl">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-brand-primary tracking-tight">
                  Olá, {familyName}!
                </h1>
                <p className="text-slate-500 text-sm font-semibold mt-1">
                  Que bom ter você por aqui hoje. Veja as atualizações diárias.
                </p>
              </div>

              {/* Cool interactive dropdown with pupil context switching */}
              <div className="relative shrink-0">
                <button
                  onClick={() => setShowStudentDropdown(!showStudentDropdown)}
                  className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-2xs hover:border-slate-350 transition-all cursor-pointer text-left focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-gold text-[#002D62] font-black text-sm flex items-center justify-center shadow-sm overflow-hidden shrink-0">
                    {(() => {
                      const matchStudentObj = students.find(s => s.name === student.name);
                      return matchStudentObj?.photo ? (
                        <img src={matchStudentObj.photo} alt={student.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span>{student.avatar}</span>
                      );
                    })()}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Vendo o dia de:</p>
                    <p className="text-xs font-black text-brand-primary mt-1 flex items-center gap-1">
                      <span>{student.name}</span>
                      <ChevronDown size={14} className="text-slate-400" />
                    </p>
                  </div>
                </button>

                {showStudentDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-lg py-2.5 z-20 animate-fade-in">
                    <p className="px-4 py-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Alternar Estudante</p>
                    {parentsChildren.map((childKey) => {
                      const st = studentsData[childKey];
                      if (!st) return null;
                      return (
                        <button
                          key={childKey}
                          onClick={() => {
                            setSelectedStudent(childKey);
                            setShowStudentDropdown(false);
                          }}
                          className={`w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                            selectedStudent === childKey ? 'bg-slate-50/80 font-bold border-l-4 border-brand-primary' : ''
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-brand-gold text-[#002D62] font-black text-xs flex items-center justify-center shadow-sm overflow-hidden shrink-0">
                            {(() => {
                              const matchStudentObj = students.find(s => s.name === st.name);
                              return matchStudentObj?.photo ? (
                                <img src={matchStudentObj.photo} alt={st.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <span>{st.avatar}</span>
                              );
                            })()}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 leading-none">{st.name}</p>
                            <p className="text-[10px] text-slate-450 font-semibold mt-1">{st.class}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Dashboard grid mapping Image 5 layout exactly! */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Routine & Development */}
              <div className="lg:col-span-8 space-y-6">

                {/* Day Overview Layout Card */}
                <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 shadow-xs space-y-6">
                  
                  <div className="flex justify-between items-center pb-1">
                    <div>
                      <h3 className="text-xl font-black text-brand-primary tracking-tight">
                        Visão Geral do Dia
                      </h3>
                      <p className="text-xs text-slate-400 font-bold uppercase mt-0.5">La Salle Conecta • Rotina Integrada</p>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1.5 rounded-full shadow-2xs">
                      Hoje, 24 Mai
                    </span>
                  </div>

                  {/* Grid of 4 cards exactly inspired by image 5! */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    
                    {/* Meal (Alimentação) */}
                    <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4.5 space-y-3 flex flex-col justify-between hover:shadow-2xs transition-shadow">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-650 flex items-center justify-center font-bold text-sm shadow-2xs">
                          <Utensils size={16} />
                        </div>
                        <h4 className="text-xs font-black text-slate-800 mt-3">Alimentação</h4>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                        {student.overview.meals}
                      </p>
                    </div>

                    {/* Sleep (Sono) */}
                    <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4.5 space-y-3 flex flex-col justify-between hover:shadow-2xs transition-shadow">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-650 flex items-center justify-center font-bold text-sm shadow-2xs">
                          <Moon size={16} />
                        </div>
                        <h4 className="text-xs font-black text-slate-800 mt-3">Sono</h4>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                        {student.overview.sleep}
                      </p>
                    </div>

                    {/* Hygiene (Higiene) */}
                    <div className="bg-slate-50/70 border border-slate-100/90 rounded-2xl p-4.5 space-y-3 flex flex-col justify-between hover:shadow-2xs transition-shadow">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-650 flex items-center justify-center font-bold text-xs shadow-2xs">
                          <ShieldCheck size={16} />
                        </div>
                        <h4 className="text-xs font-black text-slate-800 mt-3">Higiene</h4>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                        {student.overview.hygiene}
                      </p>
                    </div>

                    {/* Highly highlighted active session class of the day (e.g. Artes) */}
                    <div className="bg-amber-50 border-2 border-brand-gold/60 rounded-2xl p-4.5 space-y-3 flex flex-col justify-between shadow-2xs ring-2 ring-brand-gold/5">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-brand-gold text-brand-primary flex items-center justify-center font-bold text-sm shadow-sm animate-pulse">
                          <Palette size={16} />
                        </div>
                        <h4 className="text-xs font-black text-slate-900 mt-3">Artes</h4>
                      </div>
                      <p className="text-xs text-slate-600 font-bold leading-relaxed">
                        {student.overview.activity}
                      </p>
                    </div>

                  </div>

                  {/* Lumi speech bubble in banner style exactly matching Image 5! */}
                  <div className="flex gap-4 items-start bg-amber-50/45 border border-brand-gold/15 p-4.5 rounded-2xl relative">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-150 flex items-center justify-center shrink-0 shadow-3xs">
                      <span className="font-bold text-base">🐝</span>
                    </div>

                    {/* Speech bubble pointy arrow CSS shape emulator relative to alignment */}
                    <div className="relative">
                      <p className="text-xs md:text-sm text-slate-700 font-semibold leading-relaxed italic m-0">
                        "{student.lumiQuote}"
                      </p>
                      <p className="text-[10px] text-brand-secondary font-extrabold uppercase mt-2 select-none tracking-wider">
                        ★ Sintonizado por Lumi AI • Pediatria & Educação Afetiva
                      </p>
                    </div>
                  </div>

                </div>

                {/* Sub-grid of Desarrollo & Galeria layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Desenvolvimento Box */}
                  <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-xs space-y-5">
                    <div>
                      <h3 className="text-[16px] font-black text-brand-primary">Desenvolvimento</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Acompanhamento de Habilidades</p>
                    </div>

                    {/* Progress 1 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-755">
                        <span>Social-Emocional</span>
                        <span className="font-mono text-brand-primary">{student.development.social}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 shadow-inner overflow-hidden">
                        <div 
                          className="bg-brand-gold h-full rounded-full transition-all duration-500" 
                          style={{ width: `${student.development.social}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                        {student.development.socialText}
                      </p>
                    </div>

                    {/* Progress 2 */}
                    <div className="space-y-2.5 pt-1">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-755">
                        <span>Linguagem & Comunicação</span>
                        <span className="font-mono text-brand-primary">{student.development.language}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 shadow-inner overflow-hidden">
                        <div 
                          className="bg-brand-primary h-full rounded-full transition-all duration-500" 
                          style={{ width: `${student.development.language}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                        {student.development.languageText}
                      </p>
                    </div>

                  </div>

                  {/* Gallería de fotos */}
                  <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-xs space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-[16px] font-black text-brand-primary">Galeria do {student.name.split(' ')[0]}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Registros Visuais Inclusivos</p>
                      </div>
                      <span className="text-[9px] bg-[#002D62] text-white font-extrabold uppercase px-2.5 py-0.5 rounded-sm tracking-wide">
                        NOVO
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {student.gallery.map((url, i) => (
                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group shadow-3xs shrink-0 max-h-[110px]">
                          <img 
                            src={url} 
                            alt={`Galeria ${i}`} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                          {i === 2 && (
                            <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-white font-extrabold text-xs">
                              +12
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-[#005EA6] hover:text-brand-primary font-black uppercase text-center mt-2 cursor-pointer transition-colors block">
                      Acessar Portfólio Completo➔
                    </p>
                  </div>

                </div>

              </div>

              {/* Right Column: Ações Pendentes & Comunicados matching Image 5 */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Ações Pendentes widgets */}
                <div className="bg-[#002D62] text-white rounded-[32px] p-6 shadow-md border border-[#003675] space-y-5">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-white/10">
                    <span className="text-yellow-400 font-black text-sm">❗</span>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-100">Ações Pendentes</h4>
                  </div>

                  {/* Field 1: Authorization to museum */}
                  <div className="bg-white/10 border border-white/5 rounded-2xl p-4.5 space-y-4">
                    <div className="space-y-0.5">
                      <p className="text-xs font-extrabold text-white">Passeio ao Museu (28/05)</p>
                      <p className="text-[10px] text-blue-200 font-semibold">Autorização legal necessária para saída pedagógica.</p>
                    </div>

                    {authorizedMuseum ? (
                      <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 py-2.5 px-4 rounded-xl text-xs font-black flex items-center gap-1.5 justify-center animate-fade-in">
                        <Check size={14} className="text-emerald-300" />
                        <span>✓ Autorizado com Sucesso!</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAuthorizedMuseum(true)}
                        className="w-full py-2.5 bg-[#FFC72C] hover:bg-yellow-400 text-[#002D62] font-black rounded-xl text-xs uppercase tracking-wider shadow-sm cursor-pointer transition-all active:scale-[0.98]"
                      >
                        Autorizar Agora
                      </button>
                    )}
                  </div>

                  {/* Field 2: Medicine tracking */}
                  <div className="bg-white/10 border border-white/5 rounded-2xl p-4.5 space-y-3.5">
                    <div className="space-y-0.5">
                      <p className="text-xs font-extrabold text-white">Medicamento das 16h</p>
                      <p className="text-[10px] text-blue-200 font-semibold">Paracetamol para controle de febre estipulado.</p>
                    </div>

                    <button
                      onClick={() => setMedicineChecked(!medicineChecked)}
                      className={`w-full py-2.5 border rounded-xl text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        medicineChecked
                          ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                          : 'bg-transparent border-white/20 text-white hover:bg-white/5'
                      }`}
                    >
                      {medicineChecked ? (
                        <>
                          <Check size={13} />
                          <span>Dose Confirmada</span>
                        </>
                      ) : (
                        <span>Aguardando Confirmação</span>
                      )}
                    </button>
                  </div>

                </div>

                {/* Comunicados Card exactly matching Image 5 list */}
                <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-xs space-y-4">
                  <div className="pb-1 border-b border-slate-100 flex justify-between items-center">
                    <h4 className="text-xs font-black tracking-widest text-[#002D62] uppercase">
                      📢 Comunicados Recentes
                    </h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#002D62] animate-pulse"></span>
                  </div>

                  {/* List of elements */}
                  <div className="space-y-3">
                    
                    {/* Item 1 */}
                    <div className="flex gap-3.5 items-start p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-colors">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 stroke-orange-650 text-orange-700 flex items-center justify-center shrink-0">
                        <Megaphone size={15} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-extrabold text-slate-800">Festa da Família 2024</p>
                        <p className="text-[10px] text-slate-400 font-semibold">Postado há 2 horas • Evento Escolar</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex gap-3.5 items-start p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-colors">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center shrink-0">
                        <FileText size={15} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-extrabold text-slate-800">Cardápio de Junho</p>
                        <p className="text-[10px] text-slate-400 font-semibold">Postado ontem • Nutrição Escolar</p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex gap-3.5 items-start p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-colors">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                        <Calendar size={15} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-extrabold text-slate-800">Reunião de Pais e Tutores</p>
                        <p className="text-[10px] text-slate-400 font-semibold">Postado há 3 dias • Coordenação</p>
                      </div>
                    </div>

                  </div>

                  <button className="text-xs font-extrabold text-[#005EA6] hover:text-brand-primary flex items-center gap-1 justify-center w-full pt-1.5 transition-colors cursor-pointer">
                    <span>Ver todos os comunicados</span>
                    <ChevronRight size={14} />
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Social Feedback and interaction wall underneath matching original system */}
          <div className="space-y-5 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-black text-brand-primary flex items-center gap-2">
              <span>💬</span>
              Mural Escolar e Feed de Compartilhamento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white border border-slate-200 rounded-[28px] p-5.5 hover:shadow-xs transition-shadow space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-extrabold text-slate-800 leading-tight">{post.title}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">{post.date}</p>
                    </div>
                    <span className="text-[9px] bg-brand-light text-brand-primary font-black uppercase px-2.5 py-0.5 rounded-sm">
                      {post.type === 'notice' ? 'Comunicado' : 'Momento'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-650 leading-relaxed font-semibold">{post.content}</p>

                  {post.imageUrl && (
                    <div className="rounded-xl overflow-hidden aspect-video border border-slate-100 relative max-h-[160px]">
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex gap-4 border-t border-slate-100 pt-3 text-slate-450 text-[11px] font-bold">
                    <button 
                      onClick={() => onLikePost(post.id)}
                      className="flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Heart size={14} className="fill-[#F87171] text-[#EF4444]" />
                      <span>Curtir {post.likes > 0 && `(${post.likes})`}</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>Comentários ({post.comments.length})</span>
                    </span>
                  </div>

                  {post.comments.length > 0 && (
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
                      {post.comments.map((comm: any) => (
                        <div key={comm.id} className="text-[11px]">
                          <span className="font-extrabold text-slate-800">{comm.author}: </span>
                          <span className="text-slate-600 font-semibold">{comm.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <input 
                      type="text"
                      value={commentText[post.id] || ''}
                      onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                      placeholder="Adicione um comentário afetuoso..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-brand-primary"
                    />
                    <button 
                      onClick={() => handlePostComment(post.id)}
                      className="p-1 px-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary-hover shadow-sm cursor-pointer"
                    >
                      <Send size={12} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeMenu === 'agenda' && (
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in text-slate-850">
          <div>
            <h3 className="text-2xl font-black text-brand-primary tracking-tight">Agenda Escolar e Eventos</h3>
            <p className="text-xs text-slate-400 font-bold uppercase mt-0.5">Acompanhe as próximas atividades letivas</p>
          </div>

          <div className="space-y-4">
            {[
              { date: "28/05", title: "Passeio Monitorado ao Museu de Ciências Naturais", desc: "Autorização pendente para o {student.name}. Saída programada às 08:30.", type: "evento", tag: "IMPORTANTE" },
              { date: "05/06", title: "Festa da Família La Salle 2024", desc: "Apresentações musicais das turmas de educação infantil e piquenique coletivo.", type: "comemorativo", tag: "FESTIVIDADE" },
              { date: "15/06", title: "Fórum de Acompanhamento PEI", desc: "Encontro individual com pais, professores e terapeutas para avaliar o plano de inclusão.", type: "reuniao", tag: "CONSELHO" }
            ].map((ev, i) => (
              <div key={i} className="flex gap-4 items-start p-4 hover:bg-slate-50 border border-slate-150 rounded-2xl transition-colors">
                <div className="w-16 h-16 rounded-xl bg-[#002D62] text-white flex flex-col justify-center items-center text-center shrink-0">
                  <span className="text-xs font-bold leading-none uppercase">MAI/JUN</span>
                  <span className="text-lg font-black leading-none mt-1">{ev.date.split('/')[0]}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] bg-brand-gold/20 text-[#002D62] font-black uppercase px-2 py-0.5 rounded-sm">
                    {ev.tag}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-800 pt-0.5">{ev.title}</h4>
                  <p className="text-xs text-slate-550 leading-relaxed font-semibold">{ev.desc.replace('{student.name}', student.name)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMenu === 'financeiro' && (
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
          <div>
            <h3 className="text-2xl font-black text-brand-primary tracking-tight">Portal Financeiro e Boletos</h3>
            <p className="text-xs text-slate-400 font-bold uppercase mt-0.5">Mensalidades escolares e atividades extracurriculares</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-slate-800 space-y-1">
              <span className="text-[10px] text-emerald-700 font-black uppercase tracking-wider block">ÚLTIMA MENSALIDADE</span>
              <p className="text-xl font-black">R$ 1.850,00</p>
              <p className="text-xs text-emerald-700 font-bold flex items-center gap-1 pt-1">
                <span>✓ PAGO EM 05/06/2026</span>
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl text-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">PRÓXIMO VENCIMENTO</span>
              <p className="text-xl font-black text-slate-800">R$ 1.850,00</p>
              <p className="text-xs text-brand-secondary font-bold flex items-center gap-1 pt-1">
                <span>📅 Vence em 05/07/2026</span>
              </p>
            </div>

            <div className="bg-amber-50 border border-brand-gold/30 p-5 rounded-2xl text-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">TAXA PASSEIO MUSEU</span>
              <p className="text-xl font-black">R$ 45,00</p>
              <p className="text-xs text-amber-850 font-bold flex items-center gap-1 pt-1">
                <span>⚠️ Aguardando assinatura legal</span>
              </p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden mt-4">
            <table className="w-full text-xs text-left text-slate-705">
              <thead className="bg-slate-100 text-slate-600 font-black uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Descrição do Lançamento</th>
                  <th className="px-4 py-3">Emissão</th>
                  <th className="px-4 py-3">Vencimento</th>
                  <th className="px-4 py-3 text-right">Valor</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold font-sans">
                <tr>
                  <td className="px-4 py-3 font-extrabold text-slate-800">Mensalidade Escolar - Junho 2026</td>
                  <td className="px-4 py-3">25/05/2026</td>
                  <td className="px-4 py-3">05/06/2026</td>
                  <td className="px-4 py-3 text-right">R$ 1.850,00</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase text-[9px]">Pago</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-extrabold text-slate-800">Mensalidade Escolar - Julho 2026</td>
                  <td className="px-4 py-3">25/06/2026</td>
                  <td className="px-4 py-3">05/07/2026</td>
                  <td className="px-4 py-3 text-right">R$ 1.850,00</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold uppercase text-[9px]">Aberto</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-extrabold text-slate-800">Material Didático e Papelaria</td>
                  <td className="px-4 py-3">15/05/2026</td>
                  <td className="px-4 py-3">30/05/2026</td>
                  <td className="px-4 py-3 text-right">R$ 320,00</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase text-[9px]">Pago</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
