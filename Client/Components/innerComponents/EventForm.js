import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { useSelector, useDispatch } from "react-redux";

const EventForm = () => {
  // const dispatch = useDispatch();
  const [details, setDetails] = useState({ name: "", lat: "", lon: "" });
  const selectedMapsData = useSelector((state) => state.maps.selectedMapData);

  useEffect(() => {
    setDetails(selectedMapsData);
  }, [selectedMapsData]);

  return (
    <View style={styles.eventform}>
      <Text>Welcome to the event form!</Text>
      <Text>{details.name}</Text>
      <Text>Event list....</Text>
      <Button title="Add your event" />
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
