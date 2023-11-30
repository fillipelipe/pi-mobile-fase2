import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const Menu = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  return (
    <View>
      <Appbar.Header style={estilos.color}>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.toggleDrawer("Navegacao")}
        />
        <Appbar.Content title="Home" />
        <Appbar.Action icon="exit-to-app" onPress={handleLogout} />
      </Appbar.Header>
    </View>
  );
};

const estilos = StyleSheet.create({
  color: {
    backgroundColor: "white",
  },
});

export default Menu;
