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
        <h1
          className="text-4xl font-black"
          style={{
            fontFamily: "Cairo, sans-serif",
            background: "linear-gradient(135deg, hsl(262 83% 58%), hsl(190 90% 50%), hsl(35 95% 55%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          سوبر أولمبياد العائلة
        </h1>
        <p className="text-sm mt-1" style={{ color: "hsl(240 10% 55%)", fontFamily: "Cairo, sans-serif" }}>
          اختر مجال التحدي وابدأ!
        </p>
      </div>

      {/* Scoreboard */}
      <ScoreBar />

      {/* Categories */}
      <CategoryGrid />

      {/* Reset */}
      <button
        onClick={resetGame}
        className="w-full bg-white/70 hover:bg-white/90 font-medium py-3 rounded-2xl shadow-sm text-sm transition-all border border-amber-100"
        style={{ color: "hsl(240 10% 60%)", fontFamily: "Cairo, sans-serif" }}
      >
        بدء لعبة جديدة
      </button>
    </div>
  );
}
