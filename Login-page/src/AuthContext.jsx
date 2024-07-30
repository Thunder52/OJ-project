import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token ? { loggedIn: true, token, role } : null;
   });
   
  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ loggedIn: true, token: response.data.token, role: response.data.role });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuth({
      token: null,
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

