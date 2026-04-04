import { create } from "zustand";
import { CategoryId, GameMode, GamePhase, Question, Team } from "@/types/game";
import { CATEGORIES } from "@/data/questions";

const ALL_CATEGORY_IDS: CategoryId[] = CATEGORIES.map((c) => c.id);

interface QuestionBank {
  [categoryId: string]: {
    child: Question[];
    adult: Question[];
  };
}

interface GameStore {
  gameMode: GameMode;
  phase: GamePhase;
  teams: Team[];
  currentTeamIndex: number;
  currentCategoryId: CategoryId | null;
  currentRoundIndex: number; // 0-4
  questionBank: QuestionBank;
  completedCategories: CategoryId[];

  // Current round
  childQuestion: Question | null;
  adultQuestion: Question | null;
  jokerActiveThisRound: boolean;

  // Actions
  setGameMode: (mode: GameMode) => void;
  addTeam: (childName: string, adultName: string, character: string, playerType?: "child" | "adult") => void;
  removeTeam: (id: string) => void;
  startGame: () => void;
  resetGame: () => void;
  selectCategory: (categoryId: CategoryId) => void;
  activateJoker: () => void;
  scoreAnswer: (playerType: "child" | "adult", correct: boolean) => void;
  nextRound: () => void;
  getRemainingQuestions: (categoryId: CategoryId) => number;
  backToSetup: () => void;
  backToMenu: () => void;
  finishCategory: () => void;
}

function initQuestionBank(): QuestionBank {
  const bank: QuestionBank = {};
  for (const cat of CATEGORIES) {
    bank[cat.id] = {
      child: [...cat.questions.filter((q) => q.for === "child")],
      adult: [...cat.questions.filter((q) => q.for === "adult")],
    };
  }
  return bank;
}

function createTeam(childName: string, adultName: string, character: string, playerType?: "child" | "adult"): Team {
  return {
    id: Math.random().toString(36).slice(2),
    childName,
    adultName,
    character,
    playerType,
    scores: {
      science: 0,
      math: 0,
      physical: 0,
      football: 0,
      arabic: 0,
      geography: 0,
      synonyms: 0,
      riddles: 0,
      religion: 0,
    },
    jokerUsed: {
      science: false,
      math: false,
      physical: false,
      football: false,
      arabic: false,
      geography: false,
      synonyms: false,
      riddles: false,
      religion: false,
    },
  };
}

