import React from "react";
import { View, StyleSheet } from "react-native";
import RecentBudgets from "../components/RecentBudgets";
import Menu from "../components/Menu";

const Home = () => {
  return (
    <View style={styles.container}>
      <Menu />
      <View>
        <RecentBudgets budgetList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
});

export default Home;
