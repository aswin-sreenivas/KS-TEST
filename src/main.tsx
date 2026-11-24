import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { parseRouteFromLocation } from './types/app';
import { preloadPageComponent } from './utils/pageLoader';

async function bootstrap() {
  const initialRoute = parseRouteFromLocation(window.location.pathname, window.location.hash);

  // Preload active route module into the synchronous registry before mounting so React renders
  // the prerendered route immediately without flashing a Suspense fallback.
  await preloadPageComponent(initialRoute);

  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
}

void bootstrap();
