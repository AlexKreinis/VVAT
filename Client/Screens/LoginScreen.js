import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LoginForm from "../Components/Login/LoginForm";

const Login = props => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/b7.png")} style={styles.logo} />
        <Text style={styles.title}>An app made for beer sheva city!</Text>
      </View>
      <View>
        <LoginForm />
        <Text
          style={styles.createAccount}
          onPress={() => props.navigation.navigate("Registration")}
        >
          Create Account
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#706fd3"
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  logo: {
    width: 300,
    height: 65
  },
  title: {
    color: "#fff",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 0 },
    textShadowRadius: 10
  },
  createAccount: {
    flexGrow: 1,
    textAlign: "center",
    marginVertical: 20
  }
});
