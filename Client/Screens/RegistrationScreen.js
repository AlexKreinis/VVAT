import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RegistrationForm from "../Components/Registration/RegistrationForm";
import { register } from "../store/actions/Usersactions";
import { useDispatch } from "react-redux";

const Registration = props => {
  const dispatch = useDispatch();
  const registerHandler = () => {
    console.log("test!\n");
    dispatch(register());
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>REGISTRATION</Text>
      </View>

      <Button title={"RegisterTest"} onPress={registerHandler} />

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
    justifyContent: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 70,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 0 },
    textShadowRadius: 10
  }
});

export default Registration;
