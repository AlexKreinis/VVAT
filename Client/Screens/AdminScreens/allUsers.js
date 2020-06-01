import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getallusers } from "../../store/actions/Usersactions";

const data = {
  __v: 0,
  _id: "5ed1234e90abee44b8569511",
  date: "2020-05-29T14:59:26.899Z",
  email: "admin@mail.com",
  name: "Admin",
  profile: {
    __v: 0,
    _id: "5ed4d5c258d5de00173efd78",
    age: "29",
    description: "123",
    events: [],
    facebook: "none",
    friendList: [],
    friendRequest: [],
  },
  role: "Admin",
};

const allUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const getAllUsers = async () => {
    try {
      const temp = await dispatch(getallusers());
      return temp;
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
    let allUsers = getAllUsers();
    //setUsers([ ...allUsers ]);
  }, [error]);

  return (
    <View style={styles.header}>
      <Text>ALL USERS SCREEN</Text>
      <View>
        <Text>{users}</Text>
      </View>
    </View>
  );
};

export default allUsers;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
    marginBottom: 35,
  },
});
