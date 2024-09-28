import React, { useContext, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useCart } from '../context/CartContext';
import { GlobalContext } from '../context/UserContext';

const Cart = () => {
  const { authUser } = useContext(GlobalContext);
  const isUserAuthenticated = authUser.token;
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [message, setMessage] = useState(null);
  const getTotal = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handleCheckout = async () => {
    if (!isUserAuthenticated) {
      setMessage("Debes iniciar sesión para realizar la compra.");
      return;}

    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({ cart: cartItems }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Compra realizada con éxito!, sientese a esperar 😅 ");
      } else {
        setMessage(data?.error || "Ocurrió un error al procesar tu compra.");
      }
    } catch (error) {
      setMessage("Error al conectarse con el servidor. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px', marginTop: '35px', height: '91.2vh' }}>
      <h2>Carrito de Compras</h2>
      <ListGroup>
        {cartItems.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex align-items-center justify-content-between" style={{ padding: '10px' }}>
            <div className="d-flex align-items-center">
              <img src={item.img} alt={item.name} style={{ width: '80px', height: '80px', marginRight: '15px' }} />
              <div>
                <h6>Pizza {item.name}</h6>
                <p>Precio: ${item.price}</p>
                <p>
                  <Button variant="outline-primary" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ marginRight: '10px' }}>+</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                  <span style={{ marginLeft: '10px' }}>Cantidad: {item.quantity}</span>
                </p>
              </div>
            </div>
            <div>
              <p>Total: ${item.price * item.quantity}</p>
              <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
            </div>
          </ListGroup.Item>))}
      </ListGroup>      
      <div className="total-section" style={{ marginTop: '20px', textAlign: 'right' }}>
        <h4>Total a pagar: ${getTotal()}</h4>        
        <Button variant="success" disabled={!isUserAuthenticated || cartItems.length === 0} onClick={handleCheckout}
        >Comprar </Button>
        {message && <p style={{ color: isUserAuthenticated ? 'green' : 'red' }}>{message}</p>}
        {!isUserAuthenticated && <p style={{ color: 'red' }}>Inicia sesión para poder pagar</p>}
      </div>
    </div>
  );
};

export default Cart;
