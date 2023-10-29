import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalhesCliente = ({ route }) => {
  const { cliente } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Cliente</Text>
      <Text>Nome: {cliente.nome}</Text>
      <Text>CPF: {cliente.cpf}</Text>
      <Text>RG: {cliente.rg}</Text>
      <Text>Telefone: {cliente.telefone}</Text>
      <Text>CEP: {cliente.cep}</Text>
      <Text>Endereço: {cliente.endereco}</Text>
      <Text>Número da Casa: {cliente.numeroCasa}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default DetalhesCliente;
