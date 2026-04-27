## 🎉 Nuevas Funcionalidades

### CRUD Completo de Reviews
Sistema de gestión completo de opiniones de clientes desde el panel de administración:

- ✅ **Crear** nuevas reviews con formulario validado
- ✅ **Editar** reviews existentes con datos pre-cargados
- ✅ **Eliminar** reviews con modal de confirmación
- ✅ **Toggle activo/inactivo** para controlar visibilidad en el frontend
- ✅ **Rating interactivo** con 5 estrellas
- ✅ **Contador de caracteres** (límite 500)
- ✅ **Validación** completa con Bootstrap

### Sistema de Fechas Dinámicas ⏰
Las fechas ahora se calculan automáticamente en tiempo real:

- Backend guarda fechas en formato ISO (`YYYY-MM-DD`)
- Frontend calcula y muestra tiempo relativo:
  - `Hoy` / `Ayer`
  - `Hace 5 días`
  - `Hace 3 semanas`
  - `Hace 2 meses`
  - `Hace 1 año y 3 meses`

**Ventaja**: No es necesario actualizar texto manualmente, siempre estará actualizado.

### Correcciones Importantes 🐛

- ✅ Campo `text` en lugar de `comment` (coincide con esquema de Supabase)
- ✅ Orden de estrellas corregido en formulario de edición
- ✅ Campo `is_active` ahora opcional (compatible con reviews legacy)
- ✅ Favicon añadido al panel de administración

---

## 📦 Deploy

### Frontend
✅ **Automático** via GitHub Actions → GitHub Pages
🔗 https://getafeelectronic.github.io/miserviciotecnico/

### Backend
⏳ **Requiere configuración manual en Vercel**

**Pasos para configurar Vercel:**

1. **Importar proyecto** en https://vercel.com/dashboard
2. **Root Directory**: Seleccionar `backend` (IMPORTANTE!)
3. **Variables de entorno** (Settings → Environment Variables):
   ```bash
   SECRET_KEY=<genera con: python -c "import secrets; print(secrets.token_hex(32))">
   SUPABASE_URL=https://lysejfhxackcmoksclvm.supabase.co
   SUPABASE_KEY=<anon key de Supabase>
   SUPABASE_SERVICE_KEY=<service_role key de Supabase>
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=<password seguro>
   ```
4. **Deploy** → https://your-project.vercel.app

📖 **Documentación completa**: Ver `doc/VERCEL_SETUP.md`

---

## 📊 Estadísticas del Release

- **8 archivos modificados**
- **554 líneas añadidas** / 11 eliminadas
- **1 archivo nuevo**: `backend/app/templates/reviews/form.html` (184 líneas)
- **Documentación**: `doc/VERCEL_SETUP.md` actualizado

---

## 🧪 Testing Recomendado

- [ ] Verificar frontend en GitHub Pages
- [ ] Configurar Vercel siguiendo `doc/VERCEL_SETUP.md`
- [ ] Probar CRUD desde panel admin (`/reviews`)
- [ ] Verificar cálculo de fechas en reviews del frontend
- [ ] Actualizar reviews existentes con fechas ISO

---

## 🔗 Links Útiles

- Frontend: https://getafeelectronic.github.io/miserviciotecnico/
- PR: #3
- Documentación Vercel: `doc/VERCEL_SETUP.md`
