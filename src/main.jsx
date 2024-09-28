import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import GlobalProvider from './context/UserContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { PizzaProvider } from './context/PizzaContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <CartProvider>
          <PizzaProvider>
            <App />
          </PizzaProvider>
        </CartProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);