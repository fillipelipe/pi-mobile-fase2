import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Clientes from "../screens/Clientes";
import NovoCliente from "../screens/NovoCliente";
import DetalhesCliente from "../screens/DetalhesCliente"; // Importe a tela de DetalhesCliente
import EditarCliente from "../screens/EditarCliente"; // Importe a tela de EditarCliente

const Stack = createStackNavigator();

const NavClientes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Clientes"
    >
      <Stack.Screen name="Clientes" component={Clientes} />
      <Stack.Screen name="NovoCliente" component={NovoCliente} />
      <Stack.Screen name="DetalhesCliente" component={DetalhesCliente} />
      <Stack.Screen name="EditarCliente" component={EditarCliente} />
    </Stack.Navigator>
  );
};

export default NavClientes;
