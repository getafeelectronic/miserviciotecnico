# Archivos Públicos Estáticos

Este directorio contiene archivos que se copian directamente al directorio `dist/` durante el build y se despliegan tal cual en GitHub Pages.

## Archivos incluidos

### SEO y Motores de Búsqueda

- **`robots.txt`**: Instrucciones para crawlers de motores de búsqueda
  - Permite indexación completa del sitio
  - Referencia al sitemap
  - Excluye páginas de error

- **`sitemap.xml`**: Mapa del sitio en formato XML
  - Lista todas las páginas públicas
  - Incluye prioridades y frecuencias de actualización
  - Ayuda a los motores de búsqueda a descubrir contenido

- **`humans.txt`**: Información sobre el equipo y tecnologías
  - Créditos del equipo
  - Stack tecnológico utilizado
  - Fecha de última actualización

### Funcionalidad

- **`.nojekyll`**: Indica a GitHub Pages que no use Jekyll
  - Necesario para que funcione correctamente Vite
  - Permite archivos que comienzan con guión bajo

- **`404.html`**: Página de error personalizada
  - Maneja rutas SPA en GitHub Pages
  - Guarda la ruta solicitada en sessionStorage
  - Redirige a index.html para recuperación

## Notas de Desarrollo

- Todos estos archivos se copian automáticamente durante `npm run build`
- No necesitan importarse en el código JavaScript/React
- Se acceden directamente desde la raíz del sitio desplegado
- Ejemplo: `https://tu-sitio.com/robots.txt`

## Mantenimiento

- **`sitemap.xml`**: Actualizar cuando se añaden/eliminan páginas
- **`robots.txt`**: Revisar cuando cambien requisitos de indexación
- **`humans.txt`**: Actualizar periódicamente con cambios del equipo/tecnología
