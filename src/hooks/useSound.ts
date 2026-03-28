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

/** Play an audio file from /sounds/ folder */
function playAudioFile(filename: string, volume: number = 0.7) {
  const audio = new Audio(`/sounds/${filename}`);
  audio.volume = volume;
  audio.play().catch(() => {
    // Ignore autoplay errors silently
  });
}

/** Creates a wobbling oscillator (vibrato effect) for cartoon bounciness */
function playWobble(
  ctx: AudioContext,
  freq: number,
  duration: number,
  delay: number,
  wobbleSpeed: number,
  wobbleDepth: number,
  type: OscillatorType = "sine",
  gain: number = 0.3
) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  lfo.frequency.value = wobbleSpeed;
  lfoGain.gain.value = wobbleDepth;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  gainNode.gain.setValueAtTime(gain, ctx.currentTime + delay);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + delay + duration
  );

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
  lfo.start(ctx.currentTime + delay);
  lfo.stop(ctx.currentTime + delay + duration);
}

/** Creates a noise burst for pop/splash effects */
function playNoiseBurst(
  ctx: AudioContext,
  duration: number,
  delay: number,
  gain: number = 0.15
) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(gain, ctx.currentTime + delay);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + delay + duration
  );

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2000;
  filter.Q.value = 1;

  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  source.start(ctx.currentTime + delay);
  source.stop(ctx.currentTime + delay + duration);
}

function playCorrect() {
  // Kids voice: randomly pick between cheering and yay
  const voices = ["kids_cheering.mp3", "children_yay.mp3"];
  const pick = voices[Math.floor(Math.random() * voices.length)];
  playAudioFile(pick, 0.6);

  // Bouncy cartoon synth overlay
  const ctx = new AudioContext();
  playWobble(ctx, 523, 0.15, 0, 12, 30, "triangle", 0.25);
  playWobble(ctx, 659, 0.15, 0.1, 14, 35, "triangle", 0.25);
  playWobble(ctx, 784, 0.15, 0.2, 16, 40, "triangle", 0.3);
  playWobble(ctx, 1047, 0.35, 0.3, 8, 50, "triangle", 0.3);

  playNotes([
    { freq: 2093, duration: 0.08, delay: 0.32, type: "sine", gain: 0.08 },
    { freq: 2637, duration: 0.08, delay: 0.36, type: "sine", gain: 0.06 },
  ]);
}

function playWrong() {
  // Kids voice: disappointed "aww" or "oh no"
  const voices = ["audience_aww.mp3", "oh_no.wav"];
  const pick = voices[Math.floor(Math.random() * voices.length)];
  playAudioFile(pick, 0.6);

  // Funny cartoon "boing" spring sound
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.25);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.45);

  gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.5);

  playWobble(ctx, 180, 0.3, 0.05, 20, 60, "triangle", 0.1);
}

function playJoker() {
  // Magic spell sound + kids laughing
  playAudioFile("magic.wav", 0.5);
  setTimeout(() => {
    playAudioFile("kids_laughing.mp3", 0.5);
  }, 300);

  // Magical fairy dust synth
  const ctx = new AudioContext();
  const notes: NoteConfig[] = [];
  for (let i = 0; i < 12; i++) {
    notes.push({
      freq: 1000 + i * 180 + Math.sin(i) * 100,
      duration: 0.08,
      delay: i * 0.035,
      type: "sine",
      gain: 0.1 + (i / 12) * 0.08,
    });
  }
  notes.push({ freq: 2093, duration: 0.5, delay: 0.42, type: "sine", gain: 0.12 });
  notes.push({ freq: 2637, duration: 0.5, delay: 0.42, type: "sine", gain: 0.1 });
  playNotes(notes);

  playWobble(ctx, 1568, 0.4, 0.45, 6, 80, "sine", 0.1);
  playNoiseBurst(ctx, 0.03, 0.1, 0.04);
  playNoiseBurst(ctx, 0.03, 0.25, 0.04);
}

function playTimerStart() {
  // Playful "ready?" pop
  const ctx = new AudioContext();
  playNotes([
    { freq: 800, duration: 0.08, delay: 0, type: "triangle", gain: 0.25 },
    { freq: 1200, duration: 0.1, delay: 0.06, type: "triangle", gain: 0.3 },
  ]);
  playNoiseBurst(ctx, 0.04, 0, 0.08);
}

function playTimerTick() {
  // Playful bubble pop tick
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06);

  gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

