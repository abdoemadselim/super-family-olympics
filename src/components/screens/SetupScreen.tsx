"use client";

import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/hooks/useSound";
import { TeamInput } from "@/components/setup/TeamInput";
import { TeamList } from "@/components/setup/TeamList";

export function SetupScreen() {
  const teams = useGameStore((s) => s.teams);
  const startGame = useGameStore((s) => s.startGame);
  const resetGame = useGameStore((s) => s.resetGame);
  const sound = useSound();

  const canStart = teams.length >= 2;

  const handleStart = () => {
    sound.gameStart();
    startGame();
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Title */}
      <div className="text-center space-y-2 pt-6">
        <h1 className="text-5xl font-black text-white drop-shadow-md">
          🏆 سوبر أولمبياد العائلة 🎮
        </h1>
        <p className="text-white/80 text-base">
          ⭐ أضف أسماء الفرق واختر أعمارهم للبدء! ⭐
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
            onClick={handleStart}
            className="w-full text-white font-bold py-4 rounded-2xl shadow-lg text-lg transition-all active:scale-95 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #7c3bed, #0dccf2, #f99e1f)",
            }}
          >
            بدء المسابقة!
          </button>
        )}
        {teams.length > 0 && (
          <button
            onClick={resetGame}
            className="w-full bg-white/70 hover:bg-white/90 font-medium py-3 rounded-2xl shadow-sm text-sm transition-all border border-sky-100"
            style={{ color: "hsl(240 10% 60%)" }}
          >
            إعادة ضبط
          </button>
        )}
      </div>
    </div>
  );
}
