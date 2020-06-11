import React, { useState, useEffect } from "react";
import { ListItem, Icon, Button } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../store/actions/MapsActions";

const EventList = (props) => {
  const [details, setDetails] = useState({ name: "", lat: "", lon: "" });
  const [events, setEvents] = useState(null);
  const selectedMapsData = useSelector((state) => state.maps.selectedMapData);
  const selectedEvents = useSelector((state) => state.maps.events);
  const [isLoading, setIsLoading] = useState(true);
  const reduxLoading = useSelector((state) => state.maps.events.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    setDetails(selectedMapsData);
  }, [selectedMapsData]);

  useEffect(() => {
    setEvents(selectedEvents);
    setIsLoading(false);
  }, [selectedEvents]);

  const handleGetEvents = async () => {
    try {
      setIsLoading(true);
      await dispatch(getEvents(details.lat, details.lon));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (details.lat && details.lon) {
      handleGetEvents();
    }
  }, [details]);

  const renderEventItem = (itemData) => {
    const calcAvg = (ratings) => {
      let allSum = ratings.reduce((sum, singleRate) => {
        return sum + singleRate.rating;
      }, 0);
      let answer = allSum / ratings.length;
      if (Number.isNaN(answer)) {
        return "No rating";
      } else {
        return answer.toString();
      }
    };

    return (
      <ListItem
        containerStyle={{ borderRadius: 10, marginBottom: 5 }}
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
          colors: ["#27ae60", "#27ae60"],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
        leftElement={
          <Icon name="ios-american-football" type="ionicon" color="white" />
        }
        title={itemData.item.name}
        titleStyle={{
          color: "white",
          fontWeight: "bold",
          fontSize: 25,
          marginBottom: 5,
        }}
        subtitleStyle={{ color: "white" }}
        subtitle={
          " " +
          new Date(itemData.item.start).toLocaleDateString() +
          " \n " +
          new Date(itemData.item.start).toLocaleTimeString() +
          "  -  " +
          new Date(itemData.item.finish).toLocaleTimeString() +
          "     " +
          "Rating:" +
          calcAvg(itemData.item.ratings)
        }
        chevron={{ color: "white", size: 30 }}
        onPress={() =>
          props.navigation.navigate("EventDetails", {
            selectedEvent: itemData.item,
          })
        }
      />
    );
  };

  const List = () => {
    if (events) {
      if (events.length > 0) {
        return (
          <FlatList
            data={events}
            renderItem={renderEventItem}
            keyExtractor={(item, index) => item._id}
          />
        );
      } else {
        {
          return (
            <View style={{ height: "90%" }}>
              <Text style={{ fontSize: 25, textAlign: "center" }}>
                There are no upcoming events in this location
              </Text>
            </View>
          );
        }
      }
    }
  };
  const eventScreen = () => {
    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{details.name}</Text>
          </View>
          <View style={{ marginBottom: 14 }}>
            <Text
              style={{ fontSize: 18, color: "darkgrey", fontWeight: "bold" }}
            >
              Upcoming Events
            </Text>
          </View>
          <View style={styles.list}>{List()}</View>
          <View style={{ marginTop: 10 }}>
            <Button
              icon={
                <Icon name="plus" size={15} color="white" type="font-awesome" />
              }
              title="  Create new event"
              linearGradientProps={{
                colors: ["#27ae60", "#27ae60"],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
              }}
              onPress={() => props.navigation.navigate("CreateEvent")}
            />
          </View>
        </View>
      );
    }
  };

  return eventScreen();
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
    flex: 2.1,
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
