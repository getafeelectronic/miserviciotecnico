# 📊 Analytics con Supabase

Esta guía muestra cómo configurar **analytics directamente en Supabase** para trackear eventos desde el frontend sin necesidad de MongoDB, Flask endpoints, ni configuraciones complejas.

---

## 🎯 Arquitectura Simple

```
┌─────────────────┐
│  Frontend React │
│   useAnalytics  │
└────────┬────────┘
         │
         │ INSERT directo
         ▼
┌─────────────────┐
│    Supabase     │
│ analytics_events│
└─────────────────┘
```

**Ventajas:**
- ✅ **Simple**: Solo una tabla en tu base de datos existente
- ✅ **Rápido**: Sin latencia de servicios externos
- ✅ **Seguro**: RLS configurado (INSERT público, SELECT autenticado)
- ✅ **Gratis**: Incluido en tu plan de Supabase
- ✅ **Sin dependencias**: No requiere MongoDB ni endpoints adicionales

---

## 📦 Paso 1: Crear Tabla de Analytics en Supabase

### Ejecutar Script SQL

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard
2. Navbar lateral → **SQL Editor**
3. Click en **New Query**
4. Copia y pega el contenido de `doc/supabase_analytics.sql`
5. Click en **Run** (o presiona `Ctrl + Enter`)

**El script crea:**
- ✅ Tabla `analytics_events` con todos los campos necesarios
- ✅ Índices para consultas rápidas
- ✅ RLS (Row Level Security) configurado
- ✅ Vista `analytics_stats` para estadísticas agregadas
- ✅ Función `cleanup_old_analytics()` para limpiar datos antiguos

### Verificar Creación

Después de ejecutar el script, verifica en:
- **Table Editor** → Deberías ver la tabla `analytics_events`
- **SQL Editor** → Ejecuta:
  ```sql
  SELECT * FROM analytics_events LIMIT 10;
  ```

---

## 🔑 Paso 2: Configurar Variables de Entorno (Ya está listo)

Las variables de Supabase ya están configuradas en `frontend/.env`:

```bash
VITE_SUPABASE_URL=https://lysejfhxackcmoksclvm.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

**No necesitas agregar nada más.** El cliente de Supabase ya está configurado en `frontend/src/lib/supabase.js`.

---

## 📝 Paso 3: Uso del Hook useAnalytics

### Tracking Automático de Pageviews

El hook trackea **automáticamente** cada vez que el usuario navega:

```jsx
import useAnalytics from '../hooks/useAnalytics';

function Home() {
  // ✅ Esto trackea automáticamente:
  // - Pageview
  // - Dispositivo (mobile/tablet/desktop)
  // - Origen del tráfico (direct/google/facebook)
  // - Ubicación geográfica
  // - Tiempo de permanencia
  useAnalytics();

  return (
    <div>
      <h1>Inicio</h1>
    </div>
  );
}
```

---

### Tracking Manual de Formularios

```jsx
import useAnalytics from '../hooks/useAnalytics';

