"use client";

import { useGameStore } from "@/store/gameStore";
import { CATEGORIES } from "@/data/questions";
import { CHARACTERS } from "@/data/characters";
import { ArrowRight, Home } from "lucide-react";

const SCORE_GRADIENTS = [
  "linear-gradient(135deg, hsl(199 89% 48%), hsl(174 60% 45%))",
  "linear-gradient(135deg, hsl(174 60% 45%), hsl(145 65% 42%))",
  "linear-gradient(135deg, hsl(35 95% 55%), hsl(25 95% 55%))",
  "linear-gradient(135deg, hsl(145 65% 42%), hsl(199 89% 48%))",
  "linear-gradient(135deg, hsl(199 89% 48%), hsl(262 60% 60%))",
];

export function GameHeader() {
  const teams = useGameStore((s) => s.teams);
  const currentTeamIndex = useGameStore((s) => s.currentTeamIndex);
  const currentRoundIndex = useGameStore((s) => s.currentRoundIndex);
  const currentCategoryId = useGameStore((s) => s.currentCategoryId);

  const resetGame = useGameStore((s) => s.resetGame);
  const backToMenu = useGameStore((s) => s.backToMenu);
  const currentTeam = teams[currentTeamIndex];
  const category = CATEGORIES.find((c) => c.id === currentCategoryId);
  const totalScore = currentTeam
    ? Object.values(currentTeam.scores).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="space-y-3" dir="rtl">
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={backToMenu}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/20 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 hover:bg-white/30 backdrop-blur-sm"
        >
          <ArrowRight className="w-4 h-4" />
          رجوع
        </button>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/20 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 hover:bg-white/30 backdrop-blur-sm"
        >
          <Home className="w-4 h-4" />
          الرئيسية
        </button>
      </div>

      {/* All teams score pills */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {teams.map((team, i) => {
          const char = CHARACTERS.find((c) => c.id === team.character) ?? CHARACTERS[i % CHARACTERS.length];
          return (
            <div
              key={team.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-sm font-bold shadow-sm transition-all"
              style={{
                background: i === currentTeamIndex ? SCORE_GRADIENTS[i % SCORE_GRADIENTS.length] : "hsl(240 10% 75%)",
                transform: i === currentTeamIndex ? "scale(1.05)" : "scale(1)",
              }}
            >
              <span>{char.emoji}</span>
              <span className="truncate max-w-20">{team.childName}</span>
              <span className="opacity-70 text-xs">●</span>
              <span>{Object.values(team.scores).reduce((a, b) => a + b, 0)}</span>
            </div>
          );
        })}
      </div>

      {/* Current team banner */}
      {currentTeam && (() => {
        const char = CHARACTERS.find((c) => c.id === currentTeam.character) ?? CHARACTERS[currentTeamIndex % CHARACTERS.length];
        return (
          <div className="bg-white rounded-3xl p-4 shadow-md border border-sky-100 flex items-center gap-4">
            <div className="flex flex-col items-center shrink-0 w-14">
              <span className="text-3xl leading-none">{char.emoji}</span>
              <span className="text-[10px] font-bold mt-0.5" style={{ color: "#7c3aed" }}>{char.name}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-black text-lg leading-tight" style={{ color: "hsl(240 20% 15%)" }}>
                {currentTeam.childName}
              </h2>
              <p className="text-sm" style={{ color: "hsl(240 10% 55%)" }}>
                السؤال {currentRoundIndex + 1} من 5
                {category && ` · ${category.icon} ${category.name}`}
              </p>
            </div>
            <div
              className="w-10 h-10 rounded-full text-white font-black text-sm flex items-center justify-center shadow-sm shrink-0"
              style={{ background: SCORE_GRADIENTS[currentTeamIndex % SCORE_GRADIENTS.length] }}
            >
              {totalScore}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
