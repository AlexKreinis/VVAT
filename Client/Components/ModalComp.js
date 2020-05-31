import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Alert,
} from "react-native";
import ModalNavigator from "./innerComponents/ModalNavigator";
import AcceptFriendList from "./innerComponents/AcceptFriendList";
import { deleteEvents } from "../store/actions/MapsActions";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const ModalComp = (props) => {
  const dispatch = useDispatch();

  const cleanStore = () => {
    dispatch(deleteEvents());
  };

  const showInnerComponent = () => {
    if (props.choice === "ModalNavigator") {
      return <ModalNavigator />;
    }
    if (props.choice === "acceptFriendList") {
      return <AcceptFriendList />;
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
              style={{ marginTop: 15 }}
              onPress={() => {
                cleanStore();
                props.setIsOpen(false);
              }}
            >
              <Ionicons name="ios-close" size={35} color="red" />
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
