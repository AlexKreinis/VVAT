import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import { Button } from "react-native-elements";
import { AirbnbRating } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getRating,
  addAtendee,
  getAtendees,
} from "../store/actions/MapsActions";
import { getUser } from "../store/actions/Usersactions";
import Icon from "react-native-vector-icons/FontAwesome";

const EventScreen = (props) => {
  const dispatch = useDispatch();
  // const [avgRating, setAvgRating] = useState(0);
  const selectedAtendees = useSelector((state) => state.maps.selectedAtendees);
  const eventRatings = useSelector((state) => state.maps.eventRatings);
  const userDetails = useSelector((state) => state.users);
  const [atendees, setAtendees] = useState([]);
  const { selectedEvent } = props.navigation.state.params;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    setAtendees([...selectedAtendees]);
    setIsLoading(false);
  }, [selectedAtendees]);

  useEffect(() => {
    try {
      dispatch(getAtendees(props.navigation.state.params.selectedEvent._id));
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, []);

  const RegForEventHandler = async () => {
    try {
      console.log("Regsitering\n");
      setIsLoading(true);
      await dispatch(
        addAtendee(props.navigation.state.params.selectedEvent._id)
      );
      console.log(userDetails.id);
      setAtendees([...atendees, userDetails.id]);
    } catch (err) {
      setIsLoading(false);
      console.log("catching");
      setError(err.message);
    }
  };

  // useEffect(() => {
  //   setAvgRating(0);
  //   var total = 0;
  //   for (var i = 0; i < eventRatings.length; i++) {
  //     total += parseInt(eventRatings[i]);
  //   }
  //   if (eventRatings.length != 0) setAvgRating(total / eventRatings.length);
  // }, [eventRatings]);

  // useEffect(() => {
  //   try {
  //     dispatch(getRating(selectedEvent._id));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  useEffect(() => {
    try {
      dispatch(getUser());
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, [userDetails]);

  const AddedRating = (rating) => {
    console.log(rating);
  };

  const isUserRegistered = () => {
    for (let i = 0; i < atendees.length; i++) {
      if (atendees[i]._id === userDetails.id) {
        return true;
      }
    }
    return false;
  };
  const isUserCreatedTheEvent = () => {
    if (userDetails.id === selectedEvent.owner) return true;
    return false;
  };

  const ratingScreen = () => {
    if (isUserCreatedTheEvent()) {
      return null;
    }
    if (isUserRegistered()) {
      return (
        <View>
          <Text>Rate the event: </Text>
          <AirbnbRating
            size={30}
            showRating={false}
            onFinishRating={AddedRating}
          />
        </View>
      );
    } else {
      return (
        <Button
          title="   Register to this event"
          icon={<Icon name="location-arrow" size={25} color="white" />}
          onPress={RegForEventHandler}
          raised={true}
          buttonStyle={{
            width: 200,
          }}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>{selectedEvent.name} event details</Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ textAlign: "center" }}>
              Hi {userDetails.name}
              {"\n"}
              <Text>
                {isUserCreatedTheEvent() && "Welcome to your event\n"}
                What would you like to do?
              </Text>
            </Text>
          </View>
          <View style={styles.center}>
            {ratingScreen()}
            <Button
              title="  List of Attendees"
              icon={<Icon name="list" size={25} color="white" />}
              onPress={() =>
                props.navigation.navigate("Attendees", {
                  eventId: selectedEvent._id,
                })
              }
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
          </View>
        </>
      )}
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
