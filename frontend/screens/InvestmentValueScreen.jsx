import React, { useState } from "react";
import { View, Button, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import Slider from "@react-native-community/slider"; // Range Slider
import BottomNavbar from "../components/BottomNavbar";
import AppBar from "./Home/AppBar";

const InvestmentValueScreen = () => {
  const [form, setForm] = useState({
    investmentType: "sip",
    amount: 5000, // Default starting value for amount
    cagr: 10, // Default CAGR
    duration: 5, // Default duration
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true
    setError(null); // Clear previous errors

    try {
      const res = await fetch("http://localhost:5000/api/sip/cal_sip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("An error occurred while calculating the investment value.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed AppBar */}
      <AppBar />

      {/* Scrollable Content */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Investment Value Calculator</Text>

          {/* Toggle Button for SIP and Lumpsum */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, form.investmentType === "sip" && styles.activeButton]}
              onPress={() => setForm({ ...form, investmentType: "sip" })}
            >
              <Text style={styles.toggleButtonText}>SIP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, form.investmentType === "lumpsum" && styles.activeButton]}
              onPress={() => setForm({ ...form, investmentType: "lumpsum" })}
            >
              <Text style={styles.toggleButtonText}>Lumpsum</Text>
            </TouchableOpacity>
          </View>

          {/* Amount Slider */}
          <Text style={styles.inputLabel}>Amount: ₹{form.amount}</Text>
          <Slider
            style={styles.slider}
            minimumValue={500}
            maximumValue={100000}
            step={500}
            value={form.amount}
            onValueChange={(val) => setForm({ ...form, amount: Math.round(val) })}
            minimumTrackTintColor="#B0B0B0" // Grey
            maximumTrackTintColor="#ddd"
            thumbTintColor="#B0B0B0" // Grey
          />

          {/* Percentage (CAGR) Slider */}
          <Text style={styles.inputLabel}>CAGR: {form.cagr}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={form.cagr}
            onValueChange={(val) => setForm({ ...form, cagr: Math.round(val) })}
            minimumTrackTintColor="#B0B0B0" // Grey
            maximumTrackTintColor="#ddd"
            thumbTintColor="#B0B0B0" // Grey
          />

          {/* Duration Slider */}
          <Text style={styles.inputLabel}>Duration: {form.duration} years</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={25}
            step={1}
            value={form.duration}
            onValueChange={(val) => setForm({ ...form, duration: Math.round(val) })}
            minimumTrackTintColor="#B0B0B0" // Grey
            maximumTrackTintColor="#ddd"
            thumbTintColor="#B0B0B0" // Grey
          />

          {/* Calculate Button */}
          <TouchableOpacity style={styles.calculateButton} onPress={handleSubmit}>
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>

          {/* Loading Indicator */}
          {loading && <ActivityIndicator size="large" color="#1E90FF" style={styles.loadingIndicator} />}

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>} {/* Display error if any */}

          {/* Result Section */}
          {result && result.success && (
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
    borderRadius: 8,
    padding: 20,
    elevation: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30, // Fully rounded button
    backgroundColor: "#E8434C", // Blue
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  activeButton: {
    backgroundColor: "#2A2E38", // Darker shade when active
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  inputLabel: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 16,
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 20,
  },
  calculateButton: {
    backgroundColor: "#E8434C", // Blue background
    paddingVertical: 12,
    borderRadius: 30, // Fully rounded button
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#2A2E38", // Dark result box
    borderRadius: 8,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  resultValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E90FF", // Blue for the result value
    marginVertical: 10,
  },
  resultMessage: {
    fontSize: 14,
    color: "#A1A1A1", // Light gray for the message
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  errorText: {
    color: "#FF0000", // Red color for error messages
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default InvestmentValueScreen;
