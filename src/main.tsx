import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './index.css';

const hadServiceWorkerController = Boolean(navigator.serviceWorker?.controller);
let refreshingForServiceWorkerUpdate = false;

navigator.serviceWorker?.addEventListener('controllerchange', () => {
  if (!hadServiceWorkerController || refreshingForServiceWorkerUpdate) return;
  refreshingForServiceWorkerUpdate = true;
  window.location.reload();
});

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    void updateSW(true);
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
