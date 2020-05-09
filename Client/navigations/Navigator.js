import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import MapScreen from "../Screens/MapScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import EditProfileScreen from "../Screens/EditProfileScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Colors from "../constants/Colors";
import SportCentersList from "../Screens/SportCentersList";
import DemoScreen2 from "../Screens/DemoScreen2";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitleAlign: "center",
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

const ProfileNav = createStackNavigator(
  {
    profile: ProfileScreen,
    editProfile: EditProfileScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

// const editProfileNav = createStackNavigator(
//   {
//     EditProfile: EditProfileScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       title: "Edit Profile",
//       headerTitleAlign: "center",
//     },
//   }
// );

// const ProfileSwitchNav = createSwitchNavigator({
//   profile: ProfileNav,
//   editProfile: editProfileNav,
// });

const SportCentersListNav = createStackNavigator(
  {
    Main: {
      screen: SportCentersList,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const Demo2Navigator = createStackNavigator(
  {
    Main: {
      screen: DemoScreen2,
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
    screen: ProfileNav,
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

  SportCentersList: SportCentersListNav,
  Demo2: Demo2Navigator,
});

const Navigator = createSwitchNavigator({
  loginregister: LoginRegisterNav,
  tab: MainNavigator,
});

export default createAppContainer(Navigator);
