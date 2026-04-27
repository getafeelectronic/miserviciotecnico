# Analytics Dashboard - Documentación

## Descripción General

Se ha implementado una sección completa de **gráficos de analytics** en el dashboard del backend de administración que muestra estadísticas visuales de tráfico web recopiladas desde el frontend.

## Características Implementadas

### 📊 Gráficos Disponibles

1. **Pageviews por Día (Línea)**
   - Muestra la evolución de visitas en los últimos 30 días
   - Gráfico de línea con área sombreada
   - Formato de fecha: DD/MMM (ej: 27/Abr)

2. **Dispositivos (Doughnut)**
   - Distribución de visitas por tipo de dispositivo:
     - Desktop (azul)
     - Móvil (morado)
     - Tablet (amarillo)
     - Desconocido (rojo)

3. **Top 10 Páginas Más Visitadas (Barra Horizontal)**
   - Lista las 10 páginas con más visitas
   - URLs largas se acortan automáticamente (máx 40 caracteres)
   - Ordenado de mayor a menor

4. **Orígenes de Tráfico (Pie)**
   - Distribución por fuente de tráfico:
     - Directo
     - Orgánico (SEO)
     - Referencia (otros sitios)
     - Redes Sociales
     - Desconocido

### 📈 Estadísticas Adicionales

- **Tarjeta de Pageviews Totales**: Muestra el número total de pageviews desde el inicio en una tarjeta destacada con gradiente púrpura

## Arquitectura Técnica

### Backend (Python/Flask)

#### 1. **SupabaseClient** (`backend/app/supabase_client.py`)

Métodos agregados para consultar analytics:

```python
@classmethod
def get_analytics_summary(cls):
    """Resumen general: total eventos, pageviews, páginas únicas"""
    
@classmethod
def get_pageviews_by_day(cls, days=30):
    """Pageviews agrupados por día"""
    
@classmethod
def get_top_pages(cls, limit=10):
    """Top N páginas más visitadas"""
    
@classmethod
def get_device_stats(cls):
    """Distribución por tipo de dispositivo"""
    
@classmethod
def get_traffic_origins(cls, limit=5):
    """Top N orígenes de tráfico"""
```

**Nota**: Los métodos procesan datos en Python. Para mejor performance con grandes volúmenes, considera crear funciones SQL/PostgreSQL en Supabase.

#### 2. **Dashboard Routes** (`backend/app/routes/dashboard.py`)

**Endpoint API agregado:**

```python
@dashboard_bp.route('/api/analytics/stats')
@login_required
def analytics_stats():
    """API endpoint que retorna JSON con todas las estadísticas"""
```

**Respuesta JSON:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_events": 1250,
      "total_pageviews": 890,
      "unique_pages": 15
    },
    "pageviews_by_day": [...],
    "top_pages": [...],
    "device_stats": [...],
    "traffic_origins": [...]
  }
}
```

### Frontend (Jinja2 + Chart.js)

#### 1. **Base Template** (`backend/app/templates/base.html`)

Se agregó Chart.js CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

Nuevo bloque `scripts` para templates hijos:
```jinja2
{% block scripts %}{% endblock %}
```

#### 2. **Dashboard Template** (`backend/app/templates/dashboard/index.html`)

**Estructura HTML:**
- 4 tarjetas de estadísticas (cambiadas de col-md-3 a col-md-2 para hacer espacio)
- 1 tarjeta grande de pageviews totales (col-md-4 con gradiente)
- Sección completa de gráficos con 4 canvas:
  - `#pageviewsChart` (Línea - 8 columnas)
  - `#devicesChart` (Doughnut - 4 columnas)
  - `#topPagesChart` (Barra horizontal - 7 columnas)
  - `#trafficChart` (Pie - 5 columnas)

**JavaScript:**
- Fetch automático al cargar página: `fetch('/dashboard/api/analytics/stats')`
- Función `renderCharts(data)` que inicializa 4 gráficos Chart.js
- Spinner de carga que se oculta al terminar

## Flujo de Datos

```
Frontend Usuario
    ↓
useAnalytics.js → Supabase (analytics_events)
    ↓
Backend Flask
    ↓
SupabaseClient.get_analytics_...() → Consultas SQL
    ↓
Dashboard API (/api/analytics/stats) → JSON
    ↓
Chart.js → Renderiza gráficos
    ↓
Dashboard Admin
```

## Requisitos Previos

1. **Tabla de Analytics en Supabase**:
   - Ejecutar script: `doc/supabase_analytics.sql`
   - Crear tabla `analytics_events` con columnas:
     - `event_type`, `page`, `device`, `origin`, `created_at`, etc.

2. **Frontend enviando eventos**:
   - Hook `useAnalytics.js` debe estar activo en React
   - Usuarios navegando el sitio generan datos

3. **Autenticación**:
   - Usuario debe estar logueado en el dashboard backend
   - Endpoint protegido con `@login_required`

## Uso

### Acceder al Dashboard

1. Ingresar al backend: `http://localhost:5000/login`
2. Autenticarse con credenciales de admin
3. Navegar a Dashboard (ruta principal)
4. Los gráficos se cargarán automáticamente

### Solución de Problemas

**Gráficos vacíos o sin datos:**
- Verificar que la tabla `analytics_events` tenga datos
- Ejecutar en Supabase SQL Editor:
  ```sql
  SELECT COUNT(*) FROM analytics_events;
  SELECT * FROM analytics_events LIMIT 5;
  ```

**Error 500 en API:**
- Revisar logs del backend Flask
- Verificar variables de entorno: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`
- Comprobar permisos de RLS en Supabase

**Chart.js no carga:**
- Verificar CDN en base.html: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js`
- Revisar consola del navegador (F12)

## Mejoras Futuras

1. **Optimización de Consultas**:
   - Crear funciones SQL en Supabase para agregaciones (más rápidas que procesar en Python)
   - Ejemplo: `get_pageviews_by_day()` como función PostgreSQL

2. **Filtros Interactivos**:
   - Selector de rango de fechas
   - Filtrar por página específica
   - Comparación de períodos

3. **Métricas Adicionales**:
   - Tasa de rebote
   - Tiempo promedio en página
   - Conversiones y embudo de ventas
   - Mapa de calor geográfico

4. **Exportación**:
   - Descargar reportes en PDF/Excel
   - Programar envío automático por email

5. **Real-time**:
   - Actualización automática cada X minutos
   - WebSocket para updates en vivo

## Archivos Modificados

```
backend/
  app/
    supabase_client.py         [+150 líneas - métodos analytics]
    routes/
      dashboard.py             [+25 líneas - endpoint API]
    templates/
      base.html                [+3 líneas - Chart.js CDN]
      dashboard/
        index.html             [+200 líneas - gráficos y JS]
```

## Dependencias

- **Backend**: Flask, supabase-py
- **Frontend Dashboard**: Bootstrap 5, Bootstrap Icons, Chart.js 4.4
- **Frontend Usuario**: React, @supabase/supabase-js

## Referencias

- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Supabase Python Client](https://supabase.com/docs/reference/python/introduction)
- [Bootstrap 5](https://getbootstrap.com/docs/5.3/)

---

**Fecha de implementación**: 27 de abril de 2026
**Versión**: 1.0.0
