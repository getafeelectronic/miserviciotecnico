# Estrategia de Documentación: GitHub Wiki vs doc/

## 📖 ¿Qué es GitHub Wiki?

GitHub Wiki es una sección separada de tu repositorio que funciona como una documentación colaborativa en formato wiki. Es ideal para documentación extensa, guías de usuario, y conocimiento que evoluciona con el tiempo.

**URL de tu Wiki**: https://github.com/getafeelectronic/miserviciotecnico/wiki

## 🎯 Diferencias Clave: Wiki vs doc/

| Característica | GitHub Wiki | Carpeta doc/ |
|----------------|-------------|--------------|
| **Versionado** | Git separado | Mismo repo (versionado estricto) |
| **Edición** | Interfaz web simple | Requiere commit/push |
| **Formato** | Markdown, AsciiDoc, etc. | Markdown, SQL, etc. |
| **Colaboración** | Cualquiera puede editar (configurable) | Solo con permisos de commit |
| **Búsqueda** | Búsqueda integrada de GitHub | Búsqueda manual |
| **Deploy** | No se despliega con el sitio | Puede incluirse en build |
| **Indexación** | SEO limitado | Puede exponerse vía web |
| **Organización** | Sidebar navegable | Estructura de carpetas |
| **Historial** | Separado del código | Mismo historial que código |

## 🏗️ Estrategia Recomendada para Mi Servicio Técnico

### 📁 Usar `doc/` para:

#### 1. **Documentación Técnica del Código**
- Setup de desarrollo (`SETUP-FRONTEND.md`, `VERCEL_SETUP.md`)
- Configuración de bases de datos (`SUPABASE_SETUP.md`, `SUPABASE_SERVICES.sql`)
- Workflows de desarrollo (`WORKFLOWS.md`, `CONVENTIONAL-COMMITS.md`)
- Scripts SQL y migraciones

**Ventaja**: Versionado estricto con el código. Si cambias el código, actualizas el doc/ en el mismo commit.

#### 2. **Documentación de Arquitectura**
- Estructura del proyecto
- Diagramas técnicos
- Decisiones de diseño
- Stack tecnológico (`valoracion-stack-tecnologico.md`)

**Ventaja**: Los cambios arquitectónicos quedan registrados históricamente.

#### 3. **Guías de Despliegue**
- Deploy a GitHub Pages (`DEPLOY-GITHUB-PAGES.md`)
- Configuración de producción
- CI/CD pipelines

**Ventaja**: Documentación crítica que debe estar versionada y respaldada.

### 📚 Usar **GitHub Wiki** para:

#### 1. **Documentación de Usuario Final**
- **Cómo usar el portal** (guía para clientes)
- **Preguntas frecuentes (FAQ)** sobre reparaciones
- **Guía de servicios** (qué esperar, garantías, procesos)
- **Catálogo de reparaciones comunes** con fotos/ejemplos

**Ventaja**: Contenido que cambia frecuentemente sin afectar el repo. Editable por personal no técnico.

#### 2. **Base de Conocimiento del Negocio**
- **Procedimientos operativos**: 
  - Cómo atender una solicitud de reparación
  - Proceso de diagnóstico estándar
  - Checklist de control de calidad
- **Catálogo de averías comunes**:
  - TV Samsung: problemas típicos por modelo
  - LG: fallos recurrentes y soluciones
  - Sony: componentes propensos a fallo
- **Proveedores de repuestos**:
  - Lista de proveedores confiables
  - Tiempos de entrega
  - Códigos de descuento
- **Historial de reparaciones complejas**:
  - Casos especiales resueltos
  - Soluciones creativas
  - Lecciones aprendidas

**Ventaja**: Documentación viva que se actualiza constantemente. Útil para entrenamiento de nuevos técnicos.

#### 3. **Guías de Contenido para Marketing**
- **Plantillas de posts para redes sociales**
- **Ideas de contenido para blog** (si se implementa)
- **Calendario editorial**
- **Guías de estilo** para comunicación con clientes

**Ventaja**: Colaboración fácil con equipo de marketing sin acceso al código.

#### 4. **Documentación de Procesos Administrativos**
- **Gestión de garantías**: Procedimiento completo
- **Facturación y pagos**: Métodos aceptados, proceso
- **Política de devoluciones y cancelaciones**
- **Gestión de inventario de repuestos**

**Ventaja**: Documentación accesible sin necesidad de clonar el repositorio.

