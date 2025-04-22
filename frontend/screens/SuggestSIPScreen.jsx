import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import BottomNavbar from "../components/BottomNavbar";
import AppBar from "./Home/AppBar";

const SuggestSIPScreen = () => {
  const [form, setForm] = useState({ targetAmount: "", duration: "", risk: "Low" });
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

          {/* Target Amount Input */}
          <Text style={styles.inputLabel}>Target Amount:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Target Amount"
            keyboardType="numeric"
            value={form.targetAmount}
            onChangeText={(val) => setForm({ ...form, targetAmount: val })}
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
                  <Text style={styles.cardTitle}>Scheme Code: {fund.schemeCode}</Text>
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
                    <Text style={styles.value}>₹{fund.latestNAV}</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>NAV Date:</Text>
                    <Text style={styles.value}>{fund.navDate}</Text>
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
    fontSize: 28, // Larger font size for a modern look
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 18, // Larger font for better readability
  },
  input: {
    height: 50,
    backgroundColor: "#2A2E38",
    color: "#fff",
    borderRadius: 12, // Rounded corners for inputs
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18,
    shadowColor: "#000",
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
    backgroundColor: "#E8434C", // Blue for toggle buttons
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
  spacer: {
    height: 20, // Space between toggle buttons and submit button
  },
  submitButton: {
    backgroundColor: "#E8434C", // Blue background
    paddingVertical: 12,
    borderRadius: 25, // Rounded button
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
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
    fontSize: 22, // Larger font for results
    fontWeight: "bold",
    color: "#fff",
  },
  resultValue: {
    fontSize: 28, // Larger font for result value
    fontWeight: "bold",
    color: "#1E90FF", // Blue for the result value
    marginVertical: 10,
  },
  resultMessage: {
    fontSize: 16,
    color: "#A1A1A1", // Light gray for the message
  },
  resultContainer: {
    padding: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 8,
  },
  resultMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  value: {
    color: '#555',
  },
});

export default SuggestSIPScreen;
