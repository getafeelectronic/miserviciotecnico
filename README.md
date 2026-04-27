# 📺 TeleRayo Electrónica - Servicio Técnico de Televisores en Getafe

<div align="center">

![Estado del Proyecto](https://img.shields.io/badge/estado-producción-brightgreen)
![Versión](https://img.shields.io/badge/versión-1.1.0-blue)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue)
![Frontend Deploy](https://img.shields.io/badge/frontend-GitHub%20Pages-blue)
![Backend Deploy](https://img.shields.io/badge/backend-Vercel-black)

**Sitio web corporativo con panel de administración para servicio técnico especializado en reparación de televisores en Getafe, Madrid**

[🌐 Ver Sitio Web](https://getafeelectronic.github.io/miserviciotecnico/) · [🔧 Backend API](https://miserviciotecnico.vercel.app/) · [📞 Contacto](https://getafeelectronic.github.io/miserviciotecnico/#/contacto)

</div>

---

## 🚀 Deploy en Producción

El proyecto está desplegado en dos plataformas:

| Componente | Plataforma | URL | Estado |
|------------|------------|-----|--------|
| **Frontend** (React + Vite) | GitHub Pages | https://getafeelectronic.github.io/miserviciotecnico/ | ✅ Activo |
| **Backend** (Flask + Python) | Vercel | https://miserviciotecnico.vercel.app/ | ✅ Activo |
| **Base de Datos** (PostgreSQL) | Supabase | https://lysejfhxackcmoksclvm.supabase.co | ✅ Activo |

**Panel de Administración:** https://miserviciotecnico.vercel.app/auth/login

---

## 🏗️ Arquitectura del Proyecto

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (Navegador)                       │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐       ┌──────────────┐
│   FRONTEND   │       │   BACKEND    │
│  React+Vite  │◄─────►│    Flask     │
│ GitHub Pages │       │   Vercel     │
└──────────────┘       └──────┬───────┘
                              │
                              ▼
                       ┌──────────────┐
                       │   DATABASE   │
                       │  PostgreSQL  │
                       │   Supabase   │
                       └──────────────┘
```

### Stack Tecnológico

- **Frontend:** React 18, Vite, React Router, Framer Motion, Lucide Icons
- **Backend:** Python 3.10+, Flask, Flask-Login, Supabase Client
- **Base de Datos:** PostgreSQL (Supabase)
- **Despliegue:** GitHub Actions (frontend) + Vercel (backend)
- **Autenticación:** Flask-Login con sesiones seguras

---

## 📖 Sobre el Proyecto

**TeleRayo Electrónica** es una aplicación web completa con gestión de contenido para un servicio técnico especializado en la reparación de televisores en Getafe, Madrid. Incluye un sitio web público con información de servicios y un panel de administración para gestionar reseñas de clientes.

### 🎯 Objetivo

Crear una presencia web profesional que permita:

**Para Clientes:**
- ✅ Conocer los servicios de reparación ofrecidos
- ✅ Contactar fácilmente mediante formulario funcional
- ✅ Ver la ubicación exacta en Google Maps
- ✅ Leer reseñas de otros clientes
- ✅ Consultar información de contacto y horarios

**Para Administradores:**
- ✅ Gestionar reseñas (crear, editar, eliminar, activar/desactivar)
- ✅ Panel de administración seguro con autenticación
- ✅ Formularios validados con fechas ISO 8601
- ✅ Sistema de fechas dinámicas (visualización relativa automática)

---

## ✨ Características v1.1.0

### 🏠 Landing Page Completa
- Hero section con gradiente morado y llamadas a la acción
- 5 secciones: Hero, Servicios, Por Qué Elegirnos, Reseñas, CTA
- Diseño 100% responsive (mobile-first)
- Animaciones suaves con Framer Motion
- Trust badges con iconos (Diagnóstico Gratis, Reparación Rápida, Garantía)

### ⭐ **NUEVO: CRUD Completo de Reseñas**
- **Crear:** Formulario validado con nombre, rating, comentario y fecha
- **Leer:** Visualización en landing page con cálculo dinámico de fechas
- **Editar:** Modificación de reseñas existentes
- **Eliminar:** Borrado con confirmación
- **Toggle Activo/Inactivo:** Control de visibilidad

### 📅 **NUEVO: Sistema de Fechas Dinámicas**
- Backend almacena fechas en formato ISO 8601 (YYYY-MM-DD)
- Frontend calcula automáticamente: "Hoy", "Ayer", "Hace 3 días", "Hace 2 semanas", "Hace 1 mes", "Hace 2 años"
- Cálculos precisos con manejo correcto de meses y años
- Sin dependencia de librerías externas (moment.js)

### 🔐 Panel de Administración
- Autenticación con Flask-Login
- Gestión completa de reseñas (tabla con acciones)
- Formularios con validación frontend y backend
- Protección CSRF y sesiones seguras
- Diseño responsive con Bootstrap 5

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
- Marker en ubicación exacta
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

## � TeleRayo Electrónica

### Información de Contacto

**Empresa:** TeleRayo Electrónica  
**Servicio:** Reparación Profesional de Televisores  
**Ubicación:** Getafe, Madrid (Zona Sur de Madrid)  
**Especialización:** LCD, LED, Plasma, OLED, QLED  
**Marcas:** Samsung, LG, Sony, Philips, Panasonic, Xiaomi y más  

**Contacto:**
- 📞 Teléfono: Configurado en `VITE_BUSINESS_PHONE`
- 📧 Email: Configurado en `VITE_BUSINESS_EMAIL`
- 📍 Dirección: Configurado en `VITE_BUSINESS_ADDRESS`
- 🕒 Horario: Configurado en `VITE_BUSINESS_HOURS`

**Ventajas:**
- ✅ Diagnóstico gratuito
- ✅ Reparación rápida (24-48h)
- ✅ Garantía en todas las reparaciones
- ✅ Más de 10 años de experiencia
- ✅ Presupuesto sin compromiso

---

## 🔐 Variables de Entorno

### Frontend (.env)

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

### Backend (.env)

```bash
# Flask
SECRET_KEY=genera_una_clave_segura_aqui
FLASK_ENV=production

# Supabase (https://supabase.com/)
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_anon_key
SUPABASE_SERVICE_KEY=tu_service_key

# Administración
ADMIN_USERNAME=admin
ADMIN_PASSWORD=cambiar_password_seguro_en_produccion

# Vercel (opcional, se configura automáticamente)
VERCEL_URL=
```

**⚠️ Seguridad:**
- Genera un `SECRET_KEY` seguro con: `python -c "import secrets; print(secrets.token_hex(32))"`
- Nunca commitees archivos `.env` al repositorio
- Usa contraseñas fuertes para `ADMIN_PASSWORD` en producción
- Configura las variables de entorno en Vercel Dashboard para el backend

---

## 🚀 Instalación y Desarrollo Local

### Prerrequisitos

```bash
# Frontend
Node.js v20 o superior
npm (incluido con Node.js)

# Backend
Python 3.10 o superior
pip (incluido con Python)

# Ambos
Git
```

### Instalación Completa

1. **Clonar el repositorio**
```bash
git clone https://github.com/getafeelectronic/miserviciotecnico.git
cd miserviciotecnico
```

2. **Configurar Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Editar .env con tus credenciales (ver sección Variables de Entorno)
npm run dev
# Frontend disponible en http://localhost:5173
```

3. **Configurar Backend** (en otra terminal)
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Editar .env con tus credenciales (ver sección Variables de Entorno)

# Iniciar servidor Flask
python run.py
# Backend disponible en http://localhost:5000
```

4. **Acceder al Panel de Administración**
```
URL: http://localhost:5000/auth/login
Usuario: admin (definido en ADMIN_USERNAME)
Contraseña: (definida en ADMIN_PASSWORD)
```

### Build para Producción

**Frontend:**
```bash
cd frontend
npm run build
# Los archivos estáticos se generarán en dist/
npm run preview  # Preview en http://localhost:4173
```

**Backend:**
```bash
# Vercel se encarga del build automáticamente
# O usar Gunicorn manualmente:
gunicorn -w 4 -b 0.0.0.0:5000 'app:create_app()'
```

---

## 📦 Deploy

### Deploy del Frontend (GitHub Pages)

El frontend se despliega automáticamente con GitHub Actions cuando se hace push a `main`:

1. **Configurar GitHub Pages:**
   - Ir a Settings → Pages
   - Source: GitHub Actions
   - Branch: `gh-pages` (se crea automáticamente)

2. **El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente:**
   - Instala dependencias
   - Ejecuta build de Vite
   - Despliega a GitHub Pages

3. **Verificar deploy:**
   - URL: https://getafeelectronic.github.io/miserviciotecnico/
   - Check el badge en la sección Actions del repositorio

### Deploy del Backend (Vercel)

1. **Conectar repositorio a Vercel:**
   - Ir a https://vercel.com/
   - Import Git Repository
   - Seleccionar `getafeelectronic/miserviciotecnico`

2. **Configurar proyecto:**
   - **Root Directory:** `backend`
   - **Framework Preset:** Other
   - **Build Command:** (dejar vacío)
   - **Output Directory:** (dejar vacío)

3. **Configurar variables de entorno en Vercel:**
   - Settings → Environment Variables
   - Agregar todas las variables del backend (.env):
     ```
     SECRET_KEY
     SUPABASE_URL
     SUPABASE_KEY
     SUPABASE_SERVICE_KEY
     ADMIN_USERNAME
     ADMIN_PASSWORD
     ```

4. **Verificar `vercel.json`:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.py"
    }
  ],
  "env": {
    "FLASK_ENV": "production"
  }
}
```

5. **Deploy:**
   - Vercel desplegará automáticamente en cada push a `main`
   - URL: https://miserviciotecnico.vercel.app/

### Deploy de Base de Datos (Supabase)

1. **Crear proyecto en Supabase:**
   - Ir a https://supabase.com/
   - New Project

2. **Crear tabla `reviews`:**
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  date TEXT NOT NULL,  -- Formato ISO 8601: YYYY-MM-DD
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. **Copiar credenciales:**
   - Project Settings → API
   - Copiar `URL` y `anon key` al `.env`

---

## 📁 Estructura del Proyecto

```
miserviciotecnico/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD para frontend (GitHub Pages)
├── backend/
│   ├── api/
│   │   └── index.py                # Entry point para Vercel
│   ├── app/
│   │   ├── __init__.py             # Factory pattern de Flask
│   │   ├── auth.py                 # Autenticación con Flask-Login
│   │   ├── routes/
│   │   │   ├── admin.py            # Dashboard de administración
│   │   │   └── reviews.py          # CRUD de reseñas
│   │   ├── templates/
│   │   │   ├── admin/
│   │   │   │   └── dashboard.html  # Panel de administración
│   │   │   ├── auth/
│   │   │   │   └── login.html      # Página de login
│   │   │   └── reviews/
│   │   │       ├── list.html       # Listado de reseñas
│   │   │       └── form.html       # Formulario crear/editar
│   │   └── utils/
│   │       └── supabase_client.py  # Cliente Supabase
│   ├── run.py                      # Script para desarrollo local
│   ├── requirements.txt            # Dependencias Python
│   ├── vercel.json                 # Configuración Vercel
│   └── .env                        # Variables de entorno (no commiteado)
├── doc/                            # Documentación del proyecto
│   ├── CONVENTIONAL-COMMITS.md     # Estándar de commits
│   ├── DEPLOY-GITHUB-PAGES.md      # Guía de deploy completa
│   ├── ROADMAP.md                  # Hoja de ruta del proyecto
│   ├── SETUP-CONTACTO.md           # Configurar formulario contacto
│   ├── SETUP-MAPS.md               # Configurar Google Maps
│   └── STACK-DECISION.md           # Decisiones arquitectónicas
├── frontend/
│   ├── public/
│   │   ├── .nojekyll               # Previene Jekyll en GitHub Pages
│   │   └── icon.ico                # Favicon
│   ├── src/
│   │   ├── components/             # Componentes reutilizables
│   │   │   ├── CookieConsent.jsx + .css  # Banner GDPR
│   │   │   ├── Footer.jsx + .css         # Footer con redes sociales dinámicas
│   │   │   ├── Header.jsx + .css         # Navegación responsive
│   │   │   ├── Hero.jsx + .css           # Hero section reutilizable
│   │   │   └── Layout.jsx                # Layout wrapper
│   │   ├── lib/
│   │   │   └── supabase.js         # Cliente Supabase para frontend
│   │   ├── pages/                  # Páginas principales
│   │   │   ├── Home.jsx + .css     # Landing con sistema de fechas dinámicas
│   │   │   ├── Nosotros.jsx + .css # Sobre la empresa
│   │   │   ├── Contacto.jsx + .css # Formulario + mapa
│   │   │   └── Services.jsx        # Servicios (placeholder)
│   │   ├── App.jsx                 # Componente raíz con router
│   │   └── main.jsx                # Entry point
│   ├── .env.example                # Template de variables
│   ├── vite.config.js              # Configuración Vite + GitHub Pages
│   └── package.json                # Dependencias y scripts
├── .gitignore
├── RELEASE_NOTES_v1.1.0.md         # Changelog del release actual
└── README.md                       # Este archivo
```

---

## 🛡️ Stack Tecnológico

### 🎨 Frontend
- **React 18.3.1** - Biblioteca UI moderna con Hooks
- **Vite 5.x** - Build tool ultra-rápido (HMR instant)
- **React Router v7** - Navegación SPA cliente
- **React Hook Form 7.73.1** - Manejo y validación de formularios
- **Framer Motion 12.38.0** - Animaciones y transiciones
- **Lucide React** - Iconos modernos
- **Supabase JS** - Cliente para consultas de BD

### 🐍 Backend
- **Python 3.10+** - Lenguaje de programación
- **Flask 3.1.0** - Framework web minimalista
- **Flask-Login** - Gestión de sesiones y autenticación
- **Supabase Python** - Cliente oficial de Supabase
- **Gunicorn** - Servidor WSGI para producción

### 🗄️ Base de Datos
- **PostgreSQL** - Base de datos relacional
- **Supabase** - Backend as a Service (hosting + API REST automática)

### 🌐 APIs y Servicios Externos
- **EmailJS** - Envío de emails desde frontend (sin backend)
- **Google Maps JavaScript API** - Mapas interactivos y markers
- **GitHub API** - Obtener versión dinámica para Footer
- **Supabase Storage** - Almacenamiento de imágenes (logo)

### 🚀 Deploy y CI/CD
- **GitHub Pages** - Hosting frontend estático gratuito
- **Vercel** - Hosting backend serverless gratuito
- **GitHub Actions** - CI/CD automático para frontend
- **Node.js 20** - Runtime para build

### 📦 Arquitectura
- **SPA (Single Page Application)** - Frontend con navegación sin recargas
- **API REST + Admin Panel** - Backend Flask con templates Jinja2
- **Serverless Functions** - Backend desplegado como funciones en Vercel
- **JAMstack** - JavaScript, APIs y Markup precompilado

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

### ✅ Fase 2 - Backend y Administración (v1.1.0) - **COMPLETADO**
- [x] Backend Flask con API REST
- [x] Base de datos PostgreSQL en Supabase
- [x] Panel de administración con autenticación
- [x] **CRUD Completo de Reseñas:**
  - [x] Crear reseñas con validación
  - [x] Listar todas las reseñas
  - [x] Editar reseñas existentes
  - [x] Eliminar reseñas con confirmación
  - [x] Toggle activar/desactivar reseñas
- [x] **Sistema de Fechas Dinámicas:**
  - [x] Backend guarda fechas ISO 8601 (YYYY-MM-DD)
  - [x] Frontend calcula "Hoy", "Ayer", "Hace X días/semanas/meses/años"
  - [x] Función `getRelativeTime()` con cálculos precisos
- [x] Deploy backend en Vercel
- [x] Deploy frontend en GitHub Pages
- [x] Integración completa frontend ↔ backend

### 🔄 Fase 3 - Contenido y Servicios (v1.2.0) - **EN PROGRESO**
- [ ] Página de Servicios detallada
  - [ ] Reparación de TV LCD/LED/OLED
  - [ ] Reparación de Smart TV
  - [ ] Instalación de antenas
  - [ ] Precios orientativos
- [ ] Galería de trabajos realizados
- [ ] Sección de marcas soportadas expandida
- [ ] FAQs (Preguntas frecuentes)
- [ ] Migrar reseñas existentes a formato ISO 8601

### 🚀 Fase 4 - Integración Avanzada (v1.3.0) - **PLANIFICADO**
- [ ] Blog técnico con artículos (CRUD desde admin)
- [ ] Integración Google My Business (reseñas reales)
- [ ] Sistema de citas online (Google Calendar API)
- [ ] Chatbot de asistencia básica
- [ ] Dashboard de métricas (reseñas, visitas, contactos)

### 🌟 Fase 5 - Optimización y SEO (v2.0.0) - **FUTURO**
- [ ] SEO optimizado (meta tags, schema.org)
- [ ] Progressive Web App (PWA)
- [ ] Lighthouse score >90 en todas las categorías
- [ ] Analytics y métricas (Google Analytics 4)
- [ ] Sitemap y robots.txt dinámicos
- [ ] Open Graph y Twitter Cards

### 💡 Backlog (Ideas Futuras)
- Sistema de gestión de clientes (CRM simple)
- Módulo de presupuestos automáticos
- Portal del cliente (seguimiento de reparaciones)
- App móvil para técnicos
- Sistema de notificaciones (SMS/Email)
- Upload de imágenes en reseñas
- Moderación de reseñas públicas

**Ver roadmap detallado:** [doc/ROADMAP.md](doc/ROADMAP.md)

---

## 📞 Contacto y Enlaces

### 🏢 TeleRayo Electrónica

**Información de Contacto:**
- 📍 Dirección: C. Leoncio Rojas, 11, 28901 Getafe, Madrid
- 📞 Teléfono: +34 916 95 07 81
- 📧 Email: ruizrjan@gmail.com
- 🕒 Horario: Lun-Vie: 9:00 - 19:00

**Enlaces del Proyecto:**
- 🌐 [Sitio Web (Frontend)](https://getafeelectronic.github.io/miserviciotecnico/)
- 🔧 [Backend API](https://miserviciotecnico.vercel.app/)
- 🔐 [Panel de Administración](https://miserviciotecnico.vercel.app/auth/login)
- 💻 [Repositorio GitHub](https://github.com/getafeelectronic/miserviciotecnico)
- 📋 [Releases](https://github.com/getafeelectronic/miserviciotecnico/releases)
- 🐛 [Issues](https://github.com/getafeelectronic/miserviciotecnico/issues)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- Gracias a todos los clientes que confían en nuestro servicio
- Comunidad de React y Vite por las excelentes herramientas
- Equipo de Flask por el framework web minimalista
- Supabase por el Backend as a Service
- EmailJS por el servicio de envío de emails gratuito
- Google Maps Platform por la API de mapas
- Vercel y GitHub Pages por el hosting gratuito

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

---

**Versión:** 1.1.0 | **Última actualización:** Abril 2026

Hecho con ❤️ en Getafe, Madrid

</div>
