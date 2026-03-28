"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/hooks/useSound";
import { CHARACTERS } from "@/data/characters";

export function TeamInput() {
  const [childName, setChildName] = useState("");
  const [adultName, setAdultName] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0].id);
  const addTeam = useGameStore((s) => s.addTeam);
  const sound = useSound();

  const handleAdd = () => {
    if (!childName.trim() || !adultName.trim()) return;
    sound.whoosh();
    addTeam(childName.trim(), adultName.trim(), selectedCharacter);
    setChildName("");
    setAdultName("");
    setSelectedCharacter(CHARACTERS[0].id);
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

        {/* Character picker */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-bold mb-2" style={{ color: "#7c3aed" }} dir="rtl">
            <span>🎭</span> اختر شخصيتك
          </label>
          <div className="grid grid-cols-4 gap-2">
            {CHARACTERS.map((char) => {
              const isSelected = selectedCharacter === char.id;
              return (
                <button
                  key={char.id}
                  type="button"
                  onClick={() => {
                    setSelectedCharacter(char.id);
                    sound.characterSelect(char.id);
                  }}
                  className="flex flex-col items-center justify-center gap-0.5 rounded-2xl py-2.5 px-1 border-2 transition-all active:scale-95"
                  style={{
                    borderColor: isSelected ? "#7c3aed" : "hsl(210 30% 88%)",
                    background: isSelected ? "hsl(262 60% 97%)" : "hsl(210 30% 98%)",
                    boxShadow: isSelected ? "0 0 0 3px hsl(262 60% 85%)" : undefined,
                  }}
                >
                  <span className="text-2xl leading-none">{char.emoji}</span>
                  <span
                    className="text-xs font-bold mt-0.5"
                    style={{ color: isSelected ? "#7c3aed" : "hsl(240 10% 50%)" }}
                  >
                    {char.name}
                  </span>
                </button>
              );
            })}
          </div>
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
