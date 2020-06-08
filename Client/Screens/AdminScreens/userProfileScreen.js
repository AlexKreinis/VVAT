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
import { adminGetProfile } from "../../store/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../Components/CustomHeaderButton";

const userProfileScreen = (props) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    name: "",
    description: "",
    facebook: "",
    age: "",
    events: [],
    friendList: [],
    friendRequest: [],
    id: "",
  });
  const dispatch = useDispatch();
  const userDetails = props.navigation.getParam("user");
  const updatedUser = useSelector((state) => state.admin.selectedUser);
  const getUser = async () => {
    try {
      await dispatch(adminGetProfile(userDetails.email));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const tempDetails = {
      ...user,
      email: updatedUser.email ? updatedUser.email : "",
      name: updatedUser.name ? updatedUser.name : "",
      // description: updatedUser.profile.description
      //   ? updatedUser.profile.description
      //   : "",
      // facebook: updatedUser.profile.facebook
      //   ? updatedUser.profile.facebook
      //   : "",
      // age: updatedUser.profile.age ? updatedUser.profile.age : "",
      // events: updatedUser.profile.events ? updatedUser.profile.events : "",
      // friendList: updatedUser.profile.friendList
      //   ? updatedUser.profile.friendList
      //   : "",
      // friendRequest: updatedUser.profile.friendRequest
      //   ? updatedUser.profile.friendRequest
      //   : "",
      // id: updatedUser._id ? updatedUser._id : "",
    };

    setUser(tempDetails);
  }, [updatedUser]);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={require("../../assets/pro2.png")}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.name}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.profileDetail}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Friends</Text>
          <Text style={styles.count}>{user.friendList.length}</Text>
        </View>
        <View style={styles.detailContent}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("history");
            }}
          >
            <Text style={styles.title}>Events</Text>
          </TouchableOpacity>
          <Text style={styles.count}>{user.events.length}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Rating</Text>
          <Text style={styles.count}>200</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <View style={styles.buttonMenuContainer}>
            <TouchableHighlight style={[styles.button, styles.buttonAddUser]}>
              <>
                <Image
                  style={styles.icon}
                  source={require("../../assets/add-user.png")}
                />
              </>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.button1]}
              //onPress={}
            >
              <Image
                style={styles.icon}
                source={require("../../assets/facebook2.png")}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonMail]}
              //onPress={}
            >
              <Image
                style={styles.icon}
                source={require("../../assets/gmail.png")}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.buttonPin]}
              //onPress={}
            >
              <Image
                style={styles.icon}
                source={require("../../assets/pin.png")}
              />
            </TouchableHighlight>
          </View>

          <Text style={styles.description}>Age: {user.age}</Text>

          <Text style={styles.description}>Facebook: {user.facebook}</Text>

          <Text style={styles.description}>{user.description}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Ban User"
              color="red"
              /* onPress={() => {
                props.navigation.navigate({
                  routeName: "userEditProfile",
                  params: { user: user },
                });
              }} */
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

userProfileScreen.navigationOptions = (navData) => {
  const userDetails = navData.navigation.getParam("user");
  return {
    headerTitle: `${userDetails["name"]} Profile`,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-build"
          onPress={() => {
            navData.navigation.navigate({
              routeName: "userEditProfile",
              params: { user: userDetails },
            });
          }}
        />
      </HeaderButtons>
    ),
  };
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
  banButton: {
    color: "red",
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

export default userProfileScreen;
