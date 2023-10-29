import React, { createContext, useContext, useState, useMemo } from 'react';

const OrcamentosContext = createContext();

export function useOrcamentos() {
  return useContext(OrcamentosContext);
}

export function OrcamentosProvider({ children }) {
  const [orcamentos, setOrcamentos] = useState([]);

  const adicionarNovoOrcamento = (novoOrcamento) => {
    setOrcamentos([...orcamentos, novoOrcamento]);
  };

  const contextValue = useMemo(() => ({
    orcamentos,
    adicionarNovoOrcamento,
  }), [orcamentos]);

  return (
    <OrcamentosContext.Provider value={contextValue}>
      {children}
    </OrcamentosContext.Provider>
  );
}
