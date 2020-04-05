import {View,TextInput,Text, StyleSheet, TouchableOpacity} from 'react-native';
import formStyle from './formStyle';

import React from 'react';

const LoginForm = () => {
    return (
        <View style={formStyle.container}>
            <TextInput
                style={formStyle.input}
                placeholder='Enter your user name'
                placeholderTextColor='rgba(255,255,255,0.7)'
                //onChangeText={}
                //value={}
            />
            <TextInput
                style={formStyle.input}
                placeholder='Enter your user name'
                placeholderTextColor='rgba(255,255,255,0.7)'
                secureTextEntry={true}
                //onChangeText={}
                //value={}
            />
            <TouchableOpacity style={formStyle.buttonContainer}>
                <Text style={formStyle.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginForm
