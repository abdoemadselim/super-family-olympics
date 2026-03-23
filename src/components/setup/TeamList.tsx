"use client";

import { useGameStore } from "@/store/gameStore";
import { TeamCard } from "./TeamCard";
import { Users } from "lucide-react";

export function TeamList() {
  const teams = useGameStore((s) => s.teams);

  if (teams.length === 0) return null;

  return (
    <div className="space-y-3" dir="rtl">
      <div className="flex items-center gap-2 font-semibold text-white/90">
        <Users className="w-4 h-4" />
        <span>الفرق المشاركة ({teams.length})</span>
      </div>
      {teams.map((team, i) => (
        <TeamCard key={team.id} team={team} index={i} />
      ))}
    </div>
  );
}
