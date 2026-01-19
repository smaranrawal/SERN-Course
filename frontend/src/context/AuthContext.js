import { createContext, useContext, useState } from "react";
import { signIn } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children, value }) => {
  const [user, setUser] = useState(null);
  const login = async (userData) => {
    const data = await signIn(userData);
    console.log(data);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
