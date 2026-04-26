# 🎨 Plan de Rediseño del Frontend

## Estado Actual vs. Objetivo

### ❌ Estructura Actual (Sistema de Gestión)
```
frontend/src/
├── components/
│   └── ProtectedRoute.jsx    ← NO NECESARIO
├── pages/
│   ├── Login.jsx              ← ELIMINAR
│   ├── Dashboard.jsx          ← CAMBIAR
│   └── (CSS files)
├── store/
│   └── authStore.js           ← NO NECESARIO
└── lib/
    └── supabase.js            ← MANTENER (para blog)
```

### ✅ Estructura Nueva (Sitio Web Corporativo)
```
frontend/src/
├── components/
│   ├── Header.jsx             ← Navegación principal
│   ├── Footer.jsx             ← Pie de página
│   ├── Hero.jsx               ← Banner principal
│   ├── ServiceCard.jsx        ← Tarjetas de servicios
│   ├── ReviewCard.jsx         ← Tarjetas de reseñas
│   ├── ContactForm.jsx        ← Formulario de contacto
│   └── Map.jsx                ← Google Maps
├── pages/
│   ├── Home.jsx               ← Landing page
│   ├── Services.jsx           ← Catálogo de servicios
│   ├── Contact.jsx            ← Página de contacto
│   ├── About.jsx              ← Sobre nosotros
│   └── Blog.jsx               ← Blog (opcional)
├── lib/
│   ├── supabase.js            ← Mantener para blog
│   ├── googleMaps.js          ← Config Google Maps
│   └── emailjs.js             ← Config EmailJS
├── utils/
│   └── constants.js           ← Datos de servicios, etc.
└── styles/
    └── global.css             ← Estilos globales
```

---

## 🗂️ Componentes a Crear

### 1. Header.jsx
Navegación principal con logo y menú

**Features:**
- Logo del negocio
- Menú: Inicio | Servicios | Contacto | Blog
- Botón CTA "Solicitar Presupuesto"
- Responsive con hamburger menu en móvil

### 2. Hero.jsx
Banner principal de la home

**Features:**
- Headline: "Reparación de Televisores en Getafe"
- Subheadline: "Servicio técnico profesional..."
- CTA: "Contactar" + "Ver Servicios"
- Imagen de fondo o video

### 3. ServiceCard.jsx
Tarjeta para mostrar cada servicio

**Props:**
- title (ej: "Reparación de TV LCD")
- description
- icon
- price (opcional)

### 4. ReviewCard.jsx
Mostrar reseñas de Google My Business

**Props:**
- author_name
- author_photo
- rating (estrellas)
- text (comentario)
- time (fecha)

### 5. ContactForm.jsx
Formulario con EmailJS

**Fields:**
- Nombre
- Email
- Teléfono
- Mensaje
- Botón submit

**Validación con React Hook Form**

### 6. Map.jsx
Google Maps con ubicación

**Features:**
- Mapa centrado en Getafe
- Marker en ubicación del negocio
- Info window con dirección

### 7. Footer.jsx
Pie de página

**Features:**
- Información de contacto
- Horarios
- Redes sociales
- Enlaces legales (Privacidad, etc.)

---

## 📄 Páginas a Crear

### Home.jsx (Landing Page)
```jsx
<Layout>
  <Hero />
  
  <section className="services-preview">
    <h2>Nuestros Servicios</h2>
    <ServiceCard title="Reparación LCD/LED" />
    <ServiceCard title="Reparación Plasma" />
    <ServiceCard title="Servicio a Domicilio" />
  </section>
  
  <section className="why-us">
    <h2>¿Por qué elegirnos?</h2>
    <FeatureList />
  </section>
  
  <section className="reviews">
    <h2>Opiniones de Clientes</h2>
    <ReviewCard />
    <ReviewCard />
    <ReviewCard />
  </section>
  
  <section className="cta">
    <h2>¿Tienes un problema con tu TV?</h2>
    <Button>Contáctanos</Button>
  </section>
</Layout>
```

### Services.jsx
Catálogo completo de servicios con detalles

### Contact.jsx
```jsx
<Layout>
  <section className="contact-hero">
    <h1>Contacta con Nosotros</h1>
  </section>
  
  <div className="contact-grid">
    <ContactForm />
    <Map />
  </div>
  
  <section className="contact-info">
    <ContactCard type="phone" />
    <ContactCard type="email" />
    <ContactCard type="address" />
    <ContactCard type="hours" />
  </section>
</Layout>
```

### About.jsx
Historia del negocio, equipo, valores

### Blog.jsx (Opcional - Fase 2)
```jsx
<Layout>
  <h1>Blog Técnico</h1>
  
  <div className="articles-grid">
    {articles.map(article => (
      <ArticleCard 
        title={article.title}
        excerpt={article.excerpt}
        date={article.date}
        slug={article.slug}
      />
    ))}
  </div>
</Layout>
```

