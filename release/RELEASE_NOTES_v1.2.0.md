# 📊 Release v1.2.0 - Sistema de Analytics Completo

## 🎉 Nuevas Funcionalidades

### Dashboard de Analytics con Visualizaciones
Sistema completo de analytics con gráficos interactivos en el panel de administración:

- ✅ **Dashboard Principal Simplificado**: Muestra gráfico de pageviews de últimos 30 días
- ✅ **Página Dedicada de Analytics**: Vista completa con 4 gráficos Chart.js
- ✅ **Menú de Navegación**: Nueva sección "Analytics" en sidebar del admin
- ✅ **API JSON Endpoint**: `/api/analytics/stats` para consumir datos

### 📈 Gráficos Implementados

#### 1. **Pageviews por Día** (Gráfico de Línea)
- Últimos 30 días con línea temporal
- Incluye días sin visitas (valores en 0)
- Procesamiento directo en Python con fecha completa

#### 2. **Dispositivos** (Gráfico de Dona)
- Distribución mobile/tablet/desktop
- Colores diferenciados por tipo
- Cutout 60% para estilo moderno

#### 3. **Origen del Tráfico** (Gráfico de Pastel)
- Direct, Google, Facebook, Instagram, etc.
- Top 5 orígenes más frecuentes
- Identificación automática desde referrer

#### 4. **Top Páginas** (Barra Horizontal)
- 10 páginas más visitadas
- Ordenadas por cantidad de visitas
- Filtro de páginas nulas/vacías

### 🎯 Métodos de Analytics en SupabaseClient

```python
get_analytics_summary()      # Total eventos, pageviews, páginas únicas
get_pageviews_by_day(days)   # Serie temporal con Python nativo
get_top_pages(limit)         # Páginas más visitadas (filtradas)
get_device_stats()           # Distribución por dispositivo
get_traffic_origins(limit)   # Orígenes de tráfico principales
```

### 🔍 Hook useAnalytics en Frontend

Tracking automático en todas las páginas React:

- ✅ **Pageviews**: Se envía automáticamente al cambiar de ruta
- ✅ **Duración**: Trackea tiempo de permanencia (>3 segundos)
- ✅ **Eventos Personalizados**: trackFormSubmit, trackConversion, trackClick
- ✅ **Detección Automática**: Device type, traffic origin, geolocalización (ipapi.co)
- ✅ **Logging Frontend**: Console.log con prefijo `[Analytics]` para debugging

**Páginas trackeadas:**
- Home (Hero con CTA buttons)
- Contacto (form submit y botones de contacto)
- Nosotros (pageview)
- Servicios (clicks en tarjetas - pendiente)

### 🛠️ Script de Diagnóstico

**`backend/test_analytics.py`**: Herramienta CLI para debugging
- Muestra últimos 10 eventos raw de Supabase
- Ejecuta todos los métodos de analytics
- Detecta problemas comunes (solo root "/", páginas nulas)
- Uso: `cd backend && python test_analytics.py`

---

## 🐛 Correcciones y Mejoras

### Limpieza de Código Obsoleto
- ✅ **Eliminadas referencias a MongoDB**: 
  - Comentadas variables `MONGODB_URI` y `MONGODB_DATABASE` en config.py
  - Removido import de `pymongo` (ya no se usa)
  - Blueprint `analytics_bp` (MongoDB) ya no se registra

### Fix en get_pageviews_by_day
- ❌ **Antes**: Intentaba llamar RPC `client.rpc('get_pageviews_by_day')` (no existía)
- ✅ **Ahora**: Procesamiento directo en Python
  - Genera rango completo de fechas con `timedelta`
  - Incluye días sin visitas con valor 0
  - Ordena correctamente por fecha

### Logging Extensivo
- Backend: `logger.debug` en todos los métodos analytics
- Frontend: `console.log` con detalles de cada evento enviado
- Muestra valores exactos de campos críticos (page, event_type)

---

## 📦 Arquitectura del Sistema

```
Frontend (React + Vite)
    ↓
useAnalytics.js Hook
    ↓
location.pathname + location.search
    ↓
Supabase.from('analytics_events').insert()
    ↓
PostgreSQL (Supabase)
    ↓
Backend Flask SupabaseClient
    ↓
/api/analytics/stats (JSON)
    ↓
Chart.js Visualization
```

### Base de Datos: analytics_events

**Campos trackeados:**
- `event_type`: pageview, duration, form_submit, conversion, click
- `page`: Ruta completa (pathname + search)
- `page_title`: Título del documento
- `device`: mobile/tablet/desktop
- `origin`: direct, google, facebook, instagram, referral
- `referrer`: URL completa del origen
- `user_agent`: Navegador y sistema operativo
- `screen_width` / `screen_height`: Resolución de pantalla
- `language`: Idioma del navegador
- `country`, `city`, `region`, `timezone`: Geolocalización (ipapi.co)
- `created_at`: Timestamp UTC

---

## 🚀 Deploy

