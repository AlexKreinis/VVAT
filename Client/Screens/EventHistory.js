import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Icon, ListItem, Text, Button } from "react-native-elements";
import { getEventHistory } from "../store/actions/profileActions";
import TouchableScale from "react-native-touchable-scale";

const EventHistory = (props) => {
  const dispatch = useDispatch();
  const eventHistory = useSelector((state) => state.profiles.events);
  const isLoading = useSelector((state) => state.profiles.isLoading);
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setEvents([...eventHistory]);
    setIsLocalLoading(false);
  }, [eventHistory]);

  useEffect(() => {
    (async function () {
      try {
        await dispatch(getEventHistory());
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
    if (isLocalLoading || isLoading) {
      return (
        <View style={{ height: "85%", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (events.length === 0) {
      return (
        <View
          style={{
            height: "85%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>You have no events</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{ height: "75%", marginTop: "15%", justifyContent: "center" }}
        >
          <View
            style={{
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text h2 style={{ color: "#1c2833" }}>
              Event history
            </Text>
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
      <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
          colors: ["#58d68d", "#3498db"],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
        title={request.item.name}
        titleStyle={{ color: "white", fontWeight: "bold" }}
        subtitleStyle={{ color: "white" }}
        subtitle="My event"
        bottomDivider
      />
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
