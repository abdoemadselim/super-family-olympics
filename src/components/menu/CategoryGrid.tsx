"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/questions";
import { useGameStore } from "@/store/gameStore";
import { CategoryId } from "@/types/game";
import { CategoryCard } from "./CategoryCard";

export function CategoryGrid() {
  const [selectedId, setSelectedId] = useState<CategoryId | null>(null);
  const selectCategory = useGameStore((s) => s.selectCategory);
  const gameMode = useGameStore((s) => s.gameMode);
  const teams = useGameStore((s) => s.teams);

  const hideAdultOnly =
    gameMode === "solo" && teams.some((t) => t.playerType === "child");

  const visibleCategories = hideAdultOnly
    ? CATEGORIES.filter((cat) => !cat.adultOnly)
    : CATEGORIES;

  const handleStart = () => {
    if (selectedId) {
      selectCategory(selectedId);
    }
  };

  return (
    <div dir="rtl" className="space-y-3">
      <h3 className="font-semibold text-base text-center text-white/80">
        اختر مجال التحدي
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {visibleCategories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            selected={selectedId === cat.id}
            onSelect={setSelectedId}
          />
        ))}
      </div>
      <button
        onClick={handleStart}
        disabled={!selectedId}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg shadow-md transition-all active:scale-95"
        style={{
          background: selectedId
            ? "linear-gradient(135deg, #7c3bed, #0dccf2, #f99e1f)"
            : "hsl(210 20% 92%)",
          color: selectedId ? "white" : "hsl(240 10% 65%)",
          cursor: selectedId ? "pointer" : "not-allowed",
        }}
      >
        {selectedId ? "🚀 ابدأ التحدي!" : "اختر مجالاً أولاً"}
      </button>
    </div>
  );
}
