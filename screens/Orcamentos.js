import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { FAB, Card, Title } from 'react-native-paper'; // Importe o Card e Title do React Native Paper
import MenuOrcamentos from '../components/MenuOrcamentos';

const Orcamentos = ({ navigation }) => {
  const [orcamentos, setOrcamentos] = useState([]); // Define um estado para armazenar os orçamentos

  // Simule a obtenção dos orçamentos, por exemplo, de uma API ou banco de dados
  useEffect(() => {
    // Aqui você pode buscar os dados dos orçamentos e definir o estado
    const dadosDosOrcamentos = [
      { id: '1', descricao: 'Orçamento 1' },
      { id: '2', descricao: 'Orçamento 2' },
      { id: '3', descricao: 'Orçamento 3' },
      // Adicione mais orçamentos aqui
    ];
    setOrcamentos(dadosDosOrcamentos);
  }, []);

  return (
    <View style={styles.container}>
      <MenuOrcamentos />
      <ScrollView style={styles.orcamentosContainer}>
        <Text style={styles.title}>Lista de Orçamentos</Text>
        {orcamentos.map((orcamento) => (
          <Card style={styles.orcamentoCard} key={orcamento.id}>
            <Card.Content>
              <Title>{orcamento.descricao}</Title>
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
    backgroundColor: 'white', // Cor de fundo do container da lista de orçamentos
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
