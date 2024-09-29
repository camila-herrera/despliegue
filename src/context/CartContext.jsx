import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (pizza) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === pizza.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item );} 
      else {
        return [...prevItems, { ...pizza, quantity: 1 }];}});};

  const removeFromCart = (pizzaId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== pizzaId));};

  const updateQuantity = (pizzaId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item => item.id === pizzaId ? { ...item, quantity: Math.max(quantity, 0) } : item ));};
  
  const vaciarCarrito = () => {setCartItems ([])}

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );};

export const useCart = () => useContext(CartContext);
