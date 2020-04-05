import {View,TextInput,Text, StyleSheet, TouchableOpacity} from 'react-native';
import formStyle from '../../styles/formStyle';

import React from 'react';

const LoginForm = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    return (
        <View style={formStyle.container}>
            <TextInput
                style={formStyle.input}
                placeholder='Enter your username'
                placeholderTextColor='rgba(255,255,255,0.7)'
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <TextInput
                style={formStyle.input}
                placeholder='Enter your password'
                placeholderTextColor='rgba(255,255,255,0.7)'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={formStyle.buttonContainer}>
                <Text style={formStyle.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginForm
