import React, { useContext } from 'react';
import { GlobalContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { authUser, logOut } = useContext(GlobalContext);

  if (!authUser.token) {
    return <Navigate to="/login" />;
  }


  return (
    <div className="profile-page" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: '1'}} >
      <div className="containerP ">
        <h2 style={{ textAlign: 'center' }}>Bienvenido {authUser.username}</h2>
        <form className="row g-3">
          <div className="col-12">
            <p>Correo Electrónico: {authUser.email}</p>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <button 
              onClick={logOut}
              type="submit" 
              className="btn btn-primary" 
              style={{ maxWidth: '150px', marginTop: '20px' }}
            >
              Cerrar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
