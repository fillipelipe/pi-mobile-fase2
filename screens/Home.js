import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import Menu from "../components/Menu";
import { useOrcamentos } from "../context/OrcamentosContext";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { orcamentos } = useOrcamentos();
  const navigation = useNavigation();

  const lastTenOrcamentos = orcamentos.slice(-6).reverse();

  const navigateToDetalhes = (orcamento) => {
    navigation.navigate("DetalhesOrcamento", { orcamento });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Menu />
      <View style={styles.lastOrcamentosContainer}>
        <Title style={styles.title}>Últimos Orçamentos:</Title>
        {lastTenOrcamentos.map((orcamento) => (
          <TouchableWithoutFeedback
            key={orcamento.numero}
            onPress={() => navigateToDetalhes(orcamento)}
          >
            <View>
              <Card style={styles.orcamentoCard}>
                <Card.Content>
                  <Title>Número do Orçamento: {orcamento.numero}</Title>
                  <Paragraph>Cliente: {orcamento.cliente}</Paragraph>
                </Card.Content>
              </Card>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#D9D9D9",
  },
  lastOrcamentosContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orcamentoCard: {
    marginBottom: 16,
  },
});

export default Home;
