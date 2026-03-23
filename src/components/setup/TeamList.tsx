"use client";

import { useGameStore } from "@/store/gameStore";
import { TeamCard } from "./TeamCard";
import { Users } from "lucide-react";

export function TeamList() {
  const teams = useGameStore((s) => s.teams);

  if (teams.length === 0) {
    return (
      <div className="text-center py-12 space-y-3">
        <div className="text-6xl">👨‍👩‍👧‍👦</div>
        <p className="font-bold text-lg" style={{ color: "hsl(262 83% 58%)", fontFamily: "Cairo, sans-serif" }}>
          أضف فريقاً واحداً على الأقل للبدء!
        </p>
        <p className="text-sm" style={{ color: "hsl(240 10% 60%)", fontFamily: "Cairo, sans-serif" }}>
          يجب أن يضم كل فريق طفلاً وشخصاً بالغاً
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3" dir="rtl">
      <div className="flex items-center gap-2 font-semibold" style={{ color: "hsl(240 20% 30%)", fontFamily: "Cairo, sans-serif" }}>
        <Users className="w-4 h-4" style={{ color: "hsl(262 83% 58%)" }} />
        <span>الفرق المشاركة ({teams.length})</span>
      </div>
      {teams.map((team, i) => (
        <TeamCard key={team.id} team={team} index={i} />
      ))}
    </div>
  );
}
