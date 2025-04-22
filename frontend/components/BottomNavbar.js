import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const BottomNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getIconStyle = (screen) => [
    styles.iconContainer,
    route.name === screen && styles.activeIconContainer,
  ];

  const getIconColor = (screen) =>
    route.name === screen ? "#fff" : "#888"; // Active: white, Inactive: grey

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={getIconStyle("Home")}
        onPress={() => navigation.navigate("Home")}
      >
        <AntDesign name="home" size={24} color={getIconColor("Home")} />
      </TouchableOpacity>

      <TouchableOpacity
        style={getIconStyle("SuggestSIP")}
        onPress={() => navigation.navigate("SuggestSIP")}
      >
        <Entypo name="clipboard" size={24} color={getIconColor("SuggestSIP")} />
      </TouchableOpacity>

      <TouchableOpacity
        style={getIconStyle("SIPFutureValue")}
        onPress={() => navigation.navigate("SIPFutureValue")}
      >
        <FontAwesome5 name="chart-line" size={24} color={getIconColor("SIPFutureValue")} />
      </TouchableOpacity>

      <TouchableOpacity
        style={getIconStyle("InvestmentValue")}
        onPress={() => navigation.navigate("InvestmentValue")}
      >
        <Ionicons name="calculator" size={24} color={getIconColor("InvestmentValue")} />
      </TouchableOpacity>

      <TouchableOpacity
        style={getIconStyle("ProfileScreen")}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <MaterialCommunityIcons
          name="account"
          size={24}
          color={getIconColor("ProfileScreen")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: "#12151C",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "#1E1F24",
    borderTopWidth: 1,
    elevation: 10,
    zIndex: 1000,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 10,
  },
  activeIconContainer: {
    backgroundColor: "#4E6D91",
    borderRadius: 12,
  },
});

export default BottomNavbar;
