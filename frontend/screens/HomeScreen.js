import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import AppBar from "./Home/AppBar";
import WelcomeScreen from "./Home/WelcomeScreen";
import FinancialTools from "./Home/FinancialTools";
import ServiceList from "./Home/ServiceList";
import BottomNavbar from "../components/BottomNavbar";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <AppBar />
          <WelcomeScreen />
          <FinancialTools />
          <ServiceList />
        </ScrollView>
      </SafeAreaView>
      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollViewContent: {
    paddingBottom: 60, // Add extra space to ensure everything is visible above the bottom navbar
  },
});

export default HomeScreen;
