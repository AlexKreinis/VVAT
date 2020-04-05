import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import formStyle from "../../styles/formStyle";

const RegistrationForm = (props) => {

  // const [username,setUsername] = useState('');
  // const [password,setPassword] = useState('');

  return (
    <View style={formStyle.container}>
      <TextInput
        placeholder="Full Name"
        style={formStyle.input}
        placeholderTextColor="rgba(255,255,255,0.7)"
      />
      <TextInput
        placeholder="E-mail"
        keyboardType="email-address"
        style={formStyle.input}
        placeholderTextColor="rgba(255,255,255,0.7)"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={formStyle.input}
        placeholderTextColor="rgba(255,255,255,0.7)"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={formStyle.input}
        placeholderTextColor="rgba(255,255,255,0.7)"
      />
      <TouchableOpacity style={formStyle.buttonContainer}>
        <Text style={formStyle.buttonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationForm;
