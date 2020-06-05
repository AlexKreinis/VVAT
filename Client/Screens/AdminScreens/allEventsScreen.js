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
  const removeEventHandler = (name) => {
    console.log("ENTERED removeEventHandler, name:", name);
    dispatch(removeevent(name));
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
        onPress={() => removeEventHandler(item["name"])}
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
