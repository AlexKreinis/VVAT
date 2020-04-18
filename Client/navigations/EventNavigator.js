import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";

import EventScreen from "../Screens/EventScreen";
import CreateEventScreen from "../Screens/CreateEventScreen";
import Events from "../Components/innerComponents/Events";
const EventNav = createStackNavigator({
  Events: Events,
  Event: EventScreen,
  CreateEvent: CreateEventScreen,
});

export default createAppContainer(EventNav);
