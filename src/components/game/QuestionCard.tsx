"use client";

import { useState } from "react";
import { Question } from "@/types/game";
import { Timer } from "./Timer";
import { useSound } from "@/hooks/useSound";
import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  question: Question;
  label: string;
  isKid: boolean;
  onScore: (correct: boolean) => void;
  jokerMultiplier: boolean;
  scored: boolean;
}

export function QuestionCard({ question, label, isKid, onScore, jokerMultiplier, scored }: Props) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const sound = useSound();

  const hasChoices = question.choices && question.choices.length > 0;

  const handleChoiceSelect = (choice: string) => {
    if (scored) return;
    const correct = choice === question.answer;
    setSelectedChoice(choice);
    if (correct) sound.correct();
    else sound.wrong();
    onScore(correct);
  };

  const handleScore = (correct: boolean) => {
    if (correct) sound.correct();
    else sound.wrong();
    onScore(correct);
  };

  const headerGradient = isKid
    ? "linear-gradient(135deg, hsl(0 80% 60%), hsl(35 95% 55%))"
    : "linear-gradient(135deg, hsl(210 80% 55%), hsl(190 90% 50%))";

  const timerBg = isKid ? "hsl(0 80% 97%)" : "hsl(210 80% 97%)";
  const timerColor = isKid ? "hsl(0 80% 50%)" : "hsl(210 80% 45%)";

  const getChoiceStyle = (choice: string) => {
    if (!selectedChoice) {
      return {
        background: "white",
        borderColor: "hsl(210 30% 88%)",
        color: "hsl(220 15% 30%)",
      };
    }
    if (choice === question.answer) {
      return {
        background: "hsl(145 65% 93%)",
        borderColor: "hsl(145 65% 50%)",
        color: "hsl(145 65% 25%)",
      };
    }
    if (choice === selectedChoice) {
      return {
        background: "hsl(0 84% 95%)",
        borderColor: "hsl(0 84% 60%)",
        color: "hsl(0 84% 35%)",
      };
    }
    return {
      background: "hsl(210 20% 96%)",
      borderColor: "hsl(210 20% 88%)",
      color: "hsl(220 10% 55%)",
    };
  };

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-sky-100" dir="rtl">
      {/* Header with question */}
      <div className="px-5 py-5" style={{ background: headerGradient }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/90 font-bold text-sm">
            {label}
          </span>
          {jokerMultiplier && (
            <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-bold">
              🃏 جوكر مفعّل!
            </span>
          )}
        </div>
        <p className="text-white text-xl font-bold leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {hasChoices ? (
          <>
            {/* Choices */}
            <p className="text-xs font-semibold" style={{ color: "hsl(240 10% 55%)" }}>
              اختر الإجابة الصحيحة:
            </p>
            <div className="space-y-2.5">
              {question.choices!.map((choice, index) => {
                const style = getChoiceStyle(choice);
                const isCorrectRevealed = selectedChoice && choice === question.answer;
                const isWrongSelected = selectedChoice && choice === selectedChoice && choice !== question.answer;

                return (
                  <button
                    key={index}
                    onClick={() => handleChoiceSelect(choice)}
                    disabled={!!selectedChoice}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-right font-bold text-base transition-all active:scale-[0.98]"
                    style={{
                      ...style,
                      cursor: selectedChoice ? "default" : "pointer",
                    }}
                  >
                    <span className="flex-1">{choice}</span>
                    {isCorrectRevealed && <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "hsl(145 65% 40%)" }} />}
                    {isWrongSelected && <XCircle className="w-5 h-5 shrink-0" style={{ color: "hsl(0 84% 50%)" }} />}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Fallback for physical challenges: keep manual scoring */}
            {!scored ? (
              <div className="flex gap-3">
                <button
                  onClick={() => handleScore(true)}
                  className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-2xl shadow-sm transition-all active:scale-95 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, hsl(145 65% 42%), hsl(145 65% 52%))",
                  }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  صح ✓
                </button>
                <button
                  onClick={() => handleScore(false)}
                  className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-2xl shadow-sm transition-all active:scale-95 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, hsl(0 84% 60%), hsl(0 84% 70%))",
                  }}
                >
                  <XCircle className="w-5 h-5" />
                  خطأ ✗
                </button>
              </div>
            ) : (
              <div
                className="text-center text-sm font-semibold py-2 rounded-2xl"
                style={{ background: "hsl(145 65% 95%)", color: "hsl(145 65% 35%)" }}
              >
                ✓ تم التسجيل
              </div>
            )}
          </>
        )}

        {/* Timer */}
        <Timer
          label="المؤقت"
          bgColor={timerBg}
          textColor={timerColor}
        />

        {/* Scored confirmation for choices */}
        {hasChoices && scored && (
          <div
            className="text-center text-sm font-semibold py-2 rounded-2xl"
            style={{
              background: selectedChoice === question.answer ? "hsl(145 65% 95%)" : "hsl(0 84% 95%)",
              color: selectedChoice === question.answer ? "hsl(145 65% 35%)" : "hsl(0 84% 40%)",
            }}
          >
            {selectedChoice === question.answer ? "✓ إجابة صحيحة!" : `✗ الإجابة الصحيحة: ${question.answer}`}
          </div>
        )}
      </div>
    </div>
  );
}
