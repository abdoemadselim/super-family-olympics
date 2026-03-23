"use client";

import { useState } from "react";
import { Question } from "@/types/game";
import { Timer } from "./Timer";
import { Eye, CheckCircle2, XCircle } from "lucide-react";

interface Props {
  question: Question;
  label: string;
  isKid: boolean;
  onScore: (correct: boolean) => void;
  jokerMultiplier: boolean;
  scored: boolean;
}

export function QuestionCard({ question, label, isKid, onScore, jokerMultiplier, scored }: Props) {
  const [revealed, setRevealed] = useState(false);

  const headerGradient = isKid
    ? "linear-gradient(135deg, hsl(0 80% 60%), hsl(35 95% 55%))"
    : "linear-gradient(135deg, hsl(210 80% 55%), hsl(190 90% 50%))";

  const timerBg = isKid ? "hsl(0 80% 97%)" : "hsl(210 80% 97%)";
  const timerColor = isKid ? "hsl(0 80% 50%)" : "hsl(210 80% 45%)";

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-amber-100" dir="rtl">
      {/* Header with question */}
      <div className="px-5 py-5" style={{ background: headerGradient }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/90 font-bold text-sm" style={{ fontFamily: "Cairo, sans-serif" }}>
            {label}
          </span>
          {jokerMultiplier && (
            <span
              className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-bold"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              🃏 جوكر مفعّل!
            </span>
          )}
        </div>
        <p className="text-white text-xl font-bold leading-relaxed" style={{ fontFamily: "Cairo, sans-serif" }}>
          {question.text}
        </p>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Answer reveal */}
        <p className="text-xs font-semibold" style={{ color: "hsl(240 10% 55%)", fontFamily: "Cairo, sans-serif" }}>
          الإجابة الصحيحة:
        </p>
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border text-sm font-medium transition-colors hover:bg-amber-50"
            style={{ borderColor: "hsl(45 30% 85%)", color: "hsl(240 10% 55%)", fontFamily: "Cairo, sans-serif" }}
          >
            <Eye className="w-4 h-4" />
            اضغط للكشف
          </button>
        ) : (
          <div
            className="rounded-2xl px-4 py-3 border"
            style={{ background: "hsl(262 83% 97%)", borderColor: "hsl(262 83% 88%)" }}
          >
            <p className="font-bold text-base" style={{ color: "hsl(262 83% 45%)", fontFamily: "Cairo, sans-serif" }}>
              {question.answer}
            </p>
          </div>
        )}

        {/* Timer */}
        <Timer
          label="المؤقت"
          bgColor={timerBg}
          textColor={timerColor}
        />

        {/* Score buttons */}
        {!scored ? (
          <div className="flex gap-3">
            <button
              onClick={() => onScore(true)}
              className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-2xl shadow-sm transition-all active:scale-95 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, hsl(145 65% 42%), hsl(145 65% 52%))",
                fontFamily: "Cairo, sans-serif",
              }}
            >
              <CheckCircle2 className="w-5 h-5" />
              صح ✓
            </button>
            <button
              onClick={() => onScore(false)}
              className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-2xl shadow-sm transition-all active:scale-95 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, hsl(0 84% 60%), hsl(0 84% 70%))",
                fontFamily: "Cairo, sans-serif",
              }}
            >
              <XCircle className="w-5 h-5" />
              خطأ ✗
            </button>
          </div>
        ) : (
          <div
            className="text-center text-sm font-semibold py-2 rounded-2xl"
            style={{ background: "hsl(145 65% 95%)", color: "hsl(145 65% 35%)", fontFamily: "Cairo, sans-serif" }}
          >
            ✓ تم التسجيل
          </div>
        )}
      </div>
    </div>
  );
}
