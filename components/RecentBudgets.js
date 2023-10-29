import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecentBudgets = ({ budgetList }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Últimos Orçamentos</Text>
      <View style={styles.recentBudgets}>
        {/* Inclua aqui a lista dos últimos orçamentos */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  recentBudgets: {
    marginTop: 700,
  },
});

export default RecentBudgets;