#### 5. **Roadmap Público y Changelog**
- **Próximas funcionalidades** del portal
- **Mejoras planificadas** del servicio
- **Changelog público** (resumen no técnico de releases)
- **Solicitudes de funcionalidades** de usuarios

**Ventaja**: Transparencia con usuarios y recopilación de feedback.

## 🚀 Estructura Propuesta para la Wiki

### Página Principal (Home)
```markdown
# Bienvenido a Mi Servicio Técnico - Wiki

## 📱 Para Clientes
- [Cómo solicitar una reparación](Como-solicitar-reparacion)
- [Preguntas frecuentes (FAQ)](FAQ-Clientes)
- [Política de garantías](Politica-Garantias)
- [Qué esperar del proceso](Proceso-Reparacion)

## 🔧 Para Técnicos
- [Base de conocimiento de reparaciones](Base-Conocimiento)
- [Procedimientos operativos estándar](Procedimientos-SOP)
- [Proveedores de repuestos](Proveedores-Repuestos)
- [Casos de estudio](Casos-Estudio)

## 📊 Administración
- [Gestión de garantías](Gestion-Garantias)
- [Facturación y pagos](Facturacion-Pagos)
- [Inventario de repuestos](Inventario-Repuestos)

## 🗺️ Roadmap
- [Próximas funcionalidades](Roadmap-Portal)
- [Changelog público](Changelog-Publico)
```

### Páginas de Contenido (Ejemplos)

#### `Base-Conocimiento.md`
```markdown
# Base de Conocimiento de Reparaciones

## Samsung TV LCD/LED

### Problemas Comunes
- **No enciende (LED parpadea)**: 95% fuente de alimentación
  - Modelos afectados: UN55, UN60 series
  - Solución: Reemplazo capacitores C304, C305
  - Tiempo: 30 min
  - Coste medio: 45€

- **Líneas verticales**: T-CON defectuosa
  - Modelos: Series 6, 7, 8 (2015-2018)
  - Solución: Reemplazo T-CON completa
  - Tiempo: 1 hora
  - Coste medio: 85€

[... más contenido técnico ...]
```

#### `FAQ-Clientes.md`
```markdown
# Preguntas Frecuentes - Clientes

## Proceso de Reparación

### ¿Cuánto tarda el diagnóstico?
Generalmente 24-48 horas. Para modelos menos comunes puede tardar hasta 3-4 días.

### ¿El diagnóstico tiene coste?
No, el diagnóstico es completamente gratuito y sin compromiso.

### ¿Qué pasa si no acepto la reparación?
No hay ningún coste. Devolvemos tu televisor sin cargo alguno.

[... más FAQs ...]
```

#### `Procedimientos-SOP.md`
```markdown
# Procedimientos Operativos Estándar (SOP)

## Recepción de Televisor

1. **Inspección visual inicial**
   - Fotografiar estado exterior
   - Documentar rayones, golpes, daños previos
   - Registrar accesorios incluidos (mando, cables)

2. **Registro en sistema**
   - Crear ficha de cliente
   - Asignar número de servicio
   - Anotar síntomas reportados por cliente

3. **Prueba de encendido**
   - Intentar encender el TV
   - Documentar comportamiento visual
   - Fotografiar pantalla si hay imagen

[... más procedimientos ...]
```

## 🛠️ Cómo Configurar la Wiki

### Paso 1: Habilitar la Wiki

```bash
# Desde GitHub CLI
gh repo edit getafeelectronic/miserviciotecnico --enable-wiki
```

O desde la interfaz web:
1. Ve a tu repositorio en GitHub
2. Settings → Features → Wiki (checkbox)
3. Guarda cambios

### Paso 2: Crear Página Inicial

1. Ve a https://github.com/getafeelectronic/miserviciotecnico/wiki
2. Click en "Create the first page"
3. Añade contenido de bienvenida
4. Click "Save Page"

### Paso 3: Configurar Permisos

**Settings → Wiki → Access**:
- ✅ **Restricto (Recomendado)**: Solo colaboradores pueden editar
- ❌ Público: Cualquiera puede editar (riesgo de vandalismo)

### Paso 4: Clonar Wiki Localmente (Opcional)

```bash
# La wiki es un repo Git separado
git clone https://github.com/getafeelectronic/miserviciotecnico.wiki.git

cd miserviciotecnico.wiki

# Editar archivos .md normalmente
vim Home.md

# Commit y push
git add .
git commit -m "docs: update FAQ section"
git push origin master
```

## 📝 Plantilla de Página Wiki Estándar

