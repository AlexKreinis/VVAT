import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

const AddFriendScreen = (props) => {
  const [email, setEmail] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text>Search for user</Text>
        <TextInput
          placeholder="Email"
          selectionColor="blue"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <Button title="Search" />
      </View>

      <Button
        title="Go back"
        onPress={() => props.navigation.navigate("profile")}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    height: 30,
    width: 170,
    backgroundColor: "#ffffff",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 10,
  },
  inputBox: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddFriendScreen;
