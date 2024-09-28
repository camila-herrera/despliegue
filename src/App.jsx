import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PizzaPage from './pages/PizzaPage';
import { GlobalContext } from "./context/UserContext";
import { useContext } from "react";


function App() {
  const { authUser } = useContext(GlobalContext);
  const token = authUser.token;

  return (

          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/" />} />
              <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" />} />
              <Route path="/pizza/:id" element={<PizzaPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </div>
        
  );
}

export default App;