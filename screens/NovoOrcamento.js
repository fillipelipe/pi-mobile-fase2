import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import VoltarOrcamentos from '../components/VoltarOrcamentos';


const NovoOrcamento = () => {
  const [numeroOrcamento, setNumeroOrcamento] = useState(1);
  const [cliente, setCliente] = useState('');
  const [data, setData] = useState('');
  const [servico, setServico] = useState('');
  const [pecas, setPecas] = useState('');
  const [valor, setValor] = useState('');
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');

  const criarNovoOrcamento = () => {
    const novoOrcamento = {
      numero: numeroOrcamento,
      cliente,
      data,
      servico,
      pecas,
      valor,
      informacoesAdicionais,
    };

    // Aqui você pode adicionar a lógica para salvar o novo orçamento onde preferir.

    // Atualize o número do orçamento para o próximo
    setNumeroOrcamento(numeroOrcamento + 1);

    // Limpe os campos após a criação do orçamento
    setCliente('');
    setData('');
    setServico('');
    setPecas('');
    setValor('');
    setInformacoesAdicionais('');

    // Exemplo: salvar o orçamento em um estado ou exibir um alerta de sucesso
  };

  return (
    <View style={styles.container}>
      <VoltarOrcamentos />
      <View style={styles.containerOrc}>
      <Text style={styles.title}>Número do Orçamento: {numeroOrcamento}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Cliente"
          value={cliente}
          onChangeText={(text) => setCliente(text)}
          style={styles.input}
        />
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
    borderRadius: 10, // Bordas arredondadas
    paddingLeft: 10, // Espaço interno à esquerda para o texto não ficar muito próximo da borda
  },
});

export default NovoOrcamento;