import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const [details, setDetails] = useState({ userId: "", name: "" });
  const userDetails = useSelector((state) => state.users);
  //console.log(userDetails);
  useEffect(() => {
    setDetails(userDetails);
  }, [userDetails]);
  //console.log(details);
  // const u = User.findOne(userDetails.token);
  return (
    <View style={styles.main}>
      <Text>name:{details.name}</Text>
      <Text>mail:{details.userId}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 5,
  },
});

export default ProfileScreen;
