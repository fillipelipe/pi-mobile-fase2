import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Recibos from "../screens/Recibos";
import DetalhesRecibos from "../screens/DetalhesRecibos";

const Stack = createStackNavigator();

const NavRecibos = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Recibos"
    >
      <Stack.Screen name="Recibos" component={Recibos} />
      <Stack.Screen name="DetalhesRecibos" component={DetalhesRecibos} />
    </Stack.Navigator>
  );
};

export default NavRecibos;
