"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
import { Plus } from "lucide-react";

export function TeamInput() {
  const [childName, setChildName] = useState("");
  const [adultName, setAdultName] = useState("");
  const addTeam = useGameStore((s) => s.addTeam);

  const handleAdd = () => {
    if (!childName.trim() || !adultName.trim()) return;
    addTeam(childName.trim(), adultName.trim());
    setChildName("");
    setAdultName("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-5 space-y-4 border border-amber-100">
      <div className="flex gap-3 items-end">
        <div className="flex-1 space-y-3">
          <div>
            <Input
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              onKeyDown={handleKey}
              placeholder="اسم البطل الصغير..."
              className="text-right text-base rounded-2xl h-12 bg-amber-50/50 placeholder:text-slate-400"
              style={{ borderColor: "hsl(45 30% 85%)", fontFamily: "Cairo, sans-serif" }}
              dir="rtl"
            />
          </div>
          <div>
            <Input
              value={adultName}
              onChange={(e) => setAdultName(e.target.value)}
              onKeyDown={handleKey}
              placeholder="اسم المساعد الكبير..."
              className="text-right text-base rounded-2xl h-12 bg-amber-50/50 placeholder:text-slate-400"
              style={{ borderColor: "hsl(45 30% 85%)", fontFamily: "Cairo, sans-serif" }}
              dir="rtl"
            />
          </div>
        </div>
        <Button
          onClick={handleAdd}
          disabled={!childName.trim() || !adultName.trim()}
          className="w-12 h-12 rounded-full text-white font-bold shrink-0 shadow-md transition-all disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, hsl(262 83% 58%), hsl(190 90% 50%))" }}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
