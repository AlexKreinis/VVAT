import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { maps } from "../store/actions/MapsActions";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
const MapScreen = (props) => {
  const [pickedLocation, setPickedLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00009,
    longitudeDelta: 0.00009,
  });
  const Maps = useSelector((state) => state.maps.sportsCenters);
  const [sportsLocations, setSportsLocations] = useState([
    {
      Name: "test",
      lat: 31.255161367000028,
      lon: 34.77513006300006,
    },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    //  console.log("\n\nTEST\n\n", Maps, "\n\ntest\n\n");
    setSportsLocations([...Maps]);
  }, [Maps]);
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
        latitudeDelta: 0.00009,
        longitudeDelta: 0.00009,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  try {
    useEffect(() => {
      getLocationHandler();
      dispatch(maps());
    }, []);
  } catch (err) {
    setError(err.message);
  }

  return (
    <MapView
      style={styles.map}
      region={pickedLocation}
      showsUserLocation={true}
    >
      {sportsLocations.map((marker) => {
        return (
          <Marker
            key={marker["lat"]}
            coordinate={{ latitude: +marker["lat"], longitude: +marker["lon"] }}
            title={marker["Name"]}
            description={marker["Type"]}
          />
        );
      })}
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