```markdown
# [Título de la Página]

> **Última actualización**: 28 de abril de 2026  
> **Responsable**: [Nombre del responsable]

## Tabla de Contenidos
- [Sección 1](#seccion-1)
- [Sección 2](#seccion-2)
- [Recursos relacionados](#recursos-relacionados)

## Sección 1

Contenido...

## Sección 2

Contenido...

## Recursos Relacionados

- [Enlace a otra página wiki](Otra-Pagina)
- [Archivo en doc/](../blob/main/doc/ARCHIVO.md)
- [URL externa](https://ejemplo.com)

---

📌 **Nota**: Si encuentras errores o deseas sugerir mejoras, [abre un issue](https://github.com/getafeelectronic/miserviciotecnico/issues/new).
```

## 🔗 Integración Wiki ↔ Repositorio

### Enlazar desde README.md a Wiki

```markdown
## 📚 Documentación

### Para Desarrolladores
- [Setup del proyecto](doc/SETUP-FRONTEND.md)
- [Workflows de Git](doc/WORKFLOWS.md)
- [Deploy a producción](doc/DEPLOY-GITHUB-PAGES.md)

### Para Usuarios y Equipo
- [📖 Wiki: Guías de usuario](https://github.com/getafeelectronic/miserviciotecnico/wiki)
- [FAQ Clientes](https://github.com/getafeelectronic/miserviciotecnico/wiki/FAQ-Clientes)
- [Base de Conocimiento Técnico](https://github.com/getafeelectronic/miserviciotecnico/wiki/Base-Conocimiento)
```

### Enlazar desde Wiki a doc/

```markdown
Para configuración técnica del proyecto, consulta:
- [SUPABASE_SETUP.md](https://github.com/getafeelectronic/miserviciotecnico/blob/main/doc/SUPABASE_SETUP.md)
- [VERCEL_SETUP.md](https://github.com/getafeelectronic/miserviciotecnico/blob/main/doc/VERCEL_SETUP.md)
```

## 📊 Ejemplo de Estructura Completa

```
miserviciotecnico/
│
├── doc/                          # Documentación técnica versionada
│   ├── SETUP-FRONTEND.md        # Setup de desarrollo
│   ├── SUPABASE_SETUP.md        # Config de base de datos
│   ├── WORKFLOWS.md             # Git workflows
│   ├── DEPLOY-GITHUB-PAGES.md   # Guía de deploy
│   └── valoracion-stack-tecnologico.md
│
└── [GitHub Wiki]                # Documentación colaborativa
    ├── Home.md                  # Página principal
    ├── FAQ-Clientes.md          # Preguntas frecuentes
    ├── Base-Conocimiento.md     # DB de reparaciones
    ├── Procedimientos-SOP.md    # Procesos operativos
    ├── Proveedores-Repuestos.md # Directorio proveedores
    ├── Gestion-Garantias.md     # Proceso de garantías
    ├── Roadmap-Portal.md        # Funcionalidades futuras
    └── Changelog-Publico.md     # Historial de cambios
```

## 🎯 Ventajas de Esta Estrategia Dual

### ✅ Para Desarrolladores
- Documentación técnica versionada con el código
- Fácil revisión en Pull Requests
- Cambios documentados en commits

### ✅ Para el Negocio
- Base de conocimiento accesible sin Git
- Edición rápida sin proceso de desarrollo
- Colaboración con personal no técnico

### ✅ Para Clientes (Potencial)
- FAQ públicamente accesible
- Transparencia en procesos
- Roadmap visible de mejoras

## 🚀 Próximos Pasos Recomendados

1. **Habilitar la Wiki** en Settings
2. **Crear página Home** con estructura básica
3. **Migrar contenido apropiado**:
   - FAQs generales de negocio → Wiki
   - SUPABASE_ANALYTICS.md → Mantener en doc/ (técnico)
   - Procedimientos de reparación → Wiki
4. **Configurar permisos** (restricto a colaboradores)
5. **Entrenar al equipo** en uso de la Wiki
6. **Mantener doc/** para documentación técnica crítica

## 📌 Regla de Oro

> **Si el contenido requiere versionado estricto con el código → `doc/`**  
> **Si el contenido es conocimiento vivo que evoluciona → Wiki**

## 🔄 Mantenimiento

- **doc/**: Actualizar cuando cambies código relacionado
- **Wiki**: Revisar y actualizar mensualmente
- **Sincronización**: Enlazar entre ambos cuando sea relevante

---

**Conclusión**: La combinación de `doc/` + Wiki te da lo mejor de ambos mundos: versionado riguroso para desarrollo y flexibilidad colaborativa para conocimiento del negocio.
