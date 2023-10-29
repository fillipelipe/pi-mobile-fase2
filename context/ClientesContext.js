import React, { createContext, useContext, useState, useMemo } from 'react';

const ClientesContext = createContext();

export function useClientes() {
  return useContext(ClientesContext);
}

export function ClientesProvider({ children }) {
  const [clientes, setClientes] = useState([]);

  const adicionarNovoCliente = (novoCliente) => {
    setClientes([...clientes, novoCliente]);
  };

  const contextValue = useMemo(() => ({
    clientes,
    adicionarNovoCliente,
  }), [clientes]);

  return (
    <ClientesContext.Provider value={contextValue}>
      {children}
    </ClientesContext.Provider>
  );
}

export default ClientesContext;
