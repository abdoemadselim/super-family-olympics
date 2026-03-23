"use client";

import { useCallback, useRef } from "react";

type OscillatorType = "sine" | "square" | "triangle" | "sawtooth";

interface NoteConfig {
  freq: number;
  duration: number;
  delay: number;
  type?: OscillatorType;
  gain?: number;
}

function playNotes(notes: NoteConfig[]) {
  const ctx = new AudioContext();

  for (const note of notes) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = note.type ?? "sine";
    osc.frequency.value = note.freq;

    gainNode.gain.setValueAtTime(note.gain ?? 0.3, ctx.currentTime + note.delay);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + note.delay + note.duration
    );

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime + note.delay);
    osc.stop(ctx.currentTime + note.delay + note.duration);
  }
}

function playCorrect() {
  // Happy ascending arpeggio C-E-G-C
  playNotes([
    { freq: 523.25, duration: 0.15, delay: 0, type: "triangle", gain: 0.4 },
    { freq: 659.25, duration: 0.15, delay: 0.1, type: "triangle", gain: 0.4 },
    { freq: 783.99, duration: 0.15, delay: 0.2, type: "triangle", gain: 0.4 },
    { freq: 1046.5, duration: 0.3, delay: 0.3, type: "triangle", gain: 0.5 },
  ]);
}

function playWrong() {
  // Descending sad notes
  playNotes([
    { freq: 400, duration: 0.2, delay: 0, type: "sawtooth", gain: 0.2 },
    { freq: 300, duration: 0.2, delay: 0.15, type: "sawtooth", gain: 0.2 },
    { freq: 200, duration: 0.4, delay: 0.3, type: "sawtooth", gain: 0.15 },
  ]);
}

function playJoker() {
  // Magical sparkle sweep
  const notes: NoteConfig[] = [];
  for (let i = 0; i < 8; i++) {
    notes.push({
      freq: 800 + i * 200,
      duration: 0.1,
      delay: i * 0.05,
      type: "sine",
      gain: 0.2,
    });
  }
  notes.push({ freq: 2400, duration: 0.4, delay: 0.4, type: "triangle", gain: 0.3 });
  playNotes(notes);
}

function playTimerStart() {
  // Short click
  playNotes([
    { freq: 1000, duration: 0.05, delay: 0, type: "square", gain: 0.15 },
  ]);
}

function playTimerTick() {
  // Urgent tick
  playNotes([
    { freq: 880, duration: 0.06, delay: 0, type: "square", gain: 0.2 },
  ]);
}

function playTimerEnd() {
  // Buzzer alarm
  playNotes([
    { freq: 220, duration: 0.15, delay: 0, type: "square", gain: 0.3 },
    { freq: 220, duration: 0.15, delay: 0.2, type: "square", gain: 0.3 },
    { freq: 220, duration: 0.3, delay: 0.4, type: "square", gain: 0.35 },
  ]);
}

function playCategoryComplete() {
  // Triumphant fanfare
  playNotes([
    { freq: 523.25, duration: 0.2, delay: 0, type: "triangle", gain: 0.4 },
    { freq: 659.25, duration: 0.2, delay: 0.15, type: "triangle", gain: 0.4 },
    { freq: 783.99, duration: 0.2, delay: 0.3, type: "triangle", gain: 0.4 },
    { freq: 1046.5, duration: 0.15, delay: 0.45, type: "triangle", gain: 0.45 },
    { freq: 783.99, duration: 0.1, delay: 0.55, type: "triangle", gain: 0.35 },
    { freq: 1046.5, duration: 0.5, delay: 0.65, type: "triangle", gain: 0.5 },
  ]);
}

function playWhoosh() {
  // Whoosh/pop for next round or team added
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);

  gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.2);
}

function playGameStart() {
  // Rising excitement sweep
  const notes: NoteConfig[] = [];
  const freqs = [261.63, 329.63, 392, 523.25, 659.25, 783.99, 1046.5];
  for (let i = 0; i < freqs.length; i++) {
    notes.push({
      freq: freqs[i],
      duration: 0.12,
      delay: i * 0.08,
      type: "triangle",
      gain: 0.2 + i * 0.04,
    });
  }
  playNotes(notes);
}

export function useSound() {
  const lastTickRef = useRef(0);

  const correct = useCallback(() => playCorrect(), []);
  const wrong = useCallback(() => playWrong(), []);
  const joker = useCallback(() => playJoker(), []);
  const timerStart = useCallback(() => playTimerStart(), []);
  const timerTick = useCallback(() => {
    const now = Date.now();
    if (now - lastTickRef.current < 800) return;
    lastTickRef.current = now;
    playTimerTick();
  }, []);
  const timerEnd = useCallback(() => playTimerEnd(), []);
  const categoryComplete = useCallback(() => playCategoryComplete(), []);
  const whoosh = useCallback(() => playWhoosh(), []);
  const gameStart = useCallback(() => playGameStart(), []);

  return {
    correct,
    wrong,
    joker,
    timerStart,
    timerTick,
    timerEnd,
    categoryComplete,
    whoosh,
    gameStart,
  };
}