---

## 🔧 Configuraciones Necesarias

### 1. Google Maps API
```env
VITE_GOOGLE_MAPS_API_KEY=your-api-key
VITE_BUSINESS_LAT=40.3064
VITE_BUSINESS_LNG=-3.7326
```

### 2. Google My Business / Places
```env
VITE_GOOGLE_PLACE_ID=ChIJ...
VITE_GOOGLE_PLACES_API_KEY=your-api-key
```

### 3. EmailJS
```env
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

### 4. Supabase (Solo para blog)
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

---

## 🎨 Diseño y Estilos

### Paleta de Colores (Sugerida)
```css
:root {
  /* Colores principales */
  --primary: #2563eb;      /* Azul tecnológico */
  --secondary: #10b981;    /* Verde éxito */
  --accent: #f59e0b;       /* Naranja CTA */
  
  /* Neutros */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-800: #1f2937;
  --gray-900: #111827;
  
  /* Semánticos */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### Tipografía
```css
/* Headings */
font-family: 'Inter', 'Segoe UI', sans-serif;

/* Body */
font-family: 'Inter', 'Roboto', sans-serif;
```

---

## 📦 Dependencias Adicionales a Instalar

```bash
# Google Maps
npm install @react-google-maps/api

# EmailJS
npm install @emailjs/browser

# Animaciones
npm install framer-motion

# Icons
npm install lucide-react  # o react-icons

# Utilidades
npm install clsx         # Para clases condicionales
```

---

## 🚀 Migración Step-by-Step

### Paso 1: Backup
```bash
# Crear rama de backup
git checkout -B backup/old-structure
git commit -am "Backup: estructura de gestión"
git checkout develop
```

### Paso 2: Limpiar archivos innecesarios
```bash
# Eliminar componentes antiguos
rm src/components/ProtectedRoute.jsx
rm src/pages/Login.jsx
rm src/pages/Login.css
rm src/pages/Dashboard.jsx
rm src/pages/Dashboard.css
rm src/store/authStore.js
```

### Paso 3: Crear nuevos componentes
- Crear Header.jsx
- Crear Footer.jsx
- Crear Hero.jsx
- Etc...

### Paso 4: Crear nuevas páginas
- Home.jsx
- Services.jsx
- Contact.jsx
- About.jsx

### Paso 5: Actualizar App.jsx
Cambiar rutas de:
```jsx
/login → /
/dashboard → /servicios
```
A:
```jsx
/ → Home
/servicios → Services
/contacto → Contact
/nosotros → About
/blog → Blog (opcional)
```

### Paso 6: Configurar APIs
- Setup Google Maps
- Setup EmailJS
- Setup Google Places (reseñas)

### Paso 7: Testing
- Verificar todas las páginas
- Probar formulario de contacto
- Verificar mapa
- Comprobar responsive

---

## ⏱️ Timeline Estimado

| Fase | Tarea | Tiempo |
|------|-------|--------|
| 1 | Limpieza + Setup base | 1 día |
| 2 | Componentes UI básicos | 2 días |
| 3 | Página Home completa | 2 días |
| 4 | Páginas Services + Contact | 2 días |
| 5 | Integración Google Maps | 1 día |
| 6 | Integración EmailJS | 1 día |
| 7 | Integración Google Reviews | 1 día |
| 8 | Estilos y responsive | 2 días |
| 9 | Testing y ajustes | 1 día |
| **TOTAL** | **MVP completo** | **~2 semanas** |

---

## ✅ Checklist de Completitud

### Componentes
- [ ] Header con navegación
- [ ] Footer con info de contacto
- [ ] Hero section
- [ ] ServiceCard
- [ ] ReviewCard
- [ ] ContactForm
- [ ] Map

### Páginas
- [ ] Home (landing page)
- [ ] Services (catálogo)
- [ ] Contact (formulario + mapa)
- [ ] About (nosotros)

### Integraciones
- [ ] Google Maps funcionando
- [ ] Google My Business reviews cargando
- [ ] Formulario enviando emails
- [ ] Responsive en todos los dispositivos

### Optimización
- [ ] SEO básico (meta tags)
- [ ] Imágenes optimizadas
- [ ] Lazy loading
- [ ] Performance >90 en Lighthouse

---

## 🔄 Siguiente Paso

¿Quieres que comience con la limpieza y creación de la nueva estructura?

Opciones:
1. **Crear todos los componentes base ahora**
2. **Empezar solo con Home.jsx (MVP mínimo)**
3. **Hacer limpieza primero y después planificar**

¿Qué prefieres?
