import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { getallusers } from "../../store/actions/Usersactions";
import { ListItem } from "react-native-elements";

const allUsersScreen = (props) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const LongClickHandler = () => {
    Alert.alert("Edit user profile");
  };

  const ClickHandler = () => {
    Alert.alert("See user profile");
  };

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

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        title={item["name"]}
        subtitle={item["email"]}
        leftAvatar={{ source: require("../../assets/pro2.png") }}
        bottomDivider
        chevron
        onLongPress={LongClickHandler}
        onPress={() => {
          props.navigation.navigate({
            routeName: "userProfile",
            params: { userEmail: item["email"] },
          });
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={{ alignItems: "center", paddingTop: 30 }}>
        <Text>Note for developers:</Text>
        <Text>Short click for view, Long for Edit</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingTop: 50 }}
        keyExtractor={keyExtractor}
        data={users}
        renderItem={renderItem}
      />
    </View>
  );
};

export default allUsersScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
