import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Tv, 
  Wrench, 
  BadgeCheck, 
  ArrowRight, 
  Star,
  Monitor,
  Search,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { getReviews, getFeaturedServices } from '../lib/supabase';
import useAnalytics from '../hooks/useAnalytics';
import './Home.css';

// Función para calcular tiempo relativo desde una fecha
function getRelativeTime(dateString) {
  // Si ya es un texto relativo o vacío, devolverlo tal cual
  if (!dateString || dateString.includes('Hace') || dateString.includes('Ayer') || dateString.includes('Hoy')) {
    return dateString;
  }
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    // Resetear horas para comparación de días exactos
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffInMs = nowOnly - dateOnly;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    // Hoy
    if (diffInDays === 0) return 'Hoy';
    
    // Ayer
    if (diffInDays === 1) return 'Ayer';
    
    // Hace X días (menos de 7 días)
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    
    // Hace X semanas (menos de 30 días)
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    }
    
    // Calcular diferencia en meses (más preciso)
    const yearsDiff = now.getFullYear() - date.getFullYear();
    const monthsDiff = now.getMonth() - date.getMonth();
    const totalMonths = yearsDiff * 12 + monthsDiff;
    
    // Hace X meses (menos de 12 meses)
    if (totalMonths < 12) {
      return `Hace ${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
    }
    
    // Hace X años (12 meses o más)
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    
    if (remainingMonths === 0) {
      return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
    } else {
      return `Hace ${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
    }
  } catch (e) {
    return dateString; // Si hay error, devolver el original
  }
}

// Mapeo de nombres de iconos a componentes de lucide-react
const iconMap = {
  'Tv': Tv,
  'Wrench': Wrench,
  'BadgeCheck': BadgeCheck,
  'Monitor': Monitor,
  'Search': Search,
  'Package': Package
};

function Home() {
  // Analytics: tracking automático de pageview y duración
  const { trackClick } = useAnalytics();
  
  // Estado para reviews dinámicas
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Estado para servicios dinámicos
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Cargar reviews desde Supabase al montar el componente
  useEffect(() => {
    async function loadReviews() {
      const data = await getReviews();
      
      if (data && data.length > 0) {
        setReviews(data);
      }
      
      setLoadingReviews(false);
    }

    loadReviews();
  }, []);

  // Cargar servicios destacados desde Supabase
  useEffect(() => {
    async function loadServices() {
      const data = await getFeaturedServices();
      
      if (data && data.length > 0) {
        setServices(data);
      }
      
      setLoadingServices(false);
    }

    loadServices();
  }, []);

  // Renderizar icono dinámicamente según icon_name
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || Wrench; // Default: Wrench
    return <IconComponent size={40} />;
  };

  return (
    <div className="home">
      <Helmet>
        <title>Mi servicio técnico de televisores en Getafe | Reparación profesional</title>
        <meta name="description" content="Servicio técnico profesional de reparación de televisores en Getafe. Más de 20 años de experiencia. Diagnóstico gratuito, reparación rápida y garantía incluida." />
        <meta property="og:title" content="Mi servicio técnico de televisores en Getafe" />
        <meta property="og:description" content="Servicio técnico profesional con más de 20 años de experiencia en reparación de televisores LCD, LED y Plasma." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mi servicio técnico de televisores en Getafe" />
        <meta name="twitter:description" content="Servicio técnico profesional con más de 20 años de experiencia." />
      </Helmet>
      <Hero />

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Nuestros Servicios</h2>
            <p className="section-subtitle">
              Soluciones profesionales para tu televisor
            </p>
          </motion.div>

          <div className="services-grid">
            {loadingServices ? (
              // Loading skeleton
              <>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="service-card-skeleton">
                    <div className="skeleton-icon"></div>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-description"></div>
                  </div>
                ))}
              </>
            ) : (
              // Servicios reales
              services.map((service, index) => (
                <motion.div
                  key={service.slug || index}
                  className="service-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="service-icon">{renderIcon(service.icon_name)}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </motion.div>
              ))
            )}
          </div>

          <div className="section-cta">
            <Link 
              to="/servicios" 
              className="btn-link"
              onClick={() => trackClick('ver_todos_servicios', 'link')}
            >
              Ver todos los servicios
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us-section">
        <div className="container">
          <div className="why-us-grid">
            <motion.div 
              className="why-us-content"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title">¿Por qué elegirnos?</h2>
              <ul className="features-list">
                <li className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Más de 20 años de experiencia</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Diagnóstico gratuito sin compromiso</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Reparaciones rápidas en 24-48h</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Garantía de 3 meses en todas las reparaciones</span>
                </li>
                <li className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Presupuesto sin sorpresas</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="why-us-image"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="stats-card">
                <div className="stat">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Años de experiencia</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">TVs reparados</span>
                </div>
                <div className="stat">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Clientes satisfechos</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Lo que dicen nuestros clientes</h2>
            <p className="section-subtitle">
              Opiniones reales de clientes satisfechos
            </p>
          </motion.div>

          {loadingReviews ? (
            <div className="reviews-loading">
              <p>Cargando opiniones...</p>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id || index}
                  className="review-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="review-header">
                    <div className="review-author">
                      <div className="author-avatar">{review.name[0]}</div>
                    <div>
                      <div className="author-name">{review.name}</div>
                      <div className="review-date">{getRelativeTime(review.date)}</div>
                    </div>
                  </div>
                  <div className="review-rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
                    ))}
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="cta-title">¿Tienes un problema con tu TV?</h2>
            <p className="cta-text">
              Contáctanos hoy y obtén un diagnóstico gratuito. Te ayudaremos a resolver el problema de manera rápida y económica.
            </p>
            <Link 
              to="/contacto" 
              className="btn btn-cta"
              onClick={() => trackClick('solicitar_presupuesto_home', 'button')}
            >
              Solicitar Presupuesto Gratis
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
