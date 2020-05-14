import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { findUserProfile } from "../store/actions/Usersactions";
import { sendFriendRequest } from "../store/actions/profileActions";
import { useDispatch } from "react-redux";

const AddFriendScreen = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);

  const getProfileHandler = async () => {
    try {
      const userProfile = await dispatch(findUserProfile(email));
      setProfile(userProfile.other);
    } catch (err) {
      console.log(err);
    }
  };
  const addFriend = async () => {
    try {
      console.log("clicked");
      await dispatch(sendFriendRequest(profile._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text>Search for user</Text>
        <TextInput
          placeholder="Email"
          selectionColor="blue"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <Button title="Search" onPress={getProfileHandler} />
      </View>

      {profile && (
        <View>
          <Text>name: {profile.name}</Text>
          <Text>email: {profile.email}</Text>
          <Text>age: {profile.profile.age}</Text>
          <Text>facebook: {profile.profile.facebook}</Text>
          <Text>description: {profile.profile.description}</Text>
          <Button title="add friend" onPress={addFriend} />
        </View>
      )}
      <Button
        title="Go back"
        onPress={() => props.navigation.navigate("profile")}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    height: 30,
    width: 170,
    backgroundColor: "#ffffff",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 10,
  },
  inputBox: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddFriendScreen;
