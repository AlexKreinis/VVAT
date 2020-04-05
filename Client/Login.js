import React from 'react'
import {View,Text, StyleSheet,Image} from 'react-native';

const Login = () => {
    return(
        <View style={styles.container}>

          <View style={styles.logoContainer}>
            <Image 
              source={require('./assets/b7.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>An app made for beer sheva city.</Text>
          </View>
          <View>
          </View>
        </View>
      );
}

export default Login

const styles = StyleSheet.create({
    container:{

    },

    logoContainer:{

    },
    logo: {

    },
    title: {

    }
});