import React from 'react';
import { createRoot } from 'react-dom/client';
import ScrollToTop from '../components/ScrollToTop';

const mount = document.querySelector('[data-react="scroll-top"]');
if (mount) {
  createRoot(mount).render(<ScrollToTop />);
}
