import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const { height } = Dimensions.get("window");

const WelcomeScreen = () => {
  const { userInfo, logout } = useContext(AuthContext);

  if (!userInfo) {
    return (
      <View style={styles.center}>
        <Text>Loading user info...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background Elements */}
      <View style={styles.redBlock} />
      <View style={styles.blueBlock} />

      {/* Left Container (User Details and Balance) */}
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Welcome, {userInfo.userName}!</Text>

        {/* Total Balance Section */}
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₹{userInfo.totalBalance}</Text>

        <View style={styles.cashbackContainer}>
          {/* Cashback Section */}
          <View style={styles.cashbackBox}>
            <Text style={styles.cashbackText}>₹{userInfo.cashbackSaved}</Text>
          </View>

          <View style={styles.chevronContainer}>
            <Text style={styles.cashbackLabel}>Cashback Saved</Text>
            <Entypo name="chevron-small-right" size={28} color="#999" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    position: "relative",
    paddingTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  redBlock: {
    position: "absolute",
    right: 0,
    width: 100,
    height: 120,
    backgroundColor: "#E8434C",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: -5,
  },
  blueBlock: {
    position: "absolute",
    top: 20,
    right: 15,
    width: 100,
    height: 80,
    backgroundColor: "#3283D4",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    zIndex: -10,
  },
  leftContainer: {
    padding: 20,
    flex: 1,
    marginLeft: 10,
  },
  rightContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#303339",
    marginBottom: 10,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#303339",
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  cashbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cashbackBox: {
    backgroundColor: "#262832",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cashbackText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  chevronContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cashbackLabel: {
    color: "#999",
    fontSize: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  logoutText: {
    fontSize: 18,
    color: "#ff4444",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default WelcomeScreen;
