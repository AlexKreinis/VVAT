import React from "react";
import { StyleSheet, View } from "react-native";
import { EventNav } from "../../navigations/Navigator";
const ModalNavigator = () => {
  return (
    <View style={styles.eventform}>
      <EventNav />
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
