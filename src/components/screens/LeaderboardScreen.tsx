"use client";

import { useGameStore } from "@/store/gameStore";
import { CATEGORIES } from "@/data/questions";
import { CategoryId } from "@/types/game";

const SCORE_GRADIENTS = [
  "linear-gradient(135deg, hsl(199 89% 48%), hsl(174 60% 45%))",
  "linear-gradient(135deg, hsl(174 60% 45%), hsl(145 65% 42%))",
  "linear-gradient(135deg, hsl(35 95% 55%), hsl(25 95% 55%))",
  "linear-gradient(135deg, hsl(145 65% 42%), hsl(199 89% 48%))",
  "linear-gradient(135deg, hsl(199 89% 48%), hsl(262 60% 60%))",
];

const MEDAL = ["🥇", "🥈", "🥉"];

const CATEGORY_COLORS: Record<CategoryId, string> = {
  religion: "hsl(145 65% 42%)",
  science: "hsl(199 89% 48%)",
  math: "hsl(262 60% 55%)",
  physical: "hsl(35 95% 55%)",
  culture: "hsl(0 80% 60%)",
};

export function LeaderboardScreen() {
  const teams = useGameStore((s) => s.teams);
  const hideLeaderboard = useGameStore((s) => s.hideLeaderboard);

  const sorted = [...teams]
    .map((t, originalIndex) => ({
      ...t,
      originalIndex,
      total: Object.values(t.scores).reduce((a, b) => a + b, 0),
    }))
    .sort((a, b) => b.total - a.total);

  const maxTotal = Math.max(...sorted.map((t) => t.total), 1);

  return (
    <div className="space-y-5" dir="rtl">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-black text-white drop-shadow-md">
          🏆 لوحة المتصدرين
        </h1>
        <p className="text-sm mt-1 text-white/80">
          ترتيب الفرق وتفاصيل النقاط
        </p>
      </div>

      {/* Team Cards */}
      <div className="space-y-4">
        {sorted.map((team, rank) => (
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
              <span className="text-3xl">
                {MEDAL[rank] || "🎖️"}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="font-black text-lg truncate"
                  style={{
                    color: rank < 3 ? "white" : "hsl(240 20% 15%)",
                  }}
                >
                  {team.childName} & {team.adultName}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{
                    color: rank < 3 ? "rgba(255,255,255,0.85)" : "hsl(220 10% 50%)",
                  }}
                >
                  المركز {rank + 1}
                </p>
              </div>
              <div
                className="w-14 h-14 rounded-2xl text-white font-black text-xl flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  background:
                    SCORE_GRADIENTS[
                      team.originalIndex % SCORE_GRADIENTS.length
                    ],
                }}
              >
                {team.total}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="px-5 py-4 space-y-3">
              {CATEGORIES.map((cat) => {
                const score = team.scores[cat.id];
                const barWidth =
                  maxTotal > 0 ? (score / maxTotal) * 100 : 0;

                return (
                  <div key={cat.id} className="flex items-center gap-3">
                    <span className="text-lg w-7 text-center shrink-0">
                      {cat.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className="text-xs font-bold"
                          style={{ color: "hsl(240 20% 30%)" }}
                        >
                          {cat.name}
                        </span>
                        <span
                          className="text-xs font-bold"
                          style={{ color: CATEGORY_COLORS[cat.id] }}
                        >
                          {score}
                        </span>
                      </div>
                      <div
                        className="h-2.5 rounded-full overflow-hidden"
                        style={{ background: "hsl(210 30% 92%)" }}
                      >
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

            {/* Joker Usage */}
            <div className="px-5 pb-4">
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <span
                    key={cat.id}
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      background: team.jokerUsed[cat.id]
                        ? "hsl(35 95% 92%)"
                        : "hsl(210 30% 95%)",
                      color: team.jokerUsed[cat.id]
                        ? "hsl(35 95% 40%)"
                        : "hsl(210 20% 65%)",
                    }}
                  >
                    {cat.icon}{" "}
                    {team.jokerUsed[cat.id] ? "جوكر مستخدم" : "جوكر متاح"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button
        onClick={hideLeaderboard}
        className="w-full text-white font-bold py-4 rounded-2xl shadow-md text-lg hover:scale-105 active:scale-95 transition-all"
        style={{
          background: "linear-gradient(135deg, #7c3bed, #0dccf2, #f99e1f)",
        }}
      >
        🎯 العودة للقائمة الرئيسية
      </button>
    </div>
  );
}
