"use client";

import { Team } from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { Trash2, User, Users } from "lucide-react";

interface Props {
  team: Team;
  index: number;
}

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, hsl(199 89% 48%), hsl(174 60% 45%))",
  "linear-gradient(135deg, hsl(174 60% 45%), hsl(145 65% 42%))",
  "linear-gradient(135deg, hsl(35 95% 55%), hsl(25 95% 55%))",
  "linear-gradient(135deg, hsl(145 65% 42%), hsl(199 89% 48%))",
  "linear-gradient(135deg, hsl(199 89% 48%), hsl(262 60% 60%))",
];

export function TeamCard({ team, index }: Props) {
  const removeTeam = useGameStore((s) => s.removeTeam);
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];

  return (
    <div
      className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-sky-100"
      dir="rtl"
    >
      {/* Index badge */}
      <span
        className="w-10 h-10 rounded-full text-white text-sm font-black flex items-center justify-center shrink-0 shadow-sm"
        style={{ background: gradient }}
      >
        {index + 1}
      </span>

      {/* Names */}
      <div className="flex-1 min-w-0">
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
