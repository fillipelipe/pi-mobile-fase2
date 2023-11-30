import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

import { AuthContext } from "../context/AuthContext";

const Register = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { error, register } = useContext(AuthContext);

  const handleRegister = () => {
    if (nome.trim() === "" || email.trim() === "" || senha.trim() === "") {
    }

    register(nome, email, senha);

    navigation.navigate("Login");
  };

  const handleBackToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Text style={{ fontSize: 24, textAlign: "center" }}>Registrar</Text>
        <HelperText type="error" visible={true}>
          {error}
        </HelperText>
        <TextInput
          label="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
        <Button mode="contained" onPress={handleRegister}>
          Registrar
        </Button>
        <Button onPress={handleBackToLogin}>Voltar</Button>
      </ScrollView>
    </View>
  );
};

export default Register;
