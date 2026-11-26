# 🌟 La Salle Conecta

**Plataforma integrada de desenvolvimento da infância, cuidado diário, educação inclusiva e gestão educacional com o auxílio da inteligência pedagógica Lumi.**

Inspirada na pedagogia Lassalista e no lema pastoral *"Estamos Todos Conectados"*, a **La Salle Conecta** une educadores, coordenação pedagógica, equipe multiprofissional e famílias em uma estação unificada. A plataforma combina rotinas de acompanhamento da primeira infância, planejamento curricular alinhado à **BNCC**, prontuário multiprofissional, secretaria digital de matrículas e recursos de Inteligência Artificial por meio do mascote **Lumi (Vagalume)**.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
- [Perfis de Acesso e Permissões (RBAC)](#-perfis-de-acesso-e-permissões-rbac)
- [Módulos e Funcionalidades](#-módulos-e-funcionalidades)
- [Inteligência Pedagógica Lumi e Endpoints da API](#-inteligência-pedagógica-lumi-e-endpoints-da-api)
- [Modelo de Dados e Persistência](#-modelo-de-dados-e-persistência)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Execução Local](#-instalação-e-execução-local)
- [Contas de Teste e Acesso Rápido](#-contas-de-teste-e-acesso-rápido)

---

## 🎯 Visão Geral

O **La Salle Conecta** foi desenhado para atender múltiplas jornadas dentro do ecossistema escolar — com foco especial na Educação Infantil (Berçário, Maternal e Infantil) e suporte contínuo ao Ensino Fundamental e Ensino Médio:

- **Para Professores:** registro rápido da rotina diária (alimentação, sono, higiene e humor), criação de planos de aula alinhados à BNCC com apoio de IA, organização de sequências didáticas e consulta a orientações da equipe clínica para os alunos de suas turmas.
- **Para Famílias e Responsáveis:** acompanhamento transparente do dia a dia dos filhos, interação no Espaço Família, visualização do calendário e mural de eventos, acesso ao prontuário multiprofissional dos filhos, pré-matrícula digital e chat empático com o Lumi para dúvidas cotidianas.
- **Para Coordenação e Equipe Multiprofissional:** prontuário compartilhado com 9 especialidades (Psicologia, Psicopedagogia, Fonoaudiologia, Terapia Ocupacional, Assistência Social, Equipe de Inclusão, entre outras), gestão de PDI/PEI, reescrita humanizada de observações de campo e homologação de novas matrículas.
- **Para Administradores e Gestão de Rede:** painéis analíticos da unidade e visão macro da rede (ocupação regional, listas de espera, distribuição geográfica), cadastros base completos e gestor de perfis de acesso.

---

## 🛠 Arquitetura e Tecnologias

A aplicação segue uma arquitetura **Full-Stack monolítica em Node.js + Vite**, em que o servidor Express atende tanto os endpoints de API (`/api/*`) quanto a aplicação React (via middlewares do Vite em desenvolvimento e arquivos estáticos de `dist/` em produção).

### Front-end
- **React 19** + **TypeScript (~5.8)**
- **Vite 6** (`@vitejs/plugin-react`)
- **Tailwind CSS v4** (`@tailwindcss/vite`) com identidade visual Lassalista (`#002D62` Azul Marinho, `#005EA6` Azul Secundário, `#FFC72C` Dourado) e tipografia *Inter* / *JetBrains Mono*
- **Lucide React** para iconografia
- **Motion** (`motion/react`) para animações e micro-interações

### Back-end e Inteligência Artificial
- **Express 4** rodando na porta `3000` (`server.ts`, executado via `tsx` em dev e compilado com `esbuild` para `dist/server.cjs` em produção)
- **Google GenAI SDK (`@google/genai`)** integrado server-side com o modelo **`gemini-3.5-flash`**
- **dotenv** para carregamento de variáveis de ambiente

---

## 🔐 Perfis de Acesso e Permissões (RBAC)

A navegação lateral e os dados exibidos são filtrados dinamicamente de acordo com o perfil (`role`) do usuário autenticado:

| Perfil | Escopo de Dados | Módulos Visíveis |
| :--- | :--- | :--- |
| **Administrador** | Acesso irrestrito a toda a escola e rede | Todos os **16 módulos**, incluindo *Lumi Admin*, *Gestão Macro*, *Cadastros Base*, *Gestão de Eventos* e *Gestor de Acesso* |
| **Coordenador** | Acesso amplo às turmas, eventos, inclusão e homologações | Todos os módulos, **exceto** *Gestor de Acesso* |
| **Professor** | Visualiza e registra dados apenas das **turmas vinculadas ao seu perfil** | *Painel Central*, *Calendário Lumi*, *Mural de Eventos*, *Plano BNCC*, *Sequências Didáticas*, *Cuidado Diário*, *Educação Inclusiva*, *Espaço Família*, *Atendimento Multiprofissional* e *Falar com Lumi* |
| **Responsável** | Visualiza exclusivamente os dados dos **seus filhos vinculados** | *Painel Central*, *Calendário Lumi*, *Mural de Eventos*, *Cuidado Diário*, *Espaço Família*, *Atendimento Multiprofissional*, *Falar com Lumi* e *Matrícula de Alunos* |

---

## 🧩 Módulos e Funcionalidades

1. **Painel Central (`Dashboard.tsx`)**
   - Visão resumida adaptada ao perfil logado: para educadores/gestores, exibe indicadores da turma, alertas e atalhos; para responsáveis, apresenta cartões individuais por filho com o resumo do cuidado diário, destaques e ações rápidas.
2. **Calendário Lumi (`SchoolCalendar.tsx`)**
   - Agenda escolar com visualizações **Mensal**, **Semanal** e **Lista**, filtros por categoria (`festa`, `mostra`, `reuniao`, `formacao`) e público-alvo (`geral`, `familias`, `educadores`).
3. **Gestão de Eventos (`EventManagement.tsx`)**
   - Criação e edição de eventos escolares, controle de lista de participantes (RSVP) e configuração de recursos digitais (inscrições online, galeria de fotos, certificados digitais, transmissão).
4. **Mural de Eventos (`MuralDestaques.tsx`)**
   - Vitrine de boas práticas, projetos inovadores, conquistas e eventos das unidades da rede, com filtros por unidade, categoria, ordenação por curtidas/recentes e interação.
5. **Lumi Admin (`SchoolDashboard.tsx`)**
   - Painel executivo da unidade escolar com alternância de horizonte temporal (`trimestre`, `semestre`, `ano`), métricas de matrículas, ocupação de vagas, frequência e alunos em acompanhamento de inclusão (PDI).
6. **Gestão Macro (`MacroDashboard.tsx`)**
   - Visão estratégica multiescolar com ocupação por polo regional, ranking de listas de espera por cidade e mapa visual interativo das unidades.
7. **Plano BNCC (`PedagogyPlanner.tsx`)**
   - Biblioteca de atividades e projetos filtráveis por faixa etária e Campo de Experiência, relatórios pedagógicos por aluno e **Gerador de Planos de Aula com IA (Lumi)** estruturado nos moldes da BNCC com estratégias de inclusão e orientação às famílias.
8. **Sequências Didáticas (`DidacticSequences.tsx`)**
   - Construtor passo a passo de jornadas de aula ancoradas em códigos da BNCC (ex.: `EI03EO01`, `EI03TS02`), com biblioteca lateral de sugestões e estimativa de duração.
9. **Cuidado Diário (`CareRoutine.tsx`)**
   - Registro diário para bebês e crianças em 4 pilares — **Alimentação**, **Sono**, **Higiene** e **Humor** — acompanhado de observações do educador, com visão simplificada de acompanhamento para os pais.
10. **Educação Inclusiva (`InclusionPortal.tsx`)**
    - Gestão de **PDI/PEI** (metas de curto, médio e longo prazo, estratégias de acessibilidade, recursos e equipe envolvida) e **Reescrita Afetiva de Relatórios via Lumi**, que transforma anotações brutas de campo em relatórios pedagógicos humanizados sem rótulos.
11. **Espaço Família (`FamilyFeed.tsx`)**
    - Canal de conexão escola-família com resumo do dia por estudante, indicadores de desenvolvimento socioemocional e de linguagem, galeria de momentos, autorizações digitais e mural interativo com curtidas e comentários.
12. **Atendimento Multiprofissional (`ProfessionalCare.tsx`)**
    - Prontuário unificado integrando **9 especialidades** (`Educador`, `Coordenação Pedagógica`, `Psicologia`, `Psicopedagogia`, `Fonoaudiologia`, `Terapia Ocupacional`, `Assistência Social`, `Equipe de Inclusão`, `Gestão Escolar`) e 6 tipos de registro (`Evolução da aprendizagem`, `Intervenções realizadas`, `Estratégias utilizadas`, `Encaminhamentos`, `Relatórios`, `Recomendações`), com visões dedicadas para especialistas, professores (por turma) e pais (por filho).
13. **Falar com Lumi (`LumiAssistant.tsx`)**
    - Chat conversacional em tempo real com o mascote Lumi, com sugestões rápidas de prompts e contexto adaptado ao perfil do usuário (para responsáveis, o Lumi reconhece os filhos matriculados e oferece dicas lúdicas para casa).
14. **Cadastros Base (`SchoolRegistries.tsx`)**
    - CRUD completo de 8 entidades escolares com persistência local: **Escolas**, **Séries**, **Turmas**, **Professores**, **Alunos**, **Responsáveis**, **Profissões** e **Especialistas**.
15. **Matrícula de Alunos (`StudentEnrollment.tsx`)**
    - Fluxo em 2 etapas para responsáveis solicitarem pré-matrícula (incluindo declaração de necessidades educacionais especiais para geração inicial de AEE/PEI) e painel de auditoria/homologação para Coordenação e Administração.
16. **Gestor de Acesso (`AccessManager.tsx`)**
    - Administração de contas de operadores e usuários da unidade (criação, edição de papel/turma, ativação/inativação e busca).

---

## ✨ Inteligência Pedagógica Lumi e Endpoints da API

Todas as chamadas à API do Gemini são executadas **exclusivamente no servidor (`server.ts`)** utilizando a variável `GEMINI_API_KEY`, garantindo proteção da credencial.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Verificação de saúde da API (`{ status: "ok" }`). |
| `POST` | `/api/lumi/chat` | Conversa contextual com o Lumi (`message`, `history`, `currentUser`). Personaliza o atendimento para responsáveis considerando seus filhos vinculados. |
| `POST` | `/api/lumi/suggest-plan` | Gera um plano de aula BNCC em formato JSON estruturado (`title`, `objectives`, `procedures`, `inclusionStrategy`, `familyGuideline`) a partir de `experienceCamps`, `ageGroup` e `themeOrTopic`. |
| `POST` | `/api/lumi/rewrite-report` | Reescreve observações informais ou clínicas (`rawObservation`) de forma ética, inclusiva e propositiva em 3 seções estruturadas (`formattedReport`). |
| `POST` | `/api/lumi/family-advice` | Responde dúvidas de pais/responsáveis (`parentQuestion`) com escuta empática e 3 sugestões práticas de acolhimento no lar. |

---

## 💾 Modelo de Dados e Persistência

Os tipos principais estão centralizados em `src/types.ts` (`Student`, `Parent`, `School`, `Grade`, `ClassGroup`, `Profession`, `Specialist`, `Teacher`, `RoutineState`, `PedagogicalPlan`, `InclusionReport`, `FeedPost`, `ChatMessage`, `ProfessionalRecord`).

Para execução imediata sem dependência de banco externo, o estado inicial é populado a partir de `src/initialData.ts` e persistido automaticamente no navegador via `localStorage`:

- `la_salle_user` — Sessão do usuário autenticado
- `la_salle_students` — Lista de alunos e pré-matrículas
- `la_salle_routines` — Registros diários de cuidado
- `la_salle_plans` — Planos de aula BNCC gerados/salvos
- `la_salle_reports` — Relatórios inclusivos reescritos
- `la_salle_posts` — Publicações e comentários do Espaço Família
- `la_salle_chat_messages` — Histórico de conversas com o Lumi
- `la_salle_professional_records` — Prontuários multiprofissionais
- `la_salle_schools`, `la_salle_grades`, `la_salle_classes`, `la_salle_teachers`, `la_salle_parents`, `la_salle_professions`, `la_salle_specialists` — Cadastros base da secretaria

---

## 📁 Estrutura do Projeto

```text
.
├── .env.example              # Modelo de variáveis de ambiente
├── index.html                # Ponto de entrada HTML
├── metadata.json             # Metadados e capacidades da aplicação
├── package.json              # Dependências e scripts NPM
├── server.ts                 # Servidor Express + endpoints Lumi (Gemini) + Vite middleware
├── tsconfig.json             # Configuração TypeScript
├── vite.config.ts            # Configuração Vite + Tailwind CSS
└── src/
    ├── App.tsx               # Shell principal, controle de sessão, RBAC e roteamento por abas
    ├── index.css             # Tokens de tema Tailwind (@theme) e fontes
    ├── initialData.ts        # Dados iniciais de alunos, rotinas, planos, relatórios e feed
    ├── main.tsx              # Bootstrap React
    ├── types.ts              # Interfaces TypeScript de domínio
    └── components/
        ├── AccessManager.tsx
        ├── CareRoutine.tsx
        ├── Dashboard.tsx
        ├── DidacticSequences.tsx
        ├── EventManagement.tsx
        ├── FamilyFeed.tsx
        ├── InclusionPortal.tsx
        ├── LoginScreen.tsx
        ├── LumiAssistant.tsx
        ├── MacroDashboard.tsx
        ├── MuralDestaques.tsx
        ├── PedagogyPlanner.tsx
        ├── ProfessionalCare.tsx
        ├── SchoolCalendar.tsx
        ├── SchoolDashboard.tsx
        ├── SchoolRegistries.tsx
        └── StudentEnrollment.tsx
```

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
- **Node.js** 18+ (recomendado Node 20 ou 22)
- Chave de API do Google Gemini (`GEMINI_API_KEY`) para habilitar os recursos do Lumi

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e preencha sua chave:
```bash
cp .env.example .env
```
```env
GEMINI_API_KEY="sua-chave-gemini-aqui"
APP_URL="http://localhost:3000"
```

### 3. Iniciar em modo de desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em **`http://localhost:3000`** (front-end e API servidos na mesma porta).

### 4. Outros scripts úteis
| Comando | Finalidade |
| :--- | :--- |
| `npm run lint` | Verifica tipagem e erros de sintaxe TypeScript (`tsc --noEmit`). |
| `npm run build` | Gera o bundle de produção do front-end (`dist/`) e compila `server.ts` para `dist/server.cjs`. |
| `npm run start` | Executa a aplicação compilada em modo produção (`node dist/server.cjs`). |
| `npm run clean` | Remove os artefatos de build (`dist/`). |

---

## 🧪 Contas de Teste e Acesso Rápido

Na tela inicial (`LoginScreen.tsx`), é possível entrar clicando diretamente nos cartões de **Acesso Rápido** ou informando o e-mail desejado no formulário de login (qualquer senha não vazia é aceita para contas de teste, exceto o perfil Super Adm):

| Perfil | Nome | E-mail | Observação |
| :--- | :--- | :--- | :--- |
| **Administrador** | Super Adm (Webmaster) | `webmaster@oz.com.br` | Senha obrigatória no formulário: `30tnvsslum` |
| **Administrador** | Luciana Baptista | `luciana.admin@lasalle.org` | Acesso total e gestão de acessos |
| **Coordenador** | Helena Martins | `helena.coordenadora@lasalle.org` | Gestão escolar e homologação de matrículas |
| **Coordenador** | Dra. Carolina Mendes | `carolina.psico@lasalle.org` | Psicóloga • Atendimento de Inclusão |
| **Professor** | Prof. Pedro Reis | `pedro.professor@lasalle.org` | Tutor da turma *Maternal II* |
| **Professor** | Profª Bruna Santos | `bruna.santos@lasalle.org` | Tutora de *Berçário I* e *Maternal I* |
| **Responsável** | Ricardo Dias (Pai) | `ricardo.responsavel@lasalle.org` | Pai de *Guto* (TEA), *Alice* e *Bruno* |
| **Responsável** | Mariana Almeida (Mãe) | `mariana.almeida@lasalle.org` | Mãe de *Leo* e *Guilherme* |
| **Pré-Matrícula** | Responsável Visitante | `novo.responsavel@lasalle.org` | Botão *"Fazer Pré-Matrícula"* direciona direto para a secretaria digital |

> **Dica para recuperação de senha simulada:** na tela *"Esqueceu sua senha?"*, utilize o código **`1234`** na etapa de verificação.
