import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { saveUserProfile } from "../../store/actions/adminActions";

const userEditProfileScreen = (props) => {
  const userToEdit = props.navigation.getParam("user");

  const [error, setError] = useState(null);
  const [details, setDetails] = useState({
    email: userToEdit.email,
    name: userToEdit.name,
    description: userToEdit.profile.description,
    age: userToEdit.profile.age,
    facebook: userToEdit.profile.facebook,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const dispatch = useDispatch();

  const clickHandler = async () => {
    try {
      const updatedUser = await dispatch(saveUserProfile(details));

      props.navigation.navigate({
        routeName: "userProfile",
        params: {
          updated: updatedUser,
        },
      });
      Alert.alert("User updated successfully");
    } catch (err) {
      console.log("error catched", err);
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image style={styles.avatar} source={require("../assets/pro2.png")} /> */}
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
            <TextInput
              style={styles.input}
              value={details.age}
              keyboardType="numeric"
              onChangeText={(text) =>
                setDetails({
                  ...details,
                  age: text,
                })
              }
            />
            <Text>Facebook: </Text>
            <TextInput
              style={styles.input}
              value={details.facebook}
              onChangeText={(text) =>
                setDetails({
                  ...details,
                  facebook: text,
                })
              }
            />
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

userEditProfileScreen.navigationOptions = (navData) => {
  const user = navData.navigation.getParam("user");
  return {
    headerTitle: `Edit ${user.name}'s Profile`,
  };
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
export default userEditProfileScreen;
