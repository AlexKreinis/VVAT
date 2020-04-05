import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import UsersReducer from "./store/reducers/UsersReducer";
import { Provider } from "react-redux";
const rootReducer = combineReducers({
  users: UsersReducer,
});
const store = createStore(rootReducer);

export default function App() {
  return (
    //main screen should be wrapped with provider
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
