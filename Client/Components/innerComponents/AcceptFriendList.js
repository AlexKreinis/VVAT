import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  getFriendRequests,
  acceptFriendRequest,
  deleteFriendRequest,
} from "../../store/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Card, Text } from "react-native-elements";

const AcceptFriendList = () => {
  const friendRequest = useSelector((state) => state.profiles.friendRequest);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const [friendReq, setFriendReq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      Alert.alert("Success!", message, [{ text: "Okay" }]);
    }
  }, [message]);

  useEffect(() => {
    setFriendReq([...friendRequest]);
  }, [friendRequest]);

  useEffect(() => {
    (async function () {
      try {
        await dispatch(getFriendRequests());
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    })();
  }, []);

  const acceptReuqest = async (id) => {
    try {
      setIsLoading(true);
      const answer = await dispatch(acceptFriendRequest(id));
      setMessage(answer);
      setFriendReq(friendReq.filter((friend) => friend._id != id));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  const deleteRequest = async (id) => {
    try {
      setIsLoading(true);
      const answer = await dispatch(deleteFriendRequest(id));
      setMessage(answer);
      setFriendReq(friendReq.filter((friend) => friend._id != id));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const renderingRequests = (request) => {
    return (
      <Card containerStyle={{ backgroundColor: "rgba(220, 244, 244, 0.99)" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text h4>{request.item.name}</Text>
          <View>
            <Icon
              name="done"
              color="green"
              onPress={() => acceptReuqest(request.item._id)}
            />
            <Icon
              name="clear"
              color="red"
              onPress={() => deleteRequest(request.item._id)}
            />
          </View>
        </View>
      </Card>
    );
  };

  const showContent = () => {
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (friendReq.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>You have no friend Requests</Text>
        </View>
      );
    } else {
      return (
        <View style={{ width: 300, flex: 1 }}>
          <Text>Pending friend requests</Text>
          <FlatList
            data={friendReq}
            renderItem={renderingRequests}
            keyExtractor={(item) => item._id}
          />
        </View>
      );
    }
  };
  return showContent();
};

export default AcceptFriendList;

const styles = StyleSheet.create({});
