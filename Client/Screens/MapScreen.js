import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
const MapScreen = (props) => {
  const [pickedLocation, setPickedLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      });

      // console.log(pickedLocation);
    } catch (err) {
      //console.log(err);
      // Alert.alert(
      //   "Could not fetch location!",
      //   "Please try again later or pick a location on the map.",
      //   [{ text: "Okay" }]
      // );
    }
  };

  // console.log(location);
  //console.log(pickedLocation);
  useEffect(() => {
    getLocationHandler();
  }, []);
  // la = pickedLocation.lat;
  // ln = pickedLocation.lng;
  // console.log(la);
  // console.log(ln);
  //console.log(pickedLocation);

  //   const onRegionChange = (re) => {
  //     setRegion(re);
  //   };
  //test
  return (
    <MapView
      style={styles.map}
      region={pickedLocation}
      showsUserLocation={true}
    >
      <Marker
        coordinate={{
          latitude: 31.255161367000028,
          longitude: 34.77513006300006,
        }}
        title="p1"
        description="c1"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
