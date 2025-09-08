import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroCarousel from './components/HeroCarousel';
import ProductCategories from './components/ProductCategories';
import './styles/original.css';

// Home page component preserving original layout
const HomePage: React.FC = () => {
  return (
    <main id="main-content" role="main">
      <HeroCarousel />
      <ProductCategories />
    </main>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Additional routes will be added in subsequent phases */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;