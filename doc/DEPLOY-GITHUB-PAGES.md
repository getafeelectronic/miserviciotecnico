# 🚀 Guía de Deploy a GitHub Pages

## Descripción

Este proyecto utiliza **GitHub Actions** para compilar automáticamente el código React y desplegarlo en **GitHub Pages** en la rama `gh-pages`.

## Flujo de Trabajo

```
┌─────────────┐      ┌──────────────────┐      ┌──────────────┐
│   develop   │──►   │ GitHub Actions   │──►   │   gh-pages   │
│   o main    │      │  - npm ci        │      │  (solo dist) │
└─────────────┘      │  - npm run build │      └──────────────┘
                     │  - deploy        │             ▼
                     └──────────────────┘      GitHub Pages
                                               https://getafeelectronic.github.io/miserviciotecnico/
```

## Configuración Inicial

### 1. Activar GitHub Pages en el Repositorio

1. Ve a **Settings** del repositorio en GitHub
2. En el menú lateral, selecciona **Pages**
3. En **Source**, selecciona:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click en **Save**

### 2. Configurar GitHub Secrets

Para que el build tenga acceso a las variables de entorno, debes configurar **GitHub Secrets**:

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Añade cada una de las siguientes secrets:

#### Secrets Requeridos:

```bash
# Información del Negocio
VITE_BUSINESS_EMAIL=ruizrjan@gmail.com
VITE_BUSINESS_PHONE=+34 916 95 07 81
VITE_BUSINESS_ADDRESS=C. Leoncio Rojas, 11, 28901 Getafe, Madrid
VITE_BUSINESS_HOURS=Lun-Vie: 9:00 - 19:00
VITE_BUSINESS_COORDINATES_LAT=40.302205
VITE_BUSINESS_COORDINATES_LNG=-3.7329539

# EmailJS (obtener en https://www.emailjs.com/)
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key

# Google Maps (obtener en https://console.cloud.google.com/)
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

**⚠️ Importante:**
- NO subas nunca las API keys al código fuente
- Los secrets de GitHub son seguros y solo accesibles por Actions
- Los valores se inyectan durante el build

### 3. Verificar Configuración de Vite

El archivo `frontend/vite.config.js` debe tener configurado el `base`:

```javascript
export default defineConfig({
  base: '/miserviciotecnico/', // Ruta del repositorio
  // ... resto de configuración
})
```

Si usas un dominio personalizado, cambia a:
```javascript
base: '/', // Para dominio propio
```

## Despliegue Automático

### Trigger del Deploy

El workflow se ejecuta automáticamente cuando:

1. **Push a `main`**: Deploy a producción
2. **Push a `develop`**: Deploy a staging/preview
3. **Manual**: Desde GitHub Actions → "Run workflow"

### Proceso del Workflow

```yaml
1. Checkout del código
2. Setup Node.js 20
3. npm ci (instalación limpia)
4. npm run build (con variables de entorno)
5. Deploy a rama gh-pages
```

### Ver el Progreso

1. Ve a **Actions** en GitHub
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Click para ver logs detallados
4. Si falla, revisa los logs para ver el error

## Verificación Post-Deploy

### 1. Verificar la Rama gh-pages

```bash
git fetch origin
git checkout gh-pages
ls  # Deberías ver index.html, assets/, etc.
```

La rama `gh-pages` solo contiene:
- `index.html`
- `/assets/` (JS, CSS, imágenes)
- `.nojekyll` (para que GitHub no procese con Jekyll)

### 2. Verificar el Sitio en Vivo

URL: https://getafeelectronic.github.io/miserviciotecnico/

**Checklist:**
- ✅ Sitio carga correctamente
- ✅ Rutas funcionan (Inicio, Contacto, Nosotros, Servicios)
- ✅ Imágenes y assets se cargan
- ✅ Funcionalidades funcionan (formulario, mapa, cookies)
- ✅ Versión correcta en el footer

### 3. Verificar Variables de Entorno

Abre DevTools (F12) en el sitio desplegado:
- Ve al footer: debe mostrar el teléfono y email correctos
- Prueba el formulario de contacto (debe enviar email)
- Verifica que el mapa cargue

## Despliegue Manual (Opcional)

Si necesitas hacer deploy manualmente sin GitHub Actions:

```bash
# 1. Asegúrate de estar en develop/main
git checkout main

# 2. Entra a la carpeta frontend
cd frontend

# 3. Instala dependencias
npm install

# 4. Build del proyecto
npm run build

