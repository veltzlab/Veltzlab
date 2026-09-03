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
  multiple?: boolean;
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
    desc: "Funil padronizado, histórico único e previsibilidade de receita.",
  },
  automacoes: {
    name: "Automações",
    icon: Zap,
    desc: "Elimina tarefas repetitivas e garante que nada seja esquecido.",
  },
  integracoes: {
    name: "Integrações",
    icon: Cable,
    desc: "Conecta ferramentas para o dado circular sem digitação manual.",
  },
  dashboards: {
    name: "Dashboards",
    icon: LayoutDashboard,
    desc: "Indicadores em tempo real com fonte única de verdade.",
  },
  ia: {
    name: "IA Aplicada",
    icon: Sparkles,
    desc: "Triagem, respostas e análises inteligentes dentro do processo.",
  },
  landing: {
    name: "Sites & Landing Pages",
    icon: LayoutTemplate,
    desc: "Captação estruturada com rastreio de origem ponta a ponta.",
  },
};

/* ------------------------------------------------------------------ */
/* Pillars                                                             */
/* ------------------------------------------------------------------ */
export const PILLARS: Pillar[] = [
  {
    id: "marketing",
    name: "Marketing & Aquisição",
    short: "Marketing",
    icon: Megaphone,
    diagnosis: {
      low: "A aquisição depende de esforço pontual e não é rastreável. Você investe sem saber o que realmente traz cliente.",
      mid: "Existem canais ativos, mas a origem do lead se perde no caminho — o que dificulta decidir onde investir mais.",
      high: "A aquisição é estruturada e rastreada. O próximo passo é otimizar investimento por canal com dados de receita.",
    },
    actions: [
      "Implantar rastreio de origem (UTM) do anúncio até a venda",
      "Criar entrada única de leads com distribuição automática",
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
      low: "O comercial opera na memória e em planilhas individuais. O conhecimento sai da empresa junto com o vendedor.",
      mid: "Existe um CRM ou processo, mas o preenchimento é inconsistente — o funil não reflete a realidade.",
      high: "O funil é padronizado e confiável. O foco agora é aumentar conversão por etapa e reduzir ciclo de venda.",
    },
    actions: [
      "Padronizar funil, etapas e critérios de passagem",
      "Automatizar cadência de follow-up e lembretes",
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
      low: "O atendimento acontece em números pessoais e conversas soltas. Não há histórico nem controle de resposta.",
      mid: "Há uma ferramenta de atendimento, mas ela não conversa com o comercial — o contexto se perde na passagem.",
      high: "O atendimento é centralizado e integrado. Vale evoluir para triagem e respostas assistidas por IA.",
    },
    actions: [
      "Centralizar o WhatsApp com histórico compartilhado",
      "Integrar atendimento ao CRM para contexto completo",
      "Definir SLA de primeira resposta com alertas automáticos",
    ],
    modules: ["crm", "automacoes", "ia"],
  },
  {
    id: "ferramentas",
    name: "Ferramentas & Integrações",
    short: "Ferramentas",
    icon: Wrench,
    diagnosis: {
      low: "A operação acumula ferramentas desconectadas, com funções sobrepostas e custo maior do que o necessário.",
      mid: "As principais ferramentas existem, mas as integrações são parciais — ainda há digitação em duplicidade.",
      high: "O ecossistema está conectado. O ganho agora vem de enxugar custos e refinar os fluxos entre sistemas.",
    },
    actions: [
      "Mapear stack atual e eliminar ferramentas redundantes",
      "Integrar sistemas críticos ponta a ponta",
      "Remover pontos de digitação manual duplicada",
    ],
    modules: ["integracoes", "automacoes"],
  },
  {
    id: "dados",
    name: "Dados & Indicadores",
    short: "Dados",
    icon: BarChart3,
    diagnosis: {
      low: "As decisões são tomadas por percepção. Não existe número confiável e acessível para orientar a operação.",
      mid: "Os números existem, mas dependem de consolidação manual — chegam tarde e com divergência entre áreas.",
      high: "Existe visibilidade em tempo real. O passo seguinte é análise preditiva e alertas automáticos por desvio.",
    },
    actions: [
      "Definir os indicadores que realmente importam",
      "Criar fonte única de verdade entre Marketing e Comercial",
      "Montar dashboard em tempo real para a liderança",
    ],
    modules: ["dashboards", "integracoes", "ia"],
  },
  {
    id: "processos",
    name: "Processos & Automação",
    short: "Processos",
    icon: Workflow,
    diagnosis: {
      low: "A operação depende de pessoas lembrando de fazer. Qualquer crescimento multiplica o retrabalho.",
      mid: "Há processos definidos, mas boa parte da execução ainda é manual e sujeita a falha humana.",
      high: "Os processos estão documentados e automatizados. A evolução natural é aplicar IA às etapas de decisão.",
    },
    actions: [
      "Documentar os processos críticos da operação",
      "Automatizar as tarefas repetitivas de maior volume",
      "Aplicar IA em triagem, resumo e priorização",
    ],
    modules: ["automacoes", "ia", "integracoes"],
  },
];

