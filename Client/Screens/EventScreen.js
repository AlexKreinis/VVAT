import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const EventScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to event screen!</Text>
      </View>
      <View style={styles.eventDetails}>
        <Text>EVENT DETAILS GOES HERE</Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="List of Attendees"
          onPress={() => props.navigation.navigate("Attendees")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  eventDetails: {
    flex: 4,
  },
  footer: {
    flex: 0.5,
    flexDirection: "row",
  },
  title: {
    fontFamily: "dancing-script",
    fontSize: 25,
    color: "black",
  },
});
export default EventScreen;
