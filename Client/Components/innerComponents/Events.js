import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { EVENTS } from "../../dummy-data/dummy-data";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigation } from "@react-navigation/native";

const Events = (props) => {
  const [details, setDetails] = useState({ name: "", lat: "", lon: "" });
  const selectedMapsData = useSelector((state) => state.maps.selectedMapData);

  useEffect(() => {
    setDetails(selectedMapsData);
  }, [selectedMapsData]);

  // const navigation = useNavigation();
  //console.log(props);
  const renderEventItem = (eventData) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate("Event")}>
        <View style={styles.listItem}>
          <Text>{eventData.item.id}</Text>
          <Text>{eventData.item.time}</Text>
          <Text>{eventData.item.type}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>UPCOMING EVENTS at {details.name}</Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={EVENTS}
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
    width: "85%",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 15,
    height: 40,
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 2.5,
    borderRadius: 15,
  },
});

export default Events;
