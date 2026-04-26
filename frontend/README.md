# 🎨 Frontend - Mi Servicio Técnico

Frontend desarrollado con React + Vite + Supabase

## 🚀 Características

- ⚡ **Vite** para desarrollo ultra-rápido
- ⚛️ **React 18** con Hooks
- 🔒 **Autenticación** con Supabase
- 🎨 **CSS moderno** con diseño responsivo
- 📝 **Formularios** con React Hook Form
- 🗃️ **Gestión de estado** con Zustand
- 🛣️ **Enrutamiento** con React Router v6

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de Supabase
```

## 🔧 Configuración de Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Copia la URL del proyecto y la clave anónima
3. Actualiza el archivo `.env`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima
```

## 🏃 Ejecución

```bash
# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   └── ProtectedRoute.jsx
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Dashboard.jsx
│   │   └── Dashboard.css
│   ├── store/           # Estado global (Zustand)
│   │   └── authStore.js
│   ├── lib/             # Utilidades y configuraciones
│   │   └── supabase.js
│   ├── App.jsx          # Componente principal
│   ├── App.css
│   └── main.jsx         # Punto de entrada
├── public/              # Archivos estáticos
├── .env.example         # Ejemplo de variables de entorno
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Rutas Disponibles

- `/login` - Página de inicio de sesión
- `/dashboard` - Panel principal (protegido)
- `/` - Redirige al dashboard

## 🔒 Autenticación

El sistema de autenticación usa Supabase Auth con:
- Login con email/contraseña
- Protección de rutas
- Persistencia de sesión
- Logout

## 🚀 Próximas Funcionalidades

- [ ] CRUD de clientes
- [ ] Gestión de reparaciones
- [ ] Inventario de piezas
- [ ] Generación de presupuestos
- [ ] Sistema de citas
- [ ] Dashboard con estadísticas
- [ ] Perfil de usuario
- [ ] Notificaciones

## 🛠️ Tecnologías

- **React** 18.3.1
- **Vite** 5.x
- **Supabase** (Auth + Database)
- **React Router** 7.x
- **Zustand** (State Management)
- **React Hook Form** (Formularios)

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linter de código
```

## 👥 Desarrollo

El proyecto está en desarrollo activo. Para contribuir o reportar issues, visita el repositorio principal.

---

Hecho con ❤️ para Mi Servicio Técnico - Getafe
