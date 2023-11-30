import React, { createContext, useContext, useState, useMemo } from "react";

const ClientesContext = createContext();

export function useClientes() {
  return useContext(ClientesContext);
}

export function ClientesProvider({ children }) {
  const [clientes, setClientes] = useState([]);

  const adicionarNovoCliente = (novoCliente) => {
    setClientes([...clientes, novoCliente]);
  };

  const atualizarCliente = (clienteAtualizado) => {
    const novosClientes = clientes.map((cliente) => {
      if (cliente.id === clienteAtualizado.id) {
        return clienteAtualizado;
      }
      return cliente;
    });
    setClientes(novosClientes);
  };

  const removerCliente = (clienteId) => {
    const novosClientes = clientes.filter(
      (cliente) => cliente.id !== clienteId
    );
    setClientes(novosClientes);
  };

  const contextValue = useMemo(
    () => ({
      clientes,
      adicionarNovoCliente,
      atualizarCliente,
      removerCliente,
    }),
    [clientes]
  );

  return (
    <ClientesContext.Provider value={contextValue}>
      {children}
    </ClientesContext.Provider>
  );
}

export default ClientesContext;
