import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, TextInput, Button } from "react-native";
import MapView, { Overlay } from "react-native-maps";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { maps, selectedMapsDetails } from "../store/actions/MapsActions";
import { getUser } from "../store/actions/Usersactions";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import ModalComp from "../Components/ModalComp";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/CustomHeaderButton";

const MapScreen = (props) => {
  const [pickedLocation, setPickedLocation] = useState({
    latitude: 31.255161367000028,
    longitude: 34.77513006300006,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const Maps = useSelector((state) => state.maps.sportsCenters);
  const [openModal, setOpenModal] = useState(false);
  const [sportsLocations, setSportsLocations] = useState([]);
  const [error, setError] = useState();
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
      dispatch(getUser());
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
      <View
        style={{
          flexDirection: "row",
        }}
      ></View>
      <View style={styles.mapContainer}>
        <ModalComp
          isOpen={openModal}
          setIsOpen={setOpenModal}
          choice="ModalNavigator"
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

MapScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Map",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
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
  },
  mapContainer: {
    width: "100%",
    height: "110%",
  },
  button: { margin: 20, backgroundColor: "red" },

  container: {
    flex: 1,
  },
});

export default MapScreen;
