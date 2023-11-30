import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import VoltarOrcamentos from "../components/VoltarOrcamentos";
import { useClientes } from "../context/ClientesContext";
import { useOrcamentos } from "../context/OrcamentosContext";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const NovoOrcamento = () => {
  const navigation = useNavigation();
  const { clientes } = useClientes();
  const { orcamentos, adicionarNovoOrcamento } = useOrcamentos();

  useEffect(() => {
    if (orcamentos.length > 0) {
      const maxNumeroOrcamento = Math.max(
        ...orcamentos.map((orcamento) => orcamento.numero)
      );
      setNumeroOrcamento(maxNumeroOrcamento + 1);
    }
  }, [orcamentos]);

  const [numeroOrcamento, setNumeroOrcamento] = useState(1);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [servico, setServico] = useState("");
  const [pecas, setPecas] = useState("");
  const [valor, setValor] = useState("");
  const [informacoesAdicionais, setInformacoesAdicionais] = useState("");

  const criarNovoOrcamento = () => {
    const cliente = clientes.find((c) => c.id === clienteSelecionado);

    const dataFormatada = data.toISOString();

    const novoOrcamento = {
      numero: numeroOrcamento,
      cliente: cliente ? cliente.nome : "",
      data: dataFormatada,
      servico,
      pecas,
      valor,
      informacoesAdicionais,
    };

    adicionarNovoOrcamento(novoOrcamento);

    setNumeroOrcamento(numeroOrcamento + 1);
    setClienteSelecionado("");
    setData(new Date());
    setServico("");
    setPecas("");
    setValor("");
    setInformacoesAdicionais("");

    navigation.navigate("Orcamentos");
  };

  return (
    <View style={styles.container}>
      <VoltarOrcamentos />
      <View style={styles.containerOrc}>
        <Text style={styles.title}>Número do Orçamento: {numeroOrcamento}</Text>
        <Picker
          selectedValue={clienteSelecionado}
          onValueChange={(itemValue) => setClienteSelecionado(itemValue)}
        >
          <Picker.Item label="Selecione um cliente" value="" />
          {clientes.map((cliente) => (
            <Picker.Item
              key={cliente.id}
              label={cliente.nome}
              value={cliente.id}
            />
          ))}
        </Picker>
        <Button
          title="Selecione a Data"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setData(selectedDate);
              }
            }}
          />
        )}
        <Text>Data: {data.toDateString()}</Text>
        <TextInput
          placeholder="Serviço"
          value={servico}
          onChangeText={(text) => setServico(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Peças"
          value={pecas}
          onChangeText={(text) => setPecas(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Valor"
          value={valor}
          onChangeText={(text) => setValor(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Informações Adicionais"
          value={informacoesAdicionais}
          onChangeText={(text) => setInformacoesAdicionais(text)}
          style={styles.input}
        />
        <Button title="Salvar Orçamento" onPress={criarNovoOrcamento} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerOrc: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
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

export default NovoOrcamento;
