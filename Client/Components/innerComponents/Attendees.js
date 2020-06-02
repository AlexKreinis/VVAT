import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getAtendees } from "../../store/actions/MapsActions";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ListItem } from "react-native-elements";

const Attendees = (props) => {
  const list = [
    {
      name: "Amy Farha",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "Vice President",
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
    },
    {
      name: "Amy Farha",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "Vice President",
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
    },
    {
      name: "Amy Farha",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "Vice President",
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
    },
    {
      name: "Amy Farha",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "Vice President",
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
    },
    {
      name: "Amy Farha",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "Vice President",
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
    },
  ];
  const [atendees, setAtendees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const AttendeesList = useSelector((state) => state.maps.selectedAtendees);

  useEffect(() => {
    try {
      dispatch(getAtendees(props.navigation.state.params.eventId));
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setAtendees([...AttendeesList]);
    setIsLoading(false);
  }, [AttendeesList]);

  const renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={{ source: require("../../assets/pro2.png") }}
      bottomDivider
    />
  );
  const showAtendeesScreen = () => {
    if (isLoading) {
      return (
        <View
          style={{
            height: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Attendees</Text>
          </View>
          <View style={styles.list}>
            {atendees.length > 0 ? (
              <FlatList
                keyExtractor={(item, index) => item._id}
                data={atendees}
                renderItem={renderItem}
              />
            ) : (
              <View>
                <Text>No one has signed to this event yet</Text>
              </View>
            )}
          </View>
          <Button
            title="  go back"
            icon={<Icon name="arrow-left" size={20} color="white" />}
            onPress={() => props.navigation.navigate("Events")}
            raised={true}
            buttonStyle={{
              width: 200,
            }}
          />
        </View>
      );
  };
  return showAtendeesScreen();
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
    width: "90%",
    marginBottom: 15,
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
