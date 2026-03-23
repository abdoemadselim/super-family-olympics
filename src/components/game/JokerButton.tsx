"use client";

import { useGameStore } from "@/store/gameStore";

export function JokerButton() {
  const teams = useGameStore((s) => s.teams);
  const currentTeamIndex = useGameStore((s) => s.currentTeamIndex);
  const currentCategoryId = useGameStore((s) => s.currentCategoryId);
  const jokerActiveThisRound = useGameStore((s) => s.jokerActiveThisRound);
  const activateJoker = useGameStore((s) => s.activateJoker);

  const currentTeam = teams[currentTeamIndex];
  const jokerUsed = currentTeam && currentCategoryId
    ? currentTeam.jokerUsed[currentCategoryId]
    : true;

  if (jokerUsed || jokerActiveThisRound) {
    return (
      <div
        className="text-center text-sm py-2.5 px-4 rounded-2xl font-bold border"
        style={
          jokerActiveThisRound
            ? { background: "hsl(35 95% 95%)", color: "hsl(35 95% 40%)", borderColor: "hsl(35 95% 80%)", fontFamily: "Cairo, sans-serif" }
            : { background: "hsl(45 20% 94%)", color: "hsl(240 10% 65%)", borderColor: "hsl(45 30% 85%)", fontFamily: "Cairo, sans-serif" }
        }
        dir="rtl"
      >
        {jokerActiveThisRound ? "🃏 الجوكر مفعّل! (صح=10، خطأ=-5)" : "تم استخدام الجوكر"}
      </div>
    );
  }

  return (
    <button
      onClick={activateJoker}
      className="w-full text-white font-bold py-3.5 rounded-2xl shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 hover:opacity-90"
      style={{
        background: "linear-gradient(135deg, hsl(35 95% 55%), hsl(35 95% 65%))",
        fontFamily: "Cairo, sans-serif",
      }}
      dir="rtl"
    >
      <span className="text-xl">🃏</span>
      <span>استخدام الجوكر (صح=10 | خطأ=-5)</span>
    </button>
  );
}
