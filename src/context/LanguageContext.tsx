'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'ms'

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue>({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

// Per-page translation dict shape: { en: { key: string }, ms: { key: string } }
export type TranslationDict = Record<Lang, Record<string, string>>

export function useT(dict: TranslationDict) {
  const { lang } = useLang()
  return (key: string): string => dict[lang]?.[key] ?? dict['en'][key] ?? key
}
