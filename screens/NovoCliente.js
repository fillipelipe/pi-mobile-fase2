import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import VoltarClientes from "../components/VoltarClientes";
import { useClientes } from "../context/ClientesContext";

const NovoCliente = ({ navigation }) => {
  const { adicionarNovoCliente } = useClientes();

  const [nomeCliente, setNomeCliente] = useState("");
  const [cpf, setCPF] = useState("");
  const [rg, setRG] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCEP] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [nomeError, setNomeError] = useState(false);
  const [telefoneError, setTelefoneError] = useState(false);

  const adicionarCliente = () => {
    if (nomeCliente.trim() !== "" && telefone.trim() !== "") {
      const novoCliente = {
        id: Math.random().toString(),
        nome: nomeCliente,
        cpf,
        rg,
        telefone,
        cep,
        endereco,
        numeroCasa,
      };
      adicionarNovoCliente(novoCliente);
      setNomeCliente("");
      setCPF("");
      setRG("");
      setTelefone("");
      setCEP("");
      setEndereco("");
      setNumeroCasa("");
      setNomeError(false);
      setTelefoneError(false);
      navigation.navigate("Clientes");
    } else {
      if (nomeCliente.trim() === "") {
        setNomeError(true);
      } else {
        setNomeError(false);
      }
      if (telefone.trim() === "") {
        setTelefoneError(true);
      } else {
        setTelefoneError(false);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <VoltarClientes />
      <View style={styles.containerOrc}>
        <TextInput
          placeholder="Nome do Cliente"
          value={nomeCliente}
          onChangeText={(text) => setNomeCliente(text)}
          style={[styles.input, nomeError ? styles.errorInput : null]}
        />
        {nomeError && (
          <Text style={styles.errorMessage}>Nome é obrigatório</Text>
        )}
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
          style={[styles.input, telefoneError ? styles.errorInput : null]}
        />
        {telefoneError && (
          <Text style={styles.errorMessage}>Telefone é obrigatório</Text>
        )}
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
        <Button title="Adicionar Cliente" onPress={adicionarCliente} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerOrc: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  errorInput: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});

export default NovoCliente;
