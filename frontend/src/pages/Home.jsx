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
import './Home.css';

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
  // Estado para reviews dinámicas
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Estado para servicios dinámicos
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Datos de fallback (se usan si Supabase no está configurado)
  const fallbackReviews = [
    {
      name: 'María García',
      rating: 5,
      text: 'Excelente servicio. Repararon mi TV en menos de 24 horas. Muy profesionales.',
      date: 'Hace 1 semana'
    },
    {
      name: 'Carlos Ruiz',
      rating: 5,
      text: 'Muy contentos con el trabajo realizado. Precio justo y trato excepcional.',
      date: 'Hace 2 semanas'
    },
    {
      name: 'Ana Martínez',
      rating: 5,
      text: 'Recomendable 100%. Mi TV LG quedó perfecta. Gracias!',
      date: 'Hace 1 mes'
    }
  ];

  const fallbackServices = [
    {
      slug: 'reparacion-tv-lcd-led',
      title: 'Reparación TV LCD/LED',
      description: 'Reparamos todo tipo de televisores LCD y LED de todas las marcas.',
      icon_name: 'Tv'
    },
    {
      slug: 'reparacion-tv-plasma',
      title: 'Reparación TV Plasma',
      description: 'Especialistas en solucionar problemas de televisores plasma.',
      icon_name: 'Wrench'
    },
    {
      slug: 'garantia-incluida',
      title: 'Garantía Incluida',
      description: 'Todas nuestras reparaciones incluyen garantía de 6 meses.',
      icon_name: 'BadgeCheck'
    }
  ];

  // Cargar reviews desde Supabase al montar el componente
  useEffect(() => {
    async function loadReviews() {
      const data = await getReviews();
      
      // Si hay datos de Supabase, usarlos; si no, usar fallback
      if (data && data.length > 0) {
        setReviews(data);
      } else {
        console.info('📋 Usando reviews de fallback (Supabase no configurado o sin datos)');
        setReviews(fallbackReviews);
      }
      
      setLoadingReviews(false);
    }

    loadReviews();
  }, []);

  // Cargar servicios destacados desde Supabase
  useEffect(() => {
    async function loadServices() {
      const data = await getFeaturedServices();
      
      // Si hay datos de Supabase, usarlos; si no, usar fallback
      if (data && data.length > 0) {
        setServices(data);
      } else {
        console.info('🔧 Usando servicios de fallback (Supabase no configurado o sin datos)');
        setServices(fallbackServices);
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
        <title>Mi Servicio Técnico de Televisores en Getafe | Reparación Profesional</title>
        <meta name="description" content="Servicio técnico profesional de reparación de televisores en Getafe. Más de 10 años de experiencia. Diagnóstico gratuito, reparación rápida y garantía incluida." />
        <meta property="og:title" content="Mi Servicio Técnico de Televisores en Getafe" />
        <meta property="og:description" content="Servicio técnico profesional con más de 10 años de experiencia en reparación de televisores LCD, LED y Plasma." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mi Servicio Técnico de Televisores en Getafe" />
        <meta name="twitter:description" content="Servicio técnico profesional con más de 10 años de experiencia." />
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
            <Link to="/servicios" className="btn-link">
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
                  <span>Más de 10 años de experiencia</span>
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
                  <span>Garantía de 6 meses en todas las reparaciones</span>
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
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Años de experiencia</span>
                </div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">TVs reparados</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
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
                      <div className="review-date">{review.date}</div>
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
            <Link to="/contacto" className="btn btn-cta">
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
