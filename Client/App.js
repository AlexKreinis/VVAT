import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import UsersReducer from "./store/reducers/UsersReducer";
import { Provider } from "react-redux";
import Login from "./Screens/LoginScreen";
const rootReducer = combineReducers({
  users: UsersReducer,
});
import nevigator from 'nevegator';
const store = createStore(rootReducer);

export default function App() {
  return (
    //main screen should be wrapped with provider
    <Provider store={store}>
      <Login />
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
