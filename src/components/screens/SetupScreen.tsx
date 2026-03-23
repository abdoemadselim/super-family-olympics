"use client";

import { useGameStore } from "@/store/gameStore";
import { TeamInput } from "@/components/setup/TeamInput";
import { TeamList } from "@/components/setup/TeamList";

export function SetupScreen() {
  const teams = useGameStore((s) => s.teams);
  const startGame = useGameStore((s) => s.startGame);
  const resetGame = useGameStore((s) => s.resetGame);

  const canStart = teams.length >= 2;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Title */}
      <div className="text-center space-y-2 pt-6">
        <h1
          className="text-5xl font-black"
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
        <p className="text-slate-500 text-base" style={{ fontFamily: "Cairo, sans-serif" }}>
          أضف أسماء الفرق واختر أعمارهم للبدء!
        </p>
      </div>

      {/* Input */}
      <TeamInput />

      {/* Teams */}
      <TeamList />

      {/* Actions */}
      <div className="space-y-3">
        {canStart && (
          <button
            onClick={startGame}
            className="w-full text-white font-bold py-4 rounded-2xl shadow-lg text-lg transition-all active:scale-95 hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, hsl(262 83% 58%), hsl(190 90% 50%))",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            بدء المسابقة!
          </button>
        )}
        {teams.length > 0 && (
          <button
            onClick={resetGame}
            className="w-full bg-white/70 hover:bg-white/90 font-medium py-3 rounded-2xl shadow-sm text-sm transition-all border border-amber-100"
            style={{ color: "hsl(240 10% 60%)", fontFamily: "Cairo, sans-serif" }}
          >
            إعادة ضبط
          </button>
        )}
      </div>
    </div>
  );
}
