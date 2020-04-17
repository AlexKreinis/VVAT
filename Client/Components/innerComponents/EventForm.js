import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const EventForm = () => {
  return (
    <View style={styles.eventform}>
      <Text>Welcome to the event form!</Text>
      <Text>Event list....</Text>
      <Button title="Add your event" />
    </View>
  );
};

export default EventForm;

const styles = StyleSheet.create({
  eventform: {
    height: "85%",
    width: "100%",
  },
});
