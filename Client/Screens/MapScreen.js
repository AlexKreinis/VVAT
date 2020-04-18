import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, TextInput, Button } from "react-native";
import MapView, { Overlay } from "react-native-maps";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { maps, selectedMapsDetails } from "../store/actions/MapsActions";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import ModalComp from "../Components/ModalComp";

const MapScreen = (props) => {
  // console.log(props);
  const [pickedLocation, setPickedLocation] = useState({
    latitude: 31.255161367000028,
    longitude: 34.77513006300006,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const Maps = useSelector((state) => state.maps.sportsCenters);
  const [openModal, setOpenModal] = useState(false);
  const [mapDetail, setMapDetail] = useState({ lat: "", lon: "" });
  const [sportsLocations, setSportsLocations] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
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
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
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
  const handleOpenModal = (marker) => {
    setOpenModal(true);
    dispatch(selectedMapsDetails(marker));
  };
  return (
    <View style={styles.test}>
      <View style={styles.button}>
        <Button
          title="go to beersheba"
          onPress={() =>
            setPickedLocation({
              latitude: 31.255161367000028,
              longitude: 34.77513006300006,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            })
          }
        />
      </View>
      <View style={styles.mapContainer}>
        <ModalComp
          isOpen={openModal}
          setIsOpen={setOpenModal}
          choice="EventForm"
        />
        <MapView
          style={styles.map}
          region={pickedLocation}
          showsUserLocation={true}
        >
          {sportsLocations.map((marker) => {
            return (
              <Marker
                key={marker["lat"]}
                coordinate={{
                  latitude: +marker["lat"],
                  longitude: +marker["lon"],
                }}
                title={marker["Name"]}
                description={marker["Type"]}
                onCalloutPress={() => handleOpenModal(marker)}
              />
            );
          })}
        </MapView>
      </View>
    </View>
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
  test: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    width: "100%",
    height: "90%",
  },
  button: { margin: 20, backgroundColor: "red" },
});

export default MapScreen;
