import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { ListItem, Button } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerItems } from "react-navigation-drawer";
import { logout } from "../store/actions/Usersactions";
import { useSelector, useDispatch } from "react-redux";

const customDrawerComponent = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const role = useSelector((state) => state.users.role);
  const dispatch = useDispatch();
  useEffect(() => {
    if (role === "Admin") {
      setIsAdmin(true);
    }
  }, [role]);
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <DrawerItems {...props} />
        {isAdmin && (
          <ListItem
            title={"    Admin"}
            leftIcon={{ name: "people-outline" }}
            onPress={() => props.navigation.navigate("adminPanel")}
            linearGradientProps={{
              colors: ["#2e86c1", "#2980b9"],
              start: { x: 1, y: 0 },
              end: { x: 0.2, y: 0 },
            }}
            titleStyle={{ color: "white", fontWeight: "bold" }}
          />
        )}
        <View style={styles.logout}>
          <Button
            title="Logout"
            color="blue"
            type="clear"
            onPress={() => {
              dispatch(logout());
              props.navigation.navigate("loginregister");
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default customDrawerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  logout: {
    paddingTop: 30,
  },
});
