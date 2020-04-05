import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Registration from "./Registration";

export default function App() {
  return <Registration />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