### Frontend en GitHub Pages
✅ **Deploy automático** via GitHub Actions  
🔗 https://getafeelectronic.github.io/miserviciotecnico/

**Cambios en Frontend:**
- Nuevo hook `src/hooks/useAnalytics.js`
- Tracking en Hero.jsx, Contacto.jsx, Home.jsx, Nosotros.jsx

### Backend en Vercel
✅ **Deploy automático** al hacer push a main  
🔗 https://tu-proyecto.vercel.app

**Cambios en Backend:**
- 5 métodos nuevos en `app/supabase_client.py`
- Nueva ruta `/analytics` en `app/routes/dashboard.py`
- Template `app/templates/analytics/index.html`
- Endpoint JSON `/api/analytics/stats`
- Sidebar actualizado en `base.html`

**Variables de entorno necesarias** (ya configuradas):
```bash
SUPABASE_URL=https://lysejfhxackcmoksclvm.supabase.co
SUPABASE_KEY=<anon key>
SUPABASE_SERVICE_KEY=<service_role key>
SECRET_KEY=<secret>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<password>
```

---

## 📊 Estadísticas del Release

- **15 archivos modificados/creados**
- **+2376 líneas** añadidas / -11 eliminadas
- **6 archivos nuevos**:
  - `backend/app/templates/analytics/index.html` (393 líneas)
  - `backend/test_analytics.py` (130 líneas)
  - `frontend/src/hooks/useAnalytics.js` (223 líneas)
  - `doc/ANALYTICS_USAGE.md` (510 líneas)
  - `doc/DASHBOARD_ANALYTICS.md` (246 líneas)
  - `doc/SUPABASE_ANALYTICS.md` (423 líneas)

---

## 📚 Documentación

### Nuevos Documentos
- **`doc/ANALYTICS_USAGE.md`**: Guía completa de uso del sistema de analytics
- **`doc/DASHBOARD_ANALYTICS.md`**: Documentación del dashboard admin
- **`doc/SUPABASE_ANALYTICS.md`**: Configuración y esquema de base de datos

### Cómo Usar Analytics

**Desde el Panel Admin:**
1. Login: `https://tu-backend.vercel.app/login`
2. Click en **"Analytics"** en el menú lateral
3. Ver gráficos y datos detallados
4. Exportar datos desde tabla (copiar/pegar)

**Debugging en Frontend:**
1. Abrir DevTools Console (F12)
2. Navegar por diferentes páginas
3. Buscar logs con prefijo `[Analytics]`
4. Verificar valores de `page`, `event_type`, `page_title`

**Debugging en Backend:**
```bash
cd backend
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\Activate.ps1  # Windows
python test_analytics.py
```

---

## 🧪 Testing Recomendado

- [ ] Verificar frontend trackea eventos en todas las páginas
- [ ] Inspeccionar Console del navegador (logs `[Analytics]`)
- [ ] Acceder a `/analytics` en backend admin
- [ ] Verificar que gráficos muestren datos reales
- [ ] Ejecutar `test_analytics.py` para diagnóstico
- [ ] Confirmar que páginas diferentes aparecen en "Top Páginas"
- [ ] Verificar geolocalización funciona (ipapi.co)

---

## 🐛 Problemas Conocidos

### ⚠️ Solo Root "/" en Top Páginas
Si solo aparece "/" en la lista de páginas:

**Posibles causas:**
1. React Router no actualiza `location.pathname` correctamente
2. Todas las navegaciones recargan la página (no SPA navigation)
3. Base path `/miserviciotecnico/` no se está removiendo

**Solución temporal:**
- Revisar console del navegador: ¿qué valor tiene `page` en los logs?
- Ejecutar `test_analytics.py` para ver valores raw en base de datos
- Comparar frontend logs vs database values

**Fix en progreso**: Investigando si es necesario normalizar `page` para remover base path.

---

## 🔗 Links Útiles

- **Frontend**: https://getafeelectronic.github.io/miserviciotecnico/
- **Backend Admin**: https://tu-proyecto.vercel.app/login
- **Repositorio**: https://github.com/getafeelectronic/miserviciotecnico
- **Commit Principal**: `feat(analytics): implement comprehensive analytics dashboard`
- **Documentación Analytics**: `doc/ANALYTICS_USAGE.md`

---

## 🎯 Próximos Pasos (v1.3.0)

- [ ] Resolver issue de "solo root /" en tracking
- [ ] Agregar tracking en página Servicios (clicks en cards)
- [ ] Implementar tracking de ServicioDetalle (/:slug)
- [ ] Dashboard: filtros de fecha (7/30/90 días)
- [ ] Exportación CSV desde dashboard
- [ ] Gráfico de conversiones (formularios, clicks en CTA)
- [ ] Heatmap de clicks (opcional)
- [ ] A/B testing framework (opcional)

---

**Desarrollado por**: TeleRayo Electrónica  
**Fecha**: 27 de abril de 2026  
**Versión**: 1.2.0
