import React from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { ListItem } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems } from "react-navigation-drawer";
import { useSelector } from "react-redux";

const customDrawerComponent = (props) => {
  const role = useSelector((state) => state.users.role);

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <DrawerItems {...props} />
        {/* {role === " Admin" && ( */}
        <ListItem
          title={"Admin"}
          bottomDivider
          onPress={() => props.navigation.navigate("adminPanel")}
        />
        {/* )} */}
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
