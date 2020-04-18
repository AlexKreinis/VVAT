import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import EventNavigator from "../../navigations/EventNavigator";
const EventForm = (props) => {
  // const dispatch = useDispatch();
  // console.log(props);

  return (
    <View style={styles.eventform}>
      <EventNavigator />
    </View>
  );
};

export default EventForm;

const styles = StyleSheet.create({
  eventform: {
    height: "85%",
    width: "100%",
  },
});
