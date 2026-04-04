"use client";

import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/hooks/useSound";
import { Users, User } from "lucide-react";

export function ModeSelectScreen() {
  const setGameMode = useGameStore((s) => s.setGameMode);
  const sound = useSound();

  const handleSelect = (mode: "solo" | "team") => {
    sound.whoosh();
    setGameMode(mode);
  };

  return (
    <div className="space-y-8 pt-10" dir="rtl">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-black text-white drop-shadow-md leading-relaxed">
          🏆 سوبر أولمبياد العائلة 🎮
        </h1>
        <p className="text-white/80 text-base">
          ⭐ اختر نوع المسابقة ⭐
        </p>
      </div>

      {/* Mode buttons */}
      <div className="space-y-4">
        <button
          onClick={() => handleSelect("team")}
          className="w-full bg-white rounded-3xl shadow-md p-6 border border-sky-100 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3bed, #0dccf2)" }}
          >
            <Users className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-right">
            <h2 className="font-black text-xl" style={{ color: "hsl(240 20% 15%)" }}>
              مسابقة فريق
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "hsl(240 10% 50%)" }}>
              فرق من طفل وكبير تتنافس مع بعض
            </p>
          </div>
        </button>

        <button
          onClick={() => handleSelect("solo")}
          className="w-full bg-white rounded-3xl shadow-md p-6 border border-sky-100 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #f99e1f, #f97316)" }}
          >
            <User className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-right">
            <h2 className="font-black text-xl" style={{ color: "hsl(240 20% 15%)" }}>
              مسابقة فردي
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "hsl(240 10% 50%)" }}>
              لاعب ضد لاعب، واحد لواحد
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
