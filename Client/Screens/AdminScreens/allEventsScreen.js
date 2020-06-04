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

const allEventsScreen = () => {
  const keyExtractor = (item, index) => index.toString();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

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
  const removeEventHandler = async () => {
    try {
      await dispatch(removeevent());
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
        leftAvatar={{ source: require("../../assets/pro2.png") }}
        bottomDivider
        chevron
        onPress={removeEventHandler}
        //onLongPress={}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View>
            <View style={{ alignItems: "center", paddingTop: 30 }}>
              <Text>EVENT MANAGMENT SCREEN</Text>
            </View>
            <FlatList
              contentContainerStyle={{ paddingTop: 50 }}
              keyExtractor={keyExtractor}
              data={events}
              renderItem={renderItem}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default allEventsScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
