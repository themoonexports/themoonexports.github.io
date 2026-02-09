import React from 'react';
import { createRoot } from 'react-dom/client';
import Testimonials from '../components/Testimonials';

const mount = document.querySelector('[data-react="testimonials"]');
if (mount) {
  createRoot(mount).render(<Testimonials />);
}
