import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const RegistrationForm = (props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput placeholder="Full Name" style={styles.input} />
      <TextInput placeholder="E-mail" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "80%",
    margin: 10,
  },
  inputContainer: {
    width: "90%",
    alignItems: "center",
  },
});

export default RegistrationForm;
