import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import { useSelector } from "react-redux";
const EditProfileScreen = () => {
  const userDetails = useSelector((state) => state.users);
  const [details, setDetails] = useState({
    email: userDetails.email,
    name: userDetails.name,
    description: "",
  });
  const clickHandler = () => {
    //dipatch function from useractions that go to the server and fetch post action that send new user profile details in the body of the req to the route
  };
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Name: </Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        value={details.name}
        onChangeText={(text) =>
          setDetails({
            name: text,
            email: details.email,
            description: details.description,
          })
        }
      />
      <Text>email: </Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        value={details.email}
        onChangeText={(text) =>
          setDetails({
            name: details.name,
            email: text,
            description: details.description,
          })
        }
      />
      <Text>descripton: </Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        value={details.description}
        onChangeText={(text) =>
          setDetails({
            name: details.name,
            email: details.email,
            description: text,
          })
        }
      />
      <Button title="Save" onPress={() => clickHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});
export default EditProfileScreen;
