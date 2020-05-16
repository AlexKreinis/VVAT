import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AirbnbRating } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { addRating, getRating, addAtendee } from "../store/actions/MapsActions";
import { getUser } from "../store/actions/Usersactions";
const EventScreen = (props) => {
  const dispatch = useDispatch();
  const [avgRating, setAvgRating] = useState(0);
  const eventRatings = useSelector((state) => state.maps.eventRatings);
  const userDetails = useSelector((state) => state.users);
  const ratingCompleted = async (rating) => {
    try {
      await dispatch(addRating(rating, props.navigation.state.params.item._id));
    } catch (err) {
      console.log(err);
    }
  };

  const RegForEventHandler = () => {
    try {
      dispatch(
        addAtendee(
          userDetails.name,
          userDetails.email,
          props.navigation.state.params.item._id
        )
      );
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
      dispatch(getRating(props.navigation.state.params.item._id));
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      dispatch(getUser());
    } catch (err) {
      console.log(err);
    }
  }, [userDetails]);

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
        <Text>event name: {props.navigation.state.params.item.name}</Text>
        <Text>start time: {props.navigation.state.params.item.start}</Text>
        <Text>end time: {props.navigation.state.params.item.finish}</Text>
      </View>

      <Text>event avg rating: {avgRating}</Text>

      <View style={styles.footer}>
        <Button title="REGISTER FOR EVENT" onPress={RegForEventHandler} />
      </View>

      <View style={styles.footer}>
        <Button
          title="List of Attendees"
          onPress={() =>
            props.navigation.navigate("Attendees", {
              eventId: props.navigation.state.params.item._id,
            })
          }
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
