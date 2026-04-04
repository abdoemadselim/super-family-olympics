"use client";

import { Team } from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { Trash2, User, Users } from "lucide-react";
import { CHARACTERS } from "@/data/characters";

interface Props {
  team: Team;
  index: number;
}

export function TeamCard({ team, index }: Props) {
  const removeTeam = useGameStore((s) => s.removeTeam);
  const gameMode = useGameStore((s) => s.gameMode);
  const character = CHARACTERS.find((c) => c.id === team.character) ?? CHARACTERS[index % CHARACTERS.length];

  return (
    <div
      className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-sky-100"
      dir="rtl"
    >
      {/* Character avatar */}
      <div className="flex flex-col items-center shrink-0 w-12">
        <span className="text-2xl leading-none">{character.emoji}</span>
        <span className="text-[10px] font-bold mt-0.5" style={{ color: "#7c3aed" }}>
          {character.name}
        </span>
      </div>

      {/* Names */}
      <div className="flex-1 min-w-0">
        {gameMode === "solo" ? (
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(262 60% 55%)" }} />
            <span className="font-bold text-base truncate" style={{ color: "hsl(240 20% 15%)" }}>
              {team.childName}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold shrink-0"
              style={{
                background: team.playerType === "child" ? "hsl(340 60% 95%)" : "hsl(190 60% 95%)",
                color: team.playerType === "child" ? "#e74c8b" : "#0dccf2",
              }}
            >
              {team.playerType === "child" ? "🧒 طفل" : "👨 كبير"}
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(0 80% 60%)" }} />
              <span className="font-bold text-base truncate" style={{ color: "hsl(240 20% 15%)" }}>
                {team.childName}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Users className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(210 80% 55%)" }} />
              <span className="text-sm truncate" style={{ color: "hsl(240 10% 40%)" }}>
                {team.adultName}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={() => removeTeam(team.id)}
        className="transition-colors p-1.5 rounded-lg hover:bg-red-50 shrink-0"
        style={{ color: "#ef4444" }}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
