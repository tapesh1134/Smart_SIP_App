import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";  // Assuming AuthContext is set up

const AppBar = () => {
    const { userInfo, logout } = useContext(AuthContext); // Fetching user info and logout function

    return (
        <View style={styles.appBar}>
            {/* Left Container: Profile Image and User Name */}
            <View style={styles.leftContainer}>
                {userInfo ? (
                    <>
                        <Image
                            source={{ uri: userInfo.profileImage?.url }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.userName}>Smart SIP</Text>
                    </>
                ) : (
                    <Text style={styles.userName}>Loading...</Text>
                )}
            </View>

            {/* Right Container: Action Icons and Logout Button */}
            <View style={styles.rightContainer}>
                {/* <Feather name={"search"} size={24} color={"#fff"} />
                <Feather name={"bell"} size={24} color={"#fff"} />
                <View style={styles.btn}>
                    <Ionicons name={"scan-outline"} size={24} color={"#fff"} />
                </View> */}

                {/* Logout Button */}
                {userInfo && (
                    <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    appBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rightContainer: {
        flexDirection: 'row',
        gap: 18,
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#262832',
        borderRadius: 50,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutButton: {
        marginLeft: 15,
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: "#E8434C",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AppBar;
