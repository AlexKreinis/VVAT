import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Events from "./Events";

const EventForm = () => {
  // const dispatch = useDispatch();
  const [details, setDetails] = useState({ name: "", lat: "", lon: "" });
  const selectedMapsData = useSelector((state) => state.maps.selectedMapData);

  useEffect(() => {
    setDetails(selectedMapsData);
  }, [selectedMapsData]);

  return (
    <View style={styles.eventform}>
      <Events />
      <Text>{details.name}</Text>
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
