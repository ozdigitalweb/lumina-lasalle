import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client with user-agent for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Lumi prompt personality helper
const SYSTEM_INSTRUCTION_CHAT = `Você é o Lumi, o mascote virtual e inteligência pedagógica da plataforma "La Salle Conecta" (da Fundação La Salle). 
Você é um pequeno vagalume que acredita que cada criança possui uma luz única que brilha em seu próprio ritmo. 
Sua missão é dar orientações pedagógicas afetuosas, traduzindo dados e ciência do desenvolvimento infantil em conexões cheias de carinho, respeito e empatia.

Diretrizes de resposta:
1. Responda SEMPRE em português do Brasil (PT-BR).
2. Seja extremamente acolhedor, positivo, profissional e empático. Use uma linguagem que mescle rigor com afeto.
3. Se posicione como o Lumi, use metáforas de iluminar, caminhos, luz, conexões e vagalume de forma sutil e charmosa.
4. Ajude professores da educação infantil a elaborar atividades, entender comportamentos (como inclusão e autorregulação), mediar conflitos (mordidas, birras) e aproximar as famílias da escola.
5. Suas respostas devem ser práticas, acionáveis e alinhadas às diretrizes da BNCC (Campos de Experiência e direitos de aprendizagem).
6. Mantenha os textos bem estruturados e legíveis, usando tópicos quando conveniente.`;

// 1. Central Chat Endpoint
app.post("/api/lumi/chat", async (req, res) => {
  try {
    const { message, history, currentUser } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensagem é obrigatória." });
    }

    let customInstructions = SYSTEM_INSTRUCTION_CHAT;
    if (currentUser?.role === 'Responsável') {
      customInstructions += `\n\nVocê está conversando com o Responsável: ${currentUser.name}. `;
      const email = currentUser.email?.toLowerCase();
      if (email === 'ricardo.responsavel@lasalle.org') {
        customInstructions += `Os seus filhos matriculados na escola são: Guto Pinheiro (Turma Berçário I, com suspeita de TEA, foco em atividades sensoriais e acolhimento), Alice Silva (Infantil II) e Bruno Dias (Infantil II). Fale carinhosamente sobre eles se perguntado.`;
      } else if (email === 'mariana.almeida@lasalle.org') {
        customInstructions += `Os seus filhos matriculados na escola são: Leo Almeida (Turma Infantil II) e Guilherme Almeida (Turma Berçário I).`;
      } else if (email === 'carlos.rocha@lasalle.org') {
        customInstructions += `Os seus filhos matriculados na escola são: Theo Rocha (Turma Infantil II, com paralisia cerebral leve e plano motor individualizado), Sophia Rocha (Turma Berçário I) e Lucas Rocha (Turma Infantil II).`;
      } else if (email === 'patricia.souza@lasalle.org') {
        customInstructions += `Os seus filhos matriculados na escola são: Helena Souza (Turma Berçário I, com síndrome de Down e plano de estimulação psicomotora ativa) e Pedro Souza (Turma Infantil II).`;
      } else if (email === 'fernanda.costa@lasalle.org') {
        customInstructions += `Os seus filhos matriculados na escola são: Beatriz Costa (Turma Berçário I, com TDAH leve e foco em rotinas curtas), Gabriel Costa (Turma Infantil II) e Clara Costa (Turma Berçário I).`;
      } else if (email === 'gustavo.pinheiro@lasalle.org') {
        customInstructions += `Os seus filhos matriculados na escola são: Laura Pinheiro (Turma Infantil II) e Enzo Pinheiro (Turma Infantil II).`;
      }
      customInstructions += `\nTrate o responsável com muita empatia, encoraje-o dando dicas de como continuar as estimulações do desenvolvimento no lar de forma lúdica. Responda do ponto de vista do vagalume Lumi!`;
    }

    // Since chat supports optional history
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: 'user', parts: [{ text: `Abaixo está o histórico recente de mensagens:\n${JSON.stringify(history || [])}\n\nE esta é a nova pergunta do usuário:\n${message}` }] }
      ],
      config: {
        systemInstruction: customInstructions,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Desculpe, minha luz piscou por um estante! Pode repetir de outra forma?";
    res.json({ text: reply });
  } catch (error: any) {
    console.error("Lumi Chat Error:", error);
    res.status(500).json({ error: "Falha ao falar com Lumi. Verifique se o GEMINI_API_KEY está configurado corretamente." });
  }
});

