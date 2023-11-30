import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

import { AuthContext } from "../context/AuthContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { error, login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (email.trim() === "" || senha.trim() === "") {
      return;
    }

    try {
      const loginSuccess = await login(email, senha);

      if (loginSuccess) {
        navigation.navigate("Home");
      } else {
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Text style={{ fontSize: 24, textAlign: "center" }}>Login</Text>
        <HelperText type="error" visible={true}>
          {error}
        </HelperText>
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
        <Button mode="contained" onPress={handleLogin}>
          Entrar
        </Button>
        <Button onPress={handleRegister}>Não tenho conta</Button>
      </ScrollView>
    </View>
  );
};

export default Login;
