import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Clientes from '../screens/Clientes';
import NovoCliente from '../screens/NovoCliente';

const Stack = createStackNavigator();

const NavClientes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Clientes">
      <Stack.Screen name="Clientes" component={Clientes} />
      <Stack.Screen name="NovoCliente" component={NovoCliente}  />
    </Stack.Navigator>
  );
};

export default NavClientes;
