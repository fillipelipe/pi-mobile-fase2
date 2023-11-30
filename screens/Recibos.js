import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Card } from "react-native-paper";
import { useOrcamentos } from "../context/OrcamentosContext";
import MenuRecibos from "../components/MenuRecibos";
import { useNavigation } from "@react-navigation/native";

const DetalhesRecibos = () => {
  const { orcamentos } = useOrcamentos();
  const navigation = useNavigation();

  const ordensConcluidas = orcamentos.filter(
    (orcamento) => orcamento.selectedCheckbox === "concluido"
  );

  const navigateToDetalhesRecibo = (ordem) => {
    navigation.navigate("DetalhesRecibos", {
      cliente: ordem.cliente,
      valor: ordem.valor,
      servico: ordem.servico,
      nomeTecnico: ordem.nomeTecnico,
    });
  };

  return (
    <View style={styles.container}>
      <MenuRecibos />
      <ScrollView style={styles.orcamentosContainer}>
        {ordensConcluidas.length > 0 ? (
          ordensConcluidas.map((ordem) => (
            <TouchableWithoutFeedback
              key={ordem.numero}
              onPress={() => navigateToDetalhesRecibo(ordem)}
            >
              <Card style={styles.orcamentoCard}>
                <Card.Content>
                  <Text>Ordem de serviço: {ordem.numero}</Text>
                  <Text>Cliente: {ordem.cliente}</Text>
                  <Text>Técnico: {ordem.nomeTecnico}</Text>
                  <Text>Valor do Serviço: {ordem.valor}</Text>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <Text style={styles.noOrdersText}>
            Nenhuma ordem concluída disponível para exibir recibos.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  orcamentosContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  orcamentoCard: {
    marginBottom: 16,
  },
  noOrdersText: {
    marginTop: 20,
    textAlign: "center",
  },
});

export default DetalhesRecibos;
