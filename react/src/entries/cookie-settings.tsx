import React from 'react';
import { createRoot } from 'react-dom/client';
import CookieSettings from '../components/CookieSettings';

const mount = document.querySelector('[data-react="cookie-settings"]');
if (mount) {
  createRoot(mount).render(<CookieSettings />);
}
