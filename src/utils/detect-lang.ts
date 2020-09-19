export function detectLang(): string | undefined {
  const lang = document.documentElement.getAttribute('lang');
  return lang || undefined;
}
