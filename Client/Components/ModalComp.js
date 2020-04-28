import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";
import ModalNavigator from "./innerComponents/ModalNavigator";
import { deleteEvents } from "../store/actions/MapsActions";
import { useDispatch } from "react-redux";

const ModalComp = (props) => {
  const dispatch = useDispatch();
  const cleanStore = () => {
    dispatch(deleteEvents());
  };

  const showInnerComponent = () => {
    if (props.choice === "ModalNavigator") {
      return <ModalNavigator />;
    }
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {showInnerComponent()}

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F9" }}
              onPress={() => {
                cleanStore();
                props.setIsOpen(false);
              }}
            >
              <Text style={styles.textStyle}>X</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: 550,
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 25,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default ModalComp;
