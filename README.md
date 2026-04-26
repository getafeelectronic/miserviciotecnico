# 📺 TeleRayo Electrónica - Servicio Técnico de Televisores en Getafe

<div align="center">

![Estado del Proyecto](https://img.shields.io/badge/estado-producción-brightgreen)
![Versión](https://img.shields.io/badge/versión-1.0.0-blue)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue)
![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)

**Sitio web corporativo para servicio técnico especializado en reparación de televisores en Getafe, Madrid**

[🌐 Ver Demo](https://getafeelectronic.github.io/miserviciotecnico/) · [📞 Contacto](https://getafeelectronic.github.io/miserviciotecnico/#/contacto) · [📋 Documentación](./doc/)

</div>

---

## 📖 Sobre el Proyecto

**TeleRayo Electrónica** es un sitio web corporativo moderno para un servicio técnico especializado en la reparación de televisores en Getafe, Madrid. La web proporciona información sobre servicios, permite contacto directo con formulario funcional, muestra la ubicación en mapa interactivo y presenta la empresa profesionalmente.

### 🎯 Objetivo

Crear una presencia web profesional que permita a los clientes:
- ✅ Conocer los servicios de reparación ofrecidos
- ✅ Contactar fácilmente mediante formulario funcional
- ✅ Ver la ubicación exacta en Google Maps
- ✅ Conocer la historia y valores de la empresa
- ✅ Consultar información de contacto y horarios
- 🔄 Leer artículos técnicos y consejos (próximamente)

---

## ✨ Características Implementadas

### 🏠 Landing Page Completa (v0.2.0)
- Hero section con gradiente morado y llamadas a la acción
- 5 secciones: Hero, Servicios, Por Qué Elegirnos, Reseñas, CTA
- Diseño 100% responsive (mobile-first)
- Animaciones suaves con Framer Motion
- Trust badges con iconos (Diagnóstico Gratis, Reparación Rápida, Garantía)

### 📄 Página Nosotros
- Información completa de la empresa
- Misión, Visión y Valores
- Lista de servicios detallada
- Marcas soportadas (Samsung, LG, Sony, Philips, Panasonic, Xiaomi)
- Razones para elegir el servicio
- Ubicación en Getafe y zona sur de Madrid

### 📧 Formulario de Contacto Funcional
- Validación completa con react-hook-form
- Integración con EmailJS para envío de emails
- Estados visuales (loading, success, error)
- Modo simulado cuando no hay credenciales configuradas
- Campos: nombre, email, teléfono, asunto, mensaje

### 📍 Mapa Interactivo
- Integración con Google Maps JavaScript API
- Marker en ubicación exacta (C. Leoncio Rojas, 11, Getafe)
- Responsive con alturas adaptativas
- Cards de información de contacto

### 🍪 Sistema de Cookies GDPR
- Banner de consentimiento con diseño moderno
- Panel de configuración con 3 categorías:
  - Necesarias (siempre activas)
  - Análisis (Google Analytics)
  - Marketing (publicidad)
- Persistencia en localStorage
- Toggles personalizados con animaciones

### 🎨 Componentes Reutilizables
- Header con navegación responsive y menú hamburguesa
- Footer con 4 columnas y versión dinámica desde GitHub API
- Layout consistente en todas las páginas
- Hero component reutilizable

---

## 🚀 Instalación y Desarrollo

### Prerrequisitos

```bash
# Node.js v20 o superior
# npm (incluido con Node.js)
# Git
```

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/getafeelectronic/miserviciotecnico.git
cd miserviciotecnico
```

2. **Instalar dependencias del frontend**
```bash
cd frontend
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:
```bash
# EmailJS (https://www.emailjs.com/)
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key

# Google Maps API (https://console.cloud.google.com/)
VITE_GOOGLE_MAPS_API_KEY=tu_api_key

# Información del Negocio
VITE_BUSINESS_EMAIL=ruizrjan@gmail.com
VITE_BUSINESS_PHONE=+34 916 95 07 81
VITE_BUSINESS_ADDRESS=C. Leoncio Rojas, 11, 28901 Getafe, Madrid
VITE_BUSINESS_HOURS=Lun-Vie: 9:00 - 19:00
VITE_BUSINESS_COORDINATES_LAT=40.302205
VITE_BUSINESS_COORDINATES_LNG=-3.7329539
```

**Ver documentación completa:** [doc/SETUP-CONTACTO.md](doc/SETUP-CONTACTO.md)

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
# La web estará disponible en http://localhost:5173
```

5. **Build para producción**
```bash
npm run build
# Los archivos estáticos se generarán en dist/
```

6. **Preview del build**
```bash
npm run preview
# Preview en http://localhost:4173/miserviciotecnico/
```

---

## 🌐 Deploy y Sitio en Vivo

### Sitio Desplegado

**URL:** [https://getafeelectronic.github.io/miserviciotecnico/](https://getafeelectronic.github.io/miserviciotecnico/)

### Deploy Automático

El sitio se deploya automáticamente a **GitHub Pages** mediante **GitHub Actions** cuando se hace push a las ramas `main` o `develop`.

**Workflow:**
```
Push a develop/main → GitHub Actions → Build (Vite) → Deploy a gh-pages → Sitio actualizado
```

**Ver estado del deploy:**
```bash
# Listar workflows
gh workflow list

# Ver últimos runs del deploy
gh run list --workflow=deploy.yml --limit 5

# Ver logs de un run específico
gh run view [run-id] --log
```

### Configuración Necesaria (Primera vez)

1. **GitHub Secrets** (Settings → Secrets and variables → Actions):
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_GOOGLE_MAPS_API_KEY`
   - `VITE_BUSINESS_EMAIL`
   - `VITE_BUSINESS_PHONE`
   - `VITE_BUSINESS_ADDRESS`
   - `VITE_BUSINESS_HOURS`
   - `VITE_BUSINESS_COORDINATES_LAT`
   - `VITE_BUSINESS_COORDINATES_LNG`

2. **GitHub Pages** (Settings → Pages):
   - Source: `Branch gh-pages` + `/ (root)`
   - Save y esperar 1-2 minutos

**📖 Ver guía completa:** [doc/DEPLOY-GITHUB-PAGES.md](doc/DEPLOY-GITHUB-PAGES.md)

---

## 📁 Estructura del Proyecto

```
miserviciotecnico/
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD con GitHub Actions
├── doc/                         # Documentación del proyecto
│   ├── CONVENTIONAL-COMMITS.md  # Estándar de commits
│   ├── DEPLOY-GITHUB-PAGES.md   # Guía de deploy completa
│   ├── ROADMAP.md               # Hoja de ruta del proyecto
│   ├── SETUP-CONTACTO.md        # Configurar formulario contacto
│   ├── SETUP-MAPS.md            # Configurar Google Maps
│   └── STACK-DECISION.md        # Decisiones arquitectónicas
├── frontend/
│   ├── public/
│   │   ├── .nojekyll            # Previene Jekyll en GitHub Pages
│   │   └── icon.ico             # Favicon
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── CookieConsent.jsx + .css  # Banner GDPR
│   │   │   ├── Footer.jsx                # Footer con versión dinámica
│   │   │   ├── Header.jsx                # Navegación responsive
│   │   │   ├── Hero.jsx                  # Hero section reutilizable
│   │   │   └── Layout.jsx                # Layout wrapper
│   │   ├── pages/               # Páginas principales
│   │   │   ├── Home.jsx + .css           # Landing page
│   │   │   ├── Nosotros.jsx + .css       # Sobre la empresa
│   │   │   ├── Contacto.jsx + .css       # Formulario + mapa
│   │   │   └── Services.jsx              # Servicios (placeholder)
│   │   ├── App.jsx              # Componente raíz
│   │   └── main.jsx             # Entry point
│   ├── .env.example             # Template de variables
│   ├── vite.config.js           # Configuración Vite + GitHub Pages
│   └── package.json             # Dependencias
├── .gitignore
└── README.md                    # Este archivo
```

---

## 🛡️ Stack Tecnológico

### 🎨 Frontend
- **React 18.3.1** - Biblioteca UI moderna con Hooks
- **Vite 5.x** - Build tool ultra-rápido (HMR instant)
- **React Router v7** - Navegación SPA cliente
- **React Hook Form 7.73.1** - Manejo y validación de formularios
- **Framer Motion 12.38.0** - Animaciones y transiciones

### 🌐 APIs y Servicios Externos
- **EmailJS** - Envío de emails desde frontend (sin backend)
- **Google Maps JavaScript API** - Mapas interactivos y markers
- **GitHub API** - Obtener versión dinámica para Footer

### 🚀 Deploy y CI/CD
- **GitHub Pages** - Hosting estático gratuito (rama `gh-pages`)
- **GitHub Actions** - CI/CD automático (workflow `deploy.yml`)
- **Node.js 20** - Runtime para build
- **npm** - Gestor de paquetes

### 📦 Arquitectura
- **SPA (Single Page Application)** - Navegación sin recargas
- **React SPA + APIs Externas** - Sin backend propio (costo $0-5/mes)
- **Serverless** - EmailJS maneja envío de emails
- **Static Site** - HTML/CSS/JS estático en GitHub Pages

---

---

## 📖 Documentación

Toda la documentación del proyecto se encuentra en la carpeta [doc/](doc/):

| Documento | Descripción |
|-----------|-------------|
| [CONVENTIONAL-COMMITS.md](doc/CONVENTIONAL-COMMITS.md) | Estándar de commits para mantener historial limpio |
| [DEPLOY-GITHUB-PAGES.md](doc/DEPLOY-GITHUB-PAGES.md) | Guía completa de deploy a GitHub Pages (450+ líneas) |
| [ROADMAP.md](doc/ROADMAP.md) | Hoja de ruta y planificación del proyecto |
| [SETUP-CONTACTO.md](doc/SETUP-CONTACTO.md) | Configurar EmailJS para formulario de contacto |
| [SETUP-MAPS.md](doc/SETUP-MAPS.md) | Configurar Google Maps API |
| [STACK-DECISION.md](doc/STACK-DECISION.md) | Decisiones arquitectónicas y justificación |

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. **Fork el proyecto**
2. **Crea una rama** siguiendo [Conventional Commits](doc/CONVENTIONAL-COMMITS.md):
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```
3. **Haz commits descriptivos**:
   ```bash
   git commit -m "feat: añadir nueva página de servicios"
   ```
4. **Push a tu fork**:
   ```bash
   git push origin feature/nueva-caracteristica
   ```
5. **Abre un Pull Request** con descripción detallada

### 📋 Guías de Desarrollo

- **Commits**: Seguir [Conventional Commits](doc/CONVENTIONAL-COMMITS.md)
- **Branches**: `feature/*`, `fix/*`, `docs/*`, etc.
- **Pull Requests**: A la rama `develop` (no a `main`)
- **Testing**: Verificar build local antes de push (`npm run build`)

---

## 🗺️ Roadmap

### ✅ Fase 1 - MVP (v0.2.0) - **COMPLETADO**
- [x] Estructura base del proyecto con Vite + React
- [x] Navegación responsive con Header y menú hamburguesa
- [x] Landing page con 5 secciones (Hero, Servicios, Por Qué Elegirnos, Reseñas, CTA)
- [x] Página Nosotros completa (8 secciones)
- [x] Formulario de contacto funcional con EmailJS
- [x] Integración Google Maps con marker interactivo
- [x] Sistema de Cookies GDPR completo
- [x] Footer dinámico con versión desde GitHub API
- [x] Deploy automático a GitHub Pages
- [x] Documentación completa del proyecto

### 🔄 Fase 2 - Contenido y Servicios (v0.3.0) - **EN PROGRESO**
- [ ] Página de Servicios detallada
  - [ ] Reparación de TV LCD/LED/OLED
  - [ ] Reparación de Smart TV
  - [ ] Instalación de antenas
  - [ ] Precios orientativos
- [ ] Galería de trabajos realizados
- [ ] Sección de marcas soportadas expandida
- [ ] FAQs (Preguntas frecuentes)

### 🚀 Fase 3 - Integración Avanzada (v0.4.0) - **PLANIFICADO**
- [ ] Blog técnico con artículos
  - [ ] Tips de mantenimiento
  - [ ] Guías de resolución de problemas
  - [ ] Noticias de tecnología
- [ ] Integración Google My Business (reseñas reales)
- [ ] Sistema de citas online (Google Calendar API)
- [ ] Chatbot de asistencia básica

### 🌟 Fase 4 - Optimización y SEO (v1.0.0) - **FUTURO**
- [ ] SEO optimizado (meta tags, schema.org)
- [ ] Progressive Web App (PWA)
- [ ] Lighthouse score >90 en todas las categorías
- [ ] Analytics y métricas (Google Analytics 4)
- [ ] Sitemap y robots.txt
- [ ] Open Graph y Twitter Cards

### 💡 Backlog (Ideas Futuras)
- Sistema de gestión de clientes (CRM simple)
- Módulo de presupuestos automáticos
- Portal del cliente (seguimiento de reparaciones)
- App móvil para técnicos
- Sistema de notificaciones (SMS/Email)

**Ver roadmap detallado:** [doc/ROADMAP.md](doc/ROADMAP.md)

---

## 📞 Contacto

**TeleRayo Electrónica**  
📍 C. Leoncio Rojas, 11, 28901 Getafe, Madrid  
📞 +34 916 95 07 81  
📧 ruizrjan@gmail.com  
🕒 Lun-Vie: 9:00 - 19:00  

🌐 [Sitio Web](https://getafeelectronic.github.io/miserviciotecnico/)  
💻 [GitHub](https://github.com/getafeelectronic/miserviciotecnico)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- Gracias a todos los clientes que confían en nuestro servicio
- Comunidad de React y Vite por las excelentes herramientas
- EmailJS por el servicio de envío de emails gratuito
- Google Maps Platform por la API de mapas

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

---

**Versión:** 0.2.0 | **Última actualización:** Enero 2025

Hecho con ❤️ en Getafe, Madrid

</div>
