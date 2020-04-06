import React from "react";
import { StyleSheet, Text, View, ShadowPropTypesIOS } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import UsersReducer from "./store/reducers/UsersReducer";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import Navigator from "./navigations/Navigator";

const rootReducer = combineReducers({
  users: UsersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    //main screen should be wrapped with provider
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
