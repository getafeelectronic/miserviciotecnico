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
import { getServiceBySlug } from '../lib/supabase';
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

  // Formatear long_description en párrafos
  const paragraphs = service.long_description 
    ? service.long_description.split('\n\n').filter(p => p.trim())
    : [];

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

            {/* Content */}
            <motion.div 
              className="servicio-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {paragraphs.map((paragraph, index) => {
                // Detectar si es un título (línea que empieza con **)
                if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                  const titleText = paragraph.replace(/\*\*/g, '').trim();
                  return (
                    <h2 key={index} className="servicio-subtitle">
                      {titleText}
                    </h2>
                  );
                }
                
                // Párrafo normal
                return (
                  <p key={index} className="servicio-paragraph">
                    {paragraph.split('**').map((part, i) => 
                      i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                    )}
                  </p>
                );
              })}
            </motion.div>

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
