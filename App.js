import React from "react";
import Navegacao from "./navigation/Navegacao";
import { AuthProvider } from "./context/AuthContext";
import { ClientesProvider } from "./context/ClientesContext";
import { OrcamentosProvider } from "./context/OrcamentosContext";

const App = () => {
  return (
    <AuthProvider>
      <ClientesProvider>
        <OrcamentosProvider>
          <Navegacao />
        </OrcamentosProvider>
      </ClientesProvider>
    </AuthProvider>
  );
};

export default App;
