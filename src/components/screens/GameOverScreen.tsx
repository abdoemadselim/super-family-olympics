"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/hooks/useSound";
import { CATEGORIES } from "@/data/questions";
import { CHARACTERS } from "@/data/characters";
import { CategoryId } from "@/types/game";

const SCORE_GRADIENTS = [
  "linear-gradient(135deg, hsl(199 89% 48%), hsl(174 60% 45%))",
  "linear-gradient(135deg, hsl(174 60% 45%), hsl(145 65% 42%))",
  "linear-gradient(135deg, hsl(35 95% 55%), hsl(25 95% 55%))",
  "linear-gradient(135deg, hsl(145 65% 42%), hsl(199 89% 48%))",
  "linear-gradient(135deg, hsl(199 89% 48%), hsl(262 60% 60%))",
];

const CATEGORY_COLORS: Record<CategoryId, string> = {
  science: "hsl(199 89% 48%)",
  math: "hsl(262 60% 55%)",
  physical: "hsl(35 95% 55%)",
  football: "hsl(142 71% 45%)",
  arabic: "hsl(174 60% 45%)",
  geography: "hsl(45 93% 47%)",
  synonyms: "hsl(330 70% 55%)",
  riddles: "hsl(25 95% 55%)",
  religion: "hsl(152 60% 40%)",
};

const MEDAL = ["🥇", "🥈", "🥉"];

export function GameOverScreen() {
  const teams = useGameStore((s) => s.teams);
  const resetGame = useGameStore((s) => s.resetGame);
  const sound = useSound();

  useEffect(() => {
    sound.categoryComplete();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sorted = [...teams]
    .map((t, originalIndex) => ({
      ...t,
      originalIndex,
      total: Object.values(t.scores).reduce((a, b) => a + b, 0),
    }))
    .sort((a, b) => b.total - a.total);

  const winner = sorted[0];
  const maxTotal = Math.max(...sorted.map((t) => t.total), 1);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Winner Announcement */}
      <div className="text-center space-y-3 pt-4">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-black text-white drop-shadow-md">
          انتهت المسابقة!
        </h1>
        <div
          className="rounded-3xl p-6 shadow-lg"
          style={{ background: "linear-gradient(135deg, #f99e1f, #f7c948)" }}
        >
          <p className="text-white/80 text-sm font-bold mb-1">🏆 البطل العام</p>
          <p className="text-white font-black text-2xl">
            {winner?.childName} & {winner?.adultName}
          </p>
          <p className="mt-1 text-white/80 font-bold">
            {winner?.total} نقطة
          </p>
        </div>
      </div>

      {/* All Teams Final Standings */}
      <div className="space-y-4">
        <h2 className="text-center font-bold text-white/80">الترتيب النهائي</h2>
        {sorted.map((team, rank) => {
          const char = CHARACTERS.find((c) => c.id === team.character) ?? CHARACTERS[team.originalIndex % CHARACTERS.length];
          return (
            <div
              key={team.id}
              className="bg-white rounded-3xl shadow-md border border-sky-100 overflow-hidden"
            >
              {/* Team Header */}
              <div
                className="px-5 py-4 flex items-center gap-3"
                style={{
                  background:
                    rank === 0
                      ? "linear-gradient(135deg, #f99e1f, #f7c948)"
                      : rank === 1
                      ? "linear-gradient(135deg, #b0b8c1, #d1d5db)"
                      : rank === 2
                      ? "linear-gradient(135deg, #c4835a, #e0a97a)"
                      : "hsl(207 60% 96%)",
                }}
              >
                <span className="text-3xl">{MEDAL[rank] || "🎖️"}</span>
                <span className="text-3xl">{char.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-black text-lg truncate"
                    style={{ color: rank < 3 ? "white" : "hsl(240 20% 15%)" }}
                  >
                    {team.childName} & {team.adultName}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: rank < 3 ? "rgba(255,255,255,0.85)" : "hsl(220 10% 50%)" }}
                  >
                    المركز {rank + 1}
                  </p>
                </div>
                <div
                  className="w-14 h-14 rounded-2xl text-white font-black text-xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ background: SCORE_GRADIENTS[team.originalIndex % SCORE_GRADIENTS.length] }}
                >
                  {team.total}
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="px-5 py-4 space-y-3">
                {CATEGORIES.map((cat) => {
                  const score = team.scores[cat.id];
                  const barWidth = maxTotal > 0 ? (score / maxTotal) * 100 : 0;
                  return (
                    <div key={cat.id} className="flex items-center gap-3">
                      <span className="text-lg w-7 text-center shrink-0">{cat.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold" style={{ color: "hsl(240 20% 30%)" }}>
                            {cat.name}
                          </span>
                          <span className="text-xs font-bold" style={{ color: CATEGORY_COLORS[cat.id] }}>
                            {score}
                          </span>
                        </div>
                        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "hsl(210 30% 92%)" }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${barWidth}%`,
                              background: CATEGORY_COLORS[cat.id],
                              minWidth: score > 0 ? "8px" : "0",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Game Button */}
      <button
        onClick={resetGame}
        className="w-full text-white font-bold py-4 rounded-2xl shadow-md text-lg hover:scale-105 active:scale-95 transition-all"
        style={{
          background: "linear-gradient(135deg, #7c3bed, #0dccf2, #f99e1f)",
        }}
      >
        🎮 بدء لعبة جديدة
      </button>
    </div>
  );
}
