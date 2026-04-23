# 📺 Mi Servicio Técnico - Getafe

<div align="center">

![Estado del Proyecto](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue)
![Versión](https://img.shields.io/badge/versión-0.1.0-green)

**Sitio web corporativo para servicio técnico especializado en reparación de televisores**

[🌐 Demo](#) · [📞 Contacto](#contacto) · [📋 Características](#características)

</div>

---

## 📖 Sobre el Proyecto

Este es el **sitio web corporativo** para un servicio técnico especializado en la reparación de televisores en Getafe, Madrid. La web proporciona información sobre servicios, ubicación, reseñas de clientes y contacto directo.

### 🎯 Objetivo

Crear una presencia web moderna y profesional que permita a los clientes:
- Conocer los servicios ofrecidos
- Leer artículos técnicos y consejos (asistidos por IA)
- Contactar fácilmente con el servicio
- Ver la ubicación en el mapa
- Consultar reseñas reales de Google My Business

---

## ✨ Características

### 🏠 Landing Page Moderna
- Diseño responsive y atractivo
- Hero section con llamada a la acción
- Presentación de servicios destacados

### 📝 Blog Técnico con IA
- Artículos sobre reparación y mantenimiento
- Contenido generado/asistido con Machine Learning
- Tips y consejos para usuarios

### 📧 Formulario de Contacto
- Formulario inteligente con validación
- Envío directo por email
- Respuesta automática al cliente

### 📍 Ubicación y Mapa
- Integración con Google Maps
- Dirección y horarios de atención
- Cómo llegar desde diferentes puntos

### ⭐ Reseñas de Clientes
- Integración con Google My Business API
- Mostrar reseñas reales de clientes
- Actualización automática de valoraciones

### 🛠️ Servicios Ofrecidos
- Catálogo completo de servicios
- Marcas que se reparan
- Galería de trabajos realizados

---

## 🚀 Instalación y Desarrollo

### Prerrequisitos

```bash
# Asegúrate de tener instalado:
# - Node.js (v20 o superior)
# - npm (incluido con Node.js)
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
# Edita el archivo .env con tus credenciales:
# - VITE_SUPABASE_URL (si usas Supabase)
# - VITE_SUPABASE_ANON_KEY
# - VITE_GOOGLE_MAPS_API_KEY
# - VITE_GOOGLE_MY_BUSINESS_API_KEY
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
# La web estará disponible en http://localhost:5173
```

---

## 📁 Estructura del Proyecto

```
miserviciotecnico/
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes UI reutilizables
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   └── ReviewCard.jsx
│   │   ├── pages/          # Páginas principales
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Blog.jsx
│   │   │   └── Contact.jsx
│   │   ├── lib/            # Configuración de APIs
│   │   │   ├── supabase.js
│   │   │   └── gmaps.js
│   │   └── utils/          # Utilidades
│   ├──Stack Tecnológico

### Frontend
- **React 18** - Biblioteca UI moderna
- **Vite** - Build tool ultra-rápido
- **React Router** - Navegación SPA
- **Zustand** - State management ligero
- **React Hook Form** - Manejo de formularios

### APIs y Servicios
- **Supabase** - Backend as a Service (opcional para blog)
- **Google Maps API** - Integración de mapas
- **Google My Business API** - Reseñas de clientes
- **OpenAI/Anthropic** - Asistencia IA para contenido

### Hosting y Deploy
- **Vercel/Netlify** - Hosting del frontend (gratuito)
- **GitHub Actions** - CI/CD automático
## 🛡️ Tecnologías Utilizadas

<!-- Actualiza esta sección según tu stack tecnológico -->

- Frontend: HTML, CSS, JavaScript / React / Vue / Angular
- Backend: Node.js / PHP / Python / .NET
- Base de datos: MySQL / PostgreSQL / MongoDB
- Autenticación: JWT / OAuth
- Despliegue: Docker / Vercel / Heroku / AWS

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

### Fase 1 - MVP ✅ (En progreso)
- [x] Estructura base del proyecto
- [x] Componentes de autenticación
- [ ] Landing page con hero section
- [ ] Sección de servicios
- [ ] Formulario de contacto funcional

### Fase 2 - Contenido Dinámico
- [ ] Integración Google Maps
- [ ] Integración Google My Business (reseñas)
- [ ] Blog con artículos básicos
- [ ] Galería de trabajos realizados

### Fase 3 - IA y Avanzado
- [ ] Generación de contenido con IA
- [ ] Chatbot de asistencia
- [ ] SEO optimizado
- [ ] Progressive Web App (PWA)
- [ ] Analytics y métrica



## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📝 Roadmap

- [ ] Sistema de gestión de clientes
- [ ] Módulo de presupuestos automáticos
- [ ] Integración con pasarelas de pago
- [ ] App móvil para técnicos
- [ ] Sistema de notificaciones por SMS/Email
- [ ] Portal del cliente
- [ ] Estadísticas y dashboards

---

## 🙏 Agradecimientos

Gracias a todos los clientes que confían en nuestro servicio y nos ayudan a mejorar cada día.

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella ⭐**

Hecho con ❤️ en Getafe

</div>
