# 🚀 Configuración de Vercel para Backend Flask

## Arquitectura de Deploy

- **Frontend** → GitHub Pages: https://getafeelectronic.github.io/miserviciotecnico/
- **Backend** → Vercel: https://tu-proyecto.vercel.app

---

## 📋 Pasos para Configurar Vercel

### 1. Importar Proyecto en Vercel

1. Ve a https://vercel.com/dashboard
2. Click en **"Add New"** → **"Project"**
3. Importa el repositorio: `getafeelectronic/miserviciotecnico`
4. Selecciona la rama: `main` (o la que quieras desplegar)

### 2. Configurar Variables de Entorno

En la configuración del proyecto, ve a **Settings** → **Environment Variables** y agrega:

#### Variables Obligatorias:

```bash
# Flask Configuration
SECRET_KEY=tu_clave_secreta_super_segura_minimo_32_caracteres

# Supabase Configuration
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_anon_key_de_supabase
SUPABASE_SERVICE_KEY=tu_service_role_key_de_supabase

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_password_seguro_aqui
```

#### Cómo obtener las credenciales de Supabase:

1. Ve a https://app.supabase.com/project/tu-proyecto/settings/api
2. **SUPABASE_URL**: Copia "Project URL"
3. **SUPABASE_KEY**: Copia "anon public" (bajo "Project API keys")
4. **SUPABASE_SERVICE_KEY**: Copia "service_role" (bajo "Project API keys")

### 3. Verificar Configuración

El archivo `vercel.json` ya está configurado:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/api/index.py"
    },
    {
      "src": "/(.*)",
      "dest": "backend/api/index.py"
    }
  ],
  "env": {
    "FLASK_ENV": "production"
  }
}
```

### 4. Deploy

1. Click en **"Deploy"** en Vercel
2. Espera a que termine el build (~30 segundos)
3. Tu backend estará disponible en: `https://tu-proyecto.vercel.app`

---

## 🧪 Verificar el Deploy

### Rutas del Backend:

- **Login**: https://tu-proyecto.vercel.app/auth/login
- **Dashboard**: https://tu-proyecto.vercel.app/
- **Servicios**: https://tu-proyecto.vercel.app/services
- **Imágenes**: https://tu-proyecto.vercel.app/images
- **Reseñas**: https://tu-proyecto.vercel.app/reviews

### Test Rápido:

```bash
# Verificar que el backend responde
curl https://tu-proyecto.vercel.app/auth/login
# Debería devolver HTML del formulario de login
```

---

## 🔧 Troubleshooting

### Error 404
- ✅ **Verifica** que las variables de entorno estén configuradas
- ✅ **Verifica** que la rama correcta esté desplegada
- ✅ **Limpia el cache** en Vercel: Settings → "Clear Cache and Redeploy"

### Error 500
- ✅ **Verifica** que todas las variables obligatorias estén configuradas
- ✅ **Revisa los logs**: Deployments → (tu deploy) → View Function Logs
- ✅ **Verifica** las credenciales de Supabase

### Build Failures
- ✅ **Verifica** que `backend/requirements.txt` esté correcto
- ✅ **Verifica** que Python 3.12 esté siendo usado (automático)

---

## 📝 Comandos Útiles

```bash
# Ver los últimos deploys
vercel ls

# Ver logs en tiempo real
vercel logs

# Deploy manual desde CLI
vercel --prod

# Ver variables de entorno
vercel env ls
```

---

## 🔐 Seguridad

⚠️ **IMPORTANTE:**
- Nunca subas el archivo `.env` a GitHub
- Usa contraseñas seguras en producción
- El `SECRET_KEY` debe tener mínimo 32 caracteres aleatorios
- El `SUPABASE_SERVICE_KEY` tiene acceso total - manéjalo con cuidado

### Generar SECRET_KEY segura:

```python
import secrets
print(secrets.token_hex(32))
```

---

## 🔄 Workflow Completo

```
Desarrollo Local → GitHub → Vercel
     ↓              ↓         ↓
  localhost     Branch      Deploy
   :5000        main       auto
```

1. Desarrollas en local (`backend/`)
2. Commit y push a GitHub
3. Vercel detecta cambios y redeploya automáticamente
4. Frontend (GitHub Pages) consume el API de Vercel

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel
2. Verifica las variables de entorno
3. Asegúrate de que Supabase esté accesible
