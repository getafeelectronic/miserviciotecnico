# Configuración de Supabase Database

Este documento explica cómo configurar Supabase Database para gestionar contenido dinámico del sitio web:
- **Reviews** (Opiniones de clientes)
- **Social Links** (Enlaces a redes sociales)

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Tabla: Reviews (Opiniones)](#tabla-reviews)
3. [Tabla: Social Links (Redes Sociales)](#tabla-social-links)
4. [Configurar Credenciales](#configurar-credenciales)
5. [Desplegar y Verificar](#desplegar-y-verificar)
6. [Gestión desde Supabase](#gestión-desde-supabase)
7. [Troubleshooting](#troubleshooting)

## 📋 Requisitos Previos

1. Cuenta en [Supabase](https://supabase.com/) (gratis)
2. Un proyecto creado en Supabase

## 🗄️ Paso 1: Crear la Tabla en Supabase

### Opción A: Desde el SQL Editor de Supabase

1. Ve a tu proyecto en Supabase
2. Navega a: **SQL Editor** (icono </> en la barra lateral)
3. Click en **New Query**
4. Copia y pega el siguiente SQL:

```sql
-- Crear tabla reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  date VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para mejorar rendimiento en consultas ordenadas
CREATE INDEX IF NOT EXISTS idx_reviews_created_at 
  ON reviews(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública de todas las reviews
CREATE POLICY "Permitir lectura pública de reviews"
  ON reviews
  FOR SELECT
  USING (true);

-- Opcional: Política para permitir inserción autenticada
-- (Descomenta si quieres un formulario de reviews en el futuro)
-- CREATE POLICY "Permitir inserción autenticada"
--   ON reviews
--   FOR INSERT
--   WITH CHECK (auth.role() = 'authenticated');

-- Comentario de la tabla
COMMENT ON TABLE reviews IS 'Opiniones y testimonios de clientes del servicio técnico';

-- Insertar datos de ejemplo
INSERT INTO reviews (name, rating, text, date) VALUES
  ('María García', 5, 'Excelente servicio. Repararon mi TV en menos de 24 horas. Muy profesionales.', 'Hace 1 semana'),
  ('Carlos Ruiz', 5, 'Muy contentos con el trabajo realizado. Precio justo y trato excepcional.', 'Hace 2 semanas'),
  ('Ana Martínez', 5, 'Recomendable 100%. Mi TV LG quedó perfecta. Gracias!', 'Hace 1 mes'),
  ('Juan López', 5, 'Diagnóstico gratuito y reparación rápida. Muy satisfecho con el resultado.', 'Hace 3 semanas'),
  ('Laura Fernández', 5, 'Atención al cliente de 10. Explicaron todo el proceso claramente.', 'Hace 2 meses');
```

5. Click en **Run** (o presiona `Ctrl + Enter`)
6. Deberías ver el mensaje: **Success. No rows returned**

### Opción B: Desde el Table Editor

1. Ve a: **Table Editor** (icono de tabla en la barra lateral)
2. Click en **New Table**
3. Nombre: `reviews`
4. Añade las siguientes columnas:

| Columna | Tipo | Config |
|---------|------|--------|
| `id` | uuid | Primary Key, Default: `gen_random_uuid()` |
| `name` | varchar(100) | Not Null |
| `rating` | int2 | Not Null |
| `text` | text | Not Null |
| `date` | varchar(50) | Nullable |
| `created_at` | timestamptz | Default: `now()` |

5. Click en **Save**
6. Luego ejecuta el SQL para RLS policies (arriba)

## 🔐 Paso 2: Obtener Credenciales

1. Ve a: **Settings** → **API** (icono de engranaje)
2. En la sección "Project API keys", copia:
   - **Project URL**: `https://tuproyecto.supabase.co`
   - **anon public**: La clave pública (empieza con `eyJh...`)

⚠️ **IMPORTANTE**: La clave `anon` es segura para exponer en el frontend. No uses la clave `service_role`.

## 🔧 Paso 3: Configurar en GitHub Secrets

### Opción A: Usando el Script Automatizado

```powershell
# Windows PowerShell
cd .github/scripts
.\setup-secrets.ps1
```

Cuando llegues a la sección de Supabase, pega:
- **VITE_SUPABASE_URL**: `https://tuproyecto.supabase.co`
- **VITE_SUPABASE_ANON_KEY**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Opción B: Manual en GitHub

1. Ve a: `https://github.com/getafeelectronic/miserviciotecnico/settings/secrets/actions`
2. Click en **New repository secret**
3. Añade estos dos secrets:

**Secret 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://tuproyecto.supabase.co`

**Secret 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (tu clave completa)

## 🚀 Paso 4: Redesplegar

```bash
# Forzar un nuevo deploy
git commit --allow-empty -m "ci: redeploy con Supabase configurado"
git push origin develop

# Monitorear el deploy
gh run watch
```

## ✅ Verificar que Funciona

1. Abre la consola del navegador en tu sitio desplegado
2. Deberías ver en la consola del navegador:
   - **Si está configurado**: Las reviews se cargan desde Supabase
   - **Si NO está configurado**: `"📋 Usando reviews de fallback"`

3. Verifica que las reviews aparecen en la sección "Lo que dicen nuestros clientes"

## 📝 Gestionar Reviews desde Supabase

### Ver/Editar Reviews
1. Ve a: **Table Editor** → **reviews**
2. Puedes:
   - ✏️ Editar reviews existentes (doble click)
   - ➕ Añadir nuevas reviews (botón "Insert row")
   - 🗑️ Eliminar reviews (seleccionar fila → botón eliminar)

### Consultas SQL Útiles

```sql
-- Ver todas las reviews ordenadas por más recientes
SELECT * FROM reviews ORDER BY created_at DESC;

-- Contar reviews por rating
SELECT rating, COUNT(*) as total 
FROM reviews 
GROUP BY rating 
ORDER BY rating DESC;

-- Ver solo reviews de 5 estrellas
SELECT * FROM reviews WHERE rating = 5;

-- Actualizar el texto de una review
UPDATE reviews 
SET text = 'Nuevo texto aquí', updated_at = NOW()
WHERE id = 'uuid-de-la-review';

-- Eliminar reviews antiguas (más de 1 año)
DELETE FROM reviews 
WHERE created_at < NOW() - INTERVAL '1 year';
```

## 🔄 Cambios se Reflejan Automáticamente

Una vez configurado:
- ✅ **Añades una review en Supabase** → Aparece en el sitio web al recargar
- ✅ **Editas una review** → Se actualiza en el sitio
- ✅ **Eliminas una review** → Desaparece del sitio

**No necesitas redesplegar el sitio para actualizar las reviews**.

## 🛡️ Seguridad: Row Level Security (RLS)

Las políticas RLS garantizan que:
- ✅ Cualquiera puede **leer** reviews (público)
- ❌ Nadie puede **escribir/modificar/eliminar** sin autenticación (protegido)

Para gestionar reviews, debes estar autenticado en Supabase Dashboard.

## 🔮 Características Futuras (Opcional)

Si quieres que los clientes envíen reviews directamente desde el sitio:

1. Crea un formulario de review en React
2. Descomenta la política de inserción autenticada en el SQL
3. Implementa autenticación de Supabase (opcional)
4. O usa un CAPTCHA y permite inserción anónima con moderación

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Row Level Security (RLS) Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## 🆘 Troubleshooting

### Las reviews no aparecen

1. Verifica en la consola del navegador si hay errores
2. Confirma que los secrets están configurados en GitHub
3. Verifica que la tabla existe en Supabase Table Editor
4. Comprueba que RLS está habilitado y las políticas están creadas

### Error de CORS

- Supabase maneja CORS automáticamente
- Si tienes problemas, verifica que la URL de Supabase es correcta

### Reviews se cargan lento

- Es normal un pequeño retraso en la primera carga
- Considera usar un límite en la consulta: `.limit(10)`
- Supabase tiene caché automático

---

**¿Preguntas?** Abre un issue en el repositorio.
