import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use your machine IP address if testing on mobile (not localhost)
  const API_BASE_URL = "http://localhost:5000/api/user"; // Replace with your local IP

  const register = async (formData, navigation) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      const { token } = response.data;
      await AsyncStorage.setItem("token", token);
      await getProfile();
      navigation.replace("Dashboard");
    } catch (error) {
      Alert.alert("Register Error", error.response?.data?.message || error.message);
    }
  };

  const login = async (email, password, navigation) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      const { token } = response.data;
      await AsyncStorage.setItem("token", token);
      await getProfile();
      navigation.replace("Dashboard");
    } catch (error) {
      Alert.alert("Login Error", error.response?.data?.message || error.message);
    }
  };

  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUserInfo(res.data.user);
    } catch (error) {
      console.error("Get Profile Error", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/logout`, {
        withCredentials: true,
      });
      await AsyncStorage.removeItem("token");
      setUserInfo(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
