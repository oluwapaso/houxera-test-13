import { LangContextType } from "@/components/types";
import { createContext } from "react";

export const LanguageContext = createContext<LangContextType | null>(null)