import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const AddFriendScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>ADD FRIEND SCREEN</Text>
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
    justifyContent: "center",
  },
});

export default AddFriendScreen;
