import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: read token from localStorage and verify it
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      API.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      API.get("/user/me")
        .then((res) => {
          setUser(res.data.data);
          setToken(savedToken);
        })
        .catch(() => {
          // Token invalid or expired — clear it
          localStorage.removeItem("accessToken");
          delete API.defaults.headers.common["Authorization"];
          setUser(null);
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/user/login", { email, password });
    const { user: u, accessToken } = res.data.data;
    setUser(u);
    setToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return u;
  };

  const logout = async () => {
    try {
      await API.post("/user/logout");
    } catch {
      // ignore logout errors
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    delete API.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, API }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { API };
