//import liraries
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
<<<<<<< HEAD
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
=======
  KeyboardAvoidingView
>>>>>>> c6abd1af0a1355a0388de295a5fdf9f51e69dcfb
} from "react-native";
import formStyle from "../styles/formStyle";
import {LinearGradient} from 'expo-linear-gradient';

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
<<<<<<< HEAD
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/vvat.png")} style={styles.logo} />
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
=======
  return(
    <LinearGradient colors={['#FAFFD1', '#A1FFCE', '#cb71ff']} style={styles.gradient}>  
    <KeyboardAvoidingView behavior='padding' style={styles.container} >
      <View style={styles.logo}>
        <Image source={require("../assets/vvat3.png")} />
        <Text style={{color:"#710061"}}>Play like a Champion Today!</Text>
      </View>
      <View style={formStyle.container}>
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
          <TouchableOpacity
            
            onPress={loginHandler}
          >
            <LinearGradient colors={['#6441A5', '#2a0845']} style={formStyle.buttonContainer}>
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
>>>>>>> c6abd1af0a1355a0388de295a5fdf9f51e69dcfb

  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingVertical: 45,
  },
  gradient: {
    flex: 1,
  }
});

export default Login;