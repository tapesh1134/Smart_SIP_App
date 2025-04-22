import {Pressable, ScrollView, View, StyleSheet, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const ExchangeStats = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.topHeader}>Exchange Rate</Text>
                <Pressable>
                    <Text style={styles.viewBtn}>See More</Text>
                </Pressable>
            </View>
            <CurrencyItem/>
            <CurrencyItem/>
            <CurrencyItem/>
        </ScrollView>
    )
}

const CurrencyItem = () => {
    return (
        <View style={styles.currencyContainer}>
            <View>
                <Text style={styles.currencyFlag}>🇨🇦 CAD</Text>
                <Text style={styles.currencySmallText}>
                    Canadian Dollar
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={styles.currencySmallText}>
                    $1.324
                </Text>
                <Ionicons name={"trending-up"} size={24} color={"#01BA59"}/>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={styles.currencySmallText}>
                    $1.324
                </Text>
                <Ionicons name={"trending-up"} size={24} color={"#EE281D"}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#12151C",
        marginHorizontal: 10,
        marginTop: 20,
        padding: 10
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    topHeader: {
        fontSize: 14,
        fontWeight: "500",
        color: "#fff"
    },
    viewBtn: {
        color: "#F3456F",
        padding: 5,
    },
    currencyContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems:'center',
        paddingVertical: 10,
    },
    currencyFlag: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "700"
    },
    currencySmallText: {
        fontSize: 12,
        color: "#ABB0BC",
        fontWeight: "400"
    }
})

export default ExchangeStats