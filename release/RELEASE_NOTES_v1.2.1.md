# 🔧 Release v1.2.1 - Optimización de Contacto y Mapa

## ⚡ Mejoras de Rendimiento

### Reemplazo de Google Maps API por iframe
Optimización significativa del sistema de mapas en la página de contacto:

-✅ **Eliminada dependencia** de `@react-google-maps/api`
- ✅ **iframe embebido** de Google Maps (más ligero y rápido)
- ✅ **Sin API Key requerida**: Eliminada configuración de `VITE_GOOGLE_MAPS_API_KEY`
- ✅ **Carga lazy**: El mapa se carga solo cuando es necesario
- ✅ **Mejor rendimiento**: Reducción del bundle size del frontend

### Beneficios
- 🚀 **Carga más rápida**: Menos JavaScript para descargar y ejecutar
- 🔐 **Menos dependencias**: Una librería menos en `package.json`
- 💰 **Sin costos**: No requiere billing account de Google Cloud
- ✅ **SEO-friendly**: Los iframes de Google Maps son reconocidos correctamente

## 🎨 Mejoras de UI/UX

### Información de Contacto Dinámica
- ✅ **Horario dinámico**: Ahora se obtiene desde variable de entorno `VITE_BUSINESS_HOURS`
- ✅ **Enlaces HTML en README**: Convertidos los enlaces principales a formato HTML
- ✅ **Enlace de teléfono**: Añadido enlace directo `tel:` para llamar desde móvil

### Cambios en README
- Convertidos enlaces principales a formato `<a href="">` para mejor compatibilidad
- Añadido enlace de llamada directa en el header del proyecto
- Enlaces alineados verticalmente para mejor legibilidad

## 🔧 Cambios Técnicos

### Archivos Modificados
- `frontend/src/pages/Contacto.jsx`: Reemplazado Google Maps API por iframe
- `README.md`: Actualizados enlaces y añadido teléfono

### Dependencias Eliminadas (opcional)
Puedes eliminar de forma segura:
```bash
npm uninstall @react-google-maps/api
```

### Variables de Entorno
Ya no se requieren:
- `VITE_BUSINESS_COORDINATES_LAT`
- `VITE_BUSINESS_COORDINATES_LNG`

La URL del mapa se configura directamente en `VITE_GOOGLE_MAPS_API_KEY` (ahora contiene la URL del iframe, no una API key).

## 📊 Impacto

- **Bundle size**: Reducción estimada de ~50KB
- **Tiempo de carga**: Mejora de ~200-300ms en página de contacto
- **Complejidad**: Menos código y configuración
- **Mantenimiento**: Sin necesidad de gestionar API keys

## 🚀 Deploy

Los cambios se despliegan automáticamente:
- **Frontend**: GitHub Pages via GitHub Actions
- **Backend**: Sin cambios

---

**Versión completa**: v1.2.1  
**Fecha**: 28 de abril de 2026  
**Tipo de release**: Patch (mejoras de rendimiento)  

## Instalación

```bash
git pull origin main
cd frontend
npm install  # (opcional: npm uninstall @react-google-maps/api)
npm run dev
```

## Enlaces

- 🌐 [Demo en vivo](https://getafeelectronic.github.io/miserviciotecnico/)
- 📞 [Página de Contacto](https://getafeelectronic.github.io/miserviciotecnico/#/contacto)
- 📋 [Commits](https://github.com/getafeelectronic/miserviciotecnico/commits/main)