function ContactForm() {
  const { trackFormSubmit } = useAnalytics();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Tu lógica de envío...
    
    // Trackear envío del formulario
    await trackFormSubmit('contact', {
      name: formData.name,
      email: formData.email,
      message_length: formData.message.length
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
}
```

---

### Tracking de Conversiones

```jsx
import useAnalytics from '../hooks/useAnalytics';

function ContactButtons() {
  const { trackConversion } = useAnalytics();

  const handleWhatsAppClick = async () => {
    await trackConversion('whatsapp', {
      phone: '+34912345678',
      source: 'header'
    });
    
    // Abrir WhatsApp
    window.open('https://wa.me/34912345678', '_blank');
  };

  const handleCallClick = async () => {
    await trackConversion('call', {
      phone: '+34912345678',
      source: 'hero'
    });
    
    // Abrir dialer
    window.location.href = 'tel:+34912345678';
  };

  return (
    <div>
      <button onClick={handleWhatsAppClick}>
        WhatsApp
      </button>
      <button onClick={handleCallClick}>
        Llamar
      </button>
    </div>
  );
}
```

---

### Tracking de Clicks en CTAs

```jsx
import useAnalytics from '../hooks/useAnalytics';

function HeroSection() {
  const { trackClick } = useAnalytics();

  const handleCTAClick = async () => {
    await trackClick('hero-cta-solicitar-presupuesto', 'button');
    // Luego redirigir...
  };

  return (
    <button onClick={handleCTAClick}>
      Solicitar Presupuesto
    </button>
  );
}
```

---

## 📊 Paso 4: Consultar Estadísticas

### Desde Supabase Dashboard

#### Ver Eventos Recientes

```sql
SELECT 
  event_type,
  page,
  page_title,
  device,
  origin,
  country,
  created_at
FROM analytics_events
ORDER BY created_at DESC
LIMIT 100;
```

#### Pageviews por Página

```sql
SELECT 
  page,
  COUNT(*) as views,
  COUNT(DISTINCT user_agent) as unique_visitors
FROM analytics_events
WHERE event_type = 'pageview'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY page
ORDER BY views DESC;
```

#### Conversiones por Tipo

```sql
SELECT 
  conversion_type,
  COUNT(*) as conversions,
  DATE(created_at) as date
FROM analytics_events
WHERE event_type = 'conversion'
  AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY conversion_type, DATE(created_at)
ORDER BY date DESC, conversions DESC;
```

#### Dispositivos más Usados

```sql
SELECT 
  device,
  COUNT(*) as views,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM analytics_events
WHERE event_type = 'pageview'
GROUP BY device
ORDER BY views DESC;
```

#### Origen del Tráfico

```sql
SELECT 
  origin,
  COUNT(*) as visits,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM analytics_events
WHERE event_type = 'pageview'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY origin
ORDER BY visits DESC;
```

---

### Usar la Vista de Estadísticas

```sql
-- Estadísticas de los últimos 7 días
SELECT * FROM analytics_stats
WHERE date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY date DESC;
```

---

## 🔒 Seguridad y RLS

Las políticas de **Row Level Security** están configuradas así:

### ✅ Insertar Eventos (Público)

```sql
-- Permite a cualquiera (anon + authenticated) insertar eventos
CREATE POLICY "Permitir INSERT público en analytics_events"
ON analytics_events
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```

Esto permite que el frontend inserte eventos sin autenticación.

### 🔐 Leer Eventos (Solo Admin)

```sql
-- Solo usuarios autenticados pueden leer
CREATE POLICY "Permitir SELECT autenticado en analytics_events"
ON analytics_events
FOR SELECT
TO authenticated
USING (true);
```

Para consultar desde el dashboard de admin, el usuario debe estar autenticado.

### 🚫 NO Modificar ni Eliminar

No hay políticas para UPDATE ni DELETE, por lo que **nadie puede modificar** los eventos una vez insertados.

---

## 🧹 Mantenimiento

### Limpiar Datos Antiguos

Para eliminar eventos mayores a 1 año (liberar espacio):

```sql
SELECT cleanup_old_analytics();
```

Puedes programar esto como un **Cron Job** en Supabase:

1. **Database** → **Cron Jobs** → **Create Job**
2. **Schedule**: `0 0 1 * *` (primer día de cada mes a medianoche)
3. **SQL**:
   ```sql
   SELECT cleanup_old_analytics();
   ```

---

## 📈 Límites y Costos

### Plan Gratuito de Supabase

- ✅ **500 MB de base de datos** (suficiente para ~500k eventos)
- ✅ **50,000 usuarios autenticados/mes**
- ✅ **500 MB de almacenamiento**
- ✅ **2 GB de transferencia**

**Estimación:**
- Cada evento: ~1 KB
- 500k eventos = ~500 MB
- Con limpieza anual: prácticamente ilimitado para sitios pequeños/medianos

---

## 🐛 Troubleshooting

### Error: "new row violates row-level security policy"

**Causa:** RLS mal configurado.

**Solución:**
```sql
-- Verificar políticas
SELECT * FROM pg_policies WHERE tablename = 'analytics_events';

-- Recrear política de INSERT
DROP POLICY IF EXISTS "Permitir INSERT público en analytics_events" ON analytics_events;
CREATE POLICY "Permitir INSERT público en analytics_events"
ON analytics_events FOR INSERT TO anon, authenticated WITH CHECK (true);
```

---

### Error: "column form_data does not exist"

**Causa:** Datos enviados no coinciden con el schema de la tabla.

**Solución:** Verifica que los campos enviados desde `useAnalytics.js` coincidan con las columnas de la tabla:
- `form_data` → JSONB
- `conversion_details` → JSONB

---

### No se están insertando eventos

**Debug:**
1. Abre la consola del navegador
2. Busca warnings de Supabase
3. Verifica que `frontend/src/lib/supabase.js` esté importando correctamente
4. Ejecuta en la consola:
   ```javascript
   import { supabase } from '../lib/supabase';
   console.log(supabase);
   ```

---

## ✅ Checklist de Configuración

- [ ] Ejecutar `doc/supabase_analytics.sql` en Supabase SQL Editor
- [ ] Verificar que la tabla `analytics_events` existe
- [ ] Verificar que las políticas RLS están activas
- [ ] Variables de entorno de Supabase configuradas (`frontend/.env`)
- [ ] Hook `useAnalytics` implementado en las páginas
- [ ] Probar inserción desde el navegador
- [ ] Verificar datos en Supabase Table Editor

---

## 🎉 ¡Listo!

Ahora tienes analytics completos sin complejidad:
- ✅ Frontend envía directamente a Supabase
- ✅ Sin MongoDB ni configuraciones externas
- ✅ Sin endpoints Flask adicionales
- ✅ Consultas SQL directas en Supabase Dashboard
- ✅ Escalable y seguro

**¡Mucho más simple que MongoDB Atlas! 🚀**
