import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFriendRequests } from "../../store/actions/profileActions";

const AcceptFriendList = () => {
  const [friendReq, setFriendReq] = useState([]);
  useEffect(() => {
    (async function () {
      const friendRequests = await getFriendRequests();
      console.log(friendReq);
      setFriendReq(friendRequests);
    })();
  }, []);
  return (
    <View>
      <Text>Accept friend list</Text>
    </View>
  );
};

export default AcceptFriendList;

const styles = StyleSheet.create({});
