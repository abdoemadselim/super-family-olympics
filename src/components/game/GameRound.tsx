"use client";

import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { useSound } from "@/hooks/useSound";
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
  const sound = useSound();

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
    sound.whoosh();
    setChildScored(false);
    setAdultScored(false);
    nextRound();
  };

  const canProceed = (!childQuestion || childScored) && adultScored;

  return (
    <div className="space-y-4">
      <GameHeader />
      <JokerButton />

      {childQuestion && (
        <QuestionCard
          key={childQuestion.id}
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
          key={adultQuestion.id}
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
            ? "linear-gradient(135deg, #7c3bed, #0dccf2, #f99e1f)"
            : "hsl(210 20% 92%)",
          color: canProceed ? "white" : "hsl(240 10% 65%)",
          cursor: canProceed ? "pointer" : "not-allowed",
        }}
        dir="rtl"
      >
        <ArrowLeft className="w-5 h-5" />
        {canProceed ? "الفريق التالي / الجولة التالية" : childQuestion ? "أجب على كلا السؤالين أولاً" : "أجب على السؤال أولاً"}
      </button>
    </div>
  );
}
