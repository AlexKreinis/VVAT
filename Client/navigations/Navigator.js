import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import MapScreen from "../Screens/MapScreen";
import EventScreen from "../Screens/EventScreen";
const ch = null;
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
const Navigator = createSwitchNavigator({
  loginregister: LoginRegisterNav,
  Main: MapScreen,
});

export default createAppContainer(Navigator);
