import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";

import EventScreen from "../Screens/EventScreen";
import CreateEventScreen from "../Screens/CreateEventScreen";
import EventList from "../Components/innerComponents/EventList";
import Attendees from "../Components/innerComponents/Attendees";

const EventNav = createStackNavigator(
  {
    Events: EventList,
    EventDetails: EventScreen,
    CreateEvent: CreateEventScreen,
    Attendees: Attendees,
  },
  {
    defaultNavigationOptions: {
      //headerShown: false,
    },
  }
);

export default createAppContainer(EventNav);
