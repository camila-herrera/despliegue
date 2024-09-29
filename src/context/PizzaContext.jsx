import React, { createContext, useState, useEffect, useContext } from 'react';

const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
 
  const [pizzas, setPizzas] = useState([]);
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchPizzas = async () => {
    try {
      const response = await fetch('https://backend-pizzas-qa4r.onrender.com/api/pizzas');
      if (!response.ok) throw new Error('Error al obtener las pizzas');
      const data = await response.json();
      setPizzas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  const fetchPizzaById = async (id) => {
    try {
      const response = await fetch(`https://backend-pizzas-qa4r.onrender.com/api/pizzas/${id}`);
      if (!response.ok) throw new Error('Error al obtener la pizza');
      const data = await response.json();
      setPizza(data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <PizzaContext.Provider value={{ pizzas, pizza, fetchPizzaById, loading, error }}>
      {children}
    </PizzaContext.Provider>
  );
};


export const usePizza = () => useContext(PizzaContext);
