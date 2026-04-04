"use client";

import { useGameStore } from "@/store/gameStore";
import { ModeSelectScreen } from "@/components/screens/ModeSelectScreen";
import { SetupScreen } from "@/components/screens/SetupScreen";
import { MenuScreen } from "@/components/screens/MenuScreen";
import { GameScreen } from "@/components/screens/GameScreen";
import { CategoryResultScreen } from "@/components/screens/CategoryResultScreen";
import { GameOverScreen } from "@/components/screens/GameOverScreen";

export default function Home() {
  const phase = useGameStore((s) => s.phase);

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {phase === "mode-select" && <ModeSelectScreen />}
        {phase === "setup" && <SetupScreen />}
        {phase === "menu" && <MenuScreen />}
        {phase === "game" && <GameScreen />}
        {phase === "category-result" && <CategoryResultScreen />}
        {phase === "game-over" && <GameOverScreen />}
      </div>
    </main>
  );
}