# 5. Deploy manual con gh-pages (instalar: npm install -g gh-pages)
npx gh-pages -d dist -b gh-pages
```

## Configuración de Dominio Personalizado (Opcional)

Si tienes un dominio propio (ej: `www.telerayo.com`):

### 1. En GitHub

1. Settings → Pages → Custom domain
2. Ingresa tu dominio: `www.telerayo.com`
3. GitHub creará un archivo `CNAME` en `gh-pages`

### 2. En tu Proveedor de DNS

Añade estos registros DNS:

**Para apex domain (telerayo.com):**
```
Type: A
Host: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
```

**Para www (www.telerayo.com):**
```
Type: CNAME
Host: www
Value: getafeelectronic.github.io
```

### 3. Actualizar vite.config.js

```javascript
export default defineConfig({
  base: '/', // Cambiar de '/miserviciotecnico/' a '/'
})
```

### 4. Re-deploy

```bash
git commit -am "chore: configurar dominio personalizado"
git push
```

## Troubleshooting

### Error: 404 en rutas después del deploy

**Problema:** Las rutas como `/contacto` dan 404 al recargar.

**Solución:** Crear `public/404.html` que redirija al `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script>
    var path = window.location.pathname.slice(1);
    window.location.replace(
      window.location.origin + '/miserviciotecnico/?/' + path + window.location.search + window.location.hash
    );
  </script>
</head>
<body></body>
</html>
```

### Error: Assets no cargan (404)

**Problema:** CSS/JS/imágenes no se encuentran.

**Causa:** `base` incorrecto en `vite.config.js`

**Solución:** Verificar que `base: '/miserviciotecnico/'` coincida con el nombre del repo.

### Error: Variables de entorno undefined

**Problema:** `import.meta.env.VITE_*` es undefined en producción.

**Solución:**
1. Verificar que los secrets estén configurados en GitHub
2. Verificar que el workflow los pase correctamente en `env:`
3. Verificar que los nombres coincidan exactamente

### Error: GitHub Actions falla

**Errores comunes:**
- **npm ci failed**: package-lock.json desactualizado → `npm install` local y commitear
- **Permissions denied**: Verificar que el workflow tenga `permissions: contents: write`
- **Build failed**: Errores de código → Verificar que `npm run build` funcione localmente

## Buenas Prácticas

### 1. No commitear archivos de build

El `.gitignore` debe incluir:
```
dist/
build/
.cache/
```

### 2. Test local antes de push

```bash
cd frontend
npm run build
npm run preview  # Servidor local del build
```

Verifica que todo funcione en `http://localhost:4173/miserviciotecnico/`

### 3. Estrategia de Ramas

- **`develop`**: Desarrollo continuo → deploy a preview
- **`main`**: Producción estable → deploy a producción
- **`gh-pages`**: NO editar manualmente, solo GitHub Actions

### 4. Rollback si Algo Falla

```bash
# Ver historial de gh-pages
git checkout gh-pages
git log --oneline

# Volver a versión anterior
git reset --hard COMMIT_HASH
git push origin gh-pages --force
```

## Monitoreo

### Ver Últimos Deploys

```bash
git log gh-pages --oneline -10
```

### Ver Tamaño del Build

Después de cada build, GitHub Actions mostrará:
```
Build completed:
- Total size: 1.2 MB
- JS chunks: 850 KB
- CSS: 120 KB
- Assets: 230 KB
```

### Analytics (Opcional)

Añadir Google Analytics al build para monitorear tráfico:

```javascript
// En index.html o App.jsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

## Recursos

- **GitHub Pages Docs**: https://docs.github.com/es/pages
- **GitHub Actions**: https://docs.github.com/es/actions
- **Vite Deploy Guide**: https://vitejs.dev/guide/static-deploy.html
- **React Router en GitHub Pages**: https://create-react-app.dev/docs/deployment/#github-pages

---

## Resumen de Comandos Rápidos

```bash
# Ver estado del deploy
gh run list --workflow=deploy.yml

# Re-ejecutar último deploy
gh run rerun --failed

# Ver logs del último deploy
gh run view --log

# Cambiar a rama gh-pages y ver contenido
git checkout gh-pages && ls

# Verificar URL del sitio
echo "https://getafeelectronic.github.io/miserviciotecnico/"
```

## Siguiente Paso

Una vez configurado todo:

1. Haz un commit de los archivos nuevos:
   ```bash
   git add .github/workflows/deploy.yml frontend/vite.config.js doc/DEPLOY-GITHUB-PAGES.md
   git commit -m "ci: configurar deploy automático a GitHub Pages"
   git push origin develop
   ```

2. El workflow se ejecutará automáticamente

3. Ve a Actions en GitHub para ver el progreso

4. Una vez completado, tu sitio estará en:
   **https://getafeelectronic.github.io/miserviciotecnico/**

¡Listo para deployar! 🚀
