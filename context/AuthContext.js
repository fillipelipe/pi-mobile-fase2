import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const register = (nome, email, senha) => {
    const newUser = { nome, email, senha };
    setRegisteredUsers([...registeredUsers, newUser]);
    setError(null);
  };

  const login = async (email, senha) => {
    try {
      const foundUser = registeredUsers.find(
        (user) => user.email === email && user.senha === senha
      );

      if (foundUser) {
        setUser(foundUser);
        setError(null);
        return true;
      } else {
        setError("Credenciais inválidas");
        return false;
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setError("Erro ao realizar login");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
