import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import NavOrcamentos from "../navigation/NavOrcamentos";
import NavClientes from "../navigation/NavClientes";
import NavOrdem from "../navigation/NavOrdem";
import NavRecibos from "./NavRecibos";
import { AuthContext } from "../context/AuthContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const Navegacao = () => {
  const { user } = useContext(AuthContext);
  const initialRouteName = user ? "Home" : "Auth"; // Definindo a rota inicial com base no estado do usuário

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRouteName}
        unmountInactiveRoutes={true} // Garante que as rotas inativas sejam desmontadas
      >
        <Drawer.Screen
          name="Auth"
          component={AuthStack}
          options={{ drawerLabel: () => null }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ title: "Página Inicial" }}
        />
        <Drawer.Screen
          name="NavClientes"
          component={NavClientes}
          options={{ title: "Clientes" }}
        />
        <Drawer.Screen
          name="NavOrcamentos"
          component={NavOrcamentos}
          options={{ title: "Orçamentos" }}
        />
        <Drawer.Screen
          name="NavOrdem"
          component={NavOrdem}
          options={{ title: "Ordem de serviço" }}
        />
        <Drawer.Screen
          name="NavRecibos"
          component={NavRecibos}
          options={{ title: "Recibos" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navegacao;
