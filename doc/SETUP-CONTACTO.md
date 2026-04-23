# Configuración del Formulario de Contacto

## EmailJS - Configuración Paso a Paso

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Confirma tu email

### 2. Agregar un Email Service
1. En el dashboard, ve a **Email Services**
2. Click en **Add New Service**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta y autoriza
5. Copia el **Service ID** generado

### 3. Crear un Email Template
1. Ve a **Email Templates**
2. Click en **Create New Template**
3. Usa este template básico:

```
Asunto: Nuevo mensaje de contacto - {{subject}}

De: {{from_name}}
Email: {{from_email}}
Teléfono: {{from_phone}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de miserviciotecnico.com
```

4. En la configuración:
   - **To Email**: Tu email de destino (ej: `contacto@telerayo.com`)
   - **From Name**: `{{from_name}}`
   - **Reply To**: `{{from_email}}`

5. Guarda y copia el **Template ID**

### 4. Obtener Public Key
1. Ve a **Account** (icono de usuario)
2. Click en **General**
3. Copia tu **Public Key**

### 5. Agregar credenciales al proyecto
Edita el archivo `.env` en la carpeta `frontend/`:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

---

## Google Maps API - Configuración

### 1. Crear proyecto en Google Cloud
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombra el proyecto (ej: "MiServicioTecnico")

### 2. Habilitar APIs necesarias
1. Ve a **APIs & Services** → **Library**
2. Busca y habilita estas APIs:
   - **Maps JavaScript API**
   - **Geocoding API** (opcional, para convertir direcciones)
   - **Places API** (opcional, para detalles del negocio)

### 3. Crear credenciales (API Key)
1. Ve a **APIs & Services** → **Credentials**
2. Click en **Create Credentials** → **API Key**
3. Se generará una API key - cópiala

### 4. Restringir la API Key (Recomendado)
1. Click en la API key creada
2. En **Application restrictions**:
   - Selecciona **HTTP referrers (web sites)**
   - Agrega: `http://localhost:5173/*` (desarrollo)
   - Agrega: `https://tudominio.com/*` (producción)

3. En **API restrictions**:
   - Selecciona **Restrict key**
   - Marca: Maps JavaScript API, Geocoding API, Places API

4. Guarda los cambios

### 5. Agregar la API Key al proyecto
Edita el archivo `.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 6. Obtener coordenadas de tu negocio
1. Abre [Google Maps](https://maps.google.com/)
2. Busca tu dirección
3. Click derecho en el marcador → "¿Qué hay aquí?"
4. Las coordenadas aparecerán abajo (ej: 40.3063, -3.7322)

Agrégalas al `.env`:

```env
VITE_BUSINESS_COORDINATES_LAT=40.3063
VITE_BUSINESS_COORDINATES_LNG=-3.7322
```

---

## Información del Negocio

Actualiza también estos valores en el `.env`:

```env
VITE_BUSINESS_EMAIL=tu-email@empresa.com
VITE_BUSINESS_PHONE=+34 XXX XXX XXX
VITE_BUSINESS_ADDRESS=Tu Dirección Completa, Ciudad, CP
```

---

## Modo de Desarrollo (Sin credenciales)

Si no configuras las credenciales de EmailJS, el formulario funcionará en **modo simulado**:
- Mostrará un mensaje de éxito después de 1.5 segundos
- No enviará emails reales
- Útil para desarrollo y pruebas de UI

El mapa de Google Maps mostrará una ubicación por defecto (Getafe, Madrid).

---

## Verificar la configuración

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a `http://localhost:5173/contacto`

3. Prueba el formulario:
   - Rellena todos los campos
   - Click en "Enviar mensaje"
   - Verifica que llegue el email (si EmailJS está configurado)
   - Verifica que el mapa se muestre correctamente

---

## Costos

### EmailJS
- **Plan gratuito**: 200 emails/mes
- **Plan Personal**: $15/mes - 50,000 emails
- Perfecto para empezar

### Google Maps
- **$200 de crédito gratis** cada mes
- Suficiente para ~28,000 cargas de mapa/mes
- No necesitas tarjeta de crédito para empezar

---

## Solución de Problemas

### EmailJS no envía emails
1. Verifica que las credenciales en `.env` sean correctas
2. Revisa la consola del navegador (F12) para errores
3. Comprueba que el template en EmailJS tenga las variables correctas: `{{from_name}}`, `{{from_email}}`, `{{message}}`, etc.
4. Verifica tu cuota en el dashboard de EmailJS

### Google Maps no se muestra
1. Verifica que la API Key sea correcta
2. Comprueba que hayas habilitado **Maps JavaScript API**
3. Revisa las restricciones de la API Key
4. Abre la consola (F12) para ver errores específicos
5. Asegúrate de que las coordenadas sean números válidos

### El formulario no valida correctamente
1. Los campos obligatorios son: nombre, email, teléfono, asunto, mensaje
2. El email debe ser válido
3. El teléfono debe tener 9 dígitos
4. El mensaje debe tener al menos 10 caracteres

---

## Soporte

Si necesitas ayuda adicional:
- [Documentación EmailJS](https://www.emailjs.com/docs/)
- [Documentación Google Maps](https://developers.google.com/maps/documentation)
