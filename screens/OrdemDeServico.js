import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useOrcamentos } from "../context/OrcamentosContext";
import { Card, Title, Paragraph } from "react-native-paper";
import MenuOrdemServico from "../components/MenuOrdemServico";
import { useNavigation } from "@react-navigation/native";

const CardContent = ({ orcamentosAprovados }) => {
  const navigation = useNavigation();

  const navigateToDetalhesOrdem = (orcamento) => {
    navigation.navigate("DetalhesOrdem", { orcamento });
  };

  return (
    <View>
      {orcamentosAprovados.map((orcamento) => (
        <TouchableWithoutFeedback
          key={orcamento.numero}
          onPress={() => navigateToDetalhesOrdem(orcamento)}
        >
          <View>
            <Card style={styles.detalheCard}>
              <Card.Content>
                <Title>Cliente: {orcamento.cliente}</Title>
                <Paragraph>Ordem de serviço N: {orcamento.numero}</Paragraph>
                <Paragraph>Valor do Orçamento: {orcamento.valor}</Paragraph>
              </Card.Content>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const OrdemDeServico = () => {
  const { orcamentos } = useOrcamentos();
  const orcamentosAprovados = orcamentos.filter(
    (orcamento) => orcamento.aprovado
  );

  return (
    <View style={styles.container}>
      <MenuOrdemServico />
      <View style={styles.ordemContainer}>
        {orcamentosAprovados.length > 0 ? (
          <CardContent orcamentosAprovados={orcamentosAprovados} />
        ) : (
          <Text style={styles.noOrdersText}>
            Nenhum orçamento aprovado encontrado.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  ordemContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  detalheCard: {
    marginBottom: 16,
  },
  noOrdersText: {
    marginTop: 20,
    textAlign: "center",
  },
});

export default OrdemDeServico;
