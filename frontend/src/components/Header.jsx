import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.png';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="logo-text">Mi Servicio Técnico</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Inicio
          </Link>
          <Link to="/servicios" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Servicios
          </Link>
          <Link to="/contacto" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Contacto
          </Link>
          <Link to="/nosotros" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Nosotros
          </Link>
        </nav>

        {/* CTA Button */}
        <Link to="/contacto" className="cta-button">
          <Phone size={18} />
          <span>Solicitar Presupuesto</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
