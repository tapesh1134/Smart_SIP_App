import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import BottomNavbar from "../components/BottomNavbar";
import AppBar from "./Home/AppBar";
import Slider from '@react-native-community/slider'; // Importing the Slider component

const SuggestSIPScreen = () => {
  const [form, setForm] = useState({ targetAmount: 5000, duration: 5, risk: "Low" });
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/sip/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed AppBar */}
      <AppBar />

      {/* Scrollable Content */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>SIP Suggestions</Text>

          {/* Target Amount Slider */}
          <Text style={styles.inputLabel}>Target Amount: ₹{form.targetAmount}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1000}
            maximumValue={1000000}
            step={1000}
            value={form.targetAmount}
            onValueChange={(value) => setForm({ ...form, targetAmount: value })}
            minimumTrackTintColor="#E8434C"
            maximumTrackTintColor="#8A8A8A"
            thumbTintColor="#E8434C"
          />

          {/* Duration Slider */}
          <Text style={styles.inputLabel}>Duration (Years): {form.duration}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={30}
            step={1}
            value={form.duration}
            onValueChange={(value) => setForm({ ...form, duration: value })}
            minimumTrackTintColor="#E8434C"
            maximumTrackTintColor="#8A8A8A"
            thumbTintColor="#E8434C"
          />

          {/* Risk Level Selection */}
          <Text style={styles.inputLabel}>Risk Level:</Text>
          <View style={styles.toggleContainer}>
            {["Low", "Medium", "High"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.toggleButton, form.risk === level && styles.activeButton]}
                onPress={() => setForm({ ...form, risk: level })}
              >
                <Text style={styles.toggleButtonText}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Space between the buttons */}
          <View style={styles.spacer} />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Get Suggestions</Text>
          </TouchableOpacity>

          {/* Result Display */}
          {result && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Suggested SIPs:</Text>

              {/* Show Total SIP Amount */}
              {!isNaN(parseFloat(result.totalSIPAmount)) ? (
                <Text style={styles.resultValue}>₹{parseFloat(result.totalSIPAmount).toFixed(2)}</Text>
              ) : (
                <Text style={styles.errorMessage}>Total SIP amount is not available.</Text>
              )}

              {/* Show Message */}
              <Text style={styles.resultMessage}>{result.message}</Text>

              {/* Section Title */}
              <Text style={styles.sectionTitle}>Fund-wise Details:</Text>

              {/* Cards for Each Fund */}
              {result.funds?.map((fund, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardTitle}>Scheme Name: {fund.name}</Text>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>Risk Level:</Text>
                    <Text style={styles.value}>{fund.risk}</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>SIP Amount:</Text>
                    <Text style={styles.value}>
                      {isNaN(parseFloat(fund.sipAmount))
                        ? 'Not available'
                        : `₹${parseFloat(fund.sipAmount).toFixed(2)}`}
                    </Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>Latest NAV:</Text>
                    <Text style={styles.value}>₹{fund.currentValue ? fund.currentValue : 'Not available'}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Navbar */}
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


export default SuggestSIPScreen;
