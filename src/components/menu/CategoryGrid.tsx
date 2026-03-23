"use client";

import { CATEGORIES } from "@/data/questions";
import { CategoryCard } from "./CategoryCard";

export function CategoryGrid() {
  return (
    <div dir="rtl" className="space-y-3">
      <h3 className="font-semibold text-base text-center text-white/80">
        اختر مجال التحدي
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
