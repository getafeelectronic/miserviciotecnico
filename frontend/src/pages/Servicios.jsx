import { useState, useEffect } from 'react';
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
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getServices } from '../lib/supabase';
import useAnalytics from '../hooks/useAnalytics';
import './Servicios.css';

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

function Servicios() {
  // Analytics: tracking automático de pageview y duración
  useAnalytics();
  
  // Estado para servicios dinámicos
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Servicios de fallback (se usan si Supabase no está configurado)
  const fallbackServices = [
    {
      slug: 'reparacion-tv-lcd-led',
      title: 'Reparación TV LCD/LED',
      description: 'Reparamos todo tipo de televisores LCD y LED de todas las marcas. Diagnóstico profesional, repuestos originales y garantía incluida.',
      icon_name: 'Tv',
      display_order: 1
    },
    {
      slug: 'reparacion-tv-plasma',
      title: 'Reparación TV Plasma',
      description: 'Especialistas en solucionar problemas de televisores plasma. Experiencia en marcas como Samsung, LG, Panasonic y más.',
      icon_name: 'Wrench',
      display_order: 2
    },
    {
      slug: 'garantia-incluida',
      title: 'Garantía Incluida',
      description: 'Todas nuestras reparaciones incluyen garantía de 6 meses. Trabajamos con repuestos de calidad para asegurar durabilidad.',
      icon_name: 'BadgeCheck',
      display_order: 3
    },
    {
      slug: 'diagnostico-gratuito',
      title: 'Diagnóstico Gratuito',
      description: 'Realizamos un diagnóstico completo y gratuito de tu televisor. Sin compromiso, te explicamos el problema y el presupuesto.',
      icon_name: 'Search',
      display_order: 4
    },
    {
      slug: 'reparacion-monitores',
      title: 'Reparación de Monitores',
      description: 'También reparamos monitores de ordenador LCD y LED. Solución rápida para problemas de imagen, alimentación y backlight.',
      icon_name: 'Monitor',
      display_order: 5
    },
    {
      slug: 'venta-repuestos',
      title: 'Venta de Repuestos',
      description: 'Disponemos de repuestos originales y compatibles: fuentes de alimentación, placas T-Con, pantallas LED/LCD y más.',
      icon_name: 'Package',
      display_order: 6
    }
  ];

  // Cargar servicios desde Supabase al montar el componente
  useEffect(() => {
    async function loadServices() {
      const data = await getServices();
      
      // Si hay datos de Supabase, usarlos; si no, usar fallback
      if (data && data.length > 0) {
        setServices(data);
      } else {
        console.info('🔧 Usando servicios de fallback (Supabase no configurado o sin datos)');
        setServices(fallbackServices);
      }
      
      setLoading(false);
    }

    loadServices();
  }, []);

  // Renderizar icono dinámicamente según icon_name
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || Wrench; // Default: Wrench
    return <IconComponent size={40} />;
  };

  return (
    <div className="servicios-page">
      <Helmet>
        <title>Nuestros Servicios | Reparación de Televisores y Monitores en Getafe</title>
        <meta 
          name="description" 
          content="Servicios profesionales de reparación de TV LCD, LED, Plasma y monitores. Diagnóstico gratuito, garantía de 6 meses y venta de repuestos originales en Getafe." 
        />
        <meta property="og:title" content="Servicios de Reparación de Televisores en Getafe" />
        <meta property="og:description" content="Reparación profesional de TV LCD, LED, Plasma y monitores. Diagnóstico gratuito y garantía incluida." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Servicios de Reparación de Televisores" />
        <meta name="twitter:description" content="Reparación profesional con garantía de 6 meses." />
      </Helmet>

      {/* Hero Section */}
      <section className="servicios-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="servicios-hero-content"
          >
            <h1 className="servicios-hero-title">Nuestros Servicios</h1>
            <p className="servicios-hero-subtitle">
              Soluciones profesionales de reparación con más de 10 años de experiencia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="servicios-section">
        <div className="container">
          {loading ? (
            // Loading skeleton
            <div className="servicios-grid">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="service-card-skeleton">
                  <div className="skeleton-icon"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-description"></div>
                  <div className="skeleton-description short"></div>
                </div>
              ))}
            </div>
          ) : (
            // Servicios reales
            <div className="servicios-grid">
              {services.map((service, index) => (
                <motion.div
                  key={service.slug}
                  className="service-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/servicios/${service.slug}`} className="service-card-link">
                    {/* Imagen del servicio si existe */}
                    {service.image_url && (
                      <div className="service-image">
                        <img src={service.image_url} alt={service.title} />
                      </div>
                    )}
                    <div className="service-card-content">
                      <div className="service-icon">
                        {renderIcon(service.icon_name)}
                      </div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                      <span className="service-read-more">Leer más →</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <motion.div 
            className="servicios-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="cta-box">
              <h2 className="cta-title">¿Necesitas ayuda con tu televisor?</h2>
              <p className="cta-text">
                Contacta con nosotros para un diagnóstico gratuito y presupuesto sin compromiso
              </p>
              <div className="cta-buttons">
                <Link to="/contacto" className="btn btn-primary">
                  Solicitar Presupuesto
                </Link>
                <a href="tel:+34916957567" className="btn btn-secondary">
                  <Phone size={20} />
                  Llamar Ahora
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Servicios;
