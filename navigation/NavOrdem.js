import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrdemDeServico from "../screens/OrdemDeServico";
import DetalhesOrdem from "../screens/DetalhesOrdem";

const Stack = createStackNavigator();

const NavOrdem = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Ordens de serviços"
    >
      <Stack.Screen name="OrdemDeServico" component={OrdemDeServico} />
      <Stack.Screen name="DetalhesOrdem" component={DetalhesOrdem} />
    </Stack.Navigator>
  );
};

export default NavOrdem;
