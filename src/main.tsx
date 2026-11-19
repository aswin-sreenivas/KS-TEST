import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { parseRouteFromLocation } from './types/app';

async function bootstrap() {
  const initialRoute = parseRouteFromLocation(window.location.pathname, window.location.hash);

  // Preload active lazy route chunk before mounting so prerendered HTML transitions smoothly
  if (initialRoute === 'about') {
    await import('./pages/About');
  } else if (initialRoute === 'services') {
    await import('./pages/Services');
  } else if (initialRoute === 'projects') {
    await import('./pages/Projects');
  } else if (initialRoute === 'contact') {
    await import('./pages/Contact');
  } else if (initialRoute === 'not-found') {
    await import('./pages/NotFound');
  }

  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
}

void bootstrap();
