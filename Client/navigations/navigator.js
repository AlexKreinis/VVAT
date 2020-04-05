import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from '../Screens/LoginScreen'
import RegistrationScreen from '../Screens/RegistrationScreen'
import MainScreen from "../Screens/MainScreen";

const Navigator = createStackNavigator({
  Login: LoginScreen,
  Registration: RegistrationScreen,
  Main: MainScreen,
});

export default createAppContainer(Navigator);
