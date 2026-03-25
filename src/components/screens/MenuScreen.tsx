"use client";

import { useGameStore } from "@/store/gameStore";
import { ScoreBar } from "@/components/menu/ScoreBar";
import { CategoryGrid } from "@/components/menu/CategoryGrid";
import { ArrowRight } from "lucide-react";

export function MenuScreen() {
  const resetGame = useGameStore((s) => s.resetGame);
  const backToSetup = useGameStore((s) => s.backToSetup);
  return (
    <div className="space-y-6" dir="rtl">
      {/* Back to setup */}
      <div className="flex justify-start pt-2">
        <button
          onClick={backToSetup}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/20 text-white text-base font-bold transition-all hover:scale-105 active:scale-95 hover:bg-white/30 backdrop-blur-sm"
        >
          <ArrowRight className="w-5 h-5" />
          إعداد الفرق
        </button>
      </div>

      {/* Title */}
      <div className="text-center">
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
