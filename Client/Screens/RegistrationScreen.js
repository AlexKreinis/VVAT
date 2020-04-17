import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import formStyle from "../styles/formStyle";
import { register } from "../store/actions/Usersactions";
import { useDispatch } from "react-redux";

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
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>REGISTRATION</Text>
      </View>
      <View>
        <View style={formStyle.container}>
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
          <TouchableOpacity
            style={formStyle.buttonContainer}
            onPress={registerHandler}
          >
            <Text style={formStyle.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={formStyle.navigateButton}
          onPress={() => props.navigation.navigate("Login")}
        >
          <Text style={formStyle.navigateText}>Already Registered ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1e90ff",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 35,
    color: "white",
    fontFamily: "dancing-script",
    textAlign: "center",
    marginBottom: 70,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 0 },
    textShadowRadius: 10,
  },
});

export default Registration;
