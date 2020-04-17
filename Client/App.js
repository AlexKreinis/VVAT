import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AppLoading } from "expo"; //prolongs app start untill fonts loaded
import * as Font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import UsersReducer from "./store/reducers/UsersReducer";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import Navigator from "./navigations/Navigator";
import EventsScreen from "./Screens/EventsScreen";

const rootReducer = combineReducers({
  users: UsersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "dancing-script": require("./assets/fonts/DancingScript-Bold.ttf"),
    "averia-libre": require("./assets/fonts/AveriaLibre-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    //main screen should be wrapped with provider
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
//test
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
