import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

const VoltarDetalhesOrcamento = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={estilos.color}>
      <Appbar.BackAction onPress={() => navigation.navigate("Orcamentos")} />
      <Appbar.Content title="Detalhes do orçamento" />
    </Appbar.Header>
  );
};

const estilos = StyleSheet.create({
  color: {
    backgroundColor: "white",
  },
});
export default VoltarDetalhesOrcamento;
