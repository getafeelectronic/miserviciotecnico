# Guía de Conventional Commits para el Proyecto

## ¿Qué son los Conventional Commits?

Los Conventional Commits son una convención para mensajes de commit que facilita:
- Generar CHANGELOG automáticamente
- Determinar automáticamente las versiones semánticas
- Comunicar la naturaleza de los cambios
- Activar procesos de build y publicación

## Estructura del Mensaje

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[footer(s) opcional(es)]
```

### Ejemplos:
```
feat: sistema de consentimiento de cookies
fix: corregir centrado del body en mobile
docs: actualizar guía de instalación
chore: bump version to 0.2.0
```

## Tipos de Commit

### Principales (generan cambios en CHANGELOG)

#### `feat:` - Nueva Funcionalidad
Se usa cuando añades una nueva característica.

**Ejemplos:**
```bash
git commit -m "feat: añadir página de Nosotros"
git commit -m "feat: sistema de cookies con GDPR"
git commit -m "feat(contacto): formulario con validación"
```

#### `fix:` - Corrección de Bugs
Para cualquier corrección de errores.

**Ejemplos:**
```bash
git commit -m "fix: resolver scroll horizontal en mobile"
git commit -m "fix: corregir enlace roto en footer"
git commit -m "fix(header): alineación del logo en tablet"
```

### Secundarios (cambios sin nueva funcionalidad)

#### `docs:` - Documentación
Solo cambios en documentación.

**Ejemplos:**
```bash
git commit -m "docs: actualizar README con instrucciones"
git commit -m "docs: añadir guía de configuración EmailJS"
```

#### `style:` - Formato
Cambios que no afectan el significado del código (espacios, formato, punto y coma).

**Ejemplos:**
```bash
git commit -m "style: format código con prettier"
git commit -m "style: ajustar indentación en Footer.jsx"
```

#### `refactor:` - Refactorización
Cambio de código que no corrige bugs ni añade funcionalidad.

**Ejemplos:**
```bash
git commit -m "refactor: extraer lógica de validación a hook"
git commit -m "refactor: simplificar componente Header"
```

#### `perf:` - Rendimiento
Mejoras de rendimiento.

**Ejemplos:**
```bash
git commit -m "perf: lazy load de imágenes en hero"
git commit -m "perf: optimizar bundle con code splitting"
```

#### `test:` - Tests
Añadir o modificar tests.

**Ejemplos:**
```bash
git commit -m "test: añadir tests para CookieConsent"
git commit -m "test: actualizar snapshots de Header"
```

#### `build:` - Build System
Cambios en sistema de build o dependencias.

**Ejemplos:**
```bash
git commit -m "build: actualizar vite a v5.4.21"
git commit -m "build: añadir dependencia framer-motion"
```

#### `ci:` - Integración Continua
Cambios en archivos de CI/CD.

**Ejemplos:**
```bash
git commit -m "ci: añadir workflow de deploy"
git commit -m "ci: configurar GitHub Actions"
```

#### `chore:` - Mantenimiento
Tareas de mantenimiento, cambios en herramientas, etc.

**Ejemplos:**
```bash
git commit -m "chore: bump version to 0.2.0"
git commit -m "chore: actualizar .gitignore"
git commit -m "chore: limpiar comentarios obsoletos"
```

## Ámbito Opcional

Puedes especificar el ámbito del cambio entre paréntesis:

```bash
git commit -m "feat(header): menú hamburguesa responsive"
git commit -m "fix(footer): datos desde .env"
git commit -m "docs(setup): guía de Google Maps"
```

**Ámbitos comunes en este proyecto:**
- `header` - Componente Header
- `footer` - Componente Footer
- `home` - Página Home
- `contacto` - Página Contacto
- `nosotros` - Página Nosotros
- `servicios` - Página Servicios
- `cookies` - Sistema de cookies
- `layout` - Layout general
- `api` - Integraciones API
- `deps` - Dependencias

## Breaking Changes (Cambios Incompatibles)

Para cambios que rompen compatibilidad hacia atrás, añade `!` después del tipo/ámbito:

```bash
git commit -m "feat!: cambiar estructura de .env"
git commit -m "refactor!: renombrar componente principal"
```

O añade `BREAKING CHANGE:` en el footer:

```bash
git commit -m "feat: nueva API de configuración

