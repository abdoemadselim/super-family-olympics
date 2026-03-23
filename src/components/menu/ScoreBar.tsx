"use client";

import { useGameStore } from "@/store/gameStore";

const SCORE_GRADIENTS = [
  "linear-gradient(135deg, hsl(262 83% 58%), hsl(190 90% 50%))",
  "linear-gradient(135deg, hsl(190 90% 50%), hsl(35 95% 55%))",
  "linear-gradient(135deg, hsl(35 95% 55%), hsl(0 80% 60%))",
  "linear-gradient(135deg, hsl(145 65% 42%), hsl(190 90% 50%))",
  "linear-gradient(135deg, hsl(0 80% 60%), hsl(262 83% 58%))",
];

export function ScoreBar() {
  const teams = useGameStore((s) => s.teams);

  const sorted = [...teams]
    .map((t, originalIndex) => ({
      ...t,
      originalIndex,
      total: Object.values(t.scores).reduce((a, b) => a + b, 0),
    }))
    .sort((a, b) => b.total - a.total);

  const MEDAL = ["🥇", "🥈", "🥉"];

  return (
    <div className="bg-white rounded-3xl shadow-md p-5 border border-amber-100" dir="rtl">
      <h3 className="font-bold mb-4 text-center text-base" style={{ color: "hsl(262 83% 58%)", fontFamily: "Cairo, sans-serif" }}>
        🏆 لوحة النتائج
      </h3>
      <div className="space-y-2.5">
        {sorted.map((team, i) => (
          <div key={team.id} className="flex items-center gap-3 rounded-2xl px-4 py-2.5" style={{ background: "hsl(45 100% 97%)" }}>
            <span className="text-xl">{MEDAL[i] || "🎖️"}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm truncate" style={{ color: "hsl(240 20% 15%)", fontFamily: "Cairo, sans-serif" }}>
                {team.childName} & {team.adultName}
              </div>
            </div>
            <div
              className="w-9 h-9 rounded-full text-white font-black text-sm flex items-center justify-center shrink-0"
              style={{ background: SCORE_GRADIENTS[team.originalIndex % SCORE_GRADIENTS.length], fontFamily: "Cairo, sans-serif" }}
            >
              {team.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
