import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import './Header.css';

// Logo desde Supabase Storage
const logo = 'https://lysejfhxackcmoksclvm.supabase.co/storage/v1/object/sign/web/logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YWMwNzIyNi04MjE4LTRmYjctODQ1Mi0xOTMwZTU2NjRhODkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvbG9nby5wbmciLCJpYXQiOjE3NzcwMjc1NDAsImV4cCI6MjA5MjM4NzU0MH0.YFd0pdxZDl2Iej_M1GwgLecd3NfhaG2oe40wgMk_cp0';

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
