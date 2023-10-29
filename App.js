import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navegacao from './navigation/Navegacao';
import { ClientesProvider } from './context/ClientesContext'; // Importe o ClientesProvider
import { OrcamentosProvider } from './context/OrcamentosContext';

const App = () => {
  return (
    <ClientesProvider>
      <OrcamentosProvider>
      <NavigationContainer>
        <Navegacao />
      </NavigationContainer>
      </OrcamentosProvider>
    </ClientesProvider>
  );
}

export default App;
