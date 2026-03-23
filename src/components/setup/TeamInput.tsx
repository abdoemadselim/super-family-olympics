"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/hooks/useSound";

export function TeamInput() {
  const [childName, setChildName] = useState("");
  const [adultName, setAdultName] = useState("");
  const addTeam = useGameStore((s) => s.addTeam);
  const sound = useSound();

  const handleAdd = () => {
    if (!childName.trim() || !adultName.trim()) return;
    sound.whoosh();
    addTeam(childName.trim(), adultName.trim());
    setChildName("");
    setAdultName("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-5 space-y-4 border border-sky-100">
      <div className="space-y-3">
        <div>
          <label className="flex items-center gap-1.5 text-sm font-bold mb-1.5" style={{ color: "#e74c8b" }}>
            <span>🧒</span> اسم البطل الصغير
          </label>
          <Input
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            onKeyDown={handleKey}
            className="text-right text-xl rounded-2xl h-14 bg-sky-50/50 text-black"
            style={{ borderColor: "hsl(210 30% 88%)" }}
            dir="rtl"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-sm font-bold mb-1.5" style={{ color: "#0dccf2" }}>
            <span>👨</span> اسم المساعد الكبير
          </label>
          <Input
            value={adultName}
            onChange={(e) => setAdultName(e.target.value)}
            onKeyDown={handleKey}
            className="text-right text-xl rounded-2xl h-14 bg-sky-50/50 text-black"
            style={{ borderColor: "hsl(210 30% 88%)" }}
            dir="rtl"
          />
        </div>
        <Button
          onClick={handleAdd}
          disabled={!childName.trim() || !adultName.trim()}
          className="w-full h-12 rounded-2xl text-white font-bold shadow-md transition-all active:scale-95 disabled:opacity-40 text-base"
          style={{ background: "linear-gradient(135deg, #f99e1f, #f97316)" }}
        >
          ➕ أضف فريق
        </Button>
      </div>
    </div>
  );
}
