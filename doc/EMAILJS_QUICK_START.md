# EmailJS - Guía Rápida de Configuración

> ⚡ Guía rápida para activar el formulario de contacto en 5 minutos

## ✅ Estado Actual

- ✅ EmailJS instalado (`@emailjs/browser`: `^4.4.1`)
- ✅ Componente Contacto.jsx implementado
- ✅ Validación de formularios con react-hook-form
- ✅ Analytics tracking integrado
- ✅ Modo simulado para desarrollo
- ✅ Manejo de errores y estados de carga

## 🚀 Activación en 3 Pasos

### Paso 1: Crear Cuenta EmailJS (2 min)

1. **Registro**: https://www.emailjs.com/
2. **Verificar email**
3. **Acceder al Dashboard**

### Paso 2: Configurar Servicio y Template (3 min)

#### 2.1 Agregar Email Service

```
Dashboard → Email Services → Add New Service
```

**Opciones recomendadas:**
- **Gmail**: Más usado, fácil configuración
- **Outlook/Hotmail**: Alternativa fiable
- **SendGrid**: Para mayor volumen

**Pasos:**
1. Selecciona proveedor
2. Conecta tu cuenta (OAuth)
3. **Copia el Service ID** (formato: `service_xxxxxx`)

#### 2.2 Crear Email Template

```
Dashboard → Email Templates → Create New Template
```

**Template recomendado:**

```html
Asunto: 📧 Nuevo contacto: {{subject}} - {{from_name}}

---
NUEVO MENSAJE DE CONTACTO
---

👤 Nombre: {{from_name}}
📧 Email: {{from_email}}
📱 Teléfono: {{from_phone}}
🏷️ Asunto: {{subject}}

💬 MENSAJE:
{{message}}

---
✅ Enviado desde: Mi Servicio Técnico
🌐 Web: https://getafeelectronic.github.io/miserviciotecnico/
📅 Fecha: {{current_date}}
```

**Configuración:**
- **Template Name**: `contact_form_template`
- **To Email**: `tu-email@empresa.com` (donde recibirás los mensajes)
- **From**: `{{from_name}}`
- **Reply-To**: `{{from_email}}`

**Copia el Template ID** (formato: `template_xxxxxx`)

#### 2.3 Obtener Public Key

```
Dashboard → Account → General → Public Key
```

**Copia tu Public Key** (formato: letras y números, ~20 caracteres)

### Paso 3: Configurar Variables de Entorno (1 min)

Edita `frontend/.env`:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx  
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui

# Email de destino (donde llegarán los mensajes)
VITE_BUSINESS_EMAIL=contacto@telerayo.com
```

**⚠️ Importante**: 
- Reemplaza `service_xxxxxx`, `template_xxxxxx` y la public key con tus valores reales
- NO uses comillas en los valores
- Reinicia el servidor después de editar `.env`

## 🧪 Probar el Formulario

### Desarrollo Local

```bash
cd frontend
npm run dev
```

1. Abre: http://localhost:5173/#/contacto
2. Rellena el formulario:
   - **Nombre**: Tu Nombre
   - **Email**: tu@email.com
   - **Teléfono**: 123456789
   - **Asunto**: Reparación de TV
   - **Mensaje**: Prueba de envío
3. Click **Enviar mensaje**
4. **Espera el mensaje de éxito** ✅
5. **Revisa tu email** (el configurado como "To Email" en EmailJS)

### Modo Simulado

Si NO configuras las credenciales de EmailJS:
- El formulario mostrará mensaje de éxito
- NO enviará emails reales
- Útil para desarrollo UI/UX
- Los logs mostrarán "Simulando envío..."

## 📊 Límites del Plan Gratuito

| Plan | Emails/mes | Coste |
|------|-----------|-------|
| **Gratuito** | 200 | $0 |
| Personal | 10,000 | $15/mes |
| Solo | 50,000 | $50/mes |

💡 **Recomendación**: Empieza con el plan gratuito (200 emails suficiente para validar)

## 🔍 Variables del Template

Variables disponibles en el template EmailJS:

```javascript
{
  from_name: "Nombre del cliente",
  from_email: "email@cliente.com",
  from_phone: "666555444",
  subject: "presupuesto | reparacion | garantia | otro",
  message: "Texto del mensaje...",
  to_email: "tu-email@empresa.com"
}
```

## 🎨 Personalizar Email Template

### Agregar Logo/Imagen

En el template HTML de EmailJS:

```html
<img src="https://tu-dominio.com/logo.png" alt="Logo" width="150">

