import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useOrcamentos } from "../context/OrcamentosContext";
import VoltarDetalhesOrdem from "../components/VoltarDetalhesOrdem";
import { FAB, Checkbox } from "react-native-paper";
import { Share } from "react-native";

const DetalhesOrdem = ({ route }) => {
  const { orcamento } = route.params;
  const navigation = useNavigation();
  const { atualizarNomeTecnico, orcamentos, atualizarCheckbox } =
    useOrcamentos();

  const [tecnico, setTecnico] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [emAndamento, setEmAndamento] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  useEffect(() => {
    const orcamentoEncontrado = orcamentos.find(
      (o) => o.numero === orcamento.numero
    );
    if (orcamentoEncontrado) {
      setTecnico(orcamentoEncontrado.nomeTecnico || "");
      setEmAndamento(orcamentoEncontrado.emAndamento || false);
      setConcluido(orcamentoEncontrado.concluido || false);
      setSelectedCheckbox(orcamentoEncontrado.selectedCheckbox || null);
    }
  }, [orcamento, orcamentos]);

  const handleSalvarTecnico = () => {
    atualizarNomeTecnico(orcamento.numero, tecnico);
    setMensagem("Técnico salvo");
    setTimeout(() => {
      setMensagem("");
    }, 2000);
  };

  const handleCheckboxChange = (checkboxType) => {
    if (checkboxType === "emAndamento") {
      setEmAndamento(true);
      setConcluido(false);
      setSelectedCheckbox("emAndamento");
      atualizarCheckbox(orcamento.numero, "emAndamento");
    } else if (checkboxType === "concluido") {
      setEmAndamento(false);
      setConcluido(true);
      setSelectedCheckbox("concluido");
      atualizarCheckbox(orcamento.numero, "concluido");
    }
  };

  const handleCompartilhar = async () => {
    try {
      const message = `Detalhes da ordem de serviço:\nCliente: ${
        orcamento.cliente
      }\nData: ${
        orcamento.data
          ? new Date(orcamento.data).toDateString()
          : "Data não disponível"
      }\nServiço: ${orcamento.servico}\nPeças: ${orcamento.pecas}\nValor: ${
        orcamento.valor
      }\nInformações Adicionais: ${
        orcamento.informacoesAdicionais
      }\nTécnico: ${tecnico}`;
      await Share.share({
        message,
        title: "Detalhes da Ordem de Serviço",
      });
    } catch (error) {
      console.error("Erro ao compartilhar informações:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <VoltarDetalhesOrdem />
      <View style={styles.detalhesContainer}>
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
      </View>
      <View style={styles.tecnicoContainer}>
        <Text>Digite o nome do técnico:</Text>
        <TextInput
          style={styles.input}
          value={tecnico}
          onChangeText={(text) => setTecnico(text)}
          placeholder="Nome do Técnico"
        />
        <Button title="Salvar Técnico" onPress={handleSalvarTecnico} />
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          label="Em andamento"
          status={selectedCheckbox === "emAndamento" ? "checked" : "unchecked"}
          onPress={() => handleCheckboxChange("emAndamento")}
        />
        <Checkbox.Item
          label="Concluído"
          status={selectedCheckbox === "concluido" ? "checked" : "unchecked"}
          onPress={() => handleCheckboxChange("concluido")}
        />
      </View>
      <FAB
        style={styles.fab}
        icon="share-variant"
        onPress={handleCompartilhar}
        label="Compartilhar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detalhesContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  tecnicoContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default DetalhesOrdem;
