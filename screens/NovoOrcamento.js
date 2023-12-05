import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import VoltarOrcamentos from "../components/VoltarOrcamentos";
import { useClientes } from "../context/ClientesContext";
import { useOrcamentos } from "../context/OrcamentosContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomDatePickerInput = ({ value, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formattedDate = () => {
    const day = value.getDate();
    const month = value.getMonth() + 1;
    const year = value.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.datePickerContainer}>
      <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}>
        <Icon
          name="calendar"
          size={24}
          color="black"
          style={styles.calendarIcon}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => setShowDatePicker(true)}
        style={styles.datePickerInput}
      >
        <Text>{formattedDate()}</Text>
      </TouchableWithoutFeedback>
      {showDatePicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
};

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
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [data, setData] = useState(new Date());
  const [servico, setServico] = useState("");
  const [pecas, setPecas] = useState("");
  const [valor, setValor] = useState("");
  const [informacoesAdicionais, setInformacoesAdicionais] = useState("");

  const [errorCliente, setErrorCliente] = useState("");
  const [errorServico, setErrorServico] = useState("");
  const [errorPecas, setErrorPecas] = useState("");
  const [errorValor, setErrorValor] = useState("");

  const criarNovoOrcamento = () => {
    let hasError = false;

    if (!clienteSelecionado) {
      setErrorCliente("Selecione um cliente");
      hasError = true;
    } else {
      setErrorCliente("");
    }

    if (!servico) {
      setErrorServico("Preencha o serviço");
      hasError = true;
    } else {
      setErrorServico("");
    }

    if (!pecas) {
      setErrorPecas("Preencha as peças");
      hasError = true;
    } else {
      setErrorPecas("");
    }

    if (!valor) {
      setErrorValor("Preencha o valor");
      hasError = true;
    } else {
      setErrorValor("");
    }

    if (hasError) {
      return;
    }

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
    setClienteSelecionado(null);
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
        {!!errorCliente && <Text style={styles.errorText}>{errorCliente}</Text>}
        <Picker
          selectedValue={clienteSelecionado}
          style={{ height: 40, marginBottom: 20 }}
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

        <CustomDatePickerInput
          value={data}
          onChange={(selectedDate) => setData(selectedDate)}
        />
        {!!errorServico && <Text style={styles.errorText}>{errorServico}</Text>}
        <TextInput
          placeholder="Serviço"
          value={servico}
          onChangeText={(text) => setServico(text)}
          style={styles.input}
        />

        {!!errorPecas && <Text style={styles.errorText}>{errorPecas}</Text>}
        <TextInput
          placeholder="Peças"
          value={pecas}
          onChangeText={(text) => setPecas(text)}
          style={styles.input}
        />

        {!!errorValor && <Text style={styles.errorText}>{errorValor}</Text>}
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
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingLeft: 10,
  },
  datePickerInput: {
    flex: 1,
  },
  calendarIcon: {
    marginRight: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

export default NovoOrcamento;
