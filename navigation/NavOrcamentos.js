import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Orcamentos from '../screens/Orcamentos';
import NovoOrcamento from '../screens/NovoOrcamento';

const Stack = createStackNavigator();

const NavOrcamentos = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Orcamentos">
      <Stack.Screen name="Orcamentos" component={Orcamentos} />
      <Stack.Screen name="NovoOrcamento" component={NovoOrcamento} />
    </Stack.Navigator>
  );
};

export default NavOrcamentos;
