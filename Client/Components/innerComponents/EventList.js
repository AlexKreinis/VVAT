import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../store/actions/MapsActions";

const EventList = (props) => {
  const [details, setDetails] = useState({ name: "", lat: "", lon: "" });
  const [events, setEvents] = useState([]);
  const selectedMapsData = useSelector((state) => state.maps.selectedMapData);
  const selectedEvents = useSelector((state) => state.maps.events);
  const dispatch = useDispatch();

  useEffect(() => {
    setDetails(selectedMapsData);
  }, [selectedEvents]);

  useEffect(() => {
    setEvents(selectedEvents);
  }, [selectedEvents]);

  const handleGetEvents = async () => {
    try {
      await dispatch(getEvents(details.lat, details.lon));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (details.lat && details.lon) {
      handleGetEvents();
    }
  }, [details]);

  const renderEventItem = (itemData) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("EventDetails")}
      >
        <View style={styles.listItem}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>
            {" "}
            {itemData.item.name}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>At</Text>{" "}
            {new Date(itemData.item.start).toDateString()}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>From </Text>{" "}
            {new Date(itemData.item.start).toLocaleTimeString().slice(0, -3)}
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            <Text style={{ fontWeight: "bold" }}>To</Text>{" "}
            {new Date(itemData.item.start).toLocaleTimeString().slice(0, -3)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const List = () => {
    if (events.length > 0) {
      return (
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={(item, index) => item._id}
        />
      );
    } else {
      return (
        <View style={{ height: "90%" }}>
          <Text style={{ fontSize: 25, textAlign: "center" }}>
            There are no upcoming events in this location
          </Text>
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{details.name}</Text>
      </View>
      <View style={{ marginBottom: 14 }}>
        <Text style={{ fontSize: 18, color: "darkgrey", fontWeight: "bold" }}>
          Upcoming Events
        </Text>
      </View>
      <View style={styles.list}>{List()}</View>
      <View>
        <TouchableOpacity
          style={{
            margin: "auto",
            backgroundColor: "lightblue",
            padding: 10,
            borderRadius: 10,
            marginTop: 30,
          }}
          onPress={() => props.navigation.navigate("CreateEvent")}
        >
          <Text style={{ fontSize: 18 }}>Add your event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
  title: {
    fontFamily: "dancing-script",
    fontSize: 25,
    color: "black",
  },
  header: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    flex: 5,
    width: "100%",
  },
  listItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 10,
  },
});

export default EventList;
