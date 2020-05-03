import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const ProfileScreen = () => {
  const [details, setDetails] = useState({ email: "", name: "" });
  const userDetails = useSelector((state) => state.users);

  useEffect(() => {
    setDetails(userDetails);
  }, [userDetails]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.avatar} source={require("../assets/pro2.png")} />
          <Text style={styles.name}>{details.name}</Text>
          <Text style={styles.name}>{details.email}</Text>
        </View>
      </View>

      <View style={styles.profileDetail}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Friends</Text>
          <Text style={styles.count}>200</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Events</Text>
          <Text style={styles.count}>200</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Rating</Text>
          <Text style={styles.count}>200</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <View style={styles.buttonMenuContainer}>
            <TouchableHighlight
              style={[styles.button, styles.buttonAddUser]}
              //onPress={}
            >
              <Image
                style={styles.icon}
                source={require("../assets/add-user.png")}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.button1]}
              //onPress={}
            >
              <Image
                style={styles.icon}
                source={require("../assets/facebook2.png")}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonMail]}
              //onPress={}
            >
              <Image
                style={styles.icon}
                source={require("../assets/gmail.png")}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonPin]}
              //onPress={}
            >
              <Image
                style={styles.icon}
                source={require("../assets/pin.png")}
              />
            </TouchableHighlight>
          </View>
          <Text style={styles.description}></Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.accentColor,
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  profileDetail: {
    alignSelf: "center",
    marginTop: 230,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  detailContent: {
    margin: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#00CED1",
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    marginTop: 40,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop: 85,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00CED1",
  },
  description: {
    fontSize: 20,
    color: "#00CED1",
    marginTop: 10,
    textAlign: "center",
  },
  buttonMenuContainer: {
    flexDirection: "row",
    marginBottom: 100,
  },

  button: {
    width: 60,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    margin: 10,
  },
  buttonAddUser: {
    backgroundColor: "#ffffff",
  },
  buttonFacebook: {
    backgroundColor: "#ffffff",
  },
  buttonMail: {
    backgroundColor: "#ffffff",
  },
  buttonPin: {
    backgroundColor: "#ffffff",
  },
  icon: {
    width: 48,
    height: 48,
  },
});

export default ProfileScreen;
