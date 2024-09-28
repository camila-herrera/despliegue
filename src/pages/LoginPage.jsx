import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/UserContext';

const LoginPage = () => {
  const { login } = useContext(GlobalContext);
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); login(email, password);};

  return (
    <div className="Login">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">Usuario</label>
          <br/>
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <br/>
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;


