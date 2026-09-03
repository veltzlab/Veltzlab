import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  QUESTIONS,
  PILLAR_MAP,
  PILLARS,
  SEGMENTOS,
  PORTES,
} from "./data";
import { computeResult, type Answers } from "./scoring";
import Results from "./Results";
import {
  SceneBackground,
  VeltzLogo,
  EASE,
  fadeUp,
  stagger,
} from "./primitives";

export type Lead = {
  nome: string;
  empresa: string;
  email: string;
  ddi: string;
  whatsapp: string;
  segmento: string;
  porte: string;
  canais: string[];
  ferramentas: string[];
  prioridades: string[];
};

type Phase = "intro" | "quiz" | "lead" | "results";

const STORAGE_KEY = "veltz-os-diagnostico-v2";

const emptyLead: Lead = {
  nome: "",
  empresa: "",
  email: "",
  ddi: "+55",
  whatsapp: "",
  segmento: "",
  porte: "",
  canais: [],
  ferramentas: [],
  prioridades: [],
};

const CANAIS = ["Indicação", "Google", "Redes sociais", "Anúncios pagos", "Eventos / parcerias", "Outbound", "Outro"];
const FERRAMENTAS = ["WhatsApp", "Planilhas", "CRM", "Automação", "Dashboard / BI", "ERP", "Outro"];
const PRIORIDADES = ["Gerar mais oportunidades", "Organizar atendimento", "Aumentar conversão", "Automatizar tarefas", "Integrar ferramentas", "Ter visibilidade dos dados"];

