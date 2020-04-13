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
        <Image source={require("../assets/vvat.png")} style={styles.logo} />
        {/* <Text style={styles.title}>An app made for beer sheva city!</Text> */}
      </View>
      <View>
        <View style={formStyle.container}>
          <TextInput
            style={formStyle.input}
            placeholder="User name"
            placeholderTextColor="rgba(0,0,0,0.2)"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={formStyle.input}
            placeholder="Password"
            placeholderTextColor="rgba(0,0,0,0.2)"
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
        <TouchableOpacity
         style={formStyle.navigateButton}
         onPress={() => props.navigation.navigate("Registration")}
        >
          <Text style={formStyle.navigateText}>Create new account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  logo: {
    width: 270,
    height: 320,
  },
  // title: {
  //   color: "#fff",
  //   marginTop: 10,
  //   textShadowColor: "rgba(0, 0, 0, 0.75)",
  //   textShadowOffset: { width: -3, height: 0 },
  //   textShadowRadius: 10,
  // },

});
