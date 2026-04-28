import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Tv, 
  Monitor, 
  Wrench, 
  BadgeCheck, 
  Search, 
  Package,
  Settings,
  Zap,
  Shield,
  DollarSign,
  Clock,
  Phone,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { getServiceBySlug } from '../lib/supabase';
import useAnalytics from '../hooks/useAnalytics';
import './ServicioDetalle.css';

// Mapeo de nombres de iconos a componentes de lucide-react
const iconMap = {
  'Tv': Tv,
  'Monitor': Monitor,
  'Wrench': Wrench,
  'BadgeCheck': BadgeCheck,
  'Search': Search,
  'Package': Package,
  'Settings': Settings,
  'Zap': Zap,
  'Shield': Shield,
  'DollarSign': DollarSign,
  'Clock': Clock,
  'Phone': Phone
};

function ServicioDetalle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Analytics: tracking automático de pageview y duración
  useAnalytics();

  useEffect(() => {
    async function loadService() {
      setLoading(true);
      setNotFound(false);
      
      const data = await getServiceBySlug(slug);
      
      if (data) {
        setService(data);
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    }

    loadService();
  }, [slug]);

  // Renderizar icono dinámicamente según icon_name
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || Wrench;
    return <IconComponent size={60} />;
  };

  // Loading state
  if (loading) {
    return (
      <div className="servicio-detalle-page">
        <div className="container">
          <div className="servicio-detalle-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-content"></div>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound || !service) {
    return (
      <div className="servicio-detalle-page">
        <Helmet>
          <title>Servicio no encontrado | Mi Servicio Técnico</title>
        </Helmet>
        <div className="container">
          <div className="servicio-not-found">
            <h1>Servicio no encontrado</h1>
            <p>El servicio que buscas no existe o ya no está disponible.</p>
            <Link to="/servicios" className="btn btn-primary">
              <ArrowLeft size={20} />
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Sanitizar HTML del long_description
  const sanitizedHTML = service.long_description 
    ? DOMPurify.sanitize(service.long_description, {
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
      })
    : '';

  return (
    <div className="servicio-detalle-page">
      <Helmet>
        <title>{service.title} | Servicio Técnico en Getafe</title>
        <meta name="description" content={service.description} />
        <meta property="og:title" content={`${service.title} | Servicio Técnico`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={service.title} />
        <meta name="twitter:description" content={service.description} />
      </Helmet>

      {/* Service Detail Content */}
      <section className="servicio-content-section">
        <div className="container">
          <article className="servicio-article">
            {/* Header */}
            <motion.header 
              className="servicio-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="servicio-icon-large">
                {renderIcon(service.icon_name)}
              </div>
              <h1 className="servicio-title">{service.title}</h1>
              <p className="servicio-intro">{service.description}</p>
            </motion.header>

            {/* Service Image */}
            {service.image_url && (
              <motion.div 
                className="servicio-image-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <img 
                  src={service.image_url} 
                  alt={service.title}
                  className="servicio-image"
                />
              </motion.div>
            )}

            {/* Content - Renderizar HTML de Supabase */}
            <motion.div 
              className="servicio-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />

            {/* CTA Footer */}
            <motion.div 
              className="servicio-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="cta-box">
                <h2 className="cta-title">¿Interesado en este servicio?</h2>
                <p className="cta-text">
                  Contáctanos para un diagnóstico gratuito y presupuesto sin compromiso
                </p>
                <div className="cta-buttons">
                  <Link to="/contacto" className="btn btn-primary">
                    Solicitar Presupuesto
                  </Link>
                  <a href="tel:+34916957567" className="btn btn-secondary">
                    <Phone size={20} />
                    916 95 75 67
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Back to services */}
            <div className="servicio-back">
              <Link to="/servicios" className="btn-link">
                <ArrowLeft size={20} />
                Ver todos los servicios
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default ServicioDetalle;
