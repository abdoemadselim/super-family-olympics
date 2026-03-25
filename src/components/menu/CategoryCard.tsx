"use client";

import { Category, CategoryId } from "@/types/game";
import { useGameStore } from "@/store/gameStore";

interface Props {
  category: Category;
  selected: boolean;
  onSelect: (id: CategoryId) => void;
}

export function CategoryCard({ category, selected, onSelect }: Props) {
  const getRemainingQuestions = useGameStore((s) => s.getRemainingQuestions);
  const remaining = getRemainingQuestions(category.id);
  const depleted = remaining === 0;

  return (
    <button
      onClick={() => !depleted && onSelect(category.id)}
      disabled={depleted}
      className={`
        relative flex flex-col items-center justify-center gap-2 rounded-3xl p-5 shadow-sm
        transition-all duration-200 active:scale-95 font-bold border-2
        ${depleted
          ? "opacity-40 cursor-not-allowed bg-white border-sky-100"
          : selected
            ? "bg-white border-teal-500 shadow-lg ring-4 ring-teal-400/60 scale-105"
            : "bg-white border-sky-100 hover:shadow-md hover:-translate-y-0.5 hover:border-teal-200"
        }
      `}
      dir="rtl"
    >
      <span className="text-4xl">{category.icon}</span>
      <span
        className="text-sm font-bold"
        style={{ color: depleted ? "hsl(220 10% 60%)" : "hsl(240 20% 20%)" }}
      >
        {category.name}
      </span>
      {category.adultOnly && (
        <span
          className="text-xs px-2 py-0.5 rounded-full font-bold"
          style={{ background: "hsl(262 60% 93%)", color: "hsl(262 60% 45%)" }}
        >
          للكبار فقط
        </span>
      )}
      <span
        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
        style={{
          background: depleted ? "hsl(210 20% 92%)" : "hsl(174 60% 95%)",
          color: depleted ? "hsl(220 10% 60%)" : "hsl(174 60% 35%)",
        }}
      >
        {depleted ? "انتهت" : `${remaining} سؤال`}
      </span>
    </button>
  );
}
