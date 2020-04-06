import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import formStyle from "../../styles/formStyle";
import { register } from "../../store/actions/Usersactions";
import { useDispatch } from "react-redux";

const RegistrationForm = (props) => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [password2, SetPassword2] = useState("");

  const dispatch = useDispatch();
  const registerHandler = async () => {
    try {
      await dispatch(
        register({
          name,
          email,
          password,
        })
      );
      console.log("switching");
      props.navigation.navigate("Main");
    } catch (err) {}
  };

  return (
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
  );
};

export default RegistrationForm;
