import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Title, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useClientes } from "../context/ClientesContext";
import { useOrcamentos } from "../context/OrcamentosContext";
import MenuOrcamentos from "../components/MenuOrcamentos";

const Orcamentos = () => {
  const navigation = useNavigation();
  const { clientes } = useClientes();
  const { orcamentos } = useOrcamentos();

  const navigateToDetalhes = (orcamento) => {
    navigation.navigate("DetalhesOrcamento", { orcamento });
  };

  return (
    <View style={styles.container}>
      <MenuOrcamentos />
      <ScrollView style={styles.orcamentosContainer}>
        {orcamentos.map((orcamento) => (
          <TouchableWithoutFeedback
            key={orcamento.numero}
            onPress={() => navigateToDetalhes(orcamento)}
          >
            <View>
              <Card style={styles.orcamentoCard}>
                <Card.Content>
                  <Title>Número do Orçamento: {orcamento.numero}</Title>
                  <Title>Cliente: {orcamento.cliente}</Title>
                </Card.Content>
              </Card>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("NovoOrcamento")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  orcamentosContainer: {
    backgroundColor: "white",
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
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
});

export default Orcamentos;
