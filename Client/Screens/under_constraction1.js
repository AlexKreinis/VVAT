import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Animated } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const { Value } = Animated;
const MusicApp = (props) => {
  const buttonOpacity = new Value(1);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-end",
      }}
    >
      <View style={{ ...StyleSheet.absoluteFill }}>
        <Image
          source={require("../assets/bg.jpg")}
          style={{ flex: 1, height: null, width: null }}
        />
      </View>
      <View style={{ height: height / 3, justifyContent: "center" }}>
        <TapGestureHandler onHandlerStateChange={onStateChange}>
          <View style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
          </View>
        </TapGestureHandler>
        <View style={{ ...styles.button, backgroundColor: "#2E71DC" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            SIGN IN WITH FACEBOOK
          </Text>
        </View>
      </View>
    </View>
  );
};
export default MusicApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
});
