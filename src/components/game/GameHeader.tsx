"use client";

import { useGameStore } from "@/store/gameStore";
import { CATEGORIES } from "@/data/questions";

const SCORE_GRADIENTS = [
  "linear-gradient(135deg, hsl(262 83% 58%), hsl(190 90% 50%))",
  "linear-gradient(135deg, hsl(190 90% 50%), hsl(35 95% 55%))",
  "linear-gradient(135deg, hsl(35 95% 55%), hsl(0 80% 60%))",
  "linear-gradient(135deg, hsl(145 65% 42%), hsl(190 90% 50%))",
  "linear-gradient(135deg, hsl(0 80% 60%), hsl(262 83% 58%))",
];

export function GameHeader() {
  const teams = useGameStore((s) => s.teams);
  const currentTeamIndex = useGameStore((s) => s.currentTeamIndex);
  const currentRoundIndex = useGameStore((s) => s.currentRoundIndex);
  const currentCategoryId = useGameStore((s) => s.currentCategoryId);

  const currentTeam = teams[currentTeamIndex];
  const category = CATEGORIES.find((c) => c.id === currentCategoryId);
  const totalScore = currentTeam
    ? Object.values(currentTeam.scores).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="space-y-3" dir="rtl">
      {/* All teams score pills */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {teams.map((team, i) => (
          <div
            key={team.id}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-sm font-bold shadow-sm transition-all"
            style={{
              background: i === currentTeamIndex ? SCORE_GRADIENTS[i % SCORE_GRADIENTS.length] : "hsl(240 10% 75%)",
              transform: i === currentTeamIndex ? "scale(1.05)" : "scale(1)",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            <span className="truncate max-w-[80px]">{team.childName}</span>
            <span className="opacity-70 text-xs">●</span>
            <span>{Object.values(team.scores).reduce((a, b) => a + b, 0)}</span>
          </div>
        ))}
      </div>

      {/* Current team banner */}
      {currentTeam && (
        <div className="bg-white rounded-3xl p-4 shadow-md border border-amber-100 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full text-white font-black text-xl flex items-center justify-center shadow-sm shrink-0"
            style={{ background: SCORE_GRADIENTS[currentTeamIndex % SCORE_GRADIENTS.length], fontFamily: "Cairo, sans-serif" }}
          >
            {totalScore}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-black text-lg leading-tight" style={{ color: "hsl(240 20% 15%)", fontFamily: "Cairo, sans-serif" }}>
              {currentTeam.childName}
            </h2>
            <p className="text-sm" style={{ color: "hsl(240 10% 55%)", fontFamily: "Cairo, sans-serif" }}>
              السؤال {currentRoundIndex + 1} من 5
              {category && ` · ${category.icon} ${category.name}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
