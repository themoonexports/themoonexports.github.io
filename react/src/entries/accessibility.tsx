import React from 'react';
import { createRoot } from 'react-dom/client';
import AccessibilityWidget from '../components/AccessibilityWidget';

const mount = document.querySelector('[data-react="accessibility"]');
if (mount) {
  createRoot(mount).render(<AccessibilityWidget />);
}
