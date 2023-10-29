import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navegacao from './navigation/Navegacao';
import { ClientesProvider } from './context/ClientesContext'; // Importe o ClientesProvider

const App = () => {
  return (
    <ClientesProvider>
      <NavigationContainer>
        <Navegacao />
      </NavigationContainer>
    </ClientesProvider>
  );
}

export default App;
