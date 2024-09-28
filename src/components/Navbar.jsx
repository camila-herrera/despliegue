import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GlobalContext } from '../context/UserContext'; 
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { authUser, logOut } = useContext(GlobalContext);
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <nav className='Barra'>
      <div className="btn-group me-2" role="group" aria-label="First group">
        <h3 style={{ cursor: 'pointer' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Pizzería Mamma Mia!</Link>
        </h3>
      </div>
      <div className="d-inline-flex gap-1">
        <NavLink to="/" className="btn active" role="button" style={{ fontSize: 'small' }}>
          <img src='https://web.whatsapp.com/emoji/v1/15/1/2/single/w/64/01f355.png' className='pizzaimg' alt="Home" />Home
        </NavLink>
        
        {authUser.token ? (
          <>
            <NavLink to="/profile" className="btn active" role="button" style={{ fontSize: 'small' }}>
              <img src='/img/candado.png' className='pizzaimg' alt="Profile" />Profile
            </NavLink>
            <button onClick={logOut} className="btn active" role="button" style={{ fontSize: 'small' }}>
              <img src='/img/candado.png' className='pizzaimg' alt="Logout" />Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn active" role="button" style={{ fontSize: 'small' }}>
              <img src='/img/candado(1).png' className='pizzaimg' alt="Login" />Login
            </NavLink>
            <NavLink to="/register" className="btn active" role="button" style={{ fontSize: 'small' }}>
              <img src='/img/candado(1).png' className='pizzaimg' alt="Register" />Register
            </NavLink>
          </>
        )}
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <NavLink to="/cart" className="btn btn-outline-primary" role="button" style={{ fontSize: 'small' }}>
          <img src='/img/carrito-de-compras.png' className='pizzaimg' alt="Cart" />Total: ${total}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