export const PILLAR_MAP = Object.fromEntries(
  PILLARS.map((p) => [p.id, p]),
) as Record<PillarId, Pillar>;

/* ------------------------------------------------------------------ */
/* Questions — 18 total, 3 per pillar                                  */
/* ------------------------------------------------------------------ */
export const QUESTIONS: Question[] = [
  /* ---------------- Marketing ---------------- */
  {
    id: "mk1",
    pillar: "marketing",
    text: "Quais canais geram oportunidades para a sua empresa hoje?",
    multiple: true,
    options: [
      { label: "Indicação e contatos pessoais", score: 0 },
      { label: "Google e busca orgânica", score: 0 },
      { label: "Redes sociais", score: 0 },
      { label: "Anúncios pagos", score: 0 },
      { label: "Eventos e parcerias", score: 0 },
      { label: "Prospecção ativa (outbound)", score: 0 },
    ],
  },
  {
    id: "mk2",
    pillar: "marketing",
    text: "Você sabe quanto custa adquirir um cliente por canal?",
    options: [
      { label: "Não temos essa informação", score: 0 },
      { label: "Estimamos de forma manual, por aproximação", score: 1 },
      { label: "Sabemos, mas com atraso e via planilhas", score: 2 },
      { label: "Sim, atualizado por canal em tempo real", score: 3 },
    ],
  },
  {
    id: "mk3",
    pillar: "marketing",
    text: "O que acontece quando um lead preenche um formulário?",
    options: [
      { label: "Chega por e-mail/WhatsApp e alguém vê quando pode", score: 0 },
      { label: "Alguém copia manualmente para uma planilha", score: 1 },
      { label: "Vai para o CRM, mas sem regra de distribuição", score: 2 },
      { label: "Entra no CRM, é distribuído e notificado automaticamente", score: 3 },
    ],
  },

  /* ---------------- Comercial ---------------- */
  {
    id: "cm1",
    pillar: "comercial",
    text: "Como o time comercial registra as negociações?",
    options: [
      { label: "Na memória e no WhatsApp pessoal", score: 0 },
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
      { label: "Não, cada vendedor faz do seu jeito", score: 0 },
      { label: "Existe no discurso, mas não é seguido", score: 1 },
      { label: "Existe cadência definida, executada manualmente", score: 2 },
      { label: "Cadência definida e automatizada com lembretes", score: 3 },
    ],
  },
  {
    id: "cm3",
    pillar: "comercial",
    text: "Você consegue prever a receita dos próximos 30 dias?",
    options: [
      { label: "Não conseguimos prever", score: 0 },
      { label: "Por intuição e experiência", score: 1 },
      { label: "Com planilha consolidada manualmente", score: 2 },
      { label: "Sim, com forecast do funil em tempo real", score: 3 },
    ],
  },

  /* ---------------- Atendimento ---------------- */
  {
    id: "at1",
    pillar: "atendimento",
    text: "Como o WhatsApp é utilizado na operação?",
    options: [
      { label: "Números pessoais, sem histórico centralizado", score: 0 },
      { label: "Um número compartilhado em um único aparelho", score: 1 },
      { label: "Plataforma multiatendimento, sem integração com o CRM", score: 2 },
      { label: "Integrado ao CRM, com histórico e automações", score: 3 },
    ],
  },
  {
    id: "at2",
    pillar: "atendimento",
    text: "Qual o tempo médio de primeira resposta a um novo lead?",
    options: [
      { label: "Mais de 24 horas — ou não sabemos medir", score: 0 },
      { label: "Algumas horas", score: 1 },
      { label: "Menos de 1 hora no horário comercial", score: 2 },
      { label: "Resposta imediata, inclusive fora do horário", score: 3 },
    ],
  },
  {
    id: "at3",
    pillar: "atendimento",
    text: "O histórico do cliente fica acessível para toda a equipe?",
    options: [
      { label: "Não, cada pessoa tem o seu histórico", score: 0 },
      { label: "Parcialmente, em conversas espalhadas", score: 1 },
      { label: "Na maior parte, dentro de uma ferramenta", score: 2 },
      { label: "Sim, tudo centralizado e consultável", score: 3 },
    ],
  },

  /* ---------------- Ferramentas ---------------- */
  {
    id: "fr1",
    pillar: "ferramentas",
    text: "Quantas ferramentas a operação usa hoje?",
    options: [
      { label: "Não sabemos ao certo", score: 0 },
      { label: "Muitas, com funções sobrepostas", score: 1 },
      { label: "Algumas, porém pouco integradas", score: 2 },
      { label: "Stack enxuta, cada uma com função clara", score: 3 },
    ],
  },
  {
    id: "fr2",
    pillar: "ferramentas",
    text: "Suas ferramentas conversam entre si?",
    options: [
      { label: "Nenhuma integração", score: 0 },
      { label: "Uma ou outra, via exportar e importar", score: 1 },
      { label: "Integrações parciais entre as principais", score: 2 },
      { label: "Ecossistema integrado ponta a ponta", score: 3 },
    ],
  },
  {
    id: "fr3",
    pillar: "ferramentas",
    text: "Alguém precisa digitar a mesma informação em mais de um lugar?",
    options: [
      { label: "Sim, o tempo todo", score: 0 },
      { label: "Com frequência", score: 1 },
      { label: "Em alguns momentos", score: 2 },
      { label: "Praticamente nunca", score: 3 },
    ],
  },

  /* ---------------- Dados ---------------- */
  {
    id: "dd1",
    pillar: "dados",
    text: "Como a liderança acompanha os números da operação?",
    options: [
      { label: "Não há acompanhamento formal", score: 0 },
      { label: "Relatórios pedidos sob demanda", score: 1 },
      { label: "Planilha atualizada semanal ou mensalmente", score: 2 },
      { label: "Dashboard em tempo real", score: 3 },
    ],
  },
  {
    id: "dd2",
    pillar: "dados",
    text: "Marketing e Comercial olham para os mesmos indicadores?",
    options: [
      { label: "Não, cada área tem a sua versão dos números", score: 0 },
      { label: "Parcialmente, com divergências frequentes", score: 1 },
      { label: "Sim, mas consolidado manualmente", score: 2 },
      { label: "Sim, com fonte única de verdade", score: 3 },
    ],
  },
  {
    id: "dd3",
    pillar: "dados",
    text: "Quanto tempo leva para montar um relatório gerencial?",
    options: [
      { label: "Dias — ou simplesmente não conseguimos", score: 0 },
      { label: "Muitas horas de trabalho manual", score: 1 },
      { label: "Algumas horas", score: 2 },
      { label: "Segundos, é automático", score: 3 },
    ],
  },

  /* ---------------- Processos ---------------- */
  {
    id: "pr1",
    pillar: "processos",
    text: "Os processos da operação estão documentados?",
    options: [
      { label: "Não estão documentados", score: 0 },
      { label: "Parcialmente, em documentos desatualizados", score: 1 },
      { label: "Documentados, mas pouco seguidos na prática", score: 2 },
      { label: "Documentados, seguidos e revisados", score: 3 },
    ],
  },
  {
    id: "pr2",
    pillar: "processos",
    text: "Quanto da operação depende de tarefas manuais repetitivas?",
    options: [
      { label: "Praticamente tudo", score: 0 },
      { label: "Boa parte do dia a dia", score: 1 },
      { label: "Algumas etapas específicas", score: 2 },
      { label: "Pouco — o essencial já é automatizado", score: 3 },
    ],
  },
  {
    id: "pr3",
    pillar: "processos",
    text: "A empresa já utiliza IA em algum processo?",
    options: [
      { label: "Não, nunca testamos", score: 0 },
      { label: "Uso individual e informal", score: 1 },
      { label: "Testes pontuais em algumas áreas", score: 2 },
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
    name: "Operação Fragmentada",
    range: [0, 20],
    headline: "Sua operação depende de pessoas, não de processos.",
    desc: "As informações estão espalhadas e cada área trabalha de forma isolada. Existe um ganho imediato e relevante ao estruturar a base da operação.",
  },
  {
    key: "manual",
    name: "Operação Manual",
    range: [21, 40],
    headline: "Existe processo, mas ele roda no esforço das pessoas.",
    desc: "A empresa já sabe o que precisa ser feito, porém a execução é manual. O crescimento hoje custa mais horas — e não mais resultado.",
  },
  {
    key: "estruturada",
    name: "Operação Estruturada",
    range: [41, 60],
    headline: "A base existe. Falta conectar as pontas.",
    desc: "Há ferramentas e rotinas definidas, mas elas não conversam entre si. O maior ganho está em integração e eliminação de retrabalho.",
  },
  {
    key: "integrada",
    name: "Operação Integrada",
    range: [61, 80],
    headline: "Sua operação já funciona como um sistema.",
    desc: "Processos e ferramentas estão conectados e os dados circulam. A evolução agora é de eficiência, automação avançada e inteligência.",
  },
  {
    key: "inteligente",
    name: "Operação Inteligente",
    range: [81, 100],
    headline: "Operação madura, pronta para escalar.",
    desc: "A empresa opera com dados em tempo real e automações consolidadas. O foco passa a ser previsibilidade, IA aplicada e escala.",
  },
];

/* ------------------------------------------------------------------ */
/* Lead form select options                                            */
/* ------------------------------------------------------------------ */
export const SEGMENTOS = [
  "Serviços B2B",
  "Indústria",
  "Comércio / Varejo",
  "Saúde",
  "Educação",
  "Imobiliário",
  "Tecnologia / SaaS",
  "Outro",
];

export const PORTES = [
  "1 a 9 colaboradores",
  "10 a 49 colaboradores",
  "50 a 199 colaboradores",
  "200+ colaboradores",
];