function drawQuestion(bank: QuestionBank, categoryId: string, playerType: "child" | "adult"): Question | null {
  const pool = bank[categoryId][playerType];
  if (pool.length === 0) return null;
  const idx = Math.floor(Math.random() * pool.length);
  const [question] = pool.splice(idx, 1);
  return question;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameMode: "team",
  phase: "mode-select",
  teams: [],
  currentTeamIndex: 0,
  currentCategoryId: null,
  currentRoundIndex: 0,
  questionBank: initQuestionBank(),
  completedCategories: [],
  childQuestion: null,
  adultQuestion: null,
  jokerActiveThisRound: false,

  setGameMode: (mode) => {
    set({ gameMode: mode, phase: "setup" });
  },

  addTeam: (childName, adultName, character, playerType?) => {
    set((s) => ({ teams: [...s.teams, createTeam(childName, adultName, character, playerType)] }));
  },

  removeTeam: (id) => {
    set((s) => ({ teams: s.teams.filter((t) => t.id !== id) }));
  },

  startGame: () => {
    set({ phase: "menu", currentTeamIndex: 0 });
  },

  resetGame: () => {
    set({
      gameMode: "team",
      phase: "mode-select",
      teams: [],
      currentTeamIndex: 0,
      currentCategoryId: null,
      currentRoundIndex: 0,
      questionBank: initQuestionBank(),
      completedCategories: [],
      childQuestion: null,
      adultQuestion: null,
      jokerActiveThisRound: false,
    });
  },

  selectCategory: (categoryId) => {
    const { questionBank, teams, gameMode } = get();
    const category = CATEGORIES.find((c) => c.id === categoryId);
    const resetTeams = teams.map((t) => ({
      ...t,
      scores: { ...t.scores, [categoryId]: 0 },
      jokerUsed: { ...t.jokerUsed, [categoryId]: false },
    }));

    let childQ: Question | null;
    let adultQ: Question | null;

    if (gameMode === "solo") {
      const firstPlayer = resetTeams[0];
      childQ = drawQuestion(questionBank, categoryId, firstPlayer.playerType!);
      adultQ = null;
    } else {
      childQ = category?.adultOnly ? null : drawQuestion(questionBank, categoryId, "child");
      adultQ = drawQuestion(questionBank, categoryId, "adult");
    }

    set({
      phase: "game",
      teams: resetTeams,
      currentCategoryId: categoryId,
      currentRoundIndex: 0,
      currentTeamIndex: 0,
      childQuestion: childQ,
      adultQuestion: adultQ,
      jokerActiveThisRound: false,
    });
  },

  activateJoker: () => {
    set({ jokerActiveThisRound: true });
  },

  scoreAnswer: (playerType, correct) => {
    const { teams, currentTeamIndex, currentCategoryId, jokerActiveThisRound } = get();
    if (!currentCategoryId) return;

    let points = 0;
    if (jokerActiveThisRound) {
      points = correct ? 10 : -5;
    } else {
      points = correct ? 5 : 0;
    }

    const updated = teams.map((t, i) => {
      if (i !== currentTeamIndex) return t;
      return {
        ...t,
        scores: {
          ...t.scores,
          [currentCategoryId]: t.scores[currentCategoryId] + points,
        },
        jokerUsed: jokerActiveThisRound
          ? { ...t.jokerUsed, [currentCategoryId]: true }
          : t.jokerUsed,
      };
    });

    set({ teams: updated });
  },

  nextRound: () => {
    const { currentRoundIndex, currentTeamIndex, teams, currentCategoryId, questionBank, gameMode } = get();
    const isLastTeam = currentTeamIndex === teams.length - 1;
    const isLastRound = currentRoundIndex === 4;

    if (isLastTeam && isLastRound) {
      set({ phase: "category-result" });
      return;
    }

    let nextTeamIndex: number;
    let nextRoundIndex: number;

    if (isLastTeam) {
      nextTeamIndex = 0;
      nextRoundIndex = currentRoundIndex + 1;
    } else {
      nextTeamIndex = currentTeamIndex + 1;
      nextRoundIndex = currentRoundIndex;
    }

    let childQ: Question | null;
    let adultQ: Question | null;

    if (gameMode === "solo") {
      const nextPlayer = teams[nextTeamIndex];
      childQ = drawQuestion(questionBank!, currentCategoryId!, nextPlayer.playerType!);
      adultQ = null;
    } else {
      const category = CATEGORIES.find((c) => c.id === currentCategoryId);
      childQ = category?.adultOnly ? null : drawQuestion(questionBank!, currentCategoryId!, "child");
      adultQ = drawQuestion(questionBank!, currentCategoryId!, "adult");
    }

    set({
      currentTeamIndex: nextTeamIndex,
      currentRoundIndex: nextRoundIndex,
      childQuestion: childQ,
      adultQuestion: adultQ,
      jokerActiveThisRound: false,
    });
  },

  backToSetup: () => {
    set({ phase: "setup" });
  },

  backToMenu: () => {
    const { teams, currentCategoryId } = get();
    const resetTeams = currentCategoryId
      ? teams.map((t) => ({
          ...t,
          scores: { ...t.scores, [currentCategoryId]: 0 },
          jokerUsed: { ...t.jokerUsed, [currentCategoryId]: false },
        }))
      : teams;
    set({
      phase: "menu",
      teams: resetTeams,
      currentCategoryId: null,
      currentRoundIndex: 0,
      childQuestion: null,
      adultQuestion: null,
      jokerActiveThisRound: false,
    });
  },

  finishCategory: () => {
    const { currentCategoryId, completedCategories } = get();
    if (!currentCategoryId) return;

    const updated = completedCategories.includes(currentCategoryId)
      ? completedCategories
      : [...completedCategories, currentCategoryId];

    const allDone = ALL_CATEGORY_IDS.every((id) => updated.includes(id));

    set({
      phase: allDone ? "game-over" : "menu",
      completedCategories: updated,
      currentCategoryId: null,
      currentRoundIndex: 0,
      childQuestion: null,
      adultQuestion: null,
      jokerActiveThisRound: false,
    });
  },

  getRemainingQuestions: (categoryId) => {
    const { questionBank } = get();
    const pool = questionBank[categoryId];
    return pool.child.length + pool.adult.length;
  },
}));
