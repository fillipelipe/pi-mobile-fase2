import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MenuRecibos = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Appbar.Header style={estilos.color}>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.toggleDrawer("Navegacao")}
        />
        <Appbar.Content title="Recibos" />
      </Appbar.Header>
    </View>
  );
};

const estilos = StyleSheet.create({
  color: {
    backgroundColor: "white",
  },
});
export default MenuRecibos;
