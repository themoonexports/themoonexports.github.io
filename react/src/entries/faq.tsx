import React from 'react';
import { createRoot } from 'react-dom/client';
import FAQAccordion from '../components/FAQAccordion';

const mount = document.querySelector('.faq-section[data-react="faq"]');
if (mount) {
  createRoot(mount).render(<FAQAccordion />);
}
