import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/CustomHeaderButton";

const About = () => {
  return (
    <View style={styles.page}>
      <Image source={require("../assets/about.jpg")} />
      <Text>
        {"\n"}
        {"    "} VVAT is a nonprofit company founded in 2020.
        {"\n"}
        {"    "} The company name stands for: {"\n"}
        {"    "}
        <Text style={{ fontWeight: "bold" }}> V</Text>-VIKTOR,{" "}
        <Text style={{ fontWeight: "bold" }}> V</Text>-VLADIS,
        <Text style={{ fontWeight: "bold" }}> A</Text>-ALEX,
        <Text style={{ fontWeight: "bold" }}> T</Text>-TOMER {"    "}- {"\n"}
        {"    "}the company owners names.
        {"\n"}
        {"\n"}
        {"    "}
        {"\u2B24"} The company aims to improve the quality of life {"\n"}
        {"        "} of residents of Beer Sheva, by providing{"\n"}
        {"        "}technological solutions to various sports centers in {"\n"}
        {"        "}the city.
        {"\n"}
        {"\n"}
        {"    "}
        {"\u2B24"} The company believes that sports can bring people{"\n"}
        {"        "} together and also contribute to their health, so it was
        {"\n"}
        {"        "}
        important for her to provide an app that would make {"\n"}
        {"        "}life much easier for trainers.
        {"\n"}
        {"\n"}
        {"    "} {"\u2B24"} Also, the company believes the app can encourage{" "}
        {"\n"}
        {"        "} sports among various people from society.
        {"\n"} {"\n"}
        {"\n"}
        <Text>
          {"    "}please feel free to contact us for any reason on our {"\n"}
          {"    "}
          mail: vvat@gmail.com
        </Text>
        {"\n"}
        {"\n"} {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
      </Text>
    </View>
  );
};

About.navigationOptions = (navData) => {
  return {
    headerTitle: "About",
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
  page: { backgroundColor: "#f0ffff" },
  text: { flex: 1 },
  about: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
});

export default About;
