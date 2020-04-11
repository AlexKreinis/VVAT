import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import MainScreen from "../Screens/MainScreen";
import MapScreen from "../Screens/MapScreen";

const LoginRegisterNav = createStackNavigator({
  Login: LoginScreen,
  Registration: RegistrationScreen,
});
const Navigator = createSwitchNavigator({
  loginregister: LoginRegisterNav,
  Main: MapScreen,
});
export default createAppContainer(Navigator);
