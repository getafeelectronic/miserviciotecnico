import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import CookieConsent from './components/CookieConsent';
import './App.css';

// Placeholder component para Servicios
function Services() {
  return (
    <div style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '60vh' }}>
      <h1>Servicios</h1>
      <p>Página en construcción...</p>
    </div>
  );
}

function App() {
  return (
    <>
      <CookieConsent />
      <BrowserRouter basename="/miserviciotecnico">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
