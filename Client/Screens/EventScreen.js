import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { AirbnbRating } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { addRating, getRating, addAtendee } from "../store/actions/MapsActions";
import { getUser } from "../store/actions/Usersactions";
import Icon from "react-native-vector-icons/FontAwesome";

const EventScreen = (props) => {
  const dispatch = useDispatch();
  const [avgRating, setAvgRating] = useState(0);
  const eventRatings = useSelector((state) => state.maps.eventRatings);
  const userDetails = useSelector((state) => state.users);

  const { item } = props.navigation.state.params;

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
      dispatch(getRating(item._id));
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

  const AddedRating = (rating) => {
    console.log(rating);
  };
  const ratingCompleted = async (rating) => {
    try {
      await dispatch(addRating(rating, item._id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.name} event details</Text>
      </View>
      <View style={{ padding: 20 }}>
        <Text>Hi {userDetails.name} What would you like to do?</Text>
      </View>
      <View>
        <Text>Rate the event: </Text>
        <AirbnbRating
          size={30}
          showRating={false}
          onFinishRating={AddedRating}
        />
      </View>

      <View style={styles.center}>
        <Button
          title="   Register to this event"
          icon={<Icon name="location-arrow" size={25} color="white" />}
          onPress={RegForEventHandler}
          raised={true}
          buttonStyle={{
            width: 200,
          }}
        />
        <Button
          title="  go back"
          icon={<Icon name="arrow-left" size={20} color="white" />}
          onPress={() => props.navigation.navigate("Events")}
          raised={true}
          buttonStyle={{
            width: 200,
          }}
        />
        <Button
          title="  List of Attendees"
          icon={<Icon name="list" size={25} color="white" />}
          onPress={() =>
            props.navigation.navigate("Attendees", {
              eventId: item._id,
            })
          }
          raised={true}
          buttonStyle={{
            width: 200,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  eventDetails: {
    flex: 1,
  },
  center: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontFamily: "dancing-script",
    fontSize: 25,
    color: "black",
  },
});
export default EventScreen;
