import { Category } from "@/types/game";
import scienceData from "./questions/science.json";
import mathData from "./questions/math.json";
import physicalData from "./questions/physical.json";
import footballData from "./questions/football.json";
import arabicData from "./questions/arabic.json";
import geographyData from "./questions/geography.json";
import synonymsData from "./questions/synonyms.json";
import riddlesData from "./questions/riddles.json";
import religionData from "./questions/religion.json";

export const CATEGORIES: Category[] = [
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
    id: "football",
    name: "كرة القدم",
    icon: "⚽",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
    questions: footballData.questions as Category["questions"],
    adultOnly: true,
  },
  {
    id: "arabic",
    name: "اللغة العربية",
    icon: "✍️",
    color: "text-teal-700",
    bgColor: "bg-teal-50 border-teal-200",
    questions: arabicData.questions as Category["questions"],
  },
  {
    id: "geography",
    name: "جغرافيا وسياحة",
    icon: "🗺️",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50 border-yellow-200",
    questions: geographyData.questions as Category["questions"],
    adultOnly: true,
  },
  {
    id: "synonyms",
    name: "المرادفات",
    icon: "🔤",
    color: "text-pink-700",
    bgColor: "bg-pink-50 border-pink-200",
    questions: synonymsData.questions as Category["questions"],
  },
  {
    id: "riddles",
    name: "أمثال وألغاز",
    icon: "💡",
    color: "text-amber-700",
    bgColor: "bg-amber-50 border-amber-200",
    questions: riddlesData.questions as Category["questions"],
  },
  {
    id: "religion",
    name: "الدين",
    icon: "🕌",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
    questions: religionData.questions as Category["questions"],
  },
];
