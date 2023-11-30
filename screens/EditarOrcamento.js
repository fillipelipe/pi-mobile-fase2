import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useOrcamentos } from "../context/OrcamentosContext";
import VoltarEditarOrcamento from "../components/VoltarEditarOrcamento";

const EdicaoOrcamento = ({ route }) => {
  const { orcamento } = route.params;
  const navigation = useNavigation();
  const { editarOrcamento } = useOrcamentos();

  const [clienteSelecionado, setClienteSelecionado] = useState(
    orcamento.cliente
  );
  const [data, setData] = useState(orcamento.data);
  const [servico, setServico] = useState(orcamento.servico);
  const [pecas, setPecas] = useState(orcamento.pecas);
  const [valor, setValor] = useState(orcamento.valor);
  const [informacoesAdicionais, setInformacoesAdicionais] = useState(
    orcamento.informacoesAdicionais
  );

  const salvarEdicao = () => {
    const orcamentoEditado = {
      ...orcamento,
      cliente: clienteSelecionado,
      data,
      servico,
      pecas,
      valor,
      informacoesAdicionais,
    };

    editarOrcamento(orcamentoEditado);
    navigation.navigate("DetalhesOrcamento", { orcamento: orcamentoEditado });
  };

  return (
    <View style={styles.container}>
      <VoltarEditarOrcamento />
      <View style={styles.editarContainer}>
        <Text>Número do Orçamento: {orcamento.numero}</Text>
        <Text>Cliente:</Text>
        <TextInput
          placeholder="Cliente"
          value={clienteSelecionado}
          onChangeText={(text) => setClienteSelecionado(text)}
          style={styles.input}
        />
        <Text>Serviço:</Text>
        <TextInput
          placeholder="Serviço"
          value={servico}
          onChangeText={(text) => setServico(text)}
          style={styles.input}
        />
        <Text>Peças:</Text>
        <TextInput
          placeholder="Peças"
          value={pecas}
          onChangeText={(text) => setPecas(text)}
          style={styles.input}
        />
        <Text>Valor:</Text>
        <TextInput
          placeholder="Valor"
          value={valor}
          onChangeText={(text) => setValor(text)}
          style={styles.input}
        />
        <Text>Informações Adicionais:</Text>
        <TextInput
          placeholder="Informações Adicionais"
          value={informacoesAdicionais}
          onChangeText={(text) => setInformacoesAdicionais(text)}
          style={styles.input}
        />
        <Button title="Salvar Edição" onPress={salvarEdicao} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editarContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
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

export default EdicaoOrcamento;
