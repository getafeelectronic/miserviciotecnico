# 🚀 Guía de Workflows: Deploy y Release

Este documento explica cómo funcionan los workflows automatizados de GitHub Actions para deployment y releases.

## 📋 Workflows Disponibles

### 1. Deploy Automático (`deploy.yml`)

**Disparo automático:**
- Push a `main` → Deploy a producción
- Push a `develop` → Deploy a staging (si está configurado)

**Disparo manual:**
- GitHub Actions → Deploy to GitHub Pages → Run workflow

**Qué hace:**
1. ✅ Valida que todos los GitHub Secrets estén configurados
2. 📦 Instala dependencias (npm ci)
3. 🏗️ Construye el proyecto (npm run build)
4. 🚀 Despliega a GitHub Pages (rama `gh-pages`)

**URL de producción:**
https://getafeelectronic.github.io/miserviciotecnico/

---

### 2. Crear Release (`release.yml`)

**Disparo automático:**
- Push de un tag con formato `v*.*.*` (ej: v0.4.0, v1.0.0)

**Disparo manual:**
- GitHub Actions → Create Release → Run workflow

**Qué hace:**
1. 📦 Construye el proyecto
2. 🗜️ Crea archivo ZIP del build
3. 📝 Genera changelog automático desde commits
4. 🏷️ Crea GitHub Release con:
   - Notas de versión
   - Archivo ZIP adjunto
   - Changelog
   - Instrucciones de instalación

---

## 🎯 Flujo de Trabajo Recomendado

### Para Deploy Normal (sin release)

```bash
# 1. Hacer cambios en feature branch
git checkout -b feature/nueva-funcionalidad
# ... hacer cambios ...
git add .
git commit -m "feat: nueva funcionalidad"

# 2. Push a feature branch
git push origin feature/nueva-funcionalidad

# 3. Crear Pull Request a main
gh pr create --base main --title "Nueva funcionalidad"

# 4. Merge del PR (manual en GitHub UI)
# Esto automáticamente dispara el deploy

# 5. Verificar deploy
# https://github.com/getafeelectronic/miserviciotecnico/actions
```

---

### Para Crear un Release con Versionado

#### Opción A: Usando script helper (recomendado)

```bash
# Crear release v0.4.0
.github/scripts/create-release.sh 0.4.0

# Con mensaje personalizado
.github/scripts/create-release.sh 0.4.0 "Sistema completo de servicios dinámicos"
```

#### Opción B: Manualmente con git tags

```bash
# 1. Asegurarte de estar en main actualizado
git checkout main
git pull origin main

# 2. Crear tag con versión
git tag -a v0.4.0 -m "Release v0.4.0 - Sistema de servicios dinámicos"

# 3. Push del tag (esto dispara el workflow)
git push origin v0.4.0

# 4. Verificar que el workflow se ejecutó
# https://github.com/getafeelectronic/miserviciotecnico/actions

# 5. El release aparecerá en:
# https://github.com/getafeelectronic/miserviciotecnico/releases
```

#### Opción C: Usando GitHub CLI

```bash
# Crear tag y release en un solo comando
gh release create v0.4.0 \
  --title "Release v0.4.0" \
  --notes "Sistema completo de servicios dinámicos con páginas de detalle" \
  --generate-notes

# Esto ejecutará el workflow automáticamente
```

---

## 📦 Versionado Semántico

Seguimos **Semantic Versioning** (semver): `MAJOR.MINOR.PATCH`

### Formato: `vX.Y.Z`

- **MAJOR (X)**: Cambios incompatibles en la API
  - Ejemplo: `v1.0.0` → `v2.0.0`
  - Cuándo: Reestructuración completa, cambios breaking

- **MINOR (Y)**: Nuevas funcionalidades (compatibles)
  - Ejemplo: `v0.3.0` → `v0.4.0`
  - Cuándo: Nueva página, nueva integración, feature importante

- **PATCH (Z)**: Corrección de bugs
  - Ejemplo: `v0.3.0` → `v0.3.1`
  - Cuándo: Hotfix, bugfix, ajustes menores

### Ejemplos de Versiones

```
v0.1.0 - Primera versión (MVP básico)
v0.2.0 - Añadido formulario de contacto
v0.3.0 - Reviews dinámicas + SEO
v0.3.1 - Fix: Configuración Supabase
v0.4.0 - Sistema completo de servicios dinámicos
v1.0.0 - Release estable para producción
```

---

## 🔑 Configuración de Secrets

Para que los workflows funcionen, debes configurar GitHub Secrets.

### Secrets Obligatorios

