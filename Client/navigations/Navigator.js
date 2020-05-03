import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import MapScreen from "../Screens/MapScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Colors from "../constants/Colors";
import SettingsScreen from "../Screens/SettingsScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen",
};
const LoginRegisterNav = createStackNavigator(
  {
    Login: LoginScreen,
    Registration: RegistrationScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const MapNav = createStackNavigator(
  {
    Main: {
      screen: MapScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const appTabNavigator = {
  Map: {
    screen: MapNav,
    navigationOptions: {
      tabBarIcon: ({ tabInfo }) => {
        return <Ionicons name="ios-map" size={20} color={tabInfo} />;
      },
      tabBarColor: Colors.primaryColor,
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: ({ tabInfo }) => {
        return <Ionicons name="md-contact" size={20} color={tabInfo} />;
      },
      tabBarColor: Colors.accentColor,
    },
  },
};

const MapProfileTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(appTabNavigator, {
        activeTintColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(appTabNavigator, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
        },
      });

const MainNavigator = createDrawerNavigator({
  MapProfile: {
    screen: MapProfileTabNavigator,
    navigationOptions: {
      drawerLabel: "Maps",
    },
  },

  Settings: SettingsScreen,
});

const Navigator = createSwitchNavigator({
  //loginregister: LoginRegisterNav,
  tab: MainNavigator,
});

export default createAppContainer(Navigator);
