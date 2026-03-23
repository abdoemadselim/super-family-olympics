"use client";

import { useGameStore } from "@/store/gameStore";
import { ScoreBar } from "@/components/menu/ScoreBar";
import { CategoryGrid } from "@/components/menu/CategoryGrid";

export function MenuScreen() {
  const resetGame = useGameStore((s) => s.resetGame);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Title */}
      <div className="text-center pt-4">
        <h1 className="text-4xl font-black text-white drop-shadow-md">
          🏆 سوبر أولمبياد العائلة 🎮
        </h1>
        <p className="text-sm mt-1 text-white/80">
          🎯 اختر مجال التحدي وابدأ!
        </p>
      </div>

      {/* Scoreboard */}
      <ScoreBar />

      {/* Categories */}
      <CategoryGrid />

      {/* Reset */}
      <button
        onClick={resetGame}
        className="w-full bg-white/70 hover:bg-white/90 font-medium py-3 rounded-2xl shadow-sm text-sm transition-all border border-sky-100"
        style={{ color: "hsl(240 10% 60%)" }}
      >
        بدء لعبة جديدة
      </button>
    </div>
  );
}
