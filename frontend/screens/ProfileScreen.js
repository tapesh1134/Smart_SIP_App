import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import BottomNavbar from "../components/BottomNavbar";
import AppBar from "./Home/AppBar";
import moment from "moment";

const ProfileScreen = () => {
    const { userInfo, logout } = useContext(AuthContext);

    if (!userInfo) {
        return (
            <View style={styles.center}>
                <Text style={styles.loadingText}>Loading user info...</Text>
            </View>
        );
    }

    const formattedJoinDate = moment(userInfo.createdAt).format("MMM Do YYYY");

    return (
        <View style={styles.container}>
            <AppBar />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.redBlock} />
                <View style={styles.blueBlock} />

                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: userInfo.profileImage?.url }}
                        style={styles.profileImage}
                    />

                    <Text style={styles.title}>Hello, {userInfo.userName}!</Text>
                    <Text style={styles.email}>{userInfo.email}</Text>
                    <Text style={styles.joiningDate}>Joined: {formattedJoinDate}</Text>

                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <Text style={styles.balanceAmount}>₹{userInfo.totalBalance}</Text>
                    </View>

                    <View style={styles.cashbackContainer}>
                        <View style={styles.cashbackBox}>
                            <Text style={styles.cashbackText}>₹{userInfo.cashbackSaved}</Text>
                        </View>
                        <View style={styles.chevronContainer}>
                            <Text style={styles.cashbackLabel}>Cashback Saved</Text>
                            <Entypo name="chevron-small-right" size={28} color="#999" />
                        </View>
                    </View>
                </View>
                <BottomNavbar />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: Colors.light.text,
    },
    redBlock: {
        position: "absolute",
        right: 0,
        width: 100,
        height: 120,
        backgroundColor: "#E8434C",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        zIndex: 10,
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
        zIndex: 5,
    },
    profileSection: {
        padding: 20,
        marginTop: 60,
        marginHorizontal: 15,
        backgroundColor: "#12151c", // Dark background
        borderRadius: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
        textAlign: "center",
    },
    email: {
        fontSize: 16,
        color: "#ccc",
        marginBottom: 10,
        textAlign: "center",
    },
    joiningDate: {
        fontSize: 14,
        color: "#888",
        marginBottom: 20,
        textAlign: "center",
    },
    balanceContainer: {
        marginVertical: 20,
        alignItems: "center",
    },
    balanceLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ddd",
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#1DBF73",
        marginVertical: 10,
    },
    cashbackContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
        borderColor: "#555",
        alignSelf: "center",
    },
    logoutButton: {
        marginTop: 30,
        paddingVertical: 12,
        backgroundColor: "#ff4444",
        borderRadius: 25,
        marginBottom: 20,
        marginHorizontal: 50,
    },
    logoutText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default ProfileScreen;
