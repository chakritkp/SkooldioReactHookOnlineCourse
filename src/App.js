import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './contexts/cart'

export const App = () => {
  return (

    <CartProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/products/:productId" element= {<ProductDetail/>}>

          </Route>
          <Route path="/my-cart" element= {<Cart />}>
            
          </Route>
          <Route path="/" element= { <Home />}>

          </Route>
        </Routes>

        <Footer />
      </Router>
    </CartProvider>

  );
};

export default App;
