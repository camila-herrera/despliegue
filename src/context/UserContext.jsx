import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState({ token: null, email: "", username: "" });

  const login = async (email, password) => {
    try {
      const response = await fetch("https://backend-pizzas-qa4r.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error en el login");

      setAuthUser({ token: data.token, email: data.email, username: data.username });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Error en el login:", error.message);
      alert(error.message);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch("https://backend-pizzas-qa4r.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error en el registro");

      setAuthUser({ token: data.token, email: data.email, username: data.username });
      localStorage.setItem("token", data.token);
      navigate("/profile");
    } catch (error) {
      console.error("Error en el registro:", error.message);
      alert(error.message);
    }
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("https://backend-pizzas-qa4r.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al obtener perfil");

      setAuthUser({ token, email: data.email, username: data.username });
    } catch (error) {
      console.error("Error al obtener perfil:", error.message);
      alert(error.message);
    }
  };

  const logOut = () => {
    setAuthUser({ token: null, email: "", username: "" });
    localStorage.removeItem("token");
    navigate("/login");  // Redirigir a login
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile();
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ authUser, login, register, logOut }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

