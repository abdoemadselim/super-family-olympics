export interface Character {
  id: string;
  name: string;
  emoji: string;
}

export const CHARACTERS: Character[] = [
  { id: "wizard", name: "ساحر", emoji: "🧙" },
  { id: "warrior", name: "محارب", emoji: "🤺" },
  { id: "hero", name: "بطل", emoji: "🦸" },
  { id: "ninja", name: "نينجا", emoji: "🥷" },
  { id: "prince", name: "أمير", emoji: "🤴" },
  { id: "dragon", name: "تنين", emoji: "🐉" },
  { id: "robot", name: "روبوت", emoji: "🤖" },
  { id: "fox", name: "ثعلب", emoji: "🦊" },
];
