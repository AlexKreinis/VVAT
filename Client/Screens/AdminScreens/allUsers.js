import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { getallusers } from "../../store/actions/Usersactions";

const allUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const getAllUsers = async () => {
    try {
      const tempUsers = await dispatch(getallusers());
      setUsers([...tempUsers]);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    getAllUsers();
  }, []);

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
