import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { FAB, Card, Title, Avatar } from "react-native-paper";
import MenuClientes from "../components/MenuClientes.js";
import { useClientes } from "../context/ClientesContext.js";

const Clientes = ({ navigation }) => {
  const { clientes } = useClientes();

  return (
    <View style={styles.container}>
      <MenuClientes />
      <View style={styles.clientesContainer}>
        <FlatList
          data={clientes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("DetalhesCliente", { cliente: item })
              }
            >
              <Card style={styles.clienteCard}>
                <Card.Content style={styles.cardContent}>
                  <Avatar.Text
                    size={48}
                    label={item.nome[0]}
                    style={styles.avatar}
                  />
                  <Title style={styles.clienteNome}>{item.nome}</Title>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => navigation.navigate("NovoCliente")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  clientesContainer: {
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
  clienteCard: {
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 16,
    backgroundColor: "black",
  },
  clienteNome: {
    fontSize: 20,
  },
  fab: {
    position: "absolute",
    backgroundColor: "black",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Clientes;
