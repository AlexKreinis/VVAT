import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import ModalNavigator from "./innerComponents/ModalNavigator";

const ModalComp = (props) => {
  //console.log(props);
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
        <TouchableWithoutFeedback
          onPress={() => {
            props.setIsOpen(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {showInnerComponent()}

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F9" }}
                onPress={() => {
                  props.setIsOpen(false);
                }}
              >
                <Text style={styles.textStyle}>X</Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    height: "90%",
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
