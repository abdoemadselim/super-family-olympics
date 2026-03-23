"use client";

import { Category } from "@/types/game";
import { useGameStore } from "@/store/gameStore";

interface Props {
  category: Category;
}

export function CategoryCard({ category }: Props) {
  const selectCategory = useGameStore((s) => s.selectCategory);
  const getRemainingQuestions = useGameStore((s) => s.getRemainingQuestions);
  const remaining = getRemainingQuestions(category.id);
  const depleted = remaining === 0;

  return (
    <button
      onClick={() => !depleted && selectCategory(category.id)}
      disabled={depleted}
      className={`
        relative flex flex-col items-center justify-center gap-2 rounded-3xl p-5 shadow-sm
        transition-all duration-200 active:scale-95 font-bold border-2
        ${depleted
          ? "opacity-40 cursor-not-allowed bg-white border-amber-100"
          : "bg-white border-amber-100 hover:shadow-md hover:-translate-y-0.5 hover:border-violet-200 cursor-pointer"
        }
      `}
      dir="rtl"
    >
      <span className="text-4xl">{category.icon}</span>
      <span
        className="text-sm font-bold"
        style={{ color: depleted ? "hsl(240 10% 60%)" : "hsl(240 20% 20%)", fontFamily: "Cairo, sans-serif" }}
      >
        {category.name}
      </span>
      <span
        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
        style={{
          background: depleted ? "hsl(45 20% 92%)" : "hsl(262 83% 96%)",
          color: depleted ? "hsl(240 10% 60%)" : "hsl(262 83% 58%)",
          fontFamily: "Cairo, sans-serif",
        }}
      >
        {depleted ? "انتهت" : `${remaining} سؤال`}
      </span>
    </button>
  );
}
