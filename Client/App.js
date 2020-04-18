import React, { useState } from "react";
import { AppLoading } from "expo"; //prolongs app start untill fonts loaded
import * as Font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import UsersReducer from "./store/reducers/UsersReducer";
import MapsReducer from "./store/reducers/MapsReducer";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import Navigator from "./navigations/Navigator";

const rootReducer = combineReducers({
  users: UsersReducer,
  maps: MapsReducer,
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
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
