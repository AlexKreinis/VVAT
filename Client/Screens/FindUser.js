import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { findUserProfile } from "../store/actions/Usersactions";
import { sendFriendRequest } from "../store/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchBar,
  Button,
  Card,
  Avatar,
  Icon,
  Text,
} from "react-native-elements";

const AddFriendScreen = (props) => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.users.email);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
      setError(null);
    }
  }, [error]);

  const getProfileHandler = async () => {
    try {
      if (userEmail === email) {
        Alert.alert("Sorry", "You can't search for yourself", [
          { text: "Okay" },
        ]);
      } else {
        setIsLoading(true);
        const userProfile = await dispatch(findUserProfile(email));
        setProfile(userProfile.other);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    setIsLoading(false);
  }, [profile]);

  const addFriend = async () => {
    try {
      setIsLoading(true);
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
      {isLoading ? (
        <View
          style={{
            height: "58%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ marginTop: 25 }}>
          {profile && (
            <Card title={profile.name}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  padding: 100,
                }}
              >
                <Text>{profile.email}</Text>
                <Avatar
                  size="xlarge"
                  rounded
                  source={require("../assets/pro3.png")}
                />
              </View>

              <Button
                icon={<Icon name="code" color="#ffffff" />}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="Add as friend"
                onPress={addFriend}
              />
            </Card>
          )}
        </View>
      )}

      <Button
        title="Go back"
        type="clear"
        onPress={() => props.navigation.navigate("profile")}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e8ee",
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
