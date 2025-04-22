import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView } from "react-native";
import { AuthContext } from "../context/AuthContext";

const DashboardScreen = () => {
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
      <Text style={styles.heading}>Welcome, {userInfo.userName}!</Text>

      <Image
        source={{ uri: userInfo.profileImage?.url }}
        style={styles.profileImage}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userInfo.email}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{userInfo.phone}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{userInfo.address}</Text>

        <Text style={styles.label}>Role:</Text>
        <Text style={styles.value}>{userInfo.role}</Text>

        <Text style={styles.label}>Total Balance:</Text>
        <Text style={styles.value}>₹{userInfo.totalBalance}</Text>

        <Text style={styles.label}>Cashback Saved:</Text>
        <Text style={styles.value}>₹{userInfo.cashbackSaved}</Text>
      </View>

      <Button title="Logout" onPress={logout} color="#ff4444" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  infoContainer: {
    width: "100%",
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    marginBottom: 10,
  },
});

export default DashboardScreen;
