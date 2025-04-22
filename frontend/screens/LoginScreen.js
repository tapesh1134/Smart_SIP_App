import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons"; // Add icons

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password, navigation); // Pass navigation here
  };

  return (
    <View style={styles.container}>
      {/* Red and Blue Background Blocks */}
      <View style={styles.redBlock}></View>
      <View style={styles.blueBlock}></View>

      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Navigation */}
      <TouchableOpacity 
        style={styles.signUpContainer} 
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#181818", // Dark background for the theme
    position: "relative", // To position the red and blue blocks behind the content
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "#262832", // Dark box for inputs
    marginBottom: 15,
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#E8434C", // Red background for the button
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  signUpText: {
    color: "#3283D4", // Blue color for the "Sign Up" text
    fontSize: 14,
  },
  redBlock: {
    position: "absolute",
    right: 0,
    width: 120,
    height: 150,
    backgroundColor: "#E8434C",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    zIndex: -5, // Behind the rest of the content
    top: -50, // Adjust the positioning to match the theme
  },
  blueBlock: {
    position: "absolute",
    top: 30,
    right: 20,
    width: 100,
    height: 90,
    backgroundColor: "#3283D4",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    zIndex: -10, // Behind the red block
  },
});

export default LoginScreen;
