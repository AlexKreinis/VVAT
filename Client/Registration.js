import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Registration = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoHeader}>REGISTRATION</Text>
      </View>

      <View>
        <Text>FORM</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  logoContainer: {},
  logoHeader: {},
});

export default Registration;
