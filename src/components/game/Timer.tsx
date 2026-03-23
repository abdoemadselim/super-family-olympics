"use client";

import { useEffect, useRef } from "react";
import { useTimer } from "@/hooks/useTimer";
import { useSound } from "@/hooks/useSound";
import { Play, RotateCcw } from "lucide-react";

interface Props {
  label: string;
  bgColor: string;
  textColor: string;
}

export function Timer({ label, bgColor, textColor }: Props) {
  const { seconds, running, start, reset } = useTimer(60);
  const sound = useSound();
  const prevSecondsRef = useRef(60);
  const isLow = seconds <= 10 && seconds > 0;
  const isDone = seconds === 0;

  useEffect(() => {
    const prev = prevSecondsRef.current;
    prevSecondsRef.current = seconds;

    if (prev === seconds) return;

    if (seconds === 0 && prev > 0) {
      sound.timerEnd();
    } else if (isLow) {
      sound.timerTick();
    }
  }, [seconds, isLow, sound]);

  const handleStart = () => {
    sound.timerStart();
    start();
  };

  return (
    <div className="flex items-center gap-3" dir="rtl">
      <span className="text-sm shrink-0" style={{ color: "hsl(240 10% 55%)" }}>
        {label}
      </span>
      <div
        className="flex items-center gap-2 px-4 py-1.5 rounded-xl font-mono font-bold text-lg min-w-20 justify-center transition-all"
        style={{
          background: isDone ? "hsl(0 80% 95%)" : isLow ? "hsl(0 80% 95%)" : bgColor,
          color: isDone ? "hsl(0 80% 50%)" : isLow ? "hsl(0 80% 50%)" : textColor,
          animation: isLow ? "pulse 1s infinite" : "none",
        }}
      >
        <span>{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</span>
      </div>
      {!running && !isDone && (
        <button
          onClick={handleStart}
          className="w-8 h-8 rounded-full text-white flex items-center justify-center shadow-sm transition-transform active:scale-90"
          style={{ background: "linear-gradient(135deg, hsl(145 65% 42%), hsl(145 65% 52%))" }}
        >
          <Play className="w-3.5 h-3.5 fill-white" />
        </button>
      )}
      <button
        onClick={reset}
        className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-transform active:scale-90"
        style={{ background: "hsl(210 30% 92%)", color: "hsl(220 10% 50%)" }}
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
