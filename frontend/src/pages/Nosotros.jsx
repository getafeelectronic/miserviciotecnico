import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Eye, 
  Heart, 
  Award,
  Wrench,
  Clock,
  Shield,
  MapPin,
  TrendingUp
} from 'lucide-react';
import useAnalytics from '../hooks/useAnalytics';
import './Nosotros.css';

function Nosotros() {
  // Analytics: tracking automático de pageview y duración
  const { trackClick } = useAnalytics();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const values = [
    {
      icon: <Award className="value-icon" />,
      title: 'Profesionalidad',
      description: 'Técnicos cualificados con amplia experiencia en el sector'
    },
    {
      icon: <Shield className="value-icon" />,
      title: 'Transparencia',
      description: 'Precios claros y presupuestos sin compromiso'
    },
    {
      icon: <Heart className="value-icon" />,
      title: 'Compromiso',
      description: 'Dedicación absoluta a la satisfacción del cliente'
    },
    {
      icon: <Clock className="value-icon" />,
      title: 'Rapidez',
      description: 'Reparaciones eficientes en 24-48 horas'
    }
  ];

  const services = [
    'Reparación de televisores LED, OLED, LCD y Plasma',
    'Servicio técnico especializado en Smart TV',
    'Reparación de averías de imagen, sonido y placa base',
    'Diagnóstico profesional con presupuesto sin compromiso',
    'Servicio urgente',
    'Reparación de televisores de todas las marcas'
  ];

  const brands = ['Samsung', 'LG', 'Sony', 'Philips', 'Panasonic', 'Xiaomi'];

  const reasons = [
    'Atención personalizada y cercana',
    'Técnicos cualificados y con experiencia',
    'Precios competitivos y transparentes',
    'Reparaciones rápidas y garantizadas',
    'Uso de repuestos originales o de alta calidad',
    'Alta tasa de éxito en reparaciones'
  ];

  return (
    <div className="nosotros-page">
      <Helmet>
        <title>Sobre Nosotros | 10+ Años de Experiencia | Mi Servicio Técnico</title>
        <meta name="description" content="Conoce nuestro servicio técnico de televisores en Getafe. Más de 10 años reparando TVs con profesionalidad, rapidez y garantía. Técnicos cualificados a tu servicio." />
        <meta property="og:title" content="Sobre Nosotros | Mi Servicio Técnico de Televisores" />
        <meta property="og:description" content="Más de 10 años de experiencia en reparación de televisores. Profesionalidad, rapidez y garantía." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sobre Nosotros | Mi Servicio Técnico" />
        <meta name="twitter:description" content="Más de 10 años de experiencia en reparación de televisores." />
      </Helmet>
      {/* Hero Section */}
      <section className="nosotros-hero">
        <div className="nosotros-hero-content">
          <motion.h1 
            className="nosotros-hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p 
            className="nosotros-hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tu servicio técnico de confianza en Getafe
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="nosotros-intro">
        <div className="container">
          <motion.div className="intro-content" {...fadeInUp}>
            <div className="intro-icon">
              <Users size={48} />
            </div>
            <h2 className="section-title">¿Quiénes Somos?</h2>
            <p className="intro-text">
              Somos un servicio técnico especializado en la <strong>reparación de televisores 
              en Getafe (Madrid)</strong>, con una sólida trayectoria ofreciendo soluciones 
              eficaces para todo tipo de averías. Atendemos tanto a particulares como a empresas, 
              garantizando un servicio rápido, económico y de alta calidad.
            </p>
            <p className="intro-text">
              Nuestro equipo técnico cuenta con amplia experiencia en la reparación de televisores 
              de todas las tecnologías: <strong>LED, OLED, LCD, Plasma y Smart TV</strong>, 
              trabajando con las principales marcas del mercado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="nosotros-services">
        <div className="container">
          <motion.div {...fadeInUp}>
            <div className="services-header">
              <Wrench size={40} />
              <h2 className="section-title">Servicios de Reparación</h2>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  className="service-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="service-bullet"></div>
                  <p>{service}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="nosotros-brands">
        <div className="container">
          <motion.div {...fadeInUp}>
            <h2 className="section-title">Especialistas en Todas las Marcas</h2>
            <p className="brands-description">
              Trabajamos con televisores de fabricantes reconocidos. Nuestro conocimiento 
              multimarca nos permite identificar rápidamente cualquier avería y aplicar la 
              mejor solución.
            </p>
            <div className="brands-list">
              {brands.map((brand, index) => (
                <motion.div 
                  key={index}
                  className="brand-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {brand}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="nosotros-why">
        <div className="container">
          <motion.div {...fadeInUp}>
            <h2 className="section-title">¿Por Qué Elegirnos?</h2>
            <div className="reasons-grid">
              {reasons.map((reason, index) => (
                <motion.div 
                  key={index}
                  className="reason-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="reason-check">✓</div>
                  <p>{reason}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="nosotros-location">
        <div className="container">
          <motion.div className="location-content" {...fadeInUp}>
            <MapPin size={40} />
            <h2 className="section-title">Servicio Local en Getafe</h2>
            <p className="location-text">
              Ofrecemos cobertura en <strong>Getafe y municipios cercanos</strong>, 
              proporcionando un servicio técnico de proximidad, ágil y eficiente en 
              toda la zona sur de Madrid.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="nosotros-mvv">
        <div className="container">
          <div className="mvv-grid">
            <motion.div className="mvv-card" {...fadeInUp}>
              <Target size={48} />
              <h3>Nuestra Misión</h3>
              <p>
                Proporcionar un servicio técnico de confianza que permita a nuestros 
                clientes <strong>reparar sus televisores de forma económica</strong>, 
                evitando gastos innecesarios en la compra de nuevos dispositivos.
              </p>
            </motion.div>

            <motion.div 
              className="mvv-card" 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <Eye size={48} />
              <h3>Visión</h3>
              <p>
                Convertirnos en el <strong>servicio técnico de referencia en Getafe 
                y el sur de Madrid</strong>, destacando por la calidad, rapidez y 
                satisfacción del cliente.
              </p>
            </motion.div>

            <motion.div 
              className="mvv-card values-card" 
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <TrendingUp size={48} />
              <h3>Valores</h3>
              <div className="values-list">
                {values.map((value, index) => (
                  <div key={index} className="value-item">
                    {value.icon}
                    <div>
                      <h4>{value.title}</h4>
                      <p>{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="nosotros-cta">
        <div className="container">
          <motion.div className="cta-content" {...fadeInUp}>
            <h2>¿Necesitas reparar tu televisor?</h2>
            <p>Contacta con nosotros para un diagnóstico gratuito y sin compromiso</p>
            <a 
              href="/contacto" 
              className="cta-button"
              onClick={() => trackClick('solicitar_presupuesto_nosotros', 'button')}
            >
              Solicitar Presupuesto Gratis
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Nosotros;
