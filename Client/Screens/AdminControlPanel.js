import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";

const AdminControlPanel = (props) => {
  const actions = [
    {
      action: "Manage users",
      page: "adminUsers",
      icon: "../assets/profile.png",
    },
    {
      action: "Manage events",
      page: "adminEvents",
      icon: "../assets/email.png",
    },
  ];
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        title={item["action"]}
        //subtitle={item["email"]}
        leftAvatar={{ source: require("../assets/profile.png") }}
        bottomDivider
        chevron
        onPress={() => props.navigation.navigate(item["page"])}
      />
    </TouchableOpacity>
  );

  return (
    /* <View>
      <View style={styles.header}>
        <Text>ADMIN CONTROL PANEL</Text>
      </View>

      <Button
        title="See list of users"
        color="#f1948a"
        onPress={() => props.navigation.navigate("adminUsers")}
      />
      <Button title="See list of events" color="#f1948a" />
    </View> */
    <View>
      <View style={{ alignItems: "center", paddingTop: 30 }}>
        <Text>Note for developers:</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingTop: 50 }}
        keyExtractor={keyExtractor}
        data={actions}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AdminControlPanel;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
    marginBottom: 35,
  },
});
