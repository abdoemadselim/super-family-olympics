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
  const gameMode = useGameStore((s) => s.gameMode);
  const teams = useGameStore((s) => s.teams);
  const currentTeamIndex = useGameStore((s) => s.currentTeamIndex);
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

  const canProceed = gameMode === "solo"
    ? (!childQuestion || childScored)
    : (!childQuestion || childScored) && adultScored;

  const currentTeam = teams[currentTeamIndex];
  const soloLabel = currentTeam?.playerType === "child" ? "🧒 سؤالك" : "👨 سؤالك";

  return (
    <div className="space-y-4">
      <GameHeader />
      <JokerButton />

      {childQuestion && (
        <QuestionCard
          key={childQuestion.id}
          question={childQuestion}
          label={gameMode === "solo" ? soloLabel : "🧒 سؤال البطل الصغير"}
          isKid={gameMode === "solo" ? currentTeam?.playerType === "child" : true}
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
        {canProceed
          ? (gameMode === "solo" ? "اللاعب التالي / الجولة التالية" : "الفريق التالي / الجولة التالية")
          : (gameMode === "solo" ? "أجب على السؤال أولاً" : (childQuestion ? "أجب على كلا السؤالين أولاً" : "أجب على السؤال أولاً"))}
      </button>
    </div>
  );
}