export default function DiagnosticApp({
  onBackToDeck,
}: {
  onBackToDeck: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<Partial<Record<keyof Lead, string>>>({});

  /* ---------------- persistence ---------------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.answers) setAnswers(saved.answers);
        if (saved.lead) setLead({ ...emptyLead, ...saved.lead });
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, lead }));
    } catch {
      /* ignore */
    }
  }, [answers, lead]);

  const question = QUESTIONS[qIndex];
  const pillar = question ? PILLAR_MAP[question.pillar] : null;
  const currentQuestionAnswer = question ? answers[question.id] : undefined;
  const selectedMultipleAnswers: string[] = Array.isArray(currentQuestionAnswer)
    ? currentQuestionAnswer
    : [];
  const progress = (qIndex / QUESTIONS.length) * 100;
  const result = useMemo(() => computeResult(answers), [answers]);

  /* ---------------- navigation ---------------- */
  const goToNextQuestion = useCallback(() => {
    setDir(1);
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex((index) => index + 1);
    } else {
      setPhase("lead");
    }
  }, [qIndex]);

  const answer = useCallback(
    (score: number) => {
      setAnswers((prev) => ({ ...prev, [question.id]: score }));
      window.setTimeout(goToNextQuestion, 260);
    },
    [goToNextQuestion, question],
  );

  const toggleMultipleAnswer = useCallback(
    (label: string) => {
      setAnswers((prev) => {
        const currentAnswer = prev[question.id];
        const selected: string[] = Array.isArray(currentAnswer) ? currentAnswer : [];
        return {
          ...prev,
          [question.id]: selected.includes(label)
            ? selected.filter((item) => item !== label)
            : [...selected, label],
        };
      });
    },
    [question],
  );

  const continueMultipleAnswer = useCallback(() => {
    if (selectedMultipleAnswers.length > 0) goToNextQuestion();
  }, [goToNextQuestion, selectedMultipleAnswers]);

  const back = useCallback(() => {
    setDir(-1);
    if (qIndex > 0) setQIndex((i) => i - 1);
    else setPhase("intro");
  }, [qIndex]);

  /* keyboard shortcuts during quiz */
  useEffect(() => {
    if (phase !== "quiz" || !question) return;
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= question.options.length) {
        if (question.multiple) toggleMultipleAnswer(question.options[n - 1].label);
        else answer(question.options[n - 1].score);
      } else if (question.multiple && e.key === "Enter") {
        continueMultipleAnswer();
      } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, question, answer, back, continueMultipleAnswer, toggleMultipleAnswer]);

  const restart = () => {
    setAnswers({});
    setQIndex(0);
    setPhase("intro");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const sendDiagnosticToSheet = async () => {
    const webhookUrl =
      import.meta.env.VITE_DIAGNOSTIC_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbxpakjEvlhiAmLki3Qf8EzuOg50LnggTVl_uXuTih5tFz_8fV54MAaMJcfS3w0QRyN7/exec";
    if (!webhookUrl) return;

    const pillars = Object.fromEntries(
      result.pillars.map(({ pillar: item, score }) => [item.id, score]),
    );
    const payload = {
      submittedAt: new Date().toISOString(),
      lead: {
        ...lead,
        // O apóstrofo garante que o Google Sheets trate o DDI (+55) como texto.
        whatsapp: lead.whatsapp.trim()
          ? `'${`${lead.ddi.trim()} ${lead.whatsapp.trim()}`.trim()}`
          : "",
      },
      answers,
      result: {
        overall: result.overall,
        level: result.level.name,
        pillars,
        modules: result.modules,
        priorities: result.priorities.map(({ pillar: item }) => item.name),
        strengths: result.strengths.map(({ pillar: item }) => item.name),
        impact: result.impact,
      },
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
    } catch {
      // O resultado continua disponível mesmo se o registro externo falhar.
    }
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Lead, string>> = {};
    if (!lead.nome.trim()) next.nome = "Informe seu nome";
    if (!lead.empresa.trim()) next.empresa = "Informe a empresa";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))
      next.email = "Informe um e-mail válido";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      void sendDiagnosticToSheet();
      setPhase("results");
    }
  };

  const field = <K extends keyof Lead>(k: K, v: Lead[K]) => {
    setLead((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  /* ---------------- render ---------------- */
  return (
    <div className="diagnostic-page relative h-[100dvh] w-full overflow-y-auto bg-ink">
      <div className="fixed inset-0 print:hidden">
        <SceneBackground />
      </div>

      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-ink/70 backdrop-blur-xl print:hidden">
        {phase === "quiz" && (
          <motion.div
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-soft to-brand"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        )}
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-8">
          <button
            onClick={onBackToDeck}
            className="flex items-center gap-2.5"
            aria-label="Voltar à apresentação"
          >
            <VeltzLogo className="h-7 w-auto" />
          </button>
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
            Diagnóstico
          </span>
        </div>
      </header>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {/* ============ INTRO ============ */}
          {phase === "intro" && (
            <motion.section
              key="intro"
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-3xl flex-col justify-center px-5 py-16 md:px-8"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 self-start rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-brand"
              >
                <Sparkles className="h-3 w-3" />
                Etapa 01 · Alinhar
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="mt-7 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
              >
                Diagnóstico de{" "}
                <span className="text-brand-gradient">
                  Maturidade Operacional
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
              >
                Responda 18 perguntas sobre como sua empresa opera hoje. Ao
                final você recebe um retrato completo da sua operação, as
                prioridades de maior impacto e a arquitetura recomendada.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 grid gap-3 sm:grid-cols-3"
              >
                {[
                  { icon: Clock, t: "4 minutos", s: "Tempo médio" },
                  { icon: ListChecks, t: "18 perguntas", s: "6 pilares" },
                  { icon: ShieldCheck, t: "Sem compromisso", s: "Gratuito" },
                ].map((i) => {
                  const Icon = i.icon;
                  return (
                    <div key={i.t} className="glass-card rounded-2xl p-5">
                      <Icon className="h-4 w-4 text-brand" />
                      <p className="mt-3 text-sm font-semibold text-white">
                        {i.t}
                      </p>
                      <p className="text-xs text-muted">{i.s}</p>
                    </div>
                  );
                })}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted/70">
                  Pilares avaliados
                </p>
                <div className="flex flex-wrap gap-2">
                  {PILLARS.map((p) => (
                    <span
                      key={p.id}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-300"
                    >
                      <p.icon className="h-3.5 w-3.5 text-brand/80" />
                      {p.short}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10">
                <button
                  onClick={() => {
                    setDir(1);
                    setPhase("quiz");
                  }}
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-soft to-brand px-8 py-4 text-base font-semibold text-ink glow-brand transition-transform hover:scale-[1.03]"
                >
                  Iniciar Diagnóstico
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                {Object.keys(answers).length > 0 && (
                  <button
                    onClick={() => {
                      setPhase("quiz");
                      const firstUnanswered = QUESTIONS.findIndex(
                        (q) => answers[q.id] === undefined,
                      );
                      setQIndex(
                        firstUnanswered === -1 ? 0 : firstUnanswered,
                      );
                    }}
                    className="ml-4 text-sm text-muted underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    Continuar de onde parei
                  </button>
                )}
              </motion.div>
            </motion.section>
          )}

          {/* ============ QUIZ ============ */}
          {phase === "quiz" && question && pillar && (
            <motion.section
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-3xl flex-col justify-center px-5 py-16 md:px-8"
            >
              {/* meta */}
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300">
                  <pillar.icon className="h-3.5 w-3.5 text-brand" />
                  {pillar.short}
                </span>
                <span className="font-display text-sm text-muted">
                  <span className="text-white">
                    {String(qIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted/50"> / </span>
                  {QUESTIONS.length}
                </span>
              </div>

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: dir > 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir > 0 ? -40 : 40 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                    {question.text}
                  </h2>

                  {question.multiple && (
                    <p className="mt-3 text-sm text-muted">
                      Selecione todas as opções que se aplicam à sua operação.
                    </p>
                  )}

                  <div className="mt-8 space-y-2.5">
                    {question.options.map((opt, i) => {
                      const selected = question.multiple
                        ? selectedMultipleAnswers.includes(opt.label)
                        : answers[question.id] === opt.score;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => question.multiple ? toggleMultipleAnswer(opt.label) : answer(opt.score)}
                          className={`group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                            selected
                              ? "border-brand bg-brand/10"
                              : "border-white/8 bg-white/[0.02] hover:border-brand/40 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span
                            className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg border text-xs font-semibold transition-colors ${
                              selected
                                ? "border-brand bg-brand text-ink"
                                : "border-white/15 text-muted group-hover:border-brand/50 group-hover:text-brand"
                            }`}
                          >
                            {selected ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              i + 1
                            )}
                          </span>
                          <span
                            className={`text-sm leading-relaxed sm:text-base ${
                              selected ? "text-white" : "text-zinc-300"
                            }`}
                          >
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {question.multiple && (
                    <button
                      type="button"
                      onClick={continueMultipleAnswer}
                      disabled={selectedMultipleAnswers.length === 0}
                      className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-brand-soft to-brand px-6 py-4 text-base font-semibold text-ink transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continuar
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={back}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </button>
                <span className="hidden text-[11px] text-muted/60 sm:block">
                  Dica: use as teclas 1–4 para responder
                </span>
              </div>
            </motion.section>
          )}

          {/* ============ LEAD ============ */}
          {phase === "lead" && (
            <motion.section
              key="lead"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-2xl flex-col justify-center px-5 py-16 md:px-8"
            >
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-emerald-300">
                <Check className="h-3 w-3" />
                Respostas concluídas
              </span>

              <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Seu diagnóstico está pronto.
              </h2>
              <p className="mt-3 text-base text-muted">
                Preencha os dados para visualizar o resultado completo e receber
                uma cópia da análise.
              </p>

              <form onSubmit={submitLead} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Nome"
                    value={lead.nome}
                    onChange={(v) => field("nome", v)}
                    error={errors.nome}
                    placeholder="Seu nome"
                  />
                  <Input
                    label="Empresa"
                    value={lead.empresa}
                    onChange={(v) => field("empresa", v)}
                    error={errors.empresa}
                    placeholder="Nome da empresa"
                  />
                  <Input
                    label="E-mail corporativo"
                    type="email"
                    value={lead.email}
                    onChange={(v) => field("email", v)}
                    error={errors.email}
                    placeholder="voce@empresa.com.br"
                  />
                  <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-2">
                    <Input
                      label="DDI"
                      value={lead.ddi}
                      onChange={(v) => field("ddi", v)}
                      placeholder="+55"
                    />
                    <Input
                      label="WhatsApp"
                      value={lead.whatsapp}
                      onChange={(v) => field("whatsapp", v)}
                      placeholder="(00) 00000-0000"
                      optional
                    />
                  </div>
                  <Select
                    label="Segmento"
                    value={lead.segmento}
                    onChange={(v) => field("segmento", v)}
                    options={SEGMENTOS}
                  />
                  <Select
                    label="Porte"
                    value={lead.porte}
                    onChange={(v) => field("porte", v)}
                    options={PORTES}
                  />
                </div>

                <div className="space-y-5 border-t border-white/8 pt-6">
                  <div>
                    <p className="text-sm font-medium text-white">Para aprofundar a leitura da sua operação</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">Nestas perguntas, você pode selecionar todas as opções que se aplicam.</p>
                  </div>
                  <MultiSelect label="Quais canais hoje geram oportunidades?" options={CANAIS} value={lead.canais} onChange={(v) => field("canais", v)} />
                  <MultiSelect label="Quais ferramentas fazem parte da operação?" options={FERRAMENTAS} value={lead.ferramentas} onChange={(v) => field("ferramentas", v)} />
                  <MultiSelect label="Quais pontos merecem atenção primeiro?" options={PRIORIDADES} value={lead.prioridades} onChange={(v) => field("prioridades", v)} />
                </div>

                <button
                  type="submit"
                  className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-brand-soft to-brand px-8 py-4 text-base font-semibold text-ink glow-brand transition-transform hover:scale-[1.01]"
                >
                  Ver meu resultado
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDir(-1);
                      setPhase("quiz");
                      setQIndex(QUESTIONS.length - 1);
                    }}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Revisar respostas
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhase("results")}
                    className="text-xs text-muted/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    Pular por agora
                  </button>
                </div>
              </form>
            </motion.section>
          )}

          {/* ============ RESULTS ============ */}
          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Results
                result={result}
                lead={lead.nome ? lead : null}
                onRestart={restart}
                onBackToDeck={onBackToDeck}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form controls                                                       */
/* ------------------------------------------------------------------ */
function Input({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">
        {label}
        {optional && <span className="text-muted/50"> (opcional)</span>}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-muted/40 focus:bg-white/[0.05] ${
          error
            ? "border-brand focus:border-brand"
            : "border-white/10 focus:border-brand/60"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-brand">{error}</span>}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand/60"
      >
        <option value="" className="bg-surface">
          Selecione
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-surface">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function MultiSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (option: string) => onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-medium text-muted">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option);
          return <button key={option} type="button" onClick={() => toggle(option)} aria-pressed={selected} className={`rounded-full border px-3 py-2 text-xs transition-colors ${selected ? "border-brand bg-brand/15 text-white" : "border-white/10 bg-white/[.02] text-zinc-400 hover:border-brand/45 hover:text-white"}`}><span className="mr-1.5 text-brand">{selected ? "✓" : "+"}</span>{option}</button>;
        })}
      </div>
    </fieldset>
  );
}
