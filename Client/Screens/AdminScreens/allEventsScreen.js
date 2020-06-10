import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import { getallevents, removeevent } from "../../store/actions/adminActions";

const allEventsScreen = (props) => {
  const keyExtractor = (item, index) => index.toString();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getAllEvents = async () => {
    try {
      setIsLoading(true);
      const tempEvents = await dispatch(getallevents());
      setEvents([...tempEvents]);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };
  const removeEventHandler = async (eventToDelete) => {
    try {
      await dispatch(removeevent(eventToDelete._id));
      const filteredEvents = events.filter(
        (event) => event._id != eventToDelete._id
      );
      setEvents(filteredEvents);
      Alert.alert(`Event ${eventToDelete.name} deleted successfully`);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
    setIsLoading(false);
  }, [error]);

  useEffect(() => {
    getAllEvents();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        title={item["name"]}
        subtitle={item["start"]}
        bottomDivider
        chevron
        onLongPress={() => removeEventHandler(item)}
        onPress={() => {
          props.navigation.navigate({
            routeName: "adminEditEvent",
            params: {
              event: item,
            },
          });
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            //contentContainerStyle={{ paddingTop: 50 }}
            keyExtractor={keyExtractor}
            data={events}
            renderItem={renderItem}
          />
        </>
      )}
    </View>
  );
};

allEventsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Manage Events",
  };
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default allEventsScreen;
