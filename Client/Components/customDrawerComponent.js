import React from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { ListItem } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems } from "react-navigation-drawer";

const customDrawerComponent = (props) => {
  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <DrawerItems {...props} />
        <ListItem title={"Logout"} bottomDivider />
      </SafeAreaView>
    </ScrollView>
  );
};

export default customDrawerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
