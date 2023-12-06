import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from '../services/firebaseConfig'

const ClientesContext = createContext();

export function useClientes() {
  return useContext(ClientesContext);
}

export function ClientesProvider({ children }) {
  const [clientes, setClientes] = useState([]);

  //useEffect(() => {
    // Função para carregar clientes do Firebase ao iniciar
    const carregarClientes = async () => {
      try {
        const response = await axios.get('/clientes.json');
        const data = response.data;

        if (data) {
          const clientesArray = Object.keys(data).map((key) => ({
            key,
            ...data[key],
          }));
          console.log(clientesArray)
          setClientes(clientesArray);
        }
      } catch (error) {
        console.error("Erro ao carregar clientes do Firebase:", error);
      }
    };

    //carregarClientes();
  //}, []);

  const adicionarNovoCliente = async (novoCliente) => {
    try {
      const response = await axios.post('/clientes.json', novoCliente);
      const clienteComId = { id: response.data.name, ...novoCliente };
      setClientes([...clientes, clienteComId]);
    } catch (error) {
      console.error("Erro ao adicionar novo cliente no Firebase:", error.response.data);
    }
  };
  
  const atualizarCliente = async (clienteAtualizado) => {
    try {
  
      await axios.put(`/clientes/${clienteAtualizado.key}.json`, clienteAtualizado);
  
      const novosClientes = clientes.map((cliente) =>
        cliente.key === clienteAtualizado.key ? clienteAtualizado : cliente
      );
      setClientes(novosClientes);
    } catch (error) {
      console.error("Erro ao atualizar cliente no Firebase:", error.response.data);
    }
  };
  
  const removerCliente = async (clienteId) => {
    try {
      // Garanta que o ID seja um token seguro
      const safeId = clienteId.replace(/[.#$/[\]]/g, "_");
  
      await axios.delete(`/clientes/${safeId}.json`);
  
      const novosClientes = clientes.filter((cliente) => cliente.id !== clienteId);
      setClientes(novosClientes);
    } catch (error) {
      console.error("Erro ao remover cliente do Firebase:", error.response.data);
    }
  };
  

  const contextValue = useMemo(
    () => ({
      clientes,
      adicionarNovoCliente,
      atualizarCliente,
      removerCliente,
      carregarClientes,
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
