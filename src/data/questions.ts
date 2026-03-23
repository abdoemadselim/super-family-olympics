import { Category } from "@/types/game";
import religionData from "./questions/religion.json";
import scienceData from "./questions/science.json";
import mathData from "./questions/math.json";
import physicalData from "./questions/physical.json";
import cultureData from "./questions/culture.json";

export const CATEGORIES: Category[] = [
  {
    id: "religion",
    name: "الدين",
    icon: "🌙",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
    questions: religionData.questions as Category["questions"],
  },
  {
    id: "science",
    name: "العلوم",
    icon: "🔬",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
    questions: scienceData.questions as Category["questions"],
  },
  {
    id: "math",
    name: "الرياضيات",
    icon: "🔢",
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
    questions: mathData.questions as Category["questions"],
  },
  {
    id: "physical",
    name: "تحدي حركي",
    icon: "🏃",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200",
    questions: physicalData.questions as Category["questions"],
  },
  {
    id: "culture",
    name: "ثقافة عامة",
    icon: "🌍",
    color: "text-red-700",
    bgColor: "bg-red-50 border-red-200",
    questions: cultureData.questions as Category["questions"],
  },
];
