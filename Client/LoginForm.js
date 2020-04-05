import {View,TextInput,Text, StyleSheet, TouchableOpacity} from 'react-native';
import formStyle from './formStyle';

import React from 'react';


const LoginForm = () => {
    return (
        <View style={styles.container}>
            <TextInput
                style={formStyle.input}
                placeholder=''
                placeholderTextColor=''
                //onChangeText={}
                //value={}
            />
            <TextInput
                style={styles.input}
                placeholder=''
                placeholderTextColor=''
                //onChangeText={}
                //value={}
            />
            <TextInput
                style={styles.input}
                placeholder=''
                placeholderTextColor=''
                //onChangeText={}
                //value={}
            />
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style="">Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 60,
        paddingBottom: 40,
    },
    input:{
        height: 40,
        marginBottom: 10,
        color: '#1F1F5E',
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#B9B9F3',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
    },
    buttonContainer:{
        backgroundColor: "#0B0B21",
        paddingVertical: 10,
        marginHorizontal: 80,
        marginVertical: 20,
        borderRadius: 20
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500'
    }
});

export default LoginForm
