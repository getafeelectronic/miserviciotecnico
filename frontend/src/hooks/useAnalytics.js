import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

/**
 * Hook para enviar eventos de analytics directamente a Supabase
 * 
 * Trackea automáticamente:
 * - Pageviews con tiempo de permanencia
 * - Dispositivo (mobile/tablet/desktop)
 * - Origen del tráfico
 * - Ubicación geográfica
 * - Formularios completados
 * - Conversiones (llamadas, emails)
 */

const useAnalytics = () => {
  const location = useLocation();
  const pageLoadTime = useRef(Date.now());
  const hasTrackedPageview = useRef(false);

  /**
   * Detecta el tipo de dispositivo basándose en el ancho de pantalla
   */
  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  /**
   * Detecta el origen del tráfico basándose en el referrer
   */
  const getTrafficOrigin = () => {
    const referrer = document.referrer;
    
    if (!referrer) return 'direct';
    
    // Social media
    if (referrer.includes('facebook.com')) return 'facebook';
    if (referrer.includes('instagram.com')) return 'instagram';
    if (referrer.includes('twitter.com') || referrer.includes('t.co')) return 'twitter';
    if (referrer.includes('linkedin.com')) return 'linkedin';
    if (referrer.includes('whatsapp.com')) return 'whatsapp';
    
    // Search engines
    if (referrer.includes('google.com')) return 'google';
    if (referrer.includes('bing.com')) return 'bing';
    if (referrer.includes('yahoo.com')) return 'yahoo';
    
    // Referral from other site
    return 'referral';
  };

  /**
   * Obtiene información de localización usando únicamente APIs del navegador.
   * Se evita ipapi.co porque bloquea requests desde GitHub Pages (CORS).
   */
  const getGeolocation = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
    const language = navigator.language || 'Unknown';
    // Inferir país a partir del locale del navegador (ej: "es-ES" → "ES")
    const localeParts = language.split('-');
    const country = localeParts.length > 1 ? localeParts[1].toUpperCase() : 'Unknown';

    return {
      country,
      country_name: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      timezone
    };
  };

  /**
   * Envía un evento a Supabase
   */
  const sendEvent = async (eventData) => {
    // Verificar que Supabase esté configurado
    if (!supabase) {
      console.warn('Supabase no configurado. Analytics deshabilitado.');
      return;
    }

    try {
      // Log para debugging
      console.log('[Analytics] Enviando evento:', {
        event_type: eventData.event_type,
        page: eventData.page,
        page_title: eventData.page_title
      });

      const { error } = await supabase
        .from('analytics_events')
        .insert([eventData]);

      if (error) {
        console.error('[Analytics] Error enviando evento a Supabase:', error);
      } else {
        console.log('[Analytics] ✅ Evento enviado exitosamente');
      }
    } catch (error) {
      // Fallar silenciosamente para no afectar la UX
      console.warn('[Analytics] Error de red al enviar analytics:', error);
    }
  };

  /**
   * Trackea un pageview con información completa
   */
  const trackPageview = useCallback(async () => {
    const geolocation = getGeolocation();

    await sendEvent({
      event_type: 'pageview',
      page: location.pathname + location.search,
      page_title: document.title,
      device: getDeviceType(),
      origin: getTrafficOrigin(),
      referrer: document.referrer || 'direct',
      user_agent: navigator.userAgent,
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      language: navigator.language,
      ...geolocation
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  /**
   * Trackea tiempo de permanencia en la página
   */
  const trackDuration = useCallback(async () => {
    const duration = Math.round((Date.now() - pageLoadTime.current) / 1000);
    
    // Solo trackear si el usuario estuvo al menos 3 segundos
    if (duration >= 3) {
      await sendEvent({
        event_type: 'duration',
        page: location.pathname,
        duration_seconds: duration,
        device: getDeviceType()
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /**
   * Trackea envío de formulario
   */
  const trackFormSubmit = async (formType, formData = {}) => {
    await sendEvent({
      event_type: 'form_submit',
      form_type: formType,
      page: location.pathname,
      device: getDeviceType(),
      form_data: formData
    });
  };

  /**
   * Trackea conversiones (llamadas, emails, WhatsApp)
   */
  const trackConversion = async (conversionType, details = {}) => {
    await sendEvent({
      event_type: 'conversion',
      conversion_type: conversionType,
      page: location.pathname,
      device: getDeviceType(),
      conversion_details: details
    });
  };

  /**
   * Trackea clicks en elementos específicos (CTA, botones, links)
   */
  const trackClick = async (elementName, elementType = 'button') => {
    await sendEvent({
      event_type: 'click',
      element_name: elementName,
      element_type: elementType,
      page: location.pathname,
      device: getDeviceType()
    });
  };

  // Effect principal: trackea pageview al cargar y duration al salir
  useEffect(() => {
    // Resetear tiempo de carga
    pageLoadTime.current = Date.now();
    hasTrackedPageview.current = false;

    // Trackear pageview
    trackPageview();
    hasTrackedPageview.current = true;

    // Trackear duración al salir de la página
    return () => {
      if (hasTrackedPageview.current) {
        trackDuration();
      }
    };
  }, [location.pathname, trackPageview, trackDuration]);

  // Retornar funciones para tracking manual
  return {
    trackFormSubmit,
    trackConversion,
    trackClick,
    trackPageview,
    getDeviceType,
    getTrafficOrigin
  };
};

export default useAnalytics;
