import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EventScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>welcome to event screen!</Text>
      <Text>event attendees: </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default EventScreen;
