import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";

import EventScreen from "../Screens/EventScreen";
import CreateEventScreen from "../Screens/CreateEventScreen";
import Events from "../Components/innerComponents/Events";
import Attendees from "../Components/innerComponents/Attendees";

const EventNav = createStackNavigator(
  {
    Events: Events,
    EventDetails: EventScreen,
    CreateEvent: CreateEventScreen,
    Attendees: Attendees,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default createAppContainer(EventNav);
