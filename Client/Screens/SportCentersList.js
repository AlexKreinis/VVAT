import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { maps } from "../store/actions/MapsActions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/CustomHeaderButton";
import ModalComp from "../Components/ModalComp";
import { selectedMapsDetails } from "../store/actions/MapsActions";

const SportCentersList = (props) => {
  const Maps = useSelector((state) => state.maps.sportsCenters);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  try {
    useEffect(() => {
      dispatch(maps());
    }, []);
  } catch (err) {
    setError(err.message);
  }

  const handleOpenModal = (marker) => {
    setOpenModal(true);
    dispatch(selectedMapsDetails(marker));
  };

  const renderSportcenterItem = (itemData) => {
    return (
      <TouchableOpacity onPress={() => handleOpenModal(itemData.item)}>
        <View style={styles.listItem}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>
            {itemData.item["Name"]}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {itemData.item["Type"]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const List = () => {
    return (
      <FlatList
        data={Maps}
        renderItem={renderSportcenterItem}
        keyExtractor={(item, index) => "key" + index}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>{List()}</View>
      <View style={{ height: 0 }}>
        <ModalComp
          isOpen={openModal}
          setIsOpen={setOpenModal}
          choice="ModalNavigator"
        />
      </View>
    </View>
  );
};

SportCentersList.navigationOptions = (navData) => {
  return {
    headerTitle: "Sport Centers",
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
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },

  list: {
    flex: 5,
    width: "100%",
  },
  listItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 10,
  },
});

export default SportCentersList;