<h2>Nuevo mensaje de contacto</h2>
<p><strong>De:</strong> {{from_name}}</p>
...
```

### Formato con Colores

```html
<div style="background: #f4f4f4; padding: 20px; border-radius: 8px;">
  <h2 style="color: #2563eb;">📧 Nuevo Contacto</h2>
  <div style="background: white; padding: 15px; border-left: 4px solid #2563eb;">
    <p><strong>Nombre:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Teléfono:</strong> {{from_phone}}</p>
    <hr>
    <p>{{message}}</p>
  </div>
</div>
```

## 🛠️ Troubleshooting

### ❌ Error: "Public Key is required"

**Solución**: Verifica que `VITE_EMAILJS_PUBLIC_KEY` esté en `.env` y reinicia el servidor

### ❌ Error: "Template not found"

**Solución**: 
1. Verifica que el Template ID sea correcto
2. Comprueba que el template esté activado en EmailJS dashboard

### ❌ Email no llega

**Causas comunes**:
1. Revisa carpeta de SPAM
2. Verifica el "To Email" en el template
3. Comprueba la configuración del servicio de email
4. Revisa Dashboard → Logs en EmailJS

### ❌ Error 400/401

**Solución**: 
- Public Key incorrecta
- Service ID o Template ID erróneos
- Verifica en EmailJS Dashboard → Account → General

## 📱 Analytics Tracking

El formulario ya incluye tracking automático:

```javascript
trackFormSubmit('contact', {
  has_phone: true/false,
  subject: 'presupuesto',
  simulated: false
});

trackConversion('contact_form', {
  source: 'contact_page',
  subject: 'presupuesto'
});
```

## 🔐 Seguridad

### ✅ Buenas Prácticas Implementadas

- ✅ Validación de campos con react-hook-form
- ✅ Sanitización de inputs
- ✅ Public Key en variables de entorno (no en código)
- ✅ Rate limiting en EmailJS (previene spam)
- ✅ Modo simulado para desarrollo

### 🛡️ Protección Anti-Spam

EmailJS incluye protección automática:
- Límite de emails por IP
- Detección de patrones de spam
- Captcha opcional (configurar en Dashboard)

### Agregar reCAPTCHA (Opcional)

1. Dashboard → Security → Enable reCAPTCHA
2. Obtén Site Key de Google reCAPTCHA
3. Agrega al template

## 📚 Recursos

- 📖 [Documentación oficial EmailJS](https://www.emailjs.com/docs/)
- 🎥 [Video tutorial oficial](https://www.youtube.com/watch?v=dgcYOm8n8ME)
- 💬 [EmailJS Discord Support](https://discord.gg/emailjs)
- 📝 [Documentación completa del proyecto](SETUP-CONTACTO.md)

## ✅ Checklist Final

Antes de ir a producción:

- [ ] Cuenta EmailJS creada y verificada
- [ ] Service conectado (Gmail/Outlook)
- [ ] Template creado con variables correctas
- [ ] Variables en `.env` configuradas
- [ ] Prueba local exitosa
- [ ] Email de prueba recibido
- [ ] Template HTML personalizado (opcional)
- [ ] reCAPTCHA configurado (opcional)
- [ ] Variables en Vercel/GitHub configuradas (producción)

## 🚀 Deploy a Producción

### GitHub Pages (Frontend)

**Las variables de entorno deben agregarse a GitHub Secrets:**

```
Repository → Settings → Secrets and variables → Actions → New repository secret
```

Agregar:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_BUSINESS_EMAIL`

**Actualizar `.github/workflows/deploy.yml`** si no lo contiene:

```yaml
- name: Build with env variables
  env:
    VITE_EMAILJS_SERVICE_ID: ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
    VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}
    VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}
    VITE_BUSINESS_EMAIL: ${{ secrets.VITE_BUSINESS_EMAIL }}
  run: npm run build
```

---

**🎉 ¡Listo!** Tu formulario de contacto está configurado y funcionando con EmailJS.
