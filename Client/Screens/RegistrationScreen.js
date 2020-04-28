import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import formStyle from "../styles/formStyle";
import { register } from "../store/actions/Usersactions";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const Registration = (props) => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [password2, SetPassword2] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const dispatch = useDispatch();
  const registerHandler = async () => {
    setError(null);
    if (password != password2) {
      setError("Password doesn't match!");
      return;
    }
    try {
      await dispatch(
        register({
          name,
          email,
          password,
        })
      );

      props.navigation.navigate("Main");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <LinearGradient colors={["#21618c", "#85c1e9"]} style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>REGISTRATION</Text>
        <View style={formStyle.form}>
          <TextInput
            placeholder="Full Name"
            style={formStyle.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            onChangeText={(text) => SetName(text)}
            value={name}
          />
          <TextInput
            placeholder="E-mail"
            keyboardType="email-address"
            style={formStyle.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            onChangeText={(text) => SetEmail(text)}
            value={email}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={formStyle.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            onChangeText={(text) => SetPassword(text)}
            value={password}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={formStyle.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            onChangeText={(text) => SetPassword2(text)}
            value={password2}
          />
          <TouchableOpacity onPress={registerHandler}>
            <LinearGradient
              colors={["#6441A5", "#2a0845"]}
              style={formStyle.buttonContainer}
            >
              <Text style={formStyle.buttonText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={formStyle.navigateText}>Already Registered ?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 70,
    textShadowRadius: 10,
  },
  navigateButton: {
    alignItems: "center",
    padding: 2,
    marginHorizontal: 80,
    marginVertical: 130,
  },
});

export default Registration;
