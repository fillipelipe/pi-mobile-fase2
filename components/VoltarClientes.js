import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const VoltarClientes = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate('Clientes')} />
      <Appbar.Content title="Novo Cliente" />
    </Appbar.Header>
  );
};

export default VoltarClientes;
