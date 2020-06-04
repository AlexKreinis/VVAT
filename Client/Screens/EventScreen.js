import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import { Button, Card } from "react-native-elements";
import { AirbnbRating } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  addAtendee,
  getAtendees,
  getRating,
} from "../store/actions/MapsActions";
import { getUser } from "../store/actions/Usersactions";
import Icon from "react-native-vector-icons/FontAwesome";

const EventScreen = (props) => {
  const dispatch = useDispatch();
  // const [avgRating, setAvgRating] = useState(0);
  const selectedAtendees = useSelector((state) => state.maps.selectedAtendees);
  const userDetails = useSelector((state) => state.users);
  const [atendees, setAtendees] = useState([]);
  const { selectedEvent } = props.navigation.state.params;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(3);
  const [ratingLoading, setRatingLoading] = useState(true);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
    setIsLoading(false);
  }, [error]);

  useEffect(() => {
    try {
      setIsLoading(true);
      setAtendees([...selectedAtendees]);
      setIsLoading(false);
    } catch (error) {
      setError(err.message);
    }
  }, [selectedAtendees]);

  const setInitialRating = async () => {
    try {
      const backendRating = await dispatch(
        getRating(props.navigation.state.params.selectedEvent._id)
      );
      setRating(backendRating.rating);
      setRatingLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    try {
      dispatch(getAtendees(props.navigation.state.params.selectedEvent._id));
      setInitialRating();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, []);

  const RegForEventHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        addAtendee(props.navigation.state.params.selectedEvent._id)
      );
      setAtendees([...atendees, userDetails.id]);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    try {
      dispatch(getUser());
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, [userDetails]);

  const submitRating = async () => {
    try {
      setIsLoading(true);
      const answer = await dispatch(addRating(rating, selectedEvent._id));
      Alert.alert("Success!", answer.msg, [{ text: "Okay" }]);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const AddedRating = (rating) => {
    setRating(rating);
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
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Rate the event: </Text>
          <Card>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              {ratingLoading ? (
                <ActivityIndicator />
              ) : (
                <AirbnbRating
                  size={30}
                  count={5}
                  reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
                  defaultRating={rating}
                  size={20}
                  showRating={true}
                  onFinishRating={AddedRating}
                />
              )}

              <Button title="Submit" type="outline" onPress={submitRating} />
            </View>
          </Card>
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
