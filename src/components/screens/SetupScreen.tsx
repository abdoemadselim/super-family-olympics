"use client";

import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/hooks/useSound";
import { TeamInput } from "@/components/setup/TeamInput";
import { PlayerInput } from "@/components/setup/PlayerInput";
import { TeamList } from "@/components/setup/TeamList";

export function SetupScreen() {
  const teams = useGameStore((s) => s.teams);
  const gameMode = useGameStore((s) => s.gameMode);
  const startGame = useGameStore((s) => s.startGame);
  const resetGame = useGameStore((s) => s.resetGame);
  const sound = useSound();

  const canStart = gameMode === "solo" ? teams.length === 2 : teams.length >= 2;

  const handleStart = () => {
    sound.gameStart();
    startGame();
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Subtitle */}
      <div className="text-center space-y-2 pt-6">
        <p className="text-white/80 text-base">
          {gameMode === "solo"
            ? "⭐ أضف اللاعبين للبدء! ⭐"
            : "⭐ أضف أسماء الفرق واختر أعمارهم للبدء! ⭐"}
        </p>
      </div>

      {/* Input */}
      {gameMode === "solo" ? <PlayerInput /> : <TeamInput />}

      {/* Teams/Players */}
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
