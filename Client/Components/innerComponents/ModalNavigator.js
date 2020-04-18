import React from "react";
import { StyleSheet, View } from "react-native";
import EventNavigator from "../../navigations/EventNavigator";
const ModalNavigator = () => {
  return (
    <View style={styles.eventform}>
      <EventNavigator />
    </View>
  );
};

export default ModalNavigator;

const styles = StyleSheet.create({
  eventform: {
    height: "85%",
    width: "100%",
  },
});
