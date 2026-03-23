"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/hooks/useSound";
import { CATEGORIES } from "@/data/questions";

const SCORE_GRADIENTS = [
  "linear-gradient(135deg, hsl(199 89% 48%), hsl(174 60% 45%))",
  "linear-gradient(135deg, hsl(174 60% 45%), hsl(145 65% 42%))",
  "linear-gradient(135deg, hsl(35 95% 55%), hsl(25 95% 55%))",
  "linear-gradient(135deg, hsl(145 65% 42%), hsl(199 89% 48%))",
  "linear-gradient(135deg, hsl(199 89% 48%), hsl(262 60% 60%))",
];

export function CategoryResult() {
  const teams = useGameStore((s) => s.teams);
  const currentCategoryId = useGameStore((s) => s.currentCategoryId);
  const backToMenu = useGameStore((s) => s.startGame);
  const sound = useSound();

  useEffect(() => {
    sound.categoryComplete();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const category = CATEGORIES.find((c) => c.id === currentCategoryId);

  const sorted = [...teams]
    .map((t, originalIndex) => ({
      ...t,
      originalIndex,
      catScore: currentCategoryId ? t.scores[currentCategoryId] : 0,
    }))
    .sort((a, b) => b.catScore - a.catScore);

  const winner = sorted[0];

  return (
    <div className="space-y-6 text-center" dir="rtl">
      <div className="space-y-3">
        <div className="text-6xl">🏆</div>
        <h2 className="text-2xl font-black text-white drop-shadow-md">
          بطل مجال {category?.icon} {category?.name}
        </h2>
        <div
          className="rounded-3xl p-5 shadow-md"
          style={{ background: "linear-gradient(135deg, #7c3bed, #0dccf2, #f99e1f)" }}
        >
          <p className="text-white font-black text-2xl">
            {winner?.childName} & {winner?.adultName}
          </p>
          <p className="mt-1 text-white/80">
            {winner?.catScore} نقطة في هذا المجال
          </p>
        </div>
      </div>

      {/* All teams scores */}
      <div className="space-y-2">
        <h3 className="font-semibold text-white/80">
          نتائج المجال
        </h3>
        {sorted.map((team, i) => (
          <div
            key={team.id}
            className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm border border-sky-100"
          >
            <span className="text-xl">{["🥇", "🥈", "🥉"][i] || "🎖️"}</span>
            <div className="flex-1 text-right">
              <p className="font-bold" style={{ color: "hsl(240 20% 15%)" }}>
                {team.childName} & {team.adultName}
              </p>
            </div>
            <div
              className="w-9 h-9 rounded-full text-white font-black text-sm flex items-center justify-center"
              style={{ background: SCORE_GRADIENTS[team.originalIndex % SCORE_GRADIENTS.length] }}
            >
              {team.catScore}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={backToMenu}
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
