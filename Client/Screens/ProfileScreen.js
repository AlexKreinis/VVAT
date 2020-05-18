import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Button,
  TouchableOpacity,
} from "react-native";
import { Badge } from "react-native-elements";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import ModalComp from "../Components/ModalComp";

const ProfileScreen = (props) => {
  const [details, setDetails] = useState({
    email: "",
    name: "",
    description: "",
    facebook: "",
    age: "",
    events: [],
    friendList: [],
    friendRequest: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  const userDetails = useSelector((state) => state.users);

  useEffect(() => {
    const tempDetails = {
      email: userDetails.email ? userDetails.email : "",
      name: userDetails.name ? userDetails.name : "",
      description: userDetails.description ? userDetails.description : "",
      facebook: userDetails.facebook ? userDetails.facebook : "",
      age: userDetails.age ? userDetails.age : "",
      events: userDetails.events ? userDetails.events : [],
      friendList: userDetails.friendList ? userDetails.friendList : [],
      friendRequest: userDetails.friendRequest ? userDetails.friendRequest : [],
    };
    setDetails(tempDetails);
  }, [userDetails]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: -25 }}>
        <ModalComp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          choice="acceptFriendList"
        />
      </View>
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
          <Text style={styles.count}>{details.friendList.length}</Text>
        </View>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("history");
            }}
          >
            <Text style={styles.title}>Events</Text>
          </TouchableOpacity>
          <Text style={styles.count}>{details.events.length}</Text>
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
              onPress={() => setIsOpen(true)}
            >
              <>
                <Image
                  style={styles.icon}
                  source={require("../assets/add-user.png")}
                />
                {details.friendRequest.length > 0 && (
                  <Badge
                    status="error"
                    containerStyle={{
                      position: "absolute",
                      top: 1,
                      right: 1,
                    }}
                    value={
                      details.friendRequest.length > 0
                        ? details.friendRequest.length
                        : ""
                    }
                    badgeStyle={{
                      height: 25,
                      width: 25,
                      borderRadius: 1000,
                    }}
                  />
                )}
              </>
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

          <Text style={styles.description}>Age: {details.age}</Text>

          <Text style={styles.description}>
            Facebook:
            {details.facebook}
          </Text>

          <Text style={styles.description}>{details.description}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="edit profile"
              onPress={() => props.navigation.navigate("editProfile")}
            ></Button>
            <Button
              title="find user"
              onPress={() => props.navigation.navigate("addFriend")}
              color="#f1948a"
            />
          </View>
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
    marginTop: -500,
    marginLeft: 50,
    height: 125,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    marginBottom: 52,
    width: 345,
    borderRadius: 30,
  },
  buttonContainer2: {
    marginTop: -220,
    height: 100,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 52,
    width: 345,
    borderRadius: 30,
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