BREAKING CHANGE: la variable VITE_API_URL ahora se llama VITE_BACKEND_URL"
```

## Mensajes de Merge

Para merges entre ramas, usa mensajes descriptivos:

```bash
# Merge de feature a develop
git merge feature/web-corporativa -m "merge: integrar web corporativa a develop

- Sistema de cookies GDPR
- Página Nosotros completa
- Footer dinámico con .env
- Mejoras de layout responsive

Closes #1"

# Merge de develop a main
git merge develop -m "merge: release v0.2.0 a producción

- Todas las funcionalidades de v0.2.0
- Tests completados
- Documentación actualizada"
```

## Palabras Clave en Commits/PRs

GitHub reconoce estas palabras clave para cerrar issues automáticamente:

### Cerrar Issues
```
closes #123
fixes #123
resolves #123
```

### Ejemplos en commits:
```bash
git commit -m "fix: corregir error en formulario

Closes #45"

git commit -m "feat: añadir página servicios

Resolves #12, resolves #13"
```

### En Pull Requests:
Incluye en la descripción del PR:
```markdown
## Cambios
- Sistema de cookies implementado
- Página Nosotros completa

Closes #1
Fixes #2
```

## Workflow Recomendado

### 1. Trabajo en Feature Branch
```bash
git checkout -b feature/nombre-descriptivo
# hacer cambios...
git add .
git commit -m "feat: descripción breve del cambio"
git push -u origin feature/nombre-descriptivo
```

### 2. Commits Incrementales
```bash
# Primer commit
git commit -m "feat: estructura base del componente"

# Segundo commit
git commit -m "style: añadir estilos responsive"

# Tercer commit
git commit -m "test: añadir tests unitarios"
```

### 3. Merge a Develop
```bash
git checkout develop
git pull origin develop
git merge feature/nombre --no-ff -m "merge: integrar feature/nombre a develop

- Funcionalidad X implementada
- Tests añadidos
- Documentación actualizada

Closes #issue-number"
git push origin develop
```

### 4. Release
```bash
# Actualizar versión
git commit -m "chore: bump version to X.Y.Z"

# Merge a main
git checkout main
git pull origin main
git merge develop --no-ff -m "merge: release vX.Y.Z

- Feature A
- Feature B
- Bugfixes varios"

# Crear tag
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin main --tags
```

## Herramientas Útiles

### Commitizen
Para ayuda interactiva al crear commits:
```bash
npm install -g commitizen
commitizen init cz-conventional-changelog --save-dev --save-exact
```

Luego usa `git cz` en lugar de `git commit`.

### Commitlint
Para validar mensajes de commit:
```bash
npm install --save-dev @commitlint/{config-conventional,cli}
```

### Standard-version
Para generar CHANGELOG y versiones automáticamente:
```bash
npm install --save-dev standard-version
npm run release
```

## Referencias

- **Conventional Commits**: https://www.conventionalcommits.org/
- **Semantic Versioning**: https://semver.org/
- **GitHub Keywords**: https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue

---

## Resumen Rápido

```bash
feat:      Nueva funcionalidad
fix:       Corrección de bugs
docs:      Cambios en documentación
style:     Formato de código
refactor:  Refactorización
perf:      Mejoras de rendimiento
test:      Añadir/modificar tests
build:     Sistema de build
ci:        CI/CD
chore:     Mantenimiento

# Cerrar issues:
closes #N, fixes #N, resolves #N

# Breaking changes:
feat!: o BREAKING CHANGE: en footer
```
