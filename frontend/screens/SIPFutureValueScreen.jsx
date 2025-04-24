import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import BottomNavbar from "../components/BottomNavbar";
import AppBar from "./Home/AppBar";

const SIPFutureValueScreen = () => {
  const [form, setForm] = useState({ sipAmount: 5000, duration: 5, risk: 1 });
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sip/sip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sipAmount: form.sipAmount,
          duration: form.duration,
          risk: form.risk === 1 ? "Low" : form.risk === 2 ? "Medium" : "High",
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while fetching data.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar />

      <ScrollView style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>SIP Future Value Calculator</Text>

          <Text style={styles.inputLabel}>SIP Amount: ₹{form.sipAmount}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1000}
            maximumValue={100000}
            step={1000}
            value={form.sipAmount}
            onValueChange={(val) => setForm({ ...form, sipAmount: val })}
            minimumTrackTintColor="#E8434C"
            maximumTrackTintColor="#8A8A8A"
            thumbTintColor="#E8434C"
          />

          <Text style={styles.inputLabel}>Duration (Years): {form.duration}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={20}
            step={1}
            value={form.duration}
            onValueChange={(val) => setForm({ ...form, duration: val })}
            minimumTrackTintColor="#E8434C"
            maximumTrackTintColor="#8A8A8A"
            thumbTintColor="#E8434C"
          />

          <Text style={styles.inputLabel}>Risk Level:</Text>
          <View style={styles.toggleContainer}>
            {["Low", "Medium", "High"].map((level, index) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.toggleButton,
                  form.risk === index + 1 && styles.activeButton,
                ]}
                onPress={() => setForm({ ...form, risk: index + 1 })}
              >
                <Text style={styles.toggleButtonText}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.spacer} />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Calculate</Text>
          </TouchableOpacity>

          {result && result.success && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Investment Result</Text>
              <Text style={styles.resultTitle}>Total Future Value:</Text>

              {/* Total Future Value */}
              <Text style={styles.resultValue}>₹
                {result.results
                  .reduce((sum, inv) => sum + parseFloat(inv.estimatedFutureValue), 0)
                  .toFixed(2)}
              </Text>

              {/* List of Investments */}
              {result.results.map((investment, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardTitle}>{investment.name}</Text>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>Risk:</Text>
                    <Text style={styles.value}>{investment.risk}</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>Allocated SIP:</Text>
                    <Text style={styles.value}>₹{parseFloat(investment.allocatedSIPAmount).toFixed(2)}</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>Future Value:</Text>
                    <Text style={styles.value}>₹{parseFloat(investment.estimatedFutureValue).toFixed(2)}</Text>
                  </View>
                </View>
              ))}

              <Text style={styles.resultMessage}>{result.message}</Text>
            </View>
          )}

        </View>
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0e13",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 80,
  },
  formContainer: {
    backgroundColor: "#161a23",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  inputLabel: {
    color: "#d0d0d0",
    marginBottom: 6,
    fontSize: 16,
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 25,
    backgroundColor: "#383C47",
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#E8434C",
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  spacer: {
    height: 10,
  },
  submitButton: {
    backgroundColor: "#E8434C",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: "#1c1f28",
    borderRadius: 12,
    padding: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00BFFF",
    marginBottom: 10,
  },
  resultMessage: {
    fontSize: 14,
    color: "#aaaaaa",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#2c2f36",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    color: "#d0d0d0",
    fontWeight: "500",
  },
  value: {
    color: "#ffffff",
  },
  errorMessage: {
    fontSize: 14,
    color: "#ff4d4d",
    marginBottom: 10,
  },
});


export default SIPFutureValueScreen;
