import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { EVENTS } from "../dummy-data/dummy-data";

const EventsScreen = () => {
  const renderEventItem = (eventData) => {
    return (
      //to make event clickable wrap with TouchableOpacity
      <View style={styles.listItem}>
        <Text>{eventData.item.id}</Text>
        <Text>{eventData.item.time}</Text>
        <Text>{eventData.item.type}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>UPCOMING EVENTS</Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={EVENTS}
          renderItem={renderEventItem}
          keyExtractor={(item, index) => item.id}
        ></FlatList>
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
    backgroundColor: "#1e90ff",
  },
  title: {
    fontFamily: "dancing-script",
    fontSize: 35,
    color: "white",
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

export default EventsScreen;
