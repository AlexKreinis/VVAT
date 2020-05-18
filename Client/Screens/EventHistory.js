import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import { Icon, Card, Text, Button } from "react-native-elements";
import { getEventHistory } from "../store/actions/profileActions";

const EventHistory = (props) => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const backendEvents = await dispatch(getEventHistory());
        setEvents([...backendEvents]);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const showContent = () => {
    if (isLoading) {
      return (
        <View style={{ height: "100%", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (events.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>You have no events</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{ height: "75%", marginTop: "15%", justifyContent: "center" }}
        >
          <View>
            <Text h2>Event history</Text>
          </View>

          <FlatList
            data={events}
            renderItem={renderingRequests}
            keyExtractor={(item) => item._id}
          />
        </View>
      );
    }
  };

  const renderingRequests = (request) => {
    return (
      <Card containerStyle={{ backgroundColor: "rgba(220, 244, 244, 0.99)" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text h4>{request.item.name}</Text>
        </View>
      </Card>
    );
  };

  return (
    <View container>
      {showContent()}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          icon={<Icon name="star" size={15} color="white" />}
          title="go back"
          onPress={() => {
            props.navigation.navigate("profile");
          }}
        />
      </View>
    </View>
  );
};

export default EventHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
