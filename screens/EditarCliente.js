import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import VoltarEditarClientes from "../components/VoltarEditarClientes.js";

import { useClientes } from "../context/ClientesContext.js";

const EditarCliente = ({ route, navigation }) => {
  const { cliente } = route.params;
  const { atualizarCliente } = useClientes();

  const [nomeCliente, setNomeCliente] = useState(cliente.nome);
  const [cpf, setCPF] = useState(cliente.cpf);
  const [rg, setRG] = useState(cliente.rg);
  const [telefone, setTelefone] = useState(cliente.telefone);
  const [cep, setCEP] = useState(cliente.cep);
  const [endereco, setEndereco] = useState(cliente.endereco);
  const [numeroCasa, setNumeroCasa] = useState(cliente.numeroCasa);

  const salvarEdicoes = () => {
    const clienteEditado = {
      ...cliente,
      nome: nomeCliente,
      cpf,
      rg,
      telefone,
      cep,
      endereco,
      numeroCasa,
    };
    console.log(clienteEditado)
    atualizarCliente(clienteEditado);
    navigation.navigate("DetalhesCliente", { cliente: clienteEditado });
  };

  return (
    <View style={styles.container}>
      <VoltarEditarClientes />
      <View style={styles.editarContainer}>
        <Text style={styles.title}>Editar Cliente</Text>
        <TextInput
          placeholder="Nome do Cliente"
          value={nomeCliente}
          onChangeText={(text) => setNomeCliente(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="CPF"
          value={cpf}
          onChangeText={(text) => setCPF(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="RG"
          value={rg}
          onChangeText={(text) => setRG(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Telefone"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="CEP"
          value={cep}
          onChangeText={(text) => setCEP(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Endereço"
          value={endereco}
          onChangeText={(text) => setEndereco(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Número da Casa"
          value={numeroCasa}
          onChangeText={(text) => setNumeroCasa(text)}
          style={styles.input}
        />
        <Button title="Salvar" onPress={salvarEdicoes} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editarContainer: {
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

export default EditarCliente;
