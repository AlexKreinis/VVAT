import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { USERS } from "../../dummy-data/dummy-data";
import { useSelector, useDispatch } from "react-redux";
import { getAtendees } from "../../store/actions/MapsActions";
const Attendees = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getAtendees(props.navigation.state.params.eventId));
    } catch (err) {
      console.log(err);
    }
  }, [AttendeesList]);

  const AttendeesList = useSelector((state) => state.maps.atten);

  const renderUserItem = (itemData) => {
    return (
      <View style={styles.listItem}>
        <Text style={{ fontWeight: "bold" }}>{itemData.item.id}</Text>
        <Text>{itemData.item.name}</Text>
        <Text>{itemData.item.email}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendees</Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={AttendeesList}
          renderItem={renderUserItem}
          keyExtractor={(item, index) => "key" + index}
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
    width: "100%",
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
export default Attendees;