```
VITE_BUSINESS_EMAIL
VITE_BUSINESS_PHONE
VITE_BUSINESS_ADDRESS
VITE_BUSINESS_HOURS
VITE_BUSINESS_COORDINATES_LAT
VITE_BUSINESS_COORDINATES_LNG
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

### Secrets Opcionales

```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
VITE_GOOGLE_MAPS_API_KEY
```

### Cómo configurarlos

#### Opción A: Script automático

```bash
# Linux/Mac
.github/scripts/setup-secrets.sh

# Windows
.github/scripts/setup-secrets.ps1
```

#### Opción B: Manual en GitHub

1. GitHub → Repositorio → Settings
2. Security → Secrets and variables → Actions
3. New repository secret
4. Añadir cada secret uno por uno

---

## 🐛 Solución de Problemas

### El deploy falla con "Missing secrets"

**Causa:** No están configurados los GitHub Secrets obligatorios

**Solución:**
```bash
# Ejecutar script de configuración
.github/scripts/setup-secrets.sh

# O configurar manualmente en:
# https://github.com/getafeelectronic/miserviciotecnico/settings/secrets/actions
```

---

### El release no se crea automáticamente

**Causa 1:** El tag no tiene formato correcto

**Solución:**
```bash
# ✅ Correcto
git tag v0.4.0

# ❌ Incorrecto (falta 'v')
git tag 0.4.0

# ❌ Incorrecto (formato no semver)
git tag version-0.4
```

**Causa 2:** No se hizo push del tag

**Solución:**
```bash
# Después de crear el tag, hacer push
git push origin v0.4.0

# O push de todos los tags
git push --tags
```

---

### Quiero eliminar un tag/release erróneo

```bash
# 1. Eliminar tag localmente
git tag -d v0.4.0

# 2. Eliminar tag en remoto
git push origin --delete v0.4.0

# 3. Eliminar release en GitHub
gh release delete v0.4.0 --yes

# 4. Crear tag correcto
git tag -a v0.4.0 -m "Release v0.4.0"
git push origin v0.4.0
```

---

## 📊 Monitoreo de Workflows

### Ver estado de workflows en ejecución

```bash
# Listar workflows activos
gh workflow list

# Ver ejecuciones recientes
gh run list

# Ver detalles de una ejecución específica
gh run view <run-id>

# Ver logs de una ejecución
gh run view <run-id> --log
```

### En GitHub UI

1. Repositorio → Actions
2. Ver workflows en ejecución
3. Click en workflow → Ver logs detallados
4. Download artifacts (si los hay)

---

## 🎨 Personalización

### Cambiar dominio personalizado (CNAME)

Editar `.github/workflows/deploy.yml`:

```yaml
- name: Deploy a gh-pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    cname: tu-dominio.com  # <-- Cambiar aquí
```

### Añadir paso adicional al build

Editar `.github/workflows/deploy.yml` o `release.yml`:

```yaml
# Después del paso "Build proyecto"
- name: Ejecutar tests
  working-directory: ./frontend
  run: npm run test

- name: Ejecutar linter
  working-directory: ./frontend
  run: npm run lint
```

### Notificaciones personalizadas

Añadir al final de cualquier workflow:

```yaml
- name: Notificar en Discord/Slack
  uses: sarisia/actions-status-discord@v1
  if: always()
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
```

---

## 📚 Recursos Adicionales

- **GitHub Actions Docs**: https://docs.github.com/actions
- **Semantic Versioning**: https://semver.org/
- **GitHub CLI Docs**: https://cli.github.com/manual/
- **peaceiris/actions-gh-pages**: https://github.com/peaceiris/actions-gh-pages
- **softprops/action-gh-release**: https://github.com/softprops/action-gh-release

---

## ✅ Checklist Pre-Deploy

Antes de hacer un deploy a producción:

- [ ] Tests pasan localmente (`npm run test`)
- [ ] Build funciona sin errores (`npm run build`)
- [ ] Actualizado `package.json` version
- [ ] Actualizado `CHANGELOG.md` (si existe)
- [ ] PR ha sido revisado y aprobado
- [ ] Secrets están configurados en GitHub
- [ ] Supabase está configurado y accesible
- [ ] El servidor de desarrollo funciona (`npm run dev`)

---

## ✅ Checklist Pre-Release

Antes de crear un release:

- [ ] Branch `main` está actualizado
- [ ] Todos los tests pasan
- [ ] Versión sigue semver (`vX.Y.Z`)
- [ ] Changelog está actualizado
- [ ] Tag no existe previamente
- [ ] Documentación está actualizada
- [ ] Se han probado las funcionalidades nuevas

---

*Última actualización: 26 de abril de 2026*
