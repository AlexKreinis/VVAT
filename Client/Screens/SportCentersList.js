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
import TouchableScale from "react-native-touchable-scale";
import { ListItem } from "react-native-elements";

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
      <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
          colors: ["#27ae60", "#1e8449"],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
        title={itemData.item["Name"]}
        titleStyle={{ color: "white", fontWeight: "bold" }}
        subtitleStyle={{ color: "white" }}
        subtitle={itemData.item["Type"]}
        chevron={{ color: "white" }}
        onPress={() => handleOpenModal(itemData.item)}
        containerStyle={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          width: "100%",
        }}
      />
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
