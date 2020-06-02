import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import MusicApp from "./under_constraction1";

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const loadAssetsAsync = async () => {
  const imageAssets = cacheImages([require("../assets/bg.jpg")]);

  await Promise.all([...imageAssets]);
};

const Login = (props) => {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return <MusicApp />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
