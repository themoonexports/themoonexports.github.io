import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductModal from '../components/ProductModal';

const mount = document.querySelector('.product-modal[data-react="product-modal"]');
if (mount) {
  createRoot(mount).render(<ProductModal />);
}
