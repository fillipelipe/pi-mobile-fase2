import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

const VoltarDetalhesOrdem = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={estilos.color}>
      <Appbar.BackAction
        onPress={() => navigation.navigate("OrdemDeServico")}
      />
      <Appbar.Content title="Dados da ordem de serviço" />
    </Appbar.Header>
  );
};

const estilos = StyleSheet.create({
  color: {
    backgroundColor: "white",
  },
});
export default VoltarDetalhesOrdem;