function playTimerEnd() {
  // Funny cartoon alarm: wobbling siren + bad boing
  playAudioFile("bad_boing.wav", 0.5);

  const ctx = new AudioContext();
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const delay = i * 0.25;

    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, ctx.currentTime + delay);
    osc.frequency.linearRampToValueAtTime(700, ctx.currentTime + delay + 0.1);
    osc.frequency.linearRampToValueAtTime(400, ctx.currentTime + delay + 0.2);

    gainNode.gain.setValueAtTime(0.25, ctx.currentTime + delay);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + delay + 0.22
    );

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.22);
  }

  playWobble(ctx, 350, 0.4, 0.75, 15, 100, "triangle", 0.2);
}

function playCategoryComplete() {
  // Victory sounds + crowd cheer + kids voices
  playAudioFile("victory.wav", 0.5);
  setTimeout(() => {
    const voices = ["crowd_cheer.wav", "kids_cheering.mp3"];
    const pick = voices[Math.floor(Math.random() * voices.length)];
    playAudioFile(pick, 0.6);
  }, 200);

  // Carnival celebration fanfare synth
  const ctx = new AudioContext();
  const melody: NoteConfig[] = [
    { freq: 523, duration: 0.15, delay: 0, type: "triangle", gain: 0.25 },
    { freq: 659, duration: 0.15, delay: 0.12, type: "triangle", gain: 0.25 },
    { freq: 784, duration: 0.15, delay: 0.24, type: "triangle", gain: 0.3 },
    { freq: 1047, duration: 0.12, delay: 0.36, type: "triangle", gain: 0.3 },
    { freq: 784, duration: 0.08, delay: 0.45, type: "triangle", gain: 0.25 },
    { freq: 1047, duration: 0.4, delay: 0.52, type: "triangle", gain: 0.35 },
  ];
  melody.push(
    { freq: 659, duration: 0.4, delay: 0.52, type: "sine", gain: 0.1 },
    { freq: 784, duration: 0.4, delay: 0.52, type: "sine", gain: 0.08 }
  );
  playNotes(melody);

  playWobble(ctx, 1047, 0.5, 0.55, 6, 40, "triangle", 0.15);
  playNoiseBurst(ctx, 0.04, 0.36, 0.06);
  playNoiseBurst(ctx, 0.04, 0.52, 0.08);
}

function playWhoosh() {
  // Cartoon slide whistle with wobble
  playAudioFile("ding.wav", 0.3);

  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(250, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.18);

  lfo.frequency.value = 25;
  lfoGain.gain.value = 40;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.22);
  lfo.start();
  lfo.stop(ctx.currentTime + 0.22);

  playNoiseBurst(ctx, 0.04, 0.15, 0.08);
}

function playGameStart() {
  // Exciting intro: hooray sound + kids cheering
  playAudioFile("hooray.wav", 0.6);
  setTimeout(() => {
    playAudioFile("kids_cheering.mp3", 0.5);
  }, 400);

  // Bouncy ascending scale synth
  const ctx = new AudioContext();
  const freqs = [262, 330, 392, 523, 659, 784, 1047];
  for (let i = 0; i < freqs.length; i++) {
    playWobble(
      ctx,
      freqs[i],
      0.12,
      i * 0.08,
      10 + i * 2,
      15 + i * 5,
      "triangle",
      0.15 + i * 0.02
    );
  }

  const chordDelay = freqs.length * 0.08 + 0.05;
  playWobble(ctx, 1047, 0.6, chordDelay, 5, 30, "triangle", 0.25);
  playWobble(ctx, 784, 0.6, chordDelay, 5, 25, "sine", 0.1);

  playNoiseBurst(ctx, 0.05, chordDelay, 0.08);
}

const CHARACTER_SOUNDS: Record<string, string> = {
  wizard: "wizard_magic.mp3",
  warrior: "warrior_sword.mp3",
  hero: "hero_powerup.mp3",
  ninja: "ninja_swoosh.mp3",
  prince: "prince_fanfare.mp3",
  dragon: "dragon_roar.mp3",
  robot: "robot_blip.mp3",
  fox: "fox_yip.mp3",
};

function playCharacterSound(characterId: string) {
  const filename = CHARACTER_SOUNDS[characterId];
  if (filename) {
    playAudioFile(filename, 0.7);
  } else {
    playButtonClick();
  }
}

function playButtonClick() {
  // Quick playful "bloop"
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.06);

  gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
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
  const buttonClick = useCallback(() => playButtonClick(), []);
  const characterSelect = useCallback((id: string) => playCharacterSound(id), []);

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
    buttonClick,
    characterSelect,
  };
}
