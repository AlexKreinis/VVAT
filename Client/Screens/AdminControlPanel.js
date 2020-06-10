import React from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/CustomHeaderButton";

const AdminControlPanel = (props) => {
  const actions = [
    {
      action: "Manage users",
      page: "adminUsers",
      icon: "people-outline",
    },
    {
      action: "Manage events",
      page: "adminEvents",
      icon: "list",
    },
  ];
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        title={item["action"]}
        leftIcon={{ name: item.icon }}
        bottomDivider
        chevron
        onPress={() => props.navigation.navigate(item["page"])}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={actions}
      renderItem={renderItem}
    />
  );
};

AdminControlPanel.navigationOptions = (navData) => {
  return {
    headerTitle: "Admin Control Panel",
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName="md-arrow-back"
    //       onPress={() => {
    //         navData.navigation.navigate("MapProfile");
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
  };
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default AdminControlPanel;
