export type CategoryId = "science" | "math" | "physical" | "football" | "arabic" | "geography" | "synonyms" | "riddles" | "religion";

export interface Question {
  id: string;
  text: string;
  answer: string;
  choices?: string[];
  for: "child" | "adult";
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  questions: Question[];
  adultOnly?: boolean;
}

export interface Team {
  id: string;
  childName: string;
  adultName: string;
  scores: Record<CategoryId, number>;
  jokerUsed: Record<CategoryId, boolean>;
}

export type GamePhase = "setup" | "menu" | "game" | "category-result" | "leaderboard";

export interface RoundState {
  teamId: string;
  categoryId: CategoryId;
  roundIndex: number; // 0-4
  jokerActive: boolean;
  childQuestion: Question | null;
  adultQuestion: Question | null;
  childAnswered: boolean;
  adultAnswered: boolean;
}
