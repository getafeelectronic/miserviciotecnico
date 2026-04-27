# 📊 Guía de Uso del Hook useAnalytics

Esta guía muestra cómo usar el hook `useAnalytics` para trackear eventos en tu aplicación React usando **Supabase**.

---

## 🎯 Configuración Previa

Antes de usar el hook, asegúrate de haber ejecutado el script SQL:
- **Archivo:** `doc/supabase_analytics.sql`
- **Dónde:** Supabase Dashboard → SQL Editor → New Query → Run

**Ver guía completa:** [doc/SUPABASE_ANALYTICS.md](SUPABASE_ANALYTICS.md)

---

## 📥 Importar el Hook

```javascript
import useAnalytics from '../hooks/useAnalytics';
```

---

## 🏠 Tracking Automático de Pageviews

El hook trackea automáticamente cada cambio de página. Solo necesitas incluirlo en tu componente:

```javascript
function Home() {
  // ✅ Esto ya trackea automáticamente:
  // - Pageview
  // - Duración de permanencia
  // - Dispositivo
  // - Origen del tráfico
  // - Ubicación geográfica
  useAnalytics();

  return (
    <div>
      <h1>Página de Inicio</h1>
    </div>
  );
}
```

**Datos trackeados automáticamente:**
- `event_type`: "pageview"
- `page`: "/home"
- `page_title`: "Inicio | Mi Servicio Técnico"
- `device`: "mobile" | "tablet" | "desktop"
- `origin`: "google" | "facebook" | "direct" | "referral"
- `referrer`: URL completa del origen
- `country`: "ES"
- `city`: "Madrid"
- `screen_width`: 1920
- `screen_height`: 1080
- `user_agent`: "Mozilla/5.0..."
- `language`: "es-ES"
- `created_at`: Timestamp automático (Supabase)

**Almacenamiento:** Los datos se guardan directamente en la tabla `analytics_events` de Supabase.

---

## 📝 Tracking de Formularios

### Formulario de Contacto

```javascript
import useAnalytics from '../hooks/useAnalytics';

function Contacto() {
  const { trackFormSubmit, trackConversion } = useAnalytics();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tu lógica de envío de formulario
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value
    };

    // Enviar email con EmailJS...
    const result = await sendEmail(formData);

    if (result.success) {
      // ✅ Trackear envío exitoso
      await trackFormSubmit('contact', {
        has_phone: !!formData.phone,
        message_length: formData.message.length
      });

      // ✅ Trackear conversión (lead generado)
      await trackConversion('contact_form', {
        source: 'contact_page'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
    </form>
  );
}
```

---

## 📞 Tracking de Conversiones

### Click en Teléfono

```javascript
import useAnalytics from '../hooks/useAnalytics';

function Footer() {
  const { trackConversion } = useAnalytics();

  const handlePhoneClick = () => {
    trackConversion('phone_call', {
      phone_number: import.meta.env.VITE_BUSINESS_PHONE,
      source: 'footer'
    });
  };

  return (
    <a 
      href={`tel:${import.meta.env.VITE_BUSINESS_PHONE}`}
      onClick={handlePhoneClick}
    >
      <Phone size={18} />
      {import.meta.env.VITE_BUSINESS_PHONE}
    </a>
  );
}
```

### Click en Email

```javascript
const { trackConversion } = useAnalytics();

const handleEmailClick = () => {
  trackConversion('email', {
    email: import.meta.env.VITE_BUSINESS_EMAIL,
    source: 'header_cta'
  });
};

<a 
  href={`mailto:${import.meta.env.VITE_BUSINESS_EMAIL}`}
  onClick={handleEmailClick}
>
  Enviar Email
</a>
```

### Click en WhatsApp

```javascript
const { trackConversion } = useAnalytics();

const handleWhatsAppClick = () => {
  trackConversion('whatsapp', {
    phone: '+34916950781',
    source: 'floating_button'
  });
};

<a 
  href="https://wa.me/34916950781"
  onClick={handleWhatsAppClick}
  target="_blank"
>
  <FaWhatsapp /> Contactar
</a>
```

---

## 🖱️ Tracking de Clicks en CTAs

### Botón "Solicitar Presupuesto"

```javascript
import useAnalytics from '../hooks/useAnalytics';

function Hero() {
  const { trackClick } = useAnalytics();

  const handleCTAClick = () => {
    trackClick('solicitar_presupuesto', 'cta_button');
  };

  return (
    <button 
      onClick={() => {
        handleCTAClick();
        navigate('/contacto');
      }}
      className="cta-button"
    >
      Solicitar Presupuesto
    </button>
  );
}
```

### Enlaces a Redes Sociales

```javascript
const { trackClick } = useAnalytics();

const handleSocialClick = (platform) => {
  trackClick(`social_${platform}`, 'social_link');
};

<a 
  href="https://facebook.com/tupage"
  onClick={() => handleSocialClick('facebook')}
  target="_blank"
>
  <Facebook />
</a>
```

---

## 📄 Integración en Páginas Completas

### Ejemplo: Home.jsx

