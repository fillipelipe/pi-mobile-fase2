import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import VoltarDetalhesClientes from "../components/VoltarDetalhesClientes.js";
import { useClientes } from "../context/ClientesContext.js";

const DetalhesCliente = ({ route, navigation }) => {
  const { cliente } = route.params;
  const { removerCliente } = useClientes();

  const handleEditar = () => {
    navigation.navigate("EditarCliente", { cliente });
  };

  const handleExcluir = () => {
    removerCliente(cliente.id);
    navigation.navigate("Clientes");
  };

  return (
    <View style={styles.container}>
      <VoltarDetalhesClientes />
      <View style={styles.detalhesContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Nome:</Text>
          <Text style={styles.tableData}>{cliente.nome}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>CPF:</Text>
          <Text style={styles.tableData}>{cliente.cpf}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>RG:</Text>
          <Text style={styles.tableData}>{cliente.rg}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Telefone:</Text>
          <Text style={styles.tableData}>{cliente.telefone}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>CEP:</Text>
          <Text style={styles.tableData}>{cliente.cep}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Endereço:</Text>
          <Text style={styles.tableData}>{cliente.endereco}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Número da Casa:</Text>
          <Text style={styles.tableData}>{cliente.numeroCasa}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Editar" onPress={handleEditar} color="#007AFF" />
          <View style={styles.separator} />
          <Button title="Excluir" onPress={handleExcluir} color="#FF3B30" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detalhesContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tableLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  tableData: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  separator: {
    width: 10,
  },
});

export default DetalhesCliente;
