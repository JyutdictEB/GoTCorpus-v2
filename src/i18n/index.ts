import en from './en';
import yue from './yue';

export const messages = { en, yue };
export type Locale = keyof typeof messages;
/** 文案结构以 en 为准（en 与 yue 同构）*/
export type Messages = typeof en;
export const LOCALES: Locale[] = ['en', 'yue'];
export const HTML_LANG: Record<Locale, string> = { en: 'en', yue: 'yue' };

/** yue 用 ISO 639-3 代码（粤语），不是 zh-HK —— 内容语言係粤文，唔係标准书面中文 */
export function localizedPath(locale: Locale, p: string): string {
  const clean = p === '/' ? '' : p;
  return locale === 'en' ? clean || '/' : '/yue' + clean;
}

export function altPath(
  locale: Locale,
  p: string,
): { locale: Locale; href: string }[] {
  return LOCALES.map((l) => ({ locale: l, href: localizedPath(l, p) }));
}
