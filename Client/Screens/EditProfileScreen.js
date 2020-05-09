import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { saveProfile } from "../store/actions/Usersactions";

const EditProfileScreen = (props) => {
  const userDetails = useSelector((state) => state.users);
  const [details, setDetails] = useState({
    email: userDetails.email,
    name: userDetails.name,
    description: userDetails.description,
  });
  const dispatch = useDispatch();

  const clickHandler = async () => {
    //dipatch function from useractions that go to the server and fetch post action that send new user profile details in the body of the req to the route

    try {
      await (dispatch(saveProfile(details)),
      props.navigation.navigate("profile"));
    } catch (err) {
      //  setError(err.message);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={require("../assets/pro2.png")} />
          <Button
            title="Go back"
            onPress={() => props.navigation.navigate("profile")}
          ></Button>
          <Text style={styles.name}>Edit your profile</Text>
        </View>
        <View style={styles.bodyContent}>
          <View>
            <Text>Name: </Text>
            <TextInput
              style={styles.input}
              value={details.name}
              onChangeText={(text) =>
                setDetails({
                  ...details,
                  name: text,
                })
              }
            />
            <Text>Age: </Text>
            <TextInput style={styles.input} />
            <Text>Facebook: </Text>
            <TextInput style={styles.input} />
            <Text>description: </Text>
            <TextInput
              style={styles.input}
              value={details.description}
              onChangeText={(text) =>
                setDetails({
                  ...details,
                  description: text,
                })
              }
            />
            <Button title="Save Changes" onPress={clickHandler}></Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: Colors.accentColor,
    padding: 45,
    alignItems: "center",
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    alignItems: "center",
    fontWeight: "600",
    justifyContent: "center",
  },
  bodyContent: {
    padding: 10,
  },
  input: {
    height: 40,
    borderBottomColor: "#43226e",
    borderBottomWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
    color: "#3c1762",
    paddingHorizontal: 10,
  },
});

export default EditProfileScreen;
