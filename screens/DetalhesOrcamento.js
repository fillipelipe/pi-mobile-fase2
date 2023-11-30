import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useOrcamentos } from "../context/OrcamentosContext";
import { Checkbox } from "react-native-paper";
import VoltarDetalhesOrcamento from "../components/VoltarDetalhesOrcamento";

const DetalhesOrcamento = ({ route }) => {
  const { orcamento } = route.params;
  const navigation = useNavigation();
  const { removerOrcamento, atualizarStatusAprovado } = useOrcamentos();
  const [aprovado, setAprovado] = useState(false);
  const [naoAprovado, setNaoAprovado] = useState(false);

  useEffect(() => {
    if (orcamento.aprovado) {
      setAprovado(true);
    } else {
      setNaoAprovado(true);
    }
  }, [orcamento.aprovado]);

  const handleEditar = () => {
    navigation.navigate("EditarOrcamento", { orcamento });
  };

  const handleExcluir = () => {
    removerOrcamento(orcamento.numero);
    navigation.navigate("Orcamentos");
  };

  const handleAprovacao = (status) => {
    if (status === "aprovado") {
      setAprovado(true);
      setNaoAprovado(false);
      atualizarStatusAprovado(orcamento.numero, true);
    } else {
      setNaoAprovado(true);
      setAprovado(false);
      atualizarStatusAprovado(orcamento.numero, false);
    }
  };

  return (
    <View style={styles.container}>
      <VoltarDetalhesOrcamento />
      <View style={styles.Detalhescontainer}>
        <Text>Número do Orçamento: {orcamento.numero}</Text>
        <Text>Cliente: {orcamento.cliente}</Text>
        <Text>
          Data:{" "}
          {orcamento.data
            ? new Date(orcamento.data).toDateString()
            : "Data não disponível"}
        </Text>
        <Text>Serviço: {orcamento.servico}</Text>
        <Text>Peças: {orcamento.pecas}</Text>
        <Text>Valor: {orcamento.valor}</Text>
        <Text>Informações Adicionais: {orcamento.informacoesAdicionais}</Text>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}>
            <Checkbox
              status={aprovado ? "checked" : "unchecked"}
              onPress={() => handleAprovacao("aprovado")}
              color="black"
            />
            <Text>Aprovado</Text>
          </View>
          <View style={styles.checkbox}>
            <Checkbox
              status={naoAprovado ? "checked" : "unchecked"}
              onPress={() => handleAprovacao("naoAprovado")}
              color="black"
            />
            <Text>Não Aprovado</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Editar" onPress={handleEditar} />
          <Button title="Excluir" onPress={handleExcluir} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Detalhescontainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default DetalhesOrcamento;
