import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import BottomNavbar from "../components/BottomNavbar";
import AppBar from "./Home/AppBar";

const SIPFutureValueScreen = () => {
  const [form, setForm] = useState({ sipAmount: "", duration: "", risk: "Low" });
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/sip", {
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
          <Text style={styles.title}>SIP Future Value Calculator</Text>

          {/* SIP Amount Input */}
          <Text style={styles.inputLabel}>SIP Amount:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter SIP Amount"
            keyboardType="numeric"
            value={form.sipAmount}
            onChangeText={(val) => setForm({ ...form, sipAmount: val })}
          />

          {/* Duration Input */}
          <Text style={styles.inputLabel}>Duration (Years):</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Duration"
            keyboardType="numeric"
            value={form.duration}
            onChangeText={(val) => setForm({ ...form, duration: val })}
          />

          {/* Risk Selection (Low, Medium, High) */}
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

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Calculate</Text>
          </TouchableOpacity>

          {/* Result Display */}
          {result && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Investment Result:</Text>
              <Text style={styles.resultValue}>₹{parseFloat(result.futureValue).toFixed(2)}</Text>
              <Text style={styles.resultMessage}>{result.message}</Text>
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
    backgroundColor: "#0c0e13", // Dark background for the container
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 60, // Space for bottom navbar
  },
  formContainer: {
    backgroundColor: "#12151c", // Dark card background
    borderRadius: 12, // Rounded corners for the form container
    padding: 20,
    elevation: 10,
    marginBottom: 20,
    shadowColor: "#000", // Soft shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    height: 50,
    backgroundColor: "#2A2E38",
    color: "#fff",
    borderRadius: 12, // Rounded corners for inputs
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: "#000", // Soft shadow for input fields
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#E8434C", // Blue
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  activeButton: {
    backgroundColor: "#2A2E38", // Darker shade when active
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#E8434C", // Blue background for submit button
    paddingVertical: 14,
    borderRadius: 25, // Rounded button
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000", // Shadow for submit button
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#2A2E38", // Dark result box
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  resultTitle: {
    fontSize: 22, // Larger font for result title
    fontWeight: "bold",
    color: "#fff",
  },
  resultValue: {
    fontSize: 28, // Larger font for result value
    fontWeight: "bold",
    color: "#E8434C", // Blue color for result value
    marginVertical: 10,
  },
  resultMessage: {
    fontSize: 16,
    color: "#E8434C", // Light gray for the result message
  },
});

export default SIPFutureValueScreen;
