import {
  QUESTIONS,
  PILLARS,
  PILLAR_MAP,
  LEVELS,
  type Level,
  type ModuleId,
  type Pillar,
  type PillarId,
} from "./data";

export type Answers = Record<string, number | string | string[]>;

export type PillarResult = {
  pillar: Pillar;
  score: number; // 0-100
  band: "low" | "mid" | "high";
  diagnosis: string;
};

export type Impact = {
  horas: number; // estimated hours recovered per month
  conversao: number; // estimated % conversion uplift
  retrabalho: number; // % of manual rework that can be removed
};

export type DiagnosticResult = {
  overall: number;
  level: Level;
  pillars: PillarResult[];
  priorities: PillarResult[]; // 3 weakest
  strengths: PillarResult[]; // up to 2 strongest
  modules: ModuleId[];
  impact: Impact;
  answered: number;
  totalQuestions: number;
};

const clamp = (n: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, n));

function bandOf(score: number): "low" | "mid" | "high" {
  if (score < 40) return "low";
  if (score < 70) return "mid";
  return "high";
}

export function getLevel(score: number): Level {
  return (
    LEVELS.find((l) => score >= l.range[0] && score <= l.range[1]) ?? LEVELS[0]
  );
}

export function computeResult(answers: Answers): DiagnosticResult {
  // --- per pillar score -------------------------------------------------
  const pillarResults: PillarResult[] = PILLARS.map((pillar) => {
    const qs = QUESTIONS.filter((q) => q.pillar === pillar.id && !q.multiple);
    const scoredQuestions = qs.filter((q) => typeof answers[q.id] === "number");
    const max = scoredQuestions.length * 3;
    const sum = scoredQuestions.reduce((acc, q) => {
      const answer = answers[q.id];
      return acc + (typeof answer === "number" ? answer : 0);
    }, 0);
    const score = max === 0 ? 50 : Math.round((sum / max) * 100);
    const band = bandOf(score);
    return {
      pillar,
      score,
      band,
      diagnosis: pillar.diagnosis[band],
    };
  });

  // --- overall ----------------------------------------------------------
  const overall = Math.round(
    pillarResults.reduce((a, p) => a + p.score, 0) / pillarResults.length,
  );

  // --- priorities & strengths ------------------------------------------
  const sorted = [...pillarResults].sort((a, b) => a.score - b.score);
  const priorities = sorted.slice(0, 3);
  const strengths = [...pillarResults]
    .sort((a, b) => b.score - a.score)
    .filter((p) => p.score >= 50)
    .slice(0, 2);

  // --- recommended stack -------------------------------------------------
  const moduleSet = new Set<ModuleId>();
  pillarResults
    .filter((p) => p.score < 70)
    .forEach((p) => p.pillar.modules.forEach((m) => moduleSet.add(m)));
  // always give at least a baseline recommendation
  if (moduleSet.size === 0) {
    ["dashboards", "ia"].forEach((m) => moduleSet.add(m as ModuleId));
  }
  const modules = Array.from(moduleSet);

  // --- estimated impact --------------------------------------------------
  const get = (id: PillarId) =>
    pillarResults.find((p) => p.pillar.id === id)?.score ?? 0;

  const manualIndex = (100 - (get("processos") + get("ferramentas")) / 2) / 100;
  const salesIndex = (100 - (get("comercial") + get("atendimento")) / 2) / 100;
  const dataIndex = (100 - get("dados")) / 100;

  const impact: Impact = {
    horas: Math.round(clamp(12 + manualIndex * 68, 8, 80)),
    conversao: Math.round(clamp(4 + salesIndex * 26, 3, 30)),
    retrabalho: Math.round(clamp(15 + ((manualIndex + dataIndex) / 2) * 65, 10, 80)),
  };

  const answered = QUESTIONS.filter((q) => {
    const answer = answers[q.id];
    return Array.isArray(answer) ? answer.length > 0 : Boolean(answer !== undefined && answer !== "");
  }).length;

  return {
    overall,
    level: getLevel(overall),
    pillars: pillarResults,
    priorities,
    strengths,
    modules,
    impact,
    answered,
    totalQuestions: QUESTIONS.length,
  };
}

export { PILLAR_MAP };
