import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

const VoltarDetalhesClientes = () => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={estilos.color}>
      <Appbar.BackAction onPress={() => navigation.navigate("Clientes")} />
      <Appbar.Content title="Dados do cliente" />
    </Appbar.Header>
  );
};

const estilos = StyleSheet.create({
  color: {
    backgroundColor: "white",
  },
});
export default VoltarDetalhesClientes;
