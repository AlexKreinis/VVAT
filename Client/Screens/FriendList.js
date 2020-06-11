import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Text, Button, ListItem } from "react-native-elements";
import { getProfile } from "../store/actions/Usersactions";

const FriendList = (props) => {
  const dispatch = useDispatch();
  const FriendList = useSelector((state) => state.profiles.friendList);
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    (async function () {
      try {
        await dispatch(getProfile());
        setFriends([...FriendList]);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        isLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const showContent = () => {
    if (isLoading) {
      return (
        <View style={{ height: "85%", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (friends.length === 0) {
      return (
        <View
          style={{
            height: "85%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>You have no friends</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{ height: "75%", marginTop: "15%", justifyContent: "center" }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text h2>friends list</Text>
          </View>

          <FlatList
            data={friends}
            renderItem={renderingRequests}
            keyExtractor={(item) => "key" + item._id}
          />
        </View>
      );
    }
  };

  const renderingRequests = (request) => {
    return (
      <ListItem
        title={request.item.name}
        subtitle={"You are friends in the app"}
        leftAvatar={{ source: require("../assets/pro2.png") }}
        bottomDivider
      />
    );
  };

  return (
    <View container>
      {showContent()}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          icon={<Icon name="star" size={15} color="white" />}
          title="go back"
          onPress={() => {
            props.navigation.navigate("profile");
          }}
        />
      </View>
    </View>
  );
};

export default FriendList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
