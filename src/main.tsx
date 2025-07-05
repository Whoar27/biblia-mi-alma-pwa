import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Limpieza de localStorage en primer inicio/migración
// (function() {
//   const allowedKeys = ['theme-global', 'theme-lectura']; // agrega aquí las claves que SÍ quieres conservar
//   Object.keys(localStorage).forEach(key => {
//     if (!allowedKeys.includes(key)) {
//       localStorage.removeItem(key);
//     }
//   });
// })();

// Aplica el tema global ANTES de renderizar la app
(function() {
  try {
    const theme = localStorage.getItem('theme-global') || 'light';
    const bodyClass = theme === 'light' ? '' : theme;
    document.body.className = bodyClass;
  } catch (e) {}
})();

createRoot(document.getElementById("root")!).render(<App />);

// Registrar service worker para PWA
// DESACTIVADO TEMPORALMENTE - SOLO SE ACTIVARÁ AL FINAL
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
*/
