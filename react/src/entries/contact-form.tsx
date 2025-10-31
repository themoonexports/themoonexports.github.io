import React from 'react';
import { createRoot } from 'react-dom/client';
import ContactForm from '../components/ContactForm';

const mount = document.querySelector('#contact-form[data-react="contact-form"]');
if (mount) {
  createRoot(mount).render(<ContactForm />);
}
