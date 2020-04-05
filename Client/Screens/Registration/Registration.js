import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RegistrationForm from "../../Components/Registration/RegistrationForm";

const Registration = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>REGISTRATION</Text>
      </View>

      <View>
        <RegistrationForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#706fd3",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 70,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 0 },
    textShadowRadius: 10,
  },
});

export default Registration;
