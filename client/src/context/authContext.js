import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (token) => {
    // Save token to localStorage or cookies (optional)
    localStorage.setItem("token", token);
try{
    // Decode JWT token to get user info
    const decoded = jwtDecode(token);
     console.log("Decoded token:", decoded);

    // Set user state with all fields
    setUser({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      usn: decoded.usn,
    });
     } catch (err) {
      console.error("❌ Failed to decode token", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
