import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import formStyle from "../styles/formStyle";
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
    try {
      await dispatch(
        login({
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
      <View style={styles.logoContainer}>
        <Image source={require("../assets/b7.png")} style={styles.logo} />
        <Text style={styles.title}>An app made for beer sheva city!</Text>
      </View>
      <View>
        <View style={formStyle.container}>
          <TextInput
            style={formStyle.input}
            placeholder="Enter your username"
            placeholderTextColor="rgba(255,255,255,0.7)"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={formStyle.input}
            placeholder="Enter your password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            style={formStyle.buttonContainer}
            onPress={loginHandler}
          >
            <Text style={formStyle.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.createAccount}>
        <Text
        onPress={() => props.navigation.navigate("Registration")}
      >
        Create new account
      </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#706fd3",
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  logo: {
    width: 300,
    height: 65,
  },
  title: {
    color: "#fff",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 0 },
    textShadowRadius: 10,
  },
  createAccount: {
    alignItems: "center",
    padding: 2,
    marginHorizontal: 80,
    color:'#fff',
    borderColor: '#000',
    borderWidth: 1,
    flexGrow: 1,
    textAlign: "center",
    marginVertical: 20,
  },
});
