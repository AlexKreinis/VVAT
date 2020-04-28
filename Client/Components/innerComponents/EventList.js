import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
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
  }, [selectedMapsData]);

  const handleGetEvents = async () => {
    try {
      await dispatch(getEvents(details.lat, details.lon));
      setEvents(selectedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("details", details);
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
          <Text style={{ fontWeight: "bold" }}>{itemData.item.time}</Text>
          <Text>{itemData.item.type}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{details.name}</Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={(item, index) => item.id}
        ></FlatList>

        <Button
          title="Add your event"
          onPress={() => props.navigation.navigate("CreateEvent")}
        />
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
    flex: 3,
    width: "95%",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
    height: 40,
  },
});

export default EventList;
