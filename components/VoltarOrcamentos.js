import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const VoltarOrcamentos = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate('Orcamentos')} />
      <Appbar.Content title="Novo orçamento" />
    </Appbar.Header>
  );
};

export default VoltarOrcamentos;
