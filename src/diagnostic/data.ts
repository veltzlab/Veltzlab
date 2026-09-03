import {
  Megaphone,
  Briefcase,
  Headset,
  Wrench,
  BarChart3,
  Workflow,
  Users,
  Zap,
  Cable,
  LayoutDashboard,
  Sparkles,
  LayoutTemplate,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export type PillarId =
  | "marketing"
  | "comercial"
  | "atendimento"
  | "ferramentas"
  | "dados"
  | "processos";

export type Option = { label: string; score: 0 | 1 | 2 | 3 };

export type Question = {
  id: string;
  pillar: PillarId;
  text: string;
  options: Option[];
};

export type Pillar = {
  id: PillarId;
  name: string;
  short: string;
  icon: LucideIcon;
  /** Narrative shown in the report depending on the score band */
  diagnosis: { low: string; mid: string; high: string };
  /** Recommended actions when this pillar is a priority */
  actions: string[];
  /** Tech modules that solve this pillar */
  modules: ModuleId[];
};

export type ModuleId =
  | "crm"
  | "automacoes"
  | "integracoes"
  | "dashboards"
  | "ia"
  | "landing";

/* ------------------------------------------------------------------ */
/* Tech module catalog                                                 */
/* ------------------------------------------------------------------ */
export const MODULES: Record<
  ModuleId,
  { name: string; icon: LucideIcon; desc: string }
> = {
  crm: {
    name: "CRM",
    icon: Users,
    desc: "Funil padronizado, histÃ³rico Ãºnico e previsibilidade de receita.",
  },
  automacoes: {
    name: "AutomaÃ§Ãµes",
    icon: Zap,
    desc: "Elimina tarefas repetitivas e garante que nada seja esquecido.",
  },
  integracoes: {
    name: "IntegraÃ§Ãµes",
    icon: Cable,
    desc: "Conecta ferramentas para o dado circular sem digitaÃ§Ã£o manual.",
  },
  dashboards: {
    name: "Dashboards",
    icon: LayoutDashboard,
    desc: "Indicadores em tempo real com fonte Ãºnica de verdade.",
  },
  ia: {
    name: "IA Aplicada",
    icon: Sparkles,
    desc: "Triagem, respostas e anÃ¡lises inteligentes dentro do processo.",
  },
  landing: {
    name: "Sites & Landing Pages",
    icon: LayoutTemplate,
    desc: "CaptaÃ§Ã£o estruturada com rastreio de origem ponta a ponta.",
  },
};

/* ------------------------------------------------------------------ */
/* Pillars                                                             */
/* ------------------------------------------------------------------ */
export const PILLARS: Pillar[] = [
  {
    id: "marketing",
    name: "Marketing & AquisiÃ§Ã£o",
    short: "Marketing",
    icon: Megaphone,
    diagnosis: {
      low: "A aquisiÃ§Ã£o depende de esforÃ§o pontual e nÃ£o Ã© rastreÃ¡vel. VocÃª investe sem saber o que realmente traz cliente.",
      mid: "Existem canais ativos, mas a origem do lead se perde no caminho â€” o que dificulta decidir onde investir mais.",
      high: "A aquisiÃ§Ã£o Ã© estruturada e rastreada. O prÃ³ximo passo Ã© otimizar investimento por canal com dados de receita.",
    },
    actions: [
      "Implantar rastreio de origem (UTM) do anÃºncio atÃ© a venda",
      "Criar entrada Ãºnica de leads com distribuiÃ§Ã£o automÃ¡tica",
      "Medir CAC e retorno por canal em tempo real",
    ],
    modules: ["landing", "integracoes", "dashboards"],
  },
  {
    id: "comercial",
    name: "Comercial & Vendas",
    short: "Comercial",
    icon: Briefcase,
    diagnosis: {
      low: "O comercial opera na memÃ³ria e em planilhas individuais. O conhecimento sai da empresa junto com o vendedor.",
      mid: "Existe um CRM ou processo, mas o preenchimento Ã© inconsistente â€” o funil nÃ£o reflete a realidade.",
      high: "O funil Ã© padronizado e confiÃ¡vel. O foco agora Ã© aumentar conversÃ£o por etapa e reduzir ciclo de venda.",
    },
    actions: [
      "Padronizar funil, etapas e critÃ©rios de passagem",
      "Automatizar cadÃªncia de follow-up e lembretes",
      "Criar forecast de receita a partir do funil",
    ],
    modules: ["crm", "automacoes", "dashboards"],
  },
  {
    id: "atendimento",
    name: "Atendimento & Relacionamento",
    short: "Atendimento",
    icon: Headset,
    diagnosis: {
      low: "O atendimento acontece em nÃºmeros pessoais e conversas soltas. NÃ£o hÃ¡ histÃ³rico nem controle de resposta.",
      mid: "HÃ¡ uma ferramenta de atendimento, mas ela nÃ£o conversa com o comercial â€” o contexto se perde na passagem.",
      high: "O atendimento Ã© centralizado e integrado. Vale evoluir para triagem e respostas assistidas por IA.",
    },
    actions: [
      "Centralizar o WhatsApp com histÃ³rico compartilhado",
      "Integrar atendimento ao CRM para contexto completo",
      "Definir SLA de primeira resposta com alertas automÃ¡ticos",
    ],
    modules: ["crm", "automacoes", "ia"],
  },
  {
    id: "ferramentas",
    name: "Ferramentas & IntegraÃ§Ãµes",
    short: "Ferramentas",
    icon: Wrench,
    diagnosis: {
      low: "A operaÃ§Ã£o acumula ferramentas desconectadas, com funÃ§Ãµes sobrepostas e custo maior do que o necessÃ¡rio.",
      mid: "As principais ferramentas existem, mas as integraÃ§Ãµes sÃ£o parciais â€” ainda hÃ¡ digitaÃ§Ã£o em duplicidade.",
      high: "O ecossistema estÃ¡ conectado. O ganho agora vem de enxugar custos e refinar os fluxos entre sistemas.",
    },
    actions: [
      "Mapear stack atual e eliminar ferramentas redundantes",
      "Integrar sistemas crÃ­ticos ponta a ponta",
      "Remover pontos de digitaÃ§Ã£o manual duplicada",
    ],
    modules: ["integracoes", "automacoes"],
  },
  {
    id: "dados",
    name: "Dados & Indicadores",
    short: "Dados",
    icon: BarChart3,
    diagnosis: {
      low: "As decisÃµes sÃ£o tomadas por percepÃ§Ã£o. NÃ£o existe nÃºmero confiÃ¡vel e acessÃ­vel para orientar a operaÃ§Ã£o.",
      mid: "Os nÃºmeros existem, mas dependem de consolidaÃ§Ã£o manual â€” chegam tarde e com divergÃªncia entre Ã¡reas.",
      high: "Existe visibilidade em tempo real. O passo seguinte Ã© anÃ¡lise preditiva e alertas automÃ¡ticos por desvio.",
    },
    actions: [
      "Definir os indicadores que realmente importam",
      "Criar fonte Ãºnica de verdade entre Marketing e Comercial",
      "Montar dashboard em tempo real para a lideranÃ§a",
    ],
    modules: ["dashboards", "integracoes", "ia"],
  },
  {
    id: "processos",
    name: "Processos & AutomaÃ§Ã£o",
    short: "Processos",
    icon: Workflow,
    diagnosis: {
      low: "A operaÃ§Ã£o depende de pessoas lembrando de fazer. Qualquer crescimento multiplica o retrabalho.",
      mid: "HÃ¡ processos definidos, mas boa parte da execuÃ§Ã£o ainda Ã© manual e sujeita a falha humana.",
      high: "Os processos estÃ£o documentados e automatizados. A evoluÃ§Ã£o natural Ã© aplicar IA Ã s etapas de decisÃ£o.",
    },
    actions: [
      "Documentar os processos crÃ­ticos da operaÃ§Ã£o",
      "Automatizar as tarefas repetitivas de maior volume",
      "Aplicar IA em triagem, resumo e priorizaÃ§Ã£o",
    ],
    modules: ["automacoes", "ia", "integracoes"],
  },
];

export const PILLAR_MAP = Object.fromEntries(
  PILLARS.map((p) => [p.id, p]),
) as Record<PillarId, Pillar>;

/* ------------------------------------------------------------------ */
/* Questions â€” 18 total, 3 per pillar                                  */
/* ------------------------------------------------------------------ */
export const QUESTIONS: Question[] = [
  /* ---------------- Marketing ---------------- */
  {
    id: "mk1",
    pillar: "marketing",
    text: "Como os clientes chegam atÃ© a sua empresa hoje?",
    options: [
      { label: "IndicaÃ§Ã£o e contatos pessoais, sem previsibilidade", score: 0 },
      { label: "AnÃºncios pontuais, sem constÃ¢ncia", score: 1 },
      { label: "Campanhas ativas, mas sem medir a origem com precisÃ£o", score: 2 },
      { label: "Canais estruturados e origem rastreada em todo o funil", score: 3 },
    ],
  },
  {
    id: "mk2",
    pillar: "marketing",
    text: "VocÃª sabe quanto custa adquirir um cliente por canal?",
    options: [
      { label: "NÃ£o temos essa informaÃ§Ã£o", score: 0 },
      { label: "Estimamos de forma manual, por aproximaÃ§Ã£o", score: 1 },
      { label: "Sabemos, mas com atraso e via planilhas", score: 2 },
      { label: "Sim, atualizado por canal em tempo real", score: 3 },
    ],
  },
  {
    id: "mk3",
    pillar: "marketing",
    text: "O que acontece quando um lead preenche um formulÃ¡rio?",
    options: [
      { label: "Chega por e-mail/WhatsApp e alguÃ©m vÃª quando pode", score: 0 },
      { label: "AlguÃ©m copia manualmente para uma planilha", score: 1 },
      { label: "Vai para o CRM, mas sem regra de distribuiÃ§Ã£o", score: 2 },
      { label: "Entra no CRM, Ã© distribuÃ­do e notificado automaticamente", score: 3 },
    ],
  },

  /* ---------------- Comercial ---------------- */
  {
    id: "cm1",
    pillar: "comercial",
    text: "Como o time comercial registra as negociaÃ§Ãµes?",
    options: [
      { label: "Na memÃ³ria e no WhatsApp pessoal", score: 0 },
      { label: "Planilhas individuais de cada vendedor", score: 1 },
      { label: "CRM, mas com preenchimento inconsistente", score: 2 },
      { label: "CRM padronizado, com funil e etapas claras", score: 3 },
    ],
  },
  {
    id: "cm2",
    pillar: "comercial",
    text: "Existe um processo de follow-up definido?",
    options: [
      { label: "NÃ£o, cada vendedor faz do seu jeito", score: 0 },
      { label: "Existe no discurso, mas nÃ£o Ã© seguido", score: 1 },
      { label: "Existe cadÃªncia definida, executada manualmente", score: 2 },
      { label: "CadÃªncia definida e automatizada com lembretes", score: 3 },
    ],
  },
  {
    id: "cm3",
    pillar: "comercial",
    text: "VocÃª consegue prever a receita dos prÃ³ximos 30 dias?",
    options: [
      { label: "NÃ£o conseguimos prever", score: 0 },
      { label: "Por intuiÃ§Ã£o e experiÃªncia", score: 1 },
      { label: "Com planilha consolidada manualmente", score: 2 },
      { label: "Sim, com forecast do funil em tempo real", score: 3 },
    ],
  },

  /* ---------------- Atendimento ---------------- */
  {
    id: "at1",
    pillar: "atendimento",
    text: "Como o WhatsApp Ã© utilizado na operaÃ§Ã£o?",
    options: [
      { label: "NÃºmeros pessoais, sem histÃ³rico centralizado", score: 0 },
      { label: "Um nÃºmero compartilhado em um Ãºnico aparelho", score: 1 },
      { label: "Plataforma multiatendimento, sem integraÃ§Ã£o com o CRM", score: 2 },
      { label: "Integrado ao CRM, com histÃ³rico e automaÃ§Ãµes", score: 3 },
    ],
  },
  {
    id: "at2",
    pillar: "atendimento",
    text: "Qual o tempo mÃ©dio de primeira resposta a um novo lead?",
    options: [
      { label: "Mais de 24 horas â€” ou nÃ£o sabemos medir", score: 0 },
      { label: "Algumas horas", score: 1 },
      { label: "Menos de 1 hora no horÃ¡rio comercial", score: 2 },
      { label: "Resposta imediata, inclusive fora do horÃ¡rio", score: 3 },
    ],
  },
  {
    id: "at3",
    pillar: "atendimento",
    text: "O histÃ³rico do cliente fica acessÃ­vel para toda a equipe?",
    options: [
      { label: "NÃ£o, cada pessoa tem o seu histÃ³rico", score: 0 },
      { label: "Parcialmente, em conversas espalhadas", score: 1 },
      { label: "Na maior parte, dentro de uma ferramenta", score: 2 },
      { label: "Sim, tudo centralizado e consultÃ¡vel", score: 3 },
    ],
  },

  /* ---------------- Ferramentas ---------------- */
  {
    id: "fr1",
    pillar: "ferramentas",
    text: "Quantas ferramentas a operaÃ§Ã£o usa hoje?",
    options: [
      { label: "NÃ£o sabemos ao certo", score: 0 },
      { label: "Muitas, com funÃ§Ãµes sobrepostas", score: 1 },
      { label: "Algumas, porÃ©m pouco integradas", score: 2 },
      { label: "Stack enxuta, cada uma com funÃ§Ã£o clara", score: 3 },
    ],
  },
  {
    id: "fr2",
    pillar: "ferramentas",
    text: "Suas ferramentas conversam entre si?",
    options: [
      { label: "Nenhuma integraÃ§Ã£o", score: 0 },
      { label: "Uma ou outra, via exportar e importar", score: 1 },
      { label: "IntegraÃ§Ãµes parciais entre as principais", score: 2 },
      { label: "Ecossistema integrado ponta a ponta", score: 3 },
    ],
  },
  {
    id: "fr3",
    pillar: "ferramentas",
    text: "AlguÃ©m precisa digitar a mesma informaÃ§Ã£o em mais de um lugar?",
    options: [
      { label: "Sim, o tempo todo", score: 0 },
      { label: "Com frequÃªncia", score: 1 },
      { label: "Em alguns momentos", score: 2 },
      { label: "Praticamente nunca", score: 3 },
    ],
  },

  /* ---------------- Dados ---------------- */
  {
    id: "dd1",
    pillar: "dados",
    text: "Como a lideranÃ§a acompanha os nÃºmeros da operaÃ§Ã£o?",
    options: [
      { label: "NÃ£o hÃ¡ acompanhamento formal", score: 0 },
      { label: "RelatÃ³rios pedidos sob demanda", score: 1 },
      { label: "Planilha atualizada semanal ou mensalmente", score: 2 },
      { label: "Dashboard em tempo real", score: 3 },
    ],
  },
  {
    id: "dd2",
    pillar: "dados",
    text: "Marketing e Comercial olham para os mesmos indicadores?",
    options: [
      { label: "NÃ£o, cada Ã¡rea tem a sua versÃ£o dos nÃºmeros", score: 0 },
      { label: "Parcialmente, com divergÃªncias frequentes", score: 1 },
      { label: "Sim, mas consolidado manualmente", score: 2 },
      { label: "Sim, com fonte Ãºnica de verdade", score: 3 },
    ],
  },
  {
    id: "dd3",
    pillar: "dados",
    text: "Quanto tempo leva para montar um relatÃ³rio gerencial?",
    options: [
      { label: "Dias â€” ou simplesmente nÃ£o conseguimos", score: 0 },
      { label: "Muitas horas de trabalho manual", score: 1 },
      { label: "Algumas horas", score: 2 },
      { label: "Segundos, Ã© automÃ¡tico", score: 3 },
    ],
  },

  /* ---------------- Processos ---------------- */
  {
    id: "pr1",
    pillar: "processos",
    text: "Os processos da operaÃ§Ã£o estÃ£o documentados?",
    options: [
      { label: "NÃ£o estÃ£o documentados", score: 0 },
      { label: "Parcialmente, em documentos desatualizados", score: 1 },
      { label: "Documentados, mas pouco seguidos na prÃ¡tica", score: 2 },
      { label: "Documentados, seguidos e revisados", score: 3 },
    ],
  },
  {
    id: "pr2",
    pillar: "processos",
    text: "Quanto da operaÃ§Ã£o depende de tarefas manuais repetitivas?",
    options: [
      { label: "Praticamente tudo", score: 0 },
      { label: "Boa parte do dia a dia", score: 1 },
      { label: "Algumas etapas especÃ­ficas", score: 2 },
      { label: "Pouco â€” o essencial jÃ¡ Ã© automatizado", score: 3 },
    ],
  },
  {
    id: "pr3",
    pillar: "processos",
    text: "A empresa jÃ¡ utiliza IA em algum processo?",
    options: [
      { label: "NÃ£o, nunca testamos", score: 0 },
      { label: "Uso individual e informal", score: 1 },
      { label: "Testes pontuais em algumas Ã¡reas", score: 2 },
      { label: "IA aplicada a processos, com resultado medido", score: 3 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Maturity levels                                                     */
/* ------------------------------------------------------------------ */
export type Level = {
  key: string;
  name: string;
  range: [number, number];
  headline: string;
  desc: string;
};

export const LEVELS: Level[] = [
  {
    key: "fragmentada",
    name: "OperaÃ§Ã£o Fragmentada",
    range: [0, 20],
    headline: "Sua operaÃ§Ã£o depende de pessoas, nÃ£o de processos.",
    desc: "As informaÃ§Ãµes estÃ£o espalhadas e cada Ã¡rea trabalha de forma isolada. Existe um ganho imediato e relevante ao estruturar a base da operaÃ§Ã£o.",
  },
  {
    key: "manual",
    name: "OperaÃ§Ã£o Manual",
    range: [21, 40],
    headline: "Existe processo, mas ele roda no esforÃ§o das pessoas.",
    desc: "A empresa jÃ¡ sabe o que precisa ser feito, porÃ©m a execuÃ§Ã£o Ã© manual. O crescimento hoje custa mais horas â€” e nÃ£o mais resultado.",
  },
  {
    key: "estruturada",
    name: "OperaÃ§Ã£o Estruturada",
    range: [41, 60],
    headline: "A base existe. Falta conectar as pontas.",
    desc: "HÃ¡ ferramentas e rotinas definidas, mas elas nÃ£o conversam entre si. O maior ganho estÃ¡ em integraÃ§Ã£o e eliminaÃ§Ã£o de retrabalho.",
  },
  {
    key: "integrada",
    name: "OperaÃ§Ã£o Integrada",
    range: [61, 80],
    headline: "Sua operaÃ§Ã£o jÃ¡ funciona como um sistema.",
    desc: "Processos e ferramentas estÃ£o conectados e os dados circulam. A evoluÃ§Ã£o agora Ã© de eficiÃªncia, automaÃ§Ã£o avanÃ§ada e inteligÃªncia.",
  },
  {
    key: "inteligente",
    name: "OperaÃ§Ã£o Inteligente",
    range: [81, 100],
    headline: "OperaÃ§Ã£o madura, pronta para escalar.",
    desc: "A empresa opera com dados em tempo real e automaÃ§Ãµes consolidadas. O foco passa a ser previsibilidade, IA aplicada e escala.",
  },
];

/* ------------------------------------------------------------------ */
/* Lead form select options                                            */
/* ------------------------------------------------------------------ */
export const SEGMENTOS = [
  "ServiÃ§os B2B",
  "IndÃºstria",
  "ComÃ©rcio / Varejo",
  "SaÃºde",
  "EducaÃ§Ã£o",
  "ImobiliÃ¡rio",
  "Tecnologia / SaaS",
  "Outro",
];

export const PORTES = [
  "1 a 9 colaboradores",
  "10 a 49 colaboradores",
  "50 a 199 colaboradores",
  "200+ colaboradores",
];
