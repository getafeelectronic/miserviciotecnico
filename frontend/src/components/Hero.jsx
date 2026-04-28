import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAnalytics from '../hooks/useAnalytics';
import './Hero.css';

function Hero() {
  const { trackClick } = useAnalytics();
  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title">
            Reparación de <span className="highlight">Televisores</span> en Getafe
          </h1>
          <p className="hero-subtitle">
            Servicio técnico profesional con más de 20 años de experiencia.
            Diagnóstico gratuito y garantía en todas nuestras reparaciones.
          </p>
          <div className="hero-buttons">
            <Link 
              to="/contacto" 
              className="btn btn-primary"
              onClick={() => trackClick('solicitar_presupuesto_hero', 'button')}
            >
              <Phone size={20} />
              Solicitar Presupuesto
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/servicios" 
              className="btn btn-secondary"
              onClick={() => trackClick('ver_servicios_hero', 'button')}
            >
              Ver Servicios
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="hero-badges">
            <div className="badge">
              <span className="badge-icon">✓</span>
              <span className="badge-text">Diagnóstico Gratis</span>
            </div>
            <div className="badge">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">Reparación Rápida</span>
            </div>
            <div className="badge">
              <span className="badge-icon">🛡️</span>
              <span className="badge-text">Garantía Incluida</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img 
            src="https://lysejfhxackcmoksclvm.supabase.co/storage/v1/object/sign/web/1200_900.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YWMwNzIyNi04MjE4LTRmYjctODQ1Mi0xOTMwZTU2NjRhODkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvMTIwMF85MDAuanBlZyIsImlhdCI6MTc3NzAyODQwOSwiZXhwIjoyMDkyMzg4NDA5fQ.c1Kdi_KY3gWqrINnravQeZ74CJMv8Va6MLdQnIWd-TQ"
            alt="Reparación de televisores profesional"
            className="hero-image-real"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
