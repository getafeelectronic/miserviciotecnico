import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import './App.css';

// Placeholder components para las páginas que crearemos
function Services() {
  return (
    <div style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '60vh' }}>
      <h1>Servicios</h1>
      <p>Página en construcción...</p>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '60vh' }}>
      <h1>Contacto</h1>
      <p>Página en construcción...</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '60vh' }}>
      <h1>Sobre Nosotros</h1>
      <p>Página en construcción...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
