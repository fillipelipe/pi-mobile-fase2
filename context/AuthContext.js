import React, { createContext, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const register = async (nome, email, senha) => {
    try {
      // Criar usuário no Firebase Auth
      const authResponse = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFO6JxN50oqwNXaWMp5B0AT6iMOeb2ZlY`,
        {
          email,
          password: senha,
          returnSecureToken: true,
        }
      );

      const { localId: userId, idToken } = authResponse.data;

      // Adicionar informações adicionais ao usuário no Realtime Database
      await axios.put(
        `https://prestador-c3f71-default-rtdb.firebaseio.com/usuarios/${userId}.json?auth=${idToken}`,
        {
          nome,
          email,
        }
      );

      setUser({ userId, nome, email });
      setError(null);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setError('Erro ao registrar usuário');
    }
  };

  const login = async (email, senha) => {
    try {
      // Autenticar usuário no Firebase Auth
      const authResponse = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFO6JxN50oqwNXaWMp5B0AT6iMOeb2ZlY`,
        {
          email,
          password: senha,
          returnSecureToken: true,
        }
      );

      const { localId: userId } = authResponse.data;

      // Obter informações adicionais do usuário do Realtime Database
      const userResponse = await axios.get(
        `https://prestador-c3f71-default-rtdb.firebaseio.com/usuarios/${userId}.json`
      );

      const { nome } = userResponse.data;

      setUser({ userId, nome, email });
      setError(null);
      return true;
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      setError('Credenciais inválidas');
      return false;
    }
  };

  const logout = () => {
    // Implemente a lógica de logout aqui, se necessário.
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
