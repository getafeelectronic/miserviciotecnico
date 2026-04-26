import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import ServicioDetalle from './pages/ServicioDetalle';
import CookieConsent from './components/CookieConsent';
import './App.css';

function App() {
  return (
    <>
      <CookieConsent />
      <BrowserRouter basename="/miserviciotecnico">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/servicios/:slug" element={<ServicioDetalle />} />
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
