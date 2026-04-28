# EmailJS - Templates para Doble Envío

> 📧 Configuración de 2 templates: uno para el negocio y otro de confirmación para el cliente

## 🎯 Objetivo

Cuando un cliente envía el formulario de contacto:
1. ✉️ **Email al negocio** (`ruizrjan@gmail.com`) → Con todos los datos del formulario
2. ✉️ **Email al cliente** (su email) → Confirmación automática de que recibimos su mensaje

---

## 📝 Template 1: Para el Negocio

### Configuración en EmailJS:

1. Ve a: https://dashboard.emailjs.com/admin/templates
2. Click **"Create New Template"**
3. **Template Name**: `contact_form_to_business`

### Settings del Template:

```yaml
To Email: ruizrjan@gmail.com
From Name: {{from_name}}
From Email: noreply@miserviciotecnico.com
Reply-To: {{from_email}}
Subject: 📧 Nuevo contacto: {{subject}} - {{from_name}}
```

### Contenido del Template:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
    .container { background: white; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; margin: -30px -30px 20px -30px; }
    .header h1 { margin: 0; font-size: 24px; }
    .info-row { margin: 15px 0; padding: 10px; background: #f8fafc; border-left: 4px solid #2563eb; }
    .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; }
    .value { font-size: 16px; color: #1e293b; margin-top: 5px; }
    .message-box { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 Nuevo Mensaje de Contacto</h1>
    </div>
    
    <p style="color: #64748b; font-size: 14px;">Has recibido un nuevo mensaje desde el formulario de contacto de tu web.</p>
    
    <div class="info-row">
      <div class="label">👤 Nombre del Cliente</div>
      <div class="value">{{from_name}}</div>
    </div>
    
    <div class="info-row">
      <div class="label">📧 Email</div>
      <div class="value"><a href="mailto:{{from_email}}" style="color: #2563eb; text-decoration: none;">{{from_email}}</a></div>
    </div>
    
    <div class="info-row">
      <div class="label">📱 Teléfono</div>
      <div class="value"><a href="tel:{{from_phone}}" style="color: #2563eb; text-decoration: none;">{{from_phone}}</a></div>
    </div>
    
    <div class="info-row">
      <div class="label">🏷️ Asunto</div>
      <div class="value">{{subject}}</div>
    </div>
    
    <div style="margin: 25px 0;">
      <div class="label" style="margin-bottom: 10px;">💬 Mensaje:</div>
      <div class="message-box">
        <p style="margin: 0; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">{{message}}</p>
      </div>
    </div>
    
    <div style="background: #fef3c7; border: 1px solid #fde047; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #854d0e; font-size: 14px;">
        ⚡ <strong>Acción requerida:</strong> Responde al cliente lo antes posible haciendo clic en "Reply" o llamando al número de teléfono proporcionado.
      </p>
    </div>
    
    <div class="footer">
      <p>✅ Mensaje enviado desde: <strong>Mi Servicio Técnico</strong></p>
      <p>🌐 <a href="https://getafeelectronic.github.io/miserviciotecnico/" style="color: #2563eb; text-decoration: none;">Ir al sitio web</a></p>
      <p style="margin-top: 15px; font-size: 11px;">Este email fue generado automáticamente desde el formulario de contacto.</p>
    </div>
  </div>
</body>
</html>
```

### Variables usadas:
```javascript
{
  from_name: "Nombre del cliente",
  from_email: "email@cliente.com",
  from_phone: "666555444",
  subject: "presupuesto | reparacion | garantia | otro",
  message: "Mensaje del cliente..."
}
```

---

## 📝 Template 2: Confirmación para el Cliente

### Configuración en EmailJS:

1. **Template Name**: `contact_form_confirmation`

### Settings del Template:

```yaml
To Email: {{to_email}}
From Name: Mi Servicio Técnico
From Email: noreply@miserviciotecnico.com
Reply-To: ruizrjan@gmail.com
Subject: ✅ Hemos recibido tu mensaje - Mi Servicio Técnico
```

### Contenido del Template:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
    .container { background: white; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0; margin: -30px -30px 20px -30px; text-align: center; }
    .header h1 { margin: 0; font-size: 26px; }
    .checkmark { font-size: 48px; margin-bottom: 10px; }
    .info-box { background: #f0fdf4; border: 2px solid #86efac; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .summary-box { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
    .contact-box { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    a { color: #2563eb; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="checkmark">✅</div>
      <h1>¡Mensaje Recibido!</h1>
    </div>
    
    <p style="font-size: 16px; color: #1e293b;">Hola <strong>{{to_name}}</strong>,</p>
    
    <div class="info-box">
      <p style="margin: 0; color: #166534; font-size: 15px;">
        ✓ Hemos recibido tu mensaje correctamente y lo procesaremos lo antes posible.<br>
        ✓ Te responderemos en las próximas <strong>24-48 horas</strong> laborables.
      </p>
    </div>
    
    <p style="color: #64748b; font-size: 14px;">Resumen de tu solicitud:</p>
    
    <div class="summary-box">
      <p style="margin: 5px 0; color: #64748b; font-size: 13px;"><strong>Asunto:</strong> {{user_subject}}</p>
      <p style="margin: 5px 0; color: #64748b; font-size: 13px;"><strong>Email:</strong> {{to_email}}</p>
      <p style="margin: 5px 0; color: #64748b; font-size: 13px;"><strong>Teléfono:</strong> {{user_phone}}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;">
      <p style="margin: 10px 0 0 0; color: #475569; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">{{user_message}}</p>
    </div>
    
    <div class="contact-box">
      <p style="margin: 0 0 10px 0; color: #854d0e; font-size: 14px;">
        <strong>¿Necesitas contactarnos directamente?</strong>
      </p>
      <p style="margin: 5px 0; color: #854d0e; font-size: 13px;">
        📞 Teléfono: <a href="tel:{{business_phone}}" style="color: #b45309;">{{business_phone}}</a><br>
        📧 Email: <a href="mailto:{{business_email}}" style="color: #b45309;">{{business_email}}</a><br>
        📍 C. Leoncio Rojas, 11, 28901 Getafe, Madrid<br>
        🕒 Lun-Vie: 9:30–13:30, 16:30–19:30
      </p>
    </div>
    
    <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #1e40af; font-size: 14px;">
        💡 <strong>Mientras tanto:</strong><br>
        - Diagnóstico completamente <strong>gratuito</strong><br>
        - Presupuesto sin compromiso<br>
        - Garantía de 6 meses en todas las reparaciones
      </p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://getafeelectronic.github.io/miserviciotecnico/" 
         style="display: inline-block; background: #2563eb; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        🌐 Visitar nuestra web
      </a>
    </div>
    
    <div class="footer">
      <p><strong>Mi Servicio Técnico</strong> - Especialistas en reparación de televisores</p>
      <p>📍 C. Leoncio Rojas, 11, Getafe | 📞 {{business_phone}}</p>
      <p>🌐 <a href="https://getafeelectronic.github.io/miserviciotecnico/">getafeelectronic.github.io/miserviciotecnico</a></p>
      <p style="margin-top: 15px; font-size: 11px;">Este es un email automático, por favor no respondas directamente. Usa los datos de contacto proporcionados arriba.</p>
    </div>
  </div>
</body>
</html>
```

### Variables usadas:
```javascript
{
  to_name: "Nombre del cliente",
  to_email: "email@cliente.com",
  user_phone: "666555444",
  user_subject: "presupuesto",
  user_message: "Mensaje original del cliente",
  business_name: "Mi Servicio Técnico",
  business_email: "ruizrjan@gmail.com",
  business_phone: "+34 916 95 07 81"
}
```

---

## 🚀 Cómo Configurar (Paso a Paso)

### 1. Crear Template 1 (Negocio)

```
1. Dashboard EmailJS → Templates → Create New Template
2. Template Name: contact_form_to_business
3. Settings:
   - To Email: ruizrjan@gmail.com
   - From Name: {{from_name}}
   - Reply-To: {{from_email}}
   - Subject: 📧 Nuevo contacto: {{subject}} - {{from_name}}
4. Content: Copiar el HTML del Template 1
5. Test it (útil para verificar)
6. Save → Copiar Template ID (ej: template_abc123)
```

### 2. Crear Template 2 (Cliente)

```
1. Templates → Create New Template
2. Template Name: contact_form_confirmation
3. Settings:
   - To Email: {{to_email}}
   - From Name: Mi Servicio Técnico
   - Reply-To: ruizrjan@gmail.com
   - Subject: ✅ Hemos recibido tu mensaje - Mi Servicio Técnico
4. Content: Copiar el HTML del Template 2
5. Test it con datos de ejemplo
6. Save → Copiar Template ID (ej: template_xyz789)
```

### 3. Actualizar `.env`

```env
VITE_EMAILJS_SERVICE_ID=service_k7qk938
VITE_EMAILJS_TEMPLATE_BUSINESS_ID=template_abc123
VITE_EMAILJS_TEMPLATE_CLIENT_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=RE4CyiHGo2c4vcCkH
VITE_BUSINESS_EMAIL=ruizrjan@gmail.com
VITE_BUSINESS_PHONE=+34 916 95 07 81
```

### 4. Probar

```bash
cd frontend
npm run dev
# Abre: http://localhost:5174/miserviciotecnico/#/contacto
# Envía un formulario de prueba
# Verifica que recibes 2 emails:
#   1. En ruizrjan@gmail.com (datos del formulario)
#   2. En el email que pusiste en el formulario (confirmación)
```

---

## ✅ Checklist de Configuración

- [ ] Service conectado en EmailJS (Gmail/Outlook)
- [ ] Template 1 creado: `contact_form_to_business`
- [ ] Template 1 configurado con `To: ruizrjan@gmail.com`
- [ ] Template 1 probado con "Test it"
- [ ] Template 1 ID copiado
- [ ] Template 2 creado: `contact_form_confirmation`
- [ ] Template 2 configurado con `To: {{to_email}}`
- [ ] Template 2 probado con "Test it"
- [ ] Template 2 ID copiado
- [ ] Variables en `.env` actualizadas
- [ ] Servidor reiniciado (`npm run dev`)
- [ ] Formulario probado en desarrollo
- [ ] Email recibido en `ruizrjan@gmail.com` ✅
- [ ] Email de confirmación recibido por el cliente ✅

---

## 📊 Flujo de Envío

```
Cliente rellena formulario
         ↓
    Click "Enviar"
         ↓
    ┌────────────────────────────┐
    │  Validación del formulario │
    └────────────────────────────┘
         ↓
    ┌────────────────────────────┐
    │ 📧 Email 1: Al negocio     │
    │ → ruizrjan@gmail.com       │
    │ → Con todos los datos      │
    │ → Reply-To: email cliente  │
    └────────────────────────────┘
         ↓
    ┌────────────────────────────┐
    │ 📧 Email 2: Al cliente     │
    │ → email del cliente        │
    │ → Confirmación automática  │
    │ → Reply-To: negocio        │
    └────────────────────────────┘
         ↓
    ✅ Mensaje de éxito
    📊 Analytics tracking
    🔄 Reset del formulario
```

---

## 🎨 Personalización

### Cambiar colores del email:

**Template Negocio** (azul):
```css
background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
border-left: 4px solid #2563eb;
```

**Template Cliente** (verde):
```css
background: linear-gradient(135deg, #10b981 0%, #059669 100%);
border: 2px solid #86efac;
```

### Agregar logo:

```html
<div class="header">
  <img src="https://tu-dominio.com/logo.png" alt="Logo" style="width: 150px; margin-bottom: 15px;">
  <h1>¡Mensaje Recibido!</h1>
</div>
```

---

## 🔧 Troubleshooting

### Solo llega un email

**Solución**: Verifica que ambos Template IDs estén en `.env` y sean diferentes

### El cliente no recibe confirmación

**Causas**:
1. Template Client ID incorrecto
2. Variable `{{to_email}}` mal configurada en el template
3. Email del cliente en spam

**Solución**: Revisa el Template 2 en EmailJS Dashboard → Logs

### Email del negocio va a spam

**Solución**: 
1. En EmailJS, conecta tu dominio personalizado
2. Configura SPF y DKIM records
3. O usa el dominio de EmailJS por defecto

---

## 📚 Recursos

- 📖 [EmailJS Templates Docs](https://www.emailjs.com/docs/user-guide/creating-email-template/)
- 🎥 [Video: Custom Templates](https://www.youtube.com/watch?v=dgcYOm8n8ME)
- 💬 [EmailJS Support](https://discord.gg/emailjs)

---

**Última actualización**: 28 de abril de 2026
