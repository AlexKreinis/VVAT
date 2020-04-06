import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MainScreen = () => {
  return (
    <View style={styles.main}>
      <Text>Main view</Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
