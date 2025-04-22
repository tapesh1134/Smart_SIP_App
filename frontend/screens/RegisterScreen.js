import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
    const { register } = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("User");
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const handleRegister = async () => {
        if (!userName || !email || !phone || !password || !address || !image) {
            Alert.alert("Validation Error", "All fields are required including profile image.");
            return;
        }

        const uri = image.uri;
        const fileInfo = await FileSystem.getInfoAsync(uri);
        const fileExtension = uri.split(".").pop();
        const mimeType = `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`;

        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("role", role);
        formData.append("profileImage", {
            uri,
            name: `profile.${fileExtension}`,
            type: mimeType,
        });

        register(formData, navigation);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.redBlock}></View>
            <View style={styles.blueBlock}></View>

            <View style={styles.formContainer}>
                <Text style={styles.heading}>Create Account</Text>

                {[
                    { icon: "person-outline", placeholder: "Username", value: userName, setter: setUserName },
                    { icon: "mail-outline", placeholder: "Email", value: email, setter: setEmail, keyboardType: "email-address" },
                    { icon: "phone-portrait-outline", placeholder: "Phone", value: phone, setter: setPhone, keyboardType: "phone-pad" },
                    { icon: "lock-closed-outline", placeholder: "Password", value: password, setter: setPassword, secureTextEntry: true },
                    { icon: "location-outline", placeholder: "Address", value: address, setter: setAddress },
                ].map((field, idx) => (
                    <View key={idx} style={styles.inputContainer}>
                        <Ionicons name={field.icon} size={20} color="#ccc" style={styles.icon} />
                        <TextInput
                            placeholder={field.placeholder}
                            value={field.value}
                            onChangeText={field.setter}
                            keyboardType={field.keyboardType}
                            secureTextEntry={field.secureTextEntry}
                            style={styles.input}
                            placeholderTextColor="#aaa"
                        />
                    </View>
                ))}

                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    {image ? (
                        <Image source={{ uri: image.uri }} style={styles.image} />
                    ) : (
                        <Text style={styles.imageText}>Select Profile Image</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.loginLink}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: "#181818", position: "relative" },
    formContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, paddingTop: 50, zIndex: 1 },
    heading: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#fff" },
    inputContainer: { backgroundColor: "#262832", marginBottom: 15, borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, width: "100%" },
    icon: { marginRight: 10 },
    input: { flex: 1, padding: 15, fontSize: 16, color: "#fff" },
    imagePicker: { borderWidth: 1, borderColor: "#aaa", padding: 10, alignItems: "center", marginBottom: 20, borderRadius: 6, width: "100%" },
    image: { width: 100, height: 100, borderRadius: 10 },
    imageText: { color: "#fff", fontSize: 16 },
    button: { backgroundColor: "#E8434C", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 20, width: "100%" },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    loginLink: { marginTop: 20, textAlign: "center", color: "#3283D4" },
    redBlock: { position: "absolute", right: 0, width: 120, height: 150, backgroundColor: "#E8434C", borderTopLeftRadius: 25, borderBottomLeftRadius: 25, zIndex: -5, top: -50 },
    blueBlock: { position: "absolute", top: 30, right: 20, width: 100, height: 90, backgroundColor: "#3283D4", borderTopLeftRadius: 15, borderBottomLeftRadius: 15, zIndex: -10 },
});

export default RegisterScreen;
