import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Alert
} from "react-native";
import { LoginStyles } from "../styles/LoginStyles";
import "firebase/compat/auth";
import { auth } from "../../backend/firebaseConfig";

const Login = ({ navigation }) => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign In
  const signIn = async () => {
    if (email === "" && password === "") {
      Alert.alert("Please enter your email and password");
    } else {
      try {
        auth.signInWithEmailAndPassword(email, password).then(() => {
          navigation.navigate("BottomTabNavigator");
        });
      } catch (error) {
        Alert.alert(error);
      }
    }
  };

  // Reset Password
  const resetPassword = async () => {
    try {
      if (email === "") {
        Alert.alert("Please enter your email");
      } else {
        auth
          .sendPasswordResetEmail(email)
          .then(() => {
            // Password reset email sent!
            Alert.alert("Password reset email sent!");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert(errorMessage);
          });
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <SafeAreaView style={LoginStyles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <KeyboardAvoidingView
        style={LoginStyles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
         // contentContainerStyle={LoginStyles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            style={LoginStyles.imageStyle}
            contentFit="cover"
            source={require("../../assets/loginScreenImg.jpg")}
          />
          <View style={LoginStyles.boxContainer}>
            <Text style={LoginStyles.titleStyle}>
              Welcome, {"\n"}Please Login
            </Text>
            <View>
              <Text style={LoginStyles.inputTitle}>Email</Text>
              <TextInput
                style={LoginStyles.inputStyle}
                placeholder="abc@gmail.com"
                onChangeText={(text) => {
                  setEmail(text);
                }}
                value={email}
              />

              <Text style={LoginStyles.inputTitle}>Password</Text>
              <TextInput
                style={LoginStyles.inputStyle}
                placeholder="********"
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry={true}
                value={password}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                resetPassword();
              }}
            >
              <Text style={LoginStyles.forgetButtonText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View style={LoginStyles.loginButtonBox}>
              <TouchableOpacity
                style={LoginStyles.loginButton}
                onPress={() => {
                  signIn();
                }}
              >
                <Text style={LoginStyles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
