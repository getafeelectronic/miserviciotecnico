# Release v1.3.0 - Páginas Legales y Mejoras de Analytics

## 🎉 Nuevas Características

### 📋 Páginas Legales Completas
- **Política de Privacidad** (`/privacidad`): Documento GDPR-compliant con 13 secciones detalladas
  - Recopilación y uso de datos
  - Base legal y derechos GDPR
  - Política de cookies
  - Medidas de seguridad
  - Retención de datos y contacto
- **Términos de Servicio** (`/terminos`): Condiciones completas con 14 secciones
  - Proceso de servicio y garantías (6 meses)
  - Precios y métodos de pago
  - Responsabilidades y limitaciones
  - Resolución de disputas
  - Propiedad intelectual

### 🎨 Mejoras de UX
- **ScrollToTop**: Navegación automática al inicio al cambiar de página
- **Imágenes redondeadas**: Esquinas suaves en tarjetas de servicios
- **Diseño consistente**: Fondos blancos en todas las páginas

### 📊 Analytics Mejorado
- Tracking completo en página de servicios (`/servicios`)
- Tracking individual por servicio con slug (`/servicios/:slug`)
- Registro de visitas en páginas legales
- Métricas de permanencia y conversión

## 🔧 Cambios Técnicos

### Componentes Nuevos
- `ScrollToTop.jsx`: Hook de navegación para mejorar UX
- `PrivacyPolicy.jsx` + `PrivacyPolicy.css`: Página legal con SEO optimizado
- `TermsOfService.jsx` + `TermsOfService.css`: Términos con iconografía Lucide

### Rutas Añadidas
```jsx
/privacidad   → PrivacyPolicy
/terminos     → TermsOfService
```

### Archivos Modificados
- `App.jsx`: Rutas legales y ScrollToTop integrado
- `Servicios.jsx`: Analytics + estilos mejorados
- `ServicioDetalle.jsx`: Tracking por slug
- `Home.jsx`: Limpieza de código

## 🌐 Despliegue

✅ **GitHub Pages**: https://getafeelectronic.github.io/miserviciotecnico/  
✅ **Branch**: `main`  
✅ **Commit**: `6b9d456`

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/getafeelectronic/miserviciotecnico.git
cd miserviciotecnico

# Instalar dependencias
cd frontend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build
```

## 🔍 Testing

Verificar las nuevas páginas:
- http://localhost:5173/miserviciotecnico/#/privacidad
- http://localhost:5173/miserviciotecnico/#/terminos

Verificar analytics en Supabase:
```sql
SELECT event_type, page, COUNT(*) 
FROM analytics_events 
WHERE page LIKE '%servicios%'
GROUP BY event_type, page;
```

## 📸 Capturas

### Política de Privacidad
- Diseño moderno con iconos Lucide
- Secciones organizadas con IDs de navegación
- Información de contacto dinámica desde `.env`

### Términos de Servicio
- 14 secciones detalladas
- Garantías y procesos claros
- Diseño responsive mobile-first

## 👥 Contribuidores

- [@getafeelectronic](https://github.com/getafeelectronic)

## 🔗 Links Útiles

- [Documentación Completa](./doc/)
- [Workflow Guide](./doc/WORKFLOWS.md)
- [Setup GitHub Pages](./doc/DEPLOY-GITHUB-PAGES.md)
- [Conventional Commits](./doc/CONVENTIONAL-COMMITS.md)

---

**Fecha de Release**: 28 de abril de 2026  
**Versión Anterior**: [v1.2.1](https://github.com/getafeelectronic/miserviciotecnico/releases/tag/v1.2.1)
