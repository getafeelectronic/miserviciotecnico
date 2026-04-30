# Release Notes v1.4.0

## ♻️ Refactor

- **Eliminadas páginas no utilizadas del frontend**: se han eliminado `Dashboard.jsx`, `Login.jsx`, sus estilos asociados, `ProtectedRoute.jsx` y `authStore.js`. Ninguno de estos archivos estaba en uso en la aplicación pública, reduciendo el bundle final.

## ✨ Nuevas funcionalidades

- **Backend login**: añadido enlace a la web pública (`getafeelectronic.github.io/miserviciotecnico`) desde la página de login del panel de administración.
- **Servicios**: los enlaces a páginas de servicio (en la lista y en el footer) incluyen ahora el atributo `title` con el nombre del servicio, mejorando accesibilidad y SEO.
- **ServicioDetalle**: el botón de teléfono del CTA ahora lee el número desde la variable de entorno `VITE_BUSINESS_PHONE`, eliminando el valor hardcodeado.

## 🐛 Correcciones

- **ServicioDetalle**: eliminada la declaración de `navigate` (`useNavigate`) que no se utilizaba, evitando advertencias de linting.
