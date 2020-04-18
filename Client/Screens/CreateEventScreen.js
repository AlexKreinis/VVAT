import React from "react";
import { StyleSheet, View } from "react-native";
import Calender from "../Components/Calender";

const CreateEventScreen = () => {
  return (
    <View style={styles.container}>
      <Calender />
    </View>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
