import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Rating, AirbnbRating } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { addRating, getRating } from "../store/actions/MapsActions";

const EventScreen = (props) => {
  //  console.log();
  const dispatch = useDispatch();
  const [avgRating, setAvgRating] = useState(0);
  const eventRatings = useSelector((state) => state.maps.eventRatings);
  const ratingCompleted = async (rating) => {
    try {
      await dispatch(addRating(rating, props.navigation.state.params.itemId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setAvgRating(0);
    var total = 0;
    for (var i = 0; i < eventRatings.length; i++) {
      total += parseInt(eventRatings[i]);
    }
    if (eventRatings.length != 0) setAvgRating(total / eventRatings.length);
  }, [eventRatings]);

  useEffect(() => {
    try {
      dispatch(getRating(props.navigation.state.params.itemId));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to event screen!</Text>
      </View>
      <Text>Rate the event: </Text>
      <AirbnbRating
        size={30}
        showRating={false}
        onFinishRating={ratingCompleted}
      />

      <View style={styles.eventDetails}>
        <Text>EVENT DETAILS GOES HERE</Text>
      </View>

      <Text>event avg rating: {avgRating}</Text>

      <View style={styles.footer}>
        <Button
          title="List of Attendees"
          onPress={() => props.navigation.navigate("Attendees")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  eventDetails: {
    flex: 4,
  },
  footer: {
    flex: 0.5,
    flexDirection: "row",
  },
  title: {
    fontFamily: "dancing-script",
    fontSize: 25,
    color: "black",
  },
});
export default EventScreen;
