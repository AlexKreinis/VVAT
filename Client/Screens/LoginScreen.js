import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import formStyle from "../styles/formStyle";
import { LinearGradient } from "expo-linear-gradient";

//to connect to redux
import { login } from "../store/actions/Usersactions";
import { useDispatch } from "react-redux";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const dispatch = useDispatch();
  const loginHandler = async () => {
    Keyboard.dismiss;
    setError(null);
    try {
      await dispatch(
        login({
          email,
          password,
        })
      );
      props.navigation.navigate("tab");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <LinearGradient colors={["#d2b4de", "#4a235a"]} style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logo}>
          <Image source={require("../assets/vvat3.png")} />
          <Text style={{ color: "#710061" }}>Play like a Champion Today!</Text>
        </View>
        <View style={formStyle.form}>
          <TextInput
            style={formStyle.input}
            placeholder="User name"
            placeholderTextColor="#ffffff"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={formStyle.input}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity onPress={loginHandler}>
            <LinearGradient
              colors={["#6441A5", "#2a0845"]}
              style={formStyle.buttonContainer}
            >
              <Text style={formStyle.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={formStyle.navigateButton}
          onPress={() => props.navigation.navigate("Registration")}
        >
          <Text style={formStyle.navigateText}>Create new account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
    marginBottom: 65,
  },
});

export default Login;
