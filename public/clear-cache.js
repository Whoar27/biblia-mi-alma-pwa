// Script para limpiar cache del service worker
// Ejecutar en la consola del navegador para limpiar cache

if ('serviceWorker' in navigator) {
  // Desregistrar service worker
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('Service Worker desregistrado');
    }
  });
  
  // Limpiar cache
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
        console.log('Cache eliminado:', name);
      }
    });
  }
}

console.log('Cache limpiado. Recarga la página.'); 