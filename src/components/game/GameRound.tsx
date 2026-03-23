"use client";

import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { QuestionCard } from "./QuestionCard";
import { GameHeader } from "./GameHeader";
import { JokerButton } from "./JokerButton";
import { ArrowLeft } from "lucide-react";

export function GameRound() {
  const childQuestion = useGameStore((s) => s.childQuestion);
  const adultQuestion = useGameStore((s) => s.adultQuestion);
  const jokerActiveThisRound = useGameStore((s) => s.jokerActiveThisRound);
  const scoreAnswer = useGameStore((s) => s.scoreAnswer);
  const nextRound = useGameStore((s) => s.nextRound);

  const [childScored, setChildScored] = useState(false);
  const [adultScored, setAdultScored] = useState(false);

  const handleChildScore = (correct: boolean) => {
    scoreAnswer("child", correct);
    setChildScored(true);
  };

  const handleAdultScore = (correct: boolean) => {
    scoreAnswer("adult", correct);
    setAdultScored(true);
  };

  const handleNext = () => {
    setChildScored(false);
    setAdultScored(false);
    nextRound();
  };

  const canProceed = childScored && adultScored;

  return (
    <div className="space-y-4">
      <GameHeader />
      <JokerButton />

      {childQuestion && (
        <QuestionCard
          question={childQuestion}
          label="🧒 سؤال البطل الصغير"
          isKid={true}
          onScore={handleChildScore}
          jokerMultiplier={jokerActiveThisRound}
          scored={childScored}
        />
      )}

      {adultQuestion && (
        <QuestionCard
          question={adultQuestion}
          label="👨 سؤال المساعد الكبير"
          isKid={false}
          onScore={handleAdultScore}
          jokerMultiplier={jokerActiveThisRound}
          scored={adultScored}
        />
      )}

      <button
        onClick={handleNext}
        disabled={!canProceed}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg shadow-sm transition-all active:scale-95"
        style={{
          background: canProceed
            ? "linear-gradient(135deg, hsl(262 83% 58%), hsl(190 90% 50%))"
            : "hsl(45 20% 92%)",
          color: canProceed ? "white" : "hsl(240 10% 65%)",
          fontFamily: "Cairo, sans-serif",
          cursor: canProceed ? "pointer" : "not-allowed",
        }}
        dir="rtl"
      >
        <ArrowLeft className="w-5 h-5" />
        {canProceed ? "الفريق التالي / الجولة التالية" : "أجب على كلا السؤالين أولاً"}
      </button>
    </div>
  );
}