// 2. Class Plan BNCC Generator
app.post("/api/lumi/suggest-plan", async (req, res) => {
  try {
    const { experienceCamps, ageGroup, themeOrTopic } = req.body;

    if (!experienceCamps || !ageGroup || !themeOrTopic) {
      return res.status(400).json({ error: "Campos de experiência, faixa etária e tema são obrigatórios." });
    }

    const prompt = `Crie um plano de aula completo e estruturado para a Educação Infantil.
    - Faixa etária: ${ageGroup}
    - Campos de Experiência BNCC: ${experienceCamps.join(", ")}
    - Tema/Tópico: "${themeOrTopic}"
    
    Retorne OBRIGATORIAMENTE um objeto JSON válido correspondente à seguinte estrutura (mantenha os nomes das propriedades exatamente iguais):
    {
      "title": "Título criativo e afetuoso do plano",
      "objectives": ["Objetivo de aprendizagem BNCC 1", "Objetivo de aprendizagem BNCC 2", "Objetivo 3 focado no desenvolvimento integral"],
      "procedures": "Passo a passo pedagógico detalhado (com etapas de acolhimento, desenvolvimento, estimulação e encerramento)",
      "inclusionStrategy": "Estratégia específica de personalização e acessibilidade para acolher crianças com neurodivergências ou dificuldades",
      "familyGuideline": "Uma mensagem carinhosa e sugestão prática de continuidade ou conversa para enviar às famílias"
    }
    
    Siga à risca os termos pedagógicos da BNCC e retorne APENAS o JSON, sem markdown extra ou explicações antes ou depois.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const resText = response.text || "{}";
    try {
      const parsedPlan = JSON.parse(resText.trim());
      res.json(parsedPlan);
    } catch {
      // Fallback parser if JSON wrap occurs
      const cleaned = resText.replace(/```json/g, '').replace(/```/g, '').trim();
      res.json(JSON.parse(cleaned));
    }
  } catch (error: any) {
    console.error("Lumi Suggest Plan Error:", error);
    res.status(500).json({ error: "Erro ao estruturar projeto pedagógico com o Lumi." });
  }
});

// 3. Empathetic Special Needs/Observation Report Rewriter
app.post("/api/lumi/rewrite-report", async (req, res) => {
  try {
    const { studentName, specialNeeds, rawObservation, teacherName } = req.body;

    if (!studentName || !rawObservation) {
      return res.status(400).json({ error: "Nome do aluno e rascunho de observações são necessários." });
    }

    const prompt = `Como um consultor de Educação Especial e Inclusão Afetuosa da Plataforma La Salle Conecta, reescreva a seguinte observação de campo feita pelo educador. 
    Transforme notas que podem ser clínicas, clínicas-comportamentais cruas ou informais em um Relatório Reflexivo e Humanizado de Acompanhamento da Criança.

    Dados da Criança:
    - Nome: ${studentName}
    - Necessidade Educacional Especial/Condição: ${specialNeeds || "Nenhuma declarada formalmente / Observação de desenvolvimento geral"}
    - Educador(a) responsável: ${teacherName || "Educador(a) do La Salle Conecta"}

    Anotações brutas do Educador:
    "${rawObservation}"

    Instruções para o relato reescrito:
    1. Nunca rotule a criança. Foque no que ela JÁ alcança, em suas potencialidades e em pequenas vitórias observadas.
    2. Linguagem extremamente sensível, encorajadora, pedagógica e acolhedora.
    3. Substitua termos de déficit por descrições de progresso em ritmos individuais e caminhos de mediação.
    4. Proponha no meio do relatório 2 pequenos apoios ou adaptações práticas adicionais que o educador pode utilizar no dia a dia.
    5. Estruture o relatório em 3 seções curtas com títulos acolhedores (ex: "Caminhos Percorridos e Potencialidades", "Mediações Pedagógicas Clínico-Afetivas", "Próximos Passos e Estimulação Combinada").
    6. Termine com uma saudação elogiosa ao educador pelo carinho no olhar.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
      }
    });

    res.json({ formattedReport: response.text || "Erro ao reescrever relatório." });
  } catch (error: any) {
    console.error("Lumi Rewrite Report Error:", error);
    res.status(500).json({ error: "Erro ao processar e redigir o relatório inclusivo." });
  }
});

// 4. Client Advice Portal for Parents
app.post("/api/lumi/family-advice", async (req, res) => {
  try {
    const { parentQuestion } = req.body;

    if (!parentQuestion) {
      return res.status(400).json({ error: "A pergunta da família é necessária." });
    }

    const prompt = `Você é o Lumi, o vagalume guia da primeira infância. Uma família da escola enviou a seguinte preocupação / dúvida sobre seu filho(a):
    
    "${parentQuestion}"

    Responda com o máximo de afeto, escuta ativa e autoridade gentil de quem entende de educação e neurologia infantil.
    1. Acolha e valide os sentimentos dos pais ou responsáveis (não os julgue).
    2. Ofereça 3 sugestões de atividades, brincadeiras ou posturas simples, práticas e amorosas para fazer em casa.
    3. Use analogias de luz e cuidado.
    4. Mantenha um tom otimista, lembrando que cada criança tem sua própria luz e ritmo, em sintonia com a pedagogia Lassalista.
    5. Limite a resposta a um tamanho acolhedor de até 3 pequenos parágrafos bem estruturados.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    res.json({ advice: response.text || "Lumi está sintonizando a luz guia. Tente novamente!" });
  } catch (error: any) {
    console.error("Lumi Family Advice Error:", error);
    res.status(500).json({ error: "Erro ao gerar luz guia para a família." });
  }
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "La Salle Conecta API ativa" });
});

// Express serving client
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serving built front-end
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server La Salle Conecta running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
