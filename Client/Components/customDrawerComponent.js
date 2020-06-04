import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems } from "react-navigation-drawer";

const customDrawerComponent = (props) => {
  return (
    <ScrollView style={{ height: 150 }}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <DrawerItems {...props} />
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
