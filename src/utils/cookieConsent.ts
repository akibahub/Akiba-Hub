/**
 * Client-safe CookieYes preference utility
 */
export function openCookiePreferences(): void {
  if (typeof document === "undefined") return;

  const revisitButton = document.querySelector<HTMLElement>(
    ".cky-btn-revisit-wrapper"
  );

  if (revisitButton) {
    revisitButton.click();
    return;
  }

  console.warn("CookieYes preference control was not found.");
}
