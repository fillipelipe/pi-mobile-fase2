import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import VoltarOrcamentos from '../components/VoltarOrcamentos';
import { useClientes } from '../context/ClientesContext';
import { useOrcamentos } from '../context/OrcamentosContext';
import { Picker } from '@react-native-picker/picker';

const NovoOrcamento = () => {
  const { clientes } = useClientes();
  const { orcamentos, adicionarNovoOrcamento } = useOrcamentos();

  // Encontre o maior número de orçamento atualmente existente
  useEffect(() => {
    if (orcamentos.length > 0) {
      const maxNumeroOrcamento = Math.max(...orcamentos.map((orcamento) => orcamento.numero));
      setNumeroOrcamento(maxNumeroOrcamento + 1);
    }
  }, [orcamentos]);

  const [numeroOrcamento, setNumeroOrcamento] = useState(1);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [data, setData] = useState('');
  const [servico, setServico] = useState('');
  const [pecas, setPecas] = useState('');
  const [valor, setValor] = useState('');
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');

  const criarNovoOrcamento = () => {
    const cliente = clientes.find((c) => c.id === clienteSelecionado);

    const novoOrcamento = {
      numero: numeroOrcamento,
      cliente: cliente ? cliente.nome : '',
      data,
      servico,
      pecas,
      valor,
      informacoesAdicionais,
    };

    adicionarNovoOrcamento(novoOrcamento);

    // Incrementar o número do orçamento automaticamente
    setNumeroOrcamento(numeroOrcamento + 1);
    setClienteSelecionado('');
    setData('');
    setServico('');
    setPecas('');
    setValor('');
    setInformacoesAdicionais('');
  };

  return (
    <View style={styles.container}>
      <VoltarOrcamentos />
      <View style={styles.containerOrc}>
        <Text style={styles.title}>Número do Orçamento: {numeroOrcamento}</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={clienteSelecionado}
            onValueChange={(itemValue) => setClienteSelecionado(itemValue)}
          >
            <Picker.Item label="Selecione um cliente" value="" />
            {clientes.map((cliente) => (
              <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Data"
            value={data}
            onChangeText={(text) => setData(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Serviço"
            value={servico}
            onChangeText={(text) => setServico(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Peças"
            value={pecas}
            onChangeText={(text) => setPecas(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Valor"
            value={valor}
            onChangeText={(text) => setValor(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Informações Adicionais"
            value={informacoesAdicionais}
            onChangeText={(text) => setInformacoesAdicionais(text)}
            style={styles.input}
          />
        </View>
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
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
});

export default NovoOrcamento;
