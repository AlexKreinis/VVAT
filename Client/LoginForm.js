import {View,TextInput,Text, StyleSheet, TouchableOpacity} from 'react-native';
import formStyle from './formStyle';

import React from 'react';


const LoginForm = () => {
    return (
        <View style={formStyle.container}>
            <TextInput
                style={formStyle.input}
                placeholder=''
                placeholderTextColor=''
                //onChangeText={}
                //value={}
            />
            <TextInput
                style={formStyle.input}
                placeholder=''
                placeholderTextColor=''
                //onChangeText={}
                //value={}
            />
            <TextInput
                style={formStyle.input}
                placeholder=''
                placeholderTextColor=''
                //onChangeText={}
                //value={}
            />
            <TouchableOpacity style={formStyle.buttonContainer}>
                <Text style="">Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginForm
