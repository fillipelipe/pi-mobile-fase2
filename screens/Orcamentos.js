import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { FAB, Card, Title } from 'react-native-paper';
import MenuOrcamentos from '../components/MenuOrcamentos';
import { useClientes } from '../context/ClientesContext';
import { useOrcamentos } from '../context/OrcamentosContext';

const Orcamentos = ({ navigation }) => {
  const { clientes } = useClientes();
  const { orcamentos } = useOrcamentos();

  return (
    <View style={styles.container}>
      <MenuOrcamentos />
      <ScrollView style={styles.orcamentosContainer}>
        <Text style={styles.title}>Lista de Orçamentos</Text>
        {orcamentos.map((orcamento) => (
          <Card style={styles.orcamentoCard} key={orcamento.numero}>
            <Card.Content>
              <Title>Número do Orçamento: {orcamento.numero}</Title>
              <Title>Cliente: {orcamento.cliente}</Title>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('NovoOrcamento')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  orcamentosContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  orcamentoCard: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Orcamentos;
