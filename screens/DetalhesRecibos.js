import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Share } from "react-native";
import VoltarDetalhesRecibos from "../components/VoltarDetalhesRecibos";

const DetalhesRecibos = ({ route }) => {
  const { cliente, valor, servico, nomeTecnico } = route.params;

  const shareReceipt = async () => {
    try {
      const receiptText = `Recebemos do ${cliente} o valor de ${valor} referente ao serviço de ${servico} feito pelo técnico ${nomeTecnico}.`;

      const result = await Share.share({
        message: receiptText,
      });

      if (result.action === Share.sharedAction) {
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <VoltarDetalhesRecibos />
      <View style={styles.recibosContainer}>
        <Text>Detalhes do Recibo:</Text>
        <Text>Cliente: {cliente}</Text>
        <Text>Valor: {valor}</Text>
        <Text>Serviço: {servico}</Text>
        <Text>Técnico: {nomeTecnico}</Text>

        <TouchableOpacity style={styles.shareButton} onPress={shareReceipt}>
          <Text style={styles.shareButtonText}>Compartilhar Recibo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recibosContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  shareButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  shareButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default DetalhesRecibos;
