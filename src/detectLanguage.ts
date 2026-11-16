import type { Language } from './types';

export const LANG_STORAGE_KEY = 'lang';

// Russian time zones: tzdb zone.tab, country code RU.
export const RU_TIMEZONES: ReadonlySet<string> = new Set([
  'Europe/Kaliningrad', 'Europe/Moscow', 'Europe/Kirov', 'Europe/Volgograd', 'Europe/Astrakhan',
  'Europe/Saratov', 'Europe/Ulyanovsk', 'Europe/Samara', 'Asia/Yekaterinburg', 'Asia/Omsk',
  'Asia/Novosibirsk', 'Asia/Barnaul', 'Asia/Tomsk', 'Asia/Novokuznetsk', 'Asia/Krasnoyarsk',
  'Asia/Irkutsk', 'Asia/Chita', 'Asia/Yakutsk', 'Asia/Khandyga', 'Asia/Vladivostok',
  'Asia/Ust-Nera', 'Asia/Magadan', 'Asia/Sakhalin', 'Asia/Srednekolymsk', 'Asia/Kamchatka',
  'Asia/Anadyr',
]);

// `auto` is true only when the visitor was switched to RU automatically:
// EN is the site default and needs no hint.
export type LanguageChoice = { lang: Language; auto: boolean };

function readStoredLanguage(): Language | null {
  try {
    const value = window.localStorage.getItem(LANG_STORAGE_KEY);
    return value === 'en' || value === 'ru' ? value : null;
  } catch {
    return null;
  }
}

export function storeLanguage(lang: Language) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Storage is unavailable (private mode, blocked): the choice lasts for this visit only.
  }
}

function prefersRussian() {
  try {
    if (RU_TIMEZONES.has(Intl.DateTimeFormat().resolvedOptions().timeZone)) return true;
    const languages = [...(navigator.languages ?? []), navigator.language];
    return languages.some((value) => typeof value === 'string' && /^ru(-|$)/i.test(value));
  } catch {
    return false;
  }
}

// Runs synchronously before the first render: no network, no flash of the other language.
export function detectLanguage(): LanguageChoice {
  const stored = readStoredLanguage();
  if (stored) return { lang: stored, auto: false };
  return prefersRussian() ? { lang: 'ru', auto: true } : { lang: 'en', auto: false };
}
