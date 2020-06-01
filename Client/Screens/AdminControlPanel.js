import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const AdminControlPanel = (props) => {
  return (
    <View>
      <View style={styles.header}>
        <Text>ADMIN CONTROL PANEL</Text>
      </View>

      <Button
        title="See list of users"
        color="#f1948a"
        onPress={() => props.navigation.navigate("adminUsers")}
      />
      <Button title="See list of events" color="#f1948a" />
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
