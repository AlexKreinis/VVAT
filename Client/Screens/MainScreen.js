import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MainScreen = (props) => {
  return (
    <View style={styles.main}>
      <Text>Main view</Text>
      <View>
        <Text onPress={() => props.navigation.navigate("Login")}>
          Go to LOGIN
        </Text>
      </View>
      <View>
        <Text onPress={() => props.navigation.navigate("Registration")}>
          Go to REGISTRATION
        </Text>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
