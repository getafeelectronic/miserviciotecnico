# 📘 Guía de Configuración - Supabase + Frontend

Este documento te guía paso a paso para configurar Supabase y ejecutar el frontend.

## 🎯 Paso 1: Crear Proyecto en Supabase

1. **Visita** [https://supabase.com](https://supabase.com)
2. **Inicia sesión** o crea una cuenta (puedes usar GitHub)
3. **Clic en** "New Project"
4. **Completa los datos:**
   - **Name**: miserviciotecnico (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura (guárdala)
   - **Region**: Europe West (London) o el más cercano
   - **Pricing Plan**: Free tier (suficiente para empezar)
5. **Espera** 1-2 minutos mientras se crea el proyecto

## 🔑 Paso 2: Obtener Credenciales

Una vez creado el proyecto:

1. En el panel lateral, ve a **Settings** (⚙️)
2. Clic en **API**
3. Copia estos valores:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
```
```
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📂 Paso 3: Configurar Variables de Entorno

En la carpeta `frontend/`:

```bash
# 1. Copia el archivo de ejemplo
cp .env.example .env

# 2. Edita el archivo .env
# Reemplaza con tus credenciales reales
```

Tu archivo `.env` debe quedar así:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...tu-clave-completa
VITE_API_URL=http://localhost:8000
```

## 🗄️ Paso 4: Configurar Tablas en Supabase (Opcional por ahora)

Por ahora solo usamos la autenticación. Más adelante crearemos las tablas necesarias.

Si quieres crear un usuario de prueba:

1. En Supabase, ve a **Authentication** > **Users**
2. Clic en **Add user** > **Create new user**
3. Ingresa:
   - Email: `admin@test.com`
   - Password: `123456` (o la que prefieras)
   - Auto Confirm User: ✅ (activado)
4. Clic en **Create user**

## 🚀 Paso 5: Ejecutar el Frontend

```bash
# Asegúrate de estar en la carpeta frontend
cd frontend

# If not installed, install dependencies
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Deberías ver:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## 🧪 Paso 6: Probar la Aplicación

1. **Abre** http://localhost:5173/ en tu navegador
2. Deberías ver la página de **Login**
3. **Intenta** iniciar sesión con:
   - Email: `admin@test.com`
   - Password: `123456`

4. Si las credenciales son correctas, serás redirigido al **Dashboard**

## 🔧 Troubleshooting

### Error: "Faltan las variables de entorno de Supabase"

- Verifica que el archivo `.env` existe en la carpeta `frontend/`
- Asegúrate de que las variables comienzan con `VITE_`
- Reinicia el servidor de desarrollo (`Ctrl + C` y luego `npm run dev`)

### Error: "Invalid login credentials"

- Verifica que el usuario existe en Supabase (Authentication > Users)
- El usuario debe estar confirmado (columna `confirmed_at` no debe estar vacía)
- Prueba la contraseña correctamente

### El servidor no inicia

- Verifica que estás en la carpeta correcta (`frontend/`)
- Ejecuta `npm install` primero
- Verifica que tu versión de Node.js sea compatible (v18+)

### Error de CORS

- Por ahora no deberías tener este error
- Cuando conectes con el backend, configuraremos CORS correctamente

## 📊 Estructura de Supabase (Próximamente)

En futuras versiones crearemos estas tablas:

```sql
-- Clientes
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reparaciones
CREATE TABLE repairs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  device VARCHAR(255),
  brand VARCHAR(100),
  model VARCHAR(100),
  problem TEXT,
  status VARCHAR(50),
  cost DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Inventario
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  sku VARCHAR(100),
  quantity INTEGER,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎉 ¡Todo Listo!

Si llegaste hasta aquí y todo funciona, ¡felicidades! 🎊

Tienes un frontend moderno con autenticación funcionando.

### Próximos pasos:

1. ✅ Frontend con autenticación
2. ⏳ Crear backend con FastAPI
3. ⏳ Configurar tablas en Supabase
4. ⏳ Implementar CRUD de clientes
5. ⏳ Implementar gestión de reparaciones
6. ⏳ Deploy a producción

---

**¿Necesitas ayuda?** Consulta la documentación oficial:
- [Supabase Docs](https://supabase.com/docs)
- [React + Vite](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