```javascript
import { useEffect } from 'react';
import useAnalytics from '../hooks/useAnalytics';

function Home() {
  const { trackClick, trackConversion } = useAnalytics();

  // ✅ Tracking automático de pageview al montar
  useEffect(() => {
    // Componente montado, pageview ya fue trackeado automáticamente
  }, []);

  const handleServiceClick = (serviceName) => {
    trackClick(`service_${serviceName}`, 'service_card');
  };

  const handleCallNow = () => {
    trackConversion('phone_call_cta', {
      source: 'hero_section',
      cta_text: 'Llamar Ahora'
    });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Reparación de Televisores en Getafe</h1>
        <button onClick={handleCallNow}>
          <Phone /> Llamar Ahora
        </button>
      </section>

      {/* Services */}
      <section className="services">
        <div 
          className="service-card"
          onClick={() => handleServiceClick('lcd_led')}
        >
          <h3>Reparación LCD/LED</h3>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews">
        <h2>Opiniones de Clientes</h2>
        {/* Reviews dinámicas desde Supabase */}
      </section>
    </div>
  );
}

export default Home;
```

### Ejemplo: Contacto.jsx

```javascript
import { useState } from 'react';
import useAnalytics from '../hooks/useAnalytics';

function Contacto() {
  const { trackFormSubmit, trackConversion, trackClick } = useAnalytics();
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar formulario (EmailJS)
      await sendEmail(formData);

      // ✅ Trackear envío exitoso
      await trackFormSubmit('contact', {
        has_phone: !!formData.phone,
        subject: formData.subject,
        message_length: formData.message?.length || 0
      });

      // ✅ Trackear conversión
      await trackConversion('contact_form', {
        source: 'contact_page'
      });

      alert('Mensaje enviado correctamente');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMapClick = () => {
    trackClick('google_maps', 'map_link');
  };

  return (
    <div className="contacto">
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
      </form>

      <div className="map" onClick={handleMapClick}>
        {/* Google Maps */}
      </div>
    </div>
  );
}
```

---

## 🔧 Funciones Disponibles

### `trackFormSubmit(formType, formData)`

Trackea envío de formularios.

**Parámetros:**
- `formType` (string): Tipo de formulario ("contact", "quote", "newsletter")
- `formData` (object): Datos adicionales del formulario

**Ejemplo:**
```javascript
await trackFormSubmit('quote', {
  service_type: 'reparacion_lcd',
  urgency: 'normal'
});
```

---

### `trackConversion(conversionType, details)`

Trackea conversiones (acciones de valor).

**Parámetros:**
- `conversionType` (string): Tipo de conversión ("phone_call", "email", "whatsapp", "form_submit")
- `details` (object): Detalles adicionales

**Ejemplo:**
```javascript
await trackConversion('phone_call', {
  source: 'hero_cta',
  phone_number: '+34916950781'
});
```

---

### `trackClick(elementName, elementType)`

Trackea clicks en elementos específicos.

**Parámetros:**
- `elementName` (string): Nombre del elemento ("solicitar_presupuesto", "ver_servicios")
- `elementType` (string): Tipo de elemento ("button", "link", "card")

**Ejemplo:**
```javascript
await trackClick('ver_servicios', 'cta_button');
```

---

### `getDeviceType()`

Devuelve el tipo de dispositivo: "mobile", "tablet", o "desktop".

**Ejemplo:**
```javascript
const device = getDeviceType();
console.log('Dispositivo:', device); // "mobile"
```

---

### `getTrafficOrigin()`

Devuelve el origen del tráfico: "google", "facebook", "direct", "referral", etc.

**Ejemplo:**
```javascript
const origin = getTrafficOrigin();
console.log('Origen:', origin); // "google"
```

---

## 📊 Datos Trackeados Automáticamente

Estos campos se agregan automáticamente a cada evento:

```javascript
{
  timestamp: "2026-04-27T10:30:00Z",
  user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  screen_width: 1920,
  screen_height: 1080,
  language: "es-ES"
}
```

---

## 🧪 Testing

### Modo Desarrollo

Puedes verificar que los eventos se envían correctamente:

```javascript
// Agregar logs temporales en useAnalytics.js
const sendEvent = async (eventData) => {
  console.log('📊 Analytics Event:', eventData);
  // ... resto del código
};
```

### Verificar en MongoDB Atlas

1. Ve a MongoDB Atlas → Browse Collections
2. Selecciona `miserviciotecnico_analytics` → `pageviews`
3. Verifica que aparezcan los documentos

---

## 🚨 Errores Comunes

### "MongoDB Analytics no configurado"

**Causa:** Faltan variables de entorno.

**Solución:**
```bash
# Verifica que el .env tenga estas variables:
VITE_MONGODB_DATA_API_URL=https://data.mongodb-api.com/...
VITE_MONGODB_API_KEY=tu_api_key
VITE_MONGODB_CLUSTER=Cluster0
VITE_MONGODB_DATABASE=miserviciotecnico_analytics
VITE_MONGODB_COLLECTION=pageviews
```

### "Error enviando evento a MongoDB"

**Causa:** API Key inválida o permisos incorrectos.

**Solución:**
1. Verifica la API Key en MongoDB Atlas
2. Asegúrate de que tenga permisos de escritura
3. Regenera la API Key si es necesario

---

## ⚡ Optimizaciones

### Debouncing de Eventos

Para evitar enviar muchos eventos:

```javascript
import { debounce } from 'lodash';

const debouncedTrackClick = debounce((element) => {
  trackClick(element, 'button');
}, 300);
```

### Batch de Eventos

Agrupar múltiples eventos y enviarlos juntos (implementación futura).

---

*Última actualización: 27 de abril de 2026*
