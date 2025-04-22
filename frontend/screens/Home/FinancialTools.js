import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";

const PlanYourGoals = () => {
    return (
        <View style={styles.card}>
            <View style={styles.iconBackground}>
                <Entypo name={"clipboard"} size={24} color={"#fff"} />
            </View>
            <Text style={styles.cardHeading}>Plan Your Goals</Text>
            <View style={styles.bottomSection}>
                <Text style={styles.bottomText}>
                    Set clear financial goals to achieve your future aspirations.
                </Text>
            </View>
        </View>
    );
};

const CalculateSIP = () => {
    return (
        <View style={styles.card}>
            <View style={styles.iconBackground}>
                <Feather name={"pie-chart"} size={24} color={"#fff"} />
            </View>
            <Text style={styles.cardHeading}>Calculate SIP</Text>
            <View style={styles.bottomSection}>
                <Text style={styles.bottomText}>
                    Calculate the perfect SIP to achieve your financial goals.
                </Text>
            </View>
        </View>
    );
};

const FinancialTools = () => {
    return (
        <View style={styles.container}>
            <PlanYourGoals />
            <CalculateSIP />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",           // Align items in the same row
        justifyContent: "space-between",// Space out the cards evenly
        paddingHorizontal: 10,
        marginTop: 10,
        flexWrap: "wrap"                // Ensures the cards wrap on smaller screens
    },
    card: {
        width: "48%",
        height: 180,
        borderRadius: 20,
        padding: 20,
        backgroundColor: "#12151c",
        marginVertical: 10,
        justifyContent: "space-between"
    },
    iconBackground: {
        backgroundColor: "#262832",
        width: 40,
        height: 40,
        alignItems: "center",
        borderRadius: 8,
        justifyContent: "center"
    },
    cardHeading: {
        fontSize: 12,
        fontWeight: "500",
        color: "#fff",
        marginTop: 8
    },
    bottomSection: {
        marginTop: 15
    },
    bottomText: {
        fontSize: 12,
        fontWeight: "400",
        color: "#666B74"
    }
});

export default FinancialTools;
