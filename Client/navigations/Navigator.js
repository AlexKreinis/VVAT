import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import MapScreen from "../Screens/MapScreen";
import EventScreen from "../Screens/EventScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-ionicons";
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

// const ProfileNav = createStackNavigator(
//   {
//     Profile: ProfileScreen,
//   },
//   {
//     defaultNavigationOptions: {},
//   }
// );

const MapNav = createStackNavigator(
  {
    Main: MapScreen,
    // Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: {
      // headerShown: false
    },
  }
);

const appTabNavigator = createBottomTabNavigator({
  Map: {
    screen: MapScreen,
    defaultNavigationOptions: {
      tabBarIcon: ({ tabInfo }) => {
        return <Ionicons name="md-checkmark-circle" size={32} color="green" />;
      },
    },
  },
  Profile: {
    screen: ProfileScreen,
    defaultNavigationOptions: {
      tabBarIcon: ({ tabInfo }) => {
        return <Ionicons name="md-checkmark-circle" size={32} color="green" />;
      },
    },
  },
});

const Navigator = createSwitchNavigator({
  loginregister: LoginRegisterNav,
  tab: appTabNavigator,
});

export default createAppContainer(Navigator);
