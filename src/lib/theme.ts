export function setBodyThemeFromGlobal() {
  const theme = localStorage.getItem('theme-global') || 'light';
  document.body.className = theme === 'light' ? '' : theme;
}

export function setBodyTheme(theme: string) {
  document.body.className = theme === 'light' ? '' : theme;
} 