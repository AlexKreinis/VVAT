import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import formStyle from "../styles/formStyle";

const CreateEventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [eventHours, setEventHours] = useState("");
  console.log(eventName);
  console.log(eventHours);
  return (
    <View style={styles.container}>
      <Text>Event name:</Text>
      <TextInput
        style={formStyle.input}
        placeholder="Event name"
        placeholderTextColor="#ffffff"
        onChangeText={(text) => setEventName(text)}
        value={eventName}
      />
      <Text>Event time:</Text>
      <TextInput
        style={formStyle.input}
        placeholder="Event name"
        placeholderTextColor="#ffffff"
        onChangeText={(text) => setEventHours(text)}
        value={eventHours}
      />
      <Button title="Create" onPress={() => {}} />
    </View>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
