import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";

const ServiceList = () => {
    return (
        <View style={styles.container}>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10
            }}>
                <Text style={styles.heading}>
                    Our Services
                </Text>
            </View>

            <ScrollView style={{ marginTop: 20 }} showsHorizontalScrollIndicator={false} horizontal>
                <View style={styles.card}>
                    <View style={styles.iconBackground}>
                        <Entypo name="clipboard" size={24} color="#fff" />
                    </View>
                    <Text style={styles.cardHeading}>Plan Your Goals</Text>
                    <Text style={styles.cardDescription}>
                        Set financial goals and track your progress.
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.iconBackground}>
                        <Feather name="pie-chart" size={24} color="#fff" />
                    </View>
                    <Text style={styles.cardHeading}>Calculate SIP</Text>
                    <Text style={styles.cardDescription}>
                        Calculate your SIP investments for better returns.
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.iconBackground}>
                        <Feather name="trending-up" size={24} color="#fff" />
                    </View>
                    <Text style={styles.cardHeading}>Future Value of Money</Text>
                    <Text style={styles.cardDescription}>
                        Predict the future value of your investments.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#12151C",
        marginHorizontal: 10,
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
    },
    heading: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    btnText: {
        color: "#BC385A",
        fontSize: 14,
        fontWeight: "500",
    },
    card: {
        width: 150,
        height: 200,
        backgroundColor: "#262832",
        borderRadius: 10,
        marginRight: 15,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    iconBackground: {
        backgroundColor: "#BC385A",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    cardHeading: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    cardDescription: {
        color: "#B0B3B8",
        fontSize: 12,
        textAlign: "center",
        marginTop: 8,
    }
});

export default ServiceList;
