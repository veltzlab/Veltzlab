import { motion } from "framer-motion";
import {
  ArrowRight,
  Printer,
  RotateCcw,
  Clock,
  TrendingUp,
  Repeat,
  CheckCircle2,
  AlertTriangle,
  Presentation as PresentationIcon,
} from "lucide-react";
import { Gauge, RadarChart, ScoreBar } from "./charts";
import { MODULES, LEVELS } from "./data";
import type { DiagnosticResult } from "./scoring";
import type { Lead } from "./DiagnosticApp";
import { fadeUp, stagger, VeltzLogo } from "./primitives";

export default function Results({
  result,
  lead,
  onRestart,
  onBackToDeck,
}: {
  result: DiagnosticResult;
  lead: Lead | null;
  onRestart: () => void;
  onBackToDeck: () => void;
}) {
  const { overall, level, pillars, priorities, strengths, modules, impact } =
    result;
  const whatsappText = encodeURIComponent(`OlÃ¡, Veltz. ConcluÃ­ o diagnÃ³stico${lead?.empresa ? ` da ${lead.empresa}` : ""} e quero entender os prÃ³ximos passos.${lead?.prioridades?.length ? ` Minhas prioridades: ${lead.prioridades.join(", ")}.` : ""}`);

  const levelIndex = LEVELS.findIndex((l) => l.key === level.key);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-20"
    >
      {/* ---------------- Header ---------------- */}
      <motion.div variants={fadeUp} className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
          DiagnÃ³stico ConcluÃ­do
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {lead?.nome ? `${lead.nome.split(" ")[0]}, ` : ""}
          <span className="text-brand-gradient">{level.headline}</span>
        </h1>
        {lead?.empresa && (
          <p className="mt-3 text-sm text-muted">
            Resultado para{" "}
            <span className="text-white">{lead.empresa}</span>
          </p>
        )}
      </motion.div>

      {/* ---------------- Score + Radar ---------------- */}
      <motion.div
        variants={fadeUp}
        className="glass-card mb-5 grid gap-8 rounded-2xl p-7 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:p-10"
      >
        <div className="flex flex-col items-center">
          <Gauge value={overall} label="Ãndice de Maturidade Operacional" />
          <span className="mt-4 rounded-full bg-white/5 px-4 py-1.5 font-display text-sm font-semibold text-white ring-1 ring-white/10">
            {level.name}
          </span>
        </div>

        <div>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            {level.desc}
          </p>

          {/* level scale */}
          <div className="mt-7">
            <div className="mb-2.5 flex justify-between text-[10px] uppercase tracking-wider text-muted/70">
              <span>Fragmentada</span>
              <span>Inteligente</span>
            </div>
            <div className="flex gap-1.5">
              {LEVELS.map((l, i) => (
                <div key={l.key} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      i <= levelIndex ? "bg-brand" : "bg-white/10"
                    }`}
                  />
                  <span
                    className={`mt-2 block text-center text-[9px] leading-tight sm:text-[10px] ${
                      i === levelIndex
                        ? "font-semibold text-white"
                        : "text-muted/60"
                    }`}
                  >
                    {l.name.replace("OperaÃ§Ã£o ", "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ---------------- Pillars ---------------- */}
      <motion.div variants={fadeUp} className="mb-5 grid gap-5 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-7">
          <h2 className="mb-1 font-display text-lg font-semibold text-white">
            Mapa da operaÃ§Ã£o
          </h2>
          <p className="mb-4 text-sm text-muted">
            Desempenho por pilar avaliado.
          </p>
          <div className="mx-auto aspect-square w-full max-w-[19rem]">
            <RadarChart pillars={pillars} />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-7">
          <h2 className="mb-1 font-display text-lg font-semibold text-white">
            PontuaÃ§Ã£o por pilar
          </h2>
          <p className="mb-6 text-sm text-muted">
            Onde a operaÃ§Ã£o estÃ¡ forte e onde ela trava.
          </p>
          <div className="space-y-4">
            {pillars.map((p, i) => (
              <ScoreBar key={p.pillar.id} result={p} index={i} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ---------------- Estimated impact ---------------- */}
      <motion.div variants={fadeUp} className="mb-5 grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: Clock,
            value: `${impact.horas}h`,
            label: "por mÃªs recuperadas em tarefas manuais",
          },
          {
            icon: TrendingUp,
            value: `+${impact.conversao}%`,
            label: "de potencial em conversÃ£o comercial",
          },
          {
            icon: Repeat,
            value: `-${impact.retrabalho}%`,
            label: "de retrabalho eliminÃ¡vel com integraÃ§Ã£o",
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass-card rounded-2xl p-6">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/12 text-brand ring-1 ring-brand/20">
                <Icon className="h-4 w-4" />
              </span>
              <p className="font-display text-3xl font-bold text-white">
                {s.value}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {s.label}
              </p>
            </div>
          );
        })}
      </motion.div>
      <motion.p
        variants={fadeUp}
        className="mb-10 text-center text-[11px] text-muted/60"
      >
        Estimativas calculadas a partir das suas respostas. NÃºmeros precisos sÃ£o
        definidos na etapa de Descoberta.
      </motion.p>

      {/* ---------------- Priorities ---------------- */}
      <motion.div variants={fadeUp} className="mb-5">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <AlertTriangle className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold text-white">
              Prioridades recomendadas
            </h2>
            <p className="text-sm text-muted">
              Os trÃªs pontos com maior ganho imediato.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {priorities.map((p, i) => {
            const Icon = p.pillar.icon;
            return (
              <div
                key={p.pillar.id}
                className="glass-card relative overflow-hidden rounded-2xl p-6"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/10 blur-2xl" />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/12 text-brand ring-1 ring-brand/20">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-display text-xs font-semibold uppercase tracking-wider text-brand/70">
                      Prioridade {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {p.pillar.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-brand"
                        style={{ width: `${p.score}%` }}
                      />
                    </div>
                    <span className="font-display text-xs font-semibold text-muted">
                      {p.score}/100
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {p.diagnosis}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-white/8 pt-4">
                    {p.pillar.actions.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-2 text-xs leading-relaxed text-zinc-300"
                      >
                        <ArrowRight className="mt-0.5 h-3 w-3 flex-none text-brand" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ---------------- Strengths ---------------- */}
      {strengths.length > 0 && (
        <motion.div
          variants={fadeUp}
          className="glass-card mb-5 rounded-2xl p-6"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="flex items-center gap-2 font-display text-sm font-semibold text-white">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Pontos fortes
            </span>
            {strengths.map((s) => (
              <span
                key={s.pillar.id}
                className="rounded-full border border-emerald-400/25 bg-emerald-400/8 px-3 py-1 text-xs text-emerald-300"
              >
                {s.pillar.short} Â· {s.score}
              </span>
            ))}
            <span className="text-xs text-muted">
              Aproveite essa base para acelerar as demais frentes.
            </span>
          </div>
        </motion.div>
      )}

      {/* ---------------- Recommended stack ---------------- */}
      <motion.div variants={fadeUp} className="glass-card mb-5 rounded-2xl p-7">
        <h2 className="font-display text-xl font-semibold text-white">
          Arquitetura recomendada
        </h2>
        <p className="mt-1 text-sm text-muted">
          Apenas a tecnologia necessÃ¡ria para a sua operaÃ§Ã£o â€” nada alÃ©m disso.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const mod = MODULES[m];
            const Icon = mod.icon;
            return (
              <div
                key={m}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand/12 text-brand">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{mod.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {mod.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ---------------- CTA ---------------- */}
      <motion.div
        variants={fadeUp}
        className="glass-card relative overflow-hidden rounded-2xl p-8 text-center md:p-12"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative">
          <VeltzLogo className="h-8 w-auto" />
          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Este Ã© o ponto de partida.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            O prÃ³ximo passo do VELTZ OSâ„¢ Ã© a{" "}
            <span className="text-white">Descoberta</span>: mapear sua operaÃ§Ã£o
            em profundidade e transformar este diagnÃ³stico em um blueprint de
            arquitetura operacional.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/5533936180573?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-brand-soft to-brand px-7 py-3.5 text-sm font-semibold text-ink glow-brand transition-transform hover:scale-[1.03]"
            >
              Quero conversar sobre este diagnÃ³stico
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
            >
              <Printer className="h-4 w-4" />
              Salvar em PDF
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-muted">
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Refazer diagnÃ³stico
            </button>
            <button
              onClick={onBackToDeck}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <PresentationIcon className="h-3.5 w-3.5" />
              Voltar Ã  apresentaÃ§Ã£o
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
