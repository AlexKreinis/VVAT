import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const EventsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>events screen</Text>
      <Button
        title="back to map"
        onPress={() => props.navigation.navigate("Main")}
      ></Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
export default EventsScreen;
