import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { findUserProfile } from "../store/actions/Usersactions";
import { sendFriendRequest } from "../store/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar, Button, ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";

const AddFriendScreen = (props) => {
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const role = useSelector((state) => state.users.role);
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.users.email);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const getProfileHandler = async () => {
    try {
      if (userEmail === email) {
        Alert.alert("Sorry", "You cannot add yourself", [{ text: "Okay" }]);
      } else {
        const userProfile = await dispatch(findUserProfile(email));
        setProfile(userProfile.other);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const addFriend = async () => {
    try {
      await dispatch(sendFriendRequest(profile._id));
      Alert.alert("Success", "Friend Reuqest has been sent", [
        { text: "Okay" },
      ]);
      props.navigation.navigate("profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <SearchBar
          placeholder="Type Here..."
          value={email}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          platform="default"
          lightTheme
          round
        />
        <Button title="Search" type="clear" onPress={getProfileHandler} />
      </View>
      <View style={{ marginTop: 25 }}>
        {profile && (
          <ListItem
            style={{ paddingBottom: 50 }}
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            linearGradientProps={{
              colors: ["#FF9800", "#F44336"],
              start: { x: 1, y: 0 },
              end: { x: 0.2, y: 0 },
            }}
            leftAvatar={{
              rounded: true,
              source: {
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              },
            }}
            title={profile.name}
            titleStyle={{ color: "white", fontWeight: "bold" }}
            subtitleStyle={{ color: "white" }}
            subtitle={profile.email}
            chevron={{ color: "white" }}
            onLongPress={addFriend}
          />
        )}
      </View>
      <View style={{ marginTop: 200 }}>
        <Button
          title="Go back"
          type="clear"
          onPress={() => props.navigation.navigate("profile")}
        ></Button>
      </View>
    </View>
  );
};

{
  /* <Button
        title="Go back"
        onPress={() => props.navigation.navigate("profile")}
      ></Button> */
}

{
  /* {profile && (
        <View>
          <Text>name: {profile.name}</Text>
          <Text>email: {profile.email}</Text>
          {profile.profile && (
            <>
              <Text>age: {profile.profile.age}</Text>
              <Text>facebook: {profile.profile.facebook}</Text>
              <Text>description: {profile.profile.description}</Text>
            </>
          )}
          <Button title="add friend" onPress={addFriend} />
        </View>
      )} */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e8ee",
    //alignItems: "center",
    //justifyContent: "space-around",
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
